const express = require('express');
const { getAllExperience, createExperience, updateExperience, deleteExperience } = require('../controllers/experienceController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllExperience);
router.post('/', verifyToken, createExperience);
router.put('/:id', verifyToken, updateExperience);
router.delete('/:id', verifyToken, deleteExperience);

module.exports = router;
