import { createContext, useContext, useReducer } from "react";
import { filterInitialState, filterReducer } from "../reducer/FilterReducer";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, filterInitialState);

  return (
    <FilterContext.Provider
      value={{ appliedFilters: state, filterDispatch: dispatch }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);

export default FilterProvider;
