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
  const [noUser, setNoUser] = useState(false);

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
      setUser(foundUser);
      if (location?.state?.from) {
        navigate(location?.state?.from);
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 404) {
        setNoUser(true);
      }
    }
    setUserConfig({
      email: "",
      password: "",
    });
  };

  return (
    <main>
      <h1>Login Page</h1>
      <form onSubmit={formSubmitHandler} className="signup-form">
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
        <button>Log in</button>
      </form>
      {noUser && <h3>No user found! Please Create account!</h3>}
      <Link to="/signup">Create New Account</Link>
    </main>
  );
};

export default LoginPage;
