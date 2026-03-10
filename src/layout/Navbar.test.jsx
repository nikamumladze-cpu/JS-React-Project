import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HashRouter } from "react-router-dom";
import { LanguageProvider } from "../context/LanguageContext";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import Navbar from "./Navbar";

const renderNavbar = () => {
  return render(
    <LanguageProvider>
      <WishlistProvider>
        <CartProvider>
          <HashRouter>
            <Navbar />
          </HashRouter>
        </CartProvider>
      </WishlistProvider>
    </LanguageProvider>,
  );
};

describe("Navbar Component", () => {
  it("უნდა გამოაჩინოს ლოგო ტექსტით TECH", () => {
    renderNavbar();
    const logoElements = screen.getAllByText(/TECH/i);
    expect(logoElements[0]).toBeInTheDocument();
  });

  it("ენის გადამრთველი ღილაკი უნდა მუშაობდეს", () => {
    renderNavbar();

    const langBtn = screen.getByTestId("lang-switcher");
    const initialText = langBtn.textContent.trim();

    fireEvent.click(langBtn);

    expect(langBtn.textContent.trim()).not.toBe(initialText);
  });

  it("უნდა გამოაჩინოს ძებნის ინპუტი სწორი Placeholder-ით", () => {
    renderNavbar();
    const searchInput = screen.getByPlaceholderText(/Search|მოძებნე/i);
    expect(searchInput).toBeInTheDocument();
  });
});
