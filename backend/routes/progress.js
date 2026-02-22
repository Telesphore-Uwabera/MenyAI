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
      completedLessons: 0,
      totalLessons: 45,
      remainingLessons: 45,
      streakDays: 0,
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

/** POST /api/progress/submit – submit lesson/assignment answers and get score */
router.post("/submit", async (req, res) => {
  try {
    const decoded = await verifyIdToken(req);
    const uid = decoded?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    const db = getDb();
    if (!db) return res.status(503).json({ error: "Database not configured" });

    const { lessonId, answers } = req.body || {};
    if (!lessonId || !Array.isArray(answers)) {
      return res.status(400).json({ error: "lessonId and answers required" });
    }

    // Fetch lesson to verify correct answers
    const lessonDoc = await db.collection("lessons").doc(lessonId).get();
    if (!lessonDoc.exists) return res.status(404).json({ error: "Lesson not found" });

    const lessonData = lessonDoc.data();
    const activities = lessonData.activities || [];

    let correctCount = 0;
    const results = answers.map((ans, idx) => {
      const activity = activities[idx];
      if (!activity) return { correct: false };

      let isCorrect = false;
      if (activity.type === "mc" || activity.type === "typing") {
        isCorrect = String(ans).trim().toLowerCase() === String(activity.correctAnswer).trim().toLowerCase();
      } else if (activity.type === "audio") {
        // For audio, we'll auto-grade for now or use a mock logic
        isCorrect = true;
      }

      if (isCorrect) correctCount++;
      return { id: activity.id, correct: isCorrect };
    });

    const total = activities.length || 1;
    const score = Math.round((correctCount / total) * 100);
    const passed = score >= 80;

    // Update user history
    const historyRef = db.collection("progress").doc(uid).collection("history").doc(lessonId);
    await historyRef.set({
      score,
      passed,
      attempts: (await historyRef.get()).data()?.attempts + 1 || 1,
      updatedAt: new Date().toISOString(),
    }, { merge: true });

    // Update overall progress if passed
    if (passed) {
      await db.collection("progress").doc(uid).update({
        completedLessons: (await db.collection("progress").doc(uid).get()).data()?.completedLessons + 1 || 1
      });
    }

    res.json({ score, passed, results });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
