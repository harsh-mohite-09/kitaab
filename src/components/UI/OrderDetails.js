import React from "react";
import { Link } from "react-router-dom";

const OrderDetails = ({ cart }) => {
  const totalPrice = cart.reduce((acc, { price, qty }) => acc + price * qty, 0);
  const discountedPrice = totalPrice * 0.8;
  const totalDiscount = totalPrice * (1 - 0.8);

  return (
    <div className="cart-order-details-container">
      <h2 className="order-title">Order Details</h2>
      <div className="order-details__row">
        <p>
          <b>Price({cart.length} items) :</b>
        </p>
        <p className="order-price">₹ {totalPrice}</p>
      </div>
      <div className="order-details__row">
        <p>
          <b>Discount : </b>
        </p>
        <p className="order-price">- 20%</p>
      </div>
      <div className="order-details__row">
        <p>
          <b>Total Price :</b>{" "}
        </p>
        <p className="order-price">₹ {discountedPrice.toFixed()}</p>
      </div>
      <hr />
      <p className="text-style">
        You will save Rs. {totalDiscount.toFixed()} on this order{" "}
      </p>
      <Link to="/checkout">
        <button className="checkout-btn">Checkout</button>
      </Link>
    </div>
  );
};

export default OrderDetails;
