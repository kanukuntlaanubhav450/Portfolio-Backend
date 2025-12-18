const express = require('express');
const { upload, uploadImage } = require('../controllers/uploadController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, upload.single('image'), uploadImage);

module.exports = router;
