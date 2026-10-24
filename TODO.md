# TODO.md — Runbook de execução

> **Para quem executa:** este arquivo é uma receita. Siga **uma tarefa por vez, na ordem**, sem pular, sem "melhorar" o que não foi pedido, sem decidir valores por conta própria.
> **Valores de design** (cores, tamanhos, fontes, espaçamentos) estão em `SPECS.md`. Copie de lá. Se um valor não estiver em nenhum dos dois arquivos, **pare e pergunte**.
> **Textos** estão em `SPECS.md` §18. **Nunca invente** dado pessoal (e-mail, LinkedIn, datas, projetos).

---

## 0. Regras do executor

1. Leia `SPECS.md` inteiro **antes** de começar. Depois execute `F0.T1`, `F0.T2`…
2. Uma tarefa = um commit. Mensagem indicada na própria tarefa.
3. Ao final de cada tarefa existe **"Pronto quando"**. Se não passar, **não avance**: conserte a tarefa atual e repita a verificação.
4. Não adicione bibliotecas, frameworks, CDNs, `package.json` ou build.
5. Todo caminho é **relativo**. Nunca `href="/..."`.
6. Se aparecer `TODO` no texto, **mantenha o `TODO`** e registre no relatório final. Não invente.
7. Não altere `AGENTS.md` nem `SPECS.md` sem pedido explícito.
8. Ambiente: Windows + PowerShell. Raiz do projeto: `C:\Users\1140195\Desktop\Sites`.
9. Servidor local para testar (obrigatório — `fetch` de JSON não funciona em `file://`):
   ```powershell
   cd "C:\Users\1140195\Desktop\Sites"; python -m http.server 8000
   ```
   Abrir `http://localhost:8000/`.
10. Se um teste de `F8` falhar, corrija a causa, rode o teste de novo e só então siga.

### Progresso

- [ ] F0 — Publicação base
- [ ] F1 — Fundação visual
- [ ] F2 — Layout e componentes
- [ ] F3 — JavaScript
- [ ] F4 — Home
- [ ] F5 — Projetos
- [ ] F6 — Sobre, Contato, 404
- [ ] F7 — SEO, impressão, documentação
- [ ] F8 — QA (testes T01–T43)
- [ ] F9 — Deploy

---

# F0 — Publicação base

### F0.T1 — Tornar o repositório público
**Faça:**
```powershell
gh repo edit GrandoPh/Pagina-Pessoal --visibility public --accept-visibility-change-consequences
```
**Pronto quando:** `gh repo view --json visibility` retorna `PUBLIC`.

### F0.T2 — Criar `.nojekyll`
**Faça:** criar arquivo vazio na raiz chamado `.nojekyll`.
```powershell
New-Item -ItemType File -Path .nojekyll -Force
```
**Pronto quando:** o arquivo existe e está vazio.

### F0.T3 — Ativar GitHub Pages
**Faça:** `gh api -X POST repos/GrandoPh/Pagina-Pessoal/pages -f "source[branch]=main" -f "source[path]=/"`.
Se a API reclamar que já existe, abra Settings → Pages e selecione *Deploy from a branch* → `main` → `/ (root)`.
**Pronto quando:** `gh api repos/GrandoPh/Pagina-Pessoal/pages --jq .html_url` retorna a URL do Pages.

### F0.T4 — Commit
```powershell
git add .nojekyll; git commit -m "configura GitHub Pages"
```

**Aceite da fase:** repositório público, Pages ativo, `.nojekyll` comitado.

---

# F1 — Fundação visual

### F1.T1 — Criar a estrutura de pastas
```powershell
New-Item -ItemType Directory -Force assets/css, assets/js, assets/i18n, assets/img, assets/fonts, projetos | Out-Null
```
**Pronto quando:** as 6 pastas existem.

### F1.T2 — Criar `assets/css/tokens.css`
**Faça:** copie **exatamente** os dois blocos de cor de `SPECS.md` §4.1 na estrutura abaixo. Nenhuma cor fora dos tokens.

