import React from "react";
import ProductsCard from "./UI/ProductsCard";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/dataContext";

const ProductsContainer = ({ products }) => {
  const { loader } = useDataContext();
  return loader ? (
    <section className="products-container">
      <h2 className="products-loading">Loading Products...</h2>
    </section>
  ) : (
    <section className="products-container">
      {products.length > 0 ? (
        <>
          <div className="products-header">
            <h1>Showing all products</h1>
            <span>(Showing {products.length} products)</span>
          </div>
          <div className="products-items">
            {products.map((product) => {
              return (
                <Link to={product._id} key={product._id}>
                  <ProductsCard product={product} />
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        <p className="no-products-found">
          ❌ No Products Found for applied filters
        </p>
      )}
    </section>
  );
};

export default ProductsContainer;
