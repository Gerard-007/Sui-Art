const express = require('express');
const router = express.Router();
const { generateNonceHandler, authenticateZKLogin } = require('../controllers/authController');

router.get('/nonce', generateNonceHandler);
router.post('/auth', authenticateZKLogin);

module.exports = router;