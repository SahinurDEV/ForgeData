# Security Policy

## Supported versions

ForgeData is released continuously from `main` with semantic-release. Security fixes are made in the
latest published version of [`forgedatajs`](https://www.npmjs.com/package/forgedatajs) only.

| Version        | Supported          |
| -------------- | ------------------ |
| Latest `0.x`   | :white_check_mark: |
| Older releases | :x:                |

Please upgrade to the latest version before reporting an issue.

## Reporting a vulnerability

**Please do not report security vulnerabilities through public GitHub issues, discussions or pull
requests.**

Report them privately using GitHub's private vulnerability reporting:

1. Go to the [Security tab](https://github.com/SahinurDEV/ForgeData/security) of this repository.
2. Click **Report a vulnerability**
   ([direct link](https://github.com/SahinurDEV/ForgeData/security/advisories/new)).
3. Describe the issue, including the affected version, steps to reproduce or a proof of concept, and
   the potential impact.

The report is visible only to the maintainer. You can expect an initial response acknowledging the
report as soon as possible; we will keep you informed about the investigation and fix, coordinate a
disclosure date with you, and credit you in the published advisory unless you prefer to remain
anonymous.

## Scope

ForgeData generates **fake** data for testing, prototyping and demos. Values such as credit card
numbers, IBANs, API keys, JWTs, passwords and OTPs are random and are **not** cryptographically
secure. Do not use ForgeData to generate real secrets, credentials or security tokens — that is
working as intended and not a vulnerability.

Relevant reports include, for example: code execution or prototype pollution via the library or the
`forgedata` CLI, denial of service caused by crafted input (e.g. Zod schemas or CLI flags), or a
compromised build/release pipeline or published package.
