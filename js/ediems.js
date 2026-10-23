// Sección aparte de preparación para el examen EDIEMS (Matemáticas). No forma parte de la calificación de PEAR.
import { sb, esc, $, $$, toast } from './ui.js';
import { shuffle } from './gens.js';
import { logEvent } from './live.js';

export const ED_SESSIONS = [
  ['ed-1', '➕', 'Presupuesto: mis ingresos y mis gastos', 'Números enteros y ley de los signos'],
  ['ed-2', '📅', 'Salud financiera', 'MCD y MCM'],
  ['ed-3', '🏷️', 'Administrando mi dinero', 'Porcentajes, descuentos e intereses'],
  ['ed-4', '🔁', 'Las propiedades en las finanzas', 'Conmutativa, asociativa y distributiva'],
  ['ed-5', '✈️', 'Viaje a París', 'Proporcionalidad directa y regla de tres'],
  ['ed-6', '⚖️', 'Convertir para decidir mejor', 'Conversión de unidades y precio unitario'],
  ['ed-7', '💳', 'Conoce tu límite', 'Operaciones con fracciones'],
  ['ed-8', '🏦', 'Las afores', 'Jerarquía de operaciones y signos de agrupación'],
  ['ed-9', '📈', 'El crecimiento del dinero', 'Leyes de los exponentes'],
  ['ed-10', '🔤', 'El idioma del dinero', 'Lenguaje algebraico'],
];
const SIM_N = 20, SIM_MIN = 40;
const rich = (s) => String(s ?? '').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');

export async function ediemsView(el, { profile, param }) {
  if (param[0] === 'formulario') return formulario(el);
  if (param[0] === 'simulacro') return simulacro(el, profile);
  const teacher = profile.role === 'teacher';
  const { data: prog } = teacher ? { data: [] } : await sb.from('module_progress').select('module,pct,done').eq('student_id', profile.id).like('module', 'ed-%');
  const pg = Object.fromEntries((prog || []).map((p) => [p.module, p]));
  const doneN = ED_SESSIONS.filter(([id]) => (pg[id]?.pct || 0) >= 100).length;
  const best = pg['ed-sim']?.pct;
  el.innerHTML = `<div class="head"><h1>🎯 Preparación EDIEMS</h1></div>
    <div class="msg info">Esta sección es <b>aparte de PEAR</b>: es para prepararte para el examen diagnóstico de ingreso (EDIEMS) de <b>Matemáticas</b>. <b>No cuenta para tu calificación</b> de PEAR. Tema del curso: <b>finanzas personales</b>.</div>
    ${teacher ? '' : `<div class="stats"><div class="stat"><b>${doneN}/10</b><span>Sesiones terminadas</span></div><div class="stat"><b>${best != null ? best + ' %' : '—'}</b><span>Mejor resultado en el simulacro</span></div></div>`}
    <div class="card"><h2>🧭 Cómo estudiar</h2><ol class="small" style="margin:0;padding-left:20px;line-height:1.7"><li>Haz las <b>10 sesiones</b> en orden (cada una ≈ 50 min, se revisan solas).</li><li>Repasa el <b>📋 formulario</b> con todas las reglas en una página.</li><li>Haz el <b>📝 simulacro</b> (${SIM_N} preguntas, ${SIM_MIN} min). Repítelo: cada vez salen preguntas distintas.</li></ol>
      <div class="chips" style="margin-top:12px"><a class="btn soft" href="#/ediems/formulario">📋 Formulario</a><a class="btn" href="#/ediems/simulacro">📝 Simulacro</a></div></div>
    <div class="card"><h2>📚 Las 10 sesiones</h2><div class="list">${ED_SESSIONS.map(([id, ic, t, s], i) => { const p = pg[id]?.pct;
      return `<a class="item" href="#/modulo/${id}"><span class="qn">${i + 1}</span><div style="font-size:1.4rem">${ic}</div><div class="grow"><div class="t">${esc(t)}</div><div class="muted small">${esc(s)}</div></div>${teacher ? '' : `<span class="badge ${p >= 100 ? 'ok' : p ? 'info' : ''}">${p ?? 0} %</span>`}</a>`; }).join('')}</div></div>
    ${teacher ? '<div class="card" id="grp"><h2>📈 Avance del grupo</h2><div class="boot" style="height:80px"><div class="spinner"></div></div></div>' : ''}`;
  if (teacher) groupProgress($('#grp', el));
}

