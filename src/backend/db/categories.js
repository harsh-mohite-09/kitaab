import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "fiction",
    categoryTitle: "Fiction",
    description:
      "Explore the world of imagination and storytelling with our collection of fictional books",
  },
  {
    _id: uuid(),
    categoryName: "non-fiction",
    categoryTitle: "Non-Fiction",
    description:
      "Discover real-life stories, knowledge, and facts with our extensive non-fiction book collection",
  },
  {
    _id: uuid(),
    categoryName: "self-help",
    categoryTitle: "Self Help",
    description:
      "Find inspiration, guidance, and personal growth through our selection of self-help books",
  },
];
