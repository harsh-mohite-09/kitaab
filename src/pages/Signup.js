import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useDataContext } from "../context/dataContext";
import { toast } from "react-toastify";
import { TOAST_CONFIG } from "../utils/constants";

const SignupPage = () => {
  const { token, setToken, setUser } = useAuthContext();
  const { setLoader } = useDataContext();
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

  const firstNameInputHandler = (e) => {
    setUserConfig((prev) => ({
      ...prev,
      firstName: e.target.value,
    }));
  };

  const lastNameInputHandler = (e) => {
    setUserConfig((prev) => ({
      ...prev,
      lastName: e.target.value,
    }));
  };

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

  const confirmPasswordInputHandler = (e) => {
    setUserConfig((prev) => ({
      ...prev,
      confirmPassword: e.target.value,
    }));
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (userConfig.password !== userConfig.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoader(true);
      const response = await axios.post(`/api/auth/signup`, userConfig);
      setLoader(false);
      // saving the encodedToken in the localStorage
      const token = response.data.encodedToken;
      const createdUser = response.data.createdUser;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(createdUser));
      setToken(token);
      setUser(JSON.stringify(createdUser));
      navigate("/");
    } catch (error) {
      if (error.response.status === 422) {
        toast.error("User Already Exists!", TOAST_CONFIG);
      }
      if (error.response.status === 500) {
        toast.error(error.response.statusText, TOAST_CONFIG);
      }
      setLoader(false);
      setUserConfig({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    }
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
                onChange={firstNameInputHandler}
              />
            </div>
            <div className="auth-input">
              <input
                id="lastName"
                type="text"
                value={userConfig.lastName}
                placeholder="Last Name"
                required
                onChange={lastNameInputHandler}
              />
            </div>
            <div className="auth-input">
              <input
                id="email"
                type="email"
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
            <div className="auth-input">
              <input
                id="confirm-password"
                type="password"
                value={userConfig.confirmPassword}
                placeholder="Confirm Password"
                required
                onChange={confirmPasswordInputHandler}
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
