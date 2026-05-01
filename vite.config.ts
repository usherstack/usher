import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: process.env.NODE_ENV !== "production",
    cors: true,
  },
  build: {
    outDir: "dist",
    sourcemap: process.env.NODE_ENV === "development",
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tabs",
          ],
          "vendor-motion": ["framer-motion"],
        },
      },
    },
  },
});
