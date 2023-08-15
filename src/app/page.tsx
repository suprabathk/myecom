/* eslint-disable @next/next/no-img-element */
"use client";

import FiltersBar from "@/components/FiltersBar";
import { Product } from "@/types/types";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { PlusIcon, StarIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useCartContext } from "@/context/CartContext";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { cart, setCart } = useCartContext();

  const fetchProducts = (category: string) => {
    fetch(
      `https://fakestoreapi.com/products${
        category.length > 0 ? `/category/${category}` : ""
      }`
    )
      .then((res) => res.json())
      .then((json) => setProducts(json));
  };

  const onAddToCart = (product: Product, discount: number) => {
    let flag = false;
    setCart((cart) => {
      const newCart = cart.map((prod) => {
        if (prod.id === product.id) {
          flag = true;
          return {
            ...prod,
            cartCount: prod.cartCount ? prod.cartCount + 1 : 1,
          };
        } else {
          return prod;
        }
      });
      return flag
        ? newCart
        : [...cart, { ...product, cartCount: 1, discount: discount }];
    });
  };

  useEffect(() => {
    fetchProducts("");
  }, []);

  return (
    <div className="productsBody">
      <FiltersBar fetchProducts={fetchProducts} />
      <div className="productsGrid">
        {products.map((product, id) => {
          const discount = Math.floor(Math.random() * (60 - 20 - +1)) + 20;
          return (
            <div key={id} className="productCard">
              <div className="productImageSection">
                <p className="discountBubble">- {discount}%</p>
                <img
                  src={product.image}
                  alt="product-image"
                  className="productImage"
                />
              </div>
              <p className="productTitle">{product.title}</p>
              <p className="productDescription">{product.description}</p>
              <div className="ratingRow">
                {Array.from(Array(Math.floor(product.rating.rate)).keys()).map(
                  (r) => (
                    <StarIcon key={r} className="productActiveStar" />
                  )
                )}
                {Array.from(
                  Array(5 - Math.floor(product.rating.rate)).keys()
                ).map((r) => (
                  <StarIcon key={r} className="productInactiveStar" />
                ))}
              </div>
              <div className="cardActions">
                <div className="productCardPrices">
                  <p className="productCardPrice">
                    {(
                      Number.parseFloat(product.price) -
                      (discount / 100) * Number.parseFloat(product.price)
                    ).toFixed(2)}{" "}
                    USD
                  </p>
                  <p className="productCardMRP">
                    {Number.parseFloat(product.price).toFixed(2)} USD
                  </p>
                </div>
                <button
                  onClick={() => onAddToCart(product, discount)}
                  className="addToCartBtn"
                >
                  <ShoppingBagIcon className="icon4" />
                  <span>Add to cart</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
