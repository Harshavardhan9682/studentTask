const express = require('express');
const router = express.Router();
const controller=require("../controllers/teacher")


router.post("/",controller.createTeacher)
// router.post("/login",controller.loginRole)
router.get("/",controller.gettingData)
router.put("/:id",controller.updateTeacher)

router.delete("/:id",controller.deleteTeacher)


module.exports = router;