
import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from 'react-router-dom';

const SEO = () => {
  const { language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const seoData = {
      en: {
        title: 'Convertly – Free Online File Converter and Image Compressor',
        description: 'Convert and compress images and documents (JPG, PNG, PDF, DOCX, etc.) for free with Convertly. Fast, secure, and browser-based. Available in English and Portuguese.',
        keywords: 'online image converter, PDF converter, compress image online, JPG to PNG converter, document converter, Convertly tool, free file conversion, image compressor',
        about: {
          title: 'About Convertly – Free Online File Converter',
          description: 'Learn about Convertly, the professional online tool for converting and compressing images and documents. Fast, secure, and completely free.'
        },
        faq: {
          title: 'FAQ – Convertly File Converter Help',
          description: 'Frequently asked questions about Convertly. Learn about free conversions, supported formats, and how our ad-supported model works.'
        }
      },
      pt: {
        title: 'Convertly – Conversor e Compressor de Arquivos Online Gratuito',
        description: 'Converta e comprima imagens e documentos (JPG, PNG, PDF, DOCX, etc.) gratuitamente com o Convertly. Rápido, seguro, sem precisar instalar nada. Em português e inglês.',
        keywords: 'conversor de imagem online, conversor PDF, compactar imagem, converter JPG para PNG, compressor de imagem, ferramenta online, converter documentos, Convertly',
        about: {
          title: 'Sobre o Convertly – Conversor de Arquivos Online Gratuito',
          description: 'Conheça o Convertly, a ferramenta profissional online para converter e comprimir imagens e documentos. Rápido, seguro e completamente gratuito.'
        },
        faq: {
          title: 'FAQ – Ajuda do Conversor Convertly',
          description: 'Perguntas frequentes sobre o Convertly. Saiba sobre conversões gratuitas, formatos suportados e como funciona nosso modelo com anúncios.'
        }
      }
    };

    const currentSEO = seoData[language];
    let pageData = currentSEO;

    // Update based on current route
    if (location.pathname === '/about') {
      pageData = { ...currentSEO, ...currentSEO.about };
    } else if (location.pathname === '/faq') {
      pageData = { ...currentSEO, ...currentSEO.faq };
    }

    // Update document title
    document.title = pageData.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', pageData.description);
    updateMetaTag('keywords', pageData.keywords);
    updateMetaTag('author', 'Convertly');
    updateMetaTag('language', language === 'pt' ? 'pt-BR' : 'en-US');

    // Open Graph tags
    updateMetaTag('', pageData.title, 'og:title');
    updateMetaTag('', pageData.description, 'og:description');
    updateMetaTag('', 'website', 'og:type');
    updateMetaTag('', window.location.href, 'og:url');
    updateMetaTag('', 'https://lovable.dev/opengraph-image-p98pqg.png', 'og:image');
    updateMetaTag('', 'Convertly', 'og:site_name');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', pageData.title);
    updateMetaTag('twitter:description', pageData.description);
    updateMetaTag('twitter:image', 'https://lovable.dev/opengraph-image-p98pqg.png');
    updateMetaTag('twitter:site', '@convertly');

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('googlebot', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Set HTML lang attribute
    document.documentElement.setAttribute('lang', language === 'pt' ? 'pt-BR' : 'en-US');

    // Structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Convertly",
      "description": pageData.description,
      "url": window.location.origin,
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Image format conversion",
        "Image compression",
        "Document conversion",
        "Batch processing",
        "Multiple language support"
      ]
    };

    // Update or create structured data script
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

  }, [language, location.pathname]);

  return null;
};

export default SEO;
