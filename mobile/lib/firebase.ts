/**
 * Firebase configuration and helpers.
 * Add your Firebase project config from the Firebase console, then uncomment and use.
 *
 * 1. Create a project at https://console.firebase.google.com
 * 2. Add Android/iOS apps and get the config
 * 3. Install: pnpm add firebase
 * 4. Replace the placeholder below with initializeApp(firebaseConfig)
 * 5. Use Firestore, Auth, etc. instead of mock data in data/mock.ts
 */

// import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT.appspot.com",
//   messagingSenderId: "YOUR_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

// let app: FirebaseApp | undefined;

// export function getFirebaseApp(): FirebaseApp {
//   if (!app) {
//     app = getApps().length ? getApps()[0] as FirebaseApp : initializeApp(firebaseConfig);
//   }
//   return app;
// }

// export const auth = () => getAuth(getFirebaseApp());
// export const db = () => getFirestore(getFirebaseApp());

export const firebaseReady = false;
