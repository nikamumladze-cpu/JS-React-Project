import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Zap, Heart, Flame, Trophy, AlertCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useLanguage } from "../context/LanguageContext";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const isFavorite = isInWishlist(product.id);

  const hasHighDiscount = product.discountPercentage > 15;
  const isTopRated = product.rating >= 4.5;
  const isLowStock = product.stock < 10 && product.stock > 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(
      `${product.title} ${t.addToCartSuccess || "დაემატა კალათაში!"}`,
      { icon: "🚀" }
    );
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
    if (!isFavorite) {
      toast.success(`${product.title} დაემატა ფავორიტებში!`, { icon: "❤️" });
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group relative flex flex-col w-full cursor-pointer overflow-hidden border transition-all duration-500 hover:-translate-y-2 shadow-sm"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border-main)",
        borderRadius: "2.5rem",
        minHeight: "540px",
        boxShadow: "var(--shadow-hover-glow)",
      }}>
      
      <div
        className="relative aspect-square w-full shrink-0 overflow-hidden flex items-center justify-center p-6 transition-all"
        style={{
          backgroundColor: "var(--color-bg-input)",
          borderRadius: "2rem",
          margin: "8px",
          width: "calc(100% - 16px)",
        }}>
        
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {hasHighDiscount && (
            <div className="flex items-center gap-1.5 bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-black italic shadow-lg animate-pulse">
              <Flame size={10} fill="currentColor" />
              -{Math.round(product.discountPercentage)}%
            </div>
          )}

          {isTopRated && (
            <div className="flex items-center gap-1.5 bg-amber-400 text-black px-3 py-1 rounded-full text-[10px] font-black italic shadow-lg">
              <Trophy size={10} fill="currentColor" />
              TOP
            </div>
          )}

          {isLowStock && (
            <div className="flex items-center gap-1.5 bg-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-black italic shadow-lg">
              <AlertCircle size={10} />
              ONLY {product.stock}
            </div>
          )}

          {!hasHighDiscount && !isTopRated && (
            <div className="flex items-center gap-1.5 bg-indigo-600 text-white px-3 py-1 text-[10px] font-black rounded-full shadow-lg">
              <Zap size={10} fill="currentColor" /> TECH
            </div>
          )}
        </div>

        <button
          onClick={handleToggleWishlist}
          className={`absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-md transition-all hover:scale-110 active:scale-90 shadow-md cursor-pointer border-2
          ${isFavorite ? "bg-red-50/50 border-red-500" : "bg-white/10 border-black dark:border-gray-400"}`}
        >
          <Heart
            size={18}
            fill={isFavorite ? "#ef4444" : "none"}
            strokeWidth={2.5}
            className={isFavorite ? "text-red-500" : "text-black dark:text-gray-400"}
          />
        </button>

        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 mt-2 justify-between">
        <div>
          <div className="flex items-center justify-between mb-2 text-indigo-600 font-black uppercase text-[10px] tracking-widest">
            {product.category}
            <div className="flex items-center gap-1 text-orange-500 font-bold text-xs">
              <Star size={12} fill="currentColor" /> {product.rating}
            </div>
          </div>

          <h3
            className="line-clamp-1 text-lg md:text-xl font-black group-hover:text-indigo-600 transition-colors"
            style={{ color: "var(--color-text-primary)" }}>
            {product.title}
          </h3>

          <p
            className="line-clamp-2 mt-2 text-sm opacity-60 font-medium leading-snug"
            style={{ color: "var(--color-text-primary)" }}>
            {product.description}
          </p>
        </div>

        <div
          className="mt-4 flex items-center justify-between gap-2 p-1.5 border"
          style={{
            backgroundColor: "var(--color-bg-input)",
            borderColor: "var(--color-border-main)",
            borderRadius: "2rem",
          }}>
          <div className="flex flex-col pl-4">
            {hasHighDiscount && (
               <span className="text-[10px] font-bold text-gray-400 line-through decoration-red-500/50">
                  ${(product.price * 1.2).toFixed(0)}
               </span>
            )}
            <span
              className="text-xl md:text-2xl font-black italic tracking-tighter shrink-0"
              style={{ color: "var(--color-text-primary)" }}>
              ${product.price}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center overflow-hidden rounded-2xl bg-gray-950 dark:bg-indigo-600 font-black text-white transition-all hover:scale-105 active:scale-95 group/btn cursor-pointer shrink-0 shadow-lg">
            <ShoppingCart size={20} strokeWidth={2.5} className="relative z-10" />
            <div
              className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;