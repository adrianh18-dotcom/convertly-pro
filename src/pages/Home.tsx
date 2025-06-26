
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useConversions } from '../hooks/useConversions';
import Header from '../components/Header';
import ImageConverter from '../components/ImageConverter';
import ImageCompressor from '../components/ImageCompressor';
import DocumentConverter from '../components/DocumentConverter';
import AdModal from '../components/AdModal';
import AdSenseAd from '../components/AdSenseAd';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Home = () => {
  const { t } = useLanguage();
  const { showAdModal, closeAdModal, resetConversions } = useConversions();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Top Banner Ad */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <div className="flex justify-center">
          <AdSenseAd 
            adSlot="1234567890"
            adFormat="banner"
            className="mb-4"
            style={{ display: 'block', width: '728px', height: '90px' }}
          />
        </div>
      </div>
      
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

        {/* Tools Tabs */}
        <Tabs defaultValue="converter" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="converter">{t('imageConverter')}</TabsTrigger>
            <TabsTrigger value="compressor">{t('imageCompressor')}</TabsTrigger>
            <TabsTrigger value="documents">{t('documentConverter')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="converter">
            <ImageConverter />
          </TabsContent>
          
          <TabsContent value="compressor">
            <ImageCompressor />
          </TabsContent>
          
          <TabsContent value="documents">
            <DocumentConverter />
          </TabsContent>
        </Tabs>
        
        {/* Bottom Ad */}
        <div className="mt-12 flex justify-center">
          <AdSenseAd 
            adSlot="0987654321"
            adFormat="rectangle"
            style={{ display: 'block', width: '336px', height: '280px' }}
          />
        </div>
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
