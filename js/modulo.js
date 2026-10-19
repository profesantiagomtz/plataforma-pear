// Motor de módulos interactivos: lecciones + actividades con revisión automática y avance guardado.
import { sb, esc, md, $, $$, modal, toast } from './ui.js';
import { make, check, answerText, shuffle } from './gens.js';
import * as W from './widgets.js';
import { steps as exprSteps } from './expr.js';

const rich = (s) => String(s ?? '').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`(.+?)`/g, '<code>$1</code>');
const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const KICK = { lesson: '📘 Lección', match: '🧩 Actividad', mc: '🔁 Repaso rápido', order: '🔢 Actividad', cloze: '✏️ Actividad', gen: '🎲 Práctica', tt: '📊 Actividad', abaco: '🧮 Actividad', write: '📝 Actividad', practica: '🏁 Práctica final', tool: '🧰 Herramienta' };
let UID = 0;

// ---------- bloques de lección ----------
function ill(b) {
  if (b.kind === 'flow') {
    const it = b.items, n = it.length, Wd = 360, g = n > 4 ? 10 : 16, bw = (Wd - (n - 1) * g) / n;
    let o = ''; it.forEach(([e, t], i) => { const x = i * (bw + g); o += `<rect x="${x}" y="14" width="${bw}" height="86" rx="12" class="s"/><text x="${x + bw / 2}" y="52" text-anchor="middle" font-size="26">${e}</text>`;
      String(t).split('|').forEach((l, j) => { o += `<text x="${x + bw / 2}" y="${74 + j * 13}" text-anchor="middle" class="t">${l}</text>`; });
      if (i < n - 1) o += `<path d="M${x + bw + 2} 57 h${g - 6}" class="kb"/><polygon points="${x + bw + g - 2},57 ${x + bw + g - 8},53 ${x + bw + g - 8},61" class="b"/>`; });
    return `<div class="ill"><svg viewBox="0 0 ${Wd} 114" role="img" aria-label="${esc(b.label || 'Esquema')}">${o}</svg></div>`;
  }
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

// ---------- tipos de página ----------
const PAGE = {
  lesson(p, ctx) { return `${head(p)}${p.blocks.map((b) => block(b, ctx)).join('')}${p.take ? `<p class="take"><b>Recuerda:</b> ${rich(p.take)}</p>` : ''}`; },

  match(p, ctx) {
    const opts = p.options || [...new Set(p.rows.map((r) => r[1]))]; const o = shuffle(opts);
    ctx.act = {
      check(root) { let ok = 0; $$('.q', root).forEach((q, i) => { const s = $('select', q); const good = s.value === p.rows[i][1]; if (good) ok++; s.className = good ? 'ok' : (s.value ? 'bad' : ''); const e = $('.qe', q); if (e) { e.textContent = good ? (p.rows[i][2] || '¡Correcto!') : (s.value ? (p.rows[i][2] || 'Revisa esta.') : 'Elige una opción.'); e.className = 'qe ' + (good ? 'ok' : 'bad'); } }); return { ok, tot: p.rows.length }; },
      reveal(root) { $$('.q', root).forEach((q, i) => { const s = $('select', q); s.value = p.rows[i][1]; s.className = 'ok'; const e = $('.qe', q); e.textContent = p.rows[i][2] || ''; e.className = 'qe ok'; }); },
    };
    return `${head(p)}<div class="qs">${p.rows.map((r, i) => `<div class="q"><span class="qn">${i + 1}</span><div class="qt">${rich(r[0])}</div><select><option value="">Elige…</option>${o.map((x) => `<option>${esc(x)}</option>`).join('')}</select><div class="qe"></div></div>`).join('')}</div>${foot(p)}`;
  },

  mc(p, ctx) {
    const answered = {}; ctx.act = {
      manual: true,
      mount(root, done) { $$('.opt', root).forEach((b) => b.onclick = () => { const qi = +b.dataset.q; if (answered[qi] !== undefined) return; const j = +b.dataset.j; const right = p.qs[qi][2]; answered[qi] = j === right;
        $$(`.opt[data-q="${qi}"]`, root).forEach((x) => { x.disabled = true; if (+x.dataset.j === right) x.classList.add('ok'); }); if (j !== right) b.classList.add('bad');
        const ex = $(`.rqe[data-q="${qi}"]`, root); ex.textContent = (j === right ? '✅ ' : '❌ ') + (p.qs[qi][3] || ''); ex.className = 'rqe ' + (j === right ? 'ok' : 'bad');
        if (Object.keys(answered).length === p.qs.length) done(Object.values(answered).filter(Boolean).length / p.qs.length); }); },
    };
    return `${head(p)}${p.qs.map((q, i) => `<div class="rq"><p><b>${i + 1}.</b> ${rich(q[0])}</p>${q[1].map((o, j) => `<button class="opt" data-q="${i}" data-j="${j}">${rich(o)}</button>`).join('')}<div class="rqe" data-q="${i}"></div></div>`).join('')}<div class="chk"><span class="res" role="status"></span><button class="btn ghost" data-retry hidden>Intentar de nuevo</button></div>`;
  },

  order(p, ctx) {
    const idx = p.items.map((_, i) => i); let perm = shuffle(idx); if (perm.every((v, i) => v === i)) perm.reverse();
    ctx.act = {
      mount(root) { const ul = $('.ord', root); const mv = (li, d) => { const s = d < 0 ? li.previousElementSibling : li.nextElementSibling; if (s) d < 0 ? ul.insertBefore(li, s) : ul.insertBefore(s, li); };
        ul.addEventListener('click', (e) => { const b = e.target.closest('.mvb'); if (b) mv(b.closest('li'), +b.dataset.d); }); },
      check(root) { let ok = 0; $$('.ord li', root).forEach((li, pos) => { const good = +li.dataset.i === pos; if (good) ok++; li.className = good ? 'ok' : 'bad'; }); return { ok, tot: p.items.length }; },
      reveal(root) { const ul = $('.ord', root); idx.forEach((i) => { const li = $(`li[data-i="${i}"]`, ul); ul.append(li); li.className = 'ok'; }); },
    };
    return `${head(p)}<ol class="ord">${perm.map((i) => `<li data-i="${i}"><span>${rich(p.items[i][0])}</span><span class="mv"><button class="mvb" data-d="-1" aria-label="Subir">▲</button><button class="mvb" data-d="1" aria-label="Bajar">▼</button></span></li>`).join('')}</ol>${foot(p)}`;
  },

  cloze(p, ctx) {
    ctx.act = {
      check(root) { let ok = 0; $$('select', root).forEach((s, i) => { const good = s.value === p.blanks[i][0]; if (good) ok++; s.className = good ? 'ok' : (s.value ? 'bad' : ''); }); return { ok, tot: p.blanks.length }; },
      reveal(root) { $$('select', root).forEach((s, i) => { s.value = p.blanks[i][0]; s.className = 'ok'; }); },
    };
    const html = p.tpl.replace(/\{(\d+)\}/g, (m, i) => { const b = p.blanks[+i]; return `<select><option value="">…</option>${shuffle(b[1]).map((o) => `<option>${esc(o)}</option>`).join('')}</select>`; });
    return `${head(p)}<div class="cz">${rich(html)}</div>${foot(p)}`;
  },

  gen(p, ctx) {
    let probs = make(p.gen, p.n || 5);
    const drawQs = () => probs.map((q, i) => `<div class="q" data-i="${i}"><span class="qn">${i + 1}</span><div class="qt">${q.q}</div>${q.mode === 'sel' ? `<select class="ti"><option value="">Elige…</option>${q.opts.map((o) => `<option>${esc(o)}</option>`).join('')}</select>` : `<input class="ti" type="text" inputmode="${q.mode === 'n' || q.mode === 'fs' ? 'decimal' : 'text'}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Tu respuesta">`}<div class="qe"></div></div>`).join('');
    ctx.act = {
      redraw(root) { probs = make(p.gen, p.n || 5); $('.qs', root).innerHTML = drawQs(); $('.res', root).textContent = ''; },
      check(root) { let ok = 0; $$('.q', root).forEach((q, i) => { const inp = $('.ti', q); const r = check(probs[i], inp.value); if (r.ok) ok++; inp.className = 'ti ' + (r.ok ? 'ok' : (inp.value ? 'bad' : '')); const e = $('.qe', q); e.className = 'qe ' + (r.ok ? 'ok' : 'bad');
        e.innerHTML = r.ok ? '✅ ' + (probs[i].e || '¡Correcto!') : (inp.value ? '❌ ' + (r.msg || 'No es correcto. Inténtalo de nuevo.') : 'Escribe una respuesta.'); }); return { ok, tot: probs.length }; },
      reveal(root) { $$('.q', root).forEach((q, i) => { const inp = $('.ti', q); inp.value = answerText(probs[i]); inp.className = 'ti ok'; const e = $('.qe', q); e.className = 'qe ok'; let extra = ''; if (probs[i].steps) { try { extra = '<ol class="hsteps mini">' + exprSteps(probs[i].steps).map((s) => `<li><div class="hs">${s.html}</div><div class="hn">${s.note}</div></li>`).join('') + '</ol>'; } catch { /* sin pasos */ } } e.innerHTML = '💡 ' + (probs[i].e || '') + extra; }); },
    };
    return `${head(p)}<div class="qs">${drawQs()}</div><div class="chk"><button class="btn" data-check>Revisar respuestas</button><button class="btn ghost" data-reveal>Ver respuestas</button><button class="btn ghost" data-new>🔄 Otros ejercicios</button><span class="res" role="status"></span></div>`;
  },

  tt(p, ctx) {
    let w; ctx.act = {
      mount(root) { w = W.mountTT($('.ttbox', root), p); }, check() { return w.check(); }, reveal() { w.reveal(); },
    };
    return `${head(p)}${p.hint ? `<p class="lp">${rich(p.hint)}</p>` : ''}<div class="ttbox"></div><p class="muted small">Toca cada casilla: una vez = V, dos veces = F, tres = vacío.</p>${foot(p)}`;
  },

  abaco(p, ctx) {
    let ab, k = 0; ctx.act = {
      manual: true,
      mount(root, done) { ab = W.mountAbaco($('.abbox', root), { rods: p.rods || 4 }); const tg = $('.abtarget', root), res = $('.res', root);
        const show = () => { tg.innerHTML = `Representa el número: <b>${p.targets[k].toLocaleString('es-MX')}</b> <span class="muted small">(${k + 1} de ${p.targets.length})</span>`; };
        show(); $('[data-ab]', root).onclick = () => { if (ab.value === p.targets[k]) { k++; res.textContent = ''; ab.set(0); if (k >= p.targets.length) { tg.innerHTML = '🎉 ¡Completaste todos!'; $('[data-ab]', root).disabled = true; done(1); } else { toast('¡Correcto!', 'ok'); show(); } } else { res.textContent = 'Todavía no es ' + p.targets[k].toLocaleString('es-MX') + '. Tu ábaco muestra ' + ab.value.toLocaleString('es-MX') + '.'; res.className = 'res bad'; } }; },
    };
    return `${head(p)}<div class="abtarget lp"></div><div class="abbox"></div><div class="chk"><button class="btn" data-ab>Comprobar</button><span class="res" role="status"></span></div>`;
  },

  write(p, ctx) {
    ctx.act = {
      check(root) { const t = norm($('textarea', root).value); const list = $('.crit', root); let ok = 0; list.innerHTML = p.crit.map((c) => { const y = new RegExp(c[1], 'i').test(t); if (y) ok++; return `<li class="${y ? 'y' : 'n'}">${y ? '✔' : '○'} ${rich(c[0])}</li>`; }).join(''); return { ok, tot: p.crit.length, min: p.min || p.crit.length }; },
    };
    return `${head(p)}<p class="pwp">${rich(p.prompt)}</p><textarea class="pwt" rows="5" placeholder="${esc(p.ph || 'Escribe aquí…')}"></textarea><ul class="crit"></ul><div class="chk"><button class="btn" data-check>Revisar mi respuesta</button><span class="res" role="status"></span></div>${p.take ? `<p class="take"><b>Pista:</b> ${rich(p.take)}</p>` : ''}`;
  },

  practica(p, ctx) {
    ctx.act = {
      manual: true,
      mount(root, done, saved) { const boxes = $$('.stp input', root); const upd = () => { const n = boxes.filter((b) => b.checked).length; $('.pgs i', root).style.width = (n / boxes.length * 100) + '%'; $('.pgl', root).textContent = `${n} de ${boxes.length} pasos`; boxes.forEach((b) => b.closest('.stp').classList.toggle('on', b.checked)); return n; };
        (saved?.c || []).forEach((v, i) => { if (boxes[i]) boxes[i].checked = !!v; }); upd();
        boxes.forEach((b) => b.addEventListener('change', () => { const n = upd(); done(n / boxes.length, { c: boxes.map((x) => x.checked) }); })); },
    };
    return `${head(p)}${p.intro ? `<p class="lp">${rich(p.intro)}</p>` : ''}${p.mat ? `<div class="co co-ana"><div class="co-l">Material</div><p>${rich(p.mat)}</p></div>` : ''}
      <div class="pgs"><i></i></div><div class="muted small pgl"></div>
      ${p.steps.map((s, i) => `<label class="stp"><input type="checkbox"><span><b>${i + 1}.</b> ${rich(s)}</span></label>`).join('')}
      ${p.deliver ? `<div class="co co-def"><div class="co-l">Qué entregar</div><p>${rich(p.deliver)}</p></div>` : ''}
      ${p.rubric ? `<details class="rub"><summary>Ver rúbrica de evaluación</summary><table><thead><tr><th>Criterio</th><th>Bueno</th><th>Suficiente</th><th>Insuficiente</th></tr></thead><tbody>${p.rubric.map((r) => `<tr>${r.map((c) => `<td>${rich(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></details>` : ''}
      <p class="center" style="margin-top:14px"><a class="btn" href="#/tareas">Ir a Tareas para entregar</a></p>`;
  },
};

function head(p) { return `<header><span class="kick">${KICK[p.type]}</span><h1>${rich(p.t)}</h1>${p.sub ? `<p class="sub">${rich(p.sub)}</p>` : ''}</header>`; }
const foot = () => `<div class="chk"><button class="btn" data-check>Revisar respuestas</button><button class="btn ghost" data-reveal>Ver respuestas</button><span class="res" role="status"></span></div>`;

// ---------- vista principal ----------
export async function moduloView(el, { profile, param }) {
  const id = param[0];
  if (!/^m1-[1-7]$/.test(id || '')) { el.innerHTML = '<div class="empty">Módulo no encontrado.</div>'; return; }
  const preview = profile.role === 'teacher';
  let mod;
  try { mod = (await import(`../content/${id}.js`)).default; } catch (e) { console.error(e); el.innerHTML = '<div class="msg err">No se pudo cargar el módulo.</div>'; return; }
  const pages = [{ type: 'intro' }, ...mod.pages];
  let st = { done: {}, last: 0 };
  if (!preview) { const { data } = await sb.from('module_progress').select('done,last').eq('student_id', profile.id).eq('module', id).maybeSingle(); if (data) st = { done: data.done || {}, last: data.last || 0 }; }
  let i = Math.min(st.last, pages.length - 1); let timer;
  const save = () => { if (preview) return; clearTimeout(timer); timer = setTimeout(() => sb.from('module_progress').upsert({ student_id: profile.id, module: id, done: st.done, last: i, pct: pct(), updated_at: new Date().toISOString() }), 500); };
  const isDone = (k) => (st.done[k]?.s || 0) >= (pages[k].type === 'practica' ? 0.99 : 0.6);
  const pct = () => Math.round(pages.filter((_, k) => isDone(k)).length / pages.length * 100);
  const mark = (k, s, extra) => { const old = st.done[k] || {}; st.done[k] = { ...old, s: Math.round(Math.max(s, old.s || 0) * 100) / 100, ...(extra || {}) }; save(); drawProgress(); };

  el.innerHTML = `<div class="mod"><div class="modtop"><a href="#/material" class="back">← Material</a><div class="mt"><b>${esc(mod.title)}</b><span>${esc(mod.sub || '')}</span></div><div class="mp"><div class="bar"><i></i></div><small></small></div><button class="icon" id="mmenu" aria-label="Contenido">☰</button></div>
    ${preview ? '<div class="msg info" style="margin:0 0 12px">👁️ Vista previa del docente: el avance no se guarda.</div>' : ''}
    <div class="modbody"><aside class="modside" id="mside"></aside><main class="modmain"><div class="steps" id="steps"></div><article class="lesson" id="stage"></article><div class="fnav"><button class="btn ghost" id="prev">← Anterior</button><span id="ct"></span><button class="btn" id="next">Siguiente →</button></div></main></div></div>`;

  const drawProgress = () => { $('.mp .bar i', el).style.width = pct() + '%'; $('.mp small', el).textContent = pct() + ' %'; $$('#steps i', el).forEach((s, k) => { s.className = (isDone(k) ? 'ok ' : '') + (k === i ? 'on' : ''); });
    const side = pages.map((p, k) => `<button class="sl ${k === i ? 'on' : ''}" data-k="${k}"><span class="dot ${isDone(k) ? 'done' : ''}">${isDone(k) ? '✓' : k + 1}</span><span><b>${esc(p.type === 'intro' ? 'Inicio' : p.nav || p.t.replace(/<[^>]+>/g, ''))}</b><small>${esc(p.type === 'intro' ? mod.title : KICK[p.type].replace(/^\S+\s/, ''))}</small></span></button>`).join('');
    $('#mside', el).innerHTML = side; };
  const stepsBar = () => { $('#steps', el).innerHTML = pages.map(() => '<i></i>').join(''); };

  const intro = () => `<header><span class="kick">🎓 Módulo ${esc(mod.unit)}</span><h1>${esc(mod.title)}</h1><p class="sub">${esc(mod.sub || '')}</p></header>
    <div class="chips"><span class="chip">⏱️ ${mod.minutes || 60} min aprox.</span><span class="chip">📘 ${pages.filter((p) => p.type === 'lesson').length} lecciones</span><span class="chip">🎲 ${pages.filter((p) => !['lesson', 'intro', 'practica'].includes(p.type)).length} actividades</span>${mod.weight ? `<span class="chip">⭐ Evaluación: ${mod.weight} %</span>` : ''}</div>
    <div class="co co-def"><div class="co-l">Al terminar podrás…</div><ul class="goals">${mod.goals.map((g) => `<li>${rich(g)}</li>`).join('')}</ul></div>
    <div class="co co-ana"><div class="co-l">Cómo funciona</div><p>Avanza con <b>Siguiente</b>. Las actividades se revisan solas y puedes repetirlas las veces que quieras; las de práctica generan <b>ejercicios nuevos</b> cada vez. Tu avance se guarda automáticamente.</p></div>
    <button class="btn block" id="start">${Object.keys(st.done).length ? 'Continuar donde me quedé' : 'Comenzar'}</button>`;

  function draw() {
    const stage = $('#stage', el); const p = pages[i]; const ctx = { mounts: [], act: null };
    window.scrollTo(0, 0);
    if (p.type === 'intro') { stage.innerHTML = intro(); $('#start', el).onclick = () => { go(Math.max(1, Math.min(st.last || 1, pages.length - 1))); }; mark(0, 1); }
    else {
      stage.innerHTML = PAGE[p.type](p, ctx) + (i === pages.length - 1 && pct() >= 100 ? '<div class="badge ok"><div class="bg1">🎉 ¡Módulo completado!</div><div class="bg2">Terminaste todas las lecciones y actividades.</div></div>' : '');
      ctx.mounts.forEach((m) => m(stage));
      if (p.type === 'lesson') mark(i, 1);
      const a = ctx.act; const res = $('.res', stage);
      if (a) {
        const finish = (s, extra) => { mark(i, s, extra); };
        const report = (r) => { const s = r.ok / r.tot; const need = r.min ? r.min / r.tot : 1; res.textContent = s >= need ? `¡Muy bien! ${r.ok} de ${r.tot} correctas.` : `${r.ok} de ${r.tot} correctas. Revisa y vuelve a intentar.`; res.className = 'res ' + (s >= need ? 'ok' : 'bad'); if (s >= need) finish(s); };
        if (a.manual) a.mount?.(stage, (s, extra) => { finish(s, extra); if (p.type === 'mc') { res.textContent = `${Math.round(s * p.qs.length)} de ${p.qs.length} correctas.`; res.className = 'res ' + (s === 1 ? 'ok' : 'bad'); $('[data-retry]', stage).hidden = false; } }, st.done[i]);
        else a.mount?.(stage);
        $('[data-check]', stage)?.addEventListener('click', () => report(a.check(stage)));
        $('[data-reveal]', stage)?.addEventListener('click', () => { a.reveal(stage); res.textContent = 'Estas son las respuestas. ¡Inténtalo otra vez cuando quieras!'; res.className = 'res'; mark(i, 0.5); });
        $('[data-new]', stage)?.addEventListener('click', () => a.redraw(stage));
        $('[data-retry]', stage)?.addEventListener('click', () => draw());
      }
    }
    $('#prev', el).disabled = i === 0; $('#next', el).textContent = i === pages.length - 1 ? 'Terminar ✔' : 'Siguiente →'; $('#next', el).hidden = false;
    $('#ct', el).textContent = `${i + 1} / ${pages.length}`; drawProgress(); save();
  }
  const go = (k) => { i = Math.max(0, Math.min(pages.length - 1, k)); draw(); };
  $('#prev', el).onclick = () => go(i - 1);
  $('#next', el).onclick = () => { if (i === pages.length - 1) { location.hash = '#/material'; } else go(i + 1); };
  $('#mside', el).addEventListener('click', (e) => { const b = e.target.closest('.sl'); if (b) { go(+b.dataset.k); $('#mside', el).classList.remove('open'); $('.scrim')?.remove(); } });
  $('#mmenu', el).onclick = () => { const s = $('#mside', el); s.classList.toggle('open'); if (s.classList.contains('open')) { const sc = document.createElement('div'); sc.className = 'scrim on'; sc.onclick = () => { s.classList.remove('open'); sc.remove(); }; document.body.append(sc); } };
  stepsBar(); draw();
}
