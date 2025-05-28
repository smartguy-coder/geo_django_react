import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["7e7a-188-130-177-189.ngrok-free.app"],
  },
  plugins: [react()],
  optimizeDeps: {
    include: ["react-leaflet", "leaflet"],
  },
});
