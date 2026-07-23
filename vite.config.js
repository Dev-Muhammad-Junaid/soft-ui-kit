import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Project Pages: https://dev-muhammad-junaid.github.io/soft-ui-kit/
export default defineConfig({
  base: "/soft-ui-kit/",
  plugins: [react()],
});
