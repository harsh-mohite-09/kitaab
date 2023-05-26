import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../context/authContext";
import { useDataContext } from "../../context/dataContext";
import { addToCart } from "../../services/cartServices";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../services/wishlistServices";
import { isProductInCart, isProductInWishlist } from "../../utils/productUtils";

const ProductsCard = ({ product }) => {
  const { _id: productId, img, name, price, rating, originalPrice } = product;
  const { token } = useAuthContext();
  const { dataDispatch, cart, wishlist, drawer } = useDataContext();
  const navigate = useNavigate();
  const [btnDisabled, setBtnDisabled] = useState(false);

  const isInCart = isProductInCart(cart, productId);
  const isInWishlilst = isProductInWishlist(wishlist, productId);
  const discount = ((originalPrice - price) / originalPrice) * 100;

  const addToCartHandler = (e) => {
    if (token) {
      if (isInCart) {
        navigate("/cart");
      } else {
        addToCart(dataDispatch, product, token, setBtnDisabled);
      }
    } else {
      navigate("/login");
    }
  };

  const addToWishlistHandler = (e) => {
    e.stopPropagation();
    if (token) {
      if (isInWishlilst) {
        removeFromWishlist(dataDispatch, productId, token, setBtnDisabled);
      } else {
        addToWishlist(dataDispatch, product, token, setBtnDisabled);
      }
    } else {
      navigate("/login");
    }
  };

  const trimmedName = name.length > 19 ? name.slice(0, 19) + "..." : name;

  return (
    <div className={`product-card ${drawer ? "disabled-click" : ""}`}>
      <div
        className="product-card__image"
        onClick={() => navigate(`/products/${product._id}`)}
      >
        <img src={img} alt="product" />
        <button
          className={`product_card__wishlist-icon ${
            isInWishlilst && "in-wishlist-btn"
          } ${btnDisabled ? "disable-btn" : null}`}
          disabled={btnDisabled}
        >
          <FontAwesomeIcon icon={faHeart} onClick={addToWishlistHandler} />
        </button>
      </div>
      <div className="product-card__details">
        <div className="product-card__details-title">
          <p>{trimmedName}</p>
          <span>
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
        <div className="product-card__details-price-container">
          <div className="product-card__details-price">
            <span className="product-price">₹{price}</span>
            <span className="product-price-original">₹{originalPrice}</span>
          </div>
          <div className="product-discount">{discount.toFixed()}% OFF</div>
        </div>
      </div>
      <button
        className={`product-card__btn ${isInCart && "in-cart-btn"} ${
          btnDisabled ? "disable-btn" : null
        }`}
        onClick={addToCartHandler}
        disabled={btnDisabled}
      >
        {isInCart ? "Go to Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductsCard;
