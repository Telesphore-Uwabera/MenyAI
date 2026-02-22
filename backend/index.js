/**
 * MenyAI Backend
 * Node.js + Express – lesson delivery, progress tracking, optional AI tutoring.
 * Auth & data: Firebase (Authentication + Firestore).
 */
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const { initFirebase, getDb, getAuth } = require("./config/firebase");
const lessonsRouter = require("./routes/lessons");
const progressRouter = require("./routes/progress");
const practiceRouter = require("./routes/practice"); // Add this
const aiRouter = require("./routes/ai");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 4000;

initFirebase();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/health", (req, res) => {
  const firebaseOk = !!(getDb() && getAuth());
  res.json({
    status: "ok",
    service: "menyai-backend",
    firebase: firebaseOk,
  });
});

app.use("/api/lessons", lessonsRouter);
app.use("/api/progress", progressRouter);
app.use("/api/practice", practiceRouter);
app.use("/api/ai", aiRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);

/* Serve admin panel build when present (optional integration) */
const adminDir = path.join(__dirname, "public", "admin");
if (fs.existsSync(adminDir)) {
  app.get("/admin", (req, res) => res.redirect(301, "/admin/"));
  app.use("/admin/", express.static(adminDir));
  app.get("/admin/*", (req, res) => {
    res.sendFile(path.join(adminDir, "index.html"));
  });
}

app.listen(PORT, () => {
  const firebaseOk = !!(getDb() && getAuth());
  console.log(`MenyAI backend running on http://localhost:${PORT}`);
  if (!firebaseOk) {
    console.warn("Firebase not ready – admin/mobile data endpoints will return 503. Check backend/.env (FIREBASE_SERVICE_ACCOUNT_JSON).");
  }
});
