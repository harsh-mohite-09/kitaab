import React from "react";

const Filter = () => {
  return (
    <aside className="filter-container">
      <div className="filter-head">
        <h4>Filters</h4>
        <p className="paragraph-md clr-flt-btn">Clear</p>
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
          />
        </div>
      </div>
      <div className="filter-category">
        <h4>Category</h4>
        <div className="flex-gap"></div>
      </div>
      <div className="filter-rating">
        <h4>Rating</h4>
        <div className="flex-gap"></div>
      </div>
      <div className="filter-sort">
        <h4>Sort by</h4>
        <div className="flex-gap">
          <label className="select-input">
            <input type="radio" name="sort" className="radio-input" />
            <span className="check-desc">Price - Low to High</span>
          </label>
          <label className="select-input">
            <input type="radio" name="sort" className="radio-input" />
            <span className="check-desc">Price - High to Low</span>
          </label>
        </div>
      </div>
    </aside>
  );
};

export default Filter;
