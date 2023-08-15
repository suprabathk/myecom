"use client";
import { Product } from "@/types/types";
import React, { useState } from "react";

interface CartState {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CartContext = React.createContext<CartState | undefined>(undefined);

export const CartProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const cartContext = React.useContext(CartContext);
  if (cartContext === undefined) {
    throw new Error("cartContext must be inside a CartProvider");
  }
  return cartContext;
};
