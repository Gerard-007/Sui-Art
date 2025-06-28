const { SuiClient, getFullnodeUrl } = require('@mysten/sui/client');

const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

module.exports = { suiClient };