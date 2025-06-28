const { SuiClient, getFullnodeUrl } = require('@mysten/sui');
const { getZKLoginSignature } = require('@mysten/sui/zklogin');

async function testZKLogin() {
    const client = new SuiClient({ url: getFullnodeUrl('testnet') });
    const response = await fetch('http://localhost:3000/api/auth/nonce');
    const { nonce, ephemeralPublicKey } = await response.json();

    // Simulate OAuth flow (replace with actual Google OAuth token)
    const jwt = 'your_google_jwt'; // Obtain from Google OAuth
    const zkProof = await getZKLoginSignature({
        jwt,
        nonce,
        ephemeralPublicKey,
        maxEpoch: parseInt(await client.getLatestCheckpointSequenceNumber(), 10) + 10,
    });

    const authResponse = await fetch('http://localhost:3000/api/auth/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zkProof, address: 'your_wallet_address' }),
    });
    console.log(await authResponse.json());
}

testZKLogin();