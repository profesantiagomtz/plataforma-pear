// Herramientas visuales interactivas para los módulos.
import { $, $$ } from './ui.js';
import { steps as exprSteps, fmtN } from './expr.js';

const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));

// ============ ÁBACO ============
export function mountAbaco(el, { rods = 4, onChange } = {}) {
  const names = ['Unidades', 'Decenas', 'Centenas', 'Millares', 'D. millar'].slice(0, rods).reverse();
  const count = Array(rods).fill(0); // índice 0 = izquierda (mayor posición)
  const W = 70 * rods + 40, H = 250;
  const draw = () => {
    let s = `<svg viewBox="0 0 ${W} ${H}" class="abaco" role="img" aria-label="Ábaco interactivo"><rect x="6" y="6" width="${W - 12}" height="${H - 46}" rx="12" class="ab-frame"/>`;
    for (let r = 0; r < rods; r++) {
      const x = 20 + 35 + r * 70 - 10 + 10;
      s += `<line x1="${x}" y1="14" x2="${x}" y2="${H - 50}" class="ab-rod"/>`;
      for (let k = 0; k < 9; k++) {
        const on = k < count[r]; const y = 28 + k * 19 + (on ? 0 : 14);
        s += `<ellipse cx="${x}" cy="${y}" rx="22" ry="8.5" class="ab-bead ${on ? 'on' : ''}" data-r="${r}" data-k="${k}"/>`;
      }
      s += `<text x="${x}" y="${H - 24}" class="ab-lab" text-anchor="middle">${names[r]}</text><text x="${x}" y="${H - 6}" class="ab-num" text-anchor="middle">${count[r]}</text>`;
    }
    el.querySelector('.abwrap').innerHTML = s + '</svg>';
    const v = Number(count.join('')); el.querySelector('.abval').textContent = v.toLocaleString('es-MX');
    onChange?.(v);
  };
  el.innerHTML = '<div class="abwrap"></div><div class="abbar"><span>Número representado: <b class="abval">0</b></span><button class="btn ghost sm" data-clear>Limpiar</button></div><p class="muted small">Toca una cuenta para subirla o bajarla.</p>';
  el.addEventListener('click', (e) => {
    const b = e.target.closest('.ab-bead'); if (b) { const r = +b.dataset.r, k = +b.dataset.k; count[r] = k < count[r] ? k : k + 1; draw(); }
    if (e.target.closest('[data-clear]')) { count.fill(0); draw(); }
  });
  draw();
  return { get value() { return Number(count.join('')); }, set(v) { String(v).padStart(rods, '0').slice(-rods).split('').forEach((d, i) => { count[i] = +d; }); draw(); } };
}

// ============ FRACCIONES ============
export function mountFrac(el) {
  el.innerHTML = `<div class="vz"><div class="vzrow"><label>Numerador <b data-vn>3</b><input type="range" min="0" max="12" value="3" data-n></label>
    <label>Denominador <b data-vd>4</b><input type="range" min="1" max="12" value="4" data-d></label>
    <label>Amplificar × <b data-vk>1</b><input type="range" min="1" max="6" value="1" data-k></label></div>
    <div class="fbars" data-bars></div><div class="vzout" data-out></div></div>`;
  const upd = () => {
    const n = +$('[data-n]', el).value, d = +$('[data-d]', el).value, k = +$('[data-k]', el).value;
    $('[data-vn]', el).textContent = n; $('[data-vd]', el).textContent = d; $('[data-vk]', el).textContent = k;
    const bar = (nn, dd) => `<div class="fbar">${Array.from({ length: dd }, (_, i) => `<i class="${i < nn ? 'on' : ''}"></i>`).join('')}</div>`;
    const g = gcd(n, d) || 1;
    $('[data-bars]', el).innerHTML = `<div class="fl">${n}/${d}</div>${bar(Math.min(n, d), d)}` + (k > 1 ? `<div class="fl">${n * k}/${d * k}</div>${bar(Math.min(n * k, d * k), d * k)}` : '') + (g > 1 && n ? `<div class="fl">${n / g}/${d / g} (simplificada)</div>${bar(Math.min(n / g, d / g), d / g)}` : '');
    const val = n / d;
    $('[data-out]', el).innerHTML = `<span class="chip">Decimal: <b>${fmtN(val)}</b></span><span class="chip">Porcentaje: <b>${fmtN(val * 100)} %</b></span><span class="chip">${n >= d ? 'Fracción impropia' : 'Fracción propia'}</span>${n >= d && d ? `<span class="chip">Mixta: <b>${Math.floor(n / d)} ${n % d ? `${n % d}/${d}` : ''}</b></span>` : ''}`;
  };
  $$('input', el).forEach((i) => i.addEventListener('input', upd)); upd();
}

