# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Split source into focused modules under `src/`. `index.js` remains the public entry point and re-exports the full API. No behavioural changes.
- Rewrote the `address` and `url` detectors as plain linear scanners to eliminate catastrophic-backtracking risk.
- Packaging: added `engines.node` (`>=16`), `files`, `exports`, and `types` fields. License metadata corrected to MIT to match `LICENSE`.

### Added
- TypeScript declarations at `index.d.ts` covering the full public API.
- `prepublishOnly` script runs the test suite before publish.

### Security
- Hardened regex patterns previously vulnerable to ReDoS on crafted input.

## [2.0.0] - 2025-07-16

### Added
- `removePIIDetailed` returning counts, removed items, and reduction percentage.
- `detectPII` locates PII with start/end positions without modifying the text.
- `analyzePII` combines detection, removal, and risk scoring.
- `validatePIICompliance` returns a boolean compliance check plus recommendations.
- `processBatch` for processing arrays of strings.
- `getAvailableTypes` and `createCustomPattern` helpers.
- Configurable per-type `remove` and `replacement` options.
- Additional PII types: ZIP codes, bank account numbers, URLs, dates of birth.

### Changed
- Package is now ESM (`"type": "module"`).

## [1.0.0] - 2023

### Added
- Initial release with `removePII` covering email, phone, SSN, credit card, address, passport, driver's license, and IP address.
