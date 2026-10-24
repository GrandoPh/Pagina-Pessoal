/* ---------- Internacionalização PT/EN ---------- */
import { comTransicao } from './transition.js';

const CHAVE = 'idioma';
const SUPORTADOS = ['pt', 'en'];
const url = (idioma) => new URL(`../i18n/${idioma}.json`, import.meta.url);

const cache = new Map();
let atual = 'pt';
let dicionario = {};

async function carregar(idioma) {
  if (!cache.has(idioma)) {
    const resp = await fetch(url(idioma));
    if (!resp.ok) throw new Error(`i18n ${idioma}: ${resp.status}`);
    cache.set(idioma, await resp.json());
  }
  return cache.get(idioma);
}

function traduzirPagina(dic) {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const texto = dic[el.dataset.i18n];
    if (typeof texto === 'string') {
      el.textContent = texto;
    } else if (atual !== 'pt') {
      console.warn('[i18n] chave ausente:', el.dataset.i18n);
    }
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(',').forEach((par) => {
      const [attr, chave] = par.split(':').map((s) => s.trim());
      const valor = dic[chave];
      if (typeof valor === 'string') el.setAttribute(attr, valor);
    });
  });

  const pagina = document.body.dataset.pagina;
  if (pagina) {
    const titulo = dic[`meta.${pagina}.titulo`];
    const descricao = dic[`meta.${pagina}.desc`];
    if (titulo) document.title = titulo;
    const meta = document.querySelector('meta[name="description"]');
    if (descricao && meta) meta.setAttribute('content', descricao);
  }

  document.querySelectorAll('[data-idioma]').forEach((el) => {
    const ativo = el.dataset.idioma === atual;
    el.setAttribute('aria-current', String(ativo));
  });

  document.documentElement.lang = atual === 'en' ? 'en' : 'pt-BR';
}

async function definir(idioma, { atualizarUrl = true, animar = true } = {}) {
  if (!SUPORTADOS.includes(idioma)) idioma = 'pt';
  atual = idioma;

  try {
    localStorage.setItem(CHAVE, idioma);
  } catch (e) {
    /* armazenamento indisponível */
  }

  if (atualizarUrl) {
    const u = new URL(window.location.href);
    if (idioma === 'pt') u.searchParams.delete('lang');
    else u.searchParams.set('lang', idioma);
    history.replaceState(null, '', u);
  }

  dicionario = await carregar(idioma);

  const aplicarIdioma = () => {
    traduzirPagina(dicionario);
    document.dispatchEvent(
      new CustomEvent('idioma:mudou', { detail: { idioma, dic: dicionario } })
    );
  };

  if (animar) comTransicao(aplicarIdioma);
  else aplicarIdioma();
}

const parametro = new URLSearchParams(window.location.search).get('lang');
let salvo = null;
try {
  salvo = localStorage.getItem(CHAVE);
} catch (e) {
  salvo = null;
}

definir(parametro || salvo || 'pt', { atualizarUrl: false, animar: false }).catch((erro) => {
  console.warn('[i18n] falha ao carregar dicionário:', erro);
});

document.querySelectorAll('[data-idioma]').forEach((el) => {
  el.addEventListener('click', (ev) => {
    ev.preventDefault();
    if (el.dataset.idioma === atual) return;
    definir(el.dataset.idioma).catch((erro) => {
      console.warn('[i18n] falha ao trocar idioma:', erro);
    });
  });
});
