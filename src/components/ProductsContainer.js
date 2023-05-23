import React from "react";
import ProductsCard from "./UI/ProductsCard";
import { useDataContext } from "../context/dataContext";

const ProductsContainer = ({ products }) => {
  const { loader, drawer, setDrawer } = useDataContext();

  const showFilterHandler = () => {
    setDrawer(true);
  };

  return loader ? (
    <section className="products-container">
      <h2 className="products-loading">Loading Products...</h2>
    </section>
  ) : (
    <section
      className="products-container"
      onClick={() => drawer && setDrawer(!drawer)}
    >
      {products.length > 0 ? (
        <>
          <div className="products-header">
            <button className="show-filter-btn" onClick={showFilterHandler}>
              Filters
            </button>
            <div className="products-header__text">
              <h1>Showing all products</h1>
              <span>({products.length})</span>
            </div>
          </div>

          <div className="products-items">
            {products.map((product) => {
              return <ProductsCard product={product} key={product._id} />;
            })}
          </div>
        </>
      ) : (
        <p className="no-products-found">
          ❌ No Products Found for applied filters
        </p>
      )}
      <div
        className={drawer ? "products-container-overlay" : ""}
        onClick={() => setDrawer(false)}
      ></div>
    </section>
  );
};

export default ProductsContainer;
