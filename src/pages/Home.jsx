import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import {
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  LayoutGrid,
  Monitor,
} from "lucide-react";

import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import FilterBar from "../components/FilterBar"; 
import Pagination from "../components/Pagination"; 

const Home = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");
  const limit = 8;

  const techCategories = [
    "smartphones",
    "laptops",
    "tablets",
    "mobile-accessories",
  ];

  const categories = [
    { name: t.catAll, slug: "all", icon: <LayoutGrid size={14} /> },
    {
      name: t.catSmartphones,
      slug: "smartphones",
      icon: <Smartphone size={14} />,
    },
    { name: t.catLaptops, slug: "laptops", icon: <Laptop size={14} /> },
    { name: t.catTablets, slug: "tablets", icon: <Tablet size={14} /> },
    {
      name: t.accessories,
      slug: "mobile-accessories",
      icon: <Headphones size={14} />,
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const skip = currentPage * limit;
        let fetchedProducts = [],
          totalCount = 0;

        if (query) {
          const res = await axios.get(
            `https://dummyjson.com/products/search?q=${query}`,
          );
          const filtered = res.data.products.filter((p) =>
            techCategories.includes(p.category),
          );
          fetchedProducts = filtered.slice(skip, skip + limit);
          totalCount = filtered.length;
        } else if (activeCategory === "all") {
          const requests = techCategories.map((cat) =>
            axios.get(`https://dummyjson.com/products/category/${cat}`),
          );
          const responses = await Promise.all(requests);
          const combined = responses.flatMap((res) => res.data.products);
          fetchedProducts = combined.slice(skip, skip + limit);
          totalCount = combined.length;
        } else {
          const res = await axios.get(
            `https://dummyjson.com/products/category/${activeCategory}?limit=${limit}&skip=${skip}`,
          );
          fetchedProducts = res.data.products;
          totalCount = res.data.total;
        }
        setProducts(fetchedProducts);
        setTotal(totalCount);
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => setLoading(false), 600);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    fetchProducts();
  }, [query, activeCategory, currentPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-24 space-y-10 min-h-screen">
      <div className="border-b border-gray-200 dark:border-gray-800 pb-12 space-y-6">
        <h1
          className="text-4xl font-black italic tracking-tight"
          style={{ color: "var(--color-text-primary)" }}>
          {query ? `${t.results}: "${query}"` : t.collection}
        </h1>

        {!query && (
          <FilterBar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={(slug) => {
              setActiveCategory(slug);
              setCurrentPage(0);
            }}
          />
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage + activeCategory + loading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            Array(limit)
              .fill(0)
              .map((_, i) => <ProductSkeleton key={i} />)
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-40 opacity-20">
              <Monitor size={60} className="mx-auto mb-4" />
              <p
                className="font-bold italic"
                style={{ color: "var(--color-text-primary)" }}>
                {t.noProducts}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {!loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(total / limit)}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Home;
