import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Header from '../components/Header';
import { ConsentManager } from '../components/ConsentManager';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const PrivacyPreferences: React.FC = () => {
  const { t, language } = useI18n();

  const openConsentManager = () => {
    // Remove existing consent to trigger the banner
    localStorage.removeItem('convertly-consent');
    localStorage.removeItem('convertly-consent-date');
    window.location.reload();
  };

  const getContent = () => {
    switch (language) {
      case 'pt':
        return {
          title: 'Preferências de Privacidade',
          description: 'Gerencie suas preferências de cookies e consentimento de dados.',
          currentSettings: 'Configurações Atuais',
          modify: 'Modificar Preferências',
          modifyDescription: 'Clique no botão abaixo para abrir o gerenciador de consentimento e modificar suas preferências.'
        };
      case 'es':
        return {
          title: 'Preferencias de Privacidad',
          description: 'Gestiona tus preferencias de cookies y consentimiento de datos.',
          currentSettings: 'Configuración Actual',
          modify: 'Modificar Preferencias',
          modifyDescription: 'Haz clic en el botón de abajo para abrir el gestor de consentimiento y modificar tus preferencias.'
        };
      case 'ru':
        return {
          title: 'Настройки Конфиденциальности',
          description: 'Управляйте своими предпочтениями по куки и согласию на обработку данных.',
          currentSettings: 'Текущие Настройки',
          modify: 'Изменить Предпочтения',
          modifyDescription: 'Нажмите кнопку ниже, чтобы открыть менеджер согласия и изменить свои предпочтения.'
        };
      default:
        return {
          title: 'Privacy Preferences',
          description: 'Manage your cookie and data consent preferences.',
          currentSettings: 'Current Settings',
          modify: 'Modify Preferences',
          modifyDescription: 'Click the button below to open the consent manager and modify your preferences.'
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
            <p className="text-muted-foreground">{content.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">{content.modify}</h2>
              <p className="text-muted-foreground mb-4">
                {content.modifyDescription}
              </p>
              <Button onClick={openConsentManager}>
                {t('managePreferences')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <ConsentManager />
    </div>
  );
};

export default PrivacyPreferences;