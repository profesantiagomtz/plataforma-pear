// Hoja de trabajo interactiva «Mi lista del mercado» (actividad de evaluación 1.3).
// El alumno rellena huecos, la plataforma revisa cada paso y al final la envía a TAREAS.
import { sb, esc, $, $$, toast } from './ui.js';
import { logEvent } from './live.js';

const num = (v) => { const s = String(v ?? '').trim().replace(/[$\s,]/g, '').replace(/[−–]/g, '-'); return s === '' || isNaN(+s) ? NaN : +s; };
const inp = (k, w = 's', ph = '') => `<input class="ti hj-${w}" data-k="${k}" type="text" inputmode="${w === 't' ? 'text' : 'numeric'}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${ph}">`;
const ROWS = [1, 2, 3, 4];
const PRIMES = [2, 3, 5, 7];
const words = (s) => String(s || '').trim().split(/\s+/).filter((w) => /[a-záéíóúñ]/i.test(w)).length;

// Cada paso: título, contenido y revisión. check(v) → { ok, msg }.
const STEPS = [
  {
    t: 'Mi lista (5 cosas)',
    body: () => `<p>Escribe <b>4 cosas</b> que se compran en tu casa para <b>estar sanos</b> (comida, jabón, medicina…). La primera ya está hecha. Escribe cuántas compras, el precio de 1 y el <b>total</b> (cuántas × precio).</p>
      <div class="hj-row hj-fix"><div class="hj-n">1. Plátanos</div><div>12 × $5 = <b>$60</b></div></div>
      ${ROWS.map((r) => `<div class="hj-row"><div class="hj-n">${r + 1}. ${inp('c' + r, 't', 'Cosa (ej. jabón)')}</div><div class="hj-calc">${inp('q' + r, 's', 'cuántas')}<span>×&nbsp;$</span>${inp('p' + r, 's', 'precio')}<span>=&nbsp;$</span>${inp('t' + r, 's', 'total')}</div></div>`).join('')}
      <div class="hj-row hj-sum"><div class="hj-n"><b>Total gastado</b> (suma los 5 totales)</div><div>60 + … = $${inp('tg')}</div></div>`,
    check(v) {
      for (const r of ROWS) {
        const c = String(v['c' + r] || '').trim(), q = num(v['q' + r]), p = num(v['p' + r]), t = num(v['t' + r]);
        if (!c) return { ok: false, msg: `Renglón ${r + 1}: escribe qué cosa es.` };
        if (!(q > 0) || !(p > 0)) return { ok: false, msg: `Renglón ${r + 1} (${esc(c)}): escribe cuántas y el precio (solo números).` };
        if (t !== q * p) return { ok: false, msg: `Renglón ${r + 1} (${esc(c)}): revisa la multiplicación ${q} × ${p}.` };
      }
      const sum = 60 + ROWS.reduce((a, r) => a + num(v['t' + r]), 0);
      if (num(v.tg) !== sum) return { ok: false, msg: 'Revisa el <b>total gastado</b>: suma 60 + los 4 totales que escribiste.' };
      return { ok: true };
    },
  },
  {
    t: 'Multiplicar en partes (propiedad distributiva)',
    body: () => `<p>Partimos el 12 en <b>10 + 2</b> y multiplicamos cada parte por 5. Rellena:</p>
      <p class="hj-eq">12 × 5 = 10 × 5 + 2 × 5 = ${inp('d1')} + ${inp('d2')} = ${inp('d3')}</p>`,
    check: (v) => (num(v.d1) === 50 && num(v.d2) === 10 && num(v.d3) === 60 ? { ok: true }
      : { ok: false, msg: num(v.d1) !== 50 ? '¿Cuánto es 10 × 5?' : num(v.d2) !== 10 ? '¿Cuánto es 2 × 5?' : 'Ahora suma los dos resultados.' }),
  },
  {
    t: '¿Me alcanza? (números con signo)',
    body: () => `<p>Tengo <b>$200</b>. Copia tu <b>total gastado</b> del paso 1 y resta.</p>
      <p class="hj-eq">200 − ${inp('g')} = ${inp('r', 's', '±')}</p>
      <p>¿Me alcanzó? <select class="ti hj-sel" data-k="s"><option value="">👉 Elige…</option><option value="si">Sí me alcanzó (sobró o quedó en 0)</option><option value="no">No me alcanzó (me faltó dinero)</option></select></p>
      <p class="muted small">Si el resultado sale <b>negativo</b>, escríbelo con signo menos, así: −30. Quiere decir que te <b>faltó</b> dinero.</p>`,
    check(v) {
      const tg = num(v.tg), g = num(v.g), r = num(v.r);
      if (isNaN(tg)) return { ok: false, msg: 'Primero termina el paso 1.' };
      if (g !== tg) return { ok: false, msg: `Escribe tu total gastado del paso 1 (es ${tg}).` };
      if (r !== 200 - g) return { ok: false, msg: 200 - g < 0 ? 'Revisa la resta. Gastaste más de 200, así que el resultado lleva signo menos (−).' : 'Revisa la resta.' };
      if (v.s !== (r >= 0 ? 'si' : 'no')) return { ok: false, msg: 'Mira el signo del resultado y elige otra vez si te alcanzó.' };
      return { ok: true };
    },
  },
  {
    t: 'Repartir sin que sobre (MCD)',
    body: () => `<p>Tengo <b>12 manzanas</b> y <b>18 naranjas</b>. Quiero hacer <b>bolsitas iguales</b> sin que sobre nada.</p>
      <p>Números que dividen exacto al 12: 1, 2, 3, 4, ${inp('m1')}, 12</p>
      <p>Números que dividen exacto al 18: 1, 2, 3, ${inp('m2')}, 9, 18</p>
      <p>El número <b>más grande</b> que está en las dos listas: ${inp('mcd')}</p>
      <p>Puedo hacer ${inp('b')} bolsitas. Cada una lleva ${inp('bm')} manzanas y ${inp('bn')} naranjas.</p>`,
    check(v) {
      if (num(v.m1) !== 6 || num(v.m2) !== 6) return { ok: false, msg: 'Revisa las listas: ¿qué número falta entre 4 y 12? ¿Y entre 3 y 9?' };
      if (num(v.mcd) !== 6) return { ok: false, msg: 'Busca el número más grande que aparece en las dos listas.' };
      if (num(v.b) !== 6) return { ok: false, msg: 'Haces tantas bolsitas como el número que encontraste.' };
      if (num(v.bm) !== 2 || num(v.bn) !== 3) return { ok: false, msg: 'Divide: 12 ÷ 6 manzanas y 18 ÷ 6 naranjas.' };
      return { ok: true };
    },
  },
  {
    t: '¿Cuándo coinciden? (MCM)',
    body: () => `<p>Compro <b>jabón cada 4 días</b> y <b>fruta cada 6 días</b>.</p>
      <p>Cuenta de 4 en 4: 4, 8, ${inp('a1')}, 16, 20</p>
      <p>Cuenta de 6 en 6: 6, ${inp('a2')}, 18, 24</p>
      <p>El <b>primer número</b> que está en las dos listas: ${inp('mcm')}</p>
      <p>Compro las dos cosas el mismo día cada ${inp('dias')} días.</p>`,
    check(v) {
      if (num(v.a1) !== 12 || num(v.a2) !== 12) return { ok: false, msg: 'Revisa las cuentas: 8 + 4 = ? y 6 + 6 = ?' };
      if (num(v.mcm) !== 12 || num(v.dias) !== 12) return { ok: false, msg: 'Busca el primer número que se repite en las dos listas.' };
      return { ok: true };
    },
  },
  {
    t: 'Partir en números primos (factorización)',
    body: () => `<p>Así se hace con el 12: divide entre <b>2</b> mientras se pueda; luego entre <b>3</b>. Para cuando llegues a <b>1</b>.</p>
      <table class="hj-fac"><tr><td>12</td><td>÷ 2</td></tr><tr><td>6</td><td>÷ 2</td></tr><tr><td>3</td><td>÷ 3</td></tr><tr><td>1</td><td></td></tr></table>
      <p>12 = 2 × 2 × 3 ✔</p>
      <p><b>Ahora tú con el 18:</b></p>
      <table class="hj-fac"><tr><td>18</td><td>÷ ${inp('f1')}</td></tr><tr><td>${inp('n1')}</td><td>÷ ${inp('f2')}</td></tr><tr><td>${inp('n2')}</td><td>÷ ${inp('f3')}</td></tr><tr><td>1</td><td></td></tr></table>
      <p class="hj-eq hj-calc"><span>18&nbsp;=</span>${inp('x1')}<span>×</span>${inp('x2')}<span>×</span>${inp('x3')}</p>`,
    check(v) {
      let n = 18;
      for (const [f, k] of [['f1', 'n1'], ['f2', 'n2'], ['f3', null]]) {
        const d = num(v[f]);
        if (!PRIMES.includes(d) || n % d) return { ok: false, msg: `¿Entre qué número primo (2 o 3) se puede dividir exacto el ${n}?` };
        n /= d;
        if (k && num(v[k]) !== n) return { ok: false, msg: 'Revisa el resultado de la división.' };
      }
      if (n !== 1) return { ok: false, msg: 'Debes llegar a 1.' };
      const xs = ['x1', 'x2', 'x3'].map((k) => num(v[k])).sort((a, b) => a - b);
      if (xs.join() !== '2,3,3') return { ok: false, msg: 'Escribe abajo los 3 números entre los que dividiste.' };
      return { ok: true };
    },
  },
  {
    t: 'Mi conclusión (3 renglones)',
    body: () => `<p>Contesta con tus palabras (un renglón cada una):</p>
      <label class="hj-q">1. ¿Qué compran en tu casa para estar sanos?</label><textarea class="ti" rows="2" data-k="w1"></textarea>
      <label class="hj-q">2. Pregúntale a un abuelo o a un adulto: ¿qué usaban antes para curarse o asearse? (plantas, tés, remedios)</label><textarea class="ti" rows="2" data-k="w2"></textarea>
      <label class="hj-q">3. ¿Para qué te sirve hacer una lista de gastos?</label><textarea class="ti" rows="2" data-k="w3"></textarea>`,
    check(v) {
      const bad = ['w1', 'w2', 'w3'].findIndex((k) => words(v[k]) < 4);
      return bad < 0 ? { ok: true } : { ok: false, msg: `Escribe un poco más en la pregunta ${bad + 1} (por lo menos 4 palabras).` };
    },
  },
];