async function groupProgress(box) {
  const [{ data: st }, { data: pr }] = await Promise.all([
    sb.from('profiles').select('id,full_name,apellido_p,apellido_m,nombres').eq('role', 'student').eq('active', true),
    sb.from('module_progress').select('student_id,module,pct').like('module', 'ed-%'),
  ]);
  const by = {}; (pr || []).forEach((r) => ((by[r.student_id] ||= {})[r.module] = r.pct));
  const name = (s) => [s.apellido_p, s.apellido_m, s.nombres].filter(Boolean).join(' ') || s.full_name;
  const rows = (st || []).sort((a, b) => name(a).localeCompare(name(b), 'es'));
  if (!rows.length) { box.innerHTML = '<h2>📈 Avance del grupo</h2><div class="empty">Aún no hay alumnos.</div>'; return; }
  const cell = (v) => `<td class="center">${v == null ? '<span class="muted">·</span>' : `<span class="badge ${v >= 100 ? 'ok' : v >= 60 ? 'info' : 'warn'}">${v}</span>`}</td>`;
  box.innerHTML = `<h2>📈 Avance del grupo</h2><p class="muted small">% de cada sesión y mejor calificación del simulacro (S).</p><div class="tablewrap"><table><thead><tr><th>Alumno</th>${ED_SESSIONS.map((_, i) => `<th class="center">${i + 1}</th>`).join('')}<th class="center">S</th></tr></thead>
    <tbody>${rows.map((s) => `<tr><td>${esc(name(s))}</td>${ED_SESSIONS.map(([id]) => cell(by[s.id]?.[id])).join('')}${cell(by[s.id]?.['ed-sim'])}</tr>`).join('')}</tbody></table></div>`;
}

// ---------- formulario ----------
function formulario(el) {
  const sec = (t, items) => `<div class="card"><h2>${t}</h2><ul class="small" style="margin:0;padding-left:20px;line-height:1.75">${items.map((x) => `<li>${rich(x)}</li>`).join('')}</ul></div>`;
  el.innerHTML = `<p><a href="#/ediems">← EDIEMS</a></p><div class="head"><h1>📋 Formulario EDIEMS</h1><button class="btn ghost sm" id="pr">🖨️ Imprimir</button></div>
  ${sec('1 · Números enteros', ['Ingresos con **+**, gastos con **−**. Saldo = ingresos − gastos.', 'Mismo signo: se suman y se deja el signo (−8 − 5 = −13).', 'Signos distintos: se restan y queda el signo del mayor (−8 + 5 = −3).', 'Restar un negativo es sumar: 6 − (−4) = 10.', 'Al multiplicar o dividir: signos **iguales → +**, **diferentes → −**.'])}
  ${sec('2 · MCD y MCM', ['Descompón en primos: 24 = 2³ × 3.', '**MCD**: factores **comunes** con el **menor** exponente → para **repartir** en partes iguales.', '**MCM**: **todos** los factores con el **mayor** exponente → para saber **cuándo coinciden**.'])}
  ${sec('3 · Porcentajes', ['% → decimal: ÷ 100 (25 % = 0.25). Decimal → %: × 100.', 'Porcentaje de una cantidad: decimal × cantidad (20 % de 150 = 30).', 'Con descuento: precio × (1 − d). Con aumento: precio × (1 + a).', '¿Qué % es a de b? → a ÷ b × 100.', 'Interés simple: capital × tasa × tiempo.'])}
  ${sec('4 · Propiedades', ['Conmutativa (orden): a + b = b + a; a × b = b × a.', 'Asociativa (agrupar): (a + b) + c = a + (b + c).', 'Distributiva: a(b + c) = ab + ac.', 'La resta y la división **no** son conmutativas.'])}
  ${sec('5 · Proporcionalidad directa', ['Si una se duplica, la otra también. Gráfica: recta que pasa por el origen.', 'Regla de tres: a → b, c → ? ⇒ ? = c × b ÷ a.', 'Valor unitario: divide para saber cuánto vale 1 y luego multiplica.'])}
  ${sec('6 · Conversiones', ['1 kg = 1 000 g · 1 L = 1 000 ml · 1 km = 1 000 m · 1 h = 60 min · 1 min = 60 s.', 'A unidad más chica → multiplica; a unidad más grande → divide.', 'Precio unitario = precio ÷ cantidad (misma unidad). El menor conviene.'])}
  ${sec('7 · Fracciones', ['Mismo denominador: suma/resta numeradores.', 'Distinto denominador: usa el MCM o a/b + c/d = (ad + bc)/bd.', 'Multiplicar: (a/b)(c/d) = ac/bd. Dividir: a/b ÷ c/d = ad/bc.', 'Fracción de una cantidad: cantidad × numerador ÷ denominador. Siempre simplifica.'])}
  ${sec('8 · Jerarquía de operaciones', ['1) ( ) → [ ] → { } (de adentro hacia afuera)', '2) Potencias y raíces', '3) × y ÷ de izquierda a derecha', '4) + y − de izquierda a derecha'])}
  ${sec('9 · Exponentes', ['aᵐ · aⁿ = aᵐ⁺ⁿ', 'aᵐ / aⁿ = aᵐ⁻ⁿ', '(aᵐ)ⁿ = aᵐˣⁿ', 'a⁰ = 1', 'En sumas y restas solo se juntan términos con **misma base y mismo exponente**: x³ + x³ = 2x³; x² + x³ no se simplifica.'])}
  ${sec('10 · Lenguaje algebraico', ['Un número: x · más 5: x + 5 · menos 30: x − 30', 'El doble: 2x · el triple: 3x · la mitad: x/2 · el cuadrado: x²', 'Consecutivos: x, x + 1 · repartir entre 4: x/4', 'Evaluar: cambia la letra por el número (2x + 50 con x = 100 → 250).'])}`;
  $('#pr', el).onclick = () => window.print();
}

