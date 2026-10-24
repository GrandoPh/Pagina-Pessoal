/* ---------- Tema: claro, escuro e automático ---------- */
import { comTransicao } from './transition.js';

const CHAVE = 'tema';
const raiz = document.documentElement;
const media = window.matchMedia('(prefers-color-scheme: dark)');

function temaResolvido(estado) {
  if (estado === 'escuro') return 'dark';
  if (estado === 'claro') return 'light';
  return media.matches ? 'dark' : 'light';
}

function pintar(estado) {
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

function aplicar(estado, { animar = true } = {}) {
  if (animar) comTransicao(() => pintar(estado));
  else pintar(estado);
}

let estadoAtual = 'auto';
try {
  estadoAtual = localStorage.getItem(CHAVE) || 'auto';
} catch (e) {
  estadoAtual = 'auto';
}

document.querySelectorAll('[data-tema]').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.dataset.tema === estadoAtual) return;
    estadoAtual = btn.dataset.tema;
    aplicar(estadoAtual);
  });
});

media.addEventListener('change', () => {
  if (estadoAtual === 'auto') aplicar('auto');
});

/* Primeira pintura não anima: evita crossfade no carregamento */
aplicar(estadoAtual, { animar: false });
