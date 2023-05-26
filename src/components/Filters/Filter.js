import React, { useEffect } from "react";
import { useDataContext } from "../../context/dataContext";
import { TYPE } from "../../utils/constants";
import { useFilterContext } from "../../context/filterContext";

const Filter = () => {
  const { categories, drawer, setDrawer } = useDataContext();
  const { appliedFilters, filterDispatch } = useFilterContext();
  const ratings = [1, 2, 3, 4];

  const handleFilter = (e, filterType) => {
    filterDispatch({ type: filterType, payload: e.target.value });
  };

  const handlerClearFilters = () => {
    filterDispatch({ type: TYPE.CLEAR_FILTERS });
    setDrawer(false);
  };

  useEffect(() => () => setDrawer(false), [setDrawer]);

  return (
    <aside
      className={`filter-container ${drawer ? "show-filter" : "hide-filter"}`}
    >
      <div className="filter-head">
        <div onClick={() => setDrawer(false)}>
          <h4>{drawer ? "⬅️" : ""}Filters</h4>
        </div>
        <button className="filter-clear-btn" onClick={handlerClearFilters}>
          Clear
        </button>
      </div>
      <div className="filter-price">
        <h4>Price</h4>
        <div className="flex-gap">
          <div className="price-range">
            <p>100</p>
            <p>500</p>
            <p>1000</p>
          </div>
          <input
            type="range"
            name="rangeInput"
            className="slider"
            min="100"
            max="1000"
            step="50"
            value={appliedFilters.filterByPriceRange}
            // onChange={handlePriceFilter}
            onChange={(e) => handleFilter(e, TYPE.FILTER_BY_PRICE_RANGE)}
          />
        </div>
      </div>
      <div className="filter-category">
        <h4>Category</h4>
        <ul className="category-list flex-gap">
          {categories.map(({ _id, categoryName, categoryTitle }) => {
            return (
              <li key={_id} className="category-list__item">
                <input
                  type="checkbox"
                  name={categoryName}
                  id={categoryName}
                  value={categoryName}
                  checked={appliedFilters.filterByCategories.includes(
                    categoryName
                  )}
                  // onChange={handleCategoryFilter}
                  onChange={(e) => handleFilter(e, TYPE.FILTER_BY_CATEGORIES)}
                />
                <label htmlFor={categoryName}>{categoryTitle}</label>
              </li>
            );
          })}
        </ul>
        <div className="flex-gap"></div>
      </div>
      <div className="filter-rating">
        <h4>Rating</h4>
        <ul className="rating-list flex-gap">
          {ratings.map((rating) => {
            return (
              <li key={rating} className="rating-list__item">
                <input
                  type="radio"
                  name="ratings"
                  id={rating}
                  value={rating}
                  checked={rating === +appliedFilters.filterByRating}
                  // onChange={handleRatingFilter}
                  onChange={(e) => handleFilter(e, TYPE.FILTER_BY_RATING)}
                />
                <label htmlFor={rating}>
                  {rating} {`star${rating !== 1 ? "s" : ""}`} & above
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="filter-sort">
        <h4>Sort by</h4>
        <div className="flex-gap">
          <label className="select-input">
            <input
              type="radio"
              name="sort"
              value="LOW_TO_HIGH"
              className="radio-input"
              checked={appliedFilters.sortByPrice === "LOW_TO_HIGH"}
              // onChange={handleSort}
              onChange={(e) => handleFilter(e, TYPE.SORT_BY_PRICE)}
            />
            <span className="check-desc">Price - Low to High</span>
          </label>
          <label className="select-input">
            <input
              type="radio"
              name="sort"
              value="HIGH_TO_LOW"
              className="radio-input"
              checked={appliedFilters.sortByPrice === "HIGH_TO_LOW"}
              // onChange={handleSort}
              onChange={(e) => handleFilter(e, TYPE.SORT_BY_PRICE)}
            />
            <span className="check-desc">Price - High to Low</span>
          </label>
        </div>
      </div>
    </aside>
  );
};

export default Filter;
