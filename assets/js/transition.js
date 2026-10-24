/* ---------- View Transitions: tema e idioma ---------- */
const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)');

/**
 * Executa `fn` dentro de uma View Transition nativa quando:
 * - o navegador suporta `document.startViewTransition`;
 * - o usuário não pediu movimento reduzido.
 * Sem suporte, executa direto (nenhum conteúdo depende disso).
 */
export function comTransicao(fn) {
  if (reduzido.matches || typeof document.startViewTransition !== 'function') {
    fn();
    return;
  }

  try {
    document.startViewTransition(fn);
  } catch (erro) {
    console.warn('[transicao] view transition indisponível:', erro);
    fn();
  }
}
