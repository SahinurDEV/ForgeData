import { defineConfig } from "tsup";

// dist/ is wiped by scripts/clean-dist.mjs before tsup runs: tsup builds these
// configs in parallel, so `clean: true` in one could delete another's output.

export default defineConfig([
  {
    // The library entry points are built together (with code splitting) so
    // that `forgedatajs`, `forgedatajs/react` and `forgedatajs/zod` share one
    // copy of the ForgeData class at runtime *and* in the emitted .d.ts files.
    // Building them separately inlined a private copy of ForgeData into each
    // subpath, so e.g. `fromZodSchema(new ForgeData(), schema)` failed to
    // type-check (and `instanceof ForgeData` differed between entries).
    entry: {
      index: "src/index.ts",
      "react/index": "src/react/index.tsx",
      "zod/index": "src/zod/index.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    clean: false,
    splitting: true,
    treeshake: true,
    target: "es2020",
    external: ["react", "zod"],
    outExtension({ format }) {
      return { js: format === "cjs" ? ".cjs" : ".js" };
    },
  },
  {
    entry: { cli: "src/cli.ts" },
    format: ["esm"],
    dts: false,
    sourcemap: true,
    clean: false,
    splitting: false,
    treeshake: true,
    target: "es2020",
    platform: "node",
  },
]);
