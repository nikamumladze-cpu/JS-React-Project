import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Cpu,
  LogOut,
  LogIn,
  UserPlus,
  Search,
  Menu,
  Globe,
  Heart,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { useWishlist } from "../context/WishlistContext";
import DarkModeToggle from "../components/DarkModeToggle";
import BurgerMenu from "../components/BurgerMenu";

const Navbar = () => {
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length;
  const { lang, switchLanguage, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const fullName = localStorage.getItem("fullName");
  const userName = localStorage.getItem("username");

  const displayName =
    fullName || (userName?.includes("@") ? userName.split("@")[0] : userName);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/registration";

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(searchQuery.trim() ? `/?search=${searchQuery}` : "/");
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("fullName");
    window.location.reload();
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "h-16 backdrop-blur-lg shadow-lg" : "h-20 backdrop-blur-md"
        }`}
        style={{
          backgroundColor: scrolled ? "var(--bg-nav-scroll)" : "var(--bg-nav)",
          borderColor: "var(--border-color)",
          borderBottomWidth: "1px",
        }}>
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-indigo-500/20">
              <Cpu className="text-white size-6" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-2xl font-black tracking-tighter text-indigo-500 italic uppercase">
                TECH
              </span>
              <span
                className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 px-0.5"
                style={{ color: "var(--color-text-primary)" }}>
                Store
              </span>
            </div>
          </Link>

          {!isAuthPage && (
            <form
              onSubmit={handleSearch}
              className="flex-1 max-w-md relative hidden md:block group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder={t.searchPlaceholder || "Search gadgets..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/50 font-bold transition-all"
                style={{
                  backgroundColor: "var(--bg-input)",
                  color: "var(--color-text-primary)",
                  border: "1px solid var(--border-color)",
                }}
              />
            </form>
          )}

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-4 bg-(--bg-input)] px-4 py-2 rounded-2xl border border-(--border-color)]">
              <button
                data-testid="lang-switcher"
                onClick={() => switchLanguage(lang === "ka" ? "en" : "ka")}
                className="flex items-center gap-2 font-black text-[10px] tracking-widest cursor-pointer hover:text-indigo-500 transition-colors uppercase"
                style={{ color: "var(--color-text-primary)" }}>
                <Globe size={14} className="text-indigo-600" />
                {lang === "ka" ? "EN" : "KA"}
              </button>
              <div className="w-px h-4 bg-gray-500/30" />
              <DarkModeToggle />
            </div>

            {!isAuthPage && (
              <div className="flex items-center gap-2">
                <Link to="/wishlist" className="relative group">
                  <div
                    className="p-3 rounded-2xl transition-all hover:bg-red-500/10"
                    style={{ backgroundColor: "var(--bg-input)" }}>
                    <Heart
                      size={20}
                      style={{
                        color:
                          wishlistCount > 0
                            ? "#ef4444"
                            : "var(--color-text-primary)",
                      }}
                      className={`${wishlistCount > 0 ? "fill-current" : "opacity-70 group-hover:opacity-100"}`}
                    />
                  </div>
                </Link>

                <Link to="/cart" className="relative group">
                  <div
                    className="p-3 rounded-2xl transition-all hover:bg-indigo-500/10"
                    style={{ backgroundColor: "var(--bg-input)" }}>
                    <ShoppingCart
                      size={20}
                      style={{ color: "var(--color-text-primary)" }}
                      className="opacity-70 group-hover:opacity-100"
                    />
                  </div>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[9px] font-black size-5 flex items-center justify-center rounded-full border-2 border-(--bg-nav)]">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="md:hidden p-3 rounded-2xl transition-transform bg-(--bg-input)] text-(--color-text-primary)] hover:scale-105 active:scale-95">
                  <Menu size={20} />
                </button>
              </div>
            )}

            <div className="hidden md:flex items-center gap-2 border-l border-(--border-color)] pl-4">
              {userName ? (
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] uppercase font-black opacity-40 text-(--color-text-primary)]">
                      Account
                    </span>
                    <span className="text-xs font-bold text-(--color-text-primary)]">
                      {displayName}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="p-3 text-(--color-text-primary)] opacity-70 hover:opacity-100 transition-opacity"
                    title={t.login || "Login"}>
                    <LogIn size={20} />
                  </Link>
                  <Link
                    to="/registration"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                    <UserPlus size={16} />
                    <span className="hidden lg:inline">
                      {t.register || "Register"}
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {!isAuthPage && (
        <BurgerMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          userName={displayName}
          handleLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Navbar;
