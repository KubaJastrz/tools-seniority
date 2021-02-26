import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  theme: {
    extend: {
      screens: {
        xs: { min: "360px" },
        sm: { min: "425px" },
        md: { min: "768px" },
        lg: { min: "992px" },
        xl: { min: "1200px" },
        xxl: { min: "1440px" },
      },
      cursor: {
        grab: "grab",
        grabbing: "grabbing",
      },
    },
  },
});
