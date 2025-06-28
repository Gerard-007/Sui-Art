const express = require('express');
const router = express.Router();
const { mintProperty, getUserProperties } = require('../controllers/propertyController');

router.post('/mint', mintProperty);
router.get('/user/:address', getUserProperties);

module.exports = router;