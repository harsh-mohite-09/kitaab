import React from "react";
import ProductsCard from "./UI/ProductsCard";
import { Link } from "react-router-dom";

const ProductsContainer = ({ products }) => {
  return (
    <section className="products-container">
      {!products.length > 0 ? (
        <p>Loading Products...</p>
      ) : (
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
      )}
    </section>
  );
};

export default ProductsContainer;
