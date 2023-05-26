import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHeart,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDataContext } from "../../context/dataContext";
import { useFilterContext } from "../../context/filterContext";
import { TYPE } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { token } = useAuthContext();
  const { wishlist, cart } = useDataContext();
  const { appliedFilters, filterDispatch } = useFilterContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");

  // For debouncing search results.
  useEffect(() => {
    let timerId;
    if (location?.pathname === "/products") {
      timerId = setTimeout(() => {
        filterDispatch({ type: TYPE.FILTER_BY_SEARCH, payload: search });
      }, 500);
    }
    return () => clearTimeout(timerId);
  }, [search]);

  // For keeping search bar text and appliedFilters state in sync.
  useEffect(() => {
    setSearch(appliedFilters.filterBySearch);
  }, [appliedFilters]);

  const searchInputChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const searchFormSubmitHandler = (e) => {
    e.preventDefault();
    filterDispatch({ type: TYPE.FILTER_BY_SEARCH, payload: search });
    navigate("/products");
  };

  return (
    <header>
      <nav>
        <Link to="/">
          <div className="logo">
            <p>Kitaab</p>
          </div>
        </Link>

        <form className="search-input" onSubmit={searchFormSubmitHandler}>
          <input
            type="text"
            value={search}
            onChange={searchInputChangeHandler}
          />
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>

        <ul className="nav-links">
          <li className="list">
            <Link to="/wishlist">
              <FontAwesomeIcon icon={faHeart} />
            </Link>
            {wishlist.length > 0 && (
              <div className="list-count">
                <span>{wishlist.length}</span>
              </div>
            )}
          </li>
          <li className="list">
            <Link to="/cart">
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
            {cart.length > 0 && (
              <div className="list-count">
                <span>{cart.length}</span>
              </div>
            )}
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
