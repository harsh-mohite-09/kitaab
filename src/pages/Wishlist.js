import React from "react";
import { useDataContext } from "../context/dataContext";
import ProductsCard from "../components/UI/ProductsCard";

const WishlistPage = () => {
  const { wishlist } = useDataContext();

  return (
    <main className="wishlist-page">
      <h2 className="wishlist-header">Wishlist ({wishlist.length})</h2>
      {wishlist.length === 0 ? (
        <p className="wishlist-empty">No Items in Wishilst!</p>
      ) : (
        <div className="wishlist-container">
          {wishlist.map((product) => {
            return <ProductsCard product={product} key={product._id} />;
          })}
        </div>
      )}
    </main>
  );
};

export default WishlistPage;
