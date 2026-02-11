# MenyAI

AI-powered literacy platform (Kinyarwanda). **Mobile app** (React Native/Expo), **backend** (Node.js + Express + Firebase), and **admin panel** (React) for managing lessons, users, and progress.

---

## Project structure

```
MenyAI/
├── mobile/          # Expo app (auth, lessons, practice, progress)
├── backend/         # Express API (lessons, progress, auth, admin API)
├── admin-panel/     # Web dashboard (lessons CRUD, users, progress)
├── firestore.rules  # Firestore security rules
├── firebase.json    # Firebase CLI config
└── .firebaserc      # Firebase project id (menyai-27cfc)
```

---

## Prerequisites

- **Node.js** 18+
- **pnpm** (or npm)
- **Firebase project** (Auth + Firestore)
- **Firebase CLI** (optional, for deploying rules)

---

## Quick start

### Install (from repo root)

```bash
pnpm install
cd backend && pnpm install && cd ..
cd admin-panel && pnpm install && cd ..
cd mobile && pnpm install && cd ..
```

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env: GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT_JSON (see Firebase below)
pnpm start
```

Runs at **http://localhost:4000**. Check **http://localhost:4000/health**.

### Mobile app

```bash
cd mobile
pnpm start
```

Press **a** (Android) or **i** (iOS), or scan QR with Expo Go. Auth: Firebase phone + PIN.

### Admin panel

```bash
cd admin-panel
pnpm dev
```

Opens at **http://localhost:3000**. Login **Admin** / **123** (mock) or your `ADMIN_SECRET`. Backend URL defaults to `http://localhost:4000` in dev.

---

## Firebase setup

### Console

1. [Firebase Console](https://console.firebase.google.com) → create or open project (e.g. **menyai-27cfc**).
2. **Authentication** → enable **Phone** (and any other sign-in).
3. **Firestore Database** → Create database (test or production), choose region.

### Backend credentials

**Option A – Service account file (local)**  
1. Project settings → **Service accounts** → **Generate new private key** → download JSON.  
2. Place JSON in repo (e.g. root); **do not commit** (`.gitignore`: `*-firebase-adminsdk-*.json`).  
3. **backend/.env**: `GOOGLE_APPLICATION_CREDENTIALS=../your-key-file.json` (path relative to `backend/`).

**Option B – JSON in env (e.g. Render)**  
1. One-line key: `node backend/scripts/minify-firebase-json.js path/to/key.json`  
2. On host: set **FIREBASE_SERVICE_ACCOUNT_JSON** to that string.

### Mobile app config

In Firebase Console add Android/iOS apps; download `google-services.json` and `GoogleService-Info.plist` into **mobile/** and configure **mobile/lib/firebase.ts** (or use Expo config).

---

## Firebase CLI (deploy rules)

From repo root:

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules
```

Project is in **.firebaserc** (default **menyai-27cfc**). Switch: `firebase use <project-id>`.  
**firestore.rules**: authenticated read **lessons**; read/write **progress/{userId}** only for that user. Backend (Admin SDK) is not restricted by these rules.

---

## Environment variables

| Where         | Variable                         | Purpose |
|---------------|-----------------------------------|--------|
| backend/.env  | `PORT`                           | Server port (default 4000) |
| backend/.env  | `GOOGLE_APPLICATION_CREDENTIALS` | Path to service account JSON (local) |
| backend/.env  | `FIREBASE_SERVICE_ACCOUNT_JSON`  | Inline JSON (e.g. Render) |
| backend/.env  | `ADMIN_SECRET`                   | Admin API key; omit for mock Admin/123 |
| backend/.env  | `OPENAI_API_KEY`                 | Optional; for /api/ai/chat |
| admin-panel   | `VITE_API_URL`                   | Optional; backend URL for production build |
| mobile        | `EXPO_PUBLIC_API_URL`            | Backend URL for production |

---

## Deploy backend

**Order:** Push code → Deploy (Render/Railway/Fly) → Add Firebase env.

### Render

1. [render.com](https://render.com) → sign in with GitHub.
2. **New** → **Web Service** → connect repo, branch **main**.
3. **Root Directory:** `backend`. **Build:** `npm install`. **Start:** `node index.js`.
4. **Environment:** Add `FIREBASE_SERVICE_ACCOUNT_JSON` (paste full JSON), optionally `OPENAI_API_KEY`, `ADMIN_SECRET`. Do not set `PORT`.
5. Deploy. URL like `https://menyai-backend.onrender.com`. Use as `EXPO_PUBLIC_API_URL` and admin Backend URL.

### Railway

New Project → Deploy from GitHub → **Root Directory** `backend`. **Variables:** `FIREBASE_SERVICE_ACCOUNT_JSON`, etc. **Settings** → **Networking** → Generate domain.

### Fly.io

```bash
fly auth login
cd backend && fly launch
# No to existing app; no DB
fly secrets set FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'
fly deploy
```

### After deploy

- **Health:** `https://YOUR-URL/health` → `{"status":"ok","service":"menyai-backend","firebase":true|false}`.
- **API:** `GET https://YOUR-URL/api/lessons` → `{ "lessons": [...] }`.
- Set **EXPO_PUBLIC_API_URL** in mobile and Backend URL in admin panel.

---

## API overview

| Endpoint | Auth | Description |
|----------|------|-------------|
| GET /health | — | Health + `firebase` status |
| GET /api/lessons | Bearer (optional) | List lessons |
| GET/POST /api/progress | Bearer | User progress |
| POST /api/auth/reset-pin | — | Forgot PIN (phone + new PIN) |
| /api/admin/* | X-Admin-Key | Stats, lessons CRUD, users, progress |

---

## Admin panel (production)

- **Build:** `cd admin-panel && pnpm build`. Set `VITE_API_URL` for baked-in backend URL or configure in Settings at runtime.
- **Serve from backend:** `pnpm build -- --base=/admin/` then copy `dist/` contents to **backend/public/admin**. Backend serves admin at `http://localhost:4000/admin/`.
