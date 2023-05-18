import React from "react";
import Filter from "../components/Filters/Filter";
import ProductsContainer from "../components/ProductsContainer";
import { useDataContext } from "../context/dataContext";

const ProductsPage = () => {
  const { products } = useDataContext();

  return (
    <main className="products-page">
      <Filter />
      <ProductsContainer products={products} />
    </main>
  );
};

export default ProductsPage;
