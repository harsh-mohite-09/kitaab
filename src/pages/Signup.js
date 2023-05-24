import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useDataContext } from "../context/dataContext";
import { signupUser } from "../services/authServices";

const SignupPage = () => {
  const { token, setToken, setUser } = useAuthContext();
  const { setLoader } = useDataContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [userConfig, setUserConfig] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    signupUser(setLoader, setToken, setUser, location, navigate, userConfig);
  };

  return (
    <main className="auth-page">
      <div className="auth-form auth-signup">
        <h2>Sign Up</h2>
        <form onSubmit={formSubmitHandler} className="auth-form_main">
          <div className="auth-form__inputs">
            <div className="auth-input">
              <input
                id="firstName"
                type="text"
                value={userConfig.firstName}
                placeholder="First Name"
                required
                onChange={(e) => inputHandler(e, "firstName")}
              />
            </div>
            <div className="auth-input">
              <input
                id="lastName"
                type="text"
                value={userConfig.lastName}
                placeholder="Last Name"
                required
                onChange={(e) => inputHandler(e, "lastName")}
              />
            </div>
            <div className="auth-input">
              <input
                id="email"
                type="email"
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
            <div className="auth-input">
              <input
                id="confirm-password"
                type="password"
                value={userConfig.confirmPassword}
                placeholder="Confirm Password"
                required
                onChange={(e) => inputHandler(e, "confirmPassword")}
              />
            </div>
          </div>
          <button className="auth-btn">Sign Up</button>
        </form>
        <Link to="/login">Already have an account? Log in</Link>
      </div>
    </main>
  );
};

export default SignupPage;
