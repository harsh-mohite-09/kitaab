import React from "react";

const CategoriesCard = ({ category }) => {
  const { categoryName, description } = category;
  return (
    <div className="categories-card">
      <h1 className="categories-card__title">{categoryName}</h1>
      <p>{description}</p>
    </div>
  );
};

export default CategoriesCard;
