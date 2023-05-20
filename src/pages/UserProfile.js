import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useDataContext } from "../context/dataContext";
import { TYPE } from "../utils/constants";
import { removeFromCart } from "../services/cartServices";
import { removeFromWishlist } from "../services/wishlistServices";

const UserProfilePage = () => {
  const { user, token, setToken } = useAuthContext();
  const { cart, wishlist, dataDispatch } = useDataContext();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);

    for (const item of cart) {
      removeFromCart(dataDispatch, item._id, token);
    }

    for (const item of wishlist) {
      removeFromWishlist(dataDispatch, item._id, token);
    }

    dataDispatch({ type: TYPE.CLEAR_CART });
    dataDispatch({ type: TYPE.CLEAR_WISHLIST });

    navigate("/login");
  };
  console.log(user);
  const activeUser = JSON.parse(user);

  return (
    <main className="user-profile-page">
      <div className="user-profile-card-container">
        <h2>Account</h2>
        <div className="user-profile-card">
          <div className="user-profile-card__details">
            <h3>User Details</h3>
            <p>
              Name: {activeUser.firstName} {activeUser.lastName}
            </p>
            <p>Email: {activeUser.email} </p>
          </div>
          <button className="logout-btn" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
    </main>
  );
};

export default UserProfilePage;
