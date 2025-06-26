
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useConversions } from '../hooks/useConversions';
import Header from '../components/Header';
import ImageConverter from '../components/ImageConverter';
import AdModal from '../components/AdModal';

const Home = () => {
  const { t } = useLanguage();
  const { showAdModal, closeAdModal, resetConversions } = useConversions();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Converter */}
        <ImageConverter />
      </main>

      {/* Ad Modal */}
      <AdModal
        isOpen={showAdModal}
        onClose={closeAdModal}
        onComplete={resetConversions}
      />
    </div>
  );
};

export default Home;
