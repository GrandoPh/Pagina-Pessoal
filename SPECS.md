# SPECS.md — Site pessoal / portfólio

> **Status:** planejamento aprovado. Execução guiada por [`TODO.md`](./TODO.md).
> **Dono do produto:** Pedro Henrique (`@GrandoPh`).
> **Repositório:** `GrandoPh/Pagina-Pessoal` → publicar em `https://grandoph.github.io/Pagina-Pessoal/`.
> **Regras de execução:** ver [`AGENTS.md`](./AGENTS.md).

---

## 1. Visão

Um portfólio pessoal que funcione como **cartão de visitas com personalidade**: alguém abre o link, entende em 10 segundos quem é Pedro Henrique, o que ele sabe fazer e para onde ir. A estética é o diferencial competitivo — não um template, mas uma peça de design com assinatura **mid-century + brutalista**.

### Objetivos
1. Apresentar Pedro como **estudante de Ciência da Computação com foco em Full Stack**, em transição para o mercado.
2. Exibir projetos de forma que o visitante entenda **problema → solução → tecnologia** sem ler um README.
3. Gerar contato (e-mail/LinkedIn) e cliques no GitHub.
4. Ser base de evolução contínua: adicionar projetos durante o curso sem refatorar nada.
5. Publicar de graça, sem build, sem manutenção de dependências.

### Não objetivos
Blog com CMS · loja · login · backend · banco de dados · formulário com servidor · painel administrativo.

### Público
| Público | O que busca | Como o site atende |
|---|---|---|
| Recrutadores / RH tech | Sinal de senioridade em formação, clareza, contato rápido | Home objetiva, projetos com stack, CTA de contato |
| Devs e comunidade | Referência técnica, código | Links de repositório e detalhes de implementação |
| Clientes freelancer (futuro) | Confiança e repertório | Tom profissional, estudos de caso curtos |
| Colegas de faculdade | Networking | Sobre + links sociais |

### Métricas de sucesso
- Contato alcançável em ≤ 2 cliques de qualquer página.
- 100% dos projetos listados com página própria e link funcional.
- Lighthouse: Performance ≥ 95, Acessibilidade 100, Boas práticas ≥ 95, SEO ≥ 95.
- Sem scroll horizontal em 360px.

---

## 2. Escopo

**Dentro:**
- 6 páginas públicas: Home, Projetos, Sobre, Contato, 404 + página de detalhe de projeto (+ template de projeto e styleguide interno, ambos `noindex`).
- Design system próprio com **tema claro e escuro**.
- **Bilíngue PT/EN** com seletor.
- Navegação responsiva, filtro de projetos, páginas de detalhe.
- Deploy no GitHub Pages.

**Extras de usabilidade (obrigatórios nesta versão):**
| # | Recurso | Valor para o usuário |
|---|---|---|
| E1 | Tema **claro / escuro / automático** (segue o sistema, com escolha manual persistida) | Conforto visual, respeito à preferência do SO |
| E2 | Seletor de idioma **PT / EN** persistido e refletido na URL | Alcance internacional sem duplicar páginas |
| E3 | Header **sticky** com estado "scrolled" | Navegação sempre acessível |
| E4 | Botão **voltar ao topo** após 600px de scroll | Navegação em páginas longas |
| E5 | **Barra de progresso de leitura** nas páginas de projeto | Orientação em conteúdo longo |
| E6 | Botão **copiar link** do projeto | Compartilhamento fácil |
| E7 | **Favicon SVG** + `theme-color` por tema | Identidade na aba e barra do navegador |
| E8 | **Print stylesheet** | Currículo/projeto imprimível sem quebrar |

**Fora:** domínio próprio (previsto), CMS, formulário com backend, PDF de CV (pendência), analytics.

---

## 3. Identidade

### 3.1 Posicionamento
"Estudante de Ciência da Computação que constrói produto de ponta a ponta — e se importa com como ele parece."

### 3.2 Personalidade
Autoral · calorosa · confiante · artesanal · direta · um pouco rebelde.

### 3.3 Tom de voz
Primeira pessoa, frases curtas, presente. Concreto e específico. Zero "apaixonado por tecnologia".
- ✅ "Construo interfaces que funcionam no celular de verdade."
- ❌ "Sou apaixonado por tecnologia e sempre em busca de novos desafios."

