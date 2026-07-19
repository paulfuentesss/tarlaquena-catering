# Tarlaquena Catering

Website for Tarlaquena Catering, a catering business — built to showcase menus, packages, and booking inquiries.

Stack: Next.js (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Drizzle ORM · Neon (Postgres) · Clerk (admin auth).

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in:
   - `DATABASE_URL` — a [Neon](https://neon.tech) Postgres connection string.
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` — from the [Clerk dashboard](https://dashboard.clerk.com), API Keys page.
   - `ADMIN_EMAIL` — the email of the Clerk account allowed to view inquiries at `/admin`. Must match the signed-in user's email exactly.
3. `npm run db:generate && npm run db:migrate` to create the `contact_messages` table in Neon.
4. `npm run dev` and visit [http://localhost:3000](http://localhost:3000).

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:generate` | Diff `src/db/schema.ts`, write a new SQL migration |
| `npm run db:migrate` | Apply pending migrations to Neon |
| `npm run db:push` | Prototype-mode: sync schema straight to Neon, no migration file |
| `npm run db:studio` | Local GUI to browse the Neon tables |

## Editing content

Offerings, packages, core values, and testimonials are static/typed data, not database-backed — edit them directly:

- `src/lib/content/offerings.ts`
- `src/lib/content/packages.ts`
- `src/lib/content/values.ts`
- `src/lib/content/testimonials.ts`

## Photos

No licensed photography is wired in yet. Every image slot renders a labeled placeholder (`src/components/ui/placeholder-image.tsx`) instead of a broken image or a third-party stock-photo service. To swap in a real photo, pass a `src` to the relevant `<PlaceholderImage>`/`<Image>` usage — search the codebase for `TODO: replace` to find every slot, including the testimonial `avatar` field in the content files above.

## Admin inquiries

The contact form on the homepage writes to the `contact_messages` table via a Server Action (`src/lib/actions/contact.ts`). `/admin` shows a table of submissions, gated by Clerk (`src/proxy.ts`) plus an email allowlist check in the page itself (`src/app/admin/page.tsx`).

`/admin` is intentionally **not linked** anywhere in the public nav — bookmark it directly. This isn't for security (Clerk fully protects the route either way) — it's to avoid showing customers a "Login" affordance that implies customer accounts, which don't exist on this site.

## Note on this Next.js version

This project pins a Next.js release where some conventions differ from older docs/training data you may be used to — most notably, `middleware.ts` is deprecated in favor of `proxy.ts` (see `src/proxy.ts`). Check `node_modules/next/dist/docs/` if something behaves unexpectedly.
