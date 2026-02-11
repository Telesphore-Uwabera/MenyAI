/**
 * Protects admin routes: require X-Admin-Key to match ADMIN_SECRET,
 * or (mock) accept key "123" when ADMIN_MOCK=1 or when ADMIN_SECRET is not set (dev).
 */
function adminAuth(req, res, next) {
  const secret = process.env.ADMIN_SECRET;
  const mockEnabled = process.env.ADMIN_MOCK === "1" || !secret;
  const key = req.headers["x-admin-key"];
  const validSecret = secret && key === secret;
  const validMock = mockEnabled && key === "123";
  if (!validSecret && !validMock) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

module.exports = { adminAuth };
