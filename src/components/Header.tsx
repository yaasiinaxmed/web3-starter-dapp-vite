import React from 'react';

interface HeaderProps {
  userAccount: string;
  onConnect: () => void;
  onDisconnect: () => void;
  walletImage?: string;
  balance?: string;
  network?: string;
}

const Header: React.FC<HeaderProps> = ({ userAccount, onConnect, onDisconnect, walletImage, balance, network }) => {
  return (
    <header className="flex justify-between items-center p-5 bg-gray-900 text-white shadow-md">
      <h1 className="text-3xl font-bold">Web3 Starter</h1>
      {userAccount ? (
        <div className="flex items-center space-x-4">
          {walletImage && <img src={walletImage} alt="Wallet" className="h-8 w-8 rounded-full" />}
          <span className="text-sm">Balance: {balance} ETH</span>
          <span className="text-sm">Network: {network}</span>
          <button className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700">
            {userAccount.slice(0, 5)}...{userAccount.slice(-4)}
          </button>
          <button 
            onClick={onDisconnect} 
            className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition duration-150"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button 
          onClick={onConnect} 
          className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition duration-150"
        >
          Connect Wallet
        </button>
      )}
    </header>
  );
};

export default Header;