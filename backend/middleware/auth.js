const jwt = require("jsonwebtoken");

function StudentAuth(req, res, next) {
  
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1]; 
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization" });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    req.student = decoded.student || decoded;

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
}

module.exports = StudentAuth;
