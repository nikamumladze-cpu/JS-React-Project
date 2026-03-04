import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./layout/Navbar";
import Foot from "./components/Foot";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist"; 

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--color-bg-card)",
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-border-main)",
            borderRadius: "1.5rem",
            fontSize: "14px",
            fontWeight: "bold",
            padding: "16px 24px",
          },
        }}
      />

      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-10 grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />{" "}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>

      <Foot />
    </div>
  );
}

export default App;
