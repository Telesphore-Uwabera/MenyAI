# MenyAI Admin Panel

Web dashboard for managing MenyAI: lessons, users, and progress.

## Setup

1. **Backend**: Set `ADMIN_SECRET` in `backend/.env` (e.g. a long random string). All admin API requests must send this value as the `X-Admin-Key` header.

2. **Install and run** (from repo root or this folder):

   ```bash
   cd admin-panel
   pnpm install
   pnpm dev
   ```

   Opens at [http://localhost:3000](http://localhost:3000). The dev server proxies `/api` to the backend at `http://localhost:4000`.

3. **Log in**: Enter the same value as `ADMIN_SECRET` in the login form. It is stored in `localStorage` and sent with every admin API request.

## Features

- **Dashboard**: Counts of lessons, users, and progress records.
- **Lessons**: List, add, edit, and delete lessons (Firestore `lessons` collection).
- **Users**: List Firebase Auth users (email/internal id, display name, created).
- **Progress**: List all progress documents (per-user completion and streaks).

## Backend URL

- **Dev**: With `pnpm dev`, `/api` is proxied to `http://localhost:4000`. Start the backend on port 4000.
- **Custom URL**: On the **login page**, set "Backend URL" (e.g. `https://menyai-nslw.onrender.com`) and it is saved for all requests. You can also change it later under **Settings**.
- **Build**: Set `VITE_API_URL` in `.env` before `pnpm build` to bake the API URL into the app, or leave unset and configure it at runtime via Settings.

## Production

- Build: `pnpm build` (output in `dist/`).
- Serve `dist/` with any static host. Set **Backend URL** in Settings (or at login) to point to your deployed backend.
