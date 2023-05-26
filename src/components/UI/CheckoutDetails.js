import React from "react";
import { useDataContext } from "../../context/dataContext";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/authContext";
import confetti from "canvas-confetti";
import { TYPE } from "../../utils/constants";

const CheckoutDetails = ({ addressSelected }) => {
  const { cart } = useDataContext();
  const { user } = useAuthContext();

  const totalPrice = cart.reduce((acc, { price, qty }) => acc + price * qty, 0);
  const discountedPrice = (totalPrice * 0.8).toFixed();

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
    } else {
      displayRazorpay();
    }
  };

  const Popper = () => {
    var end = Date.now() + 3 * 1000;
    // go Buckeyes!
    var colors = ["#392f5a", "#9583cf"];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 40,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 140,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    if (addressSelected) {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      const options = {
        key: "rzp_test_b8vVacW3snWKQB",
        amount: discountedPrice * 100,
        currency: "INR",
        name: "Kitaab",
        description: "Thank you for shopping with us",
        handler: function (response) {
          toast.success("Order Placed Successfully");
          Popper();
        },
        prefill: {
          name: `${user?.firstName} ${user?.lastName}`,
          email: user?.email,
          contact: "9696009211",
        },
        theme: {
          color: "#5644b0",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
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
            <p>Rs. {discountedPrice}</p>
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
