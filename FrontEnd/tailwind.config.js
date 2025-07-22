/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ⬅️ Add this line
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",        // For Next.js Pages Router
    "./components/**/*.{js,ts,jsx,tsx}",   // For Components
    "./app/**/*.{js,ts,jsx,tsx}",          // For App Router
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
