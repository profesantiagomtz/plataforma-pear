// Generadores de ejercicios aleatorios + revisión de respuestas.
// Cada problema: { q: html, mode, ans, e: explicación, opts?, tol? }
import { evaluate, steps, fmtN } from './expr.js';

const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = (arr) => arr[rnd(0, arr.length - 1)];
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);
export const shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = rnd(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sgn = (n) => (n < 0 ? `(−${-n})` : String(n));
const num = (n) => fmtN(n);
const sci = (m, e) => `${num(m)} × 10<sup>${String(e).replace('-', '−')}</sup>`;
export const fr = (a, b) => `<span class="fr"><i>${a}</i><i>${b}</i></span>`;
const red = (a, b) => { const g = gcd(a, b); const s = b < 0 ? -1 : 1; return [s * a / g, s * b / g]; };
const frs = (a, b) => (b === 1 ? String(a) : `${a}/${b}`);

const ROMAN = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
export const toRoman = (n) => { let s = ''; for (const [v, r] of ROMAN) while (n >= v) { s += r; n -= v; } return s; };

const G = {};

// ---------- 1.1 lógica ----------
const FORMS = [
  ['p ∨ q', (p, q) => p || q], ['p ∧ q', (p, q) => p && q], ['p → q', (p, q) => !p || q], ['p ↔ q', (p, q) => p === q],
  ['¬p ∨ q', (p, q) => !p || q], ['¬(p ∧ q)', (p, q) => !(p && q)], ['(p ∨ q) ∧ ¬q', (p, q) => (p || q) && !q],
  ['(p → q) ∧ (q → p)', (p, q) => (!p || q) && (!q || p)], ['¬p → q', (p, q) => p || q], ['p ∧ ¬q', (p, q) => p && !q],
];
const VF = (b) => (b ? 'V' : 'F');
G.logica = () => {
  const [txt, f] = pick(FORMS); const p = Math.random() < .5, q = Math.random() < .5;
  return { q: `Si <b>p = ${VF(p)}</b> y <b>q = ${VF(q)}</b>, ¿cuánto vale <b>${txt}</b>?`, mode: 'sel', opts: ['V', 'F'], ans: VF(f(p, q)),
    e: `Sustituye p = ${VF(p)} y q = ${VF(q)} y resuelve conectivo por conectivo: el resultado es <b>${VF(f(p, q))}</b>.` };
};
G.logicaFacil = () => {
  const [txt, f] = pick(FORMS.filter((x) => ['p ∨ q', 'p ∧ q', 'p → q', 'p ↔ q', '¬p ∨ q', 'p ∧ ¬q'].includes(x[0]))); const p = Math.random() < .5, q = Math.random() < .5;
  return { q: `Si <b>p = ${VF(p)}</b> y <b>q = ${VF(q)}</b>, ¿cuánto vale <b>${txt}</b>?`, mode: 'sel', opts: ['V', 'F'], ans: VF(f(p, q)), e: `Sustituye: p = ${VF(p)}, q = ${VF(q)}. El resultado es <b>${VF(f(p, q))}</b>.` };
};
G.neg = () => { const p = Math.random() < .5; return { q: `Si <b>p = ${VF(p)}</b>, ¿cuánto vale <b>¬p</b> (no p)?`, mode: 'sel', opts: ['V', 'F'], ans: VF(!p), e: `El «NO» voltea el valor: ¬p = ${VF(!p)}.` }; };
G.filas = () => { const n = rnd(2, 5); return { q: `¿Cuántas filas tiene la tabla de verdad de una proposición con <b>${n}</b> proposiciones simples?`, mode: 'n', ans: 2 ** n, e: `Son 2<sup>${n}</sup> = ${2 ** n} filas.` }; };
G.tipo = () => {
  const items = [['p ∨ ¬p', 'Tautología'], ['p ∧ ¬p', 'Contradicción'], ['p → p', 'Tautología'], ['p ∧ q', 'Contingencia'], ['p ↔ ¬p', 'Contradicción'], ['p ∨ q', 'Contingencia'], ['(p ∧ q) → p', 'Tautología']];
  const [t, a] = pick(items); return { q: `Clasifica <b>${t}</b>:`, mode: 'sel', opts: ['Tautología', 'Contradicción', 'Contingencia'], ans: a, e: `Al revisar todas las filas de su tabla, resulta una <b>${a.toLowerCase()}</b>.` };
};

// ---------- 1.2 conteo ----------
G.romano = () => {
  if (Math.random() < .5) { const n = rnd(4, 2999); return { q: `Convierte a <b>decimal</b>: <b>${toRoman(n)}</b>`, mode: 'n', ans: n, e: `${toRoman(n)} = ${n}.` }; }
  const n = rnd(4, 2999); return { q: `Escribe en <b>números romanos</b>: <b>${n}</b>`, mode: 't', ans: toRoman(n), e: `${n} se escribe ${toRoman(n)}.` };
};
G.posicional = () => {
  const d = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4); const n = d.join(''); const k = rnd(0, 3); const dig = d[3 - k];
  const names = ['unidades', 'decenas', 'centenas', 'millares'];
  return { q: `En el número <b>${n}</b>, ¿qué <b>valor</b> tiene la cifra <b>${dig}</b>?`, mode: 'n', ans: dig * 10 ** k, e: `La cifra ${dig} está en las ${names[k]}: ${dig} × ${10 ** k} = ${dig * 10 ** k}.` };
};
G.maya = () => {
  const n = rnd(1, 19); const bars = Math.floor(n / 5), dots = n % 5;
  const sym = '▬ '.repeat(bars).trim() + (bars && dots ? ' ' : '') + '●'.repeat(dots);
  return { q: `En numeración maya, ● = 1 y ▬ = 5. ¿Qué número es <b style="font-size:1.2em">${n === 0 ? '🐚' : sym}</b>?`, mode: 'n', ans: n, e: `${bars} barra(s) × 5 + ${dots} punto(s) = ${n}.` };
};

