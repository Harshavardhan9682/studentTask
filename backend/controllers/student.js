const studentData = require("../models/student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv=require("dotenv")
dotenv.config()
exports.createStudent = async (req, res) => {

    console.log(req.body)
    function generatePassword(length = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}


function calculateFeesForClass(studentClass) {
  console.log(studentClass)
    let tuition = 8000;
    if (studentClass === 2) tuition = 10000;
    else if (studentClass === 3) tuition = 12000;
    else if (studentClass === 4) tuition = 13000;
    else if (studentClass === 5 || studentClass === 6) tuition = 16000;
    else if (studentClass === 7 || studentClass === 8) tuition = 18000;
    else if (studentClass === 9 || studentClass === 10) tuition = 19000;
    else if (studentClass === 1) tuition = 9000;

    let lab = [8, 9, 10].includes(studentClass) ? 3000 : 0;
    let transport = 2000;
    let total = tuition + lab + transport;

    return { tuition, transport, lab, total };
}

  
 const rawPassword = generatePassword(10);

    
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const { studentName, dob,email,studentClass,age,phone,gender,guardian } = req.body;
    
    // const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const addStudent={
          
          password:hashedPassword,
             studentName,
             rawPassword, 
             role:"student",
             email,
             studentClass,
             age,
             dob,
             phone,
             gender,
             guardian

        }
        const fees = calculateFeesForClass(Number(addStudent.studentClass));
        addStudent.fees = fees;
        const newStudent = new studentData(addStudent);
        const savedStudent = await newStudent.save();
        res.status(201).json({ message: "create successfully", student: savedStudent });
        
    } catch (err) {

        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

exports.gettingData = async (req, res) => {
  try {
    const { query = "", page = 1, limit = 10 } = req.query;
    console.log("Search query:", query);

    
    const querys = query ? { studentName: { $regex: query, $options: "i" } } : {};

    const students = await studentData
      .find(querys)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
console.log(students)
    const total = await studentData.countDocuments(query);

    res.json({
      students,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.gettingDataDate=async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    console.log(req.query)

    if (!fromDate || !toDate) {
      return res.status(400).json({ message: "fromDate and toDate are required" });
    }

    
    const students = await studentData.find({
  dateOfJoining: {
    $gte: new Date(fromDate),
    $lte: new Date(toDate),
  },
});
    
console.log(students)
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


exports.updateStudent=async(req,res)=>{


    const {id}=req.params;
    const updateData=req.body
    console.log(req.body,id)
    try{
        const updatedStudent=await studentData.findByIdAndUpdate(id,updateData,{new:true})
    if(!updatedStudent){
        return res.status(404).json({message:"Student not found"})
    }
    res.status(200).json({message:"updated successfully ",updatedData:updatedStudent})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

exports.deleteStudent=async(req,res)=>{
     const {id}=req.params;
      try{
        const deleteStudent=await studentData.findByIdAndDelete(id)
        console.log(deleteStudent)
    if(!deleteStudent){
        return res.status(404).json({message:"Student not found"})
    }
    res.status(200).json({message:"delete successfully ",deleteData:deleteStudent})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

///fee
exports.feeManagement=async (req, res) => {
  try {
    const { id } = req.params;
    const { tuition = 0, transport = 0, lab = 0 } = req.body;

    const total = tuition + transport + lab;

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { fees: { tuition, transport, lab, total } },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: "Failed to update fees" });
  }
}
