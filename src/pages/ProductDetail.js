import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useDataContext } from "../context/dataContext";
import { addToCart } from "../services/cartServices";
import {
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlistServices";
import { isProductInCart, isProductInWishlist } from "../utils/productUtils";
import { getProduct } from "../services/productDetailService";

const ProductDetailPage = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const { token } = useAuthContext();
  const { dataDispatch, cart, wishlist, setLoader } = useDataContext();
  const navigate = useNavigate();

  const isInCart = isProductInCart(cart, productId);
  const isInWishlilst = isProductInWishlist(wishlist, productId);

  useEffect(() => {
    getProduct(productId, setProduct, setLoader);
  }, [productId, setLoader]);

  const addToCartHandler = (e) => {
    e.preventDefault();
    if (token) {
      if (isInCart) {
        navigate("/cart");
      } else {
        addToCart(dataDispatch, product, token);
      }
    } else {
      navigate("/login");
    }
  };

  const addToWishlistHandler = (e) => {
    e.preventDefault();
    if (token) {
      if (isInWishlilst) {
        removeFromWishlist(dataDispatch, productId, token);
      } else {
        addToWishlist(dataDispatch, product, token);
      }
    } else {
      navigate("/login");
    }
  };

  if (!product) {
    return (
      <main className="product-detail-page">
        <h2>Loading...</h2>
      </main>
    );
  }

  const {
    img,
    name,
    author,
    price,
    categoryTitle,
    originalPrice,
    rating,
    pages,
    delivery,
  } = product;
  const discount = ((originalPrice - price) / originalPrice) * 100;
  return (
    <main className="product-detail-page">
      <div className="product-detail-card">
        <div className="product-img">
          <img src={img} alt="book" />
        </div>
        <div className="product-detail">
          <div className="product-detail__info">
            <div className="product-detail__info-header">
              <h2 className="product-detail__info-header_name">{name}</h2>
              <span className="product-detail__info-header-rating">
                {rating.toFixed(1)}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"
                    ></path>
                  </svg>
                </div>
              </span>
            </div>
            <div className="product-detail__info-price">
              <div className="product-detail__info-price-main">
                <p className="product-detail__info-price__final">₹{price}</p>
                <p className="product-detail__info-price__original">
                  ₹{originalPrice}
                </p>
              </div>
              <p className="product-detail__info-price__discount">
                {discount.toFixed()}% OFF
              </p>
            </div>
            <hr />
            <div className="product-detail__info-main">
              <div className="product-detail__info-main__row">
                <p>
                  <b>Author :</b>
                </p>
                <p>{author}</p>
              </div>
              <div className="product-detail__info-main__row">
                <p>
                  <b>Category :</b>
                </p>
                <p>{categoryTitle}</p>
              </div>
              <div className="product-detail__info-main__row">
                <p>
                  <b>Pages: </b>
                </p>
                <p>{pages}</p>
              </div>
              <div className="product-detail__info-main__row">
                <p>
                  <b>Delivery: </b>
                </p>
                <p>
                  {delivery} {delivery > 1 ? "days" : "day"}
                </p>
              </div>
            </div>
          </div>
          <div className="product-detail__btn-group">
            <button
              onClick={addToWishlistHandler}
              className={isInWishlilst ? `in-wishlist-btn` : undefined}
            >
              {isInWishlilst ? "Remove from wishlist" : "Add to wishlist"}
            </button>
            <button
              onClick={addToCartHandler}
              className={isInCart ? `in-cart-btn` : undefined}
            >
              {isInCart ? "Go to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
