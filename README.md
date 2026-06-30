# design-to-code

A proof-of-concept pipeline that turns a design (image or description) into a live React component, instantly visible in Storybook — without a page reload.

## How it works

1. A **relay server** receives a `POST /generate` request containing a design payload.
2. It writes a new React component and a matching Storybook story into `storybook-app/src/components/Generated/`.
3. Vite's HMR picks up the new files and the component appears in Storybook automatically.

## Project structure

```
design-to-code/
├── relay-server/       # Express server that receives design requests and writes component files
└── storybook-app/      # React + Vite + Tailwind app with Storybook for live component preview
```

## Running locally

### 1. Relay server

```bash
cd relay-server
npm install
npx tsx server.ts
```

The server starts on **http://localhost:4000**.

Send a POST request to `/generate` to trigger component generation:

```bash
curl -X POST http://localhost:4000/generate \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 2. Storybook

```bash
cd storybook-app
npm install
npm run storybook
```

Storybook starts on **http://localhost:6006**. Generated components appear under the **Generated** section in the sidebar as soon as the relay server writes them.

## Prerequisites

- Node.js 18+
- npm
