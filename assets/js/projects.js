/* ---------- Projetos: dados, listagem e filtro ---------- */

/**
 * Para publicar um projeto:
 * 1. Copie projetos/exemplo.html para projetos/<slug>.html e preencha os TODO.
 * 2. Adicione um objeto abaixo.
 * 3. Comite os dois arquivos juntos.
 *
 * Exemplo:
 * {
 *   slug: "meu-projeto",
 *   indice: "01",
 *   titulo: { pt: "Meu projeto", en: "My project" },
 *   resumo: { pt: "Uma linha sobre ele.", en: "One line about it." },
 *   ano: 2026,
 *   categoria: "web", // web | dados | faculdade
 *   stack: ["HTML", "CSS"],
 *   links: { repo: "https://github.com/GrandoPh", demo: null },
 *   destaque: true,
 *   status: "publicado"
 * }
 */
export const projetos = [];

const lista = document.querySelector('#lista-projetos');
const contador = document.querySelector('#contador-projetos');
const estadoVazio = document.querySelector('#estado-vazio');
const estadoConstrucao = document.querySelector('#estado-construcao');
const filtros = document.querySelector('#filtros');

const somenteDestaque = lista?.dataset.destaque === 'true';

let idioma = 'pt';
let dicionario = {};
let filtroAtual = 'todos';

try {
  idioma = localStorage.getItem('idioma') || 'pt';
} catch (e) {
  idioma = 'pt';
}

function texto(valor) {
  if (!valor) return '';
  if (typeof valor === 'string') return valor;
  return valor[idioma] || valor.pt || '';
}

function criarCard(projeto) {
  const artigo = document.createElement('article');
  artigo.className = 'card';
  artigo.dataset.categoria = projeto.categoria || '';
  artigo.dataset.slug = projeto.slug;

  const link = document.createElement('a');
  link.className = 'card__link';
  link.href = `projetos/${projeto.slug}.html`;

  const capa = document.createElement('div');
  capa.className = 'card__capa';
  capa.setAttribute('aria-hidden', 'true');
  const numero = document.createElement('span');
  numero.className = 'card__numero';
  numero.textContent = projeto.indice || '00';
  capa.append(numero);

  const corpo = document.createElement('div');
  corpo.className = 'card__corpo';

  const titulo = document.createElement('h3');
  titulo.className = 'card__titulo';
  titulo.textContent = texto(projeto.titulo);

  const resumo = document.createElement('p');
  resumo.className = 'card__resumo';
  resumo.textContent = texto(projeto.resumo);

  const meta = document.createElement('div');
  meta.className = 'card__meta';

  (projeto.stack || []).slice(0, 3).forEach((item) => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = item;
    meta.append(tag);
  });

  const seta = document.createElement('span');
  seta.className = 'card__seta';
  seta.setAttribute('aria-hidden', 'true');
  seta.textContent = '→';
  meta.append(seta);

  corpo.append(titulo, resumo, meta);
  link.append(capa, corpo);
  artigo.append(link);

  return artigo;
}

function visiveis() {
  return somenteDestaque ? projetos.filter((p) => p.destaque) : projetos;
}

function contarTexto(total) {
  const modelo = dicionario['projetos.contagem'] || '{n} projeto(s)';
  return modelo.replace('{n}', String(total));
}

function renderizar() {
  if (!lista) return;

  const base = visiveis();
  lista.replaceChildren(...base.map(criarCard));

  const temProjetos = base.length > 0;

  if (estadoConstrucao) estadoConstrucao.hidden = temProjetos;
  if (filtros) filtros.hidden = !temProjetos;
  if (contador) contador.textContent = temProjetos ? contarTexto(base.length) : '';

  aplicarFiltro();
}

function aplicarFiltro() {
  if (!lista) return;

  const cards = Array.from(lista.querySelectorAll('.card'));
  let mostrados = 0;

  cards.forEach((card) => {
    const combina = filtroAtual === 'todos' || card.dataset.categoria === filtroAtual;
    card.hidden = !combina;
    if (combina) mostrados += 1;
  });

  if (estadoVazio) estadoVazio.hidden = mostrados > 0 || cards.length === 0;
  if (contador) contador.textContent = contarTexto(mostrados);

  document.querySelectorAll('[data-filtro]').forEach((botao) => {
    botao.setAttribute('aria-pressed', String(botao.dataset.filtro === filtroAtual));
  });
}

document.querySelectorAll('[data-filtro]').forEach((botao) => {
  botao.addEventListener('click', () => {
    filtroAtual = botao.dataset.filtro;
    aplicarFiltro();
  });
});

document.addEventListener('idioma:mudou', (ev) => {
  idioma = ev.detail.idioma;
  dicionario = ev.detail.dic || {};
  renderizar();
});

renderizar();