### 3.4 Direção de arte — "Mid-century brutalista"
Referências: cartazes de feira de ciências dos anos 60, capas Blue Note, tipografia de prensa, sinalização industrial, design suíço com calor.

- Blocos de cor chapada, borda grossa, sombra dura deslocada.
- Display slab em escala grande, caixa alta, tracking apertado.
- Grid visível e assumido; leve rotação em selos.
- Grão sutil sobre o fundo; nada de gradiente suave ou glassmorphism.
- **Cantos generosos:** pílulas nos controles e cantos grandes nos cards. A dureza vem da borda e da sombra, não do ângulo reto.

---

## 4. Design system

### 4.1 Cores — tema claro e escuro

Todos os usos passam por tokens em `assets/css/tokens.css`. **Nenhuma cor literal em componentes.**

| Token | Claro | Escuro | Uso |
|---|---|---|---|
| `--cor-fundo` | `#F4EBD8` | `#17140F` | Fundo da página |
| `--cor-superficie` | `#FAF5E9` | `#221E1A` | Cards, painéis |
| `--cor-faixa` | `#E7DCC4` | `#1E1A15` | Seções alternadas, divisores |
| `--cor-texto` | `#221E1A` | `#F4EBD8` | Texto principal |
| `--cor-texto-suave` | `#5A5046` | `#C9BFA9` | Texto secundário, legendas |
| `--cor-borda` | `#221E1A` | `#F4EBD8` | Bordas de 1.5–3px |
| `--cor-sombra` | `#221E1A` | `#000000` | Sombra dura |
| `--cor-acento` | `#C0552F` | `#E07A52` | Decoração, texto ≥ 24px |
| `--cor-acento-forte` | `#A8431F` | `#E07A52` | Fundo de botão primário |
| `--cor-acento-texto` | `#F4EBD8` | `#17140F` | Texto sobre o botão primário |
| `--cor-link` | `#9A3F20` | `#E07A52` | Links em texto corrido |
| `--cor-destaque` | `#E3A82B` | `#F2B93C` | Selos, marquee, foco |
| `--cor-destaque-texto` | `#221E1A` | `#17140F` | Texto sobre destaque |
| `--cor-painel` | `#1F4B43` | `#2B2620` | Blocos invertidos / CTA |
| `--cor-painel-texto` | `#F4EBD8` | `#F4EBD8` | Texto em bloco invertido |
| `--cor-oliva` | `#7A7F52` | `#9AA36B` | Tags decorativas |
| `--cor-oliva-texto` | `#5F6440` | `#A8B070` | Texto de tag |
| `--cor-erro` | `#8C2F1E` | `#F09A84` | Erros de formulário |

**Contrastes calculados (WCAG 2.1), pares usados no site:**

| Par | Claro | Escuro | AA |
|---|---|---|---|
| texto / fundo | 13.97:1 | 15.49:1 | ✅ AAA |
| texto-suave / fundo | 6.64:1 | 10.07:1 | ✅ AA |
| creme / painel | 8.26:1 | 12.65:1 | ✅ AAA |
| acento-texto / acento-forte (botão) | 5.08:1 | 6.19:1 | ✅ AA |
| link / fundo | 5.71:1 | 6.19:1 | ✅ AA |
| destaque-texto / destaque | 8.66:1 | 10.29:1 | ✅ AAA |
| oliva-texto / fundo | 5.24:1 | 6.84:1 | ✅ AA |

Regras derivadas:
- `--cor-acento` **nunca** em texto pequeno; para link use `--cor-link`.
- Botão primário sempre `--cor-acento-forte` + `--cor-acento-texto` (as duplas acima).
- Selo sempre `--cor-destaque` + `--cor-destaque-texto`.

### 4.2 Tipografia

| Papel | Família | Pesos | Uso |
|---|---|---|---|
| Display | **Bitter** (slab) | 700, 900 | h1, h2, números, logo |
| Texto | **Archivo** (grotesca) | 400, 500, 700 | corpo, nav, botões, tags |

Carregamento: self-host `woff2` em `assets/fonts/` (preferido) **ou** Google Fonts com `preconnect` + `display=swap`. Fallbacks: `Georgia, serif` / `system-ui, sans-serif`.

