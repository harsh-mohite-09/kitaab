import axios from "axios";
import { TYPE, TOAST_CONFIG } from "../utils/constants";
import { toast } from "react-toastify";

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

    toast.success("Added To Wishlist", TOAST_CONFIG);

    console.log(response.data.wishlist);

    dataDispatch({
      type: TYPE.ADD_TO_WISHLIST,
      payload: response.data.wishlist,
    });
  } catch (error) {
    console.log("Error in addToWishlist", error);
  }
};

export const removeFromWishlist = async (
  dataDispatch,
  productId,
  token,
  isClearing
) => {
  try {
    const response = await axios.delete(`/api/user/wishlist/${productId}`, {
      headers: {
        authorization: token,
      },
    });

    if (!isClearing) {
      toast.warn("Removed From Wishlist", TOAST_CONFIG);
    }

    console.log(response.data.wishlist);

    dataDispatch({
      type: TYPE.REMOVE_FROM_WISHLIST,
      payload: response.data.wishlist,
    });
  } catch (error) {
    console.log("Error in addToWishlist", error);
  }
};
