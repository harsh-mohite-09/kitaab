import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import axios from "axios";

const LoginPage = () => {
  const { setToken } = useAuthContext();
  const [userConfig, setUserConfig] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

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
      <h1>Login Page</h1>
      <form onSubmit={formSubmitHandler} className="signup-form">
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
        <button>Log in</button>
      </form>
      <Link to="/signup">Create New Account</Link>
    </main>
  );
};

export default LoginPage;
