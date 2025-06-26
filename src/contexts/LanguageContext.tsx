
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    faq: 'FAQ',
    
    // Home page
    title: 'Convertly - Professional Image Converter',
    subtitle: 'Convert your images to any format quickly and easily',
    dragDrop: 'Drag & drop your image here or',
    browse: 'browse files',
    selectFormat: 'Select output format',
    convert: 'Convert Image',
    converting: 'Converting...',
    download: 'Download Converted Image',
    newConversion: 'Convert Another Image',
    
    // Usage tracking
    conversionsLeft: 'Free conversions remaining: {count}/10',
    limitReached: 'Free conversion limit reached!',
    watchAd: 'Watch a short ad to get 10 more conversions',
    watchAdButton: 'Watch Ad',
    adLoading: 'Loading advertisement...',
    adComplete: 'Ad completed! You now have 10 more free conversions.',
    adContinue: 'Continue Converting',
    
    // About page
    aboutTitle: 'About Convertly',
    aboutDescription: 'Convertly is a professional image conversion tool that supports multiple formats including JPG, PNG, GIF, BMP, TIFF, WEBP, SVG, ICO, HEIC, and AVIF. Our mission is to provide fast, reliable, and easy-to-use image conversion services.',
    features: 'Features:',
    feature1: 'Support for 10+ image formats',
    feature2: 'Fast and secure conversion',
    feature3: 'No registration required',
    feature4: 'Mobile-friendly interface',
    feature5: 'Free conversions with ad support',
    
    // FAQ page
    faqTitle: 'Frequently Asked Questions',
    faq1Q: 'How many free conversions do I get?',
    faq1A: 'You get 10 free image conversions. After that, you can watch a short advertisement to get 10 more conversions.',
    faq2Q: 'What image formats are supported?',
    faq2A: 'We support JPG, PNG, GIF, BMP, TIFF, WEBP, SVG, ICO, HEIC, AVIF and more.',
    faq3Q: 'Is my data secure?',
    faq3A: 'Yes, all conversions happen in your browser. Your images are not uploaded to our servers.',
    faq4Q: 'Why do I need to watch ads?',
    faq4A: 'Ads help us keep the service free and maintain our servers. After watching an ad, you get 10 more free conversions.',
    
    // Errors
    errorUnsupported: 'Unsupported file format',
    errorSize: 'File too large (max 10MB)',
    errorGeneric: 'Error processing file',
  },
  pt: {
    // Navigation
    home: 'Início',
    about: 'Sobre',
    faq: 'FAQ',
    
    // Home page
    title: 'Convertly - Conversor Profissional de Imagens',
    subtitle: 'Converta suas imagens para qualquer formato de forma rápida e fácil',
    dragDrop: 'Arraste e solte sua imagem aqui ou',
    browse: 'procurar arquivos',
    selectFormat: 'Selecione o formato de saída',
    convert: 'Converter Imagem',
    converting: 'Convertendo...',
    download: 'Baixar Imagem Convertida',
    newConversion: 'Converter Outra Imagem',
    
    // Usage tracking
    conversionsLeft: 'Conversões gratuitas restantes: {count}/10',
    limitReached: 'Limite de conversões gratuitas atingido!',
    watchAd: 'Assista a um anúncio curto para obter mais 10 conversões',
    watchAdButton: 'Assistir Anúncio',
    adLoading: 'Carregando anúncio...',
    adComplete: 'Anúncio concluído! Agora você tem mais 10 conversões gratuitas.',
    adContinue: 'Continuar Convertendo',
    
    // About page
    aboutTitle: 'Sobre o Convertly',
    aboutDescription: 'Convertly é uma ferramenta profissional de conversão de imagens que suporta múltiplos formatos incluindo JPG, PNG, GIF, BMP, TIFF, WEBP, SVG, ICO, HEIC e AVIF. Nossa missão é fornecer serviços de conversão de imagem rápidos, confiáveis e fáceis de usar.',
    features: 'Recursos:',
    feature1: 'Suporte para mais de 10 formatos de imagem',
    feature2: 'Conversão rápida e segura',
    feature3: 'Não requer registro',
    feature4: 'Interface amigável para dispositivos móveis',
    feature5: 'Conversões gratuitas com suporte de anúncios',
    
    // FAQ page
    faqTitle: 'Perguntas Frequentes',
    faq1Q: 'Quantas conversões gratuitas eu tenho?',
    faq1A: 'Você tem 10 conversões de imagem gratuitas. Depois disso, pode assistir a um anúncio curto para obter mais 10 conversões.',
    faq2Q: 'Quais formatos de imagem são suportados?',
    faq2A: 'Suportamos JPG, PNG, GIF, BMP, TIFF, WEBP, SVG, ICO, HEIC, AVIF e mais.',
    faq3Q: 'Meus dados estão seguros?',
    faq3A: 'Sim, todas as conversões acontecem no seu navegador. Suas imagens não são enviadas para nossos servidores.',
    faq4Q: 'Por que preciso assistir anúncios?',
    faq4A: 'Os anúncios nos ajudam a manter o serviço gratuito e nossos servidores. Após assistir um anúncio, você ganha mais 10 conversões gratuitas.',
    
    // Errors
    errorUnsupported: 'Formato de arquivo não suportado',
    errorSize: 'Arquivo muito grande (máx 10MB)',
    errorGeneric: 'Erro ao processar arquivo',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.toLowerCase();
    const savedLang = localStorage.getItem('convertly-language') as Language;
    
    if (savedLang) {
      setLanguage(savedLang);
    } else if (browserLang.startsWith('pt')) {
      setLanguage('pt');
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('convertly-language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
