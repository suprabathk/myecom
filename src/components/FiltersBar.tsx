import { StarIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const FiltersBar = ({
  fetchProducts,
}: {
  fetchProducts: (category: string) => void;
}) => {
  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  const brands = [
    "Royal Fields",
    "Crasmas Fields",
    "Vegetarisma Farm",
    "Farmer Field Eve",
    "True Farmer Steve",
  ];

  const subCategories = ["Mobile", "Laptops, Computers", "TV"];

  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="filtersSideBar">
      <div className="filterSection">
        <p className="filterSectionTitle">Categories</p>
        <div>
          {categories &&
            categories.map((category, id) => (
              <div key={id}>
                <input
                  type="radio"
                  id={`${category}+checkbox`}
                  name="category"
                  checked={category === selectedCategory}
                  readOnly
                  onClick={() => setSelectedCategory(category)}
                  className="checkBox"
                />
                <label
                  htmlFor={`${category}+checkbox`}
                  className="checkBoxLabel"
                >
                  {category}
                </label>
                <div className="subCategorySection">
                  {category === selectedCategory &&
                    subCategories.map((subCategory, id) => (
                      <div key={id}>
                        <input
                          type="radio"
                          id={`${subCategory}+checkbox`}
                          name="subCategory"
                          readOnly
                          className="subCategoryCheckBox"
                        />
                        <label
                          htmlFor={`${subCategory}+checkbox`}
                          className="checkBoxLabel"
                        >
                          {subCategory}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="filterSection">
        <p className="filterSectionTitle">Brands</p>
        <div>
          {brands &&
            brands.map((brand, id) => (
              <div key={id}>
                <input
                  type="checkbox"
                  id={`${brand}+checkbox`}
                  className="checkBox"
                />
                <label htmlFor={`${brand}+checkbox`} className="checkBoxLabel">
                  {brand}
                </label>
              </div>
            ))}
        </div>
      </div>
      <div className="filterSection">
        <p className="filterSectionTitle">Rating</p>
        <div>
          {Array.from(Array(5).keys())
            .reverse()
            .map((rating, id) => (
              <div key={id} className="ratingStarRow">
                <input
                  type="checkbox"
                  id={`${rating}+checkbox`}
                  className="checkBox"
                />
                <label htmlFor={`${rating}+checkbox`} className="checkBoxLabel">
                  {Array.from(Array(rating + 1).keys()).map((r) => (
                    <StarIcon key={r} className="activeStar" />
                  ))}
                  {Array.from(Array(4 - rating).keys()).map((r) => (
                    <StarIcon key={r} className="inactiveStar" />
                  ))}
                </label>
              </div>
            ))}
        </div>
      </div>
      <div className="filterSection">
        <p className="filterSectionTitle">Price</p>
        <div>
          <input id="default-range" type="range" className="rangeSlider" />
        </div>
        <div className="priceRangeDiv">
          <input
            type="number"
            name="min"
            id="min"
            placeholder="Min"
            className="priceInput"
          />
          <span>-</span>
          <input
            type="number"
            name="max"
            id="max"
            placeholder="Max"
            className="priceInput"
          />
        </div>
      </div>
      <div className="filterButtonRow">
        <button
          className="filterButton filterApplyButton"
          id="applyFilter"
          onClick={() => fetchProducts(selectedCategory)}
        >
          Apply
        </button>
        <button
          className="filterButton filterResetButton"
          onClick={() => {
            setSelectedCategory("");
            fetchProducts("");
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FiltersBar;
