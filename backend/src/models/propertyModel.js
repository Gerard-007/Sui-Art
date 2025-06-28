const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    nftId: String,
    name: String,
    artist_id: String,
    type: String,
    creation_date: Number,
    media: String,
    cultural_narrative: String,
    owner: String,
    ipfsHash: String,
    logoHash: String,
    trademarkHash: String,
    price: { type: Number, default: null },
});

module.exports = mongoose.model('Property', propertySchema);