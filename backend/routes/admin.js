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
    const { title, duration, level, order, description, difficulty, enabled, type, videoUrl, activities } = req.body || {};
    if (!title || typeof title !== "string") {
      return res.status(400).json({ error: "title required" });
    }
    const data = {
      title: String(title).trim(),
      ...(duration != null && { duration: String(duration) }),
      ...(level != null && { level: String(level) }),
      ...(typeof order === "number" && { order }),
      ...(description != null && { description: String(description) }),
      ...(difficulty != null && { difficulty: String(difficulty) }),
      ...(typeof enabled === "boolean" && { enabled }),
      ...(type != null && { type: String(type) }),
      ...(videoUrl != null && { videoUrl: String(videoUrl) }),
      ...(Array.isArray(activities) && { activities }),
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
    const { title, duration, level, order, description, difficulty, enabled, type, videoUrl, activities } = req.body || {};
    const update = {};
    if (title !== undefined) update.title = String(title).trim();
    if (duration !== undefined) update.duration = String(duration);
    if (level !== undefined) update.level = String(level);
    if (typeof order === "number") update.order = order;
    if (description !== undefined) update.description = String(description);
    if (difficulty !== undefined) update.difficulty = String(difficulty);
    if (typeof enabled === "boolean") update.enabled = enabled;
    if (type !== undefined) update.type = String(type);
    if (videoUrl !== undefined) update.videoUrl = String(videoUrl);
    if (Array.isArray(activities)) update.activities = activities;
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

/** GET /api/admin/users – list Firebase users (paginated), optionally with profiles */
router.get("/users", async (req, res) => {
  try {
    const auth = getAuth();
    if (!auth) return res.status(503).json({ error: "Auth not configured" });
    const db = getDb();
    const nextPageToken = req.query.nextPageToken;
    const sector = req.query.sector;
    const list = await auth.listUsers(100, nextPageToken);
    let users = list.users.map((u) => ({
      uid: u.uid,
      email: u.email,
      displayName: u.displayName || null,
      createdAt: u.metadata.creationTime,
      disabled: !!u.disabled,
    }));
    if (db) {
      const profilesSnap = await db.collection("userProfiles").get();
      const profilesByUid = {};
      profilesSnap.docs.forEach((d) => {
        profilesByUid[d.id] = d.data();
      });
      users = users.map((u) => ({ ...u, profile: profilesByUid[u.uid] || null }));
      if (sector) {
        users = users.filter((u) => u.profile?.sector === sector);
      }
    }
    res.json({ users, nextPageToken: list.pageToken || null });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/** GET /api/admin/users/:uid/profile */
router.get("/users/:uid/profile", async (req, res) => {
  try {
    const db = getDb();
    if (!db) return res.status(503).json({ error: "Database not configured" });
    const doc = await db.collection("userProfiles").doc(req.params.uid).get();
    if (!doc.exists) return res.json({ profile: null });
    res.json({ profile: doc.data() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/** PUT /api/admin/users/:uid/profile */
router.put("/users/:uid/profile", async (req, res) => {
  try {
    const db = getDb();
    if (!db) return res.status(503).json({ error: "Database not configured" });
    const uid = req.params.uid;
    const { name, age, sector, contact, enrollmentDate, literacyScore, active } = req.body || {};
    const update = { updatedAt: new Date().toISOString() };
    if (name !== undefined) update.name = String(name);
    if (age !== undefined) update.age = age === "" ? null : Number(age);
    if (sector !== undefined) update.sector = sector === "" ? null : String(sector);
    if (contact !== undefined) update.contact = contact === "" ? null : String(contact);
    if (enrollmentDate !== undefined) update.enrollmentDate = enrollmentDate === "" ? null : String(enrollmentDate);
    if (literacyScore !== undefined) update.literacyScore = literacyScore === "" ? null : Number(literacyScore);
    if (typeof active === "boolean") update.active = active;
    await db.collection("userProfiles").doc(uid).set(update, { merge: true });
    const doc = await db.collection("userProfiles").doc(uid).get();
    res.json({ profile: doc.exists ? doc.data() : {} });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/** PATCH /api/admin/users/:uid/disable – disable Firebase user */
router.patch("/users/:uid/disable", async (req, res) => {
  try {
    const auth = getAuth();
    if (!auth) return res.status(503).json({ error: "Auth not configured" });
    const { uid } = req.params;
    const { disabled } = req.body || {};
    await auth.updateUser(uid, { disabled: !!disabled });
    res.json({ ok: true, disabled: !!disabled });
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

/** GET /api/admin/analytics – dashboard analytics (active users, lessons done, AI usage) */
router.get("/analytics", async (req, res) => {
  try {
    const db = getDb();
    const auth = getAuth();
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 7);
    const weekStartStr = weekStart.toISOString();

    let totalUsers = 0;
    let activeUsers = 0;
    let totalLessonsCompleted = 0;
    let lessonsCompletedToday = 0;
    let lessonsCompletedThisWeek = 0;
    let totalAIConversations = 0;
    let uniqueAIVisitors = 0;

    if (auth) {
      const list = await auth.listUsers(1000);
      totalUsers = list.users.length;
      activeUsers = list.users.filter((u) => !u.disabled).length;
    }

    if (db) {
      const progressSnap = await db.collection("progress").get();
      const progressList = progressSnap.docs.map((d) => d.data());
      for (const p of progressList) {
        const completed = p.completedLessons ?? 0;
        totalLessonsCompleted += completed;
        const updated = p.updatedAt || "";
        if (updated >= todayStart) lessonsCompletedToday += 1;
        if (updated >= weekStartStr) lessonsCompletedThisWeek += 1;
      }

      const aiSnap = await db.collection("aiChatLogs").get();
      totalAIConversations = aiSnap.size;
      const uids = new Set(aiSnap.docs.map((d) => d.data().uid));
      uniqueAIVisitors = uids.size;
    }

    const aiUsagePercent = totalUsers > 0 ? Math.round((uniqueAIVisitors / totalUsers) * 100) : 0;
    const avgProgressPercent = totalUsers > 0 && totalLessonsCompleted >= 0
      ? Math.min(100, Math.round((totalLessonsCompleted / (totalUsers * 50)) * 100))
      : 0;

    res.json({
      totalUsers,
      activeUsers,
      totalLessonsCompleted,
      lessonsCompletedToday,
      lessonsCompletedThisWeek,
      totalAIConversations,
      uniqueAIVisitors,
      aiUsagePercent,
      avgProgressPercent,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/** GET /api/admin/ai-logs – paginated AI conversation logs */
router.get("/ai-logs", async (req, res) => {
  try {
    const db = getDb();
    if (!db) return res.status(503).json({ error: "Database not configured" });
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 100);
    const afterId = req.query.after;
    let q = db.collection("aiChatLogs").orderBy("createdAt", "desc").limit(limit);
    if (afterId) {
      const afterSnap = await db.collection("aiChatLogs").doc(afterId).get();
      if (afterSnap.exists) q = q.startAfter(afterSnap);
    }
    const snap = await q.get();
    const logs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    res.json({ logs, nextAfter: snap.docs.length === limit ? snap.docs[snap.docs.length - 1].id : null });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/** GET /api/admin/ai-stats – AI usage statistics */
router.get("/ai-stats", async (req, res) => {
  try {
    const db = getDb();
    const auth = getAuth();
    if (!db) return res.status(503).json({ error: "Database not configured" });
    const aiSnap = await db.collection("aiChatLogs").get();
    const logs = aiSnap.docs.map((d) => d.data());
    const totalUsers = auth ? (await auth.listUsers(1000)).users.length : 0;
    const uniqueAIVisitors = new Set(logs.map((l) => l.uid)).size;
    const learnersUsingAI = uniqueAIVisitors;
    const learnersIndependent = Math.max(0, totalUsers - uniqueAIVisitors);
    const totalActivations = logs.length;
    const avgLength = logs.length
      ? Math.round(
        logs.reduce((acc, l) => acc + (String(l.message).length + String(l.reply || "").length), 0) / logs.length
      )
      : 0;
    const byUid = {};
    logs.forEach((l) => {
      byUid[l.uid] = (byUid[l.uid] || 0) + 1;
    });
    const topUsers = Object.entries(byUid)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([uid, count]) => ({ uid, count }));

    res.json({
      learnersUsingAI,
      learnersIndependent,
      totalActivations,
      avgConversationLength: avgLength,
      topUsersByAIActivations: topUsers,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
