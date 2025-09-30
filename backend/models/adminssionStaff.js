const { required } = require('joi');
const mongoose = require('mongoose');
const newStudent = new mongoose.Schema({
  teacherName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number ,required:true},
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  phone: { type: String,required:true },
  dob: { type: Date ,required:true },
  Status:{type:String,required:true,enum:["active","inactive"]},
  role:{type:String,required:true},
  empId:{type:String,required:true},
 
},{timestamps:true});

const newStudents = mongoose.model("aladminStaff", newStudent);
module.exports = newStudents;