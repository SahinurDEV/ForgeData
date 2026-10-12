// Keeps CLI_VERSION in src/cli-core.ts in sync with package.json.
//
// Runs as the npm `version` lifecycle script, i.e. whenever `npm version`
// bumps package.json (semantic-release's @semantic-release/npm does exactly
// that in its prepare step). The publish step then rebuilds dist via
// `prepublishOnly`, so `forgedata --version` reports the released version,
// and @semantic-release/git commits the updated source file.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const { version } = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const file = path.join(root, "src", "cli-core.ts");
const source = readFileSync(file, "utf8");
const pattern = /export const CLI_VERSION = "[^"]*";/;

if (!pattern.test(source)) {
  console.error(`sync-version: could not find CLI_VERSION in ${file}`);
  process.exit(1);
}

writeFileSync(file, source.replace(pattern, `export const CLI_VERSION = "${version}";`));
console.log(`sync-version: CLI_VERSION set to ${version}`);
