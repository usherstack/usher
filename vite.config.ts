import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [react()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    // Dev-only server config (safe for local + Render preview, ignored in production serving)
    server: {
      host: true, // allows external access
      port: Number(process.env.PORT) || 5173,
      open: isDev,
      cors: true,
      // optional: only needed if you STILL run dev on Render (not recommended)
      allowedHosts: [".onrender.com"],
    },

    build: {
      outDir: "dist",
      sourcemap: isDev,
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

    preview: {
      host: true,
      port: Number(process.env.PORT) || 4173,
    },
  };
});
