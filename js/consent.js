// Согласие на cookies Яндекс Метрики. До «Принять» к Метрике не уходит ни одного запроса -
// так обещает политика cookie сайта (cookies.html, раздел 4)
(function () {
  var КЛЮЧ = 'ganimar_consent';
  var ГОД = 60 * 60 * 24 * 365;

  function выбор() {
    var найдено = document.cookie.match(new RegExp('(?:^|; )' + КЛЮЧ + '=(yes|no)'));
    return найдено ? найдено[1] : '';
  }

  function запомнить(значение) {
    document.cookie = КЛЮЧ + '=' + значение + '; max-age=' + ГОД + '; path=/; SameSite=Lax' +
      (location.protocol === 'https:' ? '; Secure' : '');
  }

  function запустить() {
    if (typeof window.ganimarMetrika === 'function') window.ganimarMetrika();
  }

  function показать() {
    var плашка = document.createElement('div');
    плашка.className = 'consent';
    плашка.setAttribute('role', 'dialog');
    плашка.setAttribute('aria-live', 'polite');
    плашка.setAttribute('aria-label', 'Согласие на cookies');

    var текст = document.createElement('p');
    текст.className = 'consent__text';
    текст.appendChild(document.createTextNode(
      'Сайт хочет включить Яндекс Метрику: она ставит cookies и записывает, как вы двигаетесь по странице. ' +
      'Без вашего согласия счётчик не загрузится. '));
    var политика = document.createElement('a');
    политика.href = '/cookies';
    политика.textContent = 'Подробнее о cookies';
    текст.appendChild(политика);

    var кнопки = document.createElement('div');
    кнопки.className = 'consent__actions';
    var нет = document.createElement('button');
    нет.type = 'button';
    нет.className = 'consent__btn';
    нет.textContent = 'Отказаться';
    var да = document.createElement('button');
    да.type = 'button';
    да.className = 'consent__btn consent__btn--yes';
    да.textContent = 'Принять';
    кнопки.appendChild(нет);
    кнопки.appendChild(да);

    плашка.appendChild(текст);
    плашка.appendChild(кнопки);
    document.body.appendChild(плашка);

    нет.addEventListener('click', function () { запомнить('no'); плашка.remove(); });
    да.addEventListener('click', function () { запомнить('yes'); плашка.remove(); запустить(); });
  }

  // Ссылка «изменить выбор» на странице политики: data-consent-reset
  document.addEventListener('click', function (событие) {
    var к = событие.target.closest ? событие.target.closest('[data-consent-reset]') : null;
    if (!к) return;
    событие.preventDefault();
    document.cookie = КЛЮЧ + '=; max-age=0; path=/';
    if (!document.querySelector('.consent')) показать();
  });

  var текущий = выбор();
  if (текущий === 'yes') запустить();
  else if (!текущий) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', показать);
    else показать();
  }
})();
