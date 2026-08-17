/**
 * GANIMAR Flagship Portal — Data Source
 * Rule: NO trailing periods in titles, subtitles, badges, card descriptions
 */

window.GANIMAR_DATA = {
  // 1. Ветки экосистемы
  branches: [
    {
      id: 'marketing',
      title: 'Системный маркетинг',
      domain: 'ganimarketing.ru',
      desc: 'Услуги стратегического маркетинга, сквозной аналитики, настройки воронок и внедрения нейросотрудников под ключ',
      url: 'https://ganimarketing.ru',
      features: ['Сквозная аналитика', 'Управление трафиком', 'Нейросотрудники', 'Автоворонки продаж'],
      ctaText: 'Перейти на ganimarketing.ru',
      preview: 'assets/previews/case-dev.jpg'
    },
    {
      id: 'school',
      title: 'Школа маркетинга и ИИ',
      domain: 'ganimarschool.ru',
      desc: 'Практическое обучение системному маркетингу, вайб-кодингу и созданию AI-агентов без сложного программирования',
      url: 'https://ganimarschool.ru',
      features: ['Вайб-кодинг', 'Мультиагентные системы', 'Промпт-инжиниринг', 'Практика на реальных кейсах'],
      ctaText: 'Перейти на ganimarschool.ru',
      preview: 'assets/previews/blog-1.jpg'
    },
    {
      id: 'platform',
      title: 'Платформа GVIDERA',
      domain: 'gvidera.ru',
      desc: 'Платформа онлайн-практикумов и образовательных треков со встроенным AI-наставником и адаптивным обучением',
      url: 'https://gvidera.ru',
      features: ['Запущена в проде', 'AI-наставник 24/7', 'Геймификация', 'Интерактивные тренажеры'],
      ctaText: 'Открыть gvidera.ru',
      preview: 'assets/previews/edvista.jpg'
    },
    {
      id: 'media',
      title: 'Ganimar Media & Лейбл',
      domain: 'aimusican.ru',
      desc: 'Музыкальный лейбл, генеративный саунд-дизайн и AI-медиа продакшен на Яндекс Музыке и стримингах',
      url: 'https://aimusican.ru',
      features: ['Яндекс Музыка', 'AI-саундтреки', 'Медиа-продакшен', 'Стриминговые релизы'],
      ctaText: 'Слушать на aimusican.ru',
      preview: 'assets/previews/aimagenarium.jpg'
    }
  ],

  // 2. Личные витрины на поддоменах
  subdomains: [
    {
      id: 'vizitka',
      subdomain: 'me.ganimar.ru',
      title: 'Визитка Mini App',
      tag: 'Mini App',
      target: 'После живого знакомства',
      desc: 'Интерактивный Mini App: каталог нейроактивов, бронирование слотов, отзывы клиентов и персональный профиль',
      url: 'https://ganimar-vizitka.vercel.app'
    },
    {
      id: 'cases',
      subdomain: 'cases.ganimar.ru',
      title: 'Витрина проектов',
      tag: '51 проект',
      target: 'Клиентам и партнерам',
      desc: 'Интерактивный каталог 51 собранного AI-продукта с живыми превью реальных экранов и доказанными метриками',
      url: 'https://ganimar-cases.vercel.app'
    },
    {
      id: 'portfolio',
      subdomain: 'portfolio.ganimar.ru',
      title: 'Презентация-портфолио',
      tag: 'Deck',
      target: 'Со сцены и на питчах',
      desc: 'Интерактивная презентация экосистемы, технологического стека и флагманских внедрений',
      url: 'https://portfolio-ganimar.vercel.app'
    },
    {
      id: 'cv',
      subdomain: 'cv.ganimar.ru',
      title: 'Профессиональное резюме',
      tag: 'Резюме',
      target: 'HR и инвесторам',
      desc: 'Полный профиль директора по маркетингу / Head of AI, карьерный путь, методология и твердые результаты',
      url: 'https://resume-ganimar.vercel.app'
    }
  ],

  // 3. Твердые метрики (Что по фактам)
  statsGrid: [
    {
      badge: 'Выручка в найме',
      number: '1,2 млрд ₽',
      title: 'Ex обороты под управлением в найме',
      desc: 'Суммарный объем продаж в федеральных сетях и проектах'
    },
    {
      badge: 'Рекорд сезона',
      number: '852 млн ₽',
      title: 'Выручка МФЮА за сезон',
      desc: 'Привлечение абитуриентов и рост набора при снижении CPL'
    },
    {
      badge: 'Эффективность',
      number: '+160%',
      title: 'Лучший показатель ROMI',
      desc: 'Окупаемость инвестиций в сквозной мультиканальный маркетинг'
    },
    {
      badge: 'AI-продукты',
      number: '51',
      title: 'AI-продукт собран',
      desc: 'Мультиагентные системы, нейросотрудники и сервисы'
    },
    {
      badge: 'Бюджеты',
      number: '75+ млн ₽',
      title: 'Опыт управления трафиком',
      desc: 'Успешно освоены в 15+ источниках мультиканального трафика'
    },
    {
      badge: 'Скорость',
      number: '−30%',
      title: 'Сокращение цикла сделки',
      desc: 'За счет умных ИИ-ассистентов и мгновенной квалификации лидов'
    },
    {
      badge: 'Опыт',
      number: '15 лет',
      title: 'В маркетинге и продажах',
      desc: 'Практический опыт построения и масштабирования систем'
    },
    {
      badge: 'Мультиагенты',
      number: '100%',
      title: 'Автономная экосистема',
      desc: 'Сквозная синхронизация агентов и инструментов'
    }
  ],

  // 4. Избранные кейсы
  cases: [
    {
      id: 'mfua',
      title: 'МФЮА: 852 млн ₽ выручки',
      niche: 'Образование',
      metrics: '852 млн ₽ за сезон · CPL −28%',
      desc: 'Сквозная воронка привлечения абитуриентов, автоматизация колл-центра и омниканальный ретаргетинг',
      tags: ['Контекст', 'Таргет', 'Сквозная аналитика', 'CRM-маркетинг'],
      preview: 'assets/previews/case-mfua.jpg',
      url: 'https://ganimar-cases.vercel.app'
    },
    {
      id: 'developer',
      title: 'Федеральный девелопер',
      niche: 'Недвижимость',
      metrics: '380+ млн ₽ продаж · ROMI 420%',
      desc: 'Квалификация лидов через чат-боты, гео-таргетинг и сквозной учет до сделки в Росреестре',
      tags: ['Недвижимость', 'Чат-боты', 'Сквозной учет', 'Лидогенерация'],
      preview: 'assets/previews/case-dev.jpg',
      url: 'https://ganimar-cases.vercel.app'
    },
    {
      id: 'fmcg',
      title: 'FMCG и E-commerce сеть',
      niche: 'E-commerce',
      metrics: '+160% ROMI · LTV +45%',
      desc: 'Мультиканальный трафик, персонализированные триггерные рассылки и предиктивная аналитика оттока',
      tags: ['E-commerce', 'LTV-рост', 'Триггеры', 'Предиктивный ИИ'],
      preview: 'assets/previews/case-fmcg.jpg',
      url: 'https://ganimar-cases.vercel.app'
    }
  ],

  // 5. Лаборатория AI-продуктов
  products: [
    {
      id: 'marqly',
      name: 'MARQLY',
      status: 'В проде',
      role: 'Мультиагентный ИИ-отдел маркетинга',
      desc: 'Комплексная система из аналитика, стратега, копирайтера, дизайнера и публикатора в едином контуре',
      preview: 'assets/previews/marqly.jpg',
      url: 'https://ganimar-cases.vercel.app'
    },
    {
      id: 'voiceiq',
      name: 'VOICEIQ',
      status: 'В проде',
      role: 'ИИ-контроль качества звонков (ОКК)',
      desc: 'Транскрибация по ролям, автоматический QA Scorecard и подсказки менеджеру по продажам в реальном времени',
      preview: 'assets/previews/voiceiq.jpg',
      url: 'https://ganimar-cases.vercel.app'
    },
    {
      id: 'mvp-factory',
      name: 'MVP-FACTORY',
      status: 'В проде',
      role: 'Мультиагентная фабрика генерации MVP',
      desc: 'Автономный оркестратор из 10 специализированных агентов с единой дизайн-системой',
      preview: 'assets/previews/mvp-factory.jpg',
      url: 'https://ganimar-cases.vercel.app'
    },
    {
      id: 'aimagenarium',
      name: 'AIMAGENARIUM',
      status: 'В проде',
      role: 'Генеративная медиа-студия и AI-продакшен',
      desc: 'Автоматизированный конвейер генерации визуального контента, обложек, видео и анимаций на базе нейросетей',
      preview: 'assets/previews/aimagenarium.jpg',
      url: 'https://ganimar-cases.vercel.app'
    },
    {
      id: 'yasno',
      name: 'ЯСНО',
      status: 'В проде',
      role: 'ИИ-куратор для онлайн-школ',
      desc: 'Умный ассистент поверх образовательных платформ для моментальной поддержки учеников и аналитики',
      preview: 'assets/previews/yasno.jpg',
      url: 'https://ganimar-cases.vercel.app'
    },
    {
      id: 'edvista',
      name: 'EdVista',
      status: 'В проде',
      role: 'Интеллектуальная LMS и AI-наставник',
      desc: 'Адаптивные образовательные треки, персонализированные домашние задания и сквозной мониторинг прогресса студентов',
      preview: 'assets/previews/edvista.jpg',
      url: 'https://ganimar-cases.vercel.app'
    }
  ],

  // 6. Статьи блога / Лаборатории
  blogPosts: [
    {
      id: 'blog-1',
      title: 'Как мы создали 51 AI-продукт за год: архитектура мультиагентных систем и вайб-кодинг',
      category: 'AI Инженерия',
      readTime: '6 мин',
      desc: 'Практический опыт перехода от ручной разработки к автономным мультиагентным пайплайнам и микросервисам',
      preview: 'assets/previews/blog-1.jpg',
      url: 'https://t.me/clients_inForbes'
    },
    {
      id: 'blog-2',
      title: 'Сквозная аналитика на 852 млн ₽ выручки: почему 90% дашбордов врут владельцу',
      category: 'Системный маркетинг',
      readTime: '8 мин',
      desc: 'Разбор ошибок в атрибуции, когортном анализе и сведении данных между CRM, трафиком и банком',
      preview: 'assets/previews/blog-2.jpg',
      url: 'https://t.me/clients_inForbes'
    },
    {
      id: 'blog-3',
      title: 'Нейросотрудники вместо раздувания штата: опыт внедрения ИИ-ОКК и автоворонок',
      category: 'Автоматизация продаж',
      readTime: '5 мин',
      desc: 'Как автоматический скоринг звонков и боты-квалификаторы сокращают цикл сделки на треть',
      preview: 'assets/previews/blog-3.jpg',
      url: 'https://t.me/clients_inForbes'
    }
  ]
};
