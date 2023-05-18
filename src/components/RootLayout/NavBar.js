import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHeart,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

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
            <Link to="/wishlist">
              <FontAwesomeIcon icon={faHeart} />
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
          </li>
          <li>
            {token ? (
              <Link to="/user_profile">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            ) : (
              <Link to="/login">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
