import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Header from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Privacy: React.FC = () => {
  const { t, language } = useI18n();

  const getContent = () => {
    switch (language) {
      case 'pt':
        return {
          title: 'Política de Privacidade',
          lastUpdated: 'Última atualização: 13 de agosto de 2025',
          sections: [
            {
              title: '1. Informações que Coletamos',
              content: `Coletamos informações quando você usa nossos serviços:
• Arquivos que você carrega para conversão (temporariamente)
• Informações de uso e analytics através do Google Analytics
• Dados de preferências de cookies e consentimento
• Informações técnicas como endereço IP, tipo de navegador e sistema operacional`
            },
            {
              title: '2. Como Usamos Suas Informações',
              content: `Usamos suas informações para:
• Processar conversões de arquivos
• Melhorar nossos serviços através de analytics
• Exibir anúncios relevantes através do Google AdSense
• Garantir a segurança e funcionalidade do serviço`
            },
            {
              title: '3. Compartilhamento de Dados',
              content: `Compartilhamos dados limitados com:
• Google Analytics para análise de uso do site
• Google AdSense para exibição de anúncios personalizados
• Não vendemos ou alugamos suas informações pessoais para terceiros`
            },
            {
              title: '4. Retenção de Dados',
              content: `• Arquivos carregados são automaticamente excluídos após 24 horas
• Dados de analytics são retidos conforme as políticas do Google
• Preferências de cookies são armazenadas por 180 dias`
            },
            {
              title: '5. Seus Direitos',
              content: `Você tem o direito de:
• Acessar, corrigir ou excluir suas informações
• Retirar o consentimento para processamento de dados
• Configurar preferências de cookies
• Desabilitar anúncios personalizados nas configurações do Google`
            },
            {
              title: '6. Contato',
              content: `Para questões sobre privacidade, entre em contato conosco através de privacy@convertly.app`
            }
          ]
        };
      case 'es':
        return {
          title: 'Política de Privacidad',
          lastUpdated: 'Última actualización: 13 de agosto de 2025',
          sections: [
            {
              title: '1. Información que Recopilamos',
              content: `Recopilamos información cuando usas nuestros servicios:
• Archivos que subes para conversión (temporalmente)
• Información de uso y analytics a través de Google Analytics
• Datos de preferencias de cookies y consentimiento
• Información técnica como dirección IP, tipo de navegador y sistema operativo`
            },
            {
              title: '2. Cómo Usamos tu Información',
              content: `Usamos tu información para:
• Procesar conversiones de archivos
• Mejorar nuestros servicios a través de analytics
• Mostrar anuncios relevantes a través de Google AdSense
• Garantizar la seguridad y funcionalidad del servicio`
            },
            {
              title: '3. Compartir Datos',
              content: `Compartimos datos limitados con:
• Google Analytics para análisis de uso del sitio
• Google AdSense para mostrar anuncios personalizados
• No vendemos ni alquilamos tu información personal a terceros`
            },
            {
              title: '4. Retención de Datos',
              content: `• Los archivos subidos se eliminan automáticamente después de 24 horas
• Los datos de analytics se retienen según las políticas de Google
• Las preferencias de cookies se almacenan por 180 días`
            },
            {
              title: '5. Tus Derechos',
              content: `Tienes derecho a:
• Acceder, corregir o eliminar tu información
• Retirar el consentimiento para el procesamiento de datos
• Configurar preferencias de cookies
• Deshabilitar anuncios personalizados en la configuración de Google`
            },
            {
              title: '6. Contacto',
              content: `Para preguntas sobre privacidad, contáctanos en privacy@convertly.app`
            }
          ]
        };
      case 'ru':
        return {
          title: 'Политика Конфиденциальности',
          lastUpdated: 'Последнее обновление: 13 августа 2025',
          sections: [
            {
              title: '1. Информация, которую мы собираем',
              content: `Мы собираем информацию при использовании наших услуг:
• Файлы, которые вы загружаете для конвертации (временно)
• Информация об использовании и аналитика через Google Analytics
• Данные о предпочтениях cookies и согласии
• Техническая информация, такая как IP-адрес, тип браузера и операционная система`
            },
            {
              title: '2. Как мы используем вашу информацию',
              content: `Мы используем вашу информацию для:
• Обработки конвертации файлов
• Улучшения наших услуг через аналитику
• Показа релевантной рекламы через Google AdSense
• Обеспечения безопасности и функциональности сервиса`
            },
            {
              title: '3. Обмен данными',
              content: `Мы делимся ограниченными данными с:
• Google Analytics для анализа использования сайта
• Google AdSense для показа персонализированной рекламы
• Мы не продаем и не сдаем в аренду вашу личную информацию третьим лицам`
            },
            {
              title: '4. Хранение данных',
              content: `• Загруженные файлы автоматически удаляются через 24 часа
• Данные аналитики хранятся согласно политикам Google
• Предпочтения cookies хранятся 180 дней`
            },
            {
              title: '5. Ваши права',
              content: `У вас есть право:
• Получать доступ, исправлять или удалять вашу информацию
• Отзывать согласие на обработку данных
• Настраивать предпочтения cookies
• Отключать персонализированную рекламу в настройках Google`
            },
            {
              title: '6. Контакты',
              content: `По вопросам конфиденциальности обращайтесь к нам по адресу privacy@convertly.app`
            }
          ]
        };
      default:
        return {
          title: 'Privacy Policy',
          lastUpdated: 'Last updated: August 13, 2025',
          sections: [
            {
              title: '1. Information We Collect',
              content: `We collect information when you use our services:
• Files you upload for conversion (temporarily)
• Usage information and analytics through Google Analytics
• Cookie preferences and consent data
• Technical information such as IP address, browser type, and operating system`
            },
            {
              title: '2. How We Use Your Information',
              content: `We use your information to:
• Process file conversions
• Improve our services through analytics
• Display relevant advertisements through Google AdSense
• Ensure security and functionality of the service`
            },
            {
              title: '3. Data Sharing',
              content: `We share limited data with:
• Google Analytics for website usage analysis
• Google AdSense for personalized ad display
• We do not sell or rent your personal information to third parties`
            },
            {
              title: '4. Data Retention',
              content: `• Uploaded files are automatically deleted after 24 hours
• Analytics data is retained according to Google's policies
• Cookie preferences are stored for 180 days`
            },
            {
              title: '5. Your Rights',
              content: `You have the right to:
• Access, correct, or delete your information
• Withdraw consent for data processing
• Configure cookie preferences
• Disable personalized ads in Google settings`
            },
            {
              title: '6. Contact',
              content: `For privacy questions, contact us at privacy@convertly.app`
            }
          ]
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
          <CardContent className="space-y-6">
            {content.sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                <div className="text-muted-foreground whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Privacy;