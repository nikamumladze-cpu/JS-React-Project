import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import { Eye, EyeOff, Lock } from "lucide-react";
import "../App.css";

const Checkout = () => {
  const { totalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showCVV, setShowCVV] = useState(false);

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const fireConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
    };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalPrice === 0) {
      toast.error(t.emptyCartError || "კალათა ცარიელია!", {
        style: { borderRadius: "1.5rem", fontWeight: "bold" },
      });
      return;
    }

    const paymentToast = toast.loading(
      t.processing || "მიმდინარეობს გადახდა...",
      {
        style: { borderRadius: "1.5rem" },
      },
    );

    setTimeout(() => {
      toast.success(t.paySuccess, {
        id: paymentToast,
        duration: 5000,
        icon: "🎉",
        style: { borderRadius: "1.5rem", fontWeight: "bold" },
      });
      fireConfetti();
      clearCart();
      setTimeout(() => navigate("/"), 4000);
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const parts = [];
    for (let i = 0; i < v.length; i += 4) parts.push(v.substring(i, i + 4));
    return parts.join(" ");
  };

  const formatExpiry = (value) => {
    let v = value.replace(/\D/g, "");
    if (v.length > 4) v = v.slice(0, 4);
    return v.length >= 2 ? `${v.substring(0, 2)}/${v.substring(2, 4)}` : v;
  };

  const styles = {
    cardBg: "var(--color-bg-card)",
    inputBg: "var(--color-bg-input)",
    text: "var(--color-text-primary)",
    border: "var(--color-border-main)",
    radius: "var(--radius-card)",
  };

  return (
    <div
      className="w-full max-w-7xl mx-auto py-10 sm:py-20 px-4 sm:px-6 min-h-screen mt-5 sm:mt-10 transition-all"
      style={{ color: styles.text }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-start">
        <div className="flex flex-col space-y-8 sm:space-y-12">
          <h2 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tighter text-center sm:text-left">
            {t.payment}
          </h2>

          <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-white overflow-hidden shadow-2xl bg-linear-to-br from-slate-900 via-indigo-950 to-black border border-white/10 mx-auto max-w-100 lg:max-w-none">
            <div className="absolute -top-20 -right-20 w-40 sm:w-80 h-40 sm:h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-10 sm:w-14 h-7 sm:h-10 bg-linear-to-tr from-yellow-200 to-yellow-600 rounded shadow-lg"></div>
                <span className="text-xl sm:text-3xl font-black italic tracking-tighter opacity-80 uppercase">
                  {card.number.startsWith("4")
                    ? "VISA"
                    : card.number.startsWith("5")
                      ? "MC"
                      : "CARD"}
                </span>
              </div>

              <div className="text-lg sm:text-2xl md:text-3xl font-mono tracking-widest py-2 whitespace-nowrap overflow-hidden">
                {card.number || "•••• •••• •••• ••••"}
              </div>

              <div className="flex justify-between items-end border-t border-white/5 pt-4 sm:pt-6">
                <div className="flex-1 pr-2">
                  <p className="text-[8px] sm:text-[10px] uppercase opacity-40 font-black mb-1 tracking-widest">
                    {t.holderLabel}
                  </p>
                  <p className="font-bold uppercase tracking-widest text-[12px] sm:text-base truncate max-w-30 sm:max-w-none">
                    {card.name || "NAME SURNAME"}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[8px] sm:text-[10px] uppercase opacity-40 font-black mb-1 tracking-widest">
                    {t.expiresLabel}
                  </p>
                  <p className="font-bold text-sm sm:text-xl">
                    {card.expiry || "MM/YY"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="w-full p-6 sm:p-8 shadow-xl flex justify-between items-center border transition-all"
            style={{
              backgroundColor: styles.cardBg,
              borderColor: styles.border,
              borderRadius: styles.radius,
            }}>
            <span className="opacity-50 font-black uppercase text-xs sm:text-sm tracking-widest italic">
              {t.totalAmount}
            </span>
            <span className="text-2xl sm:text-4xl font-black text-indigo-500 tracking-tighter italic">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-10 border shadow-2xl space-y-6 sm:space-y-8 transition-all"
          style={{
            backgroundColor: styles.cardBg,
            borderColor: styles.border,
            borderRadius: styles.radius,
          }}>
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest opacity-60 ml-2">
                {t.cardHolder}
              </label>
              <input
                required
                style={{ backgroundColor: styles.inputBg, color: styles.text }}
                className="w-full p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-transparent focus:border-indigo-500/50 outline-none transition-all font-bold uppercase text-sm sm:text-base"
                value={card.name}
                onChange={(e) =>
                  setCard({ ...card, name: e.target.value.toUpperCase() })
                }
                placeholder="Name SURNAME"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest opacity-60 ml-2">
                {t.cardNumber}
              </label>
              <input
                required
                maxLength="19"
                style={{ backgroundColor: styles.inputBg, color: styles.text }}
                className="w-full p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-transparent focus:border-indigo-500/50 outline-none transition-all font-mono text-base sm:text-xl tracking-wider"
                value={card.number}
                onChange={(e) =>
                  setCard({ ...card, number: formatCardNumber(e.target.value) })
                }
                placeholder="0000 0000 0000 0000"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest opacity-60 ml-2">
                  {t.expiry}
                </label>
                <input
                  required
                  maxLength="5"
                  style={{
                    backgroundColor: styles.inputBg,
                    color: styles.text,
                  }}
                  className="w-full p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-transparent focus:border-indigo-500/50 outline-none transition-all font-bold text-center text-sm sm:text-base"
                  value={card.expiry}
                  onChange={(e) =>
                    setCard({ ...card, expiry: formatExpiry(e.target.value) })
                  }
                  placeholder="MM/YY"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest opacity-60 ml-2">
                  {t.cvv}
                </label>
                <div className="relative">
                  <input
                    required
                    type={showCVV ? "text" : "password"}
                    maxLength="3"
                    style={{
                      backgroundColor: styles.inputBg,
                      color: styles.text,
                    }}
                    className="w-full p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-transparent focus:border-indigo-500/50 outline-none transition-all font-bold text-center text-sm sm:text-base pr-12"
                    value={card.cvv}
                    onChange={(e) =>
                      setCard({
                        ...card,
                        cvv: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    placeholder="***"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCVV(!showCVV)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-all cursor-pointer p-1">
                    {showCVV ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full bg-indigo-600 text-white py-5 sm:py-6 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 cursor-pointer flex items-center justify-center gap-3">
            {t.confirmPayment}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
