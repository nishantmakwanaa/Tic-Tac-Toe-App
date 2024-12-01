module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-bg": "url('/src/assets/gradient.jpg')",
      },
      animation: {
        bounce: "bounce 2s infinite",
        fade: "fadeIn 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};