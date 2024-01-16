/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [import("@tailwindcss/forms")],
};
