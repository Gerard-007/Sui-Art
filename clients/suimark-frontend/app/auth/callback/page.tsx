'use client';

import { useEffect, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { Ed25519PublicKey } from '@mysten/sui/keypairs/ed25519';
import { WalletContext } from '@/components/WalletContext';

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setIsConnected, setWalletAddress, setJwt } = useContext(WalletContext);

  const client = new SuiClient({ url: getFullnodeUrl('testnet') });

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const accessToken = searchParams.get('access_token');
      const state = searchParams.get('state');
      if (accessToken && state) {
        try {
          const { nonce, ephemeralPublicKey } = JSON.parse(decodeURIComponent(state));
          const publicKey = new Ed25519PublicKey(ephemeralPublicKey);

          // Step 3: Generate zkProof using Mysten Labs' zkLogin prover
          const zkProofResponse = await axios.post('https://prover.mystenlabs.com/v1/zklogin', {
            jwt: accessToken,
            nonce,
            ephemeralPublicKey: publicKey.toSuiAddress(),
            maxEpoch: Math.floor(Date.now() / 1000) + 10,
            network: 'testnet',
          });
          const zkProof = zkProofResponse.data.proof;

          // Step 4: Authenticate with backend
          const authResponse = await axios.post('http://localhost:9000/api/auth/auth', {
            zkProof,
            address: ephemeralPublicKey, // For testing; use actual wallet address in production
          });

          const { token, isVerified, isCollector } = authResponse.data;
          setJwt(token);
          setWalletAddress(ephemeralPublicKey); // For testing; adjust for production
          setIsConnected(true);

          // Redirect based on user type
          if (!isCollector && !isVerified) {
            router.push('/onboarding');
          } else {
            router.push('/dashboard');
          }
        } catch (error) {
          console.error('Authentication failed:', error);
          router.push('/'); // Redirect to home on error
        }
      }
    };

    handleOAuthCallback();
  }, [searchParams, router, setIsConnected, setWalletAddress, setJwt]);

  return <div>Loading...</div>;
};

export default AuthCallback;