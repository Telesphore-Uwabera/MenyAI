# Kwiga Rwanda (MenyAI)

Mobile app for the AI-powered literacy platform (Kinyarwanda only). Built with **React Native (Expo)** and **Firebase** for the backend. Uses mock data by default.

## Screens

- **Login** – Phone + PIN, “Injira”
- **Home** – Greeting, “Amasomo” / “Amasomo yose”
- **Lessons** – Level picker, lesson cards (completed / download)
- **Yiga (Learn/[level])** – Lesson list per level
- **Practice (Iyitoze)** – Match word to image
- **Progress** – Progress bar and streak
- **Activities** – Placeholder
- **Account** – Profile

## Setup

From repo root:

```bash
pnpm install
pnpm start
```

Or from the app folder:

```bash
cd mobile
pnpm install
pnpm start
```

Then press **a** (Android) or **i** (iOS), or scan the QR code with Expo Go.

## Project structure

```
mobile/
├── app/              # Expo Router (tabs + stack)
├── components/ui/    # Button, Card, Input
├── data/mock.ts      # Mock data – replace with Firebase when ready
├── lib/firebase.ts   # Firebase config (add keys)
├── theme.ts
└── package.json
```

## Commands

- `pnpm start` or `pnpm mobile` – Start Expo from root
- `pnpm typecheck` – TypeScript check (runs in mobile/)
- `pnpm format.fix` – Prettier

## Mock data

All content comes from **`mobile/data/mock.ts`**. Edit it to change what the app shows. When you connect Firebase, replace with Firestore/Auth.

## Firebase

1. Create a project at [Firebase Console](https://console.firebase.google.com).
2. Add Android/iOS apps and copy the config.
3. Edit **`mobile/lib/firebase.ts`**: uncomment the code and set the `firebaseConfig`.
4. Use Firebase Auth and Firestore instead of `data/mock.ts`.