// ---------- 1.3 enteros ----------
G.enteros = () => {
  const op = pick(['+', '−', '×', '÷']); let a = rnd(-12, 12) || 3, b = rnd(-12, 12) || -4, r, txt;
  if (op === '+') { r = a + b; txt = `${a < 0 ? '−' + -a : a} + ${sgn(b)}`; }
  else if (op === '−') { r = a - b; txt = `${a < 0 ? '−' + -a : a} − ${sgn(b)}`; }
  else if (op === '×') { r = a * b; txt = `${a < 0 ? '−' + -a : a} × ${sgn(b)}`; }
  else { b = pick([-9, -8, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 8, 9]); const q = rnd(-9, 9) || 4; a = b * q; r = q; txt = `${a < 0 ? '−' + -a : a} ÷ ${sgn(b)}`; }
  return { q: `Calcula: <b>${txt}</b>`, mode: 'n', ans: r, e: op === '−' ? `Restar es sumar el opuesto: ${a} + ${sgn(-b)} = ${r}.` : `Con la ley de signos el resultado es ${r}.` };
};
G.enterosFacil = () => {
  const a = rnd(-9, 9), b = rnd(-9, 9) || 4; const plus = Math.random() < .5; const r = plus ? a + b : a - b;
  if (a >= 0 && b >= 0 && (plus || a >= b)) return G.enterosFacil();
  const txt = plus ? `${a < 0 ? '−' + -a : a} + ${sgn(b)}` : `${a < 0 ? '−' + -a : a} − ${sgn(b)}`;
  return { q: `Calcula: <b>${txt}</b>`, mode: 'n', ans: r, e: plus ? `Piensa en dinero: ${a < 0 ? `debes $${-a}` : `tienes $${a}`} y ${b < 0 ? `debes $${-b} más` : `ganas $${b}`}. Resultado: ${r}.` : `Restar es sumar el opuesto: ${a} + ${sgn(-b)} = ${r}.` };
};
G.mcd = () => { const g = pick([2, 3, 4, 5, 6, 7]); let m, n; do { m = rnd(2, 8); n = rnd(2, 8); } while (m === n || gcd(m, n) !== 1); const a = g * m, b = g * n;
  return { q: `Calcula el <b>MCD</b> de <b>${a}</b> y <b>${b}</b>.`, mode: 'n', ans: g, e: `Factoriza y toma los primos comunes con el menor exponente. MCD(${a}, ${b}) = ${g}.` }; };
G.mcm = () => { let a, b; do { a = rnd(3, 15); b = rnd(3, 15); } while (a === b || lcm(a, b) > 120);
  return { q: `Calcula el <b>MCM</b> de <b>${a}</b> y <b>${b}</b>.`, mode: 'n', ans: lcm(a, b), e: `MCM = (${a} × ${b}) ÷ MCD = ${a * b} ÷ ${gcd(a, b)} = ${lcm(a, b)}.` }; };
const isPrime = (n) => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
G.primo = () => { const n = rnd(11, 97); const pr = isPrime(n);
  return { q: `¿El número <b>${n}</b> es primo o compuesto?`, mode: 'sel', opts: ['Primo', 'Compuesto'], ans: pr ? 'Primo' : 'Compuesto', e: pr ? `${n} solo es divisible entre 1 y entre sí mismo.` : `${n} es divisible entre ${[...Array(n).keys()].find((i) => i > 1 && n % i === 0)}.` }; };
