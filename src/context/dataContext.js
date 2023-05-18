import { createContext, useContext, useEffect, useReducer } from "react";
import { dataInitialState, dataReducer } from "../reducer/DataReducer";
import { TYPE } from "../utils/constants";
import axios from "axios";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, dataInitialState);

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await axios.get("/api/categories");
      dispatch({
        type: TYPE.LOAD_CATEGORIES,
        payload: res.data.categories,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      dispatch({
        type: TYPE.LOAD_PRODUCTS,
        payload: res.data.products,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        cart: state.cart,
        wishlist: state.wishlist,
        categories: state.categories,
        products: state.products,
        dataDispatch: dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);

export default DataProvider;
