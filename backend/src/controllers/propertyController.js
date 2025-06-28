const { StatusCodes } = require('http-status-codes');
const { SuiClient, getFullnodeUrl } = require('@mysten/sui/client');
const { Ed25519Keypair } = require('@mysten/sui/keypairs/ed25519');
const { TransactionBlock } = require('@mysten/sui/transactions');
const { fromB64 } = require('@mysten/bcs');
const Property = require('../models/propertyModel');
const User = require('../models/userModel');

const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

const mintProperty = async (req, res) => {
    try {
        const { name, artist_id, type, creation_date, media, cultural_narrative, signerKey } = req.body;

        if (!name || !artist_id || !type || !creation_date || !media || !cultural_narrative || !signerKey) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'All fields are required' });
        }

        const user = await User.findOne({ wallet_address: artist_id });
        if (!user || (!user.is_collector && !user.isVerified)) {
            return res.status(StatusCodes.FORBIDDEN).json({ error: 'User not verified or not found. Please complete onboarding.' });
        }

        const keypair = Ed25519Keypair.fromSecretKey(fromB64(signerKey));
        const tx = new TransactionBlock();

        tx.moveCall({
        target: `${process.env.PACKAGE_ID}::nft_app::mint`,
        arguments: [
            tx.pure(name),
            tx.pure(artist_id),
            tx.pure(type),
            tx.pure(creation_date),
            tx.pure(media),
            tx.pure(cultural_narrative),
        ],
        });

        const result = await suiClient.signAndExecuteTransactionBlock({
        signer: keypair,
        transactionBlock: tx,
        options: { showEffects: true },
        });

        const property = new Property({
            nftId: result.digest,
            name,
            artist_id,
            type,
            creation_date,
            media,
            cultural_narrative,
            owner: keypair.getPublicKey().toSuiAddress(),
            ipfsHash: media,
        });

        await property.save();

        res.json({
            message: 'Property minted successfully',
            transactionDigest: result.digest,
            nftId: result.digest,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Property minting failed', details: error.message });
    }
};

const getUserProperties = async (req, res) => {
    try {
        const { address } = req.params;

        const properties = await Property.find({ owner: address });
        const ownedObjects = await suiClient.getOwnedObjects({
            owner: address,
            options: { showType: true, showContent: true },
        });

        const artNFTs = ownedObjects.data.filter(obj => obj.data?.type?.includes('nft_app::ArtNFT'));

        res.json({
            offchain: properties,
            onchain: artNFTs,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch properties', details: error.message });
    }
};

module.exports = { mintProperty, getUserProperties };