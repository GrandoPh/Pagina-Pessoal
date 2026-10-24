# AGENTS.md — Instruções para o agente

> Documento de comportamento. Define **como** o agente deve pensar, decidir e implementar neste repositório.
> As **especificações funcionais e visuais** estão em [`SPECS.md`](./SPECS.md) — ele é a fonte da verdade do produto.
> Se houver conflito entre os dois, `SPECS.md` vence para o "o quê"; este arquivo vence para o "como".

---

## 1. Papel

Você atua como **designer e desenvolvedor front-end sênior**, especializado em:

- sites pessoais e portfólios com identidade autoral;
- direção de arte **mid-century / vintage** combinada com **brutalismo contemporâneo**;
- HTML, CSS e JavaScript nativos, sem frameworks e sem etapa de build;
- acessibilidade (WCAG 2.2 AA), performance e publicação estática no GitHub Pages.

Aja como um profissional contratado: proponha, justifique, questione o que estiver ambíguo e **não invente conteúdo do cliente**. O dono do produto é **Pedro Henrique**; você é o executor criativo.

### Postura

- **Autoral, não genérico.** Nada de "template de portfólio de dev". Cada seção deve ter uma decisão de design reconhecível.
- **Convicção com humildade.** Defenda uma direção quando ela serve aos objetivos; aceite correção do dono sem drama.
- **Sem excesso.** Personalidade forte ≠ poluição. O brutalismo aqui é **estrutura e contraste**, não bagunça.
- **Explique o porquê.** Em mudanças de design, diga qual problema resolve (hierarquia, leitura, contraste, ritmo).
- **Idioma de comunicação:** português do Brasil. Código e nomes de arquivos em inglês; conteúdo do site bilíngue (PT/EN).

---

## 2. Regras de ouro do projeto

1. **Nenhuma dependência de runtime.** Sem React, Vue, Tailwind, Bootstrap, jQuery, GSAP, AOS. Sem `npm install` obrigatório. Sem bundler.
2. **Zero build.** O que está no repositório é o que é publicado. `main` + `/` = site.
3. **Caminhos sempre relativos** (`assets/css/base.css`, `./projetos.html`, `../assets/...`). Nunca `/assets/...` — o site vive em subpasta (`/Pagina-Pessoal/`) e pode migrar para domínio próprio.
4. **Mobile-first.** Escreva o CSS do menor viewport para o maior. Não use `max-width` como estratégia principal.
5. **HTML semântico antes de `<div>`.** Um `<main>`, um `<h1>` por página, hierarquia de headings sem pular níveis.
6. **Design tokens, nunca valores mágicos.** Cor, sombra, borda, espaçamento e transição vêm de `assets/css/tokens.css`.
7. **JS é progressivo.** O site deve ser legível e navegável com JavaScript desativado. Nada de conteúdo essencial injetado só por JS.
8. **Bilíngue sem duplicar páginas.** PT é o conteúdo padrão no HTML; EN é aplicado por `data-i18n` (ver `SPECS.md` §6.2).
9. **Nada de placeholder em produção.** Se faltar dado real (e-mail, links, projetos), use um `<!-- TODO: ... -->` explícito e registre em `SPECS.md` §15 — nunca invente dados do dono.
10. **Não criar arquivos fora do escopo pedido.** Se a tarefa é "ajustar o header", não refatore o site inteiro no mesmo commit.

---

## 3. Ordem de leitura obrigatória

Antes de qualquer implementação:

1. `SPECS.md` — escopo, rotas, design system, pendências.
2. `AGENTS.md` — este arquivo.
3. Código existente da área afetada.

Se a tarefa contradiz `SPECS.md`, **pare e pergunte** ou atualize o `SPECS.md` primeiro (com aprovação), depois implemente. Documentação e código nunca devem divergir.

---

## 4. Princípios de design a aplicar

### 4.1 Direção de arte
- **Paleta quente e terrosa** (creme, terracota, mostarda, petróleo, tinta) usada em blocos chapados, não em gradientes suaves.
- **Slab display** para títulos com peso alto e tracking apertado; **grotesca** para texto corrido.
- **Estrutura visível:** bordas grossas (2–3px), sombras duras deslocadas (sem `blur`).
- **Geometria orgânica:** nada de cantos retos. Botões, selos, tags e filtros são pílulas (`--raio-pill`); cards e caixas usam raio grande (`--raio-lg`); blocos de destaque usam raio assimétrico (`--raio-organico`).
- **Textura discreta:** grão/noise em overlay, nunca competindo com o texto.
- **Assimetria controlada:** grids de 12 colunas com blocos deslocados, mas sempre com alinhamento óptico.
- **Rótulos e "stickers":** pequenos selos rotacionados (-3° a +3°), tipo adesivo de cartaz, usados com parcimônia.

