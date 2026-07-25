import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

/** Library build — npm / pnpm / bun installable package. */
export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: "dist/lib",
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "SoftUIKit",
      formats: ["es"],
      fileName: () => "soft-ui-kit.js",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react-router-dom",
        "clsx",
        "@phosphor-icons/react",
        /^@phosphor-icons\/react\//,
        "border-beam",
      ],
      output: {
        assetFileNames: "soft-ui-kit.[ext]",
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: false,
  },
});
