/* ---------- Menu mobile e header sticky ---------- */
const btn = document.querySelector('#menu-btn');
const painel = document.querySelector('#menu-painel');

if (btn && painel) {
  let ultimoFoco = null;

  const focaveis = () =>
    Array.from(painel.querySelectorAll('a[href], button')).filter(
      (el) => el.offsetParent !== null
    );

  function abrir() {
    ultimoFoco = document.activeElement;
    painel.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-aberto');
    const alvos = focaveis();
    if (alvos.length) alvos[0].focus();
  }

  function fechar({ devolverFoco = true } = {}) {
    painel.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-aberto');
    if (devolverFoco) (ultimoFoco || btn).focus();
  }

  btn.addEventListener('click', () => {
    if (painel.hidden) abrir();
    else fechar();
  });

  document.addEventListener('keydown', (ev) => {
    if (painel.hidden) return;

    if (ev.key === 'Escape') {
      ev.preventDefault();
      fechar();
      return;
    }

    if (ev.key === 'Tab') {
      const alvos = focaveis();
      if (!alvos.length) return;
      const primeiro = alvos[0];
      const ultimo = alvos[alvos.length - 1];

      if (ev.shiftKey && document.activeElement === primeiro) {
        ev.preventDefault();
        ultimo.focus();
      } else if (!ev.shiftKey && document.activeElement === ultimo) {
        ev.preventDefault();
        primeiro.focus();
      }
    }
  });

  painel.querySelectorAll('a[href]').forEach((link) => {
    link.addEventListener('click', () => fechar({ devolverFoco: false }));
  });

  window.addEventListener('resize', () => {
    if (!painel.hidden && window.innerWidth >= 1024) fechar({ devolverFoco: false });
  });
}

const header = document.querySelector('.site-header');
if (header) {
  const aoRolar = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  aoRolar();
  window.addEventListener('scroll', aoRolar, { passive: true });
}