Escala fluida:
| Nível | Tamanho | Uso |
|---|---|---|
| Display XL | `clamp(3rem, 9vw, 7.5rem)` | h1 da home |
| Display L | `clamp(2.25rem, 5.5vw, 4rem)` | h1 internos, h2 |
| Título | `clamp(1.5rem, 3vw, 2rem)` | h3, título de card |
| Corpo G | `1.125rem` | parágrafo de destaque |
| Corpo | `1rem` | texto padrão |
| Micro | `0.8125rem` | tags, legendas, metadados |

Títulos display: `letter-spacing: -0.02em`, `line-height: 1.02`. Corpo: `1.65`, máximo 68ch. Nunca justificar.

### 4.3 Espaçamento
Base 4px: `--e-1 .25rem` · `--e-2 .5rem` · `--e-3 1rem` · `--e-4 1.5rem` · `--e-5 2rem` · `--e-6 3rem` · `--e-7 4rem` · `--e-8 6rem` · `--e-9 8rem`.
Seções: `padding-block: clamp(3rem, 8vw, 6rem)`.

### 4.4 Grid
Container `max-width: 76rem`, `padding-inline: clamp(1rem, 4vw, 2.5rem)`. 12 colunas no desktop, 4 no mobile. Página de projeto: coluna de leitura `68ch` + blocos que extrapolam.

### 4.5 Bordas, sombras, formas
```
--borda-forte: 3px solid var(--cor-borda);
--borda-fina: 1.5px solid var(--cor-borda);
--sombra-dura: 8px 8px 0 var(--cor-sombra);
--sombra-dura-sm: 4px 4px 0 var(--cor-sombra);
--raio-sm: .75rem;
--raio-md: 1.5rem;
--raio-lg: 2.25rem;      /* cards e caixas de texto */
--raio-pill: 999px;      /* botões, tags, selos, filtros, controles */
--raio-organico: 2.5rem 4rem 2.25rem 1.25rem;  /* blocos de destaque */
--raio-blob: 48% 52% 45% 55% / 52% 44% 56% 48%;
```
Hover: `translate(-2px,-2px)` + sombra +2px. Active: `translate(2px,2px)` + sombra 0.
Nenhum componente usa canto reto: controles em pílula, cards com raio grande, blocos decorativos com raio assimétrico.

### 4.6 Textura e detalhes
- Grão SVG (`feTurbulence`) em overlay `pointer-events:none`, `opacity ≤ .06`, `aria-hidden`.
- Selos com rotação −3° a 3°.
- Divisores: faixa de 8px ou linha dupla.
- Ícones SVG inline, traço 2px.

### 4.7 Movimento
| Elemento | Comportamento |
|---|---|
| Entrada de seção | `opacity 0→1` + `translateY(24px→0)`, 500ms |
| Hover em card | deslocamento + sombra cresce |
| Marquee | faixa infinita, pausa no hover |
| Selo | rotação ±2° no hover |
| Link/CTA | sublinhado desenhado |
| Troca de tema | transição de 200ms apenas em `background-color`/`color` |
| Troca de idioma | crossfade 150ms |

Com `prefers-reduced-motion: reduce`: **nada se move**, transições de tema viram instantâneas.

### 4.8 Componentes

1. **Header** — logo slab + nav + controles (idioma, tema). Em mobile: botão `MENU` abre painel full-screen.
2. **Nav item** — caixa alta, `aria-current="page"`, sublinhado grosso no ativo.
3. **Botão primário** — `--cor-acento-forte` + `--cor-acento-texto`, borda forte, sombra dura. Variante `--secundario`: superfície + texto.
4. **Card de projeto** — capa, índice (01…), título, resumo 1 linha, tags, seta.
5. **Tag/stack** — pílula reta, borda fina, micro tipo.
6. **Bloco de destaque** — faixa `--cor-painel` com manifesto.
7. **Marquee** — faixa `--cor-destaque`, `aria-hidden`.
8. **Rodapé** — painel invertido, contato, links, controles de tema/idioma, crédito.
9. **Seletor de idioma** — `PT | EN`, `aria-current="true"` no ativo.
10. **Seletor de tema** (E1) — grupo de 3 botões `Auto · Claro · Escuro`, `aria-pressed`, ícone + rótulo; no mobile entra no painel do menu.
11. **Botão copiar** — e-mail e link de projeto; feedback "copiado" por 2s via `aria-live="polite"`.
12. **Botão voltar ao topo** (E4) — circular, canto inferior direito, aparece após 600px.
13. **Barra de progresso** (E5) — 3px no topo, cor `--cor-destaque`, animada por `scaleX`.
14. **Menu mobile** — painel full-screen, foco preso, `Esc` fecha.

