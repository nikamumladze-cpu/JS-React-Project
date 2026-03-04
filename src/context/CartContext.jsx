import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart(
      (prev) =>
        prev
          .map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + amount }
              : item,
          )
          .filter((item) => item.quantity > 0), 
    );
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalPrice,
        cartCount,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
