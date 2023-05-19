import axios from "axios";
import { TYPE } from "../utils/constants";

export const addToWishlist = async (dataDispatch, product, token) => {
  try {
    const response = await axios.post(
      "/api/user/wishlist",
      {
        product,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );

    console.log(response.data.wishlist);

    dataDispatch({
      type: TYPE.ADD_TO_WISHLIST,
      payload: response.data.wishlist,
    });
  } catch (error) {
    console.log("Error in addToWishlist", error);
  }
};

export const removeFromWishlist = async (dataDispatch, productId, token) => {
  try {
    const response = await axios.delete(`/api/user/wishlist/${productId}`, {
      headers: {
        authorization: token,
      },
    });

    console.log(response.data.wishlist);

    dataDispatch({
      type: TYPE.REMOVE_FROM_WISHLIST,
      payload: response.data.wishlist,
    });
  } catch (error) {
    console.log("Error in addToWishlist", error);
  }
};
