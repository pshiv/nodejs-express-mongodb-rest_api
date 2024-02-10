const express = require('express');
const userRoute = require('../controllers/user.controller');

const Upload = require('../config/multer.config');

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware")

router.post('/creatProfile',verifyToken, Upload.array('avatar', 5), userRoute.createProfile);


module.exports = router