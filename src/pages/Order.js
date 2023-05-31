import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const id = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(id);
  }, []);

  return (
    <main className="order-page">
      <h1>Your Order has been placed!</h1>
    </main>
  );
};

export default OrderPage;
