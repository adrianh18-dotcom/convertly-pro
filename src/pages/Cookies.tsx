import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Header from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

const Cookies: React.FC = () => {
  const { t, language } = useI18n();

  const getContent = () => {
    switch (language) {
      case 'pt':
        return {
          title: 'Política de Cookies',
          lastUpdated: 'Última atualização: 13 de agosto de 2025',
          intro: 'Este documento explica como o Convertly usa cookies e tecnologias similares.',
          whatAreCookies: {
            title: 'O que são Cookies?',
            content: 'Cookies são pequenos arquivos de texto armazenados em seu dispositivo quando você visita nosso site. Eles nos ajudam a melhorar sua experiência e fornecer funcionalidades personalizadas.'
          },
          cookieTypes: {
            title: 'Tipos de Cookies que Usamos',
            headers: ['Nome', 'Tipo', 'Finalidade', 'Duração'],
            rows: [
              ['convertly-language', 'Necessário', 'Armazena sua preferência de idioma', '1 ano'],
              ['convertly-consent', 'Necessário', 'Armazena suas preferências de consentimento', '180 dias'],
              ['_ga', 'Analytics', 'Google Analytics - identifica usuários únicos', '2 anos'],
              ['_gid', 'Analytics', 'Google Analytics - identifica sessões', '24 horas'],
              ['__gads', 'Publicidade', 'Google AdSense - personalização de anúncios', '2 anos'],
              ['__gpi', 'Publicidade', 'Google AdSense - medição de anúncios', '1 ano']
            ]
          },
          managing: {
            title: 'Gerenciando Cookies',
            content: 'Você pode gerenciar suas preferências de cookies através do banner de consentimento ou nas configurações do seu navegador. Note que desabilitar alguns cookies pode afetar a funcionalidade do site.'
          }
        };
      case 'es':
        return {
          title: 'Política de Cookies',
          lastUpdated: 'Última actualización: 13 de agosto de 2025',
          intro: 'Este documento explica cómo Convertly usa cookies y tecnologías similares.',
          whatAreCookies: {
            title: '¿Qué son las Cookies?',
            content: 'Las cookies son pequeños archivos de texto almacenados en tu dispositivo cuando visitas nuestro sitio. Nos ayudan a mejorar tu experiencia y proporcionar funcionalidades personalizadas.'
          },
          cookieTypes: {
            title: 'Tipos de Cookies que Usamos',
            headers: ['Nombre', 'Tipo', 'Propósito', 'Duración'],
            rows: [
              ['convertly-language', 'Necesaria', 'Almacena tu preferencia de idioma', '1 año'],
              ['convertly-consent', 'Necesaria', 'Almacena tus preferencias de consentimiento', '180 días'],
              ['_ga', 'Analytics', 'Google Analytics - identifica usuarios únicos', '2 años'],
              ['_gid', 'Analytics', 'Google Analytics - identifica sesiones', '24 horas'],
              ['__gads', 'Publicidad', 'Google AdSense - personalización de anuncios', '2 años'],
              ['__gpi', 'Publicidad', 'Google AdSense - medición de anuncios', '1 año']
            ]
          },
          managing: {
            title: 'Gestionando Cookies',
            content: 'Puedes gestionar tus preferencias de cookies a través del banner de consentimiento o en la configuración de tu navegador. Ten en cuenta que deshabilitar algunas cookies puede afectar la funcionalidad del sitio.'
          }
        };
      case 'ru':
        return {
          title: 'Политика Куки',
          lastUpdated: 'Последнее обновление: 13 августа 2025',
          intro: 'Этот документ объясняет, как Convertly использует куки и аналогичные технологии.',
          whatAreCookies: {
            title: 'Что такое Куки?',
            content: 'Куки - это небольшие текстовые файлы, сохраняемые на вашем устройстве при посещении нашего сайта. Они помогают нам улучшить ваш опыт и предоставить персонализированные функции.'
          },
          cookieTypes: {
            title: 'Типы Куки, которые мы используем',
            headers: ['Название', 'Тип', 'Назначение', 'Длительность'],
            rows: [
              ['convertly-language', 'Необходимые', 'Сохраняет ваше предпочтение языка', '1 год'],
              ['convertly-consent', 'Необходимые', 'Сохраняет ваши предпочтения согласия', '180 дней'],
              ['_ga', 'Аналитика', 'Google Analytics - идентифицирует уникальных пользователей', '2 года'],
              ['_gid', 'Аналитика', 'Google Analytics - идентифицирует сессии', '24 часа'],
              ['__gads', 'Реклама', 'Google AdSense - персонализация рекламы', '2 года'],
              ['__gpi', 'Реклама', 'Google AdSense - измерение рекламы', '1 год']
            ]
          },
          managing: {
            title: 'Управление Куки',
            content: 'Вы можете управлять своими предпочтениями куки через баннер согласия или в настройках вашего браузера. Учтите, что отключение некоторых куки может повлиять на функциональность сайта.'
          }
        };
      default:
        return {
          title: 'Cookie Policy',
          lastUpdated: 'Last updated: August 13, 2025',
          intro: 'This document explains how Convertly uses cookies and similar technologies.',
          whatAreCookies: {
            title: 'What are Cookies?',
            content: 'Cookies are small text files stored on your device when you visit our website. They help us improve your experience and provide personalized functionality.'
          },
          cookieTypes: {
            title: 'Types of Cookies We Use',
            headers: ['Name', 'Type', 'Purpose', 'Duration'],
            rows: [
              ['convertly-language', 'Necessary', 'Stores your language preference', '1 year'],
              ['convertly-consent', 'Necessary', 'Stores your consent preferences', '180 days'],
              ['_ga', 'Analytics', 'Google Analytics - identifies unique users', '2 years'],
              ['_gid', 'Analytics', 'Google Analytics - identifies sessions', '24 hours'],
              ['__gads', 'Advertising', 'Google AdSense - ad personalization', '2 years'],
              ['__gpi', 'Advertising', 'Google AdSense - ad measurement', '1 year']
            ]
          },
          managing: {
            title: 'Managing Cookies',
            content: 'You can manage your cookie preferences through the consent banner or in your browser settings. Note that disabling some cookies may affect site functionality.'
          }
        };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{content.title}</CardTitle>
            <p className="text-muted-foreground">{content.lastUpdated}</p>
          </CardHeader>
          <CardContent className="space-y-8">
            <p className="text-muted-foreground">{content.intro}</p>
            
            <div>
              <h2 className="text-xl font-semibold mb-3">{content.whatAreCookies.title}</h2>
              <p className="text-muted-foreground">{content.whatAreCookies.content}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">{content.cookieTypes.title}</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    {content.cookieTypes.headers.map((header, index) => (
                      <TableHead key={index}>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {content.cookieTypes.rows.map((row, index) => (
                    <TableRow key={index}>
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">{content.managing.title}</h2>
              <p className="text-muted-foreground">{content.managing.content}</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Cookies;