import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { DarkModeProvider } from "./context/DarkModeContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { HashRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <HashRouter>
        <DarkModeProvider>
          <WishlistProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </WishlistProvider>
        </DarkModeProvider>
      </HashRouter>
    </LanguageProvider>
  </React.StrictMode>,
);
