import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Header from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Terms: React.FC = () => {
  const { t, language } = useI18n();

  const getContent = () => {
    switch (language) {
      case 'pt':
        return {
          title: 'Termos de Uso',
          lastUpdated: 'Última atualização: 13 de agosto de 2025',
          sections: [
            {
              title: '1. Aceitação dos Termos',
              content: `Ao usar o Convertly, você concorda com estes termos de uso. Se você não concorda, não use nossos serviços.`
            },
            {
              title: '2. Descrição do Serviço',
              content: `O Convertly é um serviço gratuito de conversão e compressão de arquivos online. Oferecemos:
• Conversão entre formatos de imagem
• Compressão de imagens
• Conversão de documentos
• Todos os serviços são gratuitos e ilimitados`
            },
            {
              title: '3. Uso Aceitável',
              content: `Você concorda em:
• Usar o serviço apenas para fins legais
• Não carregar conteúdo ilegal, prejudicial ou ofensivo
• Não tentar comprometer a segurança do sistema
• Respeitar os direitos autorais de terceiros`
            },
            {
              title: '4. Limitações do Serviço',
              content: `• Tamanho máximo de arquivo: 300MB
• Arquivos são automaticamente excluídos após 24 horas
• O serviço pode ter limitações de velocidade para prevenir abuso
• Não garantimos 100% de uptime`
            },
            {
              title: '5. Propriedade Intelectual',
              content: `• Você mantém todos os direitos sobre seus arquivos
• Não reivindicamos propriedade sobre o conteúdo que você carrega
• Nosso software e interface são protegidos por direitos autorais`
            },
            {
              title: '6. Disclaimer',
              content: `O serviço é fornecido "como está" sem garantias. Não somos responsáveis por:
• Perda de dados
• Problemas de qualidade na conversão
• Interrupções do serviço`
            },
            {
              title: '7. Modificações',
              content: `Reservamo-nos o direito de modificar estes termos a qualquer momento. Mudanças serão publicadas nesta página.`
            }
          ]
        };
      case 'es':
        return {
          title: 'Términos de Uso',
          lastUpdated: 'Última actualización: 13 de agosto de 2025',
          sections: [
            {
              title: '1. Aceptación de los Términos',
              content: `Al usar Convertly, aceptas estos términos de uso. Si no estás de acuerdo, no uses nuestros servicios.`
            },
            {
              title: '2. Descripción del Servicio',
              content: `Convertly es un servicio gratuito de conversión y compresión de archivos en línea. Ofrecemos:
• Conversión entre formatos de imagen
• Compresión de imágenes
• Conversión de documentos
• Todos los servicios son gratuitos e ilimitados`
            },
            {
              title: '3. Uso Aceptable',
              content: `Aceptas:
• Usar el servicio solo para fines legales
• No subir contenido ilegal, dañino u ofensivo
• No intentar comprometer la seguridad del sistema
• Respetar los derechos de autor de terceros`
            },
            {
              title: '4. Limitaciones del Servicio',
              content: `• Tamaño máximo de archivo: 300MB
• Los archivos se eliminan automáticamente después de 24 horas
• El servicio puede tener limitaciones de velocidad para prevenir abuso
• No garantizamos 100% de tiempo de actividad`
            },
            {
              title: '5. Propiedad Intelectual',
              content: `• Mantienes todos los derechos sobre tus archivos
• No reclamamos propiedad sobre el contenido que subes
• Nuestro software e interfaz están protegidos por derechos de autor`
            },
            {
              title: '6. Descargo de Responsabilidad',
              content: `El servicio se proporciona "tal como está" sin garantías. No somos responsables de:
• Pérdida de datos
• Problemas de calidad en la conversión
• Interrupciones del servicio`
            },
            {
              title: '7. Modificaciones',
              content: `Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios se publicarán en esta página.`
            }
          ]
        };
      case 'ru':
        return {
          title: 'Условия Использования',
          lastUpdated: 'Последнее обновление: 13 августа 2025',
          sections: [
            {
              title: '1. Принятие Условий',
              content: `Используя Convertly, вы соглашаетесь с этими условиями использования. Если вы не согласны, не используйте наши услуги.`
            },
            {
              title: '2. Описание Сервиса',
              content: `Convertly - это бесплатный онлайн-сервис конвертации и сжатия файлов. Мы предлагаем:
• Конвертацию между форматами изображений
• Сжатие изображений
• Конвертацию документов
• Все услуги бесплатны и неограничены`
            },
            {
              title: '3. Допустимое Использование',
              content: `Вы соглашаетесь:
• Использовать сервис только в законных целях
• Не загружать незаконный, вредоносный или оскорбительный контент
• Не пытаться нарушить безопасность системы
• Уважать авторские права третьих лиц`
            },
            {
              title: '4. Ограничения Сервиса',
              content: `• Максимальный размер файла: 300МБ
• Файлы автоматически удаляются через 24 часа
• Сервис может иметь ограничения скорости для предотвращения злоупотреблений
• Мы не гарантируем 100% времени работы`
            },
            {
              title: '5. Интеллектуальная Собственность',
              content: `• Вы сохраняете все права на свои файлы
• Мы не претендуем на собственность загружаемого вами контента
• Наше программное обеспечение и интерфейс защищены авторским правом`
            },
            {
              title: '6. Отказ от Ответственности',
              content: `Сервис предоставляется "как есть" без гарантий. Мы не несем ответственности за:
• Потерю данных
• Проблемы качества конвертации
• Перебои в работе сервиса`
            },
            {
              title: '7. Изменения',
              content: `Мы оставляем за собой право изменять эти условия в любое время. Изменения будут опубликованы на этой странице.`
            }
          ]
        };
      default:
        return {
          title: 'Terms of Use',
          lastUpdated: 'Last updated: August 13, 2025',
          sections: [
            {
              title: '1. Acceptance of Terms',
              content: `By using Convertly, you agree to these terms of use. If you disagree, please do not use our services.`
            },
            {
              title: '2. Service Description',
              content: `Convertly is a free online file conversion and compression service. We offer:
• Conversion between image formats
• Image compression
• Document conversion
• All services are free and unlimited`
            },
            {
              title: '3. Acceptable Use',
              content: `You agree to:
• Use the service only for lawful purposes
• Not upload illegal, harmful, or offensive content
• Not attempt to compromise system security
• Respect third-party copyrights`
            },
            {
              title: '4. Service Limitations',
              content: `• Maximum file size: 300MB
• Files are automatically deleted after 24 hours
• Service may have rate limiting to prevent abuse
• We do not guarantee 100% uptime`
            },
            {
              title: '5. Intellectual Property',
              content: `• You retain all rights to your files
• We do not claim ownership of content you upload
• Our software and interface are protected by copyright`
            },
            {
              title: '6. Disclaimer',
              content: `The service is provided "as is" without warranties. We are not responsible for:
• Data loss
• Conversion quality issues
• Service interruptions`
            },
            {
              title: '7. Modifications',
              content: `We reserve the right to modify these terms at any time. Changes will be posted on this page.`
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

export default Terms;