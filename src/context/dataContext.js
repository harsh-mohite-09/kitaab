import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { dataInitialState, dataReducer } from "../reducer/DataReducer";
import { useAuthContext } from "./authContext";
import { loadCategories, loadProducts } from "../services/onLoadService";
import { TYPE } from "../utils/constants";

const DataContext = createContext({
  cart: [],
  wishlist: [],
  categories: [],
  products: [],
  addresses: [],
  loader: "",
  drawer: "",
  dataDispatch: () => {},
  setLoader: () => {},
  setDrawer: () => {},
});

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, dataInitialState);
  const [loader, setLoader] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    loadCategories(setLoader, dispatch);
    loadProducts(setLoader, dispatch);
  }, []);

  // Read authContext comments to understand the reason for using this useEffect below.
  // Whenever user logs in, dataContext is updated with the cart and wishlist details received in the user data.

  useEffect(() => {
    if (user) {
      dispatch({ type: TYPE.ADD_TO_CART, payload: user.cart });
      dispatch({ type: TYPE.ADD_TO_WISHLIST, payload: user.wishlist });
    }
  }, [user]);

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