// ============ POTENCIAS ============
export function mountPower(el) {
  el.innerHTML = `<div class="vz"><div class="vzrow"><label>Base <b data-vb>2</b><input type="range" min="-5" max="9" value="2" data-b></label>
    <label>Exponente <b data-ve>3</b><input type="range" min="-3" max="6" value="3" data-e></label></div><div class="vzout big" data-out></div><div data-draw></div></div>`;
  const upd = () => {
    const b = +$('[data-b]', el).value, e = +$('[data-e]', el).value;
    $('[data-vb]', el).textContent = b; $('[data-ve]', el).textContent = e;
    const bs = b < 0 ? `(${fmtN(b)})` : String(b); let html, val = b ** e;
    if (b === 0 && e < 0) { $('[data-out]', el).innerHTML = '0 no tiene inverso: no se puede elevar a un exponente negativo.'; $('[data-draw]', el).innerHTML = ''; return; }
    if (e > 1) html = `${bs}<sup>${e}</sup> = ${Array(e).fill(bs).join(' × ')} = <b>${fmtN(val)}</b>`;
    else if (e === 1) html = `${bs}<sup>1</sup> = <b>${bs}</b>`;
    else if (e === 0) html = `${bs}<sup>0</sup> = <b>1</b>`;
    else html = `${bs}<sup>−${-e}</sup> = 1 ÷ ${bs}<sup>${-e}</sup> = 1/${fmtN(b ** -e)} = <b>${fmtN(val)}</b>`;
    $('[data-out]', el).innerHTML = html;
    if (e === 2 && b > 0) $('[data-draw]', el).innerHTML = `<div class="sqgrid" style="grid-template-columns:repeat(${b},1fr);max-width:${Math.min(b * 34, 300)}px">${'<i></i>'.repeat(b * b)}</div><p class="muted small center">${b} × ${b} cuadritos = ${b * b}: por eso se dice «${b} al cuadrado».</p>`;
    else $('[data-draw]', el).innerHTML = '';
  };
  $$('input', el).forEach((i) => i.addEventListener('input', upd)); upd();
}

// ============ CONVERSIÓN DE UNIDADES ============
const UNITS = {
  Longitud: { km: 1000, hm: 100, dam: 10, m: 1, dm: 0.1, cm: 0.01, mm: 0.001, 'milla': 1609.344, 'pie': 0.3048, 'pulgada': 0.0254 },
  Masa: { kg: 1000, hg: 100, dag: 10, g: 1, dg: 0.1, cg: 0.01, mg: 0.001, 'libra': 453.592, 'onza': 28.3495 },
  Capacidad: { kL: 1000, L: 1, dL: 0.1, cL: 0.01, mL: 0.001, 'galón': 3.785411784 },
  Tiempo: { 'día': 86400, h: 3600, min: 60, s: 1, ms: 0.001 },
};
export function mountConv(el) {
  const cats = Object.keys(UNITS);
  el.innerHTML = `<div class="vz"><div class="vzrow"><label>Magnitud<select data-c>${cats.map((c) => `<option>${c}</option>`).join('')}</select></label>
    <label>Cantidad<input type="number" step="any" value="3.5" data-v></label></div><div class="vzrow"><label>De<select data-f></select></label><label>A<select data-t></select></label></div>
    <div class="vzout big" data-out></div><div class="muted small" data-how></div></div>`;
  const fill = () => { const u = Object.keys(UNITS[$('[data-c]', el).value]); $('[data-f]', el).innerHTML = u.map((x) => `<option>${x}</option>`).join(''); $('[data-t]', el).innerHTML = u.map((x) => `<option>${x}</option>`).join(''); $('[data-t]', el).selectedIndex = Math.min(3, u.length - 1); $('[data-f]', el).selectedIndex = Math.min(0, u.length - 1); upd(); };
  const upd = () => {
    const c = UNITS[$('[data-c]', el).value], f = $('[data-f]', el).value, t = $('[data-t]', el).value, v = parseFloat($('[data-v]', el).value);
    if (isNaN(v)) { $('[data-out]', el).textContent = ''; return; }
    const factor = c[f] / c[t], r = v * factor;
    $('[data-out]', el).innerHTML = `${fmtN(v)} ${f} = <b>${fmtN(Math.round(r * 1e6) / 1e6)} ${t}</b>`;
    $('[data-how]', el).innerHTML = `Factor de conversión: 1 ${f} = ${fmtN(Math.round(factor * 1e6) / 1e6)} ${t}. Se calcula ${fmtN(v)} × ${fmtN(Math.round(factor * 1e6) / 1e6)}.`;
  };
  $('[data-c]', el).addEventListener('change', fill); $$('[data-f],[data-t],[data-v]', el).forEach((i) => i.addEventListener('input', upd)); fill();
}

