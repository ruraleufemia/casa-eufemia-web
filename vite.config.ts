import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    // react-helmet-async is published as CommonJS. Bundling it in the server
    // entry keeps Node's ESM loader from rejecting its named imports.
    noExternal: ["react-helmet-async"],
  },
}));