```css
/* ---------- Tokens ---------- */
:root {
  /* cor */
  --cor-fundo: #F4EBD8;
  --cor-superficie: #FAF5E9;
  --cor-faixa: #E7DCC4;
  --cor-texto: #221E1A;
  --cor-texto-suave: #5A5046;
  --cor-borda: #221E1A;
  --cor-sombra: #221E1A;
  --cor-acento: #C0552F;
  --cor-acento-forte: #A8431F;
  --cor-acento-texto: #F4EBD8;
  --cor-link: #9A3F20;
  --cor-destaque: #E3A82B;
  --cor-destaque-texto: #221E1A;
  --cor-painel: #1F4B43;
  --cor-painel-texto: #F4EBD8;
  --cor-oliva: #7A7F52;
  --cor-oliva-texto: #5F6440;
  --cor-erro: #8C2F1E;

  /* tipografia */
  --fonte-display: "Bitter", Georgia, serif;
  --fonte-texto: "Archivo", system-ui, sans-serif;
  --texto-xs: 0.8125rem;
  --texto-md: 1rem;
  --texto-lg: 1.125rem;
  --texto-titulo: clamp(1.5rem, 3vw, 2rem);
  --texto-display-l: clamp(2.25rem, 5.5vw, 4rem);
  --texto-display-xl: clamp(3rem, 9vw, 7.5rem);

  /* espaço */
  --e-1: .25rem; --e-2: .5rem; --e-3: 1rem; --e-4: 1.5rem;
  --e-5: 2rem; --e-6: 3rem; --e-7: 4rem; --e-8: 6rem; --e-9: 8rem;
  --secao: clamp(3rem, 8vw, 6rem);

  /* forma */
  --borda-forte: 3px solid var(--cor-borda);
  --borda-fina: 1.5px solid var(--cor-borda);
  --sombra-dura: 8px 8px 0 var(--cor-sombra);
  --sombra-dura-sm: 4px 4px 0 var(--cor-sombra);
  --raio: 2px;

  /* movimento */
  --t-rapida: 150ms;
  --t-media: 250ms;
  --t-entrada: 500ms;
  --curva: cubic-bezier(.2, .8, .2, 1);

  /* layout */
  --container: 76rem;
  --gutter: clamp(1rem, 4vw, 2.5rem);
}
```

**Pronto quando:** o arquivo existe e contém `--cor-fundo: #F4EBD8`.

### F1.T3 — Adicionar o tema escuro em `tokens.css`
**Faça:** acrescente o bloco **abaixo** do `:root`, usando os valores da coluna "Escuro" de `SPECS.md` §4.1:

```css
[data-theme="dark"] {
  --cor-fundo: #17140F;
  --cor-superficie: #221E1A;
  --cor-faixa: #1E1A15;
  --cor-texto: #F4EBD8;
  --cor-texto-suave: #C9BFA9;
  --cor-borda: #F4EBD8;
  --cor-sombra: #000000;
  --cor-acento: #E07A52;
  --cor-acento-forte: #E07A52;
  --cor-acento-texto: #17140F;
  --cor-link: #E07A52;
  --cor-destaque: #F2B93C;
  --cor-destaque-texto: #17140F;
  --cor-painel: #2B2620;
  --cor-painel-texto: #F4EBD8;
  --cor-oliva: #9AA36B;
  --cor-oliva-texto: #A8B070;
  --cor-erro: #F09A84;
}
```

**Pronto quando:** todos os 18 tokens de cor do `:root` também existem no `[data-theme="dark"]`.
**Verificação (os dois números devem ser 18):**
```powershell
$c = Get-Content assets/css/tokens.css -Raw
$claro  = (($c -split ':root')[1] -split '\[data-theme="dark"\]')[0]
$escuro = ($c -split '\[data-theme="dark"\]')[1]
([regex]::Matches($claro,  '--cor-')).Count
([regex]::Matches($escuro, '--cor-')).Count
```

### F1.T4 — Criar `assets/favicon.svg`
**Faça:** SVG 64×64, fundo `#C0552F`, monograma "P" em `#F4EBD8` com fonte serif, sem texto externo.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="P">
  <rect width="64" height="64" fill="#C0552F"/>
  <text x="32" y="46" font-family="Georgia, serif" font-size="40" font-weight="700"
        text-anchor="middle" fill="#F4EBD8">P</text>
