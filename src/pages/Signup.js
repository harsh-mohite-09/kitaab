import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useDataContext } from "../context/dataContext";
import { signupUser } from "../services/authServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const SignupPage = () => {
  const { token, setToken, setUser } = useAuthContext();
  const { setLoader } = useDataContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
            <div className="auth-input password-input">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={userConfig.password}
                placeholder="Enter Password"
                required
                onChange={(e) => inputHandler(e, "password")}
              />
              <div
                className="show-password-btn"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </div>
            </div>
            <div className="auth-input password-input">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={userConfig.confirmPassword}
                placeholder="Confirm Password"
                required
                onChange={(e) => inputHandler(e, "confirmPassword")}
              />
              <div
                className="show-password-btn"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </div>
            </div>
          </div>
          <button className="auth-btn">Sign Up</button>
        </form>
        <Link to="/login" className="auth-link">
          Already have an account? Log in
        </Link>
      </div>
    </main>
  );
};

export default SignupPage;
