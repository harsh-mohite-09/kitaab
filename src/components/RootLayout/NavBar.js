import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const { token } = useAuthContext();

  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/">Kitaab</Link>
        </div>
        <div className="search-input">
          <input type="text" />
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>

        <ul className="nav-links">
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
