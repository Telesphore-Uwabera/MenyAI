/**
 * Lesson delivery API – list lessons, get lesson by ID.
 * Data from Firestore when configured, else stub for development.
 */
const express = require("express");
const { getDb, verifyIdToken } = require("../config/firebase");

const router = express.Router();

const STUB_LESSONS = [
  { id: "1", title: "Isomo 1: Amagambo Yibanze", duration: "12 min", level: "1" },
  { id: "2", title: "Isomo 2: Imibare", duration: "15 min", level: "1" },
  { id: "3", title: "Isomo 3: Gusoma Imiti", duration: "10 min", level: "1" },
];

router.get("/", async (req, res) => {
  try {
    const uid = await verifyIdToken(req).then((t) => t?.uid);
    const db = getDb();
    if (db) {
      const snap = await db.collection("lessons").orderBy("order").get();
      const lessons = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      return res.json({ lessons: lessons.length ? lessons : STUB_LESSONS });
    }
    res.json({ lessons: STUB_LESSONS });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const db = getDb();
    if (db) {
      const doc = await db.collection("lessons").doc(req.params.id).get();
      if (doc.exists) return res.json({ id: doc.id, ...doc.data() });
    }
    const stub = STUB_LESSONS.find((l) => l.id === req.params.id) || STUB_LESSONS[0];
    res.json(stub);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
