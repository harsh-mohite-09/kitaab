import AddressList from "../components/Address/AddressList";
import CheckoutDetails from "../components/UI/CheckoutDetails";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/dataContext";
import { useEffect } from "react";

const CheckoutPage = () => {
  const { cart } = useDataContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/products");
    }
  }, [cart, navigate]);

  return (
    <main className="checkout-page">
      <h2 className="checkout-header">Checkout</h2>
      <div className="checkout-container">
        <AddressList />
        <CheckoutDetails />
      </div>
    </main>
  );
};

export default CheckoutPage;
