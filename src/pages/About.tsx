
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import AdSenseAd from '../components/AdSenseAd';
import { Shield, Zap, Smartphone, Heart, Globe, Clock } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: t('feature1'),
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('feature2'),
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('feature3'),
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: t('feature4'),
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: t('feature5'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Top Ad */}
        <div className="flex justify-center mb-8">
          <AdSenseAd 
            adSlot="1111111111"
            adFormat="banner"
            style={{ display: 'block', width: '728px', height: '90px' }}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('aboutTitle')}
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {t('aboutDescription')}
          </p>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t('features')}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="text-blue-600 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <span className="text-gray-700">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Fast & Secure</h3>
            </div>
            <p className="text-blue-800">
              All image conversions happen directly in your browser using advanced web technologies. 
              Your images are never uploaded to our servers, ensuring complete privacy and security.
            </p>
          </div>
        </div>
        
        {/* Bottom Ad */}
        <div className="flex justify-center mt-8">
          <AdSenseAd 
            adSlot="2222222222"
            adFormat="rectangle"
            style={{ display: 'block', width: '336px', height: '280px' }}
          />
        </div>
      </main>
    </div>
  );
};

export default About;
