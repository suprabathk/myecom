"use client";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

const CategoryBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json));
  }, []);
  return (
    <div className="categoryBar">
      {categories &&
        categories.map((category, id) => (
          <div key={id}>
            <span className="categoryBarItem">{category}</span>
            <ChevronDownIcon className="icon4" />
          </div>
        ))}
    </div>
  );
};

export default CategoryBar;
