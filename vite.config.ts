import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { copyFileSync } from "fs";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: "copy-styles",
      closeBundle() {
        copyFileSync(
          resolve(__dirname, "src/tokens/globals.css"),
          resolve(__dirname, "dist/styles.css"),
        );
      },
    },
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@heroui/react",
        "@heroui/styles",
        "@gravity-ui/icons",
        "tailwind-merge",
        "clsx",
      ],
    },
    sourcemap: true,
    target: "es2022",
    emptyOutDir: false,
  },
});
