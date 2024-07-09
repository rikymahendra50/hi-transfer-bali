import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

export default <Partial<Config>>{
  content: ["docs/content/**/*.md"],
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("tailwind-scrollbar"),
  ],
  theme: {
    fontFamily: {
      sans: ["ClashGrotesk"],
      display: ["ClashGrotesk"],
      body: ["ClashGrotesk"],
    },

    extend: {
      colors: {
        secondary: "#0C2815",
        primary: "#42B235",
        'primary-content': "#ffffff",
        neutral: "#DDDDDD",
      },
      fontSize: {
        "text-sm": "clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem)",
        "text-base": "clamp(1rem, 0.34vw + 0.91rem, 1.19rem)",
        "text-lg": "clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem)",
        "text-xl": "clamp(1.56rem, 1vw + 1.31rem, 2.11rem)",
        "text-2xl": "clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)",
        "text-3xl": " clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem)",
        "text-4xl": "clamp(3.05rem, 3.54vw + 2.17rem, 5rem)",
        "text-5xl": "clamp(3.81rem, 5.18vw + 2.52rem, 6.66rem)",
        "text-6xl": " clamp(4.77rem, 7.48vw + 2.9rem, 8.88rem)",
      },
      keyframes: {
        popup: {
          '0%': {
            transform: 'scaleX(0.7)',
            opacity: '0.2'
          },
          '50%': {
            transform: 'scaleX(1.1)',
            opacity: '0.8'
          },
          '100%': {
            transform: 'scaleX(1)',
            opacity: '1'
          },

        },
        popin: {
          '0%': {
            transform: 'scaleX(1)',
            opacity: '1'
          },
          '50%': {
            transform: 'scaleX(0.9)',
            opacity: '0.6'
          },
          '100%': {
            transform: 'scaleX(0.7)',
            opacity: '0.2'
          },
        }
      }

    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#42B235",
          "primary-content": "#ffffff",
          secondary: "#0C2815",
          accent: "#37cdbe",
          neutral: "#DDDDDD",
          "base-100": "#ffffff"
        }
      }
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: false, // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
