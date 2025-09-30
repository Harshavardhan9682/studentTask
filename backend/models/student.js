const { timeStamp } = require('console');
const { required } = require('joi');
const mongoose = require('mongoose');
const { type } = require('os');
const newStudent = new mongoose.Schema({
  
  studentName: { type: String, required: true },
  password:{ type: String,required:true },
  email: { type: String, required: true, unique: true },
  studentClass: { type: String, required: true },
  role:{type:String,required:true},
  age: { type: Number ,required:true},
  rawpassword:{type:String},
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  phone: { type: String,required:true },
  dateOfJoining: { type: Date, default: Date.now },
  dob: { type: Date ,required:true },
    fees: {
    tuition: { type: Number, default: 0 },
    transport: { type: Number, default: 0 },
    lab: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  guardian: { type: String ,required:true},

},{timeStamp:true});

const newStudents = mongoose.model("alStudent", newStudent);
module.exports = newStudents;