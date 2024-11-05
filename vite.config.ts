import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "/react-ts-weather-app",
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        short_name: "Taiwan Weather App",
        name: "Taiwan Weather App - Realtime Weather Forecast",
        icons: [
          {
            src: "icon@192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "icon@512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        start_url: ".",
        display: "standalone",
        orientation: "portrait-primary",
        theme_color: "#1f2022",
        background_color: "#1f2022",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
