/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",   // For Next.js pages
    "./components/**/*.{js,ts,jsx,tsx}",  // For Next.js components
    "./app/**/*.{js,ts,jsx,tsx}", // If using the `app` directory (Next.js App Router)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
