/**
 * Lesson delivery API – list lessons, get lesson by ID.
 * Data from Firestore when configured, else stub for development.
 */
const express = require("express");
const { getDb, verifyIdToken } = require("../config/firebase");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = getDb();
    if (!db) return res.status(503).json({ error: "Database not configured" });

    const snap = await db.collection("lessons").orderBy("order").get();
    const lessons = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    res.json({ lessons });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const db = getDb();
    if (!db) return res.status(503).json({ error: "Database not configured" });

    const doc = await db.collection("lessons").doc(req.params.id).get();
    if (doc.exists) return res.json({ id: doc.id, ...doc.data() });

    res.status(404).json({ error: "Lesson not found" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
