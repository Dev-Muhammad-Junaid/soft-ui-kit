import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

/** Library build — npm / pnpm / bun installable package. */
export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-dts",
      closeBundle() {
        copyFileSync(resolve(__dirname, "src/index.d.ts"), resolve(__dirname, "dist/lib/soft-ui-kit.d.ts"));
      },
    },
  ],
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
        "clsx",
        "@phosphor-icons/react",
        /^@phosphor-icons\/react\//,
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
