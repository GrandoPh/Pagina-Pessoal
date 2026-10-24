/* ---------- Voltar ao topo, progresso e copiar ---------- */
const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)');
const topo = document.querySelector('#topo');
const progresso = document.querySelector('#progresso');

if (topo) {
  topo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduzido.matches ? 'auto' : 'smooth' });
  });
}

let agendado = false;

function atualizar() {
  agendado = false;

  if (topo) topo.hidden = window.scrollY < 600;

  if (progresso) {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const proporcao = total > 0 ? window.scrollY / total : 0;
    const limitado = Math.min(1, Math.max(0, proporcao));
    progresso.style.transform = `scaleX(${limitado})`;
  }
}

function pedirAtualizacao() {
  if (agendado) return;
  agendado = true;
  requestAnimationFrame(atualizar);
}

window.addEventListener('scroll', pedirAtualizacao, { passive: true });
window.addEventListener('resize', pedirAtualizacao);
atualizar();

document.querySelectorAll('[data-copiar]').forEach((el) => {
  el.addEventListener('click', async () => {
    const texto = el.dataset.copiar;
    const alvoId = el.dataset.aviso ? `#${el.dataset.aviso}` : '#aviso-copia';
    const aviso = document.querySelector(alvoId);

    try {
      await navigator.clipboard.writeText(texto);
      if (aviso) {
        aviso.textContent = el.dataset.mensagem || 'Copiado';
        setTimeout(() => {
          if (aviso.textContent === (el.dataset.mensagem || 'Copiado')) aviso.textContent = '';
        }, 2000);
      }
    } catch (erro) {
      console.warn('[copiar] clipboard indisponível:', erro);
    }
  });
});
