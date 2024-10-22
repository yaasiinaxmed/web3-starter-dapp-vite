import React from 'react';

interface WalletButtonProps {
  wallet: EIP6963ProviderDetail;
  onConnect: (provider: EIP6963ProviderDetail) => void;
}

const WalletButton: React.FC<WalletButtonProps> = ({ wallet, onConnect }) => {
  return (
    <button
      onClick={() => onConnect(wallet)}
      className="flex items-center justify-between w-full px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-150"
    >
      <span>{wallet.info.name}</span>
      <img src={wallet.info.icon} alt={wallet.info.name} className="h-6 w-6 rounded-full" />
    </button>
  );
};

export default WalletButton;