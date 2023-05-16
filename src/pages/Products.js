import React from "react";
import { useProducts } from "../hooks/useProducts";

const ProductsPage = () => {
  const products = useProducts();

  console.log(products);

  return (
    <main>
      <h1>Products Page</h1>
    </main>
  );
};

export default ProductsPage;
