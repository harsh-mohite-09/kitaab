import React from "react";
import { useDataContext } from "../../context/dataContext";

const CheckoutDetails = () => {
  const { cart } = useDataContext();

  const totalPrice = cart.reduce((acc, { price, qty }) => acc + price * qty, 0);
  const discountedPrice = totalPrice * 0.8;

  return (
    <div className="checkout-container__details">
      <h3>Order Details</h3>
      <div className="flex-col-gap">
        <div className="flex-row font-bold">
          <p>Items</p>
          <p>Qty</p>
        </div>
        <div className="flex-items-col">
          {cart.map(({ _id, name, qty }) => {
            return (
              <div className="flex-row" key={_id}>
                <p>{name}</p>
                <p>{qty}</p>
              </div>
            );
          })}
        </div>
      </div>
      <h3>Price Details</h3>
      <div className="flex-col-gap">
        <div className="flex-items-col">
          <div className="flex-row">
            <p>Price</p>
            <p>{totalPrice}</p>
          </div>
          <div className="flex-row">
            <p>Discount</p>
            <p>-20%</p>
          </div>
          <div className="flex-row font-bold">
            <p>Total Amount</p>
            <p>Rs. {discountedPrice.toFixed()}</p>
          </div>
        </div>
      </div>
      <button className="place-order-btn">Place Order</button>
    </div>
  );
};

export default CheckoutDetails;
