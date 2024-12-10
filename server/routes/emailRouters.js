const express = require('express');
const { sendEmail } = require('../controllers/EmailController');

const router = express.Router();

// Định nghĩa route cho API gửi email
router.post('/send-email', sendEmail);

// Xuất router để sử dụng trong server.js
module.exports = router;