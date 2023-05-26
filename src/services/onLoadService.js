import axios from "axios";
import { TYPE } from "../utils/constants";

export const loadCategories = async (setLoader, dispatch) => {
  try {
    setLoader(true);
    const res = await axios.get("/api/categories");

    setLoader(false);

    dispatch({
      type: TYPE.LOAD_CATEGORIES,
      payload: res.data.categories,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loadProducts = async (setLoader, dispatch) => {
  try {
    setLoader(true);
    const res = await axios.get("/api/products");
    setLoader(false);

    dispatch({
      type: TYPE.LOAD_PRODUCTS,
      payload: res.data.products,
    });
  } catch (error) {
    console.log(error);
  }
};
