const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { generateNonce, verifyZKProof } = require('@mysten/sui/zklogin');
const { Ed25519Keypair } = require('@mysten/sui/keypairs/ed25519');
const { suiClient } = require('../services/suiService');
const User = require('../models/userModel');

// Generate ephemeral keypair once at server start
const ephemeralKeypair = Ed25519Keypair.generate();
const EPHEMERAL_PUBLIC_KEY = ephemeralKeypair.getPublicKey(); // Pass Ed25519PublicKey
const EPHEMERAL_SUI_ADDRESS = EPHEMERAL_PUBLIC_KEY.toSuiAddress();
const BN254_FIELD_MODULUS = BigInt('21888242871839275222246405745257275088696311157297823662689037894645226208583');

const generateNonceHandler = async (req, res) => {
  try {
    const checkpoint = await suiClient.getLatestCheckpointSequenceNumber();
    const currentEpoch = parseInt(checkpoint, 10);
    const MAX_EPOCH = currentEpoch + 10;

    const crypto = require('crypto');
    const randomnessBytes = crypto.randomBytes(32);
    let RANDOMNESS = BigInt(`0x${randomnessBytes.toString('hex')}`);
    RANDOMNESS = RANDOMNESS % BN254_FIELD_MODULUS; // Reduce modulo p

    console.log('Public Key Object:', EPHEMERAL_PUBLIC_KEY);
    console.log('Public Key Bytes:', Buffer.from(EPHEMERAL_PUBLIC_KEY.toRawBytes()).toString('hex'));
    console.log('Randomness:', RANDOMNESS); // Debug reduced randomness
    const nonce = generateNonce(
      EPHEMERAL_PUBLIC_KEY,
      MAX_EPOCH,
      RANDOMNESS
    );
    res.json({ nonce, ephemeralPublicKey: EPHEMERAL_SUI_ADDRESS });
  } catch (error) {
    console.error('Nonce generation error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to generate nonce', details: error.message });
  }
};


const authenticateZKLogin = async (req, res) => {
  try {
    const { zkProof, address } = req.body;
    if (!zkProof || !address) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'zkProof and address are required' });
    }

    const isValid = await verifyZKProof(zkProof, process.env.JWT_ISSUER, process.env.JWT_AUDIENCE);
    if (!isValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid zkLogin proof' });
    }

    let user = await User.findOne({ wallet_address: address });
    if (!user) {
      user = new User({ wallet_address: address, isVerified: false });
      await user.save();
    }

    const token = jwt.sign({ id: user._id, wallet_address: address }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({
      message: 'Authenticated successfully',
      token,
      isVerified: user.isVerified,
      isCollector: user.is_collector,
      redirectToOnboarding: !user.is_collector && !user.isVerified,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Authentication failed', details: error.message });
  }
};

module.exports = { generateNonceHandler, authenticateZKLogin };