// Respuestas de ejemplo (para la prueba automática).
export const demo = { c1: 'Jabón', q1: 2, p1: 15, t1: 30, c2: 'Leche', q2: 3, p2: 25, t2: 75, c3: 'Huevos', q3: 1, p3: 40, t3: 40, c4: 'Paracetamol', q4: 1, p4: 25, t4: 25, tg: 230,
  d1: 50, d2: 10, d3: 60, g: 230, r: -30, s: 'no', m1: 6, m2: 6, mcd: 6, b: 6, bm: 2, bn: 3, a1: 12, a2: 12, mcm: 12, dias: 12,
  f1: 2, n1: 9, f2: 3, n2: 3, f3: 3, x1: 2, x2: 3, x3: 3,
  w1: 'Compramos fruta, leche y jabón', w2: 'Mi abuela usaba té de manzanilla', w3: 'Para saber si me alcanza el dinero' };

// Puntos de cada paso (suman 60) y cuánto se respeta según el intento en que salió bien.
export const PTS = [12, 6, 9, 9, 9, 9, 6]; // suman 60: lo máximo que vale la actividad de evaluación (60 de 100)
const FACTOR = (t) => (t <= 1 ? 1 : t === 2 ? 0.8 : t === 3 ? 0.6 : 0.4);
const r2 = (x) => Math.round(x * 100) / 100;
export const sugerida = (first) => Math.round(PTS.reduce((a, pt, i) => a + pt * FACTOR(first[i] || 99), 0) * 10) / 10;

