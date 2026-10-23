// Sección Ciencia de Datos: actividades lúdicas del currículo (Pac-Lógica, Batalla Naval Cuneiforme y Tablero de preguntas).
import { sb, esc, $, $$, toast } from './ui.js';
import { shuffle } from './gens.js';
import { logEvent } from './live.js';

const J = 'juegos/';
const ACTS = [
  { ic: '👾', t: 'Pac-Lógica', u: '1.1 Lógica matemática', d: 'Programa a Pac-Man con bloques (avanzar, girar, si…entonces, repetir, mientras) y condiciones con ¬ ∧ ∨ ↔ para llegar al fantasma. 12 escenarios en 2 rondas y un diseñador de retos.',
    links: [[J + 'paclogica.html', '▶️ Abrir simulador'], [J + 'docs/paclogica-guia.pdf', '📄 Guía del reto', 1]] },
  { ic: '🚢', t: 'Batalla Naval Cuneiforme', u: '1.2 Conteo y sistemas numéricos', d: 'Para disparar escribe el número de la casilla en cuneiforme babilónico (clavo = 1, cuña = 10, base 60). Cuando te disparan, descifra el número.',
    links: [['#/datos/naval', '▶️ Jugar en línea'], [J + 'docs/naval-tablero.pdf', '🖨️ Tablero para imprimir', 1], [J + 'docs/cuneiforme-ejercicios.pdf', '📝 Ejercicios de conversión', 1]] },
  { ic: '🃏', t: 'Tablero de preguntas', u: '1.4 Fracciones y porcentajes (y repaso)', d: 'Juego por equipos para el proyector: cada tarjeta (100 a 1000 en pesos, dólares y euros) esconde una pregunta. Con los puntos se hace después una subasta.',
    links: [[J + 'tablero.html?banco=pear-repaso', '▶️ Repaso de la unidad 1'], [J + 'tablero.html?banco=fracciones-2', '▶️ Fracciones y proporciones'], [J + 'tablero.html', '✏️ Mi tablero'], [J + 'calculadora.html', '💱 Registro de la subasta'], [J + 'docs/tablero-guia.pdf', '📄 Guía', 1]] },
];

export async function datosView(el, { profile, param }) {
  if (param[0] === 'naval') return naval(el, profile);
  const teacher = profile.role === 'teacher';
  const { data: me } = teacher ? { data: null } : await sb.from('module_progress').select('pct,done').eq('student_id', profile.id).eq('module', 'cd-naval').maybeSingle();
  const ext = (h, x) => x ? `href="${h}" target="_blank" rel="noopener"` : h.startsWith('#') ? `href="${h}"` : `href="${h}" target="_blank" rel="noopener"`;
  el.innerHTML = `<div class="head"><h1>📊 Ciencia de Datos</h1></div>
    <div class="msg info">Actividades lúdicas para practicar los temas de la unidad 1 jugando, en equipo o por tu cuenta.</div>
    ${teacher ? '' : `<div class="stats"><div class="stat"><b>${me?.done?.games || 0}</b><span>Partidas de Batalla Naval</span></div><div class="stat"><b>${me?.pct != null ? me.pct + ' %' : '—'}</b><span>Mejor precisión al convertir</span></div></div>`}
    ${ACTS.map((a) => `<div class="card"><div class="head" style="margin:0 0 6px"><span style="font-size:1.8rem">${a.ic}</span><h2 style="margin:0;flex:1">${esc(a.t)}</h2><span class="badge brand">${esc(a.u)}</span></div>
      <p class="small" style="margin:0 0 10px">${esc(a.d)}</p><div class="chips">${a.links.map(([h, l, pdf], i) => `<a class="btn ${i ? 'ghost sm' : 'sm'}" ${ext(h, pdf)}>${l}</a>`).join('')}</div></div>`).join('')}
    ${teacher ? `<div class="card"><h2>📸 Evidencias para la convocatoria</h2><ul class="small" style="margin:0;padding-left:20px;line-height:1.7">
      <li>Fotos con <b>2 o más alumnos con uniforme</b> participando, <b>sin mirar a la cámara</b>, nítidas.</li>
      <li>Que se vea <b>qué actividad es</b>: el simulador o el tablero en el proyector, el tablero de papel, etc.</li>
      <li>Video de <b>1:30 máx.</b>: nombre, plantel, materia, módulo usado y reflexión (resultados, retos, beneficios).</li>
      <li>Entrega: <b>11 de diciembre de 2026</b> en tu carpeta digital.</li></ul></div>
      <div class="card" id="grp"><h2>📈 Batalla Naval del grupo</h2><div class="boot" style="height:80px"><div class="spinner"></div></div></div>` : ''}`;
  if (teacher) groupNaval($('#grp', el));
}

