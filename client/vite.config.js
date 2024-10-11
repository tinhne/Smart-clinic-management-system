import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  optimizeDeps: {
    include: ["jwt-decode"], // Add this line to ensure jwt-decode is bundled properly
  },
});
