import React from "react";
import Footer from "../components/RootLayout/Footer";
import books from "../images/books.jpg";
import { Link } from "react-router-dom";
import CategoriesCard from "../components/UI/CategoriesCard";
import { useDataContext } from "../context/dataContext";
import { useFilterContext } from "../context/filterContext";
import { TYPE } from "../utils/constants";

const HomePage = () => {
  const { categories } = useDataContext();
  const { filterDispatch } = useFilterContext();

  const categoryFilterHandler = ({ categoryName }) => {
    filterDispatch({ type: TYPE.CLEAR_FILTERS });
    filterDispatch({
      type: TYPE.ADD_CATEGORY_FILTER,
      payload: categoryName,
    });
  };

  return (
    <>
      <main className="home">
        <section className="home-container">
          <div className="home-container__info">
            <div className="info-header">
              <h1 className="info-header__greeting">Welcome to Kitaab</h1>
              <p className="info-header__title">
                One stop solution for your reading needs.
              </p>
            </div>
            <Link to="/products">
              <button className="shop-btn">Shop Now</button>
            </Link>
          </div>
          <div className="books-img">
            <img src={books} alt="" />
          </div>
        </section>
        {categories && (
          <section className="categories">
            <h1 className="categories__title">Explore Categories</h1>
            <div className="categories__container">
              {categories.map((item) => {
                return (
                  <Link
                    to="/products"
                    key={item.id}
                    onClick={() => categoryFilterHandler(item)}
                  >
                    <CategoriesCard category={item} />
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
