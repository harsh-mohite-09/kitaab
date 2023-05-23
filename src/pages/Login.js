import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import axios from "axios";
import { useDataContext } from "../context/dataContext";
import { toast } from "react-toastify";
import { TOAST_CONFIG } from "../utils/constants";

const LoginPage = () => {
  const { token, setToken, setUser } = useAuthContext();
  const { setLoader } = useDataContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      navigate("/user_profile");
    }
  }, [token, navigate]);

  const [userConfig, setUserConfig] = useState({
    email: "",
    password: "",
  });
  const [loginError] = useState(null);

  const emailInputHandler = (e) => {
    setUserConfig((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const passwordInputHandler = (e) => {
    setUserConfig((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await axios.post(`/api/auth/login`, userConfig);
      setLoader(false);
      const token = response.data.encodedToken;
      const foundUser = response.data.foundUser;

      // saving the encodedToken in the localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(foundUser));
      setToken(token);
      setUser(JSON.stringify(foundUser));
      if (location?.state?.from) {
        navigate(location?.state?.from);
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("User " + error.response.statusText, TOAST_CONFIG);
      setLoader(false);
    }
    setUserConfig({
      email: "",
      password: "",
    });
  };

  const guestLoginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await axios.post(`/api/auth/login`, {
        email: "harsh.mohite009@gmail.com",
        password: "harsh123",
      });
      setLoader(false);
      const token = response.data.encodedToken;
      const foundUser = response.data.foundUser;

      // saving the encodedToken in the localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(foundUser));
      setToken(token);
      setUser(JSON.stringify(foundUser));
      if (location?.state?.from) {
        navigate(location?.state?.from);
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("User " + error.response.statusText, TOAST_CONFIG);
      setLoader(false);
    }
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
                onChange={emailInputHandler}
              />
            </div>
            <div className="auth-input">
              <input
                id="password"
                type="password"
                value={userConfig.password}
                placeholder="Enter Password"
                required
                onChange={passwordInputHandler}
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
        {loginError && <p className="auth-error">User {loginError}</p>}
        <Link to="/signup">Create New Account</Link>
      </div>
    </main>
  );
};

export default LoginPage;
