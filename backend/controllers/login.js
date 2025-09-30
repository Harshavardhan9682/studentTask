const  admin= require("../models/admin");
const dotenv = require("dotenv");
const students=require("../models/student")
const admissionStaff=require("../models/adminssionStaff")
const teacher=require("../models/teacher")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

dotenv.config();



exports.loginRole = async (req, res) => {
  console.log(req.body);

  try {
    const { email, password, role } = req.body;
    let candidate;

    if (role === "student") {
      candidate = await students.findOne({ email });
    } else if (role === "admin") {
      candidate = await admin.findOne({ email });
    } else if (role === "admissionStaff") {
      candidate = await admissionStaff.findOne({ email });
    } else if (role === "Teacher") {   
      candidate = await teacher.findOne({ email });
    } else {
      return res.status(400).json({ error: "Role does not match" });
    }
    if (!candidate) {
      return res.status(400).json({ error: "Not found" });
    }

    const isMatch = await bcrypt.compare(password, candidate.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: candidate._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    const refreshToken = jwt.sign(
      { id: candidate._id, role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "10m" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      token,
      refreshToken,
      role,  
    });
  } catch (err) {
    console.error(" Login error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

