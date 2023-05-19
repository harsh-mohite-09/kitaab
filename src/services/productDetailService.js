import axios from "axios";

export const getProduct = async (productId, setProduct) => {
  try {
    const res = await axios.get(`/api/products/${productId}`);
    setProduct(res.data.product);
  } catch (error) {
    console.log(error);
  }
};
