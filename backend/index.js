/**
 * MenyAI Backend
 * Node.js + Express – lesson delivery, progress tracking, optional AI tutoring.
 * Auth & data: Firebase (Authentication + Firestore).
 */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initFirebase } = require("./config/firebase");
const lessonsRouter = require("./routes/lessons");
const progressRouter = require("./routes/progress");
const aiRouter = require("./routes/ai");

const app = express();
const PORT = process.env.PORT || 4000;

initFirebase();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "menyai-backend" });
});

app.use("/api/lessons", lessonsRouter);
app.use("/api/progress", progressRouter);
app.use("/api/ai", aiRouter);

app.listen(PORT, () => {
  console.log(`MenyAI backend running on http://localhost:${PORT}`);
});
