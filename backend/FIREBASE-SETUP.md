# Firebase environment setup for Render

Use this guide to get Firebase credentials and add them to your Render service at **https://menyai-nslw.onrender.com**.

---

## 1. Create a Firebase project (if you don’t have one)

1. Go to **[Firebase Console](https://console.firebase.google.com)** and sign in.
2. Click **Add project** (or **Create a project**).
3. Enter a name (e.g. **MenyAI**) → **Continue**.
4. Turn **Google Analytics** on or off → **Create project** → **Continue**.

---

## 2. Enable Authentication and Firestore

### Authentication

1. In the left sidebar, click **Build** → **Authentication**.
2. Click **Get started**.
3. Open the **Sign-in method** tab.
4. Enable the methods you need (e.g. **Email/Password**, **Phone**).
5. Save.

### Firestore

1. In the left sidebar, click **Build** → **Firestore Database**.
2. Click **Create database**.
3. Choose **Start in test mode** (for development) or **Production mode** (with rules).
4. Pick a region (e.g. `europe-west1`) → **Enable**.

---

## 3. Get the service account key (for the backend)

1. In Firebase Console, click the **gear** next to “Project Overview” → **Project settings**.
2. Open the **Service accounts** tab.
3. Click **Generate new private key** → **Generate key**.
4. A JSON file downloads (e.g. `menyai-xxxxx-firebase-adminsdk-xxxxx.json`).
5. **Do not commit this file to Git.** Use it only to copy the value into Render.

---

## 4. Copy the JSON as a single line (for Render)

Render expects **one string** for `FIREBASE_SERVICE_ACCOUNT_JSON`.

**Option A – Manual**

1. Open the downloaded JSON file in a text editor.
2. Remove all line breaks and extra spaces so the whole file is one line.
3. Copy that entire line (it should start with `{"type":"service_account",` and end with `}`).

**Option B – Terminal (PowerShell)**

```powershell
# In the folder where the JSON file was downloaded (replace the filename)
(Get-Content -Raw "menyai-xxxxx-firebase-adminsdk-xxxxx.json") -replace "[\r\n\s]+", " " | Set-Clipboard
```

Then paste from the clipboard into Render.

**Option C – Node one-liner**

```bash
node -e "console.log(JSON.stringify(require('./path-to-your-key.json')))"
```

Copy the output (one line) and use it as the value in Render.

---

## 5. Add the variable to Render

1. Go to **[Render Dashboard](https://dashboard.render.com)**.
2. Open your **menyai** (or backend) **Web Service**.
3. Click **Environment** in the left sidebar.
4. Click **Add Environment Variable**.
5. Set:
   - **Key:** `FIREBASE_SERVICE_ACCOUNT_JSON`
   - **Value:** paste the **entire** JSON string (one line) from step 4.
6. Click **Save Changes**.
7. Render will redeploy. Wait until the deploy finishes.

---

## 6. Verify

1. Open: **https://menyai-nslw.onrender.com/health**  
   You should see: `{"status":"ok","service":"menyai-backend"}`.

2. Open: **https://menyai-nslw.onrender.com/api/lessons**  
   If Firestore has a `lessons` collection, the API will use it; otherwise you still get stub data.

3. In the Render **Logs** tab you should **not** see “Firebase not configured” after redeploy. If you do, the JSON value is missing or invalid (check for truncated paste or extra quotes).

---

## 7. Optional: use the same project in the mobile app

1. In Firebase Console, click the **gear** → **Project settings** → **General**.
2. Under “Your apps”, click **Add app** → **Android** and/or **iOS**.
3. Follow the steps (package name, SHA-1 if needed); download `google-services.json` / `GoogleService-Info.plist` if you use them.
4. Copy the **firebaseConfig** object (apiKey, authDomain, projectId, etc.).
5. In the repo, open **`mobile/lib/firebase.ts`**, uncomment the config block, and set:

   ```ts
   const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "...",
   };
   ```

6. When users sign in with Firebase Auth in the app, send the **ID token** in the `Authorization: Bearer <token>` header so your backend can verify them and read/write Firestore per user.

---

## Quick checklist

| Step | Action |
|------|--------|
| 1 | Create Firebase project at console.firebase.google.com |
| 2 | Enable Authentication and Firestore |
| 3 | Project settings → Service accounts → Generate new private key → download JSON |
| 4 | Turn JSON into one line and copy it |
| 5 | Render → your service → Environment → Add `FIREBASE_SERVICE_ACCOUNT_JSON` → paste → Save |
| 6 | Check https://menyai-nslw.onrender.com/health and /api/lessons |

After this, your backend at **https://menyai-nslw.onrender.com** uses Firebase (Auth + Firestore) for real data when you wire it in code.
