const adminRole=require("../models/admin")
const bcrypt = require("bcrypt");
const dotenv=require("dotenv")
dotenv.config()
exports.
adminRegisters = async (req, res) => {

    console.log(req.body)
    const { fullName, email,password,role,phoneNumber,Status } = req.body;
     const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const AdminRegisters={
             fullName, 
             email,
           password:hashedPassword,
           role,
           phoneNumber,
           Status,

        }
       
        const newStudent = new adminRole(AdminRegisters);
        const savedStudent = await newStudent.save();
        res.status(201).json({ message: "registered successfully", student: savedStudent });
        
    } catch (err) {

        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}



exports.updateAdmin=async(req,res)=>{


    const {id}=req.params;

  
  // const { error } = studentValidationSchema.validate(req.body, { abortEarly: false });
  // if (error) {
  //   return res.status(400).json({
  //     message: "Validation failed",
  //     errors: error.details.map((err) => err.message),
  //   });
  // }
    const updateData=req.body
    console.log(req.body,id)
    try{
        const updateAdmin=await adminRole.findByIdAndUpdate(id,updateData,{new:true})
    if(!updateAdmin){
        return res.status(404).json({message:"Student not found"})
    }
    res.status(200).json({message:"updated successfully ",updatedData:updateAdmin})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

exports.deleteAdmin=async(req,res)=>{
     const {id}=req.params;
      try{
        const deleteAdmin=await adminRole.findByIdAndDelete(id)
        console.log(deleteAdmin)
    if(!deleteAdmin){
        return res.status(404).json({message:"Student not found"})
    }
    res.status(200).json({message:"delete successfully ",deleteData:deleteAdmin})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

