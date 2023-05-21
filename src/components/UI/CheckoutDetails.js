import React from "react";
import { useDataContext } from "../../context/dataContext";
import { toast } from "react-toastify";

const CheckoutDetails = ({ addressSelected }) => {
  const { cart } = useDataContext();

  const totalPrice = cart.reduce((acc, { price, qty }) => acc + price * qty, 0);
  const discountedPrice = totalPrice * 0.8;

  const placeOrderHandler = () => {
    if (!addressSelected) {
      toast.warn("Select an address to proceed", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

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
      <button className="place-order-btn" onClick={placeOrderHandler}>
        Place Order
      </button>
    </div>
  );
};

export default CheckoutDetails;
