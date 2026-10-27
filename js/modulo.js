// Motor de módulos interactivos: guiado paso a paso, con bloqueos y seguimiento en vivo.
import { sb, esc, md, $, $$, modal, toast } from './ui.js';
import { make, check, answerText, shuffle } from './gens.js';
import * as W from './widgets.js';
import { steps as exprSteps } from './expr.js';
import { logEvent, setPresence, plain } from './live.js';

const rich = (s) => String(s ?? '').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`(.+?)`/g, '<code>$1</code>');
const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const KICK = { guia: '🤝 Con ayuda', lesson: '📘 Lección', match: '🧩 Actividad', mc: '🔁 Repaso rápido', order: '🔢 Actividad', cloze: '✏️ Actividad', gen: '🎲 Práctica', tt: '📊 Actividad', abaco: '🧮 Actividad', write: '📝 Actividad', practica: '🏁 Práctica final' };
const HOW = {
  guia: ['🤝', 'Yo te voy guiando <b>paso a paso</b>. Contesta cada pregunta y toca <b>COMPROBAR</b>. Si te trabas, toca <b>💡 PISTA</b>. No pasa nada si te equivocas.'],
  lesson: ['👀', 'Lee cada parte y toca <b>ENTENDIDO 👍</b> para ver la siguiente.'],
  match: ['👆', '<b>1)</b> En cada renglón abre el menú y <b>elige la respuesta</b>. <b>2)</b> Toca <b>REVISAR</b>. <b>3)</b> Corrige lo que salga en rojo y revisa otra vez.'],
  mc: ['👆', 'Toca la respuesta que creas <b>correcta</b>. Al instante verás si acertaste.'],
  order: ['↕️', 'Mueve los renglones con las flechas <b>▲ ▼</b> hasta ponerlos en el orden correcto. Luego toca <b>REVISAR</b>.'],
  cloze: ['✏️', 'Elige la palabra correcta en cada espacio. Luego toca <b>REVISAR</b>.'],
  gen: ['⌨️', 'Mira primero el <b>📌 ejemplo</b>. Luego escribe tu respuesta en cada cuadro (solo números; fracciones así: 3/4) y toca <b>REVISAR</b>.'],
  tt: ['👆', 'Toca cada casilla gris: <b>1 toque = V</b>, <b>2 toques = F</b>. Cuando termines toca <b>REVISAR</b>.'],
  abaco: ['👆', 'Toca las bolitas hasta que el ábaco muestre el número de arriba. Luego toca <b>COMPROBAR</b>.'],
  write: ['⌨️', 'Escribe tu respuesta en el cuadro (2 o 3 renglones). Toca <b>REVISAR</b> y busca las palomitas ✔.'],
  practica: ['📝', 'Esta práctica la haces en tu <b>cuaderno o celular</b>. <b>Marca cada paso</b> cuando lo termines y al final súbela en <b>TAREAS</b>.'],
};

let UID = 0;

// ---------- bloques de lección ----------
function ill(b) {
  if (b.kind === 'flow') return `<div class="flowx" role="img" aria-label="${esc(b.label || 'Esquema')}">${b.items.map(([e, t], i) => `${i ? '<span class="fa" aria-hidden="true">➜</span>' : ''}<div class="fx"><div class="fe">${e}</div><div class="ft">${String(t).split('|').join('<br>')}</div></div>`).join('')}</div>`;
  return '';
}

