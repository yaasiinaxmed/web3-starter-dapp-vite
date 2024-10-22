import { useState } from 'react';
import { useSyncProviders } from './hooks/useSyncProviders';
import './App.css';
import Header from './components/Header';
import WalletModal from './components/WalletModal';

const App = () => {
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail | undefined>();
  const [userAccount, setUserAccount] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const providers = useSyncProviders();
  const [errorMessage, setErrorMessage] = useState('');
  const [network, setNetwork] = useState<string>('');
  const [balance, setBalance] = useState<string>('');

  const clearError = () => setErrorMessage('');

  const handleConnect = async (provider: EIP6963ProviderDetail) => {
    try {
      const accounts = await provider.provider.request({ method: 'eth_requestAccounts' }) as string[];

      // Fetch network and balance
      const chainId = await provider.provider.request({ method: 'eth_chainId' }) as string;
      const networkName = chainId === '0x1' ? 'Mainnet' : 'Testnet'; // Adjust for other networks
      setNetwork(networkName);

      const balanceInWei = await provider.provider.request({ method: 'eth_getBalance', params: [accounts[0], 'latest'] }) as string;
      const balanceInEth = (parseInt(balanceInWei) / 10 ** 18).toFixed(4);
      setBalance(balanceInEth);

      setUserAccount(accounts[0]);
      setSelectedWallet(provider);
      setIsModalOpen(false);
    } catch (error) {
      setErrorMessage('Error connecting wallet');
    }
  };

  const handleDisconnect = () => {
    setSelectedWallet(undefined);
    setUserAccount('');
    setNetwork('');
    setBalance('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header 
        userAccount={userAccount} 
        walletImage={selectedWallet?.info.icon || ''} 
        balance={balance} 
        network={network} 
        onConnect={() => setIsModalOpen(true)} 
        onDisconnect={handleDisconnect} 
      />
      <WalletModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        providers={providers} 
        onConnect={handleConnect} 
      />
      
      {errorMessage && (
        <div className="bg-red-600 text-white p-2 rounded-md mt-4 text-center">
          <p>Error: {errorMessage}</p>
          <button onClick={clearError} className="underline">Close</button>
        </div>
      )}
    </div>
  );
};

export default App;
