import React from "react";

const FilterBar = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar sm:flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onCategoryChange(cat.slug)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[13px] font-black uppercase tracking-widest transition-all border cursor-pointer ${
            activeCategory === cat.slug
              ? "bg-gray-950 text-white dark:bg-gray-100 dark:text-gray-950 border-transparent scale-105 shadow-xl"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border-transparent hover:border-indigo-500"
          }`}>
          {cat.icon} {cat.name}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
