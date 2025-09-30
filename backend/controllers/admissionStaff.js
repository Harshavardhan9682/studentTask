const admissionStaff = require("../models/adminssionStaff");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();
exports.createAdmissionStaff = async (req, res) => {
  console.log(req.body);


  function generatePassword(length = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}
 const rawPassword = generatePassword(10);

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(rawPassword, 10);


  const {
    teacherName,
    email,
    age,
    gender,
    phone,
    dob,
    Status,
    empId,
    role,
  } = req.body;

 
  try {
    const addAdmission = {
      teacherName,
      password: hashedPassword,
      dob,
      Status,
      empId,
      role,
      email,
      age,
      phone,
      gender,
    };

    const newAdmission = new admissionStaff(addAdmission);
    const savedAdminStaff = await newAdmission.save();
    res
      .status(201)
      .json({ message: "create successfully", AdminStaff: savedAdminStaff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.gettingData = async (req, res) => {
  console.log("getting is working  ");

  try {
    const { query = "", page = 1, limit = 10 } = req.query;
    console.log("Search query:", query);

    const querys = query
      ? { teacherName: { $regex: query, $options: "i" } }
      : {};

    const AdmissionStaff = await admissionStaff
      .find(querys)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await admissionStaff.countDocuments(query);

    res.json({
      AdmissionStaff,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateAdmissionStaff = async (req, res) => {
  const { id } = req.params;


  const updateData = req.body;
  console.log(req.body, id);
  try {
    const updatedAdmissionStaff = await admissionStaff.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    if (!updatedAdmissionStaff) {
      return res.status(404).json({ message: "AdmissionStaff not found" });
    }
    res
      .status(200)
      .json({
        message: "updated successfully ",
        updatedData: updatedAdmissionStaff,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAdmissionStaff = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteAdmissionStaff = await studentData.findByIdAndDelete(id);
    console.log(deleteAdmissionStaff);
    if (!deleteAdmissionStaff) {
      return res.status(404).json({ message: "Student not found" });
    }
    res
      .status(200)
      .json({
        message: "delete successfully ",
        deleteData: deleteAdmissionStaff,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
