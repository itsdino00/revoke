import React, { useState } from 'react';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import WalletConnectProvider from '@walletconnect/web3-provider';

function App() {
  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState(null);

  const connectWallet = async () => {
    const provider = new WalletConnectProvider({
      rpc: {
        1: clusterApiUrl('mainnet'),
        2: clusterApiUrl('testnet'),
      },
    });

    try {
      await provider.enable();
      const connection = new Connection(clusterApiUrl('mainnet'), 'confirmed');
      const walletPublicKey = provider.publicKey;

      if (walletPublicKey) {
        setConnected(true);
        setWallet(walletPublicKey);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Solana Wallet</h1>
      {connected ? (
        <div>
          <p>Wallet Connected: {wallet}</p>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;
