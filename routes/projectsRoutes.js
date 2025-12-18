const express = require('express');
const { getAllProjects, createProject, updateProject, deleteProject } = require('../controllers/projectsController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.get('/', getAllProjects);

// Protected Routes (CMS only)
router.post('/', verifyToken, createProject);
router.put('/:id', verifyToken, updateProject);
router.delete('/:id', verifyToken, deleteProject);

module.exports = router;