// ============ TABLA DE VERDAD INTERACTIVA ============
export function mountTT(el, spec) {
  const n = spec.vars.length, rows = 1 << n;
  const vals = (i) => spec.vars.map((_, j) => !((i >> (n - 1 - j)) & 1));
  const fns = spec.cols.map((c) => new Function(...spec.vars, `return !!(${c.f});`));
  const expected = Array.from({ length: rows }, (_, i) => fns.map((f) => f(...vals(i))));
  const state = Array.from({ length: rows }, () => spec.cols.map(() => ''));
  el.innerHTML = `<div class="tablewrap"><table class="tt"><thead><tr>${spec.vars.map((v) => `<th class="num">${v}</th>`).join('')}${spec.cols.map((c) => `<th class="num">${c.h}</th>`).join('')}</tr></thead>
    <tbody>${Array.from({ length: rows }, (_, i) => `<tr>${vals(i).map((v) => `<td class="num fixed">${v ? 'V' : 'F'}</td>`).join('')}${spec.cols.map((_, c) => `<td class="num"><button class="ttb" data-r="${i}" data-c="${c}">·</button></td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  el.addEventListener('click', (e) => { const b = e.target.closest('.ttb'); if (!b) return; const r = +b.dataset.r, c = +b.dataset.c; state[r][c] = state[r][c] === '' ? 'V' : state[r][c] === 'V' ? 'F' : ''; b.textContent = state[r][c] || '·'; b.className = 'ttb ' + (state[r][c] === 'V' ? 'v' : state[r][c] === 'F' ? 'f' : ''); });
  return {
    check() { let ok = 0, tot = 0; $$('.ttb', el).forEach((b) => { const r = +b.dataset.r, c = +b.dataset.c; const exp = expected[r][c] ? 'V' : 'F'; tot++; const good = state[r][c] === exp; if (good) ok++; b.classList.toggle('ok', good); b.classList.toggle('bad', !good && state[r][c] !== ''); }); return { ok, tot }; },
    reveal() { $$('.ttb', el).forEach((b) => { const r = +b.dataset.r, c = +b.dataset.c; state[r][c] = expected[r][c] ? 'V' : 'F'; b.textContent = state[r][c]; b.className = 'ttb ' + (state[r][c] === 'V' ? 'v' : 'f') + ' ok'; }); },
  };
}

// ============ JERARQUÍA PASO A PASO ============
export function mountHier(el, examples = ['3 + 2 × (5 − 1)² ÷ 4', '20 − 3 × 4 + 6 ÷ 2', '2 × {3 + [10 − (4 − 1)] ÷ 7}', '√(9 + 16) + 2³ − 16 ÷ 2']) {
  el.innerHTML = `<div class="vz"><label>Escribe una operación (usa + − × ÷ ^ √ y paréntesis, corchetes o llaves)</label><div class="vzrow"><input type="text" data-x value="${examples[0]}" autocomplete="off" spellcheck="false"><button class="btn" data-go style="flex:0 0 auto">Resolver paso a paso</button></div>
    <div class="chips">${examples.map((x) => `<button class="chip" data-ex="${x}">${x}</button>`).join('')}</div><div data-out></div></div>`;
  const go = () => {
    const out = $('[data-out]', el);
    try {
      const st = exprSteps($('[data-x]', el).value);
      out.innerHTML = `<ol class="hsteps">${st.map((s, i) => `<li><div class="hs">${s.html}</div><div class="hn">${i === st.length - 1 ? '✅ ' : `Paso ${i + 1}: `}${s.note}</div></li>`).join('')}</ol>`;
    } catch (e) { out.innerHTML = `<div class="msg err">${e.message}</div>`; }
  };
  $('[data-go]', el).onclick = go;
  $('[data-x]', el).addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
  $$('[data-ex]', el).forEach((b) => b.onclick = () => { $('[data-x]', el).value = b.dataset.ex; go(); });
  go();
}