function block(b, ctx) {
  switch (b.k) {
    case 'def': return `<div class="co co-def"><div class="co-l">${rich(b.h)}</div><p>${rich(b.p)}</p></div>`;
    case 'ex': return `<div class="co co-ex"><div class="co-l">${rich(b.h || 'Ejemplo')}</div><p>${rich(b.p)}</p></div>`;
    case 'ana': return `<div class="co co-ana"><div class="co-l">${rich(b.h || 'Piénsalo así')}</div><p>${rich(b.p)}</p></div>`;
    case 'warn': return `<div class="co co-warn"><div class="co-l">${rich(b.h || 'Ojo')}</div><p>${rich(b.p)}</p></div>`;
    case 'it': return `<div class="it"><b>${rich(b.h)}</b><span>${rich(b.p)}</span></div>`;
    case 'p': return `<p class="lp">${rich(b.s)}</p>`;
    case 'words': return `<div class="words"><div class="co-l">📖 Palabras nuevas</div>${b.items.map(([t, d]) => `<div class="wd"><b>${rich(t)}</b><span>${rich(d)}</span></div>`).join('')}</div>`;
    case 'vis': return `<div class="vis">${b.rows.map((r) => `<div class="vr">${r.map((t) => `<span class="${/^[+\-−×÷=➜→]$/.test(t) ? 'vo' : 'vt'}">${t}</span>`).join('')}</div>`).join('')}${b.cap ? `<div class="vc">${rich(b.cap)}</div>` : ''}</div>`;
    case 'alt': return `<details class="alt"><summary>🤔 ${rich(b.h || '¿No lo entendiste? Mira otra forma')}</summary><div>${rich(b.p)}</div></details>`;
    case 'md': return `<div class="md">${md(b.s)}</div>`;
    case 'img': return `<figure class="fig"><img src="${esc(b.src)}" alt="${esc(b.alt || '')}" loading="lazy"></figure>`;
    case 'ill': return ill(b);
    case 'tiles': return `<div class="tri">${b.items.map(([e, t, d]) => `<div class="tile"><div>${e}</div><b>${rich(t)}</b><span>${rich(d || '')}</span></div>`).join('')}</div>`;
    case 'tbl': return `<div class="tablewrap"><table><thead><tr>${b.head.map((h) => `<th>${rich(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${rich(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    case 'steps': { const id = 'st' + (++UID);
      ctx.mounts.push((root) => { const box = $('#' + id, root); const items = $$('.px', box); let k = 0; const upd = () => { items.forEach((it, i) => it.hidden = i > k); $('[data-px]', box).hidden = k >= items.length - 1; $('[data-pxall]', box).hidden = k >= items.length - 1; };
        $('[data-px]', box).onclick = () => { k++; upd(); }; $('[data-pxall]', box).onclick = () => { k = items.length - 1; upd(); }; upd(); });
      return `<div class="pasos" id="${id}"><div class="pxt">${rich(b.t)}</div>${b.steps.map((s, i) => `<div class="px"><span class="pxn">${i + 1}</span><div>${rich(s)}</div></div>`).join('')}<div class="pxb"><button class="btn sm" data-px>Siguiente paso ▶</button> <button class="lnk2" data-pxall>Ver todo</button></div></div>`; }
    case 'viz': { const id = 'vz' + (++UID); ctx.mounts.push((root) => { const el = $('#' + id, root); ({ frac: W.mountFrac, power: W.mountPower, conv: W.mountConv, hier: W.mountHier, abaco: (e) => W.mountAbaco(e, { rods: b.rods || 4 }) })[b.name]?.(el); });
      return `<div class="vizbox"><div class="vizh">${rich(b.h || '')}</div><div id="${id}"></div></div>`; }
    default: return '';
  }
}

const exampleBox = (name) => {
  try { const p = make(name, 1)[0]; let extra = '';
    if (p.steps) extra = '<ol class="hsteps mini">' + exprSteps(p.steps).map((s) => `<li><div class="hs">${s.html}</div><div class="hn">${s.note}</div></li>`).join('') + '</ol>';
    return `<div class="ejem"><div class="co-l">📌 Ejemplo resuelto (así se hace)</div><div class="ejq">${p.q}</div><div class="eja">✅ Respuesta: <b>${answerText(p)}</b></div><div class="ejs">${p.e || ''}</div>${extra}</div>`;
  } catch { return ''; }
};

// ---------- tipos de página ----------
const PAGE = {
  lesson(p, ctx) { return `${head(p)}${p.blocks.map((b) => `<section class="rv">${block(b, ctx)}</section>`).join('')}${p.take ? `<section class="rv"><p class="take"><b>👉 Recuerda:</b> ${rich(p.take)}</p></section>` : ''}`; },

  match(p, ctx) {
    const opts = p.options || [...new Set(p.rows.map((r) => r[1]))]; const o = shuffle(opts);
    ctx.act = {
      check(root) { let ok = 0; $$('.q', root).forEach((q, i) => { const s = $('select', q); const good = s.value === p.rows[i][1]; if (good) ok++; s.className = good ? 'ok' : (s.value ? 'bad' : ''); const e = $('.qe', q); if (e) { e.textContent = good ? '✅ ' + (p.rows[i][2] || '¡Correcto!') : (s.value ? '❌ ' + (p.rows[i][2] ? 'Pista: ' + p.rows[i][2] : 'Revisa esta.') : 'Elige una opción.'); e.className = 'qe ' + (good ? 'ok' : 'bad'); } }); return { ok, tot: p.rows.length }; },
      reveal(root) { $$('.q', root).forEach((q, i) => { const s = $('select', q); s.value = p.rows[i][1]; s.className = 'ok'; const e = $('.qe', q); e.textContent = p.rows[i][2] || ''; e.className = 'qe ok'; }); },
    };
    return `${head(p)}<div class="qs">${p.rows.map((r, i) => `<div class="q"><span class="qn">${i + 1}</span><div class="qt">${rich(r[0])}</div><select><option value="">👉 Elige…</option>${o.map((x) => `<option>${esc(x)}</option>`).join('')}</select><div class="qe"></div></div>`).join('')}</div>${foot()}`;
  },

  mc(p, ctx) {
    const answered = {}; ctx.act = {
      manual: true, need: 0.75,
      mount(root, done) { $$('.opt', root).forEach((b) => b.onclick = () => { const qi = +b.dataset.q; if (answered[qi] !== undefined) return; const j = +b.dataset.j; const right = p.qs[qi][2]; answered[qi] = j === right;
        $$(`.opt[data-q="${qi}"]`, root).forEach((x) => { x.disabled = true; if (+x.dataset.j === right) x.classList.add('ok'); }); if (j !== right) b.classList.add('bad');
        const ex = $(`.rqe[data-q="${qi}"]`, root); ex.textContent = (j === right ? '✅ ¡Correcto! ' : '❌ No era esa. ') + (p.qs[qi][3] || ''); ex.className = 'rqe ' + (j === right ? 'ok' : 'bad');
        if (Object.keys(answered).length === p.qs.length) { const ok = Object.values(answered).filter(Boolean).length; done({ ok, tot: p.qs.length }); } }); },
    };
    return `${head(p)}${p.qs.map((q, i) => `<div class="rq"><p><b>${i + 1}.</b> ${rich(q[0])}</p>${q[1].map((o, j) => `<button class="opt" data-q="${i}" data-j="${j}">${rich(o)}</button>`).join('')}<div class="rqe" data-q="${i}"></div></div>`).join('')}<div class="chk"><span class="res" role="status"></span><button class="btn ghost" data-retry hidden>🔁 Intentar de nuevo</button></div>`;
  },

  order(p, ctx) {
    const idx = p.items.map((_, i) => i); let perm = shuffle(idx); if (perm.every((v, i) => v === i)) perm.reverse();
    ctx.act = {
      mount(root) { const ul = $('.ord', root); const mv = (li, d) => { const s = d < 0 ? li.previousElementSibling : li.nextElementSibling; if (s) d < 0 ? ul.insertBefore(li, s) : ul.insertBefore(s, li); };
        ul.addEventListener('click', (e) => { const b = e.target.closest('.mvb'); if (b) mv(b.closest('li'), +b.dataset.d); }); },
      check(root) { let ok = 0; $$('.ord li', root).forEach((li, pos) => { const good = +li.dataset.i === pos; if (good) ok++; li.className = good ? 'ok' : 'bad'; }); return { ok, tot: p.items.length }; },
      reveal(root) { const ul = $('.ord', root); idx.forEach((i) => { const li = $(`li[data-i="${i}"]`, ul); ul.append(li); li.className = 'ok'; }); },
    };
    return `${head(p)}<ol class="ord">${perm.map((i) => `<li data-i="${i}"><span>${rich(p.items[i][0])}</span><span class="mv"><button class="mvb" data-d="-1" aria-label="Subir">▲</button><button class="mvb" data-d="1" aria-label="Bajar">▼</button></span></li>`).join('')}</ol>${foot()}`;
  },

  cloze(p, ctx) {
    ctx.act = {
      check(root) { let ok = 0; $$('select', root).forEach((s, i) => { const good = s.value === p.blanks[i][0]; if (good) ok++; s.className = good ? 'ok' : (s.value ? 'bad' : ''); }); return { ok, tot: p.blanks.length }; },
      reveal(root) { $$('select', root).forEach((s, i) => { s.value = p.blanks[i][0]; s.className = 'ok'; }); },
    };
    const html = p.tpl.replace(/\{(\d+)\}/g, (m, i) => { const b = p.blanks[+i]; return `<select><option value="">👉 …</option>${shuffle(b[1]).map((o) => `<option>${esc(o)}</option>`).join('')}</select>`; });
    return `${head(p)}<div class="cz">${rich(html)}</div>${foot()}`;
  },

  gen(p, ctx) {
    let probs = make(p.gen, p.n || 5);
    const drawQs = () => probs.map((q, i) => `<div class="q" data-i="${i}"><span class="qn">${i + 1}</span><div class="qt">${q.q}</div>${q.mode === 'sel' ? `<select class="ti"><option value="">👉 Elige…</option>${q.opts.map((o) => `<option>${esc(o)}</option>`).join('')}</select>` : `<input class="ti" type="text" inputmode="${q.mode === 'n' || q.mode === 'fs' ? 'decimal' : 'text'}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="✏️ Tu respuesta">`}<div class="qe"></div></div>`).join('');
    ctx.act = {
      redraw(root) { probs = make(p.gen, p.n || 5); $('.qs', root).innerHTML = drawQs(); $('.res', root).textContent = ''; $('.res', root).className = 'res'; },
      check(root) { let ok = 0; $$('.q', root).forEach((q, i) => { const inp = $('.ti', q); const r = check(probs[i], inp.value); if (r.ok) ok++; inp.className = 'ti ' + (r.ok ? 'ok' : (inp.value ? 'bad' : '')); const e = $('.qe', q); e.className = 'qe ' + (r.ok ? 'ok' : 'bad');
        e.innerHTML = r.ok ? '✅ ' + (probs[i].e || '¡Correcto!') : (inp.value ? '❌ ' + (r.msg || 'No es correcto. Inténtalo otra vez.') : '✏️ Escribe una respuesta.'); }); return { ok, tot: probs.length }; },
      reveal(root) { $$('.q', root).forEach((q, i) => { const inp = $('.ti', q); inp.value = answerText(probs[i]); inp.className = 'ti ok'; const e = $('.qe', q); e.className = 'qe ok'; let extra = ''; if (probs[i].steps) { try { extra = '<ol class="hsteps mini">' + exprSteps(probs[i].steps).map((s) => `<li><div class="hs">${s.html}</div><div class="hn">${s.note}</div></li>`).join('') + '</ol>'; } catch { /* sin pasos */ } } e.innerHTML = '💡 ' + (probs[i].e || '') + extra; }); },
    };
    return `${head(p)}${exampleBox(p.gen)}<div class="qs">${drawQs()}</div><div class="chk"><button class="btn big" data-check>✅ REVISAR</button><button class="btn ghost" data-new>🔄 Otros ejercicios</button><button class="btn ghost" data-reveal>💡 Ver respuestas</button><span class="res" role="status"></span></div>`;
  },

  guia(p, ctx) {
    const S = p.steps;
    ctx.act = {
      manual: true, noReport: true,
      mount(root, done) {
        let k = 0, hints = 0, solved = 0; const boxes = $$('.gs', root);
        const open = (n) => { boxes.forEach((b, i) => { b.hidden = i > n; b.classList.toggle('cur', i === n); }); boxes[n]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); $('input', boxes[n])?.focus({ preventScroll: true }); };
        const good = (b, step) => { b.classList.add('ok'); $('.gf', b).innerHTML = `✅ <b>¡Bien!</b> ${step.ok || ''}`; $$('input,button', b).forEach((x) => x.disabled = true); solved++; k++;
          if (k >= S.length) { $('.gend', root).hidden = false; done({ ok: S.length, tot: S.length, hints }); } else open(k); };
        const tryAns = (b, i, val) => { const step = S[i]; const r = check({ mode: step.mode || 'n', ans: step.ans, tol: step.tol }, val);
          if (r.ok) return good(b, step);
          const h = $('.gh', b); b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 400);
          $('.gf', b).innerHTML = `❌ ${r.msg || 'Todavía no. Inténtalo otra vez.'}`; if (step.hint && h.hidden) { h.hidden = false; hints++; } };
        boxes.forEach((b, i) => {
          $('[data-gc]', b)?.addEventListener('click', () => tryAns(b, i, $('input', b).value));
          $('input', b)?.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryAns(b, i, e.target.value); });
          $$('[data-go]', b).forEach((o) => o.addEventListener('click', () => tryAns(b, i, o.dataset.go)));
          $('[data-gh]', b)?.addEventListener('click', () => { const h = $('.gh', b); if (h.hidden) { h.hidden = false; hints++; } });
        });
        open(0);
      },
    };
    return `${head(p)}${p.intro ? `<p class="lp">${rich(p.intro)}</p>` : ''}<div class="gsteps">${S.map((s, i) => `<div class="gs" ${i ? 'hidden' : ''}><div class="gq"><span class="qn">${i + 1}</span><div class="qt">${s.q}</div></div>
      ${(s.mode || 'n') === 'sel' ? `<div class="gopts">${s.opts.map((o) => `<button class="opt" data-go="${esc(o)}">${rich(o)}</button>`).join('')}</div>` : `<div class="grow2"><input class="ti" type="text" inputmode="${(s.mode || 'n') === 'n' || s.mode === 'fs' ? 'decimal' : 'text'}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="✏️ Tu respuesta"><button class="btn" data-gc>Comprobar</button></div>`}
      ${s.hint ? `<div class="ghbar"><button class="btn ghost sm" data-gh>💡 Pista</button></div><div class="gh" hidden>💡 ${rich(s.hint)}</div>` : ''}<div class="gf" role="status"></div></div>`).join('')}</div><div class="gend nexthint" hidden>🎉 ¡Terminaste! Ahora tú solo en lo que sigue. Toca <b>SIGUIENTE →</b></div><div class="chk"><span class="res" role="status"></span></div>`;
  },

  tt(p, ctx) {
    let w; ctx.act = { mount(root) { w = W.mountTT($('.ttbox', root), p); }, check() { return w.check(); }, reveal() { w.reveal(); } };
    return `${head(p)}${p.hint ? `<p class="lp">${rich(p.hint)}</p>` : ''}<div class="ttbox"></div>${foot()}`;
  },

  abaco(p, ctx) {
    let ab, k = 0; ctx.act = {
      manual: true, noReport: true,
      mount(root, done) { ab = W.mountAbaco($('.abbox', root), { rods: p.rods || 4 }); const tg = $('.abtarget', root), res = $('.res', root);
        const show = () => { tg.innerHTML = `Forma el número: <b class="abn">${p.targets[k].toLocaleString('es-MX')}</b> <span class="muted small">(${k + 1} de ${p.targets.length})</span>`; };
        show(); $('[data-ab]', root).onclick = () => { if (ab.value === p.targets[k]) { k++; res.textContent = ''; ab.set(0); if (k >= p.targets.length) { tg.innerHTML = '🎉 ¡Completaste todos!'; $('[data-ab]', root).disabled = true; done({ ok: p.targets.length, tot: p.targets.length }); } else { toast('¡Correcto! Ahora el siguiente', 'ok'); show(); } } else { res.textContent = '❌ Todavía no. Tu ábaco muestra ' + ab.value.toLocaleString('es-MX') + ' y debe mostrar ' + p.targets[k].toLocaleString('es-MX') + '.'; res.className = 'res bad'; } }; },
    };
    return `${head(p)}<div class="abtarget lp"></div><div class="abbox"></div><div class="chk"><button class="btn big" data-ab>✅ COMPROBAR</button><span class="res" role="status"></span></div>`;
  },

  write(p, ctx) {
    ctx.act = {
      check(root) { const t = norm($('textarea', root).value); const list = $('.crit', root); let ok = 0; list.innerHTML = p.crit.map((c) => { const y = new RegExp(c[1], 'i').test(t); if (y) ok++; return `<li class="${y ? 'y' : 'n'}">${y ? '✔' : '○'} ${rich(c[0])}</li>`; }).join(''); return { ok, tot: p.crit.length, min: p.min || p.crit.length }; },
    };
    return `${head(p)}<p class="pwp">${rich(p.prompt)}</p><textarea class="pwt" rows="5" placeholder="${esc(p.ph || '✏️ Escribe aquí…')}"></textarea><ul class="crit"></ul><div class="chk"><button class="btn big" data-check>✅ REVISAR</button><span class="res" role="status"></span></div>${p.take ? `<p class="take"><b>💡 Pista:</b> ${rich(p.take)}</p>` : ''}`;
  },

  practica(p, ctx) {
    ctx.act = {
      manual: true, practice: true,
      mount(root, done, saved) { const boxes = $$('.stp input', root); const upd = () => { const n = boxes.filter((b) => b.checked).length; $('.pgs i', root).style.width = (n / boxes.length * 100) + '%'; $('.pgl', root).textContent = `${n} de ${boxes.length} pasos hechos`; boxes.forEach((b) => b.closest('.stp').classList.toggle('on', b.checked)); return n; };
        (saved?.c || []).forEach((v, i) => { if (boxes[i]) boxes[i].checked = !!v; }); upd();
        boxes.forEach((b) => b.addEventListener('change', () => { const n = upd(); done({ n, tot: boxes.length, c: boxes.map((x) => x.checked) }); })); },
    };
    return `${head(p)}${p.intro ? `<p class="lp">${rich(p.intro)}</p>` : ''}${p.mat ? `<div class="co co-ana"><div class="co-l">🧰 Material</div><p>${rich(p.mat)}</p></div>` : ''}${p.ejemplo ? `<div class="co co-ex"><div class="co-l">📌 Ejemplo para que veas cómo (hazlo parecido con lo tuyo)</div><p>${rich(p.ejemplo)}</p></div>` : ''}
      <div class="pgs"><i></i></div><div class="muted small pgl"></div>
      ${p.steps.map((s, i) => `<label class="stp"><input type="checkbox"><span><b>Paso ${i + 1}.</b> ${rich(s)}</span></label>`).join('')}
      ${p.deliver ? `<div class="co co-def"><div class="co-l">📤 Qué entregar</div><p>${rich(p.deliver)}</p></div>` : ''}
      ${p.rubric ? `<details class="rub"><summary>📋 Ver rúbrica (cómo te van a calificar)</summary><table><thead><tr><th>Criterio</th><th>Bueno</th><th>Suficiente</th><th>Insuficiente</th></tr></thead><tbody>${p.rubric.map((r) => `<tr>${r.map((c) => `<td>${rich(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></details>` : ''}
      <p class="center" style="margin-top:14px"><a class="btn big" href="#/tareas">📥 Ir a TAREAS para entregar</a></p>`;
  },
};

function head(p) { return `<header><span class="kick">${KICK[p.type]}</span><h1>${rich(p.t)}</h1>${p.sub ? `<p class="sub">${rich(p.sub)}</p>` : ''}</header>`; }
const foot = () => `<div class="chk"><button class="btn big" data-check>✅ REVISAR</button><button class="btn ghost" data-reveal>💡 Ver respuestas</button><span class="res" role="status"></span></div>`;
const howBox = (p) => { const [ic, tx] = HOW[p.type] || []; return tx ? `<div class="howto"><div class="hw-i">${ic}</div><div><div class="hw-t">${p.type === 'lesson' ? 'Cómo avanzar' : '¿Qué tengo que hacer?'}</div><div>${p.how || tx}</div></div></div>` : ''; };

// ---------- vista principal ----------
export async function moduloView(el, { profile, param }) {
  const id = param[0];
  if (!/^(m1-[1-7]|ed-(10|[1-9]))$/.test(id || '')) { el.innerHTML = '<div class="empty">Módulo no encontrado.</div>'; return; }
  const preview = profile.role === 'teacher'; const ed = id.startsWith('ed-'); const home = ed ? '#/ediems' : '#/material';
  let mod;
  try { mod = (await import(`../content/${id}.js`)).default; } catch (e) { console.error(e); el.innerHTML = '<div class="msg err">No se pudo cargar el módulo.</div>'; return; }
  const pages = [{ type: 'intro', t: 'Inicio' }, ...mod.pages];
  let st = { done: {}, last: 0 };
  if (!preview) { const { data } = await sb.from('module_progress').select('done,last').eq('student_id', profile.id).eq('module', id).maybeSingle(); if (data) st = { done: data.done || {}, last: data.last || 0 }; }
  const WORDS = {}; pages.forEach((p) => (p.blocks || []).forEach((b) => { if (b.k === 'words') b.items.forEach(([t, d]) => { WORDS[t.replace(/<[^>]+>|\*\*/g, '')] = d; }); }));
  let guided = true; let i = Math.min(st.last, pages.length - 1); let timer; let curSecs = 0; let doneLogged = false;
  const title = (k) => plain(pages[k].t || 'Inicio');
  const thr = (k) => (pages[k].type === 'practica' ? 0.99 : 0.6);
  const isDone = (k) => { const d = st.done[k]; return !!d && ((d.s || 0) >= thr(k) || !!d.sk); };
  const pct = () => Math.round(pages.filter((_, k) => isDone(k)).length / pages.length * 100);
  const firstOpen = () => { const k = pages.findIndex((_, x) => !isDone(x)); return k < 0 ? pages.length - 1 : k; };
  const save = () => { if (preview) return; clearTimeout(timer); timer = setTimeout(() => sb.from('module_progress').upsert({ student_id: profile.id, module: id, done: st.done, last: i, pct: pct(), updated_at: new Date().toISOString() }).then(({ error }) => { if (error) console.warn('progreso', error.message); }), 500); };
  const mark = (k, s, extra) => { const old = st.done[k] || {}; st.done[k] = { ...old, s: Math.round(Math.max(s, old.s || 0) * 100) / 100, at: Date.now(), ...(extra || {}) }; save(); drawProgress(); nav(); };
  const flush = (k) => { if (curSecs > 0) { const old = st.done[k] || {}; st.done[k] = { ...old, t: (old.t || 0) + curSecs }; curSecs = 0; save(); } };
  const canGo = () => { if (!guided) return true; const p = pages[i]; if (p.type === 'intro' || p.type === 'practica') return true; return isDone(i); };
  const log = (kind, detail) => logEvent(kind, id, i, { title: title(i), ...detail });

  el.innerHTML = `<div class="mod"><div class="modtop"><a href="${home}" class="back">← ${ed ? 'EDIEMS' : 'Material'}</a><div class="mt"><b>${esc(mod.title)}</b><span>${esc(mod.sub || '')}</span></div><div class="mp"><div class="bar"><i></i></div><small></small></div><button class="icon wbtn" id="gloss" aria-label="Diccionario" ${Object.keys(WORDS).length ? '' : 'hidden'}>📖 <span>Palabras</span></button><button class="icon" id="mmenu" aria-label="Contenido">☰</button></div>
    ${preview ? '<div class="msg info prevbar">👁️ <b>Vista previa del docente</b> · el avance no se guarda. <label class="check" style="display:inline-flex;margin:0 0 0 10px"><input type="checkbox" id="gmode" checked> Ver con guía y bloqueos de alumno</label></div>' : ''}
    <div class="modbody"><aside class="modside" id="mside"></aside><main class="modmain"><div class="steps" id="steps"></div><div id="howslot"></div><article class="lesson" id="stage"></article>
    <div class="fnav"><button class="btn ghost" id="prev">← Atrás</button><span id="ct"></span><button class="btn big" id="next">Siguiente →</button></div></main></div></div>`;

  function drawProgress() {
    $('.mp .bar i', el).style.width = pct() + '%'; $('.mp small', el).textContent = pct() + ' %';
    $$('#steps i', el).forEach((s, k) => { s.className = (isDone(k) ? 'ok ' : '') + (k === i ? 'on' : ''); });
    const open = guided ? firstOpen() : pages.length;
    $('#mside', el).innerHTML = pages.map((p, k) => { const lock = k > open; return `<button class="sl ${k === i ? 'on' : ''}" data-k="${k}" ${lock ? 'disabled' : ''}><span class="dot ${isDone(k) ? 'done' : ''}">${isDone(k) ? '✓' : lock ? '🔒' : k + 1}</span><span><b>${esc(p.type === 'intro' ? 'Inicio' : p.nav || title(k))}</b><small>${esc(p.type === 'intro' ? mod.title : KICK[p.type].replace(/^\S+\s/, ''))}</small></span></button>`; }).join('');
  }
  function nav() {
    const last = i === pages.length - 1, can = canGo(); const nx = $('#next', el);
    nx.disabled = !can; nx.classList.toggle('ready', can && !last && pages[i].type !== 'intro');
    nx.textContent = last ? 'Terminar ✔' : can ? 'Siguiente →' : '🔒 Termina esto primero';
    $('#prev', el).disabled = i === 0; $('#ct', el).textContent = `Paso ${i + 1} de ${pages.length}`;
    const hint = $('.nexthint', el); if (hint) hint.hidden = !can;
  }

  const result = (r, need = 1) => {
    const stage = $('#stage', el), res = $('.res', stage); const s = r.ok / r.tot; const needed = r.min ? r.min / r.tot : need; const passed = s >= needed - 1e-9;
    const old = st.done[i] || {}; const a = (old.a || 0) + 1, f = (old.f || 0) + (passed ? 0 : 1);
    mark(i, s, { a, f });
    log('attempt', { ok: r.ok, tot: r.tot, pass: passed, a, ...(r.hints != null ? { hints: r.hints } : {}) });
    if (res) { res.innerHTML = passed ? `<span class="okcard">🎉 ¡Muy bien! ${r.ok} de ${r.tot}. <b>Toca SIGUIENTE →</b></span>` : `😅 Vas ${r.ok} de ${r.tot}. Corrige lo que salió en <b>rojo</b> y toca REVISAR otra vez.`; res.className = 'res ' + (passed ? 'ok' : 'bad'); }
    if (!passed && f >= 3 && !$('#skip', stage)) { const b = document.createElement('button'); b.id = 'skip'; b.className = 'btn ghost'; b.textContent = '⏭️ Saltar esta actividad'; b.onclick = () => { mark(i, 0.6, { sk: 1 }); log('skip', {}); toast('Actividad saltada: tu profe lo verá', 'ok'); }; res?.parentElement.append(b); }
    if (passed) { $('#next', el).scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  };

  function draw() {
    const stage = $('#stage', el); const p = pages[i]; const ctx = { mounts: [], act: null }; curSecs = 0;
    window.scrollTo(0, 0);
    $('#howslot', el).innerHTML = p.type === 'intro' ? '' : howBox(p);
    if (p.type === 'intro') {
      stage.innerHTML = intro();
      $('#start', el).onclick = () => go(Math.min(Math.max(1, st.last || 1), firstOpen() || 1));
      mark(0, 1);
    } else {
      stage.innerHTML = PAGE[p.type](p, ctx) + `<div class="nexthint" hidden>👉 Ya terminaste aquí. Toca <b>SIGUIENTE →</b> (abajo).</div>` + (i === pages.length - 1 && pct() >= 100 ? '<div class="badge ok done-badge"><div class="bg1">🎉 ¡Módulo completado!</div><div class="bg2">Terminaste todas las lecciones y actividades.</div></div>' : '');
      ctx.mounts.forEach((m) => m(stage));
      if (p.type === 'lesson') setupLesson(stage);
      const a = ctx.act; const res = $('.res', stage);
      if (a) {
        if (a.manual) a.mount?.(stage, (r, extra) => {
          if (a.practice) { const frac = r.n / r.tot; mark(i, frac, { c: r.c }); log('practice_step', { n: r.n, tot: r.tot }); if (frac === 1) maybeDone(); }
          else result(r, a.need || 1);
          if (p.type === 'mc') $('[data-retry]', stage).hidden = false;
        }, st.done[i]);
        else a.mount?.(stage);
        let peeked = false;
        $('[data-check]', stage)?.addEventListener('click', () => {
          if (a.noReport) return;
          if (peeked) { res.className = 'res bad'; res.innerHTML = '👀 Ya viste las respuestas, por eso esta revisión no cuenta. ' + (a.redraw ? 'Toca <b>🔄 Otros ejercicios</b> y resuélvelos tú.' : 'Toca <b>🔁 Intentar de nuevo</b> y respóndela tú.'); return; }
          result(a.check(stage));
        });
        $('[data-reveal]', stage)?.addEventListener('click', () => {
          a.reveal(stage); peeked = true; res.className = 'res'; res.innerHTML = '💡 Estas son las respuestas. Para que cuente, tienes que intentarlo tú: ' + (a.redraw ? 'toca <b>🔄 Otros ejercicios</b>.' : 'toca <b>🔁 Intentar de nuevo</b>.');
          const old = st.done[i] || {}; mark(i, 0.5, { rv: (old.rv || 0) + 1 }); log('reveal', {});
          if (!a.redraw && !$('#again', stage)) { const b = document.createElement('button'); b.id = 'again'; b.className = 'btn ghost'; b.textContent = '🔁 Intentar de nuevo'; b.onclick = () => draw(); res.parentElement.append(b); }
        });
        $('[data-new]', stage)?.addEventListener('click', () => { a.redraw(stage); peeked = false; });
        $('[data-retry]', stage)?.addEventListener('click', () => { const old = st.done[i] || {}; draw(); });
      }
      if (isDone(i)) { $('.nexthint', stage).hidden = false; }
    }
    log('page_view', {}); setPresence({ module: id, page: i + 1, total: pages.length, title: title(i) });
    drawProgress(); nav(); save();
  }

  function setupLesson(stage) {
    const secs = $$('.rv', stage); const already = isDone(i) || !guided;
    if (already || secs.length <= 1) { secs.forEach((s) => s.classList.add('on')); if (!isDone(i)) lessonRead(); return; }
    let k = 0; secs[0].classList.add('on');
    const bar = document.createElement('div'); bar.className = 'more'; bar.innerHTML = `<button class="btn big" id="more">Entendido 👍</button><div class="muted small" id="mc">Parte 1 de ${secs.length}</div>`;
    stage.append(bar);
    $('#more', stage).onclick = () => { k++; secs[k].classList.add('on'); secs[k].scrollIntoView({ behavior: 'smooth', block: 'nearest' }); $('#mc', stage).textContent = `Parte ${k + 1} de ${secs.length}`; if (k >= secs.length - 1) { bar.remove(); lessonRead(); } };
  }
  function lessonRead() { const old = st.done[i] || {}; mark(i, 1, { r: 1 }); if (!old.r) log('lesson_read', { secs: old.t || 0 }); $('.nexthint', el) && ($('.nexthint', el).hidden = false); }
  function maybeDone() { if (pct() >= 100 && !doneLogged) { doneLogged = true; log('module_done', {}); toast('🏆 ¡Completaste el módulo!', 'ok'); } }

  const intro = () => `<header><span class="kick">${ed ? '🎯 Preparación' : '🎓 Módulo'} ${esc(mod.unit)}</span><h1>${esc(mod.title)}</h1><p class="sub">${esc(mod.sub || '')}</p></header>
    <div class="three"><div><span>📖</span><b>1. Lee</b><small>poquito a poco</small></div><div><span>✍️</span><b>2. Practica</b><small>se revisa solo</small></div>${ed ? '<div><span>🎯</span><b>3. Repasa</b><small>y haz el simulacro</small></div>' : '<div><span>🏁</span><b>3. Entrega</b><small>tu práctica final</small></div>'}</div>
    <div class="chips"><span class="chip">⏱️ ${mod.minutes || 60} min aprox.</span><span class="chip">📘 ${pages.filter((p) => p.type === 'lesson').length} lecciones</span><span class="chip">🎲 ${pages.filter((p) => !['lesson', 'intro', 'practica'].includes(p.type)).length} actividades</span>${mod.weight ? `<span class="chip">⭐ Vale ${mod.weight} % del curso</span>` : ''}</div>
    <div class="co co-def"><div class="co-l">Al terminar podrás…</div><ul class="goals">${mod.goals.map((g) => `<li>${rich(g)}</li>`).join('')}</ul></div>
    <div class="co co-ana"><div class="co-l">⚠️ Importante</div><p>Para pasar a la siguiente parte tienes que <b>terminar la actual</b> (leerla o resolverla). Si te equivocas, no pasa nada: puedes intentar otra vez. Tu profe ve tu avance.</p></div>
    <button class="btn big block" id="start">${Object.keys(st.done).length > 1 ? '▶️ Continuar donde me quedé' : '▶️ COMENZAR'}</button>`;

  const go = (k) => { flush(i); i = Math.max(0, Math.min(pages.length - 1, k)); draw(); };
  $('#prev', el).onclick = () => go(i - 1);
  $('#next', el).onclick = () => { if (!canGo()) return; if (i === pages.length - 1) { maybeDone(); location.hash = home; } else go(i + 1); };
  $('#mside', el).addEventListener('click', (e) => { const b = e.target.closest('.sl'); if (b && !b.disabled) { go(+b.dataset.k); $('#mside', el).classList.remove('open'); $('.scrim')?.remove(); } });
  $('#mmenu', el).onclick = () => { const s = $('#mside', el); s.classList.toggle('open'); if (s.classList.contains('open')) { const sc = document.createElement('div'); sc.className = 'scrim on'; sc.onclick = () => { s.classList.remove('open'); sc.remove(); }; document.body.append(sc); } };
  $('#gloss', el).onclick = () => modal('📖 Diccionario: palabras de este módulo', `<p class="muted small">Si no entiendes una palabra, aquí está explicada en fácil.</p><div class="words nob">${Object.entries(WORDS).sort((a, b) => a[0].localeCompare(b[0], 'es')).map(([t, d]) => `<div class="wd"><b>${esc(t)}</b><span>${rich(d)}</span></div>`).join('')}</div>`, { wide: true });
  $('#gmode', el)?.addEventListener('change', (e) => { guided = e.target.checked; draw(); });
  $('#steps', el).innerHTML = pages.map(() => '<i></i>').join('');

  // tiempo en la página (solo cuenta si la pestaña está visible) y limpieza al salir
  const tick = setInterval(() => { if (!el.isConnected) { clearInterval(tick); flush(i); setPresence({ module: null, page: null, title: '' }); return; } if (!document.hidden) { curSecs++; if (curSecs >= 20) flush(i); } }, 1000);
  logEvent('module_open', id, null, { title: mod.title });
  draw();
}
