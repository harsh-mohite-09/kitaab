import React from "react";
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
  const { _id: productId, img, name, price } = product;
  const { token } = useAuthContext();
  const { dataDispatch, cart, wishlist } = useDataContext();
  const navigate = useNavigate();

  const isInCart = isProductInCart(cart, productId);
  const isInWishlilst = isProductInWishlist(wishlist, productId);

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

  return (
    <div className="product-card">
      <div className="product-card__image">
        <img src={img} alt="product" />
        <div
          className={`product_card__wishlist-icon ${
            isInWishlilst && "in-wishlist-btn"
          }`}
        >
          <FontAwesomeIcon icon={faHeart} onClick={addToWishlistHandler} />
        </div>
      </div>
      <div className="product-card__details">
        <p>{name}</p>
        <p>
          <b>₹{price}</b>
        </p>
      </div>
      <button
        className={`product-card__btn ${isInCart && "in-cart-btn"}`}
        onClick={addToCartHandler}
      >
        {isInCart ? "Go to Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductsCard;
