/**
 * Firebase configuration and helpers.
 * Config from google-services.json (Android) / GoogleService-Info.plist (iOS).
 */

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCybgVvn-UjlYPItthJhbWlxZKU0znUpm4",
  authDomain: "menyai-27cfc.firebaseapp.com",
  projectId: "menyai-27cfc",
  storageBucket: "menyai-27cfc.firebasestorage.app",
  messagingSenderId: "973511634165",
  appId: "1:973511634165:android:1fce7b24de7995550569bc",
};

let app: FirebaseApp | undefined;

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = getApps().length ? (getApps()[0] as FirebaseApp) : initializeApp(firebaseConfig);
  }
  return app;
}

export const auth = () => getAuth(getFirebaseApp());
export const db = () => getFirestore(getFirebaseApp());

export const firebaseReady = true;
