# Kameriya Express — Website

A React website for Kameriya Express Couriers and Cargo Services: public
pages (Home, About, Services, Contact), a public parcel tracking page, and a
staff-only admin dashboard to create parcels and post status/location
updates.

## What's inside

- **Frontend:** React + Vite, React Router
- **Backend:** Supabase (Postgres database + built-in authentication)
- **Hosting target:** Vercel (or Netlify) for the frontend

No separate backend server is needed — the frontend talks to Supabase
directly, using Row Level Security so the public can only *read* parcel data
and only logged-in staff can *write* it.

## 1. Set up Supabase (database + staff login)

1. Go to https://supabase.com and create a free account and a new project.
2. In your new project, go to **SQL Editor > New query**, paste the entire
   contents of `supabase/schema.sql` from this folder, and run it. This
   creates the `parcels` and `tracking_events` tables, security rules, and
   the trigger that keeps a parcel's status in sync with its latest
   checkpoint.
3. Go to **Authentication > Users > Add user** and create a login (email +
   password) for yourself and each staff member who should be able to post
   updates. These are the accounts used on the site's "Staff Login" page.
4. Go to **Settings > API** and copy two values: **Project URL** and the
   **anon public** key. You'll need these next.

## 2. Configure the frontend

1. Copy `.env.example` to `.env`:
   ```
   cp .env.example .env
   ```
2. Open `.env` and paste in your Supabase Project URL and anon public key.
3. Install dependencies and run locally to check everything works:
   ```
   npm install
   npm run dev
   ```
   Visit the local URL it prints (usually http://localhost:5173).

## 3. Try it locally

- Visit `/track` and search a tracking ID — it'll say "not found" until you
  create a parcel.
- Visit `/admin/login`, log in with a staff account you created in Supabase,
  create a parcel (this generates a tracking ID like `KMY24081401`), then
  add a checkpoint update (status + location).
- Go back to `/track` and search that tracking ID — you should see the
  status and checkpoint history.

## 4. Deploy

**Frontend (Vercel):**
1. Push this project to a GitHub repository.
2. Go to https://vercel.com, sign in, and "Import Project" from your GitHub repo.
3. In the Vercel project's **Environment Variables** settings, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   (same values as your local `.env`)
4. Deploy. Vercel auto-detects Vite and builds it correctly.

**Domain:**
1. Buy `kameriyaexpress.com` (or your chosen domain) from a registrar
   (GoDaddy, Namecheap, Hostinger, etc.).
2. In Vercel, go to your project's **Settings > Domains**, add your domain,
   and follow the DNS instructions it gives you (usually adding an A record
   or CNAME at your registrar).

That's it — the site is then live on your own domain with a real database,
staff logins, and working tracking, all on free tiers unless you scale up
significantly.

## Notes on what's placeholder vs. functional

- **Functional now:** navigation, parcel tracking lookup, admin login,
  parcel creation, checkpoint/status updates, status timeline UI.
- **Placeholder — replace before launch:** About Us / Services copy,
  contact phone/email/address text, the Contact form (it currently doesn't
  send anywhere — see the comment in `src/pages/Contact.jsx` for options
  to wire it up).
- **Brand:** colors were derived from your logo (navy + teal). Adjust the
  CSS variables at the top of `src/index.css` if you want to tune them.

## Project structure

```
src/
  components/    Navbar, Footer, ProtectedRoute (admin auth guard)
  lib/            supabaseClient.js, AuthContext.jsx
  pages/          Home, About, Services, Contact, Track, AdminLogin, AdminDashboard
supabase/
  schema.sql      Run this once in Supabase's SQL editor
```
