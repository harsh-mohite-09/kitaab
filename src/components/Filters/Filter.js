import React, { useEffect } from "react";
import { useDataContext } from "../../context/dataContext";
import { TYPE } from "../../utils/constants";
import { useFilterContext } from "../../context/filterContext";

const Filter = () => {
  const { categories, drawer, setDrawer } = useDataContext();
  const { appliedFilters, filterDispatch } = useFilterContext();
  const ratings = [1, 2, 3, 4];

  const handlePriceFilter = (e) => {
    filterDispatch({
      type: TYPE.FILTER_BY_PRICE_RANGE,
      payload: e.target.value,
    });
  };

  const handleCategoryFilter = (e) => {
    if (e.target.checked) {
      filterDispatch({
        type: TYPE.ADD_CATEGORY_FILTER,
        payload: e.target.value,
      });
    } else {
      filterDispatch({
        type: TYPE.REMOVE_CATEGORY_FILTER,
        payload: e.target.value,
      });
    }
  };

  const handleRatingFilter = (e) => {
    filterDispatch({ type: TYPE.FILTER_BY_RATING, payload: e.target.value });
  };

  const handleSort = (e) => {
    filterDispatch({ type: TYPE.SORT_BY_PRICE, payload: e.target.value });
  };

  const handleClearFilters = () => {
    filterDispatch({ type: TYPE.CLEAR_FILTERS });
    setDrawer(false);
  };

  const handlerCloseFitlers = () => {
    setDrawer(false);
  };

  useEffect(() => () => setDrawer(false), [setDrawer]);

  return (
    <aside
      className={`filter-container ${drawer ? "show-filter" : "hide-filter"}`}
    >
      <div className="filter-head">
        <div>
          <h4>Filters</h4>
        </div>
        <button className="filter-apply-btn" onClick={handlerCloseFitlers}>
          Apply
        </button>
        <button className="filter-clear-btn" onClick={handleClearFilters}>
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
            step="100"
            value={appliedFilters.filterByPriceRange}
            onChange={handlePriceFilter}
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
                  onChange={handleCategoryFilter}
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
                  onChange={handleRatingFilter}
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
              onChange={handleSort}
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
              onChange={handleSort}
            />
            <span className="check-desc">Price - High to Low</span>
          </label>
        </div>
      </div>
    </aside>
  );
};

export default Filter;