// ---------- simulacro ----------
async function simulacro(el, profile) {
  const bank = (await import('../content/ed-sim.js')).default;
  const teacher = profile.role === 'teacher';
  el.innerHTML = `<p><a href="#/ediems">← EDIEMS</a></p><div class="card"><h1>📝 Simulacro EDIEMS · Matemáticas</h1>
    <div class="chips"><span class="chip">❓ ${SIM_N} preguntas</span><span class="chip">⏱️ ${SIM_MIN} minutos</span><span class="chip">🔀 Cada intento es distinto</span></div>
    <p>Ten a la mano <b>cuaderno y lápiz</b>. Escoge una respuesta por pregunta. Al final verás tu calificación y la explicación de cada pregunta.</p>
    ${teacher ? '<div class="msg info">Vista del docente: tus resultados no se guardan.</div>' : ''}
    <button class="btn big block" id="go">▶️ Comenzar</button></div>`;
  $('#go', el).onclick = () => start();

  function start() {
    // toma preguntas repartidas entre las 10 sesiones y revuelve las opciones
    const bySes = {}; shuffle(bank).forEach((q) => (bySes[q[4]] ||= []).push(q));
    const picked = []; let r = 0; while (picked.length < Math.min(SIM_N, bank.length)) { Object.values(bySes).forEach((l) => { if (l[r] && picked.length < SIM_N) picked.push(l[r]); }); r++; }
    const qs = shuffle(picked).map(([t, opts, ok, why, s]) => { const o = shuffle(opts.map((x, i) => ({ x, ok: i === ok }))); return { t, o, why, s }; });
    const ans = new Array(qs.length).fill(null);
    const end = Date.now() + SIM_MIN * 60000; let finished = false;
    el.innerHTML = `<div class="card simbar" style="position:sticky;top:0;z-index:5;display:flex;gap:10px;align-items:center;flex-wrap:wrap"><b id="tm">⏱️ ${SIM_MIN}:00</b><span class="muted small" id="ct">0 de ${qs.length} contestadas</span><span style="flex:1"></span><button class="btn sm" id="fin">Terminar y calificar</button></div>
      ${qs.map((q, i) => `<div class="card rq" id="q${i}"><p><b>${i + 1}.</b> ${esc(q.t)}</p>${q.o.map((o, j) => `<button class="opt" data-q="${i}" data-j="${j}">${esc(o.x)}</button>`).join('')}<div class="rqe" data-q="${i}"></div></div>`).join('')}
      <button class="btn big block" id="fin2">✅ Terminar y calificar</button>`;
    $$('.opt', el).forEach((b) => b.onclick = () => { if (finished) return; const i = +b.dataset.q; ans[i] = +b.dataset.j; $$(`.opt[data-q="${i}"]`, el).forEach((x) => x.classList.toggle('sel', x === b)); $('#ct', el).textContent = `${ans.filter((a) => a != null).length} de ${qs.length} contestadas`; });
    const tick = setInterval(() => { if (!el.isConnected) return clearInterval(tick); const s = Math.max(0, Math.round((end - Date.now()) / 1000)); $('#tm', el).textContent = `⏱️ ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; if (!s) { toast('⏱️ Se acabó el tiempo', 'err'); finish(); } }, 1000);
    const ask = () => { const left = ans.filter((a) => a == null).length; if (left && !confirm(`Te faltan ${left} preguntas. ¿Terminar de todos modos?`)) return; finish(); };
    $('#fin', el).onclick = ask; $('#fin2', el).onclick = ask;

    async function finish() {
      if (finished) return; finished = true; clearInterval(tick);
      let ok = 0; const fails = {};
      qs.forEach((q, i) => { const good = ans[i] != null && q.o[ans[i]].ok; if (good) ok++; else fails[q.s] = (fails[q.s] || 0) + 1;
        $$(`.opt[data-q="${i}"]`, el).forEach((b, j) => { b.disabled = true; b.classList.remove('sel'); if (q.o[j].ok) b.classList.add('ok'); else if (j === ans[i]) b.classList.add('bad'); });
        const e = $(`.rqe[data-q="${i}"]`, el); e.className = 'rqe ' + (good ? 'ok' : 'bad'); e.textContent = (good ? '✅ ' : ans[i] == null ? '⚪ Sin contestar. ' : '❌ ') + q.why; });
      const pct = Math.round(ok / qs.length * 100);
      const weak = Object.entries(fails).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([s]) => ED_SESSIONS[s - 1]);
      $('.simbar', el).outerHTML = `<div class="card"><h1>${pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '💪'} ${ok} de ${qs.length} · ${pct} %</h1>
        <p>${pct >= 80 ? '¡Excelente! Vas muy bien preparado.' : pct >= 60 ? 'Vas bien. Repasa los temas de abajo y vuelve a intentarlo.' : 'Necesitas repasar. Haz las sesiones de abajo y vuelve a intentarlo.'}</p>
        ${weak.length ? `<p class="small"><b>Repasa:</b> ${weak.map(([id, ic, t]) => `<a href="#/modulo/${id}">${ic} ${esc(t)}</a>`).join(' · ')}</p>` : ''}
        <div class="chips"><button class="btn" id="again">🔁 Otro simulacro</button><a class="btn ghost" href="#/ediems">← EDIEMS</a></div><p class="muted small">Abajo puedes ver la respuesta correcta y la explicación de cada pregunta.</p></div>`;
      $('#fin2', el)?.remove(); $('#again', el).onclick = () => start(); window.scrollTo(0, 0);
      if (teacher) return;
      logEvent('attempt', 'ed-sim', null, { title: 'Simulacro EDIEMS', ok, tot: qs.length, pass: pct >= 60 });
      const { data: old } = await sb.from('module_progress').select('pct,done').eq('student_id', profile.id).eq('module', 'ed-sim').maybeSingle();
      const tries = [...(old?.done?.tries || []), { at: Date.now(), ok, tot: qs.length }].slice(-30);
      const { error } = await sb.from('module_progress').upsert({ student_id: profile.id, module: 'ed-sim', done: { tries }, last: 0, pct: Math.max(pct, old?.pct || 0), updated_at: new Date().toISOString() });
      if (error) console.warn('simulacro', error.message);
    }
  }
}
