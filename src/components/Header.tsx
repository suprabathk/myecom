"use client";

import { UserIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import Cart from "./Cart";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json));
  }, []);

  return (
    <div className="header">
      <p id="logo">Sample Ecom</p>
      <div className="searchBar">
        <div className="categoryDropDown">
          <button
            className="dropDownBtn"
            onClick={() => setShowDropDown((s) => !s)}
          >
            <span>All Categories</span>
            <ChevronDownIcon className="icon6" />
          </button>
          <ul hidden={!showDropDown}>
            {categories.map((category, id) => (
              <li key={id}>
                <p className="dropDownItem">{category}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="searchField">
          <span>Search Products, Categories...</span>
          <MagnifyingGlassIcon className="icon6" />
        </div>
      </div>
      <div className="navbarIcons">
        <UserIcon className="icon6" />
        <div>
          <ShoppingBagIcon
            className="icon6"
            onClick={() => setShowCart((s) => !s)}
          />
          <div className="cartModal" hidden={!showCart}>
            <Cart closeModal={() => setShowCart(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
