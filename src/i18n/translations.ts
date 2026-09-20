export type SupportedLanguage = 'en' | 'bn' | 'es' | 'hi' | 'ar';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
];

export interface TranslationDictionary {
  // Navigation
  navHome: string;
  navLatest: string;
  navUpdates: string;
  navGuides: string;
  navSports: string;
  navFaq: string;
  navAbout: string;
  navContact: string;
  navDownload: string;
  navSearchPlaceholder: string;
  navLanguage: string;

  // Hero Section
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroReadLatest: string;
  heroDownloadBtn: string;
  heroVerifiedNote: string;
  heroOfficialDomain: string;

  // Sections
  featuredBadge: string;
  latestArticlesTitle: string;
  latestArticlesSubtitle: string;
  allGuidesTitle: string;
  appUpdatesTitle: string;
  sportsCoverageTitle: string;
  faqTitle: string;
  aboutTitle: string;
  contactTitle: string;

  // Categories
  catAll: string;
  catUpdates: string;
  catGuides: string;
  catSports: string;
  catFeatures: string;
  catTroubleshooting: string;
  catNews: string;

  // Common UI
  readMore: string;
  readArticle: string;
  downloadVersion: string;
  viewAll: string;
  visitOfficialSite: string;
  officialSiteUrl: string;
  backToArticles: string;
  tableOfContents: string;
  share: string;
  copyLink: string;
  copied: string;
  relatedArticles: string;
  verifiedGuide: string;
  published: string;
  updated: string;
  searchResultCount: string;
  noResults: string;
  clearFilter: string;
  popularResources: string;

  // About Box in Article & Footer
  aboutAtvTitle: string;
  aboutAtvText: string;
  officialPortal: string;
  disclaimerText: string;
  copyrightText: string;

  // 3D Controls
  bg3dLabel: string;
  bgAllArena: string;
  bgFootball: string;
  bgBasketball: string;
  bgActive: string;
  bgPaused: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    navHome: 'Home',
    navLatest: 'Latest',
    navUpdates: 'App Updates',
    navGuides: 'Guides',
    navSports: 'Sports',
    navFaq: 'FAQ',
    navAbout: 'About',
    navContact: 'Contact',
    navDownload: 'Download ATV Sports',
    navSearchPlaceholder: 'Search articles, guides, updates (⌘K)...',
    navLanguage: 'Language',

    heroBadge: 'Official Content & Guide Hub',
    heroTitle: 'ATV Sports — Updates, Guides & Sports Content',
    heroSubtitle: 'Discover ATV Sports updates, app guides, features, troubleshooting tips and sports-related content in one place.',
    heroReadLatest: 'Read Latest',
    heroDownloadBtn: 'Download ATV Sports',
    heroVerifiedNote: 'Verified Official APK • Android 5.0+ & Smart TV Ready',
    heroOfficialDomain: 'Official Portal: atvsports.site',

    featuredBadge: 'Featured App Coverage',
    latestArticlesTitle: 'Latest Articles & Release Logs',
    latestArticlesSubtitle: 'Verified guides, technical walkthroughs, and sports insights for ATV Sports users.',
    allGuidesTitle: 'ATV Sports Installation & Setup Guides',
    appUpdatesTitle: 'Latest ATV Sports Updates',
    sportsCoverageTitle: 'Sports News, Match Schedules & Technology',
    faqTitle: 'Frequently Asked Questions',
    aboutTitle: 'About ATV Sports Blog',
    contactTitle: 'Contact ATV Sports Blog',

    catAll: 'All',
    catUpdates: 'App Updates',
    catGuides: 'Guides',
    catSports: 'Sports',
    catFeatures: 'Features',
    catTroubleshooting: 'Troubleshooting',
    catNews: 'News',

    readMore: 'Read Guide',
    readArticle: 'Read Article',
    downloadVersion: 'Download APK',
    viewAll: 'View All',
    visitOfficialSite: 'Visit Official Website',
    officialSiteUrl: 'https://atvsports.site/',
    backToArticles: 'Back to Articles',
    tableOfContents: 'Table of Contents',
    share: 'Share',
    copyLink: 'Copy Link',
    copied: 'Copied!',
    relatedArticles: 'Related Articles & Guides',
    verifiedGuide: 'Verified Factual Guide',
    published: 'Published',
    updated: 'Updated',
    searchResultCount: 'articles found',
    noResults: 'No matching articles found',
    clearFilter: 'Clear filter',
    popularResources: 'Popular Resources',

