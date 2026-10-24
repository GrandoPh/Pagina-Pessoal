/* ---------- Tema: claro, escuro e automático ---------- */
const CHAVE = 'tema';
const raiz = document.documentElement;
const media = window.matchMedia('(prefers-color-scheme: dark)');

function temaResolvido(estado) {
  if (estado === 'escuro') return 'dark';
  if (estado === 'claro') return 'light';
  return media.matches ? 'dark' : 'light';
}

function aplicar(estado) {
  const tema = temaResolvido(estado);
  raiz.dataset.theme = tema;
  raiz.style.colorScheme = tema;

  try {
    localStorage.setItem(CHAVE, estado);
  } catch (e) {
    /* armazenamento indisponível: segue em memória */
  }

  document.querySelectorAll('[data-tema]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.tema === estado));
  });

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', tema === 'dark' ? '#17140F' : '#F4EBD8');
}

let estadoAtual = 'auto';
try {
  estadoAtual = localStorage.getItem(CHAVE) || 'auto';
} catch (e) {
  estadoAtual = 'auto';
}

document.querySelectorAll('[data-tema]').forEach((btn) => {
  btn.addEventListener('click', () => {
    estadoAtual = btn.dataset.tema;
    aplicar(estadoAtual);
  });
});

media.addEventListener('change', () => {
  if (estadoAtual === 'auto') aplicar('auto');
});

aplicar(estadoAtual);
