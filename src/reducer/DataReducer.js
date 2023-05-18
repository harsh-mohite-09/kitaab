import { TYPE } from "../utils/constants";

export const dataInitialState = {
  cart: [],
  wishlist: [],
  products: [],
  categories: [],
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case TYPE.LOAD_CATEGORIES:
      return {
        ...state,
        categories: [...action.payload],
      };

    case TYPE.LOAD_PRODUCTS:
      return {
        ...state,
        products: [...action.payload],
      };

    case TYPE.ADD_TO_CART:
      return {
        ...state,
        cart: [...action.payload],
      };

    case TYPE.ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...action.payload],
      };

    default:
      return;
  }
};