    aboutAtvTitle: 'About ATV Sports',
    aboutAtvText: 'ATV Sports is a sports-focused digital platform. Visit the official ATV Sports website for the latest app information and downloads.',
    officialPortal: 'Main official website: https://atvsports.site/',
    disclaimerText: 'ATV Sports Blog is an independent informational and documentation resource for ATV Sports. Not affiliated with Google, Apple, YouTube, or Amazon.',
    copyrightText: '© 2026 ATV Sports Blog. All rights reserved.',

    bg3dLabel: '3D Sports:',
    bgAllArena: 'All Arena',
    bgFootball: 'Football',
    bgBasketball: 'Basketball',
    bgActive: 'Active',
    bgPaused: 'Paused',
  },

  bn: {
    navHome: 'হোম',
    navLatest: 'সর্বশেষ',
    navUpdates: 'অ্যাপ আপডেট',
    navGuides: 'গাইড',
    navSports: 'খেলাধুলা',
    navFaq: 'প্রশ্নোত্তর',
    navAbout: 'সম্পর্কে',
    navContact: 'যোগাযোগ',
    navDownload: 'ATV Sports ডাউনলোড',
    navSearchPlaceholder: 'নিবন্ধ, গাইড, আপডেট অনুসন্ধান করুন (⌘K)...',
    navLanguage: 'ভাষা',

    heroBadge: 'অফিসিয়াল কন্টেন্ট ও গাইড হাব',
    heroTitle: 'ATV Sports — আপডেট, গাইড ও খেলাধুলার কন্টেন্ট',
    heroSubtitle: 'একই প্ল্যাটফর্মে পান ATV Sports-এর অফিসিয়াল আপডেট, ইনস্টলেশন গাইড, নতুন ফিচার এবং খেলার সময়সূচি।',
    heroReadLatest: 'সর্বশেষ পড়ুন',
    heroDownloadBtn: 'ATV Sports ডাউনলোড',
    heroVerifiedNote: 'যাচাইকৃত অফিসিয়াল APK • অ্যান্ড্রয়েড এবং স্মার্ট টিভি উপযোগী',
    heroOfficialDomain: 'অফিসিয়াল ওয়েবসাইট: atvsports.site',

    featuredBadge: 'নির্বাচিত কন্টেন্ট',
    latestArticlesTitle: 'সর্বশেষ নিবন্ধ ও রিলিজ লগ',
    latestArticlesSubtitle: 'ATV Sports ব্যবহারকারীদের জন্য নির্ভরযোগ্য গাইড, টেকনিক্যাল সহায়তা এবং খেলার আপডেট।',
    allGuidesTitle: 'ATV Sports ইনস্টলেশন ও সেটআপ গাইড',
    appUpdatesTitle: 'সর্বশেষ ATV Sports আপডেটসমূহ',
    sportsCoverageTitle: 'ক্রীড়া সংবাদ, ম্যাচের সময়সূচি ও প্রযুক্তি',
    faqTitle: 'সাধারণ প্রশ্নোত্তর (FAQ)',
    aboutTitle: 'ATV Sports Blog সম্পর্কে',
    contactTitle: 'আমাদের সাথে যোগাযোগ',

    catAll: 'সব',
    catUpdates: 'অ্যাপ আপডেট',
    catGuides: 'গাইড',
    catSports: 'খেলাধুলা',
    catFeatures: 'ফিচার',
    catTroubleshooting: 'সমস্যা সমাধান',
    catNews: 'সংবাদ',

    readMore: 'গাইড পড়ুন',
    readArticle: 'নিবন্ধ পড়ুন',
    downloadVersion: 'APK ডাউনলোড',
    viewAll: 'সবগুলো দেখুন',
    visitOfficialSite: 'অফিসিয়াল ওয়েবসাইট ভিজিট করুন',
    officialSiteUrl: 'https://atvsports.site/',
    backToArticles: 'নিবন্ধে ফিরে যান',
    tableOfContents: 'সূচিপত্র',
    share: 'শেয়ার করুন',
    copyLink: 'লিঙ্ক কপি করুন',
    copied: 'কপি হয়েছে!',
    relatedArticles: 'সম্পর্কিত নিবন্ধ ও গাইড',
    verifiedGuide: 'যাচাইকৃত তথ্যপূর্ণ গাইড',
    published: 'প্রকাশিত',
    updated: 'আপডেট করা হয়েছে',
    searchResultCount: 'টি ফলাফল পাওয়া গেছে',
    noResults: 'কোনো ফলাফল পাওয়া যায়নি',
    clearFilter: 'ফিল্টার মুছুন',
    popularResources: 'জনপ্রিয় লিংকসমূহ',

    aboutAtvTitle: 'ATV Sports সম্পর্কে',
    aboutAtvText: 'ATV Sports হলো একটি খেলাধুলা-কেন্দ্রিক ডিজিটাল প্ল্যাটফর্ম। অ্যাপের সর্বশেষ তথ্য এবং অফিসিয়াল ডাউনলোডের জন্য ATV Sports ওয়েবসাইট ভিজিট করুন।',
    officialPortal: 'মূল অফিসিয়াল ওয়েবসাইট: https://atvsports.site/',
    disclaimerText: 'ATV Sports Blog একটি স্বাধীন তথ্য ও গাইড প্রকাশনা। এটি Google, Apple, YouTube বা Amazon-এর সাথে কোনোভাবেই যুক্ত নয়।',
    copyrightText: '© ২০২৬ ATV Sports Blog. সর্বস্বত্ব সংরক্ষিত।',

    bg3dLabel: '৩ডি স্পোর্টস:',
    bgAllArena: 'সব ফিল্ড',
    bgFootball: 'ফুটবল',
    bgBasketball: 'বাস্কেটবল',
    bgActive: 'চলছে',
    bgPaused: 'বিরতি',
  },

  es: {
    navHome: 'Inicio',
    navLatest: 'Recientes',
    navUpdates: 'Actualizaciones',
    navGuides: 'Guías',
    navSports: 'Deportes',
    navFaq: 'Preguntas',
    navAbout: 'Acerca de',
    navContact: 'Contacto',
    navDownload: 'Descargar ATV Sports',
    navSearchPlaceholder: 'Buscar artículos, guías, novedades (⌘K)...',
    navLanguage: 'Idioma',

    heroBadge: 'Centro Oficial de Contenido y Guías',
    heroTitle: 'ATV Sports — Actualizaciones, Guías y Deportes',
    heroSubtitle: 'Descubre actualizaciones de la app ATV Sports, guías de instalación, funciones, solución de problemas y contenido deportivo en un solo lugar.',
    heroReadLatest: 'Leer Recientes',
    heroDownloadBtn: 'Descargar ATV Sports',
    heroVerifiedNote: 'APK Oficial Verificado • Compatible con Android y Smart TV',
    heroOfficialDomain: 'Sitio Oficial: atvsports.site',

    featuredBadge: 'Cobertura Destacada',
    latestArticlesTitle: 'Últimos Artículos y Registros de Versión',
    latestArticlesSubtitle: 'Guías verificadas, tutoriales técnicos y análisis deportivos para usuarios de ATV Sports.',
    allGuidesTitle: 'Guías de Instalación y Configuración de ATV Sports',
    appUpdatesTitle: 'Últimas Actualizaciones de ATV Sports',
    sportsCoverageTitle: 'Noticias Deportivas, Horarios de Partidos y Tecnología',
    faqTitle: 'Preguntas Frecuentes (FAQ)',
    aboutTitle: 'Acerca de ATV Sports Blog',
    contactTitle: 'Contacto con la Redacción',

    catAll: 'Todos',
    catUpdates: 'Actualizaciones',
    catGuides: 'Guías',
    catSports: 'Deportes',
    catFeatures: 'Funciones',
    catTroubleshooting: 'Solución de problemas',
    catNews: 'Noticias',

    readMore: 'Leer Guía',
    readArticle: 'Leer Artículo',
    downloadVersion: 'Descargar APK',
    viewAll: 'Ver Todos',
    visitOfficialSite: 'Visitar Sitio Oficial',
    officialSiteUrl: 'https://atvsports.site/',
    backToArticles: 'Volver a Artículos',
    tableOfContents: 'Tabla de Contenido',
    share: 'Compartir',
    copyLink: 'Copiar Enlace',
    copied: '¡Copiado!',
    relatedArticles: 'Artículos y Guías Relacionados',
    verifiedGuide: 'Guía Fáctica Verificada',
    published: 'Publicado',
    updated: 'Actualizado',
    searchResultCount: 'artículos encontrados',
    noResults: 'No se encontraron artículos',
    clearFilter: 'Limpiar filtro',
    popularResources: 'Recursos Populares',

    aboutAtvTitle: 'Acerca de ATV Sports',
    aboutAtvText: 'ATV Sports es una plataforma digital enfocada en deportes. Visite el sitio web oficial de ATV Sports para obtener la información más reciente de la app y descargas.',
    officialPortal: 'Sitio web oficial principal: https://atvsports.site/',
    disclaimerText: 'ATV Sports Blog es un portal informativo y de documentación independiente. No está afiliado a Google, Apple, YouTube ni Amazon.',
    copyrightText: '© 2026 ATV Sports Blog. Todos los derechos reservados.',

    bg3dLabel: 'Deportes 3D:',
    bgAllArena: 'Todo el Estadio',
    bgFootball: 'Fútbol',
    bgBasketball: 'Baloncesto',
    bgActive: 'Activo',
    bgPaused: 'Pausado',
  },

  hi: {
    navHome: 'होम',
    navLatest: 'नवीनतम',
    navUpdates: 'ऐप अपडेट',
    navGuides: 'गाइड्स',
    navSports: 'खेल',
    navFaq: 'सामान्य प्रश्न',
    navAbout: 'के बारे में',
    navContact: 'संपर्क करें',
    navDownload: 'ATV Sports डाउनलोड करें',
    navSearchPlaceholder: 'लेख, गाइड, अपडेट खोजें (⌘K)...',
    navLanguage: 'भाषा',

    heroBadge: 'आधिकारिक कंटेंट और गाइड केंद्र',
    heroTitle: 'ATV Sports — अपडेट, गाइड और खेल कंटेंट',
    heroSubtitle: 'ATV Sports ऐप के नवीनतम अपडेट, इंस्टॉलेशन गाइड, तकनीकी समाधान और खेल समाचार एक ही स्थान पर प्राप्त करें।',
    heroReadLatest: 'नवीनतम पढ़ें',
    heroDownloadBtn: 'ATV Sports डाउनलोड करें',
    heroVerifiedNote: 'सत्यापित आधिकारिक एपीके • एंड्रॉइड और स्मार्ट टीवी के अनुकूल',
    heroOfficialDomain: 'आधिकारिक पोर्टल: atvsports.site',

    featuredBadge: 'प्रमुख कवरेज',
    latestArticlesTitle: 'नवीनतम लेख और रिलीज नोट्स',
    latestArticlesSubtitle: 'ATV Sports उपयोगकर्ताओं के लिए सत्यापित तकनीकी गाइड और खेल विश्लेषण।',
    allGuidesTitle: 'ATV Sports इंस्टॉलेशन और सेटअप गाइड',
    appUpdatesTitle: 'नवीनतम ATV Sports अपडेट्स',
    sportsCoverageTitle: 'खेल समाचार, मैच शेड्यूल और ब्रॉडकास्ट तकनीक',
    faqTitle: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',
    aboutTitle: 'ATV Sports Blog के बारे में',
    contactTitle: 'संपादकीय टीम से संपर्क',

    catAll: 'सभी',
    catUpdates: 'ऐप अपडेट',
    catGuides: 'गाइड्स',
    catSports: 'खेल',
    catFeatures: 'सुविधाएं',
    catTroubleshooting: 'समस्या निवारण',
    catNews: 'समाचार',

    readMore: 'गाइड पढ़ें',
    readArticle: 'लेख पढ़ें',
    downloadVersion: 'APK डाउनलोड करें',
    viewAll: 'सभी देखें',
    visitOfficialSite: 'आधिकारिक वेबसाइट देखें',
    officialSiteUrl: 'https://atvsports.site/',
    backToArticles: 'लेखों पर वापस जाएं',
    tableOfContents: 'विषय सूची',
    share: 'साझा करें',
    copyLink: 'लिंक कॉपी करें',
    copied: 'कॉपी किया गया!',
    relatedArticles: 'संबंधित लेख और गाइड',
    verifiedGuide: 'सत्यापित तथ्यात्मक गाइड',
    published: 'प्रकाशित',
    updated: 'अपडेटेड',
    searchResultCount: 'लेख मिले',
    noResults: 'कोई लेख नहीं मिला',
    clearFilter: 'फ़िल्टर हटाएं',
    popularResources: 'लोकप्रिय लिंक',

    aboutAtvTitle: 'ATV Sports के बारे में',
    aboutAtvText: 'ATV Sports एक खेल-केंद्रित डिजिटल प्लेटफॉर्म है। नवीनतम ऐप जानकारी और डाउनलोड के लिए आधिकारिक ATV Sports वेबसाइट पर जाएं।',
    officialPortal: 'मुख्य आधिकारिक वेबसाइट: https://atvsports.site/',
    disclaimerText: 'ATV Sports Blog एक स्वतंत्र सूचनात्मक वेबसाइट है। यह Google, Apple, YouTube या Amazon से संबद्ध नहीं है।',
    copyrightText: '© 2026 ATV Sports Blog. सर्वाधिकार सुरक्षित।',

    bg3dLabel: '3D खेल:',
    bgAllArena: 'पूरा मैदान',
    bgFootball: 'फुटबॉल',
    bgBasketball: 'बास्केटबॉल',
    bgActive: 'सक्रिय',
    bgPaused: 'रुका हुआ',
  },

  ar: {
    navHome: 'الرئيسية',
    navLatest: 'الأحدث',
    navUpdates: 'تحديثات التطبيق',
    navGuides: 'الأدلة',
    navSports: 'الرياضة',
    navFaq: 'الأسئلة الشائعة',
    navAbout: 'حول الموقع',
    navContact: 'اتصل بنا',
    navDownload: 'تحميل ATV Sports',
    navSearchPlaceholder: 'ابحث عن المقالات والأدلة والتحديثات (⌘K)...',
    navLanguage: 'اللغة',

    heroBadge: 'مركز المحتوى والأدلة الرسمي',
    heroTitle: 'ATV Sports — التحديثات والأدلة والمحتوى الرياضي',
    heroSubtitle: 'اكتشف تحديثات تطبيق ATV Sports، وأدلة التثبيت، والميزات، وحلول المشكلات، والمحتوى الرياضي في مكان واحد.',
    heroReadLatest: 'اقرأ الأحدث',
    heroDownloadBtn: 'تحميل ATV Sports',
    heroVerifiedNote: 'ملف APK رسمي تم التحقق منه • متوافق مع Android و Smart TV',
    heroOfficialDomain: 'البوابة الرسمية: atvsports.site',

    featuredBadge: 'تغطية مميزة',
    latestArticlesTitle: 'أحدث المقالات وسجلات الإصدار',
    latestArticlesSubtitle: 'أدلة موثقة، وشروحات تقنية، ورؤى رياضية لمستخدمي ATV Sports.',
    allGuidesTitle: 'أدلة تثبيت وإعداد ATV Sports',
    appUpdatesTitle: 'أحدث تحديثات ATV Sports',
    sportsCoverageTitle: 'الأخبار الرياضية، وجداول المباريات، وتقنيات البث',
    faqTitle: 'الأسئلة الشائعة (FAQ)',
    aboutTitle: 'حول مدونة ATV Sports',
    contactTitle: 'اتصل بهيئة التحرير',

    catAll: 'الكل',
    catUpdates: 'تحديثات التطبيق',
    catGuides: 'الأدلة',
    catSports: 'الرياضة',
    catFeatures: 'الميزات',
    catTroubleshooting: 'استكشاف الأخطاء',
    catNews: 'الأخبار',

    readMore: 'قراءة الدليل',
    readArticle: 'قراءة المقال',
    downloadVersion: 'تحميل APK',
    viewAll: 'عرض الكل',
    visitOfficialSite: 'زيارة الموقع الرسمي',
    officialSiteUrl: 'https://atvsports.site/',
    backToArticles: 'العودة إلى المقالات',
    tableOfContents: 'جدول المحتويات',
    share: 'مشاركة',
    copyLink: 'نسخ الرابط',
    copied: 'تم النسخ!',
    relatedArticles: 'مقالات وأدلة ذات صلة',
    verifiedGuide: 'دليل واقعي معتمد',
    published: 'نُشر في',
    updated: 'تم التحديث في',
    searchResultCount: 'مقالات تم العثور عليها',
    noResults: 'لم يتم العثور على مقالات مطابقة',
    clearFilter: 'إلغاء التصفية',
    popularResources: 'روابط هامة',

    aboutAtvTitle: 'حول ATV Sports',
    aboutAtvText: 'ATV Sports منصة رقمية متخصصة في الرياضة. قم بزيارة الموقع الرسمي للحصول على أحدث إصدارات التطبيق والتحميلات.',
    officialPortal: 'الموقع الرسمي الرئيسي: https://atvsports.site/',
    disclaimerText: 'مدونة ATV Sports هي مورد معلومات وتوثيق مستقل. ليست تابعة لشركة Google أو Apple أو YouTube أو Amazon.',
    copyrightText: '© 2026 ATV Sports Blog. جميع الحقوق محفوظة.',

    bg3dLabel: 'رياضة 3D:',
    bgAllArena: 'جميع الملاعب',
    bgFootball: 'كرة القدم',
    bgBasketball: 'كرة السلة',
    bgActive: 'نشط',
    bgPaused: 'متوقف',
  },
};