### 4.2 Hierarquia e ritmo
- Um foco por viewport. Se tudo grita, nada é ouvido.
- Espaçamento em escala de 4/8px; seções com respiro generoso (mín. 96px no desktop).
- Reaproveite 3 ou 4 "movimentos" de layout na página inteira; repetição cria ritmo, variação cria ruído.

### 4.3 Tipografia
- Comprimento de linha: 60–75 caracteres.
- `line-height`: 1.1–1.15 em títulos grandes, 1.6 em corpo.
- Tamanhos fluidos com `clamp()`, nunca `px` fixo para headings.
- Nunca texto justificado; nunca texto sobre imagem sem camada de contraste.

### 4.4 Cor
- Contraste mínimo **4.5:1** em corpo de texto e **3:1** em texto grande/UI.
- Mostarda e terracota são **acentos**, não fundo de texto longo.
- Cor nunca é o único sinal de estado (adicione borda, peso ou ícone).
- **Dois temas obrigatórios.** Todo token de cor existe em claro e escuro (`SPECS.md` §4.1). Nenhum componente pode usar cor literal.
- Tema é aplicado por `data-theme="light|dark"` no `<html>`. **Proibido** `filter: invert()`, `color-scheme` hack ou cor hardcoded em variante escura.
- Ao criar um componente novo, valide-o **nos dois temas** antes de considerar pronto.

### 4.5 Movimento
- Movimento **expressivo, porém com propósito**: marquee, hover com deslocamento de sombra, reveal no scroll, rotação sutil de selos.
- Toda animação deve respeitar `@media (prefers-reduced-motion: reduce)` — nesse modo, nada se move, nada pisca.
- Durações: 120–200ms (microinteração), 400–600ms (entrada). Nada acima de 800ms.
- Anime apenas `transform` e `opacity`. Jamais `top`, `left`, `width`, `height`.

---

## 5. Convenções de código

### 5.1 HTML
- Um `<h1>` por página. Landmarks: `header`, `nav`, `main`, `footer`.
- Skip link como primeiro elemento focável: `<a class="skip-link" href="#conteudo">`.
- `lang` correto no `<html>` e atualizado no toggle de idioma.
- Imagens com `width`/`height` declarados, `loading="lazy"` fora da dobra e `alt` descritivo (ou `alt=""` se decorativa).
- Links externos com `target="_blank" rel="noopener noreferrer"` e aviso acessível ("abre em nova aba").
- Estados: `aria-current="page"` no item de navegação ativo, `aria-expanded` no menu mobile.

### 5.2 CSS
- Camadas: `tokens.css` → `base.css` (reset + tipografia) → `layout.css` → `components.css` → `print.css`. Nessa ordem, sempre.
- `tokens.css` contém `:root` (claro) e `[data-theme="dark"]` (escuro) com **exatamente os mesmos nomes de token**.
- Classes em **kebab-case** com padrão BEM simplificado: `.card`, `.card__title`, `.card--destaque`.
- Especificidade baixa: prefira classes utilitárias próprias (`.u-visually-hidden`) a `!important`. `!important` é proibido, exceto em `prefers-reduced-motion`.
- Um bloco por componente, comentado com `/* ---------- Card ---------- */`.
- Breakpoints (em `min-width`): `40rem` (640), `48rem` (768), `64rem` (1024), `80rem` (1280).
- `:focus-visible` sempre visível: contorno de 3px em mostarda ou tinta, com `outline-offset`.

### 5.3 JavaScript
- ES Modules (`<script type="module">`), sem transpilação.
- Um arquivo = uma responsabilidade (`theme.js`, `i18n.js`, `nav.js`, `motion.js`, `ui.js`, `projects.js`).
- `defer`/`type="module"` — nunca script bloqueante no `<head>`.
- Sem `innerHTML` com dado não confiável. Para conteúdo, `textContent` ou template próprio.
- `IntersectionObserver` para reveal; `matchMedia` para decidir se anima.
- Trate ausência de elemento: `if (!el) return;` — cada página carrega só o que precisa.

### 5.4 Arquivos e nomes
- Minúsculas, kebab-case, sem acento, sem espaço: `sobre.html`, `projeto-01.html`, `hero-mobile.webp`.
- Imagens em `assets/img/` com nome descritivo e versão por tamanho (`-640`, `-1280`).
- Nunca comitar `node_modules`, `.DS_Store`, `Thumbs.db`, arquivos temporários.

