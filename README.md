# SDP (Blockchain Platform Frontend)

Next.js frontend for an enterprise-style blockchain platform UI (smart contract generator, templates, security scanner, verification, explorer, and a dashboard).

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS (v4) + Shadcn-style UI components (Radix)
- pnpm

## Getting started

### Prerequisites

- Node.js (recommended: latest LTS)
- pnpm (`npm i -g pnpm`)

### Install

```bash
pnpm install
```

### Run locally (dev)

```bash
pnpm dev
```

App runs at:
- http://localhost:3000

### Production build

```bash
pnpm build
pnpm start
```

## Scripts

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm start` — start production server
- `pnpm lint` — run lint

## Project structure

- `app/` — Next.js routes (App Router)
- `components/` — shared React components
- `components/ui/` — reusable UI primitives
- `lib/` — utilities
- `public/` — static assets
- `styles/` and `app/globals.css` — global styling/theme tokens

## Notes

- If you see a Next.js warning about multiple lockfiles / inferred workspace root, it usually means there is another lockfile in a parent directory. Removing the extra lockfile (outside this project) or configuring `turbopack.root` can silence it.

## License

Private / internal project.
