// Sección Ciencia de Datos: actividades lúdicas del currículo (Pac-Lógica, Batalla Naval Cuneiforme y Tablero de preguntas).
// Pensada para alumnos que necesitan instrucciones muy claras: pasos numerados que dicen dónde dar clic.
import { sb, esc, $, $$, toast } from './ui.js';
import { shuffle } from './gens.js';
import { logEvent } from './live.js';

const J = 'juegos/';
const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
const steps = (l) => `<ol class="pasos">${l.map((s) => `<li>${rich(s)}</li>`).join('')}</ol>`;
const out = (h) => `href="${h}" target="_blank" rel="noopener"`;

const ACTS = [
  { ic: '👾', t: 'Pac-Lógica', u: 'Tema 1.1 · Lógica', goal: 'Darle órdenes a Pac-Man, una por una, para que llegue hasta el fantasma.',
    main: [J + 'paclogica.html', '▶️ Abrir Pac-Lógica'],
    steps: [
      'Da clic en el botón morado **▶️ Abrir Pac-Lógica**. Se abre en otra pestaña.',
      'Vas a ver a **Pac-Man** 🟡 y al **fantasma** 👻. Pac-Man solo camina **hacia donde mira** (al principio mira a la derecha →).',
      'A la derecha de la pantalla da clic en la cajita **«+ Agregar bloque…»** y elige **Avanzar**. Hazlo **3 veces** (3 bloques «Avanzar»).',
      'En la misma cajita elige **Girar a la derecha**. Ahora Pac-Man mira hacia abajo ↓.',
      'Agrega **otros 3 «Avanzar»**.',
      'Abajo del tablero da clic en el botón verde **▶ Ejecutar** y mira cómo se mueve Pac-Man.',
      'Si aparece **«¡Pac-Man alcanzó al fantasma!»** ¡lo lograste! 🎉 Si chocó, quita el bloque que está mal con su **✕** o da clic en **«Vaciar algoritmo»** para empezar otra vez.',
    ],
    img: [J + 'docs/paclogica-ejemplo.png', 'Así debe quedar tu algoritmo'],
    extra: '**¿Quieres más?** Abajo del tablero, en **«Escenario»**, elige **«Ronda 1 · Equipo 1»** y resuélvelo tú solo. Cuenta los cuadros antes de poner los bloques.',
    teacher: [[J + 'docs/paclogica-guia.pdf', '📄 Guía del reto (docente)']] },
  { ic: '🚢', t: 'Batalla Naval Cuneiforme', u: 'Tema 1.2 · Sistemas numéricos', goal: 'Hundir los barcos de la computadora escribiendo números como los antiguos babilonios.',
    main: ['#/datos/naval', '▶️ Jugar Batalla Naval'],
    steps: [
      'Da clic en el botón morado **▶️ Jugar Batalla Naval**.',
      'Aprende los 2 símbolos: la **cuña** ◀ vale **10** y el **clavo** ▼ vale **1**.',
      'Dentro del juego verás las instrucciones otra vez. ¡No te preocupes, hay un botón de **💡 Ayuda**!',
    ],
    teacher: [[J + 'docs/naval-tablero.pdf', '🖨️ Tablero para imprimir'], [J + 'docs/cuneiforme-ejercicios.pdf', '📝 Ejercicios de conversión']] },
  { ic: '🃏', t: 'Tablero de preguntas', u: 'Repaso · operaciones y fracciones', goal: 'Contestar preguntas en equipo para ganar puntos (pesos, dólares y euros).',
    main: [J + 'tablero.html?banco=basico', '▶️ Abrir tablero (fácil)'],
    steps: [
      'Da clic en el botón morado **▶️ Abrir tablero (fácil)**.',
      'Elige una **tarjeta** y dale clic. Las de **100** son las más fáciles; las de **1000** valen más pero son más difíciles.',
      'Lee la pregunta. Escribe tu respuesta en el cuadro **«Escribe aquí tu respuesta»**.',
      'Da clic en **Enviar**. Si sale en verde, ¡ganaste esos puntos! Si sale en rojo, piensa otra vez y da clic en **Intentar de nuevo**.',
    ],
    teacher: [[J + 'tablero.html?banco=pear-repaso', '▶️ Repaso unidad 1 (difícil)'], [J + 'tablero.html?banco=fracciones-2', '▶️ Fracciones (taller)'], [J + 'tablero.html', '✏️ Mi tablero (editar)'], [J + 'calculadora.html', '💱 Registro de la subasta'], [J + 'docs/tablero-guia.pdf', '📄 Guía (docente)']] },
];

