import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

const NavBar = () => {
  const { token } = useAuthContext();

  console.log("token", token);

  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/">Home</Link>
        </div>
        <div className="search-input">
          <input type="text" />
          <button>Search</button>
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/wishlist">Wishlist</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            {token ? (
              <Link to="/user_profile">Profile</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
