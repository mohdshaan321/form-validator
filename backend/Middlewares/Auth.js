const jwt = require("jsonwebtoken");

const JWT_SECRET = "secret-123"; // Ideally use process.env.JWT_SECRET

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Unauthorized: JWT token is required",
    });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: Malformed token",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.decoded = decoded;

    console.log("✅ Token decoded:", decoded);
    next();
  } catch (err) {

    console.error("❌ JWT verification failed:", err);
    return res.status(401).json({
      message: "Unauthorized: JWT token is wrong or expired",
      err,
    });
  }
};

module.exports = ensureAuthenticated;
