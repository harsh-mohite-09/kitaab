import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useDataContext } from "../context/dataContext";

const SignupPage = () => {
  const { token, setToken, setUser } = useAuthContext();
  const { setLoader } = useDataContext();
  const navigate = useNavigate();
  const [userConfig, setUserConfig] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [userExists, setUserExists] = useState(false);
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

  const formSubmitHandler = async (e) => {
    e.preventDefault();
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
        setUserExists(true);
      }
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
              <label htmlFor="email">First Name </label>
              <input
                id="firstName"
                type="text"
                value={userConfig.firstName}
                required
                onChange={firstNameInputHandler}
              />
            </div>
            <div className="auth-input">
              <label htmlFor="email">Last Name </label>
              <input
                id="lastName"
                type="text"
                value={userConfig.lastName}
                required
                onChange={lastNameInputHandler}
              />
            </div>
            <div className="auth-input">
              <label htmlFor="email">email </label>
              <input
                id="email"
                type="email"
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
          <button className="auth-btn">Sign Up</button>
        </form>
        {userExists && <p className="auth-error">User already exsists!</p>}
        <Link to="/login">Already have an account? Log in</Link>
      </div>
    </main>
  );
};

export default SignupPage;
