# Playwright BDD UI Validator (TypeScript) - Demo (Windows)

This is a ready-to-run skeleton for **Playwright 1.56** + **Cucumber 11.3** + **TypeScript**, designed for validating UI controls (visibility, required fields, dropdowns).
It includes a small demo web app (login + employee form) so you can run the tests locally on **Windows**.

## What is included
- BDD feature file with Background login
- TypeScript step definitions, hooks and world (per-scenario browser isolation)
- `.env.example` for credentials and BASE_URL
- A demo server (`demo/server.js`) that serves a login page and an employee form
- npm scripts to run the demo and tests

## Quick start (Windows)

1. Extract the ZIP and open a terminal in the project folder.

2. Install dependencies:
```bash
npm install
```

3. (Optional) Install Playwright browsers (if not done automatically):
```bash
npx playwright install
```

4. Start the demo app (runs on port 3000):
```bash
npm run start:demo
```

5. Copy `.env.example` to `.env` and ensure `BASE_URL` is `http://localhost:3000`:
```bash
copy .env.example .env
```

6. Run tests:
```bash
npx cucumber-js
```

Notes:
- The demo login uses credentials from `.env` (USERNAME / PASSWORD).
- Tests run scenarios in parallel (see `cucumber.js` — `--parallel 4`).
- On CI / Windows, ensure ports and permissions are available.

