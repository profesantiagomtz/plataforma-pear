// Prueba automática: recorre un módulo y resuelve cada actividad usando la especificación del contenido.
import { moduloView } from '../js/modulo.js';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const q = (s, r = document) => r.querySelector(s);
const qa = (s, r = document) => [...r.querySelectorAll(s)];

export async function runModule(id, view = document.getElementById('view')) {
  const spec = (await import(`../content/${id}.js?` + Date.now())).default; const pages = [{ type: 'intro' }, ...spec.pages];
  view.innerHTML = ''; const errs = []; const onerr = (e) => errs.push(e.message || String(e.reason)); window.addEventListener('error', onerr); window.addEventListener('unhandledrejection', onerr);
  await moduloView(view, { profile: { role: 'teacher', id: 'dev' }, param: [id] }); await wait(250);
  const report = [], bad = [];
  for (let k = 0; k < pages.length; k++) {
    const st = q('#stage'); const p = pages[k]; const title = (q('h1', st)?.innerText || '').slice(0, 48); let note = '';
    try {
    if (p.type === 'lesson') { let n = 0; while (q('#more') && n < 60) { q('#more').click(); n++; await wait(25); } note = `${n + 1} partes`; if (q('#next').disabled) bad.push(`lección «${title}» no se desbloquea al leer`); }
    else if (p.type === 'guia') {
      for (let i = 0; i < p.steps.length; i++) { const s = p.steps[i]; const box = qa('.gs', st)[i];
        if ((s.mode || 'n') === 'sel') { qa('[data-go]', box).find((b) => b.dataset.go === String(s.ans))?.click(); }
        else { q('input', box).value = Array.isArray(s.ans) ? (s.mode === 'fs' ? s.ans.join('/') : s.ans.join(',')) : String(s.ans); q('[data-gc]', box).click(); }
        await wait(40); if (!box.classList.contains('ok')) bad.push(`guía «${title}» paso ${i + 1} no se resolvió`); }
      note = `${p.steps.length} pasos`; if (q('#next').disabled) bad.push(`guía «${title}» no se desbloquea`);
    }
    else if (p.type === 'mc') { p.qs.forEach((qq, i) => q(`.opt[data-q="${i}"][data-j="${qq[2]}"]`, st)?.click()); await wait(100); note = q('.res', st)?.innerText || ''; if (q('#next').disabled) bad.push(`repaso «${title}» no se desbloquea`); }
    else if (p.type === 'match') { qa('.q', st).forEach((row, i) => { q('select', row).value = p.rows[i][1]; }); q('[data-check]', st).click(); await wait(60); note = q('.res', st)?.innerText || ''; if (q('#next').disabled) bad.push(`match «${title}» no se desbloquea`); }
    else if (p.type === 'cloze') { qa('select', st).forEach((s, i) => { s.value = p.blanks[i][0]; }); q('[data-check]', st).click(); await wait(60); note = q('.res', st)?.innerText || ''; if (q('#next').disabled) bad.push(`cloze «${title}» no se desbloquea`); }
    else if (p.type === 'order') { const ul = q('.ord', st); p.items.forEach((_, i) => { const li = q(`li[data-i="${i}"]`, ul); ul.append(li); }); q('[data-check]', st).click(); await wait(60); note = q('.res', st)?.innerText || ''; if (q('#next').disabled) bad.push(`order «${title}» no se desbloquea`); }
    else if (p.type === 'tt') { const n = p.vars.length, rows = 1 << n; const fns = p.cols.map((c) => new Function(...p.vars, `return !!(${c.f});`));
      for (let r = 0; r < rows; r++) { const vals = p.vars.map((_, j) => !((r >> (n - 1 - j)) & 1)); fns.forEach((f, c) => { const b = q(`.ttb[data-r="${r}"][data-c="${c}"]`, st); b.click(); if (!f(...vals)) b.click(); }); }
      q('[data-check]', st).click(); await wait(60); note = q('.res', st)?.innerText || ''; if (q('#next').disabled) bad.push(`tt «${title}» no se desbloquea`); }
    else if (p.type === 'gen') { q('[data-reveal]', st).click(); await wait(40); const vals = qa('.ti', st).map((i) => i.value); if (vals.some((v) => !v)) bad.push(`gen «${title}»: «Ver respuestas» dejó vacíos`); q('[data-check]', st).click(); await wait(40); if (!/no cuenta/.test(q('.res', st).innerText)) bad.push(`gen «${title}»: revisar tras ver respuestas debería no contar`); q('[data-new]', st).click(); await wait(40); note = `reveal ok (${vals.length})`; }
    else if (p.type === 'write') { q('textarea.pwt', st).value = 'texto de prueba con si entonces educacion falsa; el mcd y mcm se usan 5 x 3 = 15 (2 + 3) resultado total unidad medida sistema conversion importante evita error porcentaje % 20 fraccion potencia raiz cuadrada exponente son pago cambio'; q('[data-check]', st).click(); await wait(50); note = q('.res', st)?.innerText || ''; if (q('#next').disabled) bad.push(`write «${title}» no se desbloquea`); }
    else if (p.type === 'abaco') { note = 'ábaco (manual)'; }
    else if (p.type === 'practica') { qa('.stp input', st).forEach((b) => b.click()); await wait(60); note = q('.pgl', st)?.innerText; }
    } catch (e) { bad.push(`ERROR página ${k + 1} (${p.type}) «${title}»: ${e.message}`); }
    report.push(`${k + 1}. ${p.type} | ${title} | ${note}`);
    if (p.type === 'abaco') { q('#gmode') && (q('#gmode').checked = false, q('#gmode').dispatchEvent(new Event('change'))); }
    if (k < pages.length - 1) { if (q('#next').disabled) { bad.push(`bloqueado en página ${k + 1} (${p.type})`); const g = q('#gmode'); if (g) { g.checked = false; g.dispatchEvent(new Event('change')); await wait(50); } } q('#next').click(); await wait(60); }
  }
  window.removeEventListener('error', onerr); window.removeEventListener('unhandledrejection', onerr);
  return { id, pages: pages.length, errs, bad, report };
}