// Explicación para el alumno (se pone en la retroalimentación al calificar).
export function explicacion(first, tries) {
  const L = [`Tu calificación: ${sugerida(first)} de 60 (60 es lo máximo de esta actividad).`, '', 'Así se calculó, paso por paso:'];
  STEPS.forEach((s, i) => {
    const f = first[i], pt = PTS[i];
    if (f == null) { L.push(`✘ Paso ${i + 1}, ${s.t}: no lo terminaste bien → 0 de ${pt}.`); return; }
    const err = f - 1;
    L.push(`${err ? '•' : '✔'} Paso ${i + 1}, ${s.t}: bien al ${f === 1 || f === 3 ? f + '.er' : f + '.º'} intento${err ? ` (te equivocaste ${err} ${err === 1 ? 'vez' : 'veces'})` : ''} → ${r2(pt * FACTOR(f))} de ${pt}.`);
  });
  L.push('', 'Regla para todos: cada paso vale puntos. Si te sale bien al 1.er intento vale completo; al 2.º, el 80 %; al 3.º, el 60 %; al 4.º o más, el 40 %.',
    `Tocaste COMPROBAR ${tries.reduce((a, b) => a + (b || 0), 0)} veces en total.`);
  return L.join('\n');
}

function intentos(first, tries) {
  const L = ['', '', '📊 INTENTOS PARA LLEGAR A LA RESPUESTA CORRECTA (los cuenta la plataforma)'];
  const ord = (t) => (t === 1 || t === 3 ? `${t}.er` : `${t}.º`);
  PTS.forEach((pt, i) => L.push(`- Paso ${i + 1}: correcto al ${ord(first[i])} intento → ${r2(pt * FACTOR(first[i]))} de ${pt} pts`));
  L.push(`Total de veces que tocó COMPROBAR: ${tries.reduce((a, b) => a + b, 0)}`, `Calificación sugerida: ${sugerida(first)} de 60 (60 = actividad perfecta)`,
    '(1.er intento = 100 % del paso, 2.º = 80 %, 3.º = 60 %, 4 o más = 40 %)');
  return L.join('\n');
}

