const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const router=require("./routes/student")
// const registerRouter=require("./routes/register")
const loginRouter=require("./routes/login")
const adminRouter=require("./routes/Admin")
const refreshRouter=require("./routes/refresh")
const teacherRouter=require("./routes/teacher")
const admissionRouter=require("./routes/admissionStaff")
const cors=require("cors")
const cookieParser = require("cookie-parser");
app.use(cookieParser())
app.use(express.json());

const allowedOrigins = [process.env.FE_URL];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,  
}))
app.use("/student",router)
// app.use("/register",registerRouter)
app.use("/login",loginRouter)
app.use("/admin",adminRouter)
app.use("/refresh",refreshRouter)
app.use("/teacher",teacherRouter)
app.use("/admissionStaff",admissionRouter)


const port = process.env.PORT;
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
