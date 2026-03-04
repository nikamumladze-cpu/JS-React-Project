import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  Truck,
  Zap,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard"; 
import "../App.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mainImage, setMainImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    setLoading(true);
    setCurrentIndex(0);
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setMainImage(res.data.thumbnail);
        return axios.get(
          `https://dummyjson.com/products/category/${res.data.category}?limit=10`,
        );
      })
      .then((res) => {
        const processedRelated = res.data.products
          .filter((p) => p.id !== parseInt(id))
          .map((p) => ({
            ...p,
            discountPercentage:
              p.discountPercentage > 12
                ? p.discountPercentage
                : p.id % 4 === 0
                  ? 20
                  : p.discountPercentage,
            stock: p.id % 6 === 0 ? 4 : p.stock,
            rating: p.rating > 4.5 ? p.rating : p.id % 3 === 0 ? 4.8 : p.rating,
          }));

        setRelatedProducts(processedRelated);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    window.scrollTo(0, 0);
  }, [id]);

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < relatedProducts.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-transparent">
        <Loader2 className="animate-spin size-12 text-indigo-600" />
      </div>
    );

  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-7xl px-4 pb-20 mt-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-xs font-black uppercase opacity-60 hover:opacity-100 hover:text-indigo-600 transition-all cursor-pointer"
        style={{ color: "var(--color-text-primary)" }}>
        <ArrowLeft size={16} /> უკან
      </button>

      <div
        className="grid gap-12 p-6 md:p-10 shadow-2xl radius-card lg:grid-cols-2 border transition-all duration-500"
        style={{
          backgroundColor: "var(--color-bg-card)",
          borderColor: "var(--color-border-main)",
        }}>
        <div className="space-y-6">
          <div
            className="flex aspect-square items-center justify-center border p-8 rounded-[2rem] overflow-hidden bg-white/5"
            style={{
              borderColor: "var(--color-border-main)",
              backgroundColor: "var(--color-bg-input)",
            }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={mainImage}
                src={mainImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full object-contain dark:brightness-90"
              />
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {product?.images?.slice(0, 4).map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                onClick={() => setMainImage(img)}
                className={`aspect-square overflow-hidden border p-2 rounded-2xl cursor-pointer transition-all ${
                  mainImage === img
                    ? "border-indigo-600 ring-2 ring-indigo-500/20"
                    : "opacity-60"
                }`}
                style={{
                  borderColor:
                    mainImage === img ? "" : "var(--color-border-main)",
                  backgroundColor: "var(--color-bg-input)",
                }}>
                <img
                  src={img}
                  alt="view"
                  className="h-full w-full object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-6 flex items-center gap-4">
            <span className="rounded-full bg-indigo-600 px-4 py-1 text-[10px] font-black text-white uppercase tracking-widest">
              {product?.category}
            </span>
            <div className="flex items-center gap-1 font-black text-orange-500">
              <Star size={18} fill="currentColor" /> {product?.rating}
            </div>
          </div>

          <h1
            className="mb-2 text-4xl md:text-5xl font-black tracking-tighter"
            style={{ color: "var(--color-text-primary)" }}>
            {product?.title}
          </h1>
          <div className="mb-8 text-5xl font-black text-indigo-600 tracking-tighter">
            ${product?.price}
          </div>

          <div className="mb-10 space-y-4">
            <div
              className="flex items-start gap-4 border p-5 rounded-2xl"
              style={{
                borderColor: "var(--color-border-main)",
                backgroundColor: "rgba(99, 102, 241, 0.05)",
              }}>
              <Zap className="text-indigo-600 shrink-0 mt-1" size={22} />
              <p
                className="font-bold text-sm leading-relaxed opacity-80"
                style={{ color: "var(--color-text-primary)" }}>
                {product?.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl border transition-colors bg-(--color-bg-input)] border-(--color-border-main)]">
                <ShieldCheck className="text-green-500" size={18} />
                <span className="text-xs font-black uppercase">
                  გარანტია 2 წელი
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl border transition-colors bg-(--color-bg-input)] border-(--color-border-main)]">
                <Truck className="text-blue-500" size={18} />
                <span className="text-xs font-black uppercase">
                  უფასო მიწოდება
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full bg-indigo-600 py-6 text-xl font-black text-white shadow-2xl rounded-2xl hover:opacity-90 active:scale-95 transition-all cursor-pointer">
            კალათაში დამატება
          </button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-24 pt-16 border-t border-(--color-border-main)]">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-(--color-text-primary)]">
              მსგავსი პროდუქტები
            </h3>

            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="p-3 rounded-xl bg-indigo-600 text-white disabled:opacity-20 cursor-pointer shadow-lg active:scale-90 transition-all">
                <ChevronLeft size={24} strokeWidth={3} />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex + itemsPerPage >= relatedProducts.length}
                className="p-3 rounded-xl bg-indigo-600 text-white disabled:opacity-20 cursor-pointer shadow-lg active:scale-90 transition-all">
                <ChevronRight size={24} strokeWidth={3} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {relatedProducts
                .slice(currentIndex, currentIndex + itemsPerPage)
                .map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}>
                    <ProductCard product={item} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductDetails;
