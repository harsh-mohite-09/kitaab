import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const SignupPage = () => {
  const { setToken } = useAuthContext();
  const [userConfig, setUserConfig] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

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
    } catch (error) {
      console.log(error);
    }
    setUserConfig({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    navigate("/");
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
            required
            onChange={firstNameInputHandler}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input
            id="lastName"
            type="text"
            required
            onChange={lastNameInputHandler}
          />
        </div>
        <div>
          <label htmlFor="email">email: </label>
          <input id="email" type="text" required onChange={emailInputHandler} />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="text"
            required
            onChange={passwordInputHandler}
          />
        </div>
        <button>Create Account</button>
      </form>
      <Link to="/login">Already have an account?</Link>
    </main>
  );
};

export default SignupPage;
