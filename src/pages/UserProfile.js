import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useDataContext } from "../context/dataContext";
import { TYPE } from "../utils/constants";
import { removeFromCart } from "../services/cartServices";
import { removeFromWishlist } from "../services/wishlistServices";
import { useFilterContext } from "../context/filterContext";

const UserProfilePage = () => {
  const { user, token, setToken } = useAuthContext();
  const { cart, wishlist, dataDispatch, setLoader } = useDataContext();
  const { filterDispatch } = useFilterContext();
  // const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);

    for (const item of cart) {
      removeFromCart(dataDispatch, item._id, token, true);
    }

    for (const item of wishlist) {
      removeFromWishlist(dataDispatch, item._id, token, true);
    }

    dataDispatch({ type: TYPE.CLEAR_CART });
    dataDispatch({ type: TYPE.CLEAR_WISHLIST });
    filterDispatch({ type: TYPE.CLEAR_FILTERS });

    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      // navigate("/login");
    }, 1000);
  };
  console.log(user);
  const activeUser = JSON.parse(user);

  return (
    <main className="user-profile-page">
      <div className="user-profile-card-container">
        <h2>Account</h2>
        <div className="user-profile-card">
          <div className="user-profile-card__details">
            <div className="user-profile-card__details-header">
              <h3>User Profile</h3>
              <Link to="/address">
                <button className="addresses_btn">Manage Addresses</button>
              </Link>
            </div>
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