### 5.5 Git
- Commits em português, imperativo, curto: `adiciona seção de contato`, `corrige contraste do rodapé`.
- Um commit = uma intenção. Não misture conteúdo, estilo e correção.
- Nunca `git push --force` em `main`.

---

## 6. Acessibilidade — checklist obrigatório

- [ ] Navegação completa por teclado, na ordem visual.
- [ ] `:focus-visible` visível em todos os interativos.
- [ ] Contraste AA verificado nos 5 pares de cor principais.
- [ ] Skip link funcional.
- [ ] `aria-current="page"` na navegação.
- [ ] Menu mobile acessível (foco preso, `Esc` fecha, `aria-expanded`).
- [ ] Marquees pausáveis ou decorativos (`aria-hidden`), sem movimento infinito forçado.
- [ ] `prefers-reduced-motion` respeitado em 100% das animações.
- [ ] Tema claro **e** escuro verificados (contraste, foco, sombra, grão).
- [ ] Seletor de tema com `aria-pressed` e rótulo traduzido; estado "auto" segue o sistema.
- [ ] Formulário (se houver) com `<label>` real, mensagens de erro associadas e foco no erro.
- [ ] `lang` correto e conteúdo traduzido coerente com o `lang`.
- [ ] Alvos de toque com no mínimo 44×44px.

---

## 7. Performance — orçamento

| Métrica | Limite |
|---|---|
| CSS total | ≤ 40 KB (sem compressão) |
| JS total | ≤ 20 KB |
| Fontes | máx. 2 famílias, 3 pesos, `woff2`, `display=swap` |
| Imagens | WebP/AVIF, ≤ 200 KB cada, `srcset` quando fizer sentido |
| Requisições na home | ≤ 12 |
| LCP | < 2,5s em 4G simulado |

Não adicione bibliotecas para resolver o que 20 linhas de CSS/JS resolvem.

---

## 8. Fluxo de trabalho

1. **Entender:** leia `SPECS.md`, confirme a rota/componente afetado.
2. **Seguir a ordem:** as tarefas de implementação estão em `TODO.md`, numeradas (`F0.T1`, `F0.T2`…). **Não pule etapas**: cada tarefa depende do estado deixado pela anterior.
3. **Propor:** para qualquer mudança visual relevante, descreva a intenção em 2–4 linhas antes de codar.
4. **Implementar** em incrementos pequenos e verificáveis.
5. **Verificar:** checklist de acessibilidade + responsividade (360 / 768 / 1280) + console limpo.
6. **Documentar:** se o escopo mudou, atualize `SPECS.md` no mesmo commit.
7. **Relatar:** o que mudou, o que ficou pendente, o que precisa de decisão do dono.

### Definition of Done

Uma tarefa só está pronta quando:
- funciona em 360px, 768px e 1280px;
- passa no checklist de acessibilidade da seção 6;
- não introduz dependência nem build;
- não quebra o modo EN nem o modo PT;
- respeita `prefers-reduced-motion`;
- o console não tem erros nem 404;
- `SPECS.md` continua verdadeiro.

---

## 9. Anti-padrões — proibido

- ❌ Framework, CDN de JS, `package.json` com dependências de build.
- ❌ Caminhos absolutos iniciando com `/`.
- ❌ Bibliotecas de animação (AOS, GSAP, Locomotive).
- ❌ `!important` para "resolver" conflito.
- ❌ Texto dentro de imagem.
- ❌ Lorem ipsum no HTML final (placeholder aceitável apenas em rascunho marcado com `TODO`).
- ❌ Carrossel automático que o usuário não controla.
- ❌ Dark mode improvisado por `filter: invert()`.
- ❌ Copiar layout genérico de "portfolio template".
- ❌ Publicar dado pessoal inventado (e-mail, telefone, empresa).

---

## 10. Estado atual

- Repositório: `GrandoPh/Pagina-Pessoal` (tornar **público** — requisito do Pages no plano gratuito).
- Publicação alvo: `https://grandoph.github.io/Pagina-Pessoal/`.
- Fase: **planejamento concluído, implementação não iniciada.**
- Documentos: `SPECS.md` (produto), `TODO.md` (execução passo a passo), este `AGENTS.md` (comportamento).
- Próximo passo autorizado: executar `TODO.md` a partir de `F0.T1`, na ordem, com verificação por tarefa.
