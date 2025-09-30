const express = require('express');
const router = express.Router();


const controllers=require('../controllers/refresh');


router.post('/', controllers.refreshToken);

module.exports = router;
