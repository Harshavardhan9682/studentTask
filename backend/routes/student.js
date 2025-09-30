const express = require('express');
const router = express.Router();
const {createStudent,gettingData,updateStudent,deleteStudent,feeManagement,gettingDataDate}=require("../controllers/student")
const auth=require("../middleware/auth")

router.post("/",createStudent)
// router.post("/login",controller.loginRole)
router.get("/",gettingData)
router.get("/date",gettingDataDate)
router.put("/:id",updateStudent)
router.delete("/:id",auth,deleteStudent)
router.put("/:id/fee",feeManagement)


module.exports = router;