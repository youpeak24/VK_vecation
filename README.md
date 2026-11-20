# VK Vacations

Travel-agency website + admin console. React 19, Vite, Tailwind, **Firebase** (Firestore, Auth, Analytics) backend, deployed on Vercel.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
```

## Architecture

| Layer | Where | Notes |
|---|---|---|
| Firebase client | `src/lib/firebase/client.ts` | Firestore (memory cache only — no PII in IndexedDB), Auth, optional App Check |
| Live data stores | `src/lib/firebase/store.ts`, `stores.ts` | One real-time, write-through cache per collection. Reads stay synchronous, writes sync to Firestore, every change fires `vk_db_update` |
| Sync lifecycle | `src/lib/firebase/sync.ts` | Public content for everyone; admin collections only while an authorised admin is signed in; wiped on sign-out |
| Data API | `src/services/api.ts` | The one API all admin pages use (unchanged shape), now Firestore-backed, with a real audit trail |
| Auth | `src/services/auth.ts`, `src/hooks/useAuth.ts` | Firebase email/password + an `admins/{uid}` authorisation document |
| Public forms | `src/services/inquiryService.ts` | Enquiries → `enquiries`, contact page → `contactSubmissions` (validated client **and** server side) |
| Public content hooks | `src/hooks/useContent.ts` | Packages / destinations / departures, live from Firestore; bundled data until the DB is seeded |
| Analytics | `src/lib/firebase/analytics.ts`, `components/analytics/RouteTracker.tsx` | GA4 page views + `generate_lead`; production only, never on `/admin` |
| Security | `firestore.rules` | Locked down; covered by `tests/firestore.rules.test.mjs` |

### Data model

| Collection | Visitors | Admins |
|---|---|---|
| `packages`, `templePackages`, `destinations` | read published (`isActive == true`) | read all, write |
| `departures`, `banners`, `seo`, `meta` | read | write |
| `enquiries`, `contactSubmissions` | **create only** (validated) | read, update (delete: Super Admin) |
| `customers`, `bookings`, `payments`, `invoices`, `refunds` | — | read, write (delete: Super Admin) |
| `leads`, `followUps`, `suppliers` | — | read, write, delete |
| `staff` | — | read (write: Super Admin) |
| `admins` | — | own doc only (manage: Super Admin) |
| `auditLogs` | — | read + append only, immutable |

## One-time Firebase setup (project `vkvacation-acca7`)

1. **Firestore** → *Create database* → **Production mode**, region `asia-south1` (Mumbai).
2. **Authentication** → *Sign-in method* → enable **Email/Password**.
   Then *Settings → User actions* → untick **Enable create (sign-up)** (staff are added by you, not self-registered).
   *Settings → Authorized domains* → add `vkvacations.in`, `www.vkvacations.in` and your `*.vercel.app` domain.
3. **Create your first admin**
   1. *Authentication → Users → Add user* (your email + a strong password). Copy the **User UID**.
   2. *Firestore → Start collection* `admins` → Document ID = that UID, fields:
      `name` (string), `email` (string), `role` = `Super Admin` (string), `active` = `true` (boolean).
   **Storage (for the admin image picker):** *Build → Storage → Get started*. Firebase may require the pay-as-you-go (Blaze) plan to create a bucket; usage at this scale is normally within the free quota. Until Storage is enabled, the picker shows a notice and you can still paste image URLs.
4. **Deploy the security rules** for Firestore **and** Storage (without this the database stays locked and the site shows bundled content):
   ```bash
   npx firebase-tools login
   npm run firebase:deploy:rules
   ```
5. Sign in at `/admin/login`. On the first sign-in the site content (packages, destinations, departures, banners, SEO) is copied into Firestore automatically. Operational data (customers, bookings, …) starts empty.
6. **Add more staff:** repeat step 3 per person; roles are `Super Admin`, `Tour Manager`, `Sales Specialist`, `Accounts Executive`. Set `active` to `false` to revoke access instantly.

### Optional hardening

- **App Check** (blocks scripted spam of the public forms): *Firebase console → App Check → Register web app (reCAPTCHA v3)*, then set `VITE_FIREBASE_APPCHECK_SITE_KEY` in Vercel. Enforce it for Firestore once traffic shows verified.
- **Email on new enquiry:** install the *Trigger Email from Firestore* extension watching `enquiries`.

## Environment variables

Everything is optional; defaults point at the production project. See `.env.example`.
Set overrides in Vercel → Project → Settings → Environment Variables.

## Local development against emulators

```bash
npm run emulators                      # Firestore + Auth emulators (needs Java)
# .env.local:  VITE_USE_FIREBASE_EMULATOR=true
npm run dev
```

## Tests

```bash
npm run test:rules   # runs firestore.rules against the Firestore emulator
```

## Deployment (Vercel)

`vercel.json` rewrites all routes to `index.html` (single-page app) and sets cache/security headers. Content created in the admin appears on the public site immediately; **note** the static `public/sitemap.xml` lists the current pages, so add new package/destination URLs to it when you publish them.

## Secrets & the AI chatbot

- Never commit `.env` (it is git-ignored). Real values go in `.env.local` for development and in **Vercel → Settings → Environment Variables** for production. `.env.example` lists the variable names with placeholders only.
- Every `VITE_*` variable is compiled into the public JavaScript bundle, so a `VITE_GROQ_API_KEY` can be read by anyone who opens the site's dev tools. Treat it as public: create a dedicated Groq key with a low usage limit, and rotate it if it leaks.
- For a truly private key, call Groq from a Vercel serverless function (`/api/chat`) that reads a non-`VITE_` variable (`GROQ_API_KEY`), and have the website call that endpoint instead of Groq directly.
