/**
 * Progress tracking API – get/update learner progress.
 * Stored in Firestore per user when configured.
 */
const express = require("express");
const { getDb, verifyIdToken } = require("../config/firebase");

const router = express.Router();

/** Compute badge tier from completed lesson count */
function getBadge(completed) {
  if (completed >= 30) return { key: "champion", label: "Intsinzi 🏆", color: "#A855F7", minLessons: 30 };
  if (completed >= 21) return { key: "diamond", label: "Almasi 💎", color: "#06B6D4", minLessons: 21 };
  if (completed >= 11) return { key: "gold", label: "Zahabu 🥇", color: "#F59E0B", minLessons: 11 };
  if (completed >= 6) return { key: "silver", label: "Ifeza 🥈", color: "#94A3B8", minLessons: 6 };
  if (completed >= 1) return { key: "bronze", label: "Inzibacyuho 🥉", color: "#CD7F32", minLessons: 1 };
  return { key: "none", label: null, color: null, minLessons: 0 };
}

function nextBadge(completed) {
  if (completed >= 30) return null;
  if (completed >= 21) return { label: "Intsinzi 🏆", needsTotal: 30, remaining: 30 - completed };
  if (completed >= 11) return { label: "Almasi 💎", needsTotal: 21, remaining: 21 - completed };
  if (completed >= 6) return { label: "Zahabu 🥇", needsTotal: 11, remaining: 11 - completed };
  if (completed >= 1) return { label: "Ifeza 🥈", needsTotal: 6, remaining: 6 - completed };
  return { label: "Inzibacyuho 🥉", needsTotal: 1, remaining: 1 - completed };
}

router.get("/", async (req, res) => {
  try {
    const decoded = await verifyIdToken(req);
    const uid = decoded?.uid;
    const db = getDb();

    // Get actual total lessons count from Firebase
    let totalLessons = 30; // fallback
    if (db) {
      const lessonsSnap = await db.collection("lessons").get();
      totalLessons = lessonsSnap.size;
    }

    let data = { completedLessons: 0, totalLessons, remainingLessons: totalLessons, streakDays: 0 };

    if (db && uid) {
      const doc = await db.collection("progress").doc(uid).get();
      if (doc.exists) data = { ...data, ...doc.data() };
    }

    const completed = data.completedLessons ?? 0;
    res.json({
      ...data,
      totalLessons,
      remainingLessons: totalLessons - completed,
      badge: getBadge(completed),
      nextBadge: nextBadge(completed),
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/** GET /api/progress/history – per-lesson history for logged-in user */
router.get("/history", async (req, res) => {
  try {
    const decoded = await verifyIdToken(req);
    const uid = decoded?.uid;
    const db = getDb();
    if (!db || !uid) return res.json({ history: [] });

    const snap = await db.collection("progress").doc(uid).collection("history").get();
    const history = snap.docs.map(doc => ({ lessonId: doc.id, ...doc.data() }));
    res.json({ history });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/** POST /api/progress/ – update progress */
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
