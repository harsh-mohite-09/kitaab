import React from "react";
import Filter from "../components/Filters/Filter";
import ProductsContainer from "../components/ProductsContainer";
import { useDataContext } from "../context/dataContext";
import { useFilterContext } from "../context/filterContext";
import { getFilteredProducts } from "../utils/getFilteredProducts";

const ProductsPage = () => {
  const { products } = useDataContext();
  const { appliedFilters } = useFilterContext();

  const filterdProducts = getFilteredProducts(products, appliedFilters);

  console.log(filterdProducts);

  console.log(appliedFilters);
  return (
    <main className="products-page">
      <Filter />
      <ProductsContainer products={filterdProducts} />
    </main>
  );
};

export default ProductsPage;
