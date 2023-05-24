const isProductInCart = (cart, productId) => {
  return cart.some((product) => product._id === productId);
};

const isProductInWishlist = (wishlist, productId) => {
  return wishlist.some((product) => product._id === productId);
};

const getDiscountPercent = (originalPrice, price) =>
  ((originalPrice - price) / originalPrice) * 100;

export { isProductInCart, isProductInWishlist, getDiscountPercent };
