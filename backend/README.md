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
