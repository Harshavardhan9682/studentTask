
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config()



exports.refreshToken =(req, res) => {
  console.log(req.body)
  const refreshToken = req.cookies.refreshToken;
  console.log("token received")
  if (!refreshToken) return res.status(401).json({ error: "No refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    res.json({ token: newAccessToken });
  } catch (err) {
    return res.status(401).json({ error: "Invalid refresh token" });
  }
}