---

## 5. Arquitetura de informação

### 5.1 Sitemap
```
/                       Home
/projetos.html          Lista + filtro
/projetos/exemplo.html  Template de projeto (noindex, não linkado)
/projetos/<slug>.html   Projetos reais (futuro)
/sobre.html
/contato.html
/404.html
/styleguide.html        Interno (noindex)
```

Nav principal: **Início · Projetos · Sobre · Contato** + controles de tema e idioma.
Rodapé: GitHub, LinkedIn, e-mail, tema, idioma, crédito.

### 5.2 Home
1. **Hero** — nome em Display XL, cargo, 1 frase, CTAs "Ver projetos" / "Falar comigo", selo rotacionado "Disponível para estágio".
2. **Marquee** — "FULL STACK · INTERFACES · DADOS · DESIGN ·".
3. **Projetos em destaque** — cards com `destaque: true` + link "ver todos".
4. **Manifesto** — bloco painel com 3 frases.
5. **Sobre resumido** — 2 parágrafos + link.
6. **CTA final** — e-mail + LinkedIn.
7. **Rodapé**.

### 5.3 Projetos
h1 + subtítulo · filtro (Todos/Web/Dados/Faculdade) com contador · grade 1/2/2–3 colunas · estado vazio · estado "em construção" quando `projetos.length === 0` · CTA para GitHub.
Filtro sem JS: mostra todos os cards (fallback declarado). Filtro ativo persiste em `?filtro=web` (opcional).

### 5.4 Detalhe do projeto
Voltar · barra de progresso · título + ano + função · capa · resumo · O problema · A solução · Stack · Resultado e aprendizados · links (repo/demo) · copiar link · próximo projeto.

### 5.5 Sobre
h1 + subtítulo · 3 parágrafos · linha do tempo (3 marcos, datas `TODO`) · stack em uso (Front/Back/Dados/Ferramentas) · "Fora do código" (`TODO`) · CTA.

### 5.6 Contato
h1 + texto · cartão com e-mail em destaque + copiar · LinkedIn · GitHub · prazo de resposta (`TODO` confirmar) · sem formulário com backend.

### 5.7 404
Bloco "404 — página não encontrada", frase no tom da marca, botão para a home, mesmo header/rodapé.

---

## 6. Tema e idioma

### 6.1 Tema (E1)
- Estados: `auto` (padrão) · `claro` · `escuro`.
- `auto` resolve por `prefers-color-scheme` e **reage a mudanças do sistema** (`matchMedia(...).addEventListener('change')`) enquanto o estado for `auto`.
- Persistência: `localStorage["tema"]` = `auto|claro|escuro`.
- Aplicação: `document.documentElement.dataset.theme = "light" | "dark"` (nunca `filter: invert()`).
- Sem flash: script inline no `<head>` (antes do CSS renderizar) resolve e aplica o tema; `color-scheme` também é atualizado para o navegador estilizar scrollbars/inputs.
- Sem JS: tema claro (degradação aceitável e declarada).
- `meta[name="theme-color"]` muda entre `#F4EBD8` e `#17140F`.
- Controles sincronizados: todos os `.tema` da página refletem o mesmo estado via `aria-pressed`.

### 6.2 Idioma (E2)
- Uma árvore de páginas. PT é o padrão no HTML (indexável); EN aplicado em runtime.
- Marcação: `data-i18n="chave"` para texto; `data-i18n-attr="alt|aria-label|content|placeholder"` para atributos.
- Dicionários: `assets/i18n/pt.json` e `assets/i18n/en.json` — objeto **plano** (sem aninhamento), com chaves pontuadas: `"home.hero.nome": "Pedro Henrique"`.
- Prioridade: `?lang=` → `localStorage["idioma"]` → `pt`.
- Ao trocar: `document.documentElement.lang`, `<title>`, `meta[description]`, `aria-label`s e `aria-pressed` traduzidos são atualizados; URL recebe `?lang=en` via `history.replaceState`.
- Chave ausente em EN: cai para PT e emite `console.warn`.
- Conteúdo EN mantém o mesmo tom e ±20% de extensão.

