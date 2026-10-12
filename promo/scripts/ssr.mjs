// Loads promo/src/snippets.jsx through Vite's SSR pipeline and returns kit HTML strings.
import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

export async function loadSnippets() {
  // ThemeProvider reads localStorage while initialising state.
  const store = new Map();
  globalThis.localStorage ??= {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
  };
  const server = await createServer({
    root: ROOT,
    configFile: false,
    logLevel: "error",
    plugins: [react()],
    appType: "custom",
    server: { middlewareMode: true, hmr: false },
  });
  try {
    const mod = await server.ssrLoadModule("/promo/src/snippets.jsx");
    return mod.renderSnippets();
  } finally {
    await server.close();
  }
}
