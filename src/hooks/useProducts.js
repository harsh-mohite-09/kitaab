import { useState, useEffect } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data.products);
  };

  return products;
};
