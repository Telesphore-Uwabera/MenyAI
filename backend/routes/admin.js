/**
 * Admin API – lessons CRUD, list users, aggregate progress.
 * Protected by X-Admin-Key header (ADMIN_SECRET env).
 */
const express = require("express");
const { getDb, getAuth } = require("../config/firebase");
const { adminAuth } = require("../middleware/adminAuth");

const router = express.Router();
router.use(adminAuth);

/** GET /api/admin/stats – dashboard counts */
router.get("/stats", async (req, res) => {
  try {
    const db = getDb();
    const auth = getAuth();
    let totalLessons = 0;
    let totalUsers = 0;
    let totalProgressDocs = 0;
    if (db) {
      const [lessonsSnap, progressSnap] = await Promise.all([
        db.collection("lessons").get(),
        db.collection("progress").get(),
      ]);
      totalLessons = lessonsSnap.size;
      totalProgressDocs = progressSnap.size;
    }
    if (auth) {
      const list = await auth.listUsers(1000);
      totalUsers = list.users.length;
    }
    res.json({
      totalLessons,
      totalUsers,
      totalProgressDocs,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/** GET /api/admin/lessons – list all lessons */
router.get("/lessons", async (req, res) => {
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

/** POST /api/admin/lessons – create lesson */
router.post("/lessons", async (req, res) => {
  try {
    const db = getDb();
    if (!db) return res.status(503).json({ error: "Database not configured" });
    const { title, duration, level, order, description } = req.body || {};
    if (!title || typeof title !== "string") {
      return res.status(400).json({ error: "title required" });
    }
    const data = {
      title: String(title).trim(),
      ...(duration != null && { duration: String(duration) }),
      ...(level != null && { level: String(level) }),
      ...(typeof order === "number" && { order }),
      ...(description != null && { description: String(description) }),
      createdAt: new Date().toISOString(),
    };
    const ref = await db.collection("lessons").add(data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/** PUT /api/admin/lessons/:id – update lesson */
router.put("/lessons/:id", async (req, res) => {
  try {
    const db = getDb();
    if (!db) return res.status(503).json({ error: "Database not configured" });
    const { id } = req.params;
    const { title, duration, level, order, description } = req.body || {};
    const update = {};
    if (title !== undefined) update.title = String(title).trim();
    if (duration !== undefined) update.duration = String(duration);
    if (level !== undefined) update.level = String(level);
    if (typeof order === "number") update.order = order;
    if (description !== undefined) update.description = String(description);
    update.updatedAt = new Date().toISOString();
    await db.collection("lessons").doc(id).set(update, { merge: true });
    const doc = await db.collection("lessons").doc(id).get();
    if (!doc.exists) return res.status(404).json({ error: "Not found" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/** DELETE /api/admin/lessons/:id */
router.delete("/lessons/:id", async (req, res) => {
  try {
    const db = getDb();
    if (!db) return res.status(503).json({ error: "Database not configured" });
    await db.collection("lessons").doc(req.params.id).delete();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/** GET /api/admin/users – list Firebase users (paginated) */
router.get("/users", async (req, res) => {
  try {
    const auth = getAuth();
    if (!auth) return res.status(503).json({ error: "Auth not configured" });
    const nextPageToken = req.query.nextPageToken;
    const list = await auth.listUsers(100, nextPageToken);
    const users = list.users.map((u) => ({
      uid: u.uid,
      email: u.email,
      displayName: u.displayName || null,
      createdAt: u.metadata.creationTime,
    }));
    res.json({ users, nextPageToken: list.pageToken || null });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/** GET /api/admin/progress – list all progress docs from Firestore */
router.get("/progress", async (req, res) => {
  try {
    const db = getDb();
    if (!db) return res.status(503).json({ error: "Database not configured" });
    const snap = await db.collection("progress").limit(200).get();
    const progress = snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
    res.json({ progress });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