export async function datosView(el, { profile, param }) {
  if (param[0] === 'naval') return naval(el, profile);
  const teacher = profile.role === 'teacher';
  const { data: me } = teacher ? { data: null } : await sb.from('module_progress').select('pct,done').eq('student_id', profile.id).eq('module', 'cd-naval').maybeSingle();
  el.innerHTML = `<div class="head"><h1>📊 Ciencia de Datos</h1></div>
    <div class="msg info">Aquí hay <b>3 juegos</b> para practicar matemáticas. Elige uno y <b>sigue los pasos en orden</b>, uno por uno. 🙂</div>
    ${teacher ? '' : `<div class="stats"><div class="stat"><b>${me?.done?.games || 0}</b><span>Partidas de Batalla Naval</span></div><div class="stat"><b>${me?.pct != null ? me.pct + ' %' : '—'}</b><span>Tu mejor puntería</span></div></div>`}
    ${ACTS.map((a, i) => `<div class="card act"><div class="head" style="margin:0 0 6px"><span style="font-size:2rem">${a.ic}</span><h2 style="margin:0;flex:1">${i + 1}. ${esc(a.t)}</h2><span class="badge brand">${esc(a.u)}</span></div>
      <p class="goal">🎯 <b>¿Qué vas a hacer?</b> ${esc(a.goal)}</p>
      <h3 class="small" style="margin:12px 0 4px">👣 Pasos</h3>${steps(a.steps)}
      ${a.img ? `<figure class="shot"><img src="${a.img[0]}" alt="${esc(a.img[1])}" loading="lazy"><figcaption>👆 ${esc(a.img[1])}</figcaption></figure>` : ''}
      ${a.extra ? `<p class="small">${rich(a.extra)}</p>` : ''}
      <a class="btn big" ${a.main[0].startsWith('#') ? `href="${a.main[0]}"` : out(a.main[0])}>${a.main[1]}</a>
      ${teacher ? `<div class="chips" style="margin-top:10px">${a.teacher.map(([h, l]) => `<a class="btn ghost sm" ${out(h)}>${l}</a>`).join('')}</div>` : ''}</div>`).join('')}
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
  box.innerHTML = `<h2>📈 Batalla Naval del grupo</h2>${rows.length ? `<p class="muted small">${rows.length} de ${(st || []).length} alumnos han jugado. Puntería = conversiones correctas (mejor partida).</p><div class="tablewrap"><table><thead><tr><th>Alumno</th><th class="center">Partidas</th><th class="center">Ganadas</th><th class="center">Puntería</th></tr></thead>
    <tbody>${rows.map((s) => { const r = by[s.id]; return `<tr><td>${esc(name(s))}</td><td class="center">${r.done?.games || 0}</td><td class="center">${r.done?.wins || 0}</td><td class="center"><span class="badge ${r.pct >= 80 ? 'ok' : r.pct >= 60 ? 'info' : 'warn'}">${r.pct} %</span></td></tr>`; }).join('')}</tbody></table></div>` : '<div class="empty">Aún nadie ha jugado.</div>'}`;
}

// ---------- numeración cuneiforme ----------
const CLAVO = '<svg viewBox="0 0 14 26" class="cu cl"><path d="M1 1H13L7 10Z"/><rect x="6" y="8" width="2" height="17"/></svg>';
const CUNA = '<svg viewBox="0 0 22 18" class="cu cn"><path d="M1 9L12 1V17Z"/><rect x="11" y="8" width="10" height="2"/></svg>';
const digit = (n) => n ? `<span class="cdg">${CUNA.repeat(Math.floor(n / 10))}<span class="cls">${CLAVO.repeat(n % 10)}</span></span>` : '<span class="cdg empty"></span>';
const cune = (n) => `<span class="cun">${n >= 60 ? digit(Math.floor(n / 60)) + '<span class="csp"></span>' : ''}${digit(n % 60)}</span>`;
const pl = (n, s, p) => `${n} ${n === 1 ? s : p}`;

// ---------- Batalla Naval Cuneiforme ----------
// Fácil: números del 1 al 59 (una sola posición), tablero 6×6 y 3 barcos. Difícil: 1 al 199, 8×8 y 5 barcos.
const LEVELS = { facil: { n: 6, max: 59, fleet: [3, 2, 2] }, dificil: { n: 8, max: 199, fleet: [4, 3, 3, 2, 2] } };
function placeFleet(N, fleet) {
  const occ = new Set(), ships = [];
  for (const len of fleet) {
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
  let level = 'facil', L, nums, mine, theirs, myShots, cpuShots, conv, aim, sel, over, cpuQueue, pendingCpu;
  const hitIn = (ships, i) => ships.some((s) => s.includes(i));
  const sunk = (ships, shots) => ships.filter((s) => s.every((x) => shots.has(x))).length;

  function newGame() {
    L = LEVELS[level];
    nums = shuffle(Array.from({ length: L.max }, (_, i) => i + 1)).slice(0, L.n * L.n);
    mine = placeFleet(L.n, L.fleet); theirs = placeFleet(L.n, L.fleet); myShots = new Set(); cpuShots = new Set(); conv = { ok: 0, tot: 0 }; aim = [0, 0, 0]; sel = null; over = false; cpuQueue = []; pendingCpu = null;
    $$('[data-lv]', el).forEach((b) => b.classList.toggle('on', b.dataset.lv === level));
    draw(); $('#act', el).innerHTML = '';
    say('👉 <b>Paso 1:</b> da clic en <b>un número</b> del tablero <b>«Barcos de la computadora»</b>.');
  }
  const say = (h, k = 'info') => { const m = $('#nmsg', el); m.className = 'msg ' + k; m.innerHTML = h; };

  el.innerHTML = `<p><a href="#/datos">← Regresar a Ciencia de Datos</a></p><div class="head"><h1>🚢 Batalla Naval Cuneiforme</h1></div>
    <details class="card" open><summary><b>📖 ¿Cómo se juega?</b> (da clic aquí para ocultar o ver)</summary>
      <p>Los babilonios escribían los números con <b>2 símbolos</b>:</p>
      <div class="leyenda"><div>${CUNA} <b>Cuña = 10</b></div><div>${CLAVO} <b>Clavo = 1</b></div></div>
      <p class="small">Ejemplo: el <b>23</b> son <b>2 cuñas</b> (10 + 10) y <b>3 clavos</b> (1 + 1 + 1) → ${cune(23)}</p>
      ${steps([
        '**Tú disparas:** da clic en un número del tablero **«Barcos de la computadora»**.',
        'Separa el número en **decenas** y **unidades**. Ejemplo: 34 = **3 decenas** y **4 unidades**.',
        'Da clic en **+ Cuña** una vez por cada decena, y en **+ Clavo** una vez por cada unidad.',
        'Da clic en el botón **🔥 Disparar**. Si le diste a un barco sale **💥 ¡Tocado!**; si no, **🌊 ¡Agua!**',
        '**La computadora te dispara:** te enseña unos símbolos. Cuenta: cada cuña vale 10 y cada clavo vale 1. Escribe el número y da clic en **Comprobar**.',
        'Gana quien hunda **todos** los barcos del otro. Si te atoras, da clic en **💡 Ayuda**.',
      ])}
    </details>
    <div class="chips" style="margin-bottom:12px"><span class="small"><b>Nivel:</b></span><button class="btn ghost sm" data-lv="facil">🙂 Fácil (1 al 59)</button><button class="btn ghost sm" data-lv="dificil">💪 Difícil (1 al 199)</button><span style="flex:1"></span><button class="btn ghost sm" id="nw">🔁 Empezar de nuevo</button></div>
    <div id="nmsg" class="msg info"></div>
    <div class="card" id="act"></div>
    <div class="nvl"><div class="card"><h3>🎯 Barcos de la computadora <span class="muted small">(aquí disparas)</span></h3><div class="nb" id="bt"></div><p class="muted small" id="st"></p></div>
    <div class="card"><h3>⚓ Mis barcos <span class="muted small">(los azules son tuyos)</span></h3><div class="nb" id="bm"></div><p class="muted small" id="sm"></p></div></div>`;
  const ask = () => over || !myShots.size || confirm('¿Empezar otra partida? Se pierde la que llevas.');
  $('#nw', el).onclick = () => { if (ask()) newGame(); };
  $$('[data-lv]', el).forEach((b) => b.onclick = () => { if (b.dataset.lv !== level && ask()) { level = b.dataset.lv; newGame(); } });

  function draw() {
    const cols = `grid-template-columns:repeat(${L.n},1fr)`;
    $('#bt', el).style.cssText = cols; $('#bm', el).style.cssText = cols;
    $('#bt', el).innerHTML = nums.map((n, i) => `<button class="nc ${myShots.has(i) ? (hitIn(theirs, i) ? 'hit' : 'miss') : ''} ${sel === i ? 'sel' : ''}" data-i="${i}" ${myShots.has(i) || over || pendingCpu != null ? 'disabled' : ''}>${myShots.has(i) ? (hitIn(theirs, i) ? '💥' : '🌊') : n}</button>`).join('');
    $('#bm', el).innerHTML = nums.map((n, i) => `<span class="nc ${hitIn(mine, i) ? 'ship' : ''} ${cpuShots.has(i) ? (hitIn(mine, i) ? 'hit' : 'miss') : ''}">${n}</span>`).join('');
    $('#st', el).textContent = `Barcos que hundiste: ${sunk(theirs, myShots)} de ${L.fleet.length} · Respuestas correctas: ${conv.ok} de ${conv.tot}`;
    $('#sm', el).textContent = `Barcos que te hundieron: ${sunk(mine, cpuShots)} de ${L.fleet.length}`;
    $$('#bt .nc', el).forEach((b) => b.onclick = () => { sel = +b.dataset.i; aim = [0, 0, 0]; draw(); builder(); $('#act', el).scrollIntoView({ behavior: 'smooth', block: 'center' }); });
  }

  // turno del alumno: escribir en cuneiforme el número de la casilla elegida
  function builder() {
    const box = $('#act', el); const n = nums[sel]; const big = n >= 60;
    const val = () => aim[0] * 60 + aim[1] * 10 + aim[2];
    const right = n % 60;
    const hint = big ? `${n} = 60 × ${Math.floor(n / 60)} + ${right}. A la izquierda pon <b>${pl(Math.floor(n / 60), 'clavo', 'clavos')}</b>. A la derecha, ${right} = <b>${pl(Math.floor(right / 10), 'decena', 'decenas')}</b> y <b>${pl(right % 10, 'unidad', 'unidades')}</b>: <b>${pl(Math.floor(right / 10), 'cuña', 'cuñas')}</b> y <b>${pl(right % 10, 'clavo', 'clavos')}</b>.`
      : `${n} = <b>${pl(Math.floor(n / 10), 'decena', 'decenas')}</b> y <b>${pl(n % 10, 'unidad', 'unidades')}</b> → pon <b>${pl(Math.floor(n / 10), 'cuña', 'cuñas')}</b> y <b>${pl(n % 10, 'clavo', 'clavos')}</b>.`;
    const ctl = (k, lbl, max) => `<div class="ctl"><button class="btn sm" data-k="${k}" data-d="1" ${aim[k] >= max ? 'disabled' : ''}>+ ${lbl}</button><button class="btn ghost sm" data-k="${k}" data-d="-1" ${aim[k] ? '' : 'disabled'}>− Quitar</button><span class="muted small">Llevas <b>${aim[k]}</b></span></div>`;
    box.innerHTML = `<h3>✍️ <b>Paso 2:</b> escribe el <span class="bignum">${n}</span> con cuñas y clavos</h3>
      ${big ? `<p class="small">Como el ${n} es más grande que 59, usa <b>dos lugares</b>: el de la <b>izquierda</b> vale ×60.</p><p class="muted small">Lugar de la izquierda (×60)</p>${ctl(0, 'Clavo ▼', 3)}<p class="muted small">Lugar de la derecha</p>` : ''}
      ${ctl(1, 'Cuña ◀ (10)', 5)}${ctl(2, 'Clavo ▼ (1)', 9)}
      <div class="cprev big">${aim.some(Boolean) ? cune(val()) : '<span class="muted small">Aquí aparecen tus símbolos</span>'}</div>
      <p class="small center">Lo que llevas vale: <b>${big ? `${aim[0]} × 60 + ` : ''}${aim[1] * 10} + ${aim[2]} = ${val()}</b></p>
      <div class="chips"><button class="btn big" id="fire">🔥 Disparar</button><button class="btn ghost" id="hl">💡 Ayuda</button></div><div class="msg info" id="hint" hidden>${hint}</div>`;
    $$('[data-k]', box).forEach((b) => b.onclick = () => { const k = +b.dataset.k; aim[k] = Math.max(0, aim[k] + +b.dataset.d); const h = $('#hint', box).hidden; builder(); $('#hint', box).hidden = h; });
    $('#hl', box).onclick = () => { $('#hint', box).hidden = false; };
    $('#fire', box).onclick = () => {
      conv.tot++;
      if (val() !== n) { $('#hint', box).hidden = false; say(`❌ Casi. Lo que pusiste vale <b>${val()}</b> y necesitas <b>${n}</b>. Lee la 💡 ayuda, corrige y vuelve a dar clic en <b>🔥 Disparar</b>.`, 'err'); return; }
      conv.ok++; myShots.add(sel); const hit = hitIn(theirs, sel); sel = null; box.innerHTML = '';
      if (sunk(theirs, myShots) === L.fleet.length) return end(true);
      say(hit ? '💥 <b>¡Tocado!</b> Le diste a un barco. Ahora le toca a la computadora…' : '🌊 <b>¡Agua!</b> No había barco. Ahora le toca a la computadora…', hit ? 'ok' : 'info');
      setTimeout(cpuTurn, 900);
    };
  }

  // turno de la computadora: el alumno descifra el número cuneiforme
  function cpuTurn() {
    cpuQueue = cpuQueue.filter((i) => !cpuShots.has(i));
    let i = cpuQueue.shift();
    if (i == null) { const free = nums.map((_, k) => k).filter((k) => !cpuShots.has(k)); i = free[Math.floor(Math.random() * free.length)]; }
    pendingCpu = i; draw();
    const n = nums[i], box = $('#act', el), right = n % 60;
    const hint = n >= 60 ? `A la izquierda hay ${pl(Math.floor(n / 60), 'clavo', 'clavos')} → ${Math.floor(n / 60)} × 60 = ${Math.floor(n / 60) * 60}. A la derecha hay ${pl(Math.floor(right / 10), 'cuña', 'cuñas')} (${Math.floor(right / 10) * 10}) y ${pl(right % 10, 'clavo', 'clavos')} (${right % 10}). Súmalos.`
      : `Hay ${pl(Math.floor(n / 10), 'cuña', 'cuñas')} → ${Math.floor(n / 10) * 10}, y ${pl(n % 10, 'clavo', 'clavos')} → ${n % 10}. Súmalos: ${Math.floor(n / 10) * 10} + ${n % 10} = ?`;
    say('🛡️ <b>Te toca defenderte.</b> La computadora te disparó. Descifra el número.', 'info');
    box.innerHTML = `<h3>📜 <b>Paso 3:</b> ¿Qué número es este?</h3><div class="cprev big">${cune(n)}</div>
      <p class="small">Cuenta: cada <b>cuña ◀ vale 10</b> y cada <b>clavo ▼ vale 1</b>. Escribe el número en el cuadro y da clic en <b>Comprobar</b>.</p>
      <div class="row" style="max-width:360px"><input id="dec" type="number" inputmode="numeric" placeholder="Escribe el número aquí"><button class="btn" id="dok">✔️ Comprobar</button></div>
      <div class="chips" style="margin-top:8px"><button class="btn ghost" id="hl">💡 Ayuda</button></div><div class="msg info" id="hint" hidden>${hint}</div>`;
    const inp = $('#dec', box); inp.focus({ preventScroll: true });
    $('#hl', box).onclick = () => { $('#hint', box).hidden = false; };
    const go = () => {
      if (inp.value === '') { say('✏️ Primero escribe un número en el cuadro.', 'err'); return; }
      conv.tot++;
      const ok = +inp.value === n; if (ok) conv.ok++;
      cpuShots.add(i); pendingCpu = null; const hit = hitIn(mine, i);
      if (hit) { const N = L.n, r = Math.floor(i / N), c = i % N; [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].forEach(([y, x]) => { if (y >= 0 && y < N && x >= 0 && x < N) cpuQueue.push(y * N + x); }); }
      box.innerHTML = '';
      if (sunk(mine, cpuShots) === L.fleet.length) return end(false);
      say(`${ok ? '✅ <b>¡Muy bien!</b> Era el ' + n + '.' : `❌ Era el <b>${n}</b>. ${hint.replace('= ?', '= ' + n)}`} ${hit ? '💥 Le dieron a uno de tus barcos.' : '🌊 Cayó al agua.'}<br>👉 <b>Tu turno:</b> da clic en otro número de <b>«Barcos de la computadora»</b>.`, ok ? 'ok' : 'err');
      draw();
    };
    $('#dok', box).onclick = go; inp.onkeydown = (e) => { if (e.key === 'Enter') go(); };
  }

  async function end(won) {
    over = true; draw(); const pct = conv.tot ? Math.round(conv.ok / conv.tot * 100) : 0;
    $('#act', el).innerHTML = `<h2>${won ? '🏆 ¡Ganaste!' : '😵 Esta vez ganó la computadora'}</h2><p>Respuestas correctas: <b>${conv.ok} de ${conv.tot} (${pct} %)</b>.</p>${level === 'facil' && won ? '<p class="small">¿Te animas al nivel <b>💪 Difícil</b>? Dale clic arriba.</p>' : ''}<button class="btn big" id="again">🔁 Jugar otra vez</button>`;
    $('#again', el).onclick = newGame;
    say(won ? '🎉 ¡Hundiste todos los barcos de la computadora!' : '¡No pasa nada! Practica otra vez y verás que mejoras. 💪', won ? 'ok' : 'err');
    if (!student) return;
    logEvent('attempt', 'cd-naval', null, { title: 'Batalla Naval Cuneiforme', ok: conv.ok, tot: conv.tot, pass: won, level });
    const { data: old } = await sb.from('module_progress').select('pct,done').eq('student_id', profile.id).eq('module', 'cd-naval').maybeSingle();
    const d = old?.done || {}; const tries = [...(d.tries || []), { at: Date.now(), ok: conv.ok, tot: conv.tot, won, level }].slice(-30);
    const { error } = await sb.from('module_progress').upsert({ student_id: profile.id, module: 'cd-naval', done: { games: (d.games || 0) + 1, wins: (d.wins || 0) + (won ? 1 : 0), tries }, last: 0, pct: Math.max(pct, old?.pct || 0), updated_at: new Date().toISOString() });
    if (error) { console.warn('naval', error.message); toast('No se pudo guardar el resultado', 'err'); }
  }

  newGame();
}
