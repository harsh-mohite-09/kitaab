import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";

const ProductsCard = ({ product }) => {
  const { token } = useAuthContext();
  const { img, name, price } = product;

  const addToCartHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/user/cart",
        {
          product,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-card">
      <div className="product-card__image">
        <img src={img} alt="product" />
        <div className="product_card__wishlist-icon">
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>
      <div className="product-card__details">
        <p>{name}</p>
        <p>
          <b>₹{price}</b>
        </p>
      </div>
      <button className="product-card__btn" onClick={addToCartHandler}>
        Add To Cart
      </button>
    </div>
  );
};

export default ProductsCard;