---

## 7. Modelo de dados dos projetos

Fonte: `assets/js/projects.js` (usada pela listagem/filtro). Páginas de detalhe são HTML estático (SEO + robustez).

```js
export const projetos = [
  {
    slug: "projeto-01",
    indice: "01",
    titulo: { pt: "...", en: "..." },
    resumo: { pt: "...", en: "..." },
    ano: 2026,
    categoria: "web",              // web | dados | faculdade
    stack: ["HTML", "CSS", "JavaScript"],
    links: { repo: "https://...", demo: null },
    destaque: true,
    status: "publicado"            // publicado | wip | arquivado
  }
];
```

**Estado inicial:** array **vazio** (`export const projetos = [];`). A listagem então mostra o estado "em construção" e o link para `projetos/exemplo.html` fica fora da lista. Nenhum projeto fictício é publicado.

**Como adicionar um projeto** (documentar no README):
1. Copiar `projetos/exemplo.html` → `projetos/<slug>.html`; remover `noindex`; preencher os `TODO`.
2. Adicionar o objeto em `projects.js`.
3. Adicionar chaves de texto em `pt.json`/`en.json` (se o projeto tiver conteúdo próprio).
4. Testar na lista + link.

---

## 8. Responsividade

| Faixa | Comportamento |
|---|---|
| < 40rem | 1 coluna, nav em painel, hero empilhado, `--sombra-dura-sm`, controles dentro do painel |
| 40–63.9rem | 2 colunas, nav ainda em painel |
| ≥ 64rem | nav horizontal, 12 col, sombras completas, assimetria ativa |
| ≥ 80rem | container central, mais respiro, sobreposição no hero |

Proibido: scroll horizontal; corpo < 16px; alvo de toque < 44px.

---

## 9. Acessibilidade

Meta **WCAG 2.2 AA**. Checklist completo em `AGENTS.md` §6. Específicos deste projeto:
- Marquee e grão: `aria-hidden="true"`.
- Selos decorativos: `aria-hidden` quando não carregam informação.
- Menu mobile: trap de foco, `Esc`, retorno de foco.
- Seletor de tema: `role="group"` + `aria-pressed`; rótulo traduzido.
- Nenhuma informação transmitida só por cor (tema ativo também tem `aria-pressed` + peso da fonte).
- `prefers-reduced-motion` desliga marquee, reveals e transições.
- Contraste dos dois temas validado (tabela §4.1).

---

## 10. SEO e metadados

- `<title>` e `meta[description]` únicos por página, em PT e EN.
- Open Graph + Twitter Card: `og:title`, `og:description`, `og:image` (1200×630 em `assets/img/og.png`), `og:type`, `og:locale`.
- `link rel="canonical"` por página.
- JSON-LD: `Person` (nome, `sameAs` GitHub/LinkedIn) + `WebSite`.
- `hreflang` `pt-BR` e `en` apontando para a mesma URL com `?lang=` (documentar limitação).
- `robots.txt` + `sitemap.xml` (excluir `styleguide.html` e `projetos/exemplo.html`).
- `noindex` nas páginas internas.

---

## 11. Performance

Orçamento em `AGENTS.md` §7. Decisões: 4 arquivos CSS (+print), 6 módulos JS, 2 famílias de fonte, ilustrações em SVG/CSS, zero bibliotecas.

---

## 12. Publicação (GitHub Pages)

**Pré-requisito:** repositório **público** (Pages gratuito).

1. `gh repo edit GrandoPh/Pagina-Pessoal --visibility public --accept-visibility-change-consequences`
2. Settings → Pages → *Deploy from a branch* → `main` / `/ (root)`
3. `.nojekyll` na raiz
4. URL `https://grandoph.github.io/Pagina-Pessoal/` → **caminhos relativos sempre**
5. `404.html` na raiz é usado automaticamente
6. Domínio próprio futuro: `CNAME` + DNS (caminhos relativos já suportam)
7. Deploy = `git push` na `main`

---

## 13. Estrutura de arquivos

