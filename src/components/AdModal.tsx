
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Play } from 'lucide-react';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose, onComplete }) => {
  const { t } = useLanguage();
  const [adState, setAdState] = useState<'ready' | 'loading' | 'playing' | 'completed'>('ready');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (adState === 'playing') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setAdState('completed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [adState]);

  const handleWatchAd = () => {
    setAdState('loading');
    setTimeout(() => {
      setAdState('playing');
      setCountdown(5);
    }, 2000);
  };

  const handleComplete = () => {
    onComplete();
    setAdState('ready');
    setCountdown(5);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {t('limitReached')}
          </h2>
          
          {adState === 'ready' && (
            <>
              <p className="text-gray-600 mb-6">
                {t('watchAd')}
              </p>
              <button
                onClick={handleWatchAd}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
              >
                <Play className="w-4 h-4" />
                <span>{t('watchAdButton')}</span>
              </button>
            </>
          )}

          {adState === 'loading' && (
            <div className="py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">{t('adLoading')}</p>
            </div>
          )}

          {adState === 'playing' && (
            <div className="py-8">
              <div className="bg-gray-800 rounded-lg p-8 mb-4 text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">📺</div>
                  <div className="text-lg mb-2">Sample Advertisement</div>
                  <div className="text-sm opacity-75">
                    Ad ends in {countdown} seconds
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Please wait while the advertisement plays...
              </p>
            </div>
          )}

          {adState === 'completed' && (
            <>
              <div className="text-green-600 text-6xl mb-4">✅</div>
              <p className="text-gray-600 mb-6">
                {t('adComplete')}
              </p>
              <button
                onClick={handleComplete}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                {t('adContinue')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdModal;