const divsOf = (n) => { const d = []; for (let i = 1; i <= n; i++) if (n % i === 0) d.push(i); return d; };
G.divisores = () => { const n = pick([6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 24, 30]); return { q: `Escribe <b>todos los divisores</b> de <b>${n}</b>, separados por comas. <span class="muted small">(ejemplo: 1, 2, 3)</span>`, mode: 'list', ans: divsOf(n), e: `Los números que caben exacto en ${n}: ${divsOf(n).join(', ')}.` }; };
G.multiplos = () => { const n = pick([2, 3, 4, 5, 6, 7, 8, 9]); const l = [1, 2, 3, 4, 5].map((k) => n * k); return { q: `Escribe los <b>primeros 5 múltiplos</b> de <b>${n}</b>, separados por comas. <span class="muted small">(cuenta de ${n} en ${n})</span>`, mode: 'list', ans: l, e: `Cuenta de ${n} en ${n}: ${l.join(', ')}.` }; };
G.esDivisor = () => { const n = pick([12, 15, 18, 20, 24, 30, 36]); const d = Math.random() < .5 ? pick(divsOf(n).filter((x) => x > 1 && x < n)) : pick([4, 5, 7, 8, 9].filter((x) => n % x !== 0)); const yes = n % d === 0;
  return { q: `¿El <b>${d}</b> es divisor del <b>${n}</b>? <span class="muted small">(¿${d} cabe exacto en ${n}?)</span>`, mode: 'sel', opts: ['Sí', 'No'], ans: yes ? 'Sí' : 'No', e: yes ? `Sí: ${n} ÷ ${d} = ${n / d}, sin sobrante.` : `No: ${n} ÷ ${d} no sale exacto (sobra ${n % d}).` }; };
G.mcdFacil = () => { const [a, b] = pick([[4, 6], [6, 9], [8, 12], [10, 15], [6, 8], [9, 12], [12, 18], [10, 25], [14, 21], [8, 20], [12, 16], [15, 20]]);
  const g = gcd(a, b); return { q: `Escribe el <b>MCD</b> de <b>${a}</b> y <b>${b}</b>. <span class="muted small">(el número más grande que cabe exacto en los dos)</span>`, mode: 'n', ans: g, e: `Divisores de ${a}: ${divsOf(a).join(', ')}. Divisores de ${b}: ${divsOf(b).join(', ')}. El más grande que se repite es <b>${g}</b>.` }; };
G.mcmFacil = () => { const [a, b] = pick([[2, 3], [3, 4], [2, 5], [4, 6], [3, 5], [6, 8], [4, 10], [5, 6], [6, 9], [3, 8], [4, 5], [2, 7]]);
  const m = lcm(a, b); return { q: `Escribe el <b>MCM</b> de <b>${a}</b> y <b>${b}</b>. <span class="muted small">(el primer número al que llegan los dos contando de salto en salto)</span>`, mode: 'n', ans: m, e: `Múltiplos de ${a}: ${[1, 2, 3, 4, 5, 6].map((k) => a * k).join(', ')}… Múltiplos de ${b}: ${[1, 2, 3, 4, 5, 6].map((k) => b * k).join(', ')}… El primero que se repite es <b>${m}</b>.` }; };
const factorize = (n) => { const m = {}; for (let p = 2; p * p <= n; p++) while (n % p === 0) { m[p] = (m[p] || 0) + 1; n /= p; } if (n > 1) m[n] = (m[n] || 0) + 1; return m; };
const fstr = (m) => Object.keys(m).map(Number).sort((a, b) => a - b).map((p) => (m[p] > 1 ? `${p}<sup>${m[p]}</sup>` : p)).join(' × ');
G.factor = () => { const n = pick([12, 18, 20, 24, 28, 30, 36, 40, 45, 48, 50, 54, 60, 72, 84, 90, 100, 120, 150]);
  return { q: `Factoriza en números primos: <b>${n}</b> <span class="muted small">(escribe así: 2^2*3*5)</span>`, mode: 'fact', ans: factorize(n), e: `${n} = ${fstr(factorize(n))}.` }; };

// ---------- 1.4 fracciones y porcentajes ----------
G.simplifica = () => { let p, q; do { q = rnd(2, 12); p = rnd(1, q + 4); } while (gcd(p, q) !== 1 || p === q); const k = rnd(2, 6);
  return { q: `Simplifica: <b>${fr(k * p, k * q)}</b> <span class="muted small">(escribe a/b)</span>`, mode: 'fs', ans: [p, q], e: `Divide numerador y denominador entre su MCD (${k}): ${p}/${q}.` }; };
