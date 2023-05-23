import React from "react";

const CategoriesCard = ({ category }) => {
  const { description, categoryTitle } = category;
  return (
    <div className="categories-card">
      <h1 className="categories-card__title">{categoryTitle}</h1>
      <p>{description}</p>
    </div>
  );
};

export default CategoriesCard;
