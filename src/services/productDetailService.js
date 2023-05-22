import axios from "axios";

export const getProduct = async (productId, setProduct, setLoader) => {
  try {
    setLoader(true);
    const res = await axios.get(`/api/products/${productId}`);
    setLoader(false);
    setProduct(res.data.product);
  } catch (error) {
    console.log(error);
  }
};
