const { StatusCodes } = require('http-status-codes');
const User = require('../models/userModel');
const { Web3Storage } = require('web3.storage');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });
const web3Storage = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });


const uploadOnboarding = async (req, res) => {
    try {
        const { address } = req.body;
        const logo = req.files.logo ? req.files.logo[0] : null;
        const trademark = req.files.trademark ? req.files.trademark[0] : null;

        if (!address || (!logo && !trademark)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Address and at least one file (logo or trademark) are required' });
        }

        const user = await User.findOne({ wallet_address: address });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
        }

        if (user.is_collector) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Collectors do not require onboarding uploads' });
        }

        let logoHash, trademarkHash;
        if (logo) {
            const logoFile = new File([logo.buffer], logo.originalname, { type: logo.mimetype });
            const cid = await web3Storage.put([logoFile]);
            logoHash = `ipfs://${cid}/${logo.originalname}`;
        }
        if (trademark) {
            const trademarkFile = new File([trademark.buffer], trademark.originalname, { type: trademark.mimetype });
            const cid = await web3Storage.put([trademarkFile]);
            trademarkHash = `ipfs://${cid}/${trademark.originalname}`;
        }

        user.logoHash = logoHash || user.logoHash;
        user.trademarkHash = trademarkHash || user.trademarkHash;
        user.isVerified = true; // In production, set to false until admin verifies
        await user.save();

        res.json({
            message: 'Onboarding completed successfully',
            logoHash,
            trademarkHash,
            isVerified: user.isVerified,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Upload failed', details: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, country, state, street, address } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
        }

        user.first_name = first_name || user.first_name;
        user.last_name = last_name || user.last_name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.country = country || user.country;
        user.state = state || user.state;
        user.street = street || user.street;
        user.address = address || user.address;

        await user.save();

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Profile update failed', details: error.message });
    }
};

module.exports = { uploadOnboarding, updateUserProfile };