G.sumaFrac = () => { const ds = [2, 3, 4, 5, 6, 8, 10, 12]; let a, b, c, d, n, m; do { b = pick(ds); d = pick(ds); a = rnd(1, b - 1); c = rnd(1, d - 1); n = a * d + c * b; m = b * d; } while (b === d);
  const [rn, rd] = red(n, m); const sub = Math.random() < .35;
  if (sub) { let [x, y, z, w] = [a, b, c, d]; if (x / y < z / w) [x, y, z, w] = [z, w, x, y]; const nn = x * w - z * y, mm = y * w; const [sn, sd] = red(nn, mm); if (nn === 0) return G.sumaFrac();
    return { q: `Resta: <b>${fr(x, y)} − ${fr(z, w)}</b> <span class="muted small">(resultado simplificado, a/b)</span>`, mode: 'fs', ans: [sn, sd], e: `Denominador común ${lcm(y, w)}: ${x * (lcm(y, w) / y)}/${lcm(y, w)} − ${z * (lcm(y, w) / w)}/${lcm(y, w)} = ${frs(sn, sd)}.` }; }
  return { q: `Suma: <b>${fr(a, b)} + ${fr(c, d)}</b> <span class="muted small">(resultado simplificado, a/b)</span>`, mode: 'fs', ans: [rn, rd], e: `Denominador común ${lcm(b, d)}: ${a * (lcm(b, d) / b)}/${lcm(b, d)} + ${c * (lcm(b, d) / d)}/${lcm(b, d)} = ${frs(rn, rd)}.` }; };
G.mulFrac = () => { const a = rnd(1, 5), b = rnd(2, 7), c = rnd(1, 5), d = rnd(2, 7); const mul = Math.random() < .6;
  const [n, m] = mul ? red(a * c, b * d) : red(a * d, b * c);
  return { q: `${mul ? 'Multiplica' : 'Divide'}: <b>${fr(a, b)} ${mul ? '×' : '÷'} ${fr(c, d)}</b> <span class="muted small">(simplificado, a/b)</span>`, mode: 'fs', ans: [n, m], e: mul ? `Numerador × numerador y denominador × denominador, y simplifica: ${frs(n, m)}.` : `Dividir es multiplicar por el inverso: ${a}/${b} × ${d}/${c} = ${frs(n, m)}.` }; };
G.fraccionDe = () => { const d = pick([2, 3, 4, 5, 6, 8, 10]); const n = rnd(1, d - 1); const N = d * rnd(2, 12);
  return { q: `¿Cuánto es <b>${fr(n, d)}</b> de <b>${N}</b>?`, mode: 'n', ans: N / d * n, e: `(${N} ÷ ${d}) × ${n} = ${N / d * n}.` }; };
G.porcentaje = () => { const P = pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 75]); const N = pick([40, 60, 80, 120, 160, 200, 240, 300, 400, 500]);
  return { q: `¿Cuánto es el <b>${P} %</b> de <b>${N}</b>?`, mode: 'n', ans: N * P / 100, e: `${N} × ${P} ÷ 100 = ${N * P / 100}.` }; };
G.descuento = () => { const P = pick([10, 15, 20, 25, 30, 40, 50]); const N = pick([200, 400, 500, 800, 1000, 1200, 2000, 4800]); const up = Math.random() < .3;
  const r = N * (100 + (up ? P : -P)) / 100;
  return { q: up ? `Un producto de <b>$${N}</b> sube <b>${P} %</b>. ¿Cuál es su precio nuevo?` : `Un producto cuesta <b>$${N}</b> y tiene <b>${P} %</b> de descuento. ¿Cuánto se paga?`, mode: 'n', ans: r, e: `${N} × ${100 + (up ? P : -P)} ÷ 100 = $${r}.` }; };
G.quePorcentaje = () => { const B = pick([20, 40, 50, 80, 200, 250, 400]); const P = pick([5, 10, 20, 25, 30, 40, 50, 75]); const A = B * P / 100;
  return { q: `¿Qué porcentaje es <b>${A}</b> de <b>${B}</b>?`, mode: 'n', ans: P, e: `${A} ÷ ${B} × 100 = ${P} %.` }; };
G.reglaTres = () => { const u = rnd(8, 45); const a = rnd(2, 6), b = a + rnd(2, 6);
  return { q: `<b>${a}</b> cuadernos cuestan <b>$${a * u}</b>. ¿Cuánto cuestan <b>${b}</b> cuadernos?`, mode: 'n', ans: b * u, e: `Cada uno cuesta ${a * u} ÷ ${a} = $${u}; ${b} × ${u} = $${b * u}.` }; };

