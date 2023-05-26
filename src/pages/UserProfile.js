import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useDataContext } from "../context/dataContext";
import { useFilterContext } from "../context/filterContext";
import { logoutUser } from "../services/authServices";

const UserProfilePage = () => {
  const { user, setToken, setUser } = useAuthContext();
  const { dataDispatch, setLoader } = useDataContext();
  const { filterDispatch } = useFilterContext();

  const logoutHandler = () => {
    logoutUser(setToken, setUser, dataDispatch, filterDispatch, setLoader);
  };

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
            <div className="user-profile-card__details-main">
              <p>
                Name: {user.firstName} {user.lastName}
              </p>
              <p>Email: {user.email} </p>
            </div>
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
