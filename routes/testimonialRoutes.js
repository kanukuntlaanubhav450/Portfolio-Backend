const express = require('express');
const { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllTestimonials);
router.post('/', verifyToken, createTestimonial);
router.put('/:id', verifyToken, updateTestimonial);
router.delete('/:id', verifyToken, deleteTestimonial);

module.exports = router;
