/* ---------- Reveal no scroll ---------- */
const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)');
const alvos = document.querySelectorAll('[data-reveal]');

if (reduzido.matches || !('IntersectionObserver' in window)) {
  alvos.forEach((el) => el.classList.add('is-visible'));
} else if (alvos.length) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add('is-visible');
        observador.unobserve(entrada.target);
      });
    },
    { threshold: 0.15 }
  );

  alvos.forEach((el) => observador.observe(el));
}

reduzido.addEventListener('change', (ev) => {
  if (ev.matches) alvos.forEach((el) => el.classList.add('is-visible'));
});
