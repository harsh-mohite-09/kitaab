import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const UserProfilePage = () => {
  const { setToken } = useAuthContext();
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    navigate("/login");
  };

  return (
    <main>
      <h1>User Profile Page</h1>
      <button onClick={logoutHandler}>Logout</button>
    </main>
  );
};

export default UserProfilePage;
