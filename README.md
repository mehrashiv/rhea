# lila

An Instagram-style photo feed — share photos, caption them, like, and edit captions inline. Built with Next.js and InsForge.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + [React 19](https://react.dev) + TypeScript
- [InsForge](https://insforge.dev) — backend-as-a-service for database (PostgreSQL/PostgREST), auth, and file storage
- [Tailwind CSS 4](https://tailwindcss.com) for resets, with a hand-rolled design system (`app/globals.css`, `tokens/`) for everything else
- [@insforge/sdk](https://www.npmjs.com/package/@insforge/sdk) on the client, [@insforge/cli](https://www.npmjs.com/package/@insforge/cli) for backend/database management

## Prerequisites

- Node.js 20+
- An [InsForge](https://insforge.dev) account and project (the app needs an InsForge backend to run — see below)

## Get started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up an InsForge backend

If you don't already have an InsForge project for this app, create one:

```bash
npx @insforge/cli login
npx @insforge/cli create   # or: npx @insforge/cli link, to use an existing project
```

This links the current directory to your InsForge project so the CLI commands below know where to apply changes.

### 3. Configure environment variables

Copy the example file and fill in your project's URL and anon key:

```bash
cp .env.example .env.local
```

```bash
# .env.local
NEXT_PUBLIC_INSFORGE_URL=https://your-app.region.insforge.app
NEXT_PUBLIC_INSFORGE_ANON_KEY=...
INSFORGE_API_KEY=...
```

- `NEXT_PUBLIC_INSFORGE_URL` and `NEXT_PUBLIC_INSFORGE_ANON_KEY` are public values read by the app at runtime (`lib/insforge.ts`). Find them with `npx @insforge/cli metadata --json` or in your project dashboard.
- `INSFORGE_API_KEY` is an admin secret used only by `.mcp.json` / the CLI for local backend management. It is **not** read by the app and should never be deployed or committed.

### 4. Run migrations to create the database tables

The `posts` and `likes` tables (with their indexes and row-level security policies) are defined in [`migrations/`](migrations). Apply them to your linked InsForge project:

```bash
npx @insforge/cli db migrations up --all
```

### 5. Create the storage bucket

Posts store their images in a public bucket called `post-images`:

```bash
npx @insforge/cli storage create-bucket post-images
```

### 6. Create your first account

There's no public sign-up page (the login screen is invite-only by design). Create an account once via the SDK's `signUp`, e.g. in a throwaway script using your project's URL and anon key, or directly from your InsForge project dashboard. After that, log in at `/l0gin`.

### 7. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Other scripts

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

## Deploying to Vercel

1. Push the repo to GitHub and [import it into Vercel](https://vercel.com/new). Next.js is auto-detected — no custom build settings are needed.
2. In the Vercel project's Environment Variables, add:
   - `NEXT_PUBLIC_INSFORGE_URL`
   - `NEXT_PUBLIC_INSFORGE_ANON_KEY`

   Do **not** add `INSFORGE_API_KEY` — it's an admin key only needed for local CLI/migration work, not by the deployed app.
3. Make sure migrations (step 4 above) and the storage bucket (step 5) have already been applied to the InsForge project you're pointing at — Vercel only deploys the frontend, it doesn't provision your backend.
4. Deploy. Every push to your default branch redeploys automatically once the project is linked.

## Project structure

- `app/` — Next.js App Router entry points (`page.tsx`, `layout.tsx`, `l0gin/`)
- `components/` — feed, composer, post card, auth UI
- `lib/` — InsForge client, auth context, profile cache, shared types
- `migrations/` — versioned SQL for the InsForge database, applied with `db migrations up`
- `archive/` — a previous iteration of this app, kept for reference only
