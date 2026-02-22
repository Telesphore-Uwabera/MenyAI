const express = require("express");
const { getDb } = require("../config/firebase");

const router = express.Router();

/**
 * GET /api/practice
 * Returns a list of matching/practice exercises.
 */
router.get("/", async (req, res) => {
    try {
        const db = getDb();
        if (!db) return res.status(503).json({ error: "Database not configured" });

        const snap = await db.collection("practice").get();
        const practiceItems = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.json({ practiceItems });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
