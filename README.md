# design-to-code

A proof-of-concept pipeline that turns a Figma design into a live React component, instantly visible in Storybook — without a page reload.

## How it works

1. A **relay server** receives a `POST /generate` request containing a Figma node tree, component name, and an optional screenshot.
2. It sends the design data to **Claude** (via the Anthropic SDK), which generates a Tailwind-styled React component.
3. The component and a matching Storybook story are written into `storybook-app/src/components/Generated/`.
4. Vite's HMR picks up the new files and the component appears in Storybook automatically.

## Project structure

```
design-to-code/
├── relay-server/       # Express server — calls Claude and writes generated component files
└── storybook-app/      # React + Vite + Tailwind app with Storybook for live component preview
```

## Running locally

### 1. Relay server

Create a `.env` file inside `relay-server/` with your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Then start the server:

```bash
cd relay-server
npm install
npx tsx server.ts
```

The server starts on **http://localhost:4000**.

#### Generating a component

Send a `POST /generate` request with a `componentName` and a `nodeTree` (Figma node JSON). An optional `imageBase64` (PNG) can be included to give Claude a visual reference:

```bash
curl -X POST http://localhost:4000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "componentName": "PrimaryButton",
    "nodeTree": { "type": "FRAME", "name": "PrimaryButton" }
  }'
```

The response includes `{ status, componentName, code }`.

### 2. Storybook

```bash
cd storybook-app
npm install
npm run storybook
```

Storybook starts on **http://localhost:6006**. Generated components appear under the **Generated** section in the sidebar as soon as the relay server writes them. Stories are only created on first generation — subsequent requests update the component file without overwriting the story.

## Prerequisites

- Node.js 18+
- npm
- Anthropic API key
