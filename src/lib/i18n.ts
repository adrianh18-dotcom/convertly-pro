export type SupportedLanguage = 'pt' | 'en' | 'es' | 'ru';

export const languages = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
  ru: 'Русский'
};

export const translations = {
  pt: {
    // Header & Navigation
    title: 'Convertly – Conversor e Compressor de Arquivos Online Gratuito',
    subtitle: 'Converta e comprima imagens e documentos gratuitamente. Rápido, seguro, sem limites.',
    home: 'Início',
    about: 'Sobre',
    faq: 'FAQ',
    privacy: 'Privacidade',
    terms: 'Termos',
    cookies: 'Cookies',
    
    // Tools
    imageConverter: 'Conversor de Imagem',
    imageCompressor: 'Compressor de Imagem',
    documentConverter: 'Conversor de Documento',
    
    // Upload
    uploadFiles: 'Carregar Arquivos',
    chooseFiles: 'Escolher Arquivos',
    dragDrop: 'Arraste e solte arquivos aqui ou clique para selecionar',
    supportedFormats: 'Formatos suportados',
    maxFileSize: 'Tamanho máximo do arquivo',
    
    // Conversion
    convertTo: 'Converter para',
    quality: 'Qualidade',
    high: 'Alta',
    medium: 'Média',
    low: 'Baixa',
    convert: 'Converter',
    converting: 'Convertendo...',
    inQueue: 'Na fila',
    completed: 'Concluído',
    download: 'Baixar',
    downloadAll: 'Baixar Tudo',
    convertAnother: 'Converter Outro Arquivo',
    
    // Status
    processing: 'Processando',
    ready: 'Pronto',
    error: 'Erro',
    success: 'Sucesso',
    
    // Ads & Monetization
    freeUnlimited: 'Convertly é gratuito e ilimitado graças aos anúncios',
    supportUs: 'Apoie-nos permitindo anúncios',
    
    // File info
    fileName: 'Nome do arquivo',
    fileSize: 'Tamanho',
    fileType: 'Tipo',
    originalSize: 'Tamanho original',
    compressedSize: 'Tamanho comprimido',
    compressionRatio: 'Taxa de compressão',
    reduced: 'Reduzido em',
    
    // Errors
    fileTooBig: 'Arquivo muito grande. Máximo',
    invalidFormat: 'Formato de arquivo não suportado',
    conversionError: 'Erro na conversão. Tente novamente.',
    uploadError: 'Erro no upload. Tente novamente.',
    
    // Legal
    privacyPolicy: 'Política de Privacidade',
    termsOfUse: 'Termos de Uso',
    cookiePolicy: 'Política de Cookies',
    privacyPreferences: 'Preferências de Privacidade',
    
    // Consent
    acceptAll: 'Aceitar Todos',
    rejectAll: 'Rejeitar Todos',
    managePreferences: 'Gerenciar Preferências',
    consentTitle: 'Configurações de Privacidade',
    consentDescription: 'Usamos cookies e tecnologias similares para melhorar sua experiência e personalizar anúncios.',
    analytics: 'Analytics',
    advertising: 'Publicidade',
    necessary: 'Necessários',
    save: 'Salvar',
    
    // Meta descriptions
    metaDescription: 'Converta e comprima imagens e documentos (JPG, PNG, PDF, DOCX, etc.) gratuitamente com o Convertly. Rápido, seguro, sem precisar instalar nada. Em português e inglês.',
    metaKeywords: 'conversor de imagem online, conversor PDF, compactar imagem, converter JPG para PNG, compressor de imagem, ferramenta online, converter documentos, Convertly'
  },
  en: {
    // Header & Navigation
    title: 'Convertly – Free Online File Converter and Image Compressor',
    subtitle: 'Convert and compress images and documents for free. Fast, secure, unlimited.',
    home: 'Home',
    about: 'About',
    faq: 'FAQ',
    privacy: 'Privacy',
    terms: 'Terms',
    cookies: 'Cookies',
    
    // Tools
    imageConverter: 'Image Converter',
    imageCompressor: 'Image Compressor',
    documentConverter: 'Document Converter',
    
    // Upload
    uploadFiles: 'Upload Files',
    chooseFiles: 'Choose Files',
    dragDrop: 'Drag and drop files here or click to select',
    supportedFormats: 'Supported formats',
    maxFileSize: 'Maximum file size',
    
    // Conversion
    convertTo: 'Convert to',
    quality: 'Quality',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    convert: 'Convert',
    converting: 'Converting...',
    inQueue: 'In queue',
    completed: 'Completed',
    download: 'Download',
    downloadAll: 'Download All',
    convertAnother: 'Convert Another File',
    
    // Status
    processing: 'Processing',
    ready: 'Ready',
    error: 'Error',
    success: 'Success',
    
    // Ads & Monetization
    freeUnlimited: 'Convertly is free and unlimited thanks to ads',
    supportUs: 'Support us by allowing ads',
    
    // File info
    fileName: 'File name',
    fileSize: 'Size',
    fileType: 'Type',
    originalSize: 'Original size',
    compressedSize: 'Compressed size',
    compressionRatio: 'Compression ratio',
    reduced: 'Reduced by',
    
    // Errors
    fileTooBig: 'File too big. Maximum',
    invalidFormat: 'Unsupported file format',
    conversionError: 'Conversion error. Please try again.',
    uploadError: 'Upload error. Please try again.',
    
    // Legal
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
    cookiePolicy: 'Cookie Policy',
    privacyPreferences: 'Privacy Preferences',
    
    // Consent
    acceptAll: 'Accept All',
    rejectAll: 'Reject All',
    managePreferences: 'Manage Preferences',
    consentTitle: 'Privacy Settings',
    consentDescription: 'We use cookies and similar technologies to improve your experience and personalize ads.',
    analytics: 'Analytics',
    advertising: 'Advertising',
    necessary: 'Necessary',
    save: 'Save',
    
    // Meta descriptions
    metaDescription: 'Convert and compress images and documents (JPG, PNG, PDF, DOCX, etc.) for free with Convertly. Fast, secure, and browser-based. Available in English and Portuguese.',
    metaKeywords: 'online image converter, PDF converter, compress image online, JPG to PNG converter, document converter, Convertly tool, free file conversion, image compressor'
  },
  es: {
    // Header & Navigation
    title: 'Convertly – Conversor y Compresor de Archivos Online Gratuito',
    subtitle: 'Convierte y comprime imágenes y documentos gratis. Rápido, seguro, sin límites.',
    home: 'Inicio',
    about: 'Acerca de',
    faq: 'FAQ',
    privacy: 'Privacidad',
    terms: 'Términos',
    cookies: 'Cookies',
    
    // Tools
    imageConverter: 'Conversor de Imagen',
    imageCompressor: 'Compresor de Imagen',
    documentConverter: 'Conversor de Documento',
    
    // Upload
    uploadFiles: 'Subir Archivos',
    chooseFiles: 'Elegir Archivos',
    dragDrop: 'Arrastra y suelta archivos aquí o haz clic para seleccionar',
    supportedFormats: 'Formatos soportados',
    maxFileSize: 'Tamaño máximo de archivo',
    
    // Conversion
    convertTo: 'Convertir a',
    quality: 'Calidad',
    high: 'Alta',
    medium: 'Media',
    low: 'Baja',
    convert: 'Convertir',
    converting: 'Convirtiendo...',
    inQueue: 'En cola',
    completed: 'Completado',
    download: 'Descargar',
    downloadAll: 'Descargar Todo',
    convertAnother: 'Convertir Otro Archivo',
    
    // Status
    processing: 'Procesando',
    ready: 'Listo',
    error: 'Error',
    success: 'Éxito',
    
    // Ads & Monetization
    freeUnlimited: 'Convertly es gratuito e ilimitado gracias a los anuncios',
    supportUs: 'Apóyanos permitiendo anuncios',
    
    // File info
    fileName: 'Nombre del archivo',
    fileSize: 'Tamaño',
    fileType: 'Tipo',
    originalSize: 'Tamaño original',
    compressedSize: 'Tamaño comprimido',
    compressionRatio: 'Ratio de compresión',
    reduced: 'Reducido en',
    
    // Errors
    fileTooBig: 'Archivo demasiado grande. Máximo',
    invalidFormat: 'Formato de archivo no soportado',
    conversionError: 'Error de conversión. Inténtalo de nuevo.',
    uploadError: 'Error de subida. Inténtalo de nuevo.',
    
    // Legal
    privacyPolicy: 'Política de Privacidad',
    termsOfUse: 'Términos de Uso',
    cookiePolicy: 'Política de Cookies',
    privacyPreferences: 'Preferencias de Privacidad',
    
    // Consent
    acceptAll: 'Aceptar Todo',
    rejectAll: 'Rechazar Todo',
    managePreferences: 'Gestionar Preferencias',
    consentTitle: 'Configuración de Privacidad',
    consentDescription: 'Usamos cookies y tecnologías similares para mejorar tu experiencia y personalizar anuncios.',
    analytics: 'Analytics',
    advertising: 'Publicidad',
    necessary: 'Necesarias',
    save: 'Guardar',
    
    // Meta descriptions
    metaDescription: 'Convierte y comprime imágenes y documentos (JPG, PNG, PDF, DOCX, etc.) gratis con Convertly. Rápido, seguro y desde el navegador. Disponible en español e inglés.',
    metaKeywords: 'conversor de imagen online, conversor PDF, comprimir imagen online, convertir JPG a PNG, conversor de documentos, herramienta Convertly, conversión gratuita, compresor de imagen'
  },
  ru: {
    // Header & Navigation
    title: 'Convertly – Бесплатный Онлайн Конвертер и Компрессор Файлов',
    subtitle: 'Конвертируйте и сжимайте изображения и документы бесплатно. Быстро, безопасно, без ограничений.',
    home: 'Главная',
    about: 'О нас',
    faq: 'FAQ',
    privacy: 'Конфиденциальность',
    terms: 'Условия',
    cookies: 'Куки',
    
    // Tools
    imageConverter: 'Конвертер Изображений',
    imageCompressor: 'Компрессор Изображений',
    documentConverter: 'Конвертер Документов',
    
    // Upload
    uploadFiles: 'Загрузить Файлы',
    chooseFiles: 'Выбрать Файлы',
    dragDrop: 'Перетащите файлы сюда или нажмите для выбора',
    supportedFormats: 'Поддерживаемые форматы',
    maxFileSize: 'Максимальный размер файла',
    
    // Conversion
    convertTo: 'Конвертировать в',
    quality: 'Качество',
    high: 'Высокое',
    medium: 'Среднее',
    low: 'Низкое',
    convert: 'Конвертировать',
    converting: 'Конвертация...',
    inQueue: 'В очереди',
    completed: 'Завершено',
    download: 'Скачать',
    downloadAll: 'Скачать Все',
    convertAnother: 'Конвертировать Другой Файл',
    
    // Status
    processing: 'Обработка',
    ready: 'Готово',
    error: 'Ошибка',
    success: 'Успешно',
    
    // Ads & Monetization
    freeUnlimited: 'Convertly бесплатен и неограничен благодаря рекламе',
    supportUs: 'Поддержите нас, разрешив рекламу',
    
    // File info
    fileName: 'Имя файла',
    fileSize: 'Размер',
    fileType: 'Тип',
    originalSize: 'Исходный размер',
    compressedSize: 'Сжатый размер',
    compressionRatio: 'Коэффициент сжатия',
    reduced: 'Уменьшено на',
    
    // Errors
    fileTooBig: 'Файл слишком большой. Максимум',
    invalidFormat: 'Неподдерживаемый формат файла',
    conversionError: 'Ошибка конвертации. Попробуйте снова.',
    uploadError: 'Ошибка загрузки. Попробуйте снова.',
    
    // Legal
    privacyPolicy: 'Политика Конфиденциальности',
    termsOfUse: 'Условия Использования',
    cookiePolicy: 'Политика Куки',
    privacyPreferences: 'Настройки Конфиденциальности',
    
    // Consent
    acceptAll: 'Принять Все',
    rejectAll: 'Отклонить Все',
    managePreferences: 'Управлять Настройками',
    consentTitle: 'Настройки Конфиденциальности',
    consentDescription: 'Мы используем куки и аналогичные технологии для улучшения вашего опыта и персонализации рекламы.',
    analytics: 'Аналитика',
    advertising: 'Реклама',
    necessary: 'Необходимые',
    save: 'Сохранить',
    
    // Meta descriptions
    metaDescription: 'Конвертируйте и сжимайте изображения и документы (JPG, PNG, PDF, DOCX и др.) бесплатно с Convertly. Быстро, безопасно, в браузере. Доступно на русском и английском.',
    metaKeywords: 'онлайн конвертер изображений, конвертер PDF, сжать изображение онлайн, конвертер JPG в PNG, конвертер документов, инструмент Convertly, бесплатная конвертация, компрессор изображений'
  }
};