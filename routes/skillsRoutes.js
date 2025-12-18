const express = require('express');
const { getAllSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillsController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllSkills);
router.post('/', verifyToken, createSkill);
router.put('/:id', verifyToken, updateSkill);
router.delete('/:id', verifyToken, deleteSkill);

module.exports = router;
