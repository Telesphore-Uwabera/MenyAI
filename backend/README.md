# MenyAI Backend

**Stack:** Node.js + Express, Firebase (Authentication + Firestore), OpenAI API (optional).

The backend is implemented using Node.js and Express, with Firebase providing authentication and cloud-based data storage. Express APIs manage lesson delivery, learner progress tracking, and controlled access to the optional AI tutoring service.

## Features

- **Lessons** – `GET /api/lessons`, `GET /api/lessons/:id` (Firestore or stub)
- **Progress** – `GET /api/progress`, `POST /api/progress` (per-user, requires Firebase ID token)
- **AI tutoring** – `POST /api/ai/chat` (OpenAI, optional; requires auth)

## Setup

```bash
cd backend
cp .env.example .env
# Edit .env: add Firebase service account and optionally OPENAI_API_KEY
pnpm install
pnpm start
```

- **Firebase:** Create a project, get a service account key (JSON), and set `GOOGLE_APPLICATION_CREDENTIALS` or `FIREBASE_SERVICE_ACCOUNT_JSON` in `.env`.
- **OpenAI:** Add `OPENAI_API_KEY` to enable the AI chat endpoint.

## Run

- `pnpm start` – run server (default port 4000)
- `pnpm dev` – run with file watch

## Auth

Protected routes expect the Firebase ID token in the header:

```
Authorization: Bearer <idToken>
```

The mobile app should send the token from Firebase Auth after the user signs in.

## Admin panel integration

The admin panel (in repo `admin-panel/`) talks to this backend over the **Admin API** (`/api/admin/*`), protected by the `X-Admin-Key` header. Set `ADMIN_SECRET` in `.env` and use that value as the “password” in the admin login, or set `ADMIN_MOCK=1` to use mock login (Username: **Admin**, Password: **123**).

- **Standalone:** Run the backend (e.g. `http://localhost:4000`) and the admin panel (e.g. `pnpm dev` in `admin-panel/`). In dev the admin defaults to `http://localhost:4000` when no Backend URL is set; you can also set it on the login or Settings page.
- **Served by backend:** Build the admin with base path `/admin/`, then copy the build into the backend so it is served at `http://localhost:4000/admin/`:

  ```bash
  # From repo root
  cd admin-panel
  pnpm build -- --base=/admin/
  # Copy build into backend (Windows PowerShell)
  xcopy /E /I dist ..\backend\public\admin
  # Or on macOS/Linux: cp -r dist/* ../backend/public/admin
  cd ../backend
  mkdir -p public/admin   # if needed
  # Then copy admin-panel/dist contents into backend/public/admin
  pnpm start
  ```

  Then open `http://localhost:4000/admin/`. Leave the admin “Backend URL” empty so it uses the same origin.
