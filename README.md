# serverless-app (Cloudflare Worker)

A minimal **Cloudflare Workers** TypeScript project using **Wrangler** for local development/deployment and **Vitest** (via `@cloudflare/vitest-pool-workers`) for testing in a Workers runtime.

## What it does

The Worker currently responds based on the request method and (for `POST`) whether the URL ends with `/user`.

- **GET \*** → `"this is a get request"`
- **POST /user** → `"this is a post request to /user"`
- **POST (anything else)** → `"this is a post request to not /user"`

The entrypoint is `src/index.ts`, exported as the default `ExportedHandler<Env>`.

## Project structure

- `src/index.ts`: Worker handler (`fetch`)
- `wrangler.jsonc`: Wrangler configuration (name, entrypoint, compatibility date, flags)
- `worker-configuration.d.ts`: generated runtime/binding types (from `wrangler types`)
- `test/`: Vitest tests configured to run in a Workers environment

## Requirements

- Node.js + npm
- A Cloudflare account (only required for deploying)

## Install

```bash
npm install
```

## Run locally (dev server)

```bash
npm run dev
```

Wrangler will start a local server and route requests to your Worker.

## Try it

In another terminal (adjust the port if Wrangler prints a different one):

```bash
curl -i http://127.0.0.1:8787/
curl -i -X POST http://127.0.0.1:8787/user
curl -i -X POST http://127.0.0.1:8787/anything-else
```

## Deploy

```bash
npm run deploy
```

This runs `wrangler deploy` using `wrangler.jsonc`.

## Type generation (Wrangler bindings)

If you add/update bindings in `wrangler.jsonc` (KV/R2/D1/Durable Objects/vars/etc.), regenerate types:

```bash
npm run cf-typegen
```

This updates `worker-configuration.d.ts` so `Env` typing stays in sync.

## Tests

```bash
npm test
```

Tests are configured through `vitest.config.mts` to use the Workers pool with your `wrangler.jsonc` config.

Note: the current sample test snapshots in `test/index.spec.ts` expect `"Hello World!"`, while the Worker implementation returns different strings. Update the tests (or the Worker response) if you want `npm test` to pass.

## Wrangler configuration notes

Key settings in `wrangler.jsonc`:

- **`main`**: `src/index.ts`
- **`compatibility_date`**: `2026-02-12`
- **`compatibility_flags`**: includes `nodejs_compat`
- **Observability**: enabled

## Agents

Guidance for Cloudflare Workers in this project:

- STOP. Your knowledge of Cloudflare Workers APIs and limits may be outdated. Always retrieve current documentation before any Workers, KV, R2, D1, Durable Objects, Queues, Vectorize, AI, or Agents SDK task.

### Docs

- `https://developers.cloudflare.com/workers/`
- MCP: `https://docs.mcp.cloudflare.com/mcp`

For all limits and quotas, retrieve from the product's `/platform/limits/` page, for example `/workers/platform/limits`.

### Commands

| Command | Purpose |
|---------|---------|
| `npx wrangler dev` | Local development |
| `npx wrangler deploy` | Deploy to Cloudflare |
| `npx wrangler types` | Generate TypeScript types |

Run `wrangler types` after changing bindings in `wrangler.jsonc`.

### Node.js compatibility

`https://developers.cloudflare.com/workers/runtime-apis/nodejs/`

### Errors

- **Error 1102** (CPU/Memory exceeded): Retrieve limits from `/workers/platform/limits/`
- **All errors**: `https://developers.cloudflare.com/workers/observability/errors/`

### Product docs

Retrieve API references and limits from:
`/kv/` · `/r2/` · `/d1/` · `/durable-objects/` · `/queues/` · `/vectorize/` · `/workers-ai/` · `/agents/`

## License

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.


