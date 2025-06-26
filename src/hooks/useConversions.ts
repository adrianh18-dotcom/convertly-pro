
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'convertly-conversions';
const MAX_FREE_CONVERSIONS = 10;

export const useConversions = () => {
  const [conversionsUsed, setConversionsUsed] = useState(0);
  const [showAdModal, setShowAdModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setConversionsUsed(parseInt(saved, 10));
    }
  }, []);

  const useConversion = () => {
    if (conversionsUsed >= MAX_FREE_CONVERSIONS) {
      setShowAdModal(true);
      return false;
    }
    
    const newCount = conversionsUsed + 1;
    setConversionsUsed(newCount);
    localStorage.setItem(STORAGE_KEY, newCount.toString());
    return true;
  };

  const resetConversions = () => {
    setConversionsUsed(0);
    localStorage.setItem(STORAGE_KEY, '0');
    setShowAdModal(false);
  };

  const closeAdModal = () => {
    setShowAdModal(false);
  };

  return {
    conversionsUsed,
    conversionsLeft: MAX_FREE_CONVERSIONS - conversionsUsed,
    canConvert: conversionsUsed < MAX_FREE_CONVERSIONS,
    useConversion,
    resetConversions,
    showAdModal,
    closeAdModal,
  };
};
