import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { dataInitialState, dataReducer } from "../reducer/DataReducer";
import { TYPE } from "../utils/constants";
import axios from "axios";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, dataInitialState);
  const [loader, setLoader] = useState(false);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const loadCategories = async () => {
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

  const loadProducts = async () => {
    try {
      setLoader(true);
      const res = await axios.get("/api/products");
      setTimeout(() => {
        setLoader(false);
      }, 1000);
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
        addresses: state.addresses,
        dataDispatch: dispatch,
        loader,
        setLoader,
        drawer,
        setDrawer,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);

export default DataProvider;
