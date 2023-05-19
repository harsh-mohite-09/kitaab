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
  const { dataDispatch, cart, wishlist } = useDataContext();
  const navigate = useNavigate();

  const isInCart = isProductInCart(cart, productId);
  const isInWishlilst = isProductInWishlist(wishlist, productId);

  useEffect(() => {
    getProduct(productId, setProduct);
  }, [productId]);

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

  if (!product) return <p>Loading...</p>;

  const { img, name, author, price, category } = product;
  return (
    <main className="product-detail-page">
      <div className="product-detail-card">
        <div className="product-img">
          <img src={img} alt="book" />
        </div>
        <div className="product-detail">
          <div className="product-detail__info">
            <h2>{name}</h2>
            <p>Rs. {price}</p>
            <p>Author: {author}</p>
            <p>Category: {category}</p>
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