```
/
├── AGENTS.md
├── SPECS.md
├── TODO.md
├── README.md
├── .nojekyll
├── index.html
├── projetos.html
├── sobre.html
├── contato.html
├── 404.html
├── styleguide.html          (noindex)
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/
│   │   ├── tokens.css       (claro + escuro)
│   │   ├── base.css         (reset, tipografia, grão, utilitários)
│   │   ├── layout.css       (container, grid, seções, header/footer)
│   │   ├── components.css   (botões, cards, tags, marquee, controles)
│   │   └── print.css
│   ├── js/
│   │   ├── theme.js         (E1)
│   │   ├── i18n.js          (E2)
│   │   ├── nav.js           (menu mobile, sticky header)
│   │   ├── motion.js        (reveal, marquee)
│   │   ├── ui.js            (topo, progresso, copiar)
│   │   └── projects.js      (dados + render + filtro)
│   ├── i18n/
│   │   ├── pt.json
│   │   └── en.json
│   ├── img/
│   │   └── og.png
│   ├── fonts/               (se self-hosted)
│   └── favicon.svg
└── projetos/
    └── exemplo.html         (noindex, template)
```

---

## 14. Fases

| Fase | Entrega | Aceite |
|---|---|---|
| 0 | Repo público + Pages + `.nojekyll` | URL responde 200 |
| 1 | `tokens.css` (2 temas) + `base.css` + favicon + boot de tema | Troca de tema sem flash |
| 2 | `layout.css` + `components.css` | Componentes visíveis nos 2 temas |
| 3 | `theme.js`, `i18n.js`, `nav.js`, `motion.js`, `ui.js` | Controles funcionam e persistem |
| 4 | `index.html` | Lighthouse Perf ≥ 95 / A11y 100 |
| 5 | `projetos.html` + `projetos/exemplo.html` | Estado vazio + template ok |
| 6 | `sobre.html`, `contato.html`, `404.html` | Navegação completa |
| 7 | `print.css`, `robots.txt`, `sitemap.xml`, OG, JSON-LD | Meta tags e print ok |
| 8 | QA completo (`TODO.md` §F8) | Todos os testes passam |
| 9 | Deploy e verificação pós-deploy | URL pública ok nos 2 temas e 2 idiomas |

---

## 15. Pendências (bloqueiam conteúdo, não o layout)

| # | Item | Impacto |
|---|---|---|
| 1 | **E-mail real** | Contato e rodapé |
| 2 | **URL do LinkedIn** | Contato e rodapé |
| 3 | Projetos reais | Páginas de detalhe |
| 4 | Datas da linha do tempo | Sobre |
| 5 | Texto "fora do código" | Sobre |
| 6 | Confirmar prazo "48h" | Contato |
| 7 | Domínio próprio (opcional) | CNAME |
| 8 | CV em PDF (opcional) | Botão "baixar CV" |
| 9 | Confirmar repo público | Publicação |
| 10 | Stack real (o que já domina × o que está aprendendo) | Sobre |

Enquanto 1–3 não chegam: `<!-- TODO -->`, `aria-disabled="true"`, nenhum dado inventado.

---

## 16. Riscos e mitigação

| Risco | Mitigação |
|---|---|
| Personalidade prejudicar legibilidade | Tokens fixos + tabela de contraste + revisão na F8 |
| Repo privado bloquear Pages | Tornar público na Fase 0 |
| Caminho absoluto quebrar na subpasta | Regra em `AGENTS.md` §2.3 + teste T04 |
| Tema escuro "improvisado" | Tokens próprios por tema; proibido `filter: invert()` |
| Flash de tema errado | Boot script inline no `<head>` + teste T12 |
| i18n incompleto | Fallback para PT + teste T16 |
| Conteúdo inventado | Copy deck §19 com `TODO` explícitos |
| Modelo executor pular etapa | `TODO.md` sequencial com verificação por tarefa |

---

## 17. Melhorias futuras (não nesta versão)

RSS dos projetos · busca por teclado · animação de transição entre páginas · modo de alto contraste · `prefers-reduced-data` · compartilhamento nativo (`navigator.share`).

---

## 18. Copy deck (PT / EN)

Todo texto do site sai daqui. Chaves em `pt.json` / `en.json`.

