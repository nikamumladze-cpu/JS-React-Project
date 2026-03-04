export default defineConfig({
  base: process.env.VERCEL ? "/" : "/JS-React-Project/",

  plugins: [react(), tailwindcss()],
});
