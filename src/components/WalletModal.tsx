import React from 'react';
import WalletButton from './WalletButton';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  providers: EIP6963ProviderDetail[];
  onConnect: (provider: EIP6963ProviderDetail) => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, providers, onConnect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-md max-w-md w-full text-center shadow-lg">
        <h2 className="text-lg font-semibold text-white mb-4">Detected Wallets</h2>
        <div className="flex flex-col space-y-2">
          {providers.length > 0 ? (
            providers.map((provider) => (
              <WalletButton key={provider.info.uuid} wallet={provider} onConnect={onConnect} />
            ))
          ) : (
            <p className="text-gray-400">No wallets found</p>
          )}
        </div>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition duration-150">
          Close
        </button>
      </div>
    </div>
  );
};

export default WalletModal;