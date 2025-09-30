
const mongoose = require('mongoose');
const adminRegister = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
password:{type:String,required:true},
role:{type:String,required:true},
phoneNumber:{type:String ,required:true},
Status:{type:String,required:true,enum:["active","inactive"]}

},{timestamps:true});

const adminRole= mongoose.model("alAdminRegisters", adminRegister);
module.exports = adminRole;   