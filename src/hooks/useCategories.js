import { useState, useEffect } from "react";
import axios from "axios";

export const useCategories = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const res = await axios.get("/api/categories");
    // const data = await res.json();
    setCategories(res.data.categories);
  };

  return categories;
};
