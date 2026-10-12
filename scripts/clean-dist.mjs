// Removes dist/ before a build. tsup runs the configs in tsup.config.ts in
// parallel, so letting one of them `clean` could delete another's output.
import { rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
rmSync(path.join(__dirname, "..", "dist"), { recursive: true, force: true });
