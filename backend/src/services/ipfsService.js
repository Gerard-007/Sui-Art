const { Web3Storage } = require('web3.storage');

const web3Storage = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });

const uploadToIPFS = async (file) => {
    const fileInstance = new File([file.buffer], file.originalname, { type: file.mimetype });
    const cid = await web3Storage.put([fileInstance]);
    return `ipfs://${cid}/${file.originalname}`;
};

module.exports = { uploadToIPFS };