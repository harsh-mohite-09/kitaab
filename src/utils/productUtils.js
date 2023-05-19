const isProductInCart = (cart, productId) => {
  return cart.some((product) => product._id === productId);
};

const isProductInWishlist = (wishlist, productId) => {
  return wishlist.some((product) => product._id === productId);
};

export { isProductInCart, isProductInWishlist };
