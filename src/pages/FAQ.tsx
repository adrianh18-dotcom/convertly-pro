
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import AdSenseAd from '../components/AdSenseAd';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const FAQ = () => {
  const { t } = useLanguage();

  const faqs = [
    {
      question: t('faq1Q'),
      answer: t('faq1A'),
    },
    {
      question: t('faq2Q'),
      answer: t('faq2A'),
    },
    {
      question: t('faq3Q'),
      answer: t('faq3A'),
    },
    {
      question: t('faq4Q'),
      answer: t('faq4A'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Top Ad */}
        <div className="flex justify-center mb-8">
          <AdSenseAd 
            adSlot="3333333333"
            adFormat="banner"
            style={{ display: 'block', width: '728px', height: '90px' }}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {t('faqTitle')}
          </h1>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Collapsible key={index} className="border border-gray-200 rounded-lg">
                <CollapsibleTrigger className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-gray-500 transition-transform data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border">
            <h3 className="font-semibold text-gray-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600">
              If you have any other questions about Convertly, feel free to contact our support team. 
              We're here to help you with all your image conversion needs!
            </p>
          </div>
        </div>
        
        {/* Bottom Ad */}
        <div className="flex justify-center mt-8">
          <AdSenseAd 
            adSlot="4444444444"
            adFormat="rectangle"
            style={{ display: 'block', width: '336px', height: '280px' }}
          />
        </div>
      </main>
    </div>
  );
};

export default FAQ;
