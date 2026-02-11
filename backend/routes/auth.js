/**
 * Auth helpers: reset PIN (forgot password).
 * Phone is stored as email: 250XXXXXXXXX@menyai.local
 */
const express = require("express");
const { getAuth } = require("../config/firebase");

const router = express.Router();

function phoneToEmail(phone) {
  const digits = String(phone).replace(/\D/g, "").replace(/^0/, "");
  const normalized = digits.startsWith("250") ? digits : "250" + digits;
  return normalized + "@menyai.local";
}

/**
 * POST /api/auth/reset-pin
 * Body: { phone: string, newPin: string }
 * newPin must be at least 6 characters (Firebase requirement).
 */
router.post("/reset-pin", async (req, res) => {
  const { phone, newPin } = req.body || {};
  if (!phone || typeof newPin !== "string") {
    return res.status(400).json({
      ok: false,
      message: "Shyiramo nimero ya telefoni na PIN nshya.",
    });
  }
  const pin = newPin.trim();
  if (pin.length < 6) {
    return res.status(400).json({
      ok: false,
      message: "PIN nshya: imibare 6 (6 digits).",
    });
  }

  const auth = getAuth();
  if (!auth) {
    return res.status(503).json({
      ok: false,
      message: "Serivisi ntabwo ishoboye. Gerageza nyuma.",
    });
  }

  const email = phoneToEmail(phone);
  try {
    const userRecord = await auth.getUserByEmail(email);
    await auth.updateUser(userRecord.uid, { password: pin });
    return res.json({
      ok: true,
      message: "PIN nshya yashyizwe. Injira ubu.",
    });
  } catch (e) {
    if (e.code === "auth/user-not-found") {
      return res.status(404).json({
        ok: false,
        message: "Nimero ya telefoni ntabwo yanditse. Gerageza cyangwa kwiyandikisha.",
      });
    }
    return res.status(500).json({
      ok: false,
      message: "Byabuze. Gerageza nyuma.",
    });
  }
});

module.exports = router;
