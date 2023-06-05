import React from "react";
import { useDataContext } from "../context/dataContext";
import OrderDetails from "../components/UI/OrderDetails";
import CartItemsCard from "../components/UI/CartItemsCard";

const CartPage = () => {
  const { cart } = useDataContext();

  return (
    <main className="cart-page">
      <h2 className="cart-header">Cart ({cart.length})</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">No Items in Cart!</p>
      ) : (
        <div className="cart-main-container">
          <div className="cart-items-container">
            {cart.map((product) => (
              <CartItemsCard product={product} key={product._id} />
            ))}
          </div>
          <OrderDetails cart={cart} />
        </div>
      )}
    </main>
  );
};

export default CartPage;
