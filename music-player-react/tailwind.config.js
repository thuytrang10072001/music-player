/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        container: "1440px",
        contentContainer: "1140px",
        containerSmall: "1024px",
        containerXs: "768px",
      },

      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },

      backgroundImage: {
        linearPrimary: "linear-gradient(to top, #30cfd0, #330867)",
        linearSecondary: "linear-gradient(to top, #a8cf45, #0098da)",
        linearWhiteBlack: "linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgb(0, 0, 0) 100%)"
      },

      fontFamily: {
        bodyFont: ["Montserrat", "sans-serif"],
        titleFont: ["Inter", "sans-serif"],
      },

      boxShadow: {
        navbarShadow: "0 10px 30px -10px rgba(2,12,27,0.7)",
      },

      colors: {
        bg: "#121212",
        bodyColor: "#0A192F",
        textGreen: "#64ffda",
        textLight: "#ccd6f6",
        textDark: "#8892b0",
        bgHeader: "#585858",
        gradientStart: '#a8cf45',
        gradientEnd: '#0098da',
        hoverColor: "rgba(100,255,218,0.1)",
      },
    },
  },
  plugins: [],
}

