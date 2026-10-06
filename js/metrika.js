// Яндекс Метрика - грузится только после согласия посетителя (js/consent.js).
// Код из кабинета вынесен в файл: CSP сайта не пускает инлайн-скрипты (решение 13.09),
// а Метрика официально допускает подключение внешним файлом
// (yandex.ru/support/metrica/code/install-counter-csp)
(function () {
  var ID = 113481920;

  // Цели - JS-события. Идентификаторы заводятся в кабинете Метрики такими же
  var ЦЕЛИ = {
    канал: 'tg_channel',
    личка: 'tg_lichka',
    слово: 'kodovoe_slovo',
    дочитал: 'dochital_75'
  };
  var КАНАЛЫ = ['t.me/clients_inforbes', 't.me/neuromag_ai'];
  var ЛИЧКА = 't.me/ganimarketing';

  function цель(имя) {
    if (typeof window.ym === 'function') window.ym(ID, 'reachGoal', имя);
  }

  window.ganimarMetrika = function () {
    if (window.ganimarMetrika.запущена) return;
    window.ganimarMetrika.запущена = true;

    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) { return; }
      }
      k = e.createElement(t); a = e.getElementsByTagName(t)[0];
      k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=' + ID, 'ym');

    window.ym(ID, 'init', {
      ssr: true, webvisor: true, clickmap: true, ecommerce: 'dataLayer',
      referrer: document.referrer, url: location.href,
      accurateTrackBounce: true, trackLinks: true
    });

    // Переход в канал или в личку - по адресу ссылки, а не по разметке:
    // ссылки ставит и вёрстка, и публикатор статей завода
    document.addEventListener('click', function (событие) {
      var ссылка = событие.target.closest ? событие.target.closest('a[href]') : null;
      if (!ссылка) return;
      var адрес = (ссылка.getAttribute('href') || '').toLowerCase();
      if (адрес.indexOf(ЛИЧКА) !== -1) { цель(ЦЕЛИ.личка); return; }
      for (var n = 0; n < КАНАЛЫ.length; n++) {
        if (адрес.indexOf(КАНАЛЫ[n]) !== -1) { цель(ЦЕЛИ.канал); return; }
      }
    }, true);

    // Кодовое слово стоит в финале статьи в «ёлочках»: копирование выделения с ними
    // и есть намерение написать в личку
    document.addEventListener('copy', function () {
      var выделено = String(window.getSelection ? window.getSelection() : '');
      if (/«[^»]{2,60}»/.test(выделено)) цель(ЦЕЛИ.слово);
    });

    // Дочитывание - только на странице статьи, один раз
    var статья = document.querySelector('article');
    if (статья && /^\/blog\/[^/]+$/.test(location.pathname)) {
      var дочитано = false;
      window.addEventListener('scroll', function () {
        if (дочитано) return;
        var низ = статья.getBoundingClientRect();
        var прочитано = (window.innerHeight - низ.top) / Math.max(низ.height, 1);
        if (прочитано >= 0.75) { дочитано = true; цель(ЦЕЛИ.дочитал); }
      }, { passive: true });
    }
  };
})();
