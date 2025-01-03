import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: "src/manifest.json", // Path to the manifest file
          dest: ".", // Copy to the root of the `dist/` folder
        },
        {
          src: "icons", // Copy the icons folder
          dest: ".", // Maintain folder structure
        },
        {
          src: "src/ui/popup.html", // Path to popup source
          dest: ".", // Copy to root of dist
        },
        {
          src: "rules/*.txt", // Copy all text files from the rules folder
          dest: "rules", // Place them in "rules" subfolder in dist
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "src/ui/popup.html"),
        background: resolve(__dirname, "src/background/background.ts"),
        content: resolve(__dirname, "src/content/content-script.ts"),
      },
      output: {
        entryFileNames: "scripts/[name].js",
        chunkFileNames: "scripts/[name].js",
        assetFileNames: "assets/[name].[ext]",
        dir: resolve(__dirname, "dist"),
      },
    },
    emptyOutDir: true,
    outDir: "./dist",
  },
  server: {
    port: 3000,
    strictPort: true,
  },
});
