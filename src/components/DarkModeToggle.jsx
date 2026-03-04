import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const DarkModeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-sm flex items-center justify-center border border-transparent hover:border-indigo-500/30"
      style={{
        backgroundColor: "var(--color-bg-input)", 
        color: "var(--color-text-primary)", 
      }}>
      <div className="relative w-5 h-5 flex items-center justify-center">
        {theme === "dark" ? (
          <Sun
            size={20}
            className="text-amber-400 transition-transform duration-500 rotate-0 scale-100"
          />
        ) : (
          <Moon
            size={20}
            className="text-indigo-600 transition-transform duration-500 rotate-0 scale-100"
          />
        )}
      </div>
    </button>
  );
};

export default DarkModeToggle;
