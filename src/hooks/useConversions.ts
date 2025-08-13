
import { useState, useEffect } from 'react';

// Remove conversion limits - now unlimited and free
export const useConversions = () => {
  // Keep for backward compatibility but don't enforce limits
  const [conversionsUsed] = useState(0);
  const [showAdModal] = useState(false);

  // Always allow conversions - no limits
  const useConversion = () => {
    return true;
  };

  const resetConversions = () => {
    // No-op since we don't track limits anymore
  };

  const closeAdModal = () => {
    // No-op since we don't show ad modals anymore
  };

  return {
    conversionsUsed: 0,
    conversionsLeft: Infinity,
    canConvert: true,
    useConversion,
    resetConversions,
    showAdModal: false,
    closeAdModal,
  };
};
