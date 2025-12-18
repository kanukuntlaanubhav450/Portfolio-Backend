const express = require('express');
const { getAbout, updateAbout } = require('../controllers/aboutController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAbout);
router.put('/', verifyToken, updateAbout); // Simplify: PUT updates the singleton

module.exports = router;
