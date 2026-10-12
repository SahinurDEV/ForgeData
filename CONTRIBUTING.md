# Contributing to ForgeData

Thanks for your interest in improving ForgeData! Bug reports, docs fixes, new generators, new
locales and tooling improvements are all welcome. This guide explains how to get set up and what we
look for in a pull request.

By participating in this project you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Ways to contribute

- **Report a bug** — open a [bug report](https://github.com/SahinurDEV/ForgeData/issues/new?template=bug_report.yml).
- **Suggest a feature** — open a [feature request](https://github.com/SahinurDEV/ForgeData/issues/new?template=feature_request.yml).
- **Ask a question or share an idea** — use [GitHub Discussions](https://github.com/SahinurDEV/ForgeData/discussions).
- **Pick up an issue** — issues labelled
  [`good first issue`](https://github.com/SahinurDEV/ForgeData/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
  or [`help wanted`](https://github.com/SahinurDEV/ForgeData/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
  are a great place to start. Leave a comment so others know you are working on it.
- **Report a security vulnerability** — please do **not** open a public issue; see
  [SECURITY.md](./SECURITY.md).

For larger changes (a new module, a new subpath export, a breaking API change), please open an
issue or discussion first so we can agree on the design before you invest time in it.

## Development setup

Requirements: **Node.js 18 or newer** (CI tests on 18, 20, 22 and 24) and npm.

```bash
# 1. Fork the repository on GitHub, then clone your fork
git clone https://github.com/<your-username>/ForgeData.git
cd ForgeData

# 2. Install dependencies (uses the committed package-lock.json)
npm ci

# 3. Create a branch for your change
git checkout -b feat/my-change
```

## Project layout

| Path            | What lives there                                                             |
| --------------- | ---------------------------------------------------------------------------- |
| `src/<module>/` | One folder per generator module (`person`, `internet`, `finance`, …)         |
| `src/locales/`  | Built-in locale data (`en`, `bn`, `hi`, `ar`, `ja`, `fr`, `de`, `es`, `zh`)  |
| `src/helpers/`  | Seedable PRNG, randomness helpers, unique-value tracking, formatting         |
| `src/react/`    | `forgedatajs/react` subpath (provider + hooks)                               |
| `src/zod/`      | `forgedatajs/zod` subpath (`fromZodSchema`)                                  |
| `src/cli*.ts`   | The `forgedata` CLI (`cli-core.ts` holds the testable logic)                 |
| `tests/`        | Vitest test suites, mirroring the `src/` structure                           |
| `docs/`         | Static website + documentation (HTML + Tailwind), deployed with GitHub Pages |
| `examples/`     | Runnable Node, browser, React and CLI samples                                |
| `scripts/`      | Build, benchmark, size-report and release helper scripts                     |

## Useful scripts

| Command                 | What it does                                                         |
| ----------------------- | -------------------------------------------------------------------- |
| `npm run build`         | Build ESM + CJS + type declarations into `dist/` with tsup           |
| `npm run dev`           | Rebuild on change                                                    |
| `npm test`              | Run the test suite once                                              |
| `npm run test:watch`    | Run tests in watch mode                                              |
| `npm run test:coverage` | Run tests and enforce the 100% coverage thresholds                   |
| `npm run typecheck`     | Type-check with `tsc --noEmit`                                       |
| `npm run lint`          | Lint with ESLint (`npm run lint:fix` to auto-fix)                    |
| `npm run format`        | Format `src/` and `tests/` with Prettier                             |
| `npm run format:check`  | Check formatting without writing                                     |
| `npm run cli -- <args>` | Run the CLI from source, e.g. `npm run cli -- generate person.email` |
| `npm run bench`         | Micro-benchmark (compares against Faker.js if it is installed)       |
| `npm run size`          | Build and report bundle sizes                                        |
| `npm run preflight`     | Lint + typecheck + coverage tests + build — run this before a PR     |

## Tests and coverage

ForgeData enforces **100% statement, branch, function and line coverage** (see
[`vitest.config.ts`](./vitest.config.ts)), and CI fails if coverage drops.

- Every new generator, option or code path needs tests in the matching file under `tests/`.
- Prefer seeded instances (`new ForgeData({ seed: 1 })`) so tests are deterministic.
- Assert on the _shape_ of generated values (format, range, membership in a locale pool) rather than
  on one hard-coded random output, unless you are explicitly testing seed determinism.
- Keep the main entry point free of runtime dependencies and Node-only APIs: `src/` must run
  unmodified in Node.js 18+, Bun, Deno and browsers. `react` and `zod` are optional peer
  dependencies and may only be imported from their own subpaths.

## Code style

- TypeScript, formatted with [Prettier](https://prettier.io/) (config in `.prettierrc.json`) and
  linted with ESLint. Run `npm run format` and `npm run lint` before committing.
- Public APIs should have precise return types and a short JSDoc comment.
- An [`.editorconfig`](./.editorconfig) is provided for consistent whitespace across editors.

## Commit messages (important: they drive releases)

This project uses [Conventional Commits](https://www.conventionalcommits.org/) and
[semantic-release](https://semantic-release.gitbook.io/). Every push to `main` is analysed and,
depending on the commit types, a new version is **automatically published to npm** with a generated
changelog entry. Pull requests are squash-merged and the **PR title becomes the commit message**, so
please give your PR a Conventional Commit title.

| Type                                                               | Example                                    | Release    |
| ------------------------------------------------------------------ | ------------------------------------------ | ---------- |
| `feat:`                                                            | `feat(locale): add Portuguese (pt) locale` | minor      |
| `fix:`                                                             | `fix(date): respect min/max in between()`  | patch      |
| `perf:`                                                            | `perf(prng): avoid allocation in nextInt`  | patch      |
| `feat!:` / `BREAKING CHANGE:` footer                               | `feat!: drop Node 18 support`              | major      |
| `docs:`, `chore:`, `test:`, `refactor:`, `style:`, `ci:`, `build:` | `docs: clarify seeding in README`          | no release |

Use an optional scope for the affected module (`person`, `internet`, `zod`, `react`, `cli`,
`locale`, …). Breaking changes must be clearly called out in the PR description.

## Pull request process

1. Make sure there is an issue or discussion for anything non-trivial.
2. Keep pull requests focused — one logical change per PR.
3. Run `npm run preflight` (and `npm run format:check`) locally; all checks must pass.
4. Update documentation when behaviour changes: `README.md` and, where relevant, the docs site in
   `docs/docs.html`. Do not edit `CHANGELOG.md` — semantic-release maintains it.
5. Open the PR against `main` with a Conventional Commit title and fill in the PR template.
6. CI (lint, typecheck, 100%-coverage tests and build on Node 18/20/22/24) must be green.
7. A maintainer ([@SahinurDEV](https://github.com/SahinurDEV)) will review. Please be patient and
   responsive to feedback; once approved the PR is squash-merged and, if it contains a `feat`/`fix`,
   released to npm automatically.

## Adding a new locale

1. Create `src/locales/<code>.ts` exporting a `LocaleData` object (see `src/locales/types.ts` and an
   existing locale such as `src/locales/de.ts` for the shape).
2. Register it in `src/locales/index.ts` (import, re-export and add it to `builtInLocales`).
3. Add tests (e.g. in `tests/locales/`) and keep coverage at 100%.
4. Update the locale lists in `README.md` and `docs/docs.html`.

Use realistic, commonly used names and places, and avoid offensive or real-person-identifying data.

## Adding a new generator

1. Add the method to the relevant module class in `src/<module>/index.ts` (it is picked up by
   `forge.listGenerators()` and the CLI automatically via introspection).
2. Use the instance's seeded randomness helpers — never `Math.random()` directly — so output stays
   deterministic for a given seed.
3. Add tests and document it in the README's module table and the docs site.

## License

By contributing, you agree that your contributions will be licensed under the project's
[MIT License](./LICENSE).
