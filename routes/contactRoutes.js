const express = require('express');
const { sendMessage, getAllMessages } = require('../controllers/contactController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', sendMessage);
router.get('/', verifyToken, getAllMessages); // Only Admin see messages
router.put('/:id/read', verifyToken, require('../controllers/contactController').markAsRead);

module.exports = router;
