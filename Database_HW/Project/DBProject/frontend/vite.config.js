import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    proxy: {
      "/api/*": {
        target: "http://localhost:55567",
        changeOrigin: true,
      },
    },
  },
});
