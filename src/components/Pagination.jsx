import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [...Array(totalPages)].map((_, i) => i).slice(
    Math.max(0, currentPage - 1),
    Math.min(totalPages, currentPage + 2)
  );

  return (
    <div className="flex justify-center items-center gap-4 py-16">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="p-4 rounded-xl bg-indigo-600 text-white disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer hover:bg-indigo-700 transition-all shadow-lg"
      >
        <ChevronLeft size={20} strokeWidth={3} />
      </button>

      <div className="flex gap-2">
        {pageNumbers.map((i) => (
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`size-12 rounded-xl font-black transition-all shadow-sm ${
              currentPage === i
                ? "bg-indigo-600 text-white scale-110 shadow-indigo-500/40"
                : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:border-indigo-500 border border-transparent"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="p-4 rounded-xl bg-indigo-600 text-white disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer hover:bg-indigo-700 transition-all shadow-lg"
      >
        <ChevronRight size={20} strokeWidth={3} />
      </button>
    </div>
  );
};

export default Pagination;