import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
      colors: {
        bgGray: "#EEEDED",
        bgDarkGray: "#EDEDED",
        btnYellow: "#FED443",
        tagLightBlue: "#CFDBDC",
      },
    },
    screens: {
      md: { max: "867px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "539px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
export default config;
