import React from "react";
import { isProductInWishlist } from "../../utils/productUtils";
import { useDataContext } from "../../context/dataContext";
import { useAuthContext } from "../../context/authContext";
import { removeFromCart, updateQtyInCart } from "../../services/cartServices";
import { addToWishlist } from "../../services/wishlistServices";
import { getDiscountPercent } from "../../utils/productUtils";

const CartItemsCard = ({ product }) => {
  const { wishlist, dataDispatch } = useDataContext();
  const { token } = useAuthContext();

  const {
    img,
    name,
    rating,
    price,
    _id: productId,
    qty,
    originalPrice,
  } = product;
  const isInWishlilst = isProductInWishlist(wishlist, productId);
  const discount = getDiscountPercent(originalPrice, price);

  const removeFromCartHandler = (productId) => {
    removeFromCart(dataDispatch, productId, token);
  };

  const addToWishlistHandler = (product) => {
    addToWishlist(dataDispatch, product, token);
  };

  const updateQtyInCartHandler = (productId, actionType, quantity) => {
    if (quantity === 1) {
      removeFromCart(dataDispatch, productId, token);
    } else {
      updateQtyInCart(dataDispatch, productId, token, actionType);
    }
  };

  return (
    <div className="cart-product-card">
      <div className="cart-product__details">
        <div className="cart-product__image">
          <img src={img} alt="product" />
        </div>
        <div className="cart-product__info">
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
          <div className="cart-product__qty">
            <button
              className="cart-product__qty-btn"
              disabled={qty === 1}
              onClick={() =>
                updateQtyInCartHandler(productId, "DECREMENT", qty)
              }
            >
              -
            </button>
            <span className="cart-product__qty-value">{qty}</span>
            <button
              className="cart-product__qty-btn"
              onClick={() => updateQtyInCartHandler(productId, "INCREMENT")}
            >
              +
            </button>
          </div>
          <div className="cart-product__btn-group">
            <button
              className="cart-product__btn remove-btn"
              onClick={() => removeFromCartHandler(productId)}
            >
              Remove
            </button>
            <button
              className={`cart-product__btn ${
                !isInWishlilst ? "add-btn" : "disabled-btn"
              }`}
              onClick={() => addToWishlistHandler(product)}
              disabled={isInWishlilst}
            >
              {isInWishlilst ? "Already in Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemsCard;