function resumen(v) {
  const L = ['📝 Hoja «Mi lista del mercado» (hecha en la plataforma)', '', 'PASO 1. Mi lista', '- Plátanos: 12 × $5 = $60'];
  ROWS.forEach((r) => L.push(`- ${String(v['c' + r]).trim()}: ${v['q' + r]} × $${v['p' + r]} = $${v['t' + r]}`));
  L.push(`Total gastado: $${v.tg}`, '', 'PASO 2. 12 × 5 = 10 × 5 + 2 × 5 = 50 + 10 = 60', '',
    `PASO 3. 200 − ${v.g} = ${v.r} → ${v.s === 'si' ? 'Sí me alcanzó' : 'No me alcanzó (me faltó dinero)'}`, '',
    'PASO 4. MCD(12, 18) = 6 → 6 bolsitas, cada una con 2 manzanas y 3 naranjas', '',
    'PASO 5. MCM(4, 6) = 12 → las dos compras coinciden cada 12 días', '',
    `PASO 6. 18 ÷ ${v.f1} = ${v.n1}, ${v.n1} ÷ ${v.f2} = ${v.n2}, ${v.n2} ÷ ${v.f3} = 1 → 18 = ${v.x1} × ${v.x2} × ${v.x3}`, '',
    'PASO 7. Mi conclusión', `1) ${String(v.w1).trim()}`, `2) ${String(v.w2).trim()}`, `3) ${String(v.w3).trim()}`, '',
    '✅ La plataforma revisó los 7 pasos y están correctos.');
  return L.join('\n');
}

async function enviar(profile, unit, v, extra) {
  const { data: u } = await sb.from('units').select('id').eq('code', unit).maybeSingle();
  if (!u) throw new Error('No encontré el propósito ' + unit + '.');
  const { data: as } = await sb.from('assignments').select('id,title').eq('unit_id', u.id).eq('is_ae', true).eq('published', true).order('created_at', { ascending: false }).limit(1);
  const a = as?.[0];
  if (!a) throw new Error('Tu profe todavía no abre la tarea de esta actividad. Avísale y vuelve a intentarlo después.');
  const { data: s } = await sb.from('submissions').select('id,score,body').eq('assignment_id', a.id).eq('student_id', profile.id).maybeSingle();
  if (s && s.score != null) throw new Error('Tu profe ya calificó esta actividad; ya no se puede cambiar.');
  const body = resumen(v) + extra + (s?.body && !s.body.startsWith('📝 Hoja') ? '\n\n— Lo que habías escrito antes —\n' + s.body : '');
  const row = { assignment_id: a.id, student_id: profile.id, body, submitted_at: new Date().toISOString() };
  const { error } = s ? await sb.from('submissions').update(row).eq('id', s.id) : await sb.from('submissions').insert(row);
  if (error) throw error;
  logEvent('submit', null, null, { title: a.title });
  return a;
}