// ---------- 1.5 potencias y raíces ----------
G.potencia = () => { const neg = Math.random() < .3; const b = neg ? -rnd(2, 5) : rnd(2, 9); const e = neg ? rnd(2, 4) : rnd(2, b > 5 ? 3 : 5); const val = b ** e;
  return { q: `Calcula: <b>${b < 0 ? `(${num(b)})` : b}<sup>${e}</sup></b>`, mode: 'n', ans: val, e: `${Array(e).fill(b < 0 ? `(${num(b)})` : b).join(' × ')} = ${num(val)}.` }; };
G.negativo = () => { const a = rnd(2, 5), n = rnd(1, 3);
  if (Math.random() < .5) return { q: `Calcula: <b>${a}<sup>−${n}</sup></b> <span class="muted small">(a/b)</span>`, mode: 'fs', ans: [1, a ** n], e: `a<sup>−n</sup> = 1 ÷ a<sup>n</sup> = 1/${a ** n}.` };
  return { q: `Calcula: <b>(${fr(1, a)})<sup>−${n}</sup></b>`, mode: 'n', ans: a ** n, e: `El exponente negativo invierte la base: ${a}<sup>${n}</sup> = ${a ** n}.` }; };
G.raiz = () => { if (Math.random() < .8) { const n = rnd(2, 20); return { q: `Calcula: <b>√${n * n}</b>`, mode: 'n', ans: n, e: `${n} × ${n} = ${n * n}.` }; }
  const [a, b] = pick([[1, 4], [1, 9], [4, 9], [9, 16], [25, 36], [1, 25]]); return { q: `Calcula: <b>√(${fr(a, b)})</b> <span class="muted small">(a/b)</span>`, mode: 'fs', ans: [Math.sqrt(a), Math.sqrt(b)], e: `Raíz del numerador entre raíz del denominador.` }; };
G.reglasExp = () => { const b = rnd(2, 9); const t = rnd(0, 2);
  if (t === 0) { const m = rnd(2, 7), n = rnd(2, 7); return { q: `${b}<sup>${m}</sup> × ${b}<sup>${n}</sup> = ${b}<sup>?</sup>`, mode: 'n', ans: m + n, e: `Misma base: se suman los exponentes, ${m} + ${n} = ${m + n}.` }; }
  if (t === 1) { const n = rnd(2, 5), m = n + rnd(1, 5); return { q: `${b}<sup>${m}</sup> ÷ ${b}<sup>${n}</sup> = ${b}<sup>?</sup>`, mode: 'n', ans: m - n, e: `Misma base: se restan los exponentes, ${m} − ${n} = ${m - n}.` }; }
  const m = rnd(2, 5), n = rnd(2, 4); return { q: `(${b}<sup>${m}</sup>)<sup>${n}</sup> = ${b}<sup>?</sup>`, mode: 'n', ans: m * n, e: `Potencia de potencia: se multiplican los exponentes, ${m} × ${n} = ${m * n}.` }; };
G.entre = () => { let n; do { n = rnd(2, 150); } while (Math.sqrt(n) % 1 === 0); const k = Math.floor(Math.sqrt(n));
  const opts = shuffle([`${k} y ${k + 1}`, `${k - 1} y ${k}`, `${k + 1} y ${k + 2}`, `${k + 2} y ${k + 3}`].filter((s) => !/^-|^0 /.test(s)));
  return { q: `¿Entre qué enteros consecutivos está <b>√${n}</b>?`, mode: 'sel', opts, ans: `${k} y ${k + 1}`, e: `${k}² = ${k * k} y ${(k + 1) ** 2} = ${(k + 1) ** 2}; ${n} queda en medio.` }; };

// ---------- 1.6 medición ----------
const clean = (x) => Math.round(x * 1e6) / 1e6;
const CONV = [['km', 'm', 1000], ['m', 'cm', 100], ['m', 'mm', 1000], ['kg', 'g', 1000], ['g', 'mg', 1000], ['L', 'mL', 1000], ['h', 'min', 60], ['min', 's', 60], ['h', 's', 3600], ['cm', 'mm', 10]];
G.conversion = () => { const [a, b, f] = pick(CONV); const rev = Math.random() < .45; const v = pick([2, 3, 4, 5, 7, 8, 12, 15, 2.5, 3.5, 0.5, 1.5]);
  return rev ? { q: `Convierte <b>${num(clean(v * f))} ${b}</b> a <b>${a}</b>.`, mode: 'n', ans: v, e: `${num(clean(v * f))} ÷ ${f} = ${num(v)} ${a}.` }
    : { q: `Convierte <b>${num(v)} ${a}</b> a <b>${b}</b>.`, mode: 'n', ans: clean(v * f), e: `${num(v)} × ${f} = ${num(clean(v * f))} ${b}.` }; };
