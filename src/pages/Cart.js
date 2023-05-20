import React from "react";
import { useDataContext } from "../context/dataContext";
import { useAuthContext } from "../context/authContext";
import { isProductInWishlist } from "../utils/productUtils";
import { removeFromCart, updateQtyInCart } from "../services/cartServices";
import { addToWishlist } from "../services/wishlistServices";
import OrderDetails from "../components/UI/OrderDetails";

const CartPage = () => {
  const { cart, wishlist, dataDispatch } = useDataContext();
  const { token } = useAuthContext();

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
    <main className="cart-page">
      <h2 className="cart-header">Cart ({cart.length})</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">No Items in Wishilst!</p>
      ) : (
        <div className="cart-main-container">
          <div className="cart-items-container">
            {cart.map((product) => {
              const { img, name, price, _id: productId, qty } = product;
              const isInWishlilst = isProductInWishlist(wishlist, productId);
              return (
                <div className="cart-product-card" key={productId}>
                  <div className="cart-product__details">
                    <div className="cart-product__image">
                      <img src={img} alt="product" />
                    </div>
                    <div className="cart-product__info">
                      <div>
                        <p>{name}</p>
                        <p>
                          <b>₹{price}</b>
                        </p>
                      </div>
                      <div className="cart-product__qty">
                        <button
                          className="cart-product__qty-btn"
                          onClick={() =>
                            updateQtyInCartHandler(productId, "DECREMENT", qty)
                          }
                        >
                          -
                        </button>
                        <span className="cart-product__qty-value">{qty}</span>
                        <button
                          className="cart-product__qty-btn"
                          onClick={() =>
                            updateQtyInCartHandler(productId, "INCREMENT")
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="cart-prodcut__btn-group">
                    <button
                      className="cart-product__btn"
                      onClick={() => removeFromCartHandler(productId)}
                    >
                      Remove
                    </button>
                    <button
                      className="cart-product__btn"
                      onClick={() => addToWishlistHandler(product)}
                      disabled={isInWishlilst}
                    >
                      {isInWishlilst
                        ? "Already in Wishlist"
                        : "Add to Wishlist"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <OrderDetails cart={cart} />
        </div>
      )}
    </main>
  );
};

export default CartPage;
