import React from "react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import {
  Truck,
  ShoppingBag,
  Trash2,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const shippingThreshold = 500;
  const remainingForFreeShipping = shippingThreshold - totalPrice;
  const progressPercentage = Math.min(
    (totalPrice / shippingThreshold) * 100,
    100,
  );

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center gap-8">
        <div
          className="p-8 sm:p-10 rounded-full animate-bounce"
          style={{ backgroundColor: "var(--color-bg-input)" }}>
          <ShoppingBag
            size={60}
            className="opacity-20 sm:w-20 sm:h-20"
            style={{ color: "var(--color-text-primary)" }}
          />
        </div>
        <h2
          className="text-2xl sm:text-4xl font-black uppercase tracking-tighter italic"
          style={{ color: "var(--color-text-primary)" }}>
          {t.cartEmpty}
        </h2>
        <Link
          to="/"
          className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 active:scale-95">
          {t.startShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-12 px-4 min-h-screen mt-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 gap-4">
        <h1
          className="text-3xl sm:text-5xl font-black uppercase tracking-tighter italic"
          style={{ color: "var(--color-text-primary)" }}>
          {t.yourCart}
        </h1>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-all text-[10px] font-black uppercase tracking-widest">
          <ArrowLeft size={14} />{" "}
          {lang === "ka" ? "მაღაზიაში დაბრუნება" : "Back to Shop"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div
            className="p-6 sm:p-8 rounded-[2rem] border shadow-sm mb-6 transition-all"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderColor: "var(--color-border-main)",
            }}>
            <div className="flex items-start gap-4 mb-6">
              <div
                className={`p-4 rounded-2xl text-white shrink-0 ${totalPrice >= shippingThreshold ? "bg-green-500 shadow-green-500/20" : "bg-indigo-600 shadow-indigo-500/20"}`}>
                <Truck size={24} />
              </div>
              <div>
                <h4
                  className="font-black uppercase text-base tracking-tight"
                  style={{ color: "var(--color-text-primary)" }}>
                  {totalPrice >= shippingThreshold
                    ? t.gotFreeShipping
                    : t.freeShipping}
                </h4>
                <p
                  className="text-xs font-bold opacity-50 mt-1"
                  style={{ color: "var(--color-text-primary)" }}>
                  {totalPrice >= shippingThreshold
                    ? t.qualifiedFreeShipping
                    : lang === "ka"
                      ? `კიდევ $${remainingForFreeShipping.toFixed(2)} უფასო მიწოდებისთვის`
                      : t.addMoreForFree.replace(
                          "${amount}",
                          remainingForFreeShipping.toFixed(2),
                        )}
                </p>
              </div>
            </div>
            <div
              className="relative h-2 w-full rounded-full overflow-hidden"
              style={{ backgroundColor: "var(--color-bg-input)" }}>
              <div
                className={`absolute h-full transition-all duration-1000 ease-out rounded-full ${totalPrice >= shippingThreshold ? "bg-green-500" : "bg-indigo-600"}`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 rounded-[2rem] border group transition-all"
                style={{
                  backgroundColor: "var(--color-bg-card)",
                  borderColor: "var(--color-border-main)",
                }}>
                <div
                  className="size-24 rounded-2xl p-4 shrink-0 flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: "var(--color-bg-input)" }}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left w-full">
                  <h3
                    className="font-black text-lg tracking-tighter mb-1 uppercase truncate"
                    style={{ color: "var(--color-text-primary)" }}>
                    {item.title}
                  </h3>
                  <p className="text-indigo-600 font-black text-base italic">
                    ${item.price}
                  </p>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto gap-4">
                  <div
                    className="flex items-center rounded-xl p-1 border"
                    style={{
                      backgroundColor: "var(--color-bg-input)",
                      borderColor: "var(--color-border-main)",
                    }}>
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="size-8 flex items-center justify-center font-black text-lg hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-all cursor-pointer">
                      -
                    </button>
                    <span className="w-8 text-center font-black tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="size-8 flex items-center justify-center font-black text-lg hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-all cursor-pointer">
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-1.5 opacity-40 hover:opacity-100 hover:text-red-500 transition-all font-black uppercase text-[9px] tracking-widest cursor-pointer">
                    <Trash2 size={12} /> {t.remove}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div
            className="p-8 rounded-card sticky top-24 shadow-2xl border"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderColor: "var(--color-border-main)",
            }}>
            <h3
              className="text-xl font-black uppercase italic mb-8 tracking-tighter border-b pb-4"
              style={{
                color: "var(--color-text-primary)",
                borderColor: "var(--color-border-main)",
              }}>
              {t.orderSummary}
            </h3>

            <div className="space-y-4 text-[11px] font-black uppercase tracking-widest opacity-60">
              <div className="flex justify-between">
                <span>{t.productsPrice}</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.shippingPrice}</span>
                <span
                  className={
                    totalPrice >= shippingThreshold ? "text-green-500" : ""
                  }>
                  {totalPrice >= shippingThreshold ? t.free : "$15.00"}
                </span>
              </div>
            </div>

            <div
              className="h-px my-8"
              style={{ backgroundColor: "var(--color-border-main)" }}
            />

            <div className="flex justify-between items-end mb-10">
              <span className="font-black uppercase italic text-xl">
                {t.total}
              </span>
              <span
                className="text-4xl font-black tracking-tighter tabular-nums"
                style={{ color: "var(--color-text-primary)" }}>
                $
                {(totalPrice >= shippingThreshold
                  ? totalPrice
                  : totalPrice + 15
                ).toFixed(2)}
              </span>
            </div>

            <Link
              to="/shipping"
              className="flex items-center justify-center gap-3 w-full py-6 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 hover:scale-[1.02] transition-all active:scale-95 shadow-xl shadow-indigo-500/25">
              {lang === "ka" ? "გაგრძელება" : "Continue"}{" "}
              <ChevronRight size={20} strokeWidth={3} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
