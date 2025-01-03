import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig(({ command }) => {
  const isDev = command === "serve"; // 'serve' is for dev mode, 'build' for production

  return {
    plugins: [react(), tailwindcss()],
    root: isDev ? "src/ui" : ".", // Serve popup files directly in dev mode
    base: isDev ? "/" : "./", // Ensure paths are relative for production builds
    build: {
      emptyOutDir: !isDev, // Clean output only during production builds
      rollupOptions: {
        input: {
          popup: resolve(__dirname, "src/ui/popup.html"),
          ...(isDev
            ? {}
            : {
                background: resolve(__dirname, "src/background/background.ts"),
                content: resolve(__dirname, "src/content/content-script.ts"),
              }),
        },
        output: {
          entryFileNames: isDev ? "[name].js" : "scripts/[name].js",
          chunkFileNames: isDev ? "[name].js" : "scripts/[name].js",
          assetFileNames: isDev ? "[name].[ext]" : "assets/[name].[ext]",
          dir: resolve(__dirname, "dist"),
        },
      },
      outDir: "./dist",
    },
    server: {
      port: 3000,
      strictPort: true,
    },
  };
});