</svg>
```

**Pronto quando:** abrir o arquivo no navegador mostra o quadrado terracota com "P".

### F1.T5 — Criar `assets/css/base.css`
**Conteúdo obrigatório, nesta ordem:**
1. Reset: `*,*::before,*::after{box-sizing:border-box}`, `margin:0`, `img,svg{max-width:100%;display:block}`.
2. `html{-webkit-text-size-adjust:100%}` e `html{scroll-behavior:smooth}`.
3. `body`: `background:var(--cor-fundo)`, `color:var(--cor-texto)`, `font-family:var(--fonte-texto)`, `font-size:var(--texto-md)`, `line-height:1.65`, `transition:background-color var(--t-media), color var(--t-media)`.
4. Títulos: `font-family:var(--fonte-display)`, `font-weight:900`, `letter-spacing:-.02em`, `line-height:1.02`, `text-wrap:balance`.
5. `h1{font-size:var(--texto-display-l)}`, `.u-display{font-size:var(--texto-display-xl)}`, `h2{font-size:var(--texto-display-l)}`, `h3{font-size:var(--texto-titulo)}`.
6. `p{max-width:68ch}`.
7. `a{color:var(--cor-link);text-decoration-thickness:2px;text-underline-offset:3px}`.
8. `:focus-visible{outline:3px solid var(--cor-destaque);outline-offset:3px}`.
9. `.u-visually-hidden` (padrão clip/clip-path).
10. `.skip-link`: escondido por padrão, visível em `:focus`, fixo no topo, fundo `--cor-destaque`, texto `--cor-destaque-texto`.
11. Grão: `.grao` — `position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:.06;mix-blend-mode:multiply;background-image:url("data:image/svg+xml,...feTurbulence...")`.
12. `.u-container{width:100%;max-width:var(--container);margin-inline:auto;padding-inline:var(--gutter)}`.
13. `prefers-reduced-motion`: desligar `animation` e `transition` (única exceção permitida ao `!important`).

**Pronto quando:** nenhuma cor literal aparece no arquivo (só `var(--...)`).

### F1.T6 — Boot do tema sem flash
**Faça:** este script entra **como primeiro elemento do `<head>`** de todas as páginas, **antes** dos `<link>` de CSS.

```html
<script>
(function () {
  try {
    var s = localStorage.getItem('tema') || 'auto';
    var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var t = s === 'escuro' ? 'dark' : s === 'claro' ? 'light' : (d ? 'dark' : 'light');
    document.documentElement.dataset.theme = t;
    document.documentElement.style.colorScheme = t;
  } catch (e) {}
})();
</script>
```

**Pronto quando:** guardado o trecho para colar em todas as páginas (F4.T1 define o `<head>` canônico).

### F1.T7 — Commit
```powershell
git add assets .nojekyll; git commit -m "adiciona tokens, base visual e favicon"
```

**Aceite da fase:** `tokens.css` com 2 temas, `base.css` sem cores literais, favicon visível.

---

# F2 — Layout e componentes

### F2.T1 — Criar `assets/css/layout.css`
**Conteúdo obrigatório:**
1. `.secao{padding-block:var(--secao)}`, `.secao--faixa{background:var(--cor-faixa)}`, `.secao--painel{background:var(--cor-painel);color:var(--cor-painel-texto)}`.
2. Grid: `.grid{display:grid;gap:var(--e-4)}`; `.grid--projetos{grid-template-columns:1fr}` e em `@media (min-width:40rem){2 cols}`, `@media (min-width:64rem){3 cols}`.
3. Header: `.site-header{position:sticky;top:0;z-index:100;background:var(--cor-fundo);border-bottom:var(--borda-forte);transition:box-shadow var(--t-rapida), background-color var(--t-media)}`; estado `.site-header.is-scrolled{box-shadow:0 4px 0 var(--cor-sombra)}`.
4. `.site-header__inner`: flex, `justify-content:space-between`, `align-items:center`, `min-height:4.5rem`.
5. Nav desktop: oculta abaixo de `64rem`; `@media (min-width:64rem){.nav{display:flex;gap:var(--e-4)}}`.
6. Menu mobile: `.menu-painel{position:fixed;inset:0;background:var(--cor-fundo);display:grid;place-content:center;z-index:200}`; oculto por padrão via `[hidden]`; quando aberto, `body{overflow:hidden}`.
7. Rodapé: `.site-footer{background:var(--cor-painel);color:var(--cor-painel-texto);border-top:var(--borda-forte);padding-block:var(--e-7)}`.
8. Hero: 1 coluna; `@media (min-width:64rem){grid-template-columns:7fr 5fr;align-items:end}`.
9. `.leitura{max-width:68ch}`.
**Pronto quando:** nenhuma cor literal; todos os breakpoints usam `min-width`.

### F2.T2 — Criar `assets/css/components.css`
Implemente os componentes de `SPECS.md` §4.8. Regras mínimas por componente:

1. `.btn` — `display:inline-flex;align-items:center;gap:var(--e-2);min-height:44px;padding:var(--e-3) var(--e-5);background:var(--cor-acento-forte);color:var(--cor-acento-texto);border:var(--borda-forte);border-radius:var(--raio);font-family:var(--fonte-texto);font-weight:700;text-transform:uppercase;letter-spacing:.06em;text-decoration:none;box-shadow:var(--sombra-dura-sm);transition:transform var(--t-rapida),box-shadow var(--t-rapida)`.
   `.btn:hover{transform:translate(-2px,-2px);box-shadow:var(--sombra-dura)}`
   `.btn:active{transform:translate(2px,2px);box-shadow:none}`
   `.btn--secundario{background:var(--cor-superficie);color:var(--cor-texto)}`
2. `.card` — fundo `--cor-superficie`, borda forte, sombra, sem raio > 2px, `display:flex;flex-direction:column`. `.card__capa` com `aspect-ratio:16/10`, fundo `--cor-destaque`, número grande em display. `.card__indice` micro, caixa alta. `.card:hover` mesmo padrão do botão.
3. `.tag` — borda fina, `padding:var(--e-1) var(--e-2)`, micro, caixa alta, fundo `--cor-superficie`.
4. `.selo` — fundo `--cor-destaque`, texto `--cor-destaque-texto`, borda forte, `transform:rotate(-3deg)`, `display:inline-block`.
5. `.marquee` — `overflow:hidden`, fundo `--cor-destaque`, borda-block forte; `.marquee__trilha{display:flex;gap:var(--e-4);animation:marquee 20s linear infinite;width:max-content}`; `@keyframes marquee{to{transform:translateX(-50%)}}`; `.marquee:hover .marquee__trilha{animation-play-state:paused}`.
6. `.tema` e `.idioma` — grupos de controle: borda fina, botões de 44px, `aria-pressed="true"`/`aria-current` com fundo `--cor-destaque`.
7. `.menu-btn` — visível só abaixo de `64rem`.
8. `.topo` — `position:fixed;right:var(--e-4);bottom:var(--e-4)`, circular 48px, borda forte, fundo `--cor-destaque`, oculto com `[hidden]`.
9. `.progresso` — `position:fixed;top:0;left:0;height:3px;width:100%;background:var(--cor-destaque);transform-origin:0 50%;transform:scaleX(0);z-index:300`.
10. `.aviso` — `aria-live="polite"`, texto micro.
11. `.nav__link[aria-current="page"]` — `text-decoration:underline;text-decoration-thickness:3px`.

**Pronto quando:** todos os componentes usam apenas `var(--...)` para cor e existem nos dois temas.

### F2.T3 — Criar `assets/css/print.css`
**Conteúdo:** esconder `.site-header`, `.site-footer`, `.marquee`, `.topo`, `.progresso`, `.menu-btn`; `body{background:#fff;color:#000}`; links mostram URL: `a[href^="http"]::after{content:" (" attr(href) ")"}`; `font-size:11pt`; sem sombras.
**Pronto quando:** Ctrl+P na home não mostra header, nav nem marquee.

### F2.T4 — Commit
```powershell
git add assets/css; git commit -m "adiciona layout e componentes"
```

**Aceite da fase:** 5 CSS existentes, nenhuma cor literal fora de `tokens.css` e `print.css`.

---

# F3 — JavaScript

> Todos os arquivos em `assets/js/`. Todos são módulos ES (`export`/`import`), carregados com `<script type="module" src="...">`.

### F3.T1 — `assets/js/theme.js`
```js
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
  try { localStorage.setItem(CHAVE, estado); } catch (e) {}
  document.querySelectorAll('[data-tema]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.tema === estado));
  });
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', tema === 'dark' ? '#17140F' : '#F4EBD8');
}

let estadoAtual = 'auto';
try { estadoAtual = localStorage.getItem(CHAVE) || 'auto'; } catch (e) {}

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
```
**Pronto quando:** clicar em Auto/Claro/Escuro muda o `data-theme` do `<html>` e o botão fica com `aria-pressed="true"`.

### F3.T2 — `assets/js/i18n.js`
```js
const CHAVE = 'idioma';
const SUPORTADOS = ['pt', 'en'];
const url = (idioma) => new URL(`../i18n/${idioma}.json`, import.meta.url);

const cache = new Map();
let atual = 'pt';

async function carregar(idioma) {
  if (!cache.has(idioma)) {
    const resp = await fetch(url(idioma));
    if (!resp.ok) throw new Error(`i18n ${idioma}: ${resp.status}`);
    cache.set(idioma, await resp.json());
  }
  return cache.get(idioma);
}

function traduzPagina(dic) {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const texto = dic[el.dataset.i18n];
    if (typeof texto === 'string') el.textContent = texto;
    else if (atual !== 'pt') console.warn('[i18n] chave ausente:', el.dataset.i18n);
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
    const t = dic[`meta.${pagina}.titulo`];
    const d = dic[`meta.${pagina}.desc`];
    if (t) document.title = t;
    const meta = document.querySelector('meta[name="description"]');
    if (d && meta) meta.setAttribute('content', d);
  }

  document.querySelectorAll('[data-idioma]').forEach((el) => {
    const ativo = el.dataset.idioma === atual;
    el.setAttribute('aria-current', String(ativo));
    el.setAttribute('aria-pressed', String(ativo));
  });

  document.documentElement.lang = atual === 'en' ? 'en' : 'pt-BR';
}

async function definir(idioma, { atualizarUrl = true } = {}) {
  if (!SUPORTADOS.includes(idioma)) idioma = 'pt';
  atual = idioma;
  try { localStorage.setItem(CHAVE, idioma); } catch (e) {}
  if (atualizarUrl) {
    const u = new URL(window.location.href);
    if (idioma === 'pt') u.searchParams.delete('lang'); else u.searchParams.set('lang', idioma);
    history.replaceState(null, '', u);
  }
  const dic = idioma === 'pt' ? await carregar('pt') : await carregar(idioma);
  traduzPagina(dic);
}

const parametro = new URLSearchParams(window.location.search).get('lang');
let salvo = null;
try { salvo = localStorage.getItem(CHAVE); } catch (e) {}
definir(parametro || salvo || 'pt', { atualizarUrl: false });

document.querySelectorAll('[data-idioma]').forEach((el) => {
  el.addEventListener('click', (ev) => {
    ev.preventDefault();
    definir(el.dataset.idioma);
  });
});
```
**Pronto quando:** trocar para EN traduz a página, muda `<html lang>` e a URL recebe `?lang=en`.

### F3.T3 — `assets/js/nav.js`
**Comportamento exato:**
1. `#menu-btn` alterna `#menu-painel` (`hidden`), `aria-expanded` e `body.menu-aberto`.
2. Ao abrir: foco no primeiro link do painel. Ao fechar com `Esc`: foco volta ao `#menu-btn`.
3. Trap de foco: `Tab`/`Shift+Tab` circula apenas dentro do painel enquanto aberto.
4. Fechar ao clicar em qualquer link do painel.
5. `scroll` adiciona `.is-scrolled` ao `.site-header` quando `window.scrollY > 8`.
**Pronto quando:** os 5 itens funcionam por teclado.

### F3.T4 — `assets/js/motion.js`
**Comportamento:** para cada `[data-reveal]`, `IntersectionObserver` com `threshold: .15` adiciona `.is-visible` e para de observar. Se `matchMedia('(prefers-reduced-motion: reduce)').matches`, adiciona `.is-visible` em todos imediatamente e **não** observa. Em `assets/css/components.css` acrescente:
```css
[data-reveal]{opacity:0;transform:translateY(24px);transition:opacity var(--t-entrada) var(--curva),transform var(--t-entrada) var(--curva)}
[data-reveal].is-visible{opacity:1;transform:none}
```
**Pronto quando:** com movimento reduzido ativado no SO, nada fica invisível.

### F3.T5 — `assets/js/ui.js`
**Comportamento exato:**
1. `#topo`: `hidden` quando `scrollY < 600`; ao clicar, `scrollTo({top:0, behavior: reduzido ? 'auto' : 'smooth'})`.
2. `#progresso`: em `scroll`, `scaleX(scrollY / (scrollHeight - innerHeight))` limitado a 0–1.
3. `[data-copiar]`: no clique, `navigator.clipboard.writeText(el.dataset.copiar)`, escrever `dataset.mensagem` (ou o texto de `projeto.copiado`) em `#aviso-copia`, limpar após 2000ms. Se `clipboard` indisponível, `console.warn` e não quebrar.
**Pronto quando:** os três funcionam e não há erro no console sem `clipboard` permitido (só warn).

### F3.T6 — `assets/js/projects.js`
```js
export const projetos = [];
```
Acrescente: se `#lista-projetos` existir, renderiza um `<article class="card">` por projeto (título e resumo no idioma atual via `localStorage.getItem('idioma')`), preenche `#contador-projetos` com `projetos.contagem`, aplica filtro por `[data-filtro]` (`todos|web|dados|faculdade`) alternando `hidden` nos cards, e mostra `#estado-vazio` quando a lista filtrada fica vazia. Com `projetos.length === 0`, mostra `#estado-construcao`, oculta `#filtros` e o contador.

Use `createElement` + `textContent`. **Proibido `innerHTML`.**
**Pronto quando:** com array vazio, a página mostra o estado "em construção" e nenhum card.

### F3.T7 — Commit
```powershell
git add assets/js assets/css/components.css; git commit -m "adiciona scripts de tema, idioma, navegacao e interface"
```

**Aceite da fase:** 6 arquivos JS, todos importáveis sem erro no console.

---

# F4 — Home

### F4.T1 — Criar `index.html`
**Faça:** use este esqueleto. A ordem dos elementos no `<head>` é obrigatória.

```html
<!DOCTYPE html>
<html lang="pt-BR" data-theme="light">
<head>
  <script>/* boot do tema — copiar de F1.T6 */</script>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pedro Henrique — Portfólio Full Stack</title>
  <meta name="description" content="Estudante de Ciência da Computação construindo projetos full stack, do banco de dados à interface.">
  <meta name="theme-color" content="#F4EBD8">
  <link rel="canonical" href="https://grandoph.github.io/Pagina-Pessoal/">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/css/tokens.css">
  <link rel="stylesheet" href="assets/css/base.css">
  <link rel="stylesheet" href="assets/css/layout.css">
  <link rel="stylesheet" href="assets/css/components.css">
  <link rel="stylesheet" href="assets/css/print.css" media="print">
</head>
<body data-pagina="home">
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <div class="grao" aria-hidden="true"></div>
  <header class="site-header">…</header>
  <main id="conteudo">…</main>
  <footer class="site-footer">…</footer>
  <button class="topo" id="topo" hidden aria-label="Voltar ao topo">↑</button>
  <script type="module" src="assets/js/theme.js"></script>
  <script type="module" src="assets/js/i18n.js"></script>
  <script type="module" src="assets/js/nav.js"></script>
  <script type="module" src="assets/js/motion.js"></script>
  <script type="module" src="assets/js/ui.js"></script>
</body>
</html>
```

### F4.T2 — Montar o `<header>` (reutilizável em todas as páginas)
**Estrutura obrigatória:**
1. `<a class="logo" href="index.html">PEDRO HENRIQUE</a>`
2. `<nav class="nav" aria-label="Principal">` com 4 links (`aria-current="page"` na página atual).
3. Grupo de tema: `<div class="tema" role="group" aria-label="Tema" data-i18n-attr="aria-label:tema.rotulo">` com 3 `<button type="button" data-tema="auto|claro|escuro">` + `data-i18n="tema.auto|tema.claro|tema.escuro"`.
4. Grupo de idioma: `<div class="idioma" role="group" aria-label="Idioma">` com 2 `<a href="?lang=pt" data-idioma="pt">PT</a>` e `data-idioma="en">EN</a>`.
5. `<button class="menu-btn" id="menu-btn" aria-expanded="false" aria-controls="menu-painel">Menu</button>`.
6. `<div class="menu-painel" id="menu-painel" hidden>` com os mesmos links + controles de tema/idioma.

**Pronto quando:** o header aparece em 1 linha no desktop e com botão MENU abaixo de 1024px.

### F4.T3 — Montar o `<main>` da home
Ordem obrigatória (textos de `SPECS.md` §18):
1. Hero: `.selo` "Disponível para estágio" + `<h1 class="u-display" data-i18n="hero.nome">Pedro Henrique</h1>` + `hero.cargo` + `hero.frase` + 2 CTAs.
2. Marquee `aria-hidden="true"`: trilha duplicada do texto `marquee.texto`.
3. Projetos em destaque: `<h2>` + `<div id="lista-projetos" class="grid grid--projetos">` + link `home.destaques.link`.
4. Manifesto: `<section class="secao secao--painel">` com `h2` + 3 frases.
5. Sobre resumido: `h2` + 2 parágrafos + link.
6. CTA final com e-mail (`TODO`) e LinkedIn (`TODO`).
7. Cada seção que deve animar recebe `data-reveal`.

**Pronto quando:** a home tem exatamente **um `<h1>`**, e todos os textos têm `data-i18n`.

### F4.T4 — Montar o `<footer>` (reutilizável)
Crédito + links GitHub/LinkedIn/e-mail + tema + idioma + `© 2026 Pedro Henrique`. O e-mail usa `href="mailto:TODO"` e `aria-disabled="true"` até o dado real chegar.

### F4.T5 — Verificar e comitar
```powershell
git add index.html; git commit -m "cria pagina inicial"
```
**Pronto quando:** T01–T05 e T08–T15 de `F8` passam.

---

# F5 — Projetos

### F5.T1 — `projetos.html`
**Faça:** mesmo `<head>` de F4.T1 com os caminhos **sem** prefixo (está na raiz), `data-pagina="projetos"`, `aria-current="page"` em Projetos.
`<main>`: `h1` + `projetos.sub` + `#filtros` (4 botões `[data-filtro]` + `#contador-projetos`) + `#lista-projetos` + `#estado-vazio` (hidden) + `#estado-construcao` (hidden) + CTA GitHub.
**Pronto quando:** sem projetos salvos, mostra "Primeiro projeto a caminho." e esconde os filtros.

### F5.T2 — `projetos/exemplo.html` (template)
**Faça:** cópia da estrutura de detalhe de `SPECS.md` §5.4, com:
- `<meta name="robots" content="noindex">`
- caminhos com prefixo `../` (`../assets/css/...`, `../assets/js/...`)
- `data-pagina="projeto"`
- barra de progresso `<div class="progresso" id="progresso" aria-hidden="true"></div>`
- seções: título, capa (bloco de cor com número), resumo, `O problema`, `A solução`, `Stack`, `Resultado e aprendizados`, links, `Copiar link` (`data-copiar` com a própria URL), próximo projeto.
- Todo conteúdo factual como `<!-- TODO: Pedro -->`.
**Pronto quando:** a página abre, as fontes/CSS carregam (prefixo `../` correto) e o noindex está presente.

### F5.T3 — Commit
```powershell
git add projetos.html projetos/; git commit -m "cria pagina de projetos e template de detalhe"
```

**Aceite da fase:** listagem com estado vazio; template abre sem 404 de CSS/JS.

---

# F6 — Sobre, Contato e 404

### F6.T1 — `sobre.html`
Estrutura de `SPECS.md` §5.5. Stack em tags: Front (HTML, CSS, JavaScript) · Back (Node.js, Python) · Dados (SQL) · Ferramentas (Git, GitHub, VS Code) — **acrescente `<!-- TODO: confirmar o que já domina -->`**. Linha do tempo com 3 itens, cada data como `TODO`.
**Pronto quando:** um `<h1>`, links internos funcionando, `data-reveal` nas seções.

### F6.T2 — `contato.html`
Estrutura de `SPECS.md` §5.6. E-mail em destaque com botão `data-copiar` e `aria-live="polite"` em `#aviso-copia`. LinkedIn/GitHub como `TODO`.
**Pronto quando:** o botão copia e exibe o aviso.

### F6.T3 — `404.html`
Bloco central, `h1` "404 — página não encontrada", `erro.texto`, link para `index.html`. Mesmo header/rodapé. `data-pagina="erro"`.
**Pronto quando:** abrir uma URL inexistente mostra a página estilizada.

### F6.T4 — `styleguide.html` (interno, noindex)
Uma página com: todas as cores em swatches, as 6 escalas de texto, botões (3 variantes), card, tags, selo, marquee desligado. Sem link no menu. `<meta name="robots" content="noindex">`.
**Pronto quando:** é possível comparar visualmente os dois temas.

### F6.T5 — Commit
```powershell
git add sobre.html contato.html 404.html styleguide.html; git commit -m "adiciona sobre, contato e pagina 404"
```

---

# F7 — SEO, impressão e documentação

### F7.T1 — `assets/i18n/pt.json` e `en.json`
**Formato:** objeto **plano** (sem aninhamento), chaves exatamente iguais às de `SPECS.md` §18.
```json
{ "nav.inicio": "Início", "nav.projetos": "Projetos" }
```
**Verificação (as duas listas devem ser idênticas — sem saída):**
```powershell
$pt = Get-Content assets/i18n/pt.json -Raw | ConvertFrom-Json
$en = Get-Content assets/i18n/en.json -Raw | ConvertFrom-Json
Compare-Object $pt.PSObject.Properties.Name $en.PSObject.Properties.Name
```
**Pronto quando:** `Compare-Object` não imprime nada e todo `data-i18n` do HTML existe no JSON:
```powershell
Select-String -Path *.html,projetos/*.html -Pattern 'data-i18n="([^"]+)"' -AllMatches |
  ForEach-Object { $_.Matches.Groups[1].Value } | Sort-Object -Unique
```

### F7.T2 — `robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://grandoph.github.io/Pagina-Pessoal/sitemap.xml
```

### F7.T3 — `sitemap.xml`
Incluir **apenas**: `/`, `/projetos.html`, `/sobre.html`, `/contato.html`. **Não** incluir `styleguide.html`, `projetos/exemplo.html` nem `404.html`. Datas em `2026-10-23`.

### F7.T4 — Open Graph
Criar `assets/img/og.png` 1200×630 (fundo `#F4EBD8`, nome em Bitter, faixa terracota). Adicionar em todas as páginas:
```html
<meta property="og:title" content="…">
<meta property="og:description" content="…">
<meta property="og:type" content="website">
<meta property="og:url" content="…">
<meta property="og:image" content="https://grandoph.github.io/Pagina-Pessoal/assets/img/og.png">
<meta name="twitter:card" content="summary_large_image">
```
**Pronto quando:** `og:image` abre no navegador com 1200×630.

### F7.T5 — JSON-LD
Na home, antes de `</body>`, com `Person` (nome, url, `sameAs` com GitHub e LinkedIn `TODO`) e `WebSite`.

### F7.T6 — `README.md` do projeto
Reescrever com: o que é, como rodar local (`python -m http.server 8000`), **como adicionar um projeto** (4 passos de `SPECS.md` §7), estrutura de pastas, decisão de tema e idioma.

### F7.T7 — Commit
```powershell
git add .; git commit -m "adiciona i18n, seo, impressao e documentacao"
```

---

# F8 — QA (executar todos, na ordem)

> Use `http://localhost:8000/`. Para cada teste: anote **PASS** ou **FAIL**. FAIL = corrigir antes de seguir.

## Estrutura e técnico

| ID | Como testar | Esperado |
|---|---|---|
| T01 | Abrir `/`, `/projetos.html`, `/sobre.html`, `/contato.html`, `/projetos/exemplo.html`, `/styleguide.html` | Todas abrem sem erro |
| T02 | Abrir `/pagina-que-nao-existe` | Servidor exibe `404.html` estilizada |
| T03 | Console do DevTools em todas as páginas | Zero erro, zero 404 |
| T04 | `Select-String -Path *.html,projetos/*.html -Pattern 'href="/|src="/'` | Nenhum resultado |
| T05 | `Select-String -Path assets/css/*.css -Pattern '#[0-9A-Fa-f]{3,6}' \| Where-Object {$_.Filename -notin 'tokens.css','print.css'}` | Nenhum resultado |
| T06 | Aba Network, filtrar JS | Nenhum domínio externo |
| T07 | Contar `h1` por página (`Select-String -Pattern '<h1')` | Exatamente 1 |

## Tema

| ID | Como testar | Esperado |
|---|---|---|
| T08 | DevTools → Rendering → `prefers-color-scheme: dark`, recarregar | Site abre escuro em "Auto" |
| T09 | Clicar em "Claro", recarregar | Continua claro |
| T10 | Com SO escuro e escolha "Claro", recarregar | Continua claro (manual vence) |
| T11 | Em "Auto", mudar o tema do SO | Site acompanha sem recarregar |
| T12 | Network throttling "Slow 4G", recarregar em tema escuro | **Não** pisca claro antes de escurecer |
| T13 | Inspecionar `meta[name=theme-color]` nos dois temas | `#17140F` / `#F4EBD8` |
| T14 | Passar pelos pares da tabela `SPECS.md` §4.1 nos dois temas (DevTools ou WebAIM) | Todos ≥ 4.5:1 |
| T15 | Desativar JS e recarregar | Site legível em tema claro, sem quebra |

## Idioma

| ID | Como testar | Esperado |
|---|---|---|
| T16 | Clicar "EN" em cada página | Todo texto traduzido; nenhuma chave crua visível |
| T17 | Recarregar após EN | Continua EN; URL com `?lang=en` |
| T18 | Abrir `/projetos/exemplo.html?lang=en` direto | Traduz e carrega CSS/JS (prefixo `../`) |
| T19 | Com EN ativo, inspecionar `<html lang>`, `<title>`, `meta description` | `en`, título e descrição em inglês |
| T20 | Remover temporariamente uma chave do `en.json` e recarregar | Texto cai para PT + `console.warn` |

## Navegação e responsividade

| ID | Como testar | Esperado |
|---|---|---|
| T21 | Larguras 360, 768, 1280 | Sem scroll horizontal (`document.body.scrollWidth <= innerWidth`) |
| T22 | Em 360px: abrir MENU, `Tab`, `Esc` | Abre, foco preso, `Esc` fecha e devolve foco |
| T23 | Rolar 20px | Header ganha sombra |
| T24 | `Tab` desde o topo da home | Skip link → logo → nav → conteúdo, na ordem visual |
| T25 | Focar skip link | Fica visível e leva a `#conteudo` |

## Conteúdo e interações

| ID | Como testar | Esperado |
|---|---|---|
| T26 | Adicionar 3 objetos de teste em `projects.js`, recarregar | 3 cards; filtro e contador corretos |
| T27 | Voltar o array para `[]` | Estado "em construção", filtros ocultos |
| T28 | Clicar em "Copiar e-mail" (com dado `TODO`, testar com valor temporário) | Clipboard com o texto + aviso "copiado" por 2s |
| T29 | Clicar em "Copiar link" no template | URL da página no clipboard |
| T30 | Rolar 700px | Botão topo aparece; clique volta ao topo |
| T31 | Rolar o template do início ao fim | Barra vai de 0 a 100% |
| T32 | Inspecionar links externos | `target="_blank"`, `rel="noopener noreferrer"`, aviso acessível |

## Acessibilidade e movimento

| ID | Como testar | Esperado |
|---|---|---|
| T33 | Ativar "reduzir movimento" no SO | Nada anima: sem marquee, sem reveal, sem transição |
| T34 | `Tab` em todos os interativos, nos 2 temas | Foco sempre visível |
| T35 | Inspecionar marquee e grão | `aria-hidden="true"` |
| T36 | Medir alvos de toque no mobile | Todos ≥ 44×44px |

## SEO, impressão, performance

| ID | Como testar | Esperado |
|---|---|---|
| T37 | Conferir `<title>` e description em 4 páginas | Todos únicos |
| T38 | Abrir `assets/img/og.png` | 1200×630 |
| T39 | Abrir `sitemap.xml` | Só as 4 URLs públicas |
| T40 | Abrir `robots.txt` | Permite tudo + aponta sitemap |
| T41 | Ctrl+P na home e no template | Sem header/nav/marquee; texto legível |
| T42 | Lighthouse (mobile) na home | Perf ≥ 95, A11y 100, BP ≥ 95, SEO ≥ 95 |
| T43 | Tamanho de CSS e JS | CSS ≤ 40KB, JS ≤ 20KB |

## Fail → ação

| Teste | Correção provável |
|---|---|
| T04 | Trocar `href="/x"` por `href="x"` |
| T05 | Mover a cor literal para `tokens.css` |
| T08–T12 | Revisar a ordem do boot (antes do CSS) e o `localStorage` |
| T16–T20 | Conferir chaves planas, `data-i18n` e caminhos via `import.meta.url` |
| T21 | Procurar `width` fixo > 100vw ou `min-width` grande |
| T24 | Conferir ordem do DOM, não CSS `order` |
| T33 | Conferir `@media (prefers-reduced-motion)` em `base.css` |

---

# F9 — Deploy e pós-deploy

### F9.T1 — Publicar
```powershell
git push origin main
```
Aguardar o Pages reconstruir (~1 min).

### F9.T2 — Verificar em produção
| ID | Verificação | Esperado |
|---|---|---|
| P01 | `https://grandoph.github.io/Pagina-Pessoal/` | 200 e home renderizada |
| P02 | CSS, JS, favicon carregam | Nenhum 404 na aba Network |
| P03 | `/projetos.html?lang=en` | Traduz e mantém estilos |
| P04 | URL inexistente | 404 customizada |
| P05 | Tema escuro em produção | Sem flash |
| P06 | Lighthouse em produção | Dentro das metas de T42 |
| P07 | Mobile real (ou DevTools 360px) | Sem scroll horizontal |

### F9.T3 — Relatório final
Listar: fases concluídas, testes PASS/FAIL, pendências `TODO` restantes, próximos passos sugeridos.

---

## Anexo A — Checklist final de entrega

- [ ] 6 páginas públicas + template + styleguide
- [ ] Tema claro/escuro/auto com persistência e sem flash
- [ ] PT/EN com URL, persistência e fallback
- [ ] Header sticky + menu mobile acessível
- [ ] Copiar e-mail e copiar link funcionando
- [ ] Voltar ao topo + barra de progresso
- [ ] Filtro de projetos + estados vazio/construção
- [ ] SEO: title/description únicos, OG, JSON-LD, sitemap, robots
- [ ] Print stylesheet
- [ ] Zero dependências, zero build
- [ ] Todos os testes `F8` PASS
- [ ] Deploy verificado (`F9`)
- [ ] `TODO`s de dados reais listados no relatório
