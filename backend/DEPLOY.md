# Deploy MenyAI Backend

**Order: 1. Push code → 2. Deploy Railway → 3. Configure Firebase**

---

## Order of operations

| Step | Action |
|------|--------|
| **1. Push** | Code is already on GitHub (e.g. `Telesphore-Uwabera/MenyAI`). |
| **2. Railway first** | Deploy backend to Railway (Section 3 below). Get the live URL; no Firebase needed yet. |
| **3. Firebase next** | Create Firebase project, get service account JSON, add `FIREBASE_SERVICE_ACCOUNT_JSON` to Railway. |

---

## 1. Prerequisites

- Code pushed to GitHub (e.g. `Telesphore-Uwabera/MenyAI`)
- Node.js 18+ (backend uses `node index.js`)
- (Optional) Firebase project + service account JSON for Auth/Firestore
- (Optional) OpenAI API key for AI chat

---

## 2. Set environment variables

You will set these on the hosting platform (not in the repo).

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Set automatically by Railway/Render/Fly.io |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | No* | Full JSON string of your Firebase service account key |
| `OPENAI_API_KEY` | No | For `/api/ai/chat`; omit to disable AI |
| `OPENAI_MODEL` | No | Default: `gpt-4o-mini` |

\* Without Firebase, the API still runs and returns stub data for lessons and progress.

To get **FIREBASE_SERVICE_ACCOUNT_JSON**:

1. [Firebase Console](https://console.firebase.google.com) → Project → Project settings → Service accounts.
2. Generate new private key → download JSON.
3. Copy the **entire** JSON (one line or minified) and paste as the value of `FIREBASE_SERVICE_ACCOUNT_JSON` on the host. Do not commit this file.

---

## 3. Deploy on Railway (recommended)

1. **Sign up**  
   Go to [railway.app](https://railway.app) and sign in with GitHub.

2. **New project**  
   - Click **New Project**.  
   - Choose **Deploy from GitHub repo**.  
   - Select `Telesphore-Uwabera/MenyAI` (or your repo).  
   - If asked for a branch, pick `main`.

3. **Set root directory**  
   - After the project is created, open your service.  
   - Go to **Settings** → **Root Directory** (or **Source**).  
   - Set to **`backend`** so Railway builds and runs from the `backend` folder.  
   - Save.

4. **Build and start**  
   Railway usually detects Node automatically.  
   - **Build command:** `pnpm install` or `npm install` (default is fine).  
   - **Start command:** `pnpm start` or `node index.js`.  
   - **Watch paths:** leave default or set to `backend` if needed.

5. **Environment variables**  
   - In the service, go to **Variables**.  
   - Add:
     - `FIREBASE_SERVICE_ACCOUNT_JSON` = (paste full JSON string).  
     - `OPENAI_API_KEY` = (your key, if you use AI).  
   - Do **not** set `PORT`; Railway sets it.

6. **Deploy**  
   - Push to `main` or click **Deploy** in Railway.  
   - After deploy, open **Settings** → **Networking** → **Generate domain**.  
   - You get a URL like `https://menyai-backend-production-xxxx.up.railway.app`.

7. **Use in the app**  
   In your Expo app, set:
   ```bash
   EXPO_PUBLIC_API_URL=https://your-app-name.up.railway.app
   ```
   (Use the exact URL Railway gives you.)

---

## 4. Deploy on Render (alternative)

1. Go to [render.com](https://render.com) and sign in with GitHub.

2. **New → Web Service**  
   - Connect repo `Telesphore-Uwabera/MenyAI`.  
   - Branch: `main`.

3. **Configure**  
   - **Root Directory:** `backend`.  
   - **Runtime:** Node.  
   - **Build command:** `npm install` or `pnpm install`.  
   - **Start command:** `node index.js` or `npm start`.

4. **Environment**  
   - **Environment** tab → Add:
     - `FIREBASE_SERVICE_ACCOUNT_JSON`  
     - `OPENAI_API_KEY` (optional).  
   - Render sets `PORT` for you.

5. **Deploy**  
   - Click **Create Web Service**.  
   - Your URL will be like `https://menyai-backend.onrender.com`.

6. **Use in the app**  
   Set `EXPO_PUBLIC_API_URL` to that URL (e.g. `https://menyai-backend.onrender.com`).

---

## 5. Deploy on Fly.io (alternative)

1. Install Fly CLI:  
   [fly.io/docs/hands-on/install-flyctl](https://fly.io/docs/hands-on/install-flyctl)

2. **Login and create app**  
   ```bash
   fly auth login
   cd backend
   fly launch
   ```  
   - When asked “Copy configuration from an existing app?”, choose **No**.  
   - Pick org and app name; do **not** add a Postgres/Redis DB for this backend.  
   - This creates `fly.toml` in `backend/`.

3. **Set secrets (env)**  
   ```bash
   fly secrets set FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'
   fly secrets set OPENAI_API_KEY=sk-...
   ```

4. **Deploy**  
   ```bash
   fly deploy
   ```

5. **URL**  
   Fly gives you something like `https://menyai-backend.fly.dev`. Use that as `EXPO_PUBLIC_API_URL`.

---

## 6. After deployment

1. **Check health**  
   Open in a browser:
   ```text
   https://YOUR-DEPLOYED-URL/health
   ```  
   You should see: `{"status":"ok","service":"menyai-backend"}`.

2. **Test API**  
   ```text
   GET https://YOUR-DEPLOYED-URL/api/lessons
   ```  
   Should return `{ "lessons": [...] }`.

3. **Point the app to production**  
   - In the Expo app (e.g. in EAS or `.env`), set:
     ```bash
     EXPO_PUBLIC_API_URL=https://YOUR-DEPLOYED-URL
     ```
   - Rebuild the app (e.g. `eas build`) so the new URL is baked in.

---

## 7. Quick reference

| Step | Railway | Render | Fly.io |
|------|---------|--------|--------|
| Root dir | `backend` | `backend` | run from `backend/` |
| Start | `node index.js` | `node index.js` | `node index.js` |
| Env vars | Variables tab | Environment tab | `fly secrets set` |
| URL | Generate domain | *.onrender.com | *.fly.dev |

Once this is done, your backend is deployed and the app can use the real API URL via `EXPO_PUBLIC_API_URL`.

---

## 8. Next: Firebase (after Railway is live)

Do this **after** your backend is deployed and `/health` works.

1. **Create a Firebase project**  
   - Go to [Firebase Console](https://console.firebase.google.com).  
   - Add project (e.g. **MenyAI**).  
   - Enable **Authentication** (e.g. Phone, Email).  
   - Create a **Firestore** database (test or production).

2. **Get the service account key**  
   - Firebase Console → Project settings (gear) → **Service accounts**.  
   - Click **Generate new private key** → download the JSON file.  
   - Open the file, copy the **entire** JSON (one line is fine).

3. **Add it to Railway**  
   - Railway → your backend service → **Variables**.  
   - Add variable: **Name** `FIREBASE_SERVICE_ACCOUNT_JSON`, **Value** = paste the full JSON string.  
   - Save; Railway will redeploy.  
   - Do **not** commit this JSON file to Git.

4. **Wire the mobile app (optional)**  
   - In Firebase Console, add an **Android** and/or **iOS** app; copy the config.  
   - In the repo, edit **`mobile/lib/firebase.ts`**: uncomment the code and set `firebaseConfig`.  
   - Users can then sign in; send the Firebase ID token in the `Authorization` header so the backend can use Firestore/Auth.

After this, your backend uses Firestore for lessons/progress and Firebase Auth for protected routes.
