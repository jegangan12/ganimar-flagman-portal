/**
 * GANIMAR Flagship Portal - Data Source
 * Rule: NO trailing periods in titles, subtitles, badges, card descriptions
 * Статьи блога здесь не хранятся: они статические страницы в /blog/ (нужно для индексации)
 * Превью - только реальные экраны работающих продуктов или отрисованные обложки фактов
 */

window.GANIMAR_DATA = {
  // 1. Два главных направления
  branches: [
    {
      id: 'marketing',
      title: 'ИИ-маркетинг',
      domain: 'ganimarketing.ru',
      desc: 'Комплексные стратегии, воронки продаж и сквозная аналитика: считаю деньги, а не клики. Лучший результат - 852 млн ₽ выручки за сезон при окупаемости интернет-маркетинга ×23 по Roistat',
      url: 'https://ganimarketing.ru',
      features: ['Комплексные стратегии', 'Воронки продаж', 'Сквозная аналитика', 'Трафик в 15+ источниках'],
      ctaText: 'Перейти на ganimarketing.ru',
      preview: 'assets/previews/branch-marketing.jpg'
    },
    {
      id: 'development',
      title: 'ИИ-разработка',
      domain: 'cases.ganimar.ru',
      desc: 'Собираю работающие продукты: агентные системы и нейросотрудники, CRM и LMS, порталы и сайты с автонаполняемыми блогами под SEO, GEO и AEO. В витрине 51 проект, 24 открываются по прямой ссылке',
      url: 'https://cases.ganimar.ru',
      features: ['Агенты и нейросотрудники', 'CRM и LMS', 'Порталы и сайты', 'Автоблоги SEO / GEO / AEO'],
      ctaText: 'Смотреть 51 проект',
      preview: 'assets/previews/branch-dev.jpg'
    }
  ],

  // 1b. Что ещё живёт в экосистеме - строкой, без карточек
  ecosystemExtra: [
    { title: 'Школа маркетинга и ИИ', note: 'готовится к запуску', url: null },
    { title: 'Платформа GVIDERA', note: 'онлайн-практикумы с ИИ-наставником', url: 'https://gvidera.ru' },
    { title: 'Ganimar Media и лейбл', note: 'генеративный саунд-дизайн и релизы', url: 'https://aimusican.ru' }
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

  // 4. Избранные кейсы - только проверенные цифры
  cases: [
    {
      id: 'mfua',
      title: 'МФЮА: 852 млн ₽ выручки',
      niche: 'Образование',
      metrics: '852 млн ₽ за сезон · ×23 по Roistat',
      desc: 'Сквозная воронка абитуриента: 15+ источников трафика, автоматизация колл-центра и учёт до зачисления при бюджете интернет-каналов 37 млн ₽',
      tags: ['Контекст', 'Таргет', 'Сквозная аналитика', 'CRM-маркетинг'],
      preview: 'assets/previews/case-mfua.jpg',
      url: 'https://cases.ganimar.ru'
    },
    {
      id: 'byyd',
      title: 'МФЮА × BYYD в Likee',
      niche: 'Медийная кампания',
      metrics: 'VTR 80,34% · охват 210 000+',
      desc: 'In-app видео с переходом на посадочную: время на сайте 1:52 - в 3,5 раза выше рынка, визиты после клика 72,12%. Кейс разобран в AdIndex и Sostav',
      tags: ['In-app видео', 'Likee', 'Медийный охват', 'Качество трафика'],
      preview: 'assets/previews/case-byyd.jpg',
      url: 'https://cases.ganimar.ru'
    },
    {
      id: '5sil',
      title: '«5 сил» И. Старковой',
      niche: 'Онлайн-школа',
      metrics: 'Выручка 5+ млн ₽ · ROI ×10',
      desc: 'Переработка подписной страницы, автоворонка и прогрев до вебинара: конверсия подписной выросла с 60 до 79%',
      tags: ['Запуск', 'Автоворонка', 'Подписная страница', 'Прогрев'],
      preview: 'assets/previews/case-5sil.jpg',
      url: 'https://cases.ganimar.ru'
    },
    {
      id: 'health',
      title: 'Запуск проекта здоровья',
      niche: 'Онлайн-образование',
      metrics: 'CPL 44 ₽ · 6 693 регистрации',
      desc: 'Связка таргета, чат-бота и автовебинарной воронки: бюджет 296 000 ₽ дал выручку около 1,33 млн ₽',
      tags: ['Таргет', 'Чат-бот', 'Автовебинар', 'Юнит-экономика'],
      preview: 'assets/previews/case-health.jpg',
      url: 'https://cases.ganimar.ru'
    }
  ],

  // 5. Лаборатория AI-продуктов - превью только с живых экранов
  products: [
    {
      id: 'yasno',
      name: 'ЯСНО',
      status: 'В проде',
      role: 'ИИ-куратор для онлайн-школ',
      desc: 'Отвечает студентам строго по материалам курса, ведёт журнал непонятых тем и показывает методисту, где люди спотыкаются. Пилот - школа Pauline Cake Club',
      preview: 'assets/previews/yasno.jpg',
      url: 'https://yasno-app.vercel.app'
    },
    {
      id: 'jarvis',
      name: 'ДЖАРВИС',
      status: 'В проде',
      role: 'Автономный ИИ-супер-агент',
      desc: 'Оркестратор отделов: агенты берут задачи, отчитываются и эскалируют владельцу. Живой поток событий, бюджеты моделей и пульт управления',
      preview: 'assets/previews/jarvis.jpg',
      url: 'https://cases.ganimar.ru'
    },
    {
      id: 'kondipro',
      name: 'КОНДИПРО',
      status: 'В проде',
      role: 'Платформа для кондитеров и Cake Show',
      desc: 'Расчёт себестоимости и прибыли, база клиентов и предоплат, календарь заказов и Telegram-бот, который напоминает о сборке и закупке',
      preview: 'assets/previews/kondipro.jpg',
      url: 'https://kondi-pro.ru'
    },
    {
      id: 'marqly',
      name: 'MARQLY',
      status: 'В проде',
      role: 'Мультиагентный ИИ-отдел маркетинга',
      desc: 'Сводка по маркетингу, экономика кампаний, генераторы текстов, картинок и сценариев для роликов в одном кабинете',
      preview: 'assets/previews/marqly.jpg',
      url: 'https://marklyai.ru'
    },
    {
      id: 'voiceiq',
      name: 'VOICEIQ',
      status: 'В проде',
      role: 'ИИ-контроль качества звонков',
      desc: 'Транскрибация разговора по ролям, автоматический скоринг качества и подсказки менеджеру во время сделки',
      preview: 'assets/previews/voiceiq.jpg',
      url: 'https://voiceiq-delta.vercel.app'
    },
    {
      id: 'edvista',
      name: 'EDVISTA',
      status: 'В проде',
      role: 'Каталог образования и ИИ-наставник',
      desc: 'Вузы, колледжи, онлайн-школы и курсы в одном каталоге с фильтрами, сравнением программ и подбором маршрута обучения',
      preview: 'assets/previews/edvista.jpg',
      url: 'https://cases.ganimar.ru'
    }
  ],

  // 6. Контакты и каналы - иконки в блоке контактов
  socials: [
    { id: 'telegram', title: 'Telegram', handle: '@ganimarketing', url: 'https://t.me/ganimarketing', icon: 'tg' },
    { id: 'whatsapp', title: 'WhatsApp', handle: '+7 916 483-77-13', url: 'https://wa.me/79164837713', icon: 'wa' },
    { id: 'phone', title: 'Позвонить', handle: '+7 916 483-77-13', url: 'tel:+79164837713', icon: 'phone' },
    { id: 'vk', title: 'ВКонтакте', handle: 'vk.ru/jegan', url: 'https://vk.ru/jegan', icon: 'vk' },
    { id: 'dzen', title: 'Дзен', handle: 'Канал о маркетинге и ИИ', url: 'https://dzen.ru/ganimarketing.ru', icon: 'dzen' },
    { id: 'tenchat', title: 'TenChat', handle: 'ganimarketing', url: 'https://tenchat.ru/ganimarketing', icon: 'tc' },
    { id: 'setka', title: 'Сетка', handle: 'Профиль', url: 'https://setka.ru/users/9878c02b-765e-46e9-8d97-54201257a46e', icon: 'st' },
    { id: 'threads', title: 'Threads', handle: '@ganimarketing', url: 'https://www.threads.com/@ganimarketing', icon: 'th' },
    { id: 'instagram', title: 'Instagram*', handle: '@ganimarketing', url: 'https://instagram.com/ganimarketing', icon: 'ig' }
  ]
};
