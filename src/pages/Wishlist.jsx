import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartOff, ArrowLeft, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useLanguage } from "../context/LanguageContext";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

const Wishlist = () => {
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
  const { t } = useLanguage();

  const handleClearAll = () => {
    if (wishlist.length > 0) {
      clearWishlist();
      toast.error(t.wishlistCleared || "სია გასუფთავდა!", {
        icon: "🗑️",
        style: {
          borderRadius: "1rem",
          background: "var(--color-bg-card)",
          color: "var(--color-text-primary)",
          border: "1px solid var(--color-border-main)",
        },
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 dark:border-gray-800 pb-10 mb-12 gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-(--color-text-primary)]">
            {t.wishlistTitle || "Wishlist"}
          </h1>
          <p className="text-sm opacity-40 font-bold tracking-widest text-(--color-text-primary)] uppercase">
            {wishlist.length} {t.itemsSaved || "Items Saved"}
          </p>
        </div>

        <div className="flex items-center gap-8">
          {wishlist.length > 0 && (
            <button
              onClick={handleClearAll}
              className="group relative flex items-center gap-2 py-2 transition-all cursor-pointer overflow-hidden">
              <Trash2
                size={16}
                className="text-gray-400 group-hover:text-red-500 transition-colors duration-300"
              />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-red-500 transition-colors duration-300">
                {t.clearAll || "Clear All"}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" />
            </button>
          )}

          <Link
            to="/"
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-(--color-text-primary)] opacity-40 hover:opacity-100 transition-all border-b-2 border-transparent hover:border-indigo-500 pb-2">
            <ArrowLeft size={16} /> {t.backToStore || "Back"}
          </Link>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {wishlist.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlist.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />

                <div className="absolute bottom-24 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-30">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="w-full py-3 bg-red-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-red-600 transition-all active:scale-95 flex items-center justify-center gap-2">
                    <Trash2 size={14} /> {t.remove || "Remove"}
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-40 text-center opacity-20 text-(--color-text-primary)]">
            <HeartOff size={60} strokeWidth={1.5} className="mb-4" />
            <h2 className="text-xl font-black uppercase tracking-widest">
              {t.wishlistEmpty || "Empty List"}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wishlist;
