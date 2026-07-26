/**
 * Structural validation for Soft Frosted icons (tiled + bare).
 * Run: npm run validate:frosted
 *
 * Delegates to vitest so JSX components can render via react-dom/server.
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const result = spawnSync(
  "npx",
  ["vitest", "run", "tests/frostedIcons.validate.test.jsx"],
  { cwd: root, stdio: "inherit", shell: process.platform === "win32" }
);

process.exit(result.status ?? 1);
