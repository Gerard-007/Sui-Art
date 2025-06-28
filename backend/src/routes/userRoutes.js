const express = require('express');
const router = express.Router();
const { uploadOnboarding, updateUserProfile } = require('../controllers/userController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload-onboarding', upload.fields([{ name: 'logo' }, { name: 'trademark' }]), uploadOnboarding);
router.put('/profile', updateUserProfile);

module.exports = router;