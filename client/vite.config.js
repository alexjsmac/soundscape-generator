import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  build: {
    outDir: "./build",
  },
  // During local development, proxy API calls from the Vite dev server (port 3000)
  // to the Flask backend (port 8000). This keeps the frontend code using
  // relative `/api/...` URLs while ensuring JSON responses come from Flask,
  // not from Vite's index.html.
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
});
