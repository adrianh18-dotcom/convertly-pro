
import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Header from '../components/Header';
import ImageConverter from '../components/ImageConverter';
import ImageCompressor from '../components/ImageCompressor';
import DocumentConverter from '../components/DocumentConverter';
import { AdSenseBanner, AdSenseInArticle, AdSenseSquare } from '../components/AdSenseManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Home = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Top Banner Ad */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <div className="flex justify-center">
          <AdSenseBanner />
        </div>
      </div>
      
      <main className="w-full max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-4">
            {t('subtitle')}
          </p>
          <p className="text-sm text-primary font-medium">
            {t('freeUnlimited')}
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
            <AdSenseInArticle className="mb-6" />
            <ImageCompressor />
          </TabsContent>
          
          <TabsContent value="documents">
            <AdSenseInArticle className="mb-6" />
            <DocumentConverter />
          </TabsContent>
        </Tabs>
        
        {/* Bottom Ad */}
        <div className="mt-12 flex justify-center">
          <AdSenseSquare />
        </div>
      </main>
    </div>
  );
};

export default Home;
