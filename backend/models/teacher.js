const { required } = require('joi');
const mongoose = require('mongoose');
const newTeacher= new mongoose.Schema({
  teacherName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number ,required:true},
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  phone: { type: String,required:true },
  dob: { type: Date ,required:true },
  role:{type:String,required:true},
  rawpassword:{type:String},
  Status:{type:String,required:true,enum:["active","inactive"]},
  subject:{type:String,required:true},
  empId:{type:String,required:true},
 
},{timestamps:true});

const newTeachers = mongoose.model("alTeacher", newTeacher);
module.exports = newTeachers;