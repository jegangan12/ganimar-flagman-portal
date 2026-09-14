// Плавающая кнопка «наверх»: появляется после первого экрана.
// На телефоне прячется, пока под ней проезжают чипы соцсетей - иначе перекрывает их зону нажатия
(function () {
  var btn = document.getElementById('to-top');
  if (!btn) return;
  var show = function () {
    var past = window.scrollY >= window.innerHeight * 0.8;
    var clash = false;
    if (past && window.innerWidth <= 640) {
      var row = document.querySelector('.socials-row');
      if (row) {
        var r = row.getBoundingClientRect();
        clash = r.top < window.innerHeight && r.bottom > window.innerHeight - 72;
      }
    }
    btn.hidden = !past || clash;
  };
  window.addEventListener('scroll', show, { passive: true });
  window.addEventListener('resize', show, { passive: true });
  show();
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
