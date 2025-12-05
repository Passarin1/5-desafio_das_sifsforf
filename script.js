/* script.js
 - rolagem suave
 - botão "Registrar Relato" abre formulário
 - form submit monta mailto (sem backend). Edite DEST_EMAIL abaixo para ajustar o destinatário.
*/

const DEST_EMAIL = "contato@terrasinvisiveis.com"; // <--- coloque o e-mail real aqui

// scroll suave para anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// botão "Quero Explorar" (header) foca no mapa
document.getElementById('btn-collab').addEventListener('click', ()=>{
  const el = document.getElementById('mapa') || document.getElementById('regioes');
  if(el) el.scrollIntoView({behavior:'smooth'});
});

// botão que foca o form
document.getElementById('btn-registrar').addEventListener('click', ()=>{
  document.getElementById('nome').focus();
  document.getElementById('contato')?.scrollIntoView({behavior:'smooth'});
});

// anima mapa: flutuação suave
document.querySelectorAll('.flutuando').forEach(img=>{
  let t = 0;
  function step(){
    t += 0.02;
    img.style.transform = `translateY(${Math.sin(t) * 10}px) rotate(${Math.sin(t/6) * 0.3}deg)`;
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
});

// form: cria mailto com conteúdo preenchido
document.getElementById('contact-form')?.addEventListener('submit', function(e){
  e.preventDefault();
  const nome = encodeURIComponent(this.nome.value.trim());
  const email = encodeURIComponent(this.email.value.trim());
  const tipo = encodeURIComponent(this.tipo.value);
  const desc = encodeURIComponent(this.descricao.value.trim());

  // resumo curto para assunto
  const subject = encodeURIComponent(`[Relato - ${tipo}] ${nome || 'Explorador anônimo'}`);
  const body = encodeURIComponent(`Nome: ${nome}\nEmail: ${email}\nTipo: ${tipo}\n\nDescrição:\n${decodeURIComponent(desc)}`);

  // montar mailto
  const mailto = `mailto:${DEST_EMAIL}?subject=${subject}&body=${body}`;
  // abrir cliente de email do usuário
  window.location.href = mailto;
});

// limpeza do form
document.getElementById('btn-reset')?.addEventListener('click', ()=>{
  const form = document.getElementById('contact-form');
  if(form) form.reset();
});
