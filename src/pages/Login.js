import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import axios from "axios";

const LoginPage = () => {
  const { token, setToken, setUser } = useAuthContext();
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
  const [loginError, setLoginError] = useState(null);

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
      const response = await axios.post(`/api/auth/login`, userConfig);
      // saving the encodedToken in the localStorage
      const token = response.data.encodedToken;
      const foundUser = response.data.foundUser;
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
      setLoginError(error.response.statusText);
    }
    setUserConfig({
      email: "",
      password: "",
    });
  };

  return (
    <main className="auth-page">
      <div className="auth-form auth-login">
        <h2>Login</h2>
        <form onSubmit={formSubmitHandler} className="auth-form_main">
          <div className="auth-form__inputs">
            <div className="auth-input">
              <label htmlFor="email">email </label>
              <input
                id="email"
                type="text"
                value={userConfig.email}
                required
                onChange={emailInputHandler}
              />
            </div>
            <div className="auth-input">
              <label htmlFor="password">Password </label>
              <input
                id="password"
                type="password"
                value={userConfig.password}
                required
                onChange={passwordInputHandler}
              />
            </div>
          </div>
          <button className="auth-btn">Login</button>
        </form>
        {loginError && <p className="auth-error">User {loginError}</p>}
        <Link to="/signup">Create New Account</Link>
      </div>
    </main>
  );
};

export default LoginPage;
