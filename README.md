# Página Pessoal

Portfólio pessoal de Pedro Henrique — estudante de Ciência da Computação com foco em Full Stack.

**Site publicado:** https://grandoph.github.io/Pagina-Pessoal/

## Stack

HTML, CSS e JavaScript nativos. Sem framework, sem build, sem dependências. O que está no repositório é o que é publicado.

## Rodar localmente

O site usa `fetch` para carregar os dicionários de idioma, então precisa de um servidor HTTP (não funciona abrindo o arquivo direto).

```powershell
python -m http.server 8000
```

Depois abra http://localhost:8000/.

## Estrutura

```
index.html            Home
projetos.html         Lista + filtro
projetos/exemplo.html Template de página de projeto (noindex)
sobre.html            Sobre
contato.html          Contato
404.html              Página de erro (GitHub Pages usa automaticamente)
styleguide.html       Referência visual interna (noindex)
assets/css/           tokens (tema claro/escuro), base, layout, componentes, impressão
assets/js/            theme, i18n, nav, motion, ui, projects, transition
assets/i18n/          pt.json e en.json (objetos planos, chaves pontuadas)
assets/img/           og.png (1200×630)
```

## Como adicionar um projeto

1. Copie `projetos/exemplo.html` para `projetos/<slug>.html`.
2. Remova `<meta name="robots" content="noindex">` e preencha os `TODO`.
3. Ajuste os caminhos se necessário (o template já usa `../`).
4. Adicione o objeto em `assets/js/projects.js`:

```js
{
  slug: "meu-projeto",
  indice: "01",
  titulo: { pt: "Meu projeto", en: "My project" },
  resumo: { pt: "Uma linha sobre ele.", en: "One line about it." },
  ano: 2026,
  categoria: "web",           // web | dados | faculdade
  stack: ["HTML", "CSS"],
  links: { repo: "https://github.com/GrandoPh", demo: null },
  destaque: true,
  status: "publicado"
}
```

5. Rode o site e confira a listagem e a página.

## Tema

Três estados: **Auto** (segue o sistema), **Claro** e **Escuro**. A escolha fica em `localStorage["tema"]` e é aplicada por um script inline no `<head>` para evitar flash. Todas as cores vêm de `assets/css/tokens.css` — nunca use cor literal em componente.

## Idioma

PT é o padrão e está no HTML (indexável). EN é aplicado em runtime por `data-i18n` / `data-i18n-attr`, com dicionários em `assets/i18n/`. A escolha fica em `localStorage["idioma"]` e na URL (`?lang=en`).

## Documentação do projeto

- `SPECS.md` — especificação completa (design system, páginas, i18n, SEO, deploy)
- `AGENTS.md` — regras de comportamento e convenções de código
- `TODO.md` — runbook de execução e checklist de testes

## Pendências de conteúdo

Marcadas como `TODO` no código e listadas em `SPECS.md` §15: e-mail real, LinkedIn, projetos, datas, hobbies.
