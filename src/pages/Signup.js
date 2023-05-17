import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const SignupPage = () => {
  const { token, setToken, setUser } = useAuthContext();
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
      const response = await axios.post(`/api/auth/signup`, userConfig);
      // saving the encodedToken in the localStorage
      const token = response.data.encodedToken;
      const createdUser = response.data.createdUser;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(createdUser));
      setToken(token);
      setUser(createdUser);
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
    <main>
      <h1>Signup Page</h1>
      <form onSubmit={formSubmitHandler} className="signup-form">
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            id="firstName"
            type="text"
            value={userConfig.firstName}
            required
            onChange={firstNameInputHandler}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input
            id="lastName"
            type="text"
            value={userConfig.lastName}
            required
            onChange={lastNameInputHandler}
          />
        </div>
        <div>
          <label htmlFor="email">email: </label>
          <input
            id="email"
            type="text"
            value={userConfig.email}
            required
            onChange={emailInputHandler}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            value={userConfig.password}
            required
            onChange={passwordInputHandler}
          />
        </div>
        <button>Create Account</button>
      </form>
      {userExists && <p>User Already Exists!</p>}
      <Link to="/login">Already have an account?</Link>
    </main>
  );
};

export default SignupPage;
