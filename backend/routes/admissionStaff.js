const express = require('express');
const router = express.Router();


const controllers=require('../controllers/admissionStaff');


router.post('/', controllers.createAdmissionStaff)
router.get("/",controllers.gettingData)
router.put("/:id",controllers.updateAdmissionStaff)
router.delete("/:id",controllers.deleteAdmissionStaff)

module.exports = router;
