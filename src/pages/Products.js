import React from "react";
import { useProducts } from "../hooks/useProducts";
import Filter from "../components/Filters/Filter";
import ProductsContainer from "../components/ProductsContainer";

const ProductsPage = () => {
  const products = useProducts();

  console.log(products);

  return (
    <main className="products-page">
      <Filter />
      <ProductsContainer />
    </main>
  );
};

export default ProductsPage;