async function groupNaval(box) {
  const [{ data: st }, { data: pr }] = await Promise.all([
    sb.from('profiles').select('id,full_name,apellido_p,apellido_m,nombres').eq('role', 'student').eq('active', true),
    sb.from('module_progress').select('student_id,pct,done').eq('module', 'cd-naval'),
  ]);
  const by = Object.fromEntries((pr || []).map((r) => [r.student_id, r]));
  const name = (s) => [s.apellido_p, s.apellido_m, s.nombres].filter(Boolean).join(' ') || s.full_name;
  const rows = (st || []).filter((s) => by[s.id]).sort((a, b) => name(a).localeCompare(name(b), 'es'));
  box.innerHTML = `<h2>📈 Batalla Naval del grupo</h2>${rows.length ? `<p class="muted small">${rows.length} de ${(st || []).length} alumnos han jugado. Precisión = conversiones correctas (mejor partida).</p><div class="tablewrap"><table><thead><tr><th>Alumno</th><th class="center">Partidas</th><th class="center">Ganadas</th><th class="center">Precisión</th></tr></thead>
    <tbody>${rows.map((s) => { const r = by[s.id]; return `<tr><td>${esc(name(s))}</td><td class="center">${r.done?.games || 0}</td><td class="center">${r.done?.wins || 0}</td><td class="center"><span class="badge ${r.pct >= 80 ? 'ok' : r.pct >= 60 ? 'info' : 'warn'}">${r.pct} %</span></td></tr>`; }).join('')}</tbody></table></div>` : '<div class="empty">Aún nadie ha jugado.</div>'}`;
}

// ---------- numeración cuneiforme ----------
const CLAVO = '<svg viewBox="0 0 14 26" class="cu cl"><path d="M1 1H13L7 10Z"/><rect x="6" y="8" width="2" height="17"/></svg>';
const CUNA = '<svg viewBox="0 0 22 18" class="cu cn"><path d="M1 9L12 1V17Z"/><rect x="11" y="8" width="10" height="2"/></svg>';
const digit = (n) => n ? `<span class="cdg">${CUNA.repeat(Math.floor(n / 10))}<span class="cls">${CLAVO.repeat(n % 10)}</span></span>` : '<span class="cdg empty"></span>';
const cune = (n) => `<span class="cun">${n >= 60 ? digit(Math.floor(n / 60)) + '<span class="csp"></span>' : ''}${digit(n % 60)}</span>`;

// ---------- Batalla Naval Cuneiforme ----------
const N = 8, FLEET = [4, 3, 3, 2, 2];
function placeFleet() {
  const occ = new Set(), ships = [];
  for (const len of FLEET) {
    for (;;) {
      const h = Math.random() < 0.5, r = Math.floor(Math.random() * (h ? N : N - len + 1)), c = Math.floor(Math.random() * (h ? N - len + 1 : N));
      const cells = Array.from({ length: len }, (_, k) => (h ? r * N + c + k : (r + k) * N + c));
      if (cells.some((x) => occ.has(x))) continue;
      cells.forEach((x) => occ.add(x)); ships.push(cells); break;
    }
  }
  return ships;
}

