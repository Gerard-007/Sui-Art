const { StatusCodes } = require('http-status-codes');
const Property = require('../models/propertyModel');
const User = require('../models/userModel');

const listProperty = async (req, res) => {
    try {
        const { nftId, price, signerKey } = req.body;

        if (!nftId || !price || !signerKey) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'NFT ID, price, and signer key are required' });
        }

        const property = await Property.findOne({ nftId });
        if (!property) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Property not found' });
        }

        const user = await User.findOne({ wallet_address: property.owner });
        if (!user || (!user.is_collector && !user.isVerified)) {
            return res.status(StatusCodes.FORBIDDEN).json({ error: 'User not verified' });
        }

        property.price = price;
        await property.save();

        res.json({ message: 'Property listed successfully', nftId });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Property listing failed', details: error.message });
    }
};

const getMarketplaceListings = async (req, res) => {
    try {
        const listings = await Property.find({ price: { $exists: true } });
        res.json(listings);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch marketplace listings', details: error.message });
    }
};

module.exports = { listProperty, getMarketplaceListings };