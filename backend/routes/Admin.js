const express = require('express');
const router = express.Router();


const controllers=require('../controllers/admin');


router.post('/', controllers.adminRegisters);
// router.post('/login', controllers.loginRole);



module.exports = router;
