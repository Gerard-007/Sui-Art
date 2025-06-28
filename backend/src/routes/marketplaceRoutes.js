const express = require('express');
const router = express.Router();
const { listProperty, getMarketplaceListings } = require('../controllers/marketplaceController');

router.post('/list', listProperty);
router.get('/', getMarketplaceListings);

module.exports = router;