/**
 * Progress tracking API – get/update learner progress.
 * Stored in Firestore per user when configured.
 */
const express = require("express");
const { getDb, verifyIdToken } = require("../config/firebase");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const decoded = await verifyIdToken(req);
    const uid = decoded?.uid;
    const db = getDb();
    if (db && uid) {
      const doc = await db.collection("progress").doc(uid).get();
      if (doc.exists) return res.json(doc.data());
    }
    res.json({
      completedLessons: 12,
      totalLessons: 50,
      remainingLessons: 38,
      streakDays: 5,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const decoded = await verifyIdToken(req);
    const uid = decoded?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });
    const db = getDb();
    if (!db) return res.status(503).json({ error: "Database not configured" });
    const { completedLessons, streakDays } = req.body || {};
    const data = {
      updatedAt: new Date().toISOString(),
      ...(typeof completedLessons === "number" && { completedLessons }),
      ...(typeof streakDays === "number" && { streakDays }),
    };
    await db.collection("progress").doc(uid).set(data, { merge: true });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
