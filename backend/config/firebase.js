/**
 * Firebase Admin SDK – used for Firestore and Auth verification.
 * Set GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT_JSON in .env.
 */
const admin = require("firebase-admin");

let db = null;
let auth = null;

function initFirebase() {
  if (admin.apps.length > 0) {
    db = admin.firestore();
    auth = admin.auth();
    return { db, auth };
  }

  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
    : undefined;

  if (!serviceAccount && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.warn("Firebase not configured. Set FIREBASE_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS.");
    return { db: null, auth: null };
  }

  admin.initializeApp(
    serviceAccount
      ? { credential: admin.credential.cert(serviceAccount) }
      : { credential: admin.credential.applicationDefault() }
  );

  db = admin.firestore();
  auth = admin.auth();
  return { db, auth };
}

function getDb() {
  if (!db) initFirebase();
  return db;
}

function getAuth() {
  if (!auth) initFirebase();
  return auth;
}

/** Verify Firebase ID token from Authorization header; returns decoded token or null. */
async function verifyIdToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const idToken = authHeader.split("Bearer ")[1];
  if (!idToken) return null;
  try {
    const a = getAuth();
    if (!a) return null;
    return await a.verifyIdToken(idToken);
  } catch {
    return null;
  }
}

module.exports = { initFirebase, getDb, getAuth, verifyIdToken };