async function naval(el, profile) {
  const student = profile.role === 'student';
  let nums, mine, theirs, myShots, cpuShots, conv, aim, sel, over, cpuQueue, pendingCpu;
  const hitIn = (ships, i) => ships.some((s) => s.includes(i));
  const sunk = (ships, shots) => ships.filter((s) => s.every((x) => shots.has(x))).length;

  function newGame() {
    nums = shuffle(Array.from({ length: 199 }, (_, i) => i + 1)).slice(0, N * N);
    mine = placeFleet(); theirs = placeFleet(); myShots = new Set(); cpuShots = new Set(); conv = { ok: 0, tot: 0 }; aim = [0, 0, 0, 0]; sel = null; over = false; cpuQueue = []; pendingCpu = null;
    draw(); say('Elige una casilla en <b>MIS DISPAROS</b> y escribe su número en cuneiforme para disparar.');
  }
  const say = (h, k = 'info') => { const m = $('#nmsg', el); m.className = 'msg ' + k; m.innerHTML = h; };

  el.innerHTML = `<p><a href="#/datos">← Ciencia de Datos</a></p><div class="head"><h1>🚢 Batalla Naval Cuneiforme</h1><button class="btn ghost sm" id="nw">🔁 Nueva partida</button></div>
    <div class="card small" style="line-height:1.6"><b>Recordatorio:</b> ${CLAVO} clavo = 1 · ${CUNA} cuña = 10 · Si el número es 60 o más se usan <b>dos posiciones</b>: la de la izquierda vale <b>×60</b>. Ejemplo: 85 = 1 × 60 + 25 → ${cune(85)}</div>
    <div id="nmsg" class="msg info"></div>
    <div class="nvl"><div class="card"><h3>🎯 Mis disparos</h3><div class="nb" id="bt"></div><p class="muted small" id="st"></p></div>
    <div class="card"><h3>⚓ Mi flota</h3><div class="nb" id="bm"></div><p class="muted small" id="sm"></p></div></div>
    <div class="card" id="act"></div>`;
  $('#nw', el).onclick = () => { if (over || !myShots.size || confirm('¿Empezar otra partida? Se pierde la actual.')) newGame(); };

  function draw() {
    $('#bt', el).innerHTML = nums.map((n, i) => `<button class="nc ${myShots.has(i) ? (hitIn(theirs, i) ? 'hit' : 'miss') : ''} ${sel === i ? 'sel' : ''}" data-i="${i}" ${myShots.has(i) || over || pendingCpu != null ? 'disabled' : ''}>${n}</button>`).join('');
    $('#bm', el).innerHTML = nums.map((n, i) => `<span class="nc ${hitIn(mine, i) ? 'ship' : ''} ${cpuShots.has(i) ? (hitIn(mine, i) ? 'hit' : 'miss') : ''}">${n}</span>`).join('');
    $('#st', el).textContent = `Barcos hundidos: ${sunk(theirs, myShots)} de ${FLEET.length} · Conversiones correctas: ${conv.ok} de ${conv.tot}`;
    $('#sm', el).textContent = `Tus barcos hundidos: ${sunk(mine, cpuShots)} de ${FLEET.length}`;
    $$('#bt .nc', el).forEach((b) => b.onclick = () => { sel = +b.dataset.i; aim = [0, 0, 0, 0]; draw(); builder(); });
  }

  // turno del alumno: escribir en cuneiforme el número de la casilla elegida
  function builder() {
    const box = $('#act', el); const n = nums[sel];
    const val = () => (aim[0] * 10 + aim[1]) * 60 + aim[2] * 10 + aim[3];
    const ctl = (k, lbl, max) => `<div class="ctl"><span>${lbl}</span><button class="btn ghost sm" data-k="${k}" data-d="-1">−</button><b>${aim[k]}</b><button class="btn ghost sm" data-k="${k}" data-d="1" ${aim[k] >= max ? 'disabled' : ''}>+</button></div>`;
    box.innerHTML = `<h3>✍️ Escribe <b>${n}</b> en cuneiforme</h3>
      <div class="cbuild"><div><p class="muted small">Posición izquierda (×60)</p>${ctl(1, 'Clavos', 3)}</div><div><p class="muted small">Posición derecha (×1)</p>${ctl(2, 'Cuñas', 5)}${ctl(3, 'Clavos', 9)}</div></div>
      <div class="cprev">${aim.some(Boolean) ? cune(val()) : '<span class="muted small">Usa los botones + para formar el número</span>'}</div>
      <button class="btn" id="fire">🔥 Disparar</button>`;
    $$('[data-k]', box).forEach((b) => b.onclick = () => { const k = +b.dataset.k; aim[k] = Math.max(0, aim[k] + +b.dataset.d); builder(); });
    $('#fire', box).onclick = () => {
      conv.tot++;
      if (val() !== n) { say(`❌ Eso que escribiste vale <b>${val()}</b>, no ${n}. ${n >= 60 ? `Pista: ${n} = ${Math.floor(n / 60)} × 60 + ${n % 60}.` : `Pista: ${n} = ${Math.floor(n / 10)} cuñas y ${n % 10} clavos.`} Corrige y vuelve a disparar.`, 'err'); draw(); return; }
      conv.ok++; myShots.add(sel); const hit = hitIn(theirs, sel); sel = null; box.innerHTML = '';
      if (sunk(theirs, myShots) === FLEET.length) return end(true);
      say(hit ? '💥 ¡Tocado! Ahora dispara la computadora…' : '🌊 ¡Agua! Ahora dispara la computadora…', hit ? 'ok' : 'info');
      cpuTurn();
    };
  }

  // turno de la computadora: el alumno descifra el número cuneiforme
  function cpuTurn() {
    cpuQueue = cpuQueue.filter((i) => !cpuShots.has(i));
    let i = cpuQueue.shift();
    if (i == null) { const free = nums.map((_, k) => k).filter((k) => !cpuShots.has(k)); i = free[Math.floor(Math.random() * free.length)]; }
    pendingCpu = i; draw();
    const box = $('#act', el);
    box.innerHTML = `<h3>📜 La computadora te dispara a:</h3><div class="cprev big">${cune(nums[i])}</div>
      <p class="small">¿Qué número es? Búscalo en <b>MI FLOTA</b>.</p><div class="row" style="max-width:320px"><input id="dec" type="number" inputmode="numeric" placeholder="Número decimal"><button class="btn" id="dok">Descifrar</button></div>`;
    const inp = $('#dec', box); inp.focus();
    const go = () => {
      if (inp.value === '') return; conv.tot++;
      const ok = +inp.value === nums[i]; if (ok) conv.ok++;
      cpuShots.add(i); pendingCpu = null; const hit = hitIn(mine, i);
      if (hit) { const r = Math.floor(i / N), c = i % N; [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].forEach(([y, x]) => { if (y >= 0 && y < N && x >= 0 && x < N) cpuQueue.push(y * N + x); }); }
      box.innerHTML = '';
      if (sunk(mine, cpuShots) === FLEET.length) return end(false);
      say(`${ok ? '✅ ¡Bien descifrado!' : `❌ Era el <b>${nums[i]}</b>.`} ${hit ? '💥 Te tocaron un barco.' : '🌊 Cayó al agua.'} Tu turno: elige otra casilla.`, ok ? 'ok' : 'err');
      draw();
    };
    $('#dok', box).onclick = go; inp.onkeydown = (e) => { if (e.key === 'Enter') go(); };
  }

  async function end(won) {
    over = true; draw(); const pct = conv.tot ? Math.round(conv.ok / conv.tot * 100) : 0;
    $('#act', el).innerHTML = `<h2>${won ? '🏆 ¡Ganaste!' : '😵 Te hundieron la flota'}</h2><p>Conversiones correctas: <b>${conv.ok} de ${conv.tot} (${pct} %)</b>.</p><button class="btn" id="again">🔁 Jugar otra vez</button>`;
    $('#again', el).onclick = newGame;
    say(won ? '¡Hundiste toda la flota enemiga!' : 'La computadora hundió todos tus barcos. ¡Inténtalo de nuevo!', won ? 'ok' : 'err');
    if (!student) return;
    logEvent('attempt', 'cd-naval', null, { title: 'Batalla Naval Cuneiforme', ok: conv.ok, tot: conv.tot, pass: won });
    const { data: old } = await sb.from('module_progress').select('pct,done').eq('student_id', profile.id).eq('module', 'cd-naval').maybeSingle();
    const d = old?.done || {}; const tries = [...(d.tries || []), { at: Date.now(), ok: conv.ok, tot: conv.tot, won }].slice(-30);
    const { error } = await sb.from('module_progress').upsert({ student_id: profile.id, module: 'cd-naval', done: { games: (d.games || 0) + 1, wins: (d.wins || 0) + (won ? 1 : 0), tries }, last: 0, pct: Math.max(pct, old?.pct || 0), updated_at: new Date().toISOString() });
    if (error) { console.warn('naval', error.message); toast('No se pudo guardar el resultado', 'err'); }
  }

  newGame();
}
