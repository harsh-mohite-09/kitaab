import React from "react";
import { Link } from "react-router-dom";

const OrderDetails = ({ cart }) => {
  const totalPrice = cart.reduce((acc, { price, qty }) => acc + price * qty, 0);
  const discountedPrice = totalPrice * 0.8;
  const totalDiscount = totalPrice * (1 - 0.8);

  return (
    <div className="cart-order-details-container">
      <h2>Order Details</h2>
      <p>
        Price({cart.length} items): {totalPrice}
      </p>
      <p>Discount: -20%</p>
      <p>Total Price: {discountedPrice.toFixed()}</p>
      <p>You will save Rs. {totalDiscount.toFixed()} on this order </p>
      <Link to="/checkout">
        <button className="checkout-btn">Checkout</button>
      </Link>
    </div>
  );
};

export default OrderDetails;
