import React from "react";
import { Link } from "react-router-dom";
import {
  X,
  LogIn,
  UserPlus,
  ShoppingCart,
  Home,
  LogOut,
  Globe,
  Heart,
  Settings2,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import DarkModeToggle from "../components/DarkModeToggle";

const BurgerMenu = ({ isOpen, onClose, userName, handleLogout }) => {
  const { lang, switchLanguage, t } = useLanguage();

  return (
    <div
      className={`fixed inset-0 z-100 backdrop-blur-3xl transition-all duration-700 md:hidden
        ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      style={{
        backgroundColor: "var(--bg-nav)", 
        color: "var(--color-text-primary)",
      }}>
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-white/10">
            <DarkModeToggle />
          </div>
          <button
            onClick={() => switchLanguage(lang === "ka" ? "en" : "ka")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-white/10 font-black text-[10px] tracking-widest uppercase transition-colors hover:bg-indigo-600/10">
            <Globe size={14} className="text-indigo-600" />
            {lang === "ka" ? "EN" : "KA"}
          </button>
        </div>

        <button
          onClick={onClose}
          className="p-3 bg-black/5 dark:bg-white/5 rounded-2xl cursor-pointer hover:rotate-90 transition-transform border border-white/10">
          <X size={24} className="text-indigo-500" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center h-full gap-10 px-8">
        <nav className="flex flex-col items-center gap-8">
          {[
            {
              to: "/",
              icon: Home,
              label: t.navHome || "მთავარი",
              color: "text-indigo-500",
            },
            {
              to: "/wishlist",
              icon: Heart,
              label: t.wishlistTitle || "ფავორიტები",
              color: "text-red-500",
            },
            {
              to: "/cart",
              icon: ShoppingCart,
              label: t.cartTitle || "კალათა",
              color: "text-indigo-500",
            },
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              onClick={onClose}
              className="flex items-center gap-5 text-4xl font-black uppercase tracking-tighter group transition-transform active:scale-90">
              <item.icon size={32} className={item.color} />
              <span className="group-hover:text-indigo-500 transition-colors">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="w-20 h-1 bg-indigo-600/20 rounded-full" />

        <div className="w-full max-w-xs">
          {userName ? (
            <div className="flex flex-col items-center gap-6">
              <div className="text-center bg-black/5 dark:bg-white/5 p-4 rounded-3xl w-full border border-white/5">
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 italic">
                  Authorized as
                </p>
                <span className="text-xl font-black text-indigo-500 lowercase">
                  @{userName}
                </span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-3 bg-red-500/10 text-red-500 p-5 rounded-3xl font-black uppercase tracking-widest active:scale-95 transition-all border border-red-500/20">
                <LogOut size={20} /> {t.logout || "გამოსვლა"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link
                to="/login"
                onClick={onClose}
                className="flex items-center justify-center gap-3 bg-black/5 dark:bg-white/5 border border-white/10 p-6 rounded-3xl font-bold text-lg active:scale-95 transition-all hover:border-indigo-500/50">
                <LogIn size={22} className="text-indigo-500" />{" "}
                {t.navLogin || "შესვლა"}
              </Link>
              <Link
                to="/registration"
                onClick={onClose}
                className="flex items-center justify-center gap-3 bg-indigo-600 text-white p-6 rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 transition-all">
                <UserPlus size={22} /> {t.navReg || "რეგისტრაცია"}
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 text-center opacity-30 flex items-center justify-center gap-2">
        <Settings2 size={12} className="animate-spin-slow" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em]">
          TECH STORE 
        </span>
      </div>
    </div>
  );
};

export default BurgerMenu;