| Chave | PT | EN |
|---|---|---|
| `nav.inicio` | Início | Home |
| `nav.projetos` | Projetos | Projects |
| `nav.sobre` | Sobre | About |
| `nav.contato` | Contato | Contact |
| `hero.rotulo` | Disponível para estágio | Open to internships |
| `hero.nome` | Pedro Henrique | Pedro Henrique |
| `hero.cargo` | Ciência da Computação · Full Stack | Computer Science · Full Stack |
| `hero.frase` | Construo interfaces e sistemas que funcionam no mundo real — do banco de dados ao último pixel. | I build interfaces and systems that work in the real world — from the database to the last pixel. |
| `hero.cta.projetos` | Ver projetos | See projects |
| `hero.cta.contato` | Falar comigo | Get in touch |
| `marquee.texto` | FULL STACK · INTERFACES · DADOS · DESIGN · | FULL STACK · INTERFACES · DATA · DESIGN · |
| `home.destaques.titulo` | Projetos em destaque | Featured projects |
| `home.destaques.link` | Ver todos os projetos | See all projects |
| `home.manifesto.titulo` | Como eu trabalho | How I work |
| `home.manifesto.f1` | Entendo o problema antes de escolher a tecnologia. | I understand the problem before choosing the technology. |
| `home.manifesto.f2` | Escrevo código que outra pessoa consegue ler depois. | I write code someone else can read later. |
| `home.manifesto.f3` | Trato design como parte da entrega, não como enfeite. | I treat design as part of the delivery, not decoration. |
| `home.sobre.titulo` | Quem está por trás | Who's behind it |
| `home.sobre.p1` | Sou Pedro, estudante de Ciência da Computação e desenvolvedor em formação com foco em full stack. Gosto de resolver o problema inteiro: modelar os dados, montar a API e desenhar a tela. | I'm Pedro, a Computer Science student and developer in training focused on full stack. I like solving the whole problem: modeling data, building the API and designing the screen. |
| `home.sobre.p2` | Este site é meu laboratório público: cada projeto aqui é algo que eu construí, quebrei e refiz até funcionar. | This site is my public lab: every project here is something I built, broke and rebuilt until it worked. |
| `home.sobre.link` | Mais sobre mim | More about me |
| `cta.titulo` | Vamos construir alguma coisa | Let's build something |
| `cta.texto` | Aberto a estágio, freela e conversas sobre código. | Open to internships, freelance work and conversations about code. |
| `rodape.credito` | Feito à mão com HTML, CSS e JS. | Handmade with HTML, CSS and JS. |
| `projetos.titulo` | Projetos | Projects |
| `projetos.sub` | O que eu construí, quebrei e aprendi. | What I built, broke and learned. |
| `projetos.filtro.todos` | Todos | All |
| `projetos.filtro.web` | Web | Web |
| `projetos.filtro.dados` | Dados | Data |
| `projetos.filtro.faculdade` | Faculdade | Coursework |
| `projetos.contagem` | {n} projeto(s) | {n} project(s) |
| `projetos.vazio` | Nada aqui ainda. | Nothing here yet. |
| `projetos.construcao` | Primeiro projeto a caminho. | First project on its way. |
| `projeto.voltar` | Projetos | Projects |
| `projeto.problema` | O problema | The problem |
| `projeto.solucao` | A solução | The solution |
| `projeto.stack` | Stack | Stack |
| `projeto.resultado` | Resultado e aprendizados | Outcome and learnings |
| `projeto.repo` | Ver código | View code |
| `projeto.demo` | Ver demo | View demo |
| `projeto.proximo` | Próximo projeto | Next project |
| `projeto.copiar` | Copiar link | Copy link |
| `projeto.copiado` | Link copiado | Link copied |
| `sobre.titulo` | Sobre | About |
| `sobre.sub` | Estudante, desenvolvedor, curioso profissional. | Student, developer, professionally curious. |
| `sobre.p1` | Curso Ciência da Computação e uso cada semestre como desculpa para construir algo novo. Comecei pelo front-end, me apaixonei por lógica e hoje trabalho nas duas pontas. | I study Computer Science and use every semester as an excuse to build something new. I started in front-end, fell for logic, and today I work on both ends. |
| `sobre.p2` | Meu foco é full stack: APIs claras, dados bem modelados e interfaces que não fazem o usuário pensar. | My focus is full stack: clear APIs, well-modeled data and interfaces that don't make users think. |
| `sobre.p3` | Busco um estágio onde eu possa aprender com gente melhor que eu — e entregar de verdade desde o primeiro mês. | I'm looking for an internship where I can learn from people better than me — and actually deliver from month one. |
| `sobre.timeline.titulo` | Linha do tempo | Timeline |
| `sobre.timeline.i1` | Início da graduação em Ciência da Computação — TODO | Started Computer Science degree — TODO |
| `sobre.timeline.i2` | Primeiros projetos web — TODO | First web projects — TODO |
| `sobre.timeline.i3` | Foco em desenvolvimento full stack — TODO | Focus on full stack development — TODO |
| `sobre.stack.titulo` | Stack em uso | Working stack |
| `sobre.stack.front` | Front | Front |
| `sobre.stack.back` | Back | Back |
| `sobre.stack.dados` | Dados | Data |
| `sobre.stack.ferramentas` | Ferramentas | Tools |
| `sobre.fora.titulo` | Fora do código | Away from code |
| `sobre.fora.texto` | TODO: Pedro — um parágrafo sobre hobbies. | TODO: Pedro — one paragraph about hobbies. |
| `contato.titulo` | Vamos conversar | Let's talk |
| `contato.texto` | A melhor forma de falar comigo é por e-mail. Respondo em até 48 horas. | The best way to reach me is by email. I reply within 48 hours. |
| `contato.email.rotulo` | E-mail | Email |
| `contato.copiar` | Copiar e-mail | Copy email |
| `contato.copiado` | E-mail copiado | Email copied |
| `contato.linkedin` | LinkedIn | LinkedIn |
| `contato.github` | GitHub | GitHub |
| `tema.rotulo` | Tema | Theme |
| `tema.auto` | Auto | Auto |
| `tema.claro` | Claro | Light |
| `tema.escuro` | Escuro | Dark |
| `idioma.rotulo` | Idioma | Language |
| `ui.menu` | Menu | Menu |
| `ui.fechar` | Fechar menu | Close menu |
| `ui.voltarTopo` | Voltar ao topo | Back to top |
| `ui.novaAba` | abre em nova aba | opens in a new tab |
| `meta.home.titulo` | Pedro Henrique — Portfólio Full Stack | Pedro Henrique — Full Stack Portfolio |
| `meta.home.desc` | Estudante de Ciência da Computação construindo projetos full stack, do banco de dados à interface. | Computer Science student building full stack projects, from the database to the interface. |
| `meta.projetos.titulo` | Projetos — Pedro Henrique | Projects — Pedro Henrique |
| `meta.projetos.desc` | Projetos de desenvolvimento full stack: web, dados e trabalhos da faculdade. | Full stack development projects: web, data and coursework. |
| `meta.sobre.titulo` | Sobre — Pedro Henrique | About — Pedro Henrique |
| `meta.sobre.desc` | Trajetória, stack e foco de um estudante de Ciência da Computação em full stack. | Background, stack and focus of a Computer Science student in full stack. |
| `meta.contato.titulo` | Contato — Pedro Henrique | Contact — Pedro Henrique |
| `meta.contato.desc` | Fale comigo por e-mail ou LinkedIn. | Reach me by email or LinkedIn. |
| `meta.erro.titulo` | Página não encontrada — Pedro Henrique | Page not found — Pedro Henrique |
| `erro.titulo` | 404 — página não encontrada | 404 — page not found |
| `erro.texto` | O link quebrou ou a página saiu de férias. | The link broke or the page went on vacation. |
| `erro.cta` | Voltar para o início | Back to home |

---

## 19. Glossário de decisões

| Decisão | Motivo |
|---|---|
| Zero build | Deploy de graça, manutenção zero, durável por anos |
| Tokens em CSS, não em JS | Troca de tema instantânea, sem repaint de estilo inline |
| 3 estados de tema | Respeita o sistema por padrão sem tirar o controle do usuário |
| PT no HTML + EN em JSON | Uma árvore de páginas, SEO em PT preservado |
| Detalhes de projeto em HTML estático | Robustez e indexação; JS só lista e filtra |
| Array de projetos vazio no início | Nada fictício publicado; estado vazio tratado no design |
