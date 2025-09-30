const teacherData = require("../models/teacher");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
exports.createTeacher = async (req, res) => {
  console.log(req.body);

  function generatePassword(length = 8) {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  const rawPassword = generatePassword(10);

  const hashedPassword = await bcrypt.hash(rawPassword, 10);
  const {
    teacherName,
    email,
    age,
    phone,
    gender,
    dob,
    Status,
    subject,
    empId,
    role,
  } = req.body;

  try {
    const addTeacher = {
      teacherName,
      dob,
      Status,
      subject,
      empId,
      rawPassword,
      password: hashedPassword,
      role,
      email,
      age,
      phone,
      gender,
    };

    const newTeacher = new teacherData(addTeacher);
    const savedTeacher = await newTeacher.save();
    res
      .status(201)
      .json({ message: "create successfully", teacher: savedTeacher });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.gettingData = async (req, res) => {
  try {
    const { query = "", page = 1, limit = 10 } = req.query;
    console.log("Search query:", query);

    const querys = query
      ? { teacherName: { $regex: query, $options: "i" } }
      : {};

    const teachers = await teacherData
      .find(querys)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await teacherData.countDocuments(query);

    res.json({
      teachers,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateTeacher = async (req, res) => {
  console.log("updating data")
  const { id } = req.params;

  const updateData = req.body;
  console.log(req.body, id);
  try {
    const updatedTeacher = await teacherData.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedTeacher) {
      return res.status(404).json({ message: "teacher not found" });
    }
    res
      .status(200)
      .json({ message: "updated successfully ", updatedData: updatedTeacher });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    const deleteTeacher = await teacherData.findByIdAndDelete(id);
    console.log(deleteTeacher);
    if (!deleteTeacher) {
      return res.status(404).json({ message: "teacher not found" });
    }
    res
      .status(200)
      .json({ message: "delete successfully ", deleteData: deleteTeacher });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