G.rapidez = () => { const k = pick([18, 36, 54, 72, 90, 108, 126]); const toMs = Math.random() < .6;
  return toMs ? { q: `Convierte <b>${k} km/h</b> a <b>m/s</b>.`, mode: 'n', ans: k / 3.6, e: `${k} × 1 000 ÷ 3 600 = ${k / 3.6} m/s.` }
    : { q: `Convierte <b>${k / 3.6} m/s</b> a <b>km/h</b>.`, mode: 'n', ans: k, e: `${k / 3.6} × 3 600 ÷ 1 000 = ${k} km/h.` }; };
G.temperatura = () => { const k = rnd(-3, 16); const c = 5 * k, f = 32 + 9 * k;
  return { q: `Convierte <b>${num(f)} °F</b> a <b>°C</b>.`, mode: 'n', ans: c, e: `(${num(f)} − 32) × 5/9 = ${num(c)} °C.` }; };
G.cientifica = () => { const m = pick([1.2, 2.5, 3, 4.5, 5.6, 6.02, 7, 8.1, 9.4]); const e = pick([-7, -5, -4, -3, 3, 4, 5, 6, 8, 9]); const val = clean(m * 10 ** e);
  const dec = e < 0 ? val.toFixed(Math.max(0, -e + String(m).replace('.', '').length - 1)) : String(Math.round(val)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return Math.random() < .65 ? { q: `Escribe en <b>notación científica</b>: <b>${dec}</b> <span class="muted small">(ej.: 4.5x10^3)</span>`, mode: 'sci', ans: [m, e], e: `${dec} = ${sci(m, e)}.` }
    : { q: `Escribe en forma decimal: <b>${sci(m, e)}</b>`, mode: 'n', ans: val, e: `Mueve el punto ${Math.abs(e)} lugares a la ${e > 0 ? 'derecha' : 'izquierda'}: ${dec}.` }; };
G.escala = () => { const N = pick([25000, 50000, 100000]); const cm = pick([2, 4, 5, 8, 10, 20]); const km = cm * N / 100000;
  return { q: `En un mapa con escala <b>1 : ${N.toLocaleString('es-MX')}</b>, <b>${cm} cm</b> son cuántos <b>km</b> en la realidad?`, mode: 'n', ans: km, e: `${cm} × ${N} = ${cm * N} cm = ${km} km.` }; };
G.densidad = () => { const V = pick([50, 100, 200, 250, 500]); const d = pick([0.8, 1, 2.5, 2.7, 7.8, 0.5]); const m = clean(V * d);
  return { q: `Un objeto de <b>${num(m)} g</b> ocupa <b>${V} cm³</b>. ¿Cuál es su densidad (g/cm³)?`, mode: 'n', ans: d, e: `Densidad = masa ÷ volumen = ${num(m)} ÷ ${V} = ${num(d)} g/cm³.` }; };
G.imperial = () => { const t = rnd(0, 3);
  if (t === 0) { const i = pick([10, 20, 40, 50, 100]); return { q: `1 pulgada = 2.54 cm. ¿Cuántos <b>cm</b> son <b>${i} pulgadas</b>?`, mode: 'n', ans: clean(i * 2.54), tol: .01, e: `${i} × 2.54 = ${clean(i * 2.54)} cm.` }; }
  if (t === 1) { const mi = pick([10, 20, 50, 100]); return { q: `1 milla ≈ 1.609 km. ¿Cuántos <b>km</b> son <b>${mi} millas</b>? <span class="muted small">(redondea a décimas)</span>`, mode: 'n', ans: clean(mi * 1.609), tol: .1, e: `${mi} × 1.609 ≈ ${clean(mi * 1.609)} km.` }; }
  if (t === 2) { const g = pick([2, 5, 10, 20]); return { q: `1 galón ≈ 3.785 L. ¿Cuántos <b>litros</b> son <b>${g} galones</b>? <span class="muted small">(redondea a décimas)</span>`, mode: 'n', ans: clean(g * 3.785), tol: .1, e: `${g} × 3.785 ≈ ${clean(g * 3.785)} L.` }; }
  const lb = pick([10, 20, 50, 100, 150]); return { q: `1 libra ≈ 0.454 kg. ¿Cuántos <b>kg</b> son <b>${lb} libras</b>? <span class="muted small">(redondea a décimas)</span>`, mode: 'n', ans: clean(lb * 0.454), tol: .1, e: `${lb} × 0.454 ≈ ${clean(lb * 0.454)} kg.` }; };

// ---------- 1.7 cálculos combinados ----------
const TPL = [
  () => `${rnd(2, 20)} + ${rnd(2, 9)} × ${rnd(2, 9)} − ${rnd(1, 15)}`,
  () => `(${rnd(2, 15)} + ${rnd(2, 12)}) × ${rnd(2, 6)} − ${rnd(1, 12)}`,
  () => { const d = rnd(2, 6); return `${d * rnd(2, 8)} ÷ ${d} + ${rnd(2, 9)} × ${rnd(2, 9)}`; },
  () => `${rnd(2, 12)} + ${rnd(2, 5)}² × ${rnd(2, 6)} − ${rnd(1, 20)}`,
  () => { const s = rnd(2, 12); return `√${s * s} + ${rnd(2, 9)} × (${rnd(6, 15)} − ${rnd(1, 5)})`; },
  () => `${rnd(15, 40)} − [${rnd(2, 9)} + (${rnd(5, 12)} − ${rnd(1, 4)}) × ${rnd(2, 5)}]`,
  () => { const d = rnd(2, 5); return `(${rnd(6, 12)} − ${rnd(1, 5)})² ÷ ${d === 2 ? 5 : d === 3 ? 5 : 5} + ${rnd(1, 9)}`; },
  () => `−${rnd(2, 9)} + ${rnd(2, 6)} × (−${rnd(2, 7)}) − (−${rnd(2, 12)})`,
  () => `${rnd(2, 5)}³ − ${rnd(2, 9)} × ${rnd(2, 6)} + ${rnd(10, 30)} ÷ 5`,
  () => `{${rnd(10, 30)} − [${rnd(2, 9)} + ${rnd(1, 6)} × (${rnd(2, 9)} − ${rnd(1, 4)})]} × ${rnd(2, 4)}`,
];
G.jerarquia = (level = 0) => {
  for (let t = 0; t < 200; t++) {
    const idx = level === 1 ? pick([3, 4, 5, 6, 7, 8, 9]) : level === 0 ? pick([0, 1, 2, 3]) : rnd(0, TPL.length - 1);
    const s = TPL[idx]();
    try { const v = evaluate(s); if (Number.isInteger(v) && Math.abs(v) < 400) return { q: `Resuelve aplicando la jerarquía: <b class="expr">${s.replace(/(\d)²/g, '$1<sup>2</sup>').replace(/(\d)³/g, '$1<sup>3</sup>')}</b>`, mode: 'n', ans: v, steps: s, e: 'Resultado paso a paso en la explicación.' }; } catch { /* siguiente intento */ }
  }
  return { q: 'Resuelve: <b>2 + 3 × 4</b>', mode: 'n', ans: 14 };
};
G.jerarquia2 = () => G.jerarquia(1);
const TPL0 = [
  () => `${rnd(2, 9)} + ${rnd(2, 6)} × ${rnd(2, 6)}`,
  () => `${rnd(10, 30)} − ${rnd(2, 5)} × ${rnd(2, 5)}`,
  () => `(${rnd(2, 9)} + ${rnd(2, 8)}) × ${rnd(2, 5)}`,
  () => { const d = rnd(2, 5); return `${rnd(8, 20)} + ${d * rnd(2, 6)} ÷ ${d}`; },
  () => `${rnd(2, 6)} × ${rnd(2, 6)} + ${rnd(2, 9)}`,
  () => `(${rnd(10, 20)} − ${rnd(2, 8)}) ÷ ${pick([2, 3, 4])}`,
];
G.jerarquiaFacil = () => { for (let t = 0; t < 200; t++) { const s = pick(TPL0)(); try { const v = evaluate(s); if (Number.isInteger(v) && v > 0 && v < 100) return { q: `Resuelve aplicando el orden: <b class="expr">${s}</b>`, mode: 'n', ans: v, steps: s, e: 'Mira los pasos abajo.' }; } catch { /* otro intento */ } } return { q: 'Resuelve: <b>2 + 3 × 4</b>', mode: 'n', ans: 14 }; };
G.mercado = () => { const a = pick([12, 15, 18, 20, 22, 25]), b = pick([30, 35, 38, 40, 45]), q1 = rnd(2, 5), q2 = rnd(2, 4); const P = pick([10, 20]);
  const tot = (a * q1 + b * q2) * (100 - P) / 100;
  return { q: `Compras <b>${q1} kg</b> de naranja a <b>$${a}</b> el kilo y <b>${q2} kg</b> de frijol a <b>$${b}</b> el kilo. Con un cupón de <b>${P} %</b> sobre el total, ¿cuánto pagas?`, mode: 'n', ans: tot, tol: .01,
    e: `(${q1} × ${a} + ${q2} × ${b}) × ${(100 - P) / 100} = ${a * q1 + b * q2} × ${(100 - P) / 100} = $${num(tot)}.` }; };

// ---------- API ----------
export const GENS = G;
export function make(name, n = 5) {
  const f = G[name]; if (!f) throw new Error('Generador desconocido: ' + name);
  const out = []; const seen = new Set();
  for (let i = 0; i < n * 6 && out.length < n; i++) { const p = f(); if (!seen.has(p.q)) { seen.add(p.q); out.push(p); } }
  return out;
}

// ---- revisión ----
const clearNum = (s) => String(s).replace(/\s/g, '').replace(/−/g, '-').replace(/,/g, '.');
function parseValue(s) {
  s = clearNum(s); if (!s) return NaN;
  if (/^-?\d+(\.\d+)?\/-?\d+(\.\d+)?$/.test(s)) { const [a, b] = s.split('/').map(Number); return b ? a / b : NaN; }
  if (/^-?\d*\.?\d+$/.test(s)) return parseFloat(s);
  return NaN;
}
export function check(p, raw) {
  raw = String(raw ?? '').trim(); if (!raw) return { ok: false, msg: 'Escribe una respuesta.' };
  if (p.mode === 'sel') return { ok: raw === p.ans };
  if (p.mode === 'n') { const v = parseValue(raw); if (isNaN(v)) return { ok: false, msg: 'Escribe solo un número (puede ser decimal o a/b).' };
    const tol = p.tol ?? Math.max(1e-6, Math.abs(p.ans) * 1e-6); return { ok: Math.abs(v - p.ans) <= tol }; }
  if (p.mode === 'fs') { const s = clearNum(raw); const [an, ad] = p.ans;
    const m = s.match(/^(-?\d+)(?:\/(\d+))?$/); if (!m) return { ok: false, msg: 'Escribe la fracción como a/b (por ejemplo 3/4).' };
    const n = +m[1], d = m[2] ? +m[2] : 1; if (!d) return { ok: false, msg: 'El denominador no puede ser 0.' };
    if (n * ad !== an * d) return { ok: false }; const [rn, rd] = red(n, d);
    if (rn !== n || rd !== d) return { ok: false, msg: 'Es correcta pero se puede simplificar más.' }; return { ok: true }; }
  if (p.mode === 'list') { const got = String(raw).replace(/−/g, '-').split(/[,;\s]+/).filter(Boolean).map(Number); if (got.some(isNaN)) return { ok: false, msg: 'Escribe solo números separados por comas (ejemplo: 1, 2, 3).' };
    const A = [...new Set(p.ans)].sort((a, b) => a - b), B = [...new Set(got)].sort((a, b) => a - b); return { ok: A.length === B.length && A.every((x, i) => x === B[i]), msg: B.length < A.length ? 'Te faltan números.' : B.length > A.length ? 'Te sobran números.' : undefined }; }
  if (p.mode === 't') return { ok: raw.toUpperCase().replace(/[^A-Z0-9]/g, '') === String(p.ans).toUpperCase() };
  if (p.mode === 'fact') { const parts = clearNum(raw).replace(/[x×·]/gi, '*').split('*'); const got = {};
    for (const part of parts) { const m = part.match(/^(\d+)(?:\^(\d+))?$/); if (!m) return { ok: false, msg: 'Usa el formato 2^2*3*5.' }; got[+m[1]] = (got[+m[1]] || 0) + (m[2] ? +m[2] : 1); }
    const A = Object.keys(p.ans), B = Object.keys(got); return { ok: A.length === B.length && A.every((k) => got[k] === p.ans[k]) }; }
  if (p.mode === 'sci') { const s = clearNum(raw).toLowerCase().replace(/[x×*·]/g, 'x').replace(/\^/g, '').replace('10', '10');
    const m = s.match(/^(-?\d+\.?\d*)x10(-?\d+)$/) || s.match(/^(-?\d+\.?\d*)e(-?\d+)$/); if (!m) return { ok: false, msg: 'Usa el formato 4.5x10^3.' };
    const mant = parseFloat(m[1]), ex = parseInt(m[2], 10); if (Math.abs(mant) < 1 || Math.abs(mant) >= 10) return { ok: false, msg: 'El primer número debe estar entre 1 y 10.' };
    return { ok: Math.abs(mant - p.ans[0]) < 1e-9 && ex === p.ans[1] }; }
  return { ok: false };
}
export const answerText = (p) => (p.mode === 'list' ? p.ans.join(', ') : p.mode === 'sel' || p.mode === 't' ? String(p.ans) : p.mode === 'fs' ? frs(...p.ans) : p.mode === 'sci' ? `${p.ans[0]}x10^${p.ans[1]}` : p.mode === 'fact' ? fstr(p.ans).replace(/<\/?sup>/g, (m) => (m === '<sup>' ? '^' : '')) : String(num(p.ans)));
export { steps };
