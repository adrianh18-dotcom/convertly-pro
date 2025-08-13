import React, { useEffect } from 'react';

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: 'auto' | 'banner' | 'rectangle' | 'leaderboard' | 'square';
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
  adTest?: boolean;
}

const ADSENSE_PUBLISHER_ID = import.meta.env.VITE_ADSENSE_PUBLISHER_ID || 'ca-pub-1930561987422445';

export const AdSenseAd: React.FC<AdSenseAdProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = {},
  className = '',
  adTest = false
}) => {
  useEffect(() => {
    // Only load ads if we have a valid publisher ID
    if (!ADSENSE_PUBLISHER_ID || ADSENSE_PUBLISHER_ID.includes('XXXXXXXXX')) {
      return;
    }

    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle as any[]).push({});
      }
    } catch (error) {
      console.log('AdSense error:', error);
    }
  }, []);

  // Don't render ads if no publisher ID
  if (!ADSENSE_PUBLISHER_ID || ADSENSE_PUBLISHER_ID.includes('XXXXXXXXX')) {
    return null;
  }

  const defaultStyle: React.CSSProperties = {
    display: 'block',
    ...style
  };

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={defaultStyle}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
        data-adtest={adTest ? 'on' : 'off'}
      />
    </div>
  );
};

export const AdSenseBanner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <AdSenseAd
    adSlot="1234567890"
    adFormat="banner"
    className={`mb-4 ${className}`}
    style={{ minHeight: '90px', maxWidth: '728px', width: '100%' }}
  />
);

export const AdSenseSquare: React.FC<{ className?: string }> = ({ className = '' }) => (
  <AdSenseAd
    adSlot="0987654321"
    adFormat="square"
    className={className}
    style={{ width: '336px', height: '280px' }}
  />
);

export const AdSenseInArticle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <AdSenseAd
    adSlot="1122334455"
    adFormat="auto"
    className={`my-6 ${className}`}
    style={{ minHeight: '120px' }}
  />
);

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}