const express = require('express');
const { getAllServices, createService, updateService, deleteService } = require('../controllers/serviceController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllServices);
router.post('/', verifyToken, createService);
router.put('/:id', verifyToken, updateService);
router.delete('/:id', verifyToken, deleteService);

module.exports = router;
