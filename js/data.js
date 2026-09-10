/**
 * GANIMAR Flagship Portal - Data Source
 * Rule: NO trailing periods in titles, subtitles, badges, card descriptions
 * Статьи блога здесь не хранятся: они статические страницы в /blog/ (нужно для индексации)
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
      preview: 'assets/previews/branch-marketing.jpg'
    },
    {
      id: 'school',
      title: 'Школа маркетинга и ИИ',
      domain: 'Скоро',
      desc: 'Школа готовится к запуску',
      url: null,
      features: ['Системный маркетинг', 'AI-инструменты', 'Практика'],
      ctaText: 'Скоро',
      preview: 'assets/previews/branch-school.jpg'
    },
    {
      id: 'platform',
      title: 'Платформа GVIDERA',
      domain: 'gvidera.ru',
      desc: 'Платформа онлайн-практикумов и образовательных треков со встроенным AI-наставником и адаптивным обучением',
      url: 'https://gvidera.ru',
      features: ['Запущена в проде', 'AI-наставник 24/7', 'Геймификация', 'Интерактивные тренажеры'],
      ctaText: 'Открыть gvidera.ru',
      preview: 'assets/previews/branch-platform.jpg'
    },
    {
      id: 'media',
      title: 'Ganimar Media & Лейбл',
      domain: 'aimusican.ru',
      desc: 'Музыкальный лейбл, генеративный саунд-дизайн и AI-медиа продакшен на Яндекс Музыке и стримингах',
      url: 'https://aimusican.ru',
      features: ['Яндекс Музыка', 'AI-саундтреки', 'Медиа-продакшен', 'Стриминговые релизы'],
      ctaText: 'Слушать на aimusican.ru',
      preview: 'assets/previews/branch-media.jpg'
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
      url: 'https://me.ganimar.ru'
    },
    {
      id: 'cases',
      subdomain: 'cases.ganimar.ru',
      title: 'Витрина проектов',
      tag: '51 проект',
      target: 'Клиентам и партнерам',
      desc: 'Интерактивный каталог 51 собранного AI-продукта с живыми превью реальных экранов и доказанными метриками',
      url: 'https://cases.ganimar.ru'
    },
    {
      id: 'portfolio',
      subdomain: 'portfolio.ganimar.ru',
      title: 'Презентация-портфолио',
      tag: 'Deck',
      target: 'Со сцены и на питчах',
      desc: 'Интерактивная презентация экосистемы, технологического стека и флагманских внедрений',
      url: 'https://portfolio.ganimar.ru'
    },
    {
      id: 'cv',
      subdomain: 'cv.ganimar.ru',
      title: 'Профессиональное резюме',
      tag: 'Резюме',
      target: 'HR и инвесторам',
      desc: 'Полный профиль директора по маркетингу / Head of AI, карьерный путь, методология и твердые результаты',
      url: 'https://cv.ganimar.ru'
    }
  ],

  // 3. Твердые метрики (Что по фактам)
  statsGrid: [
    {
      badge: 'Выручка в найме',
      number: '1,2 млрд ₽',
      title: 'Пик оборота направления за сезон',
      desc: 'Оффлайн-образование: сезонный оборот до 1,2 млрд ₽'
    },
    {
      badge: 'Рекорд сезона',
      number: '852 млн ₽',
      title: 'Выручка за сезон приёмной кампании',
      desc: '852 млн ₽ выручки по данным Roistat'
    },
    {
      badge: 'Эффективность',
      number: '×23',
      title: 'Окупаемость интернет-маркетинга по Roistat',
      desc: '852 млн ₽ выручки при 37 млн ₽ бюджета интернет-каналов'
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
      number: 'С 2016',
      title: 'В онлайн-маркетинге',
      desc: 'Практика системного маркетинга и автоматизации продаж'
    },
    {
      badge: 'Мультиагенты',
      number: '24',
      title: 'Проекта с прямой ссылкой',
      desc: 'Из 51 программного проекта в витрине'
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
      url: 'https://cases.ganimar.ru'
    },
    {
      id: 'developer',
      title: 'Федеральный девелопер',
      niche: 'Недвижимость',
      metrics: '380+ млн ₽ продаж · ROMI 420%',
      desc: 'Квалификация лидов через чат-боты, гео-таргетинг и сквозной учет до сделки в Росреестре',
      tags: ['Недвижимость', 'Чат-боты', 'Сквозной учет', 'Лидогенерация'],
      preview: 'assets/previews/case-dev.jpg',
      url: 'https://cases.ganimar.ru'
    },
    {
      id: 'fmcg',
      title: 'FMCG и E-commerce сеть',
      niche: 'E-commerce',
      metrics: 'Триггерные рассылки и аналитика',
      desc: 'Мультиканальный трафик, персонализированные триггерные рассылки и предиктивная аналитика оттока',
      tags: ['E-commerce', 'LTV-рост', 'Триггеры', 'Предиктивный ИИ'],
      preview: 'assets/previews/case-fmcg.jpg',
      url: 'https://cases.ganimar.ru'
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
      url: 'https://cases.ganimar.ru'
    },
    {
      id: 'voiceiq',
      name: 'VOICEIQ',
      status: 'В проде',
      role: 'ИИ-контроль качества звонков (ОКК)',
      desc: 'Транскрибация по ролям, автоматический QA Scorecard и подсказки менеджеру по продажам в реальном времени',
      preview: 'assets/previews/voiceiq.jpg',
      url: 'https://cases.ganimar.ru'
    },
    {
      id: 'mvp-factory',
      name: 'MVP-FACTORY',
      status: 'В проде',
      role: 'Мультиагентная фабрика генерации MVP',
      desc: 'Автономный оркестратор из 10 специализированных агентов с единой дизайн-системой',
      preview: 'assets/previews/mvp-factory.jpg',
      url: 'https://cases.ganimar.ru'
    },
    {
      id: 'aimagenarium',
      name: 'AIMAGENARIUM',
      status: 'В проде',
      role: 'Генеративная медиа-студия и AI-продакшен',
      desc: 'Автоматизированный конвейер генерации визуального контента, обложек, видео и анимаций на базе нейросетей',
      preview: 'assets/previews/aimagenarium.jpg',
      url: 'https://cases.ganimar.ru'
    },
    {
      id: 'yasno',
      name: 'ЯСНО',
      status: 'В проде',
      role: 'ИИ-куратор для онлайн-школ',
      desc: 'Умный ассистент поверх образовательных платформ для моментальной поддержки учеников и аналитики',
      preview: 'assets/previews/yasno.jpg',
      url: 'https://cases.ganimar.ru'
    },
    {
      id: 'edvista',
      name: 'EdVista',
      status: 'В проде',
      role: 'Интеллектуальная LMS и AI-наставник',
      desc: 'Адаптивные образовательные треки, персонализированные домашние задания и сквозной мониторинг прогресса студентов',
      preview: 'assets/previews/edvista.jpg',
      url: 'https://cases.ganimar.ru'
    }
  ]
};
