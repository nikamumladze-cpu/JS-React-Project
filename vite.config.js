import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: process.env.VERCEL ? "/" : "/JS-React-Project/",

  plugins: [react(), tailwindcss()],

  define: {
    "import.meta.vitest": "undefined",
  },

  build: {
    chunkSizeWarningLimit: 1000,
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    includeSource: ["src/**/*.{js,jsx}"],
  },
});
