'use client';

import { createContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519PublicKey } from '@mysten/sui/keypairs/ed25519';

interface WalletState {
    isConnected: boolean;
    walletAddress: string;
    jwt: string;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
}

export const WalletContext = createContext<WalletState>({
    isConnected: false,
    walletAddress: '',
    jwt: '',
    connectWallet: async () => {},
    disconnectWallet: () => {},
});

export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [jwt, setJwt] = useState('');

    const client = new SuiClient({ url: getFullnodeUrl('testnet') });

    const connectWallet = async () => {
        try {
            // Step 1: Fetch nonce and ephemeral public key
            const response = await axios.get('http://localhost:9000/api/auth/nonce');
            const { nonce, ephemeralPublicKey } = response.data;

            // Step 2: Initiate Google OAuth
            const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
            if (!clientId) throw new Error('Google Client ID not set');
            const redirectUri = 'http://localhost:3000/auth/callback';
            const state = encodeURIComponent(JSON.stringify({ nonce, ephemeralPublicKey }));
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=openid%20email%20profile&state=${state}`;

            window.location.href = authUrl;
        } catch (error) {
            console.error('Connect wallet failed:', error);
        }
    };

    const disconnectWallet = () => {
        setIsConnected(false);
        setWalletAddress('');
        setJwt('');
    };

    return (
        <WalletContext.Provider value={{ isConnected, walletAddress, jwt, connectWallet, disconnectWallet }}>
        {children}
        </WalletContext.Provider>
    );
};