export function hojaPage(p, ctx, head) {
  ctx.act = {
    manual: true, practice: true,
    mount(root, done, saved) {
      const v = { ...(saved?.c?.v || {}) }; const ok = STEPS.map(() => false);
      const tries = STEPS.map((_, i) => saved?.c?.tries?.[i] || 0); const first = STEPS.map((_, i) => saved?.c?.first?.[i] ?? null);
      const cards = $$('.hj-step', root);
      const fields = $$('[data-k]', root);
      fields.forEach((f) => { if (v[f.dataset.k] != null) f.value = v[f.dataset.k]; });
      const read = () => fields.forEach((f) => { v[f.dataset.k] = f.value; });
      const n = () => ok.filter(Boolean).length;
      const paint = () => {
        cards.forEach((c, i) => c.classList.toggle('ok', ok[i]));
        $('.pgs i', root).style.width = (n() / STEPS.length * 100) + '%';
        $('.pgl', root).textContent = `${n()} de ${STEPS.length} pasos correctos`;
        $('.hj-send', root).hidden = n() < STEPS.length;
      };
      const report = (quiet) => done({ n: n(), tot: STEPS.length, c: { v: { ...v }, ok: [...ok], tries: [...tries], first: [...first] }, quiet });
      // Al volver a entrar se revisa en silencio lo que ya tenía.
      // Un paso solo cuenta si el alumno tocó COMPROBAR y salió correcto.
      STEPS.forEach((s, i) => { ok[i] = first[i] != null && s.check(v).ok; }); paint();
      cards.forEach((c, i) => {
        $('[data-hc]', c).addEventListener('click', () => {
          read(); const r = STEPS[i].check(v); ok[i] = r.ok; const f = $('.gf', c);
          if (first[i] == null && $$('[data-k]', c).some((x) => String(x.value).trim())) { tries[i]++; if (r.ok) first[i] = tries[i]; }
          f.className = 'gf ' + (r.ok ? 'ok' : 'bad');
          f.innerHTML = r.ok ? '✅ <b>¡Bien!</b> Este paso está correcto.' : '❌ ' + r.msg;
          if (!r.ok) { c.classList.add('shake'); setTimeout(() => c.classList.remove('shake'), 400); }
          paint(); report(false);
          if (r.ok && cards[i + 1] && !ok[i + 1]) cards[i + 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (n() === STEPS.length) $('.hj-send', root).scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        $$('[data-k]', c).forEach((f) => f.addEventListener('input', () => { if (ok[i]) { ok[i] = false; $('.gf', c).innerHTML = '✏️ Cambiaste algo: toca <b>COMPROBAR</b> otra vez.'; $('.gf', c).className = 'gf'; paint(); } }));
        $$('[data-k]', c).forEach((f) => f.addEventListener('change', () => { read(); report(true); }));
      });
      $('[data-send]', root).addEventListener('click', async (e) => {
        const b = e.currentTarget; read();
        if (STEPS.some((s, i) => !s.check(v).ok || first[i] == null)) { toast('Revisa otra vez los pasos: alguno cambió.', 'err'); return; }
        if (ctx.preview) { toast('Vista de profe: aquí el alumno envía su hoja a TAREAS.', 'ok'); return; }
        b.disabled = true; const old = b.textContent; b.textContent = 'Enviando…';
        try { await enviar(ctx.profile, p.unit, v, intentos(first, tries)); report(false); $('.hj-sent', root).hidden = false; toast('¡Hoja enviada a tu profe! ✔', 'ok'); }
        catch (err) { toast(err.message || 'No se pudo enviar. Inténtalo otra vez.', 'err'); }
        finally { b.disabled = false; b.textContent = old; }
      });
    },
  };
  return `${head(p)}${p.intro ? `<p class="lp">${p.intro}</p>` : ''}
    <div class="pgs"><i></i></div><div class="muted small pgl"></div>
    ${STEPS.map((s, i) => `<section class="gs hj-step"><div class="gq"><span class="qn">${i + 1}</span><div class="qt"><b>Paso ${i + 1}.</b> ${s.t}</div></div>
      <div class="hj-body">${s.body()}</div>
      <div class="chk"><button class="btn" data-hc>✅ COMPROBAR paso ${i + 1}</button></div><div class="gf" role="status"></div></section>`).join('')}
    <div class="co co-def hj-send" hidden><div class="co-l">📤 Último paso: enviar</div>
      <p>¡Terminaste los 7 pasos! 🎉 Toca el <b>botón azul</b> para mandarle tu hoja a tu profe. Se guarda en <b>TAREAS</b> como tu entrega.</p>
      <p class="center"><button class="btn big" data-send>📤 ENVIAR A MI PROFE</button></p>
      <p class="hj-sent okcard" hidden>✔ Enviada. Si cambias algo, vuelve a tocar el botón azul para actualizarla.</p></div>`;
}
