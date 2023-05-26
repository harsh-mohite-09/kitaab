import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useDataContext } from "../context/dataContext";
import { loginUser } from "../services/authServices";

const testUserConfig = {
  email: "harsh.mohite009@gmail.com",
  password: "harsh123",
};

const LoginPage = () => {
  const { token, setToken, setUser } = useAuthContext();
  const { setLoader } = useDataContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [userConfig, setUserConfig] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/user_profile");
    }
  }, [token, navigate]);

  const inputHandler = (e, inputName) => {
    setUserConfig((prev) => ({
      ...prev,
      [inputName]: e.target.value,
    }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    loginUser(setLoader, setToken, setUser, location, navigate, userConfig);
    setUserConfig({
      email: "",
      password: "",
    });
  };

  const guestLoginHandler = (e) => {
    e.preventDefault();
    loginUser(setLoader, setToken, setUser, location, navigate, testUserConfig);
    setUserConfig(testUserConfig);
  };

  return (
    <main className="auth-page">
      <div className="auth-form auth-login">
        <h2>Login</h2>
        <form onSubmit={formSubmitHandler} className="auth-form_main">
          <div className="auth-form__inputs">
            <div className="auth-input">
              <input
                id="email"
                type="text"
                value={userConfig.email}
                placeholder="Enter Email"
                required
                onChange={(e) => inputHandler(e, "email")}
              />
            </div>
            <div className="auth-input">
              <input
                id="password"
                type="password"
                value={userConfig.password}
                placeholder="Enter Password"
                required
                onChange={(e) => inputHandler(e, "password")}
              />
            </div>
          </div>
          <div className="login-btn-group">
            <button className="auth-btn">Login</button>
            <button
              className="auth-btn"
              type="button"
              onClick={guestLoginHandler}
            >
              Guest Login
            </button>
          </div>
        </form>
        <Link to="/signup" className="auth-link">
          Create New Account
        </Link>
      </div>
    </main>
  );
};

export default LoginPage;
