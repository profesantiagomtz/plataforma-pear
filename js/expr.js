// Evaluador de expresiones aritméticas con pasos (jerarquía de operaciones).
// Acepta: + − - × * · ÷ / ^ ² ³ √ y agrupaciones ( ) [ ] { }.

const OPEN = { '(': ')', '[': ']', '{': '}' };
const CLOSE = new Set([')', ']', '}']);

export const fmtN = (v) => {
  if (!isFinite(v)) return '∞';
  let s = String(Math.round(v * 1e6) / 1e6);
  return s.replace('-', '−');
};

function tokenize(src) {
  const s = src.replace(/\s+/g, '').replace(/,/g, '.');
  const out = []; let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/[0-9.]/.test(c)) { let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++; out.push({ t: 'n', v: parseFloat(s.slice(i, j)) }); i = j; continue; }
    if ('+−-'.includes(c)) { out.push({ t: 'op', v: c === '+' ? '+' : '-' }); i++; continue; }
    if ('×*·'.includes(c)) { out.push({ t: 'op', v: '*' }); i++; continue; }
    if ('÷/'.includes(c)) { out.push({ t: 'op', v: '/' }); i++; continue; }
    if (c === '^') { out.push({ t: 'op', v: '^' }); i++; continue; }
    if (c === '²' || c === '³') { out.push({ t: 'sup', v: c === '²' ? 2 : 3 }); i++; continue; }
    if (c === '√') { out.push({ t: 'root' }); i++; continue; }
    if (OPEN[c]) { out.push({ t: 'open', v: c }); i++; continue; }
    if (CLOSE.has(c)) { out.push({ t: 'close', v: c }); i++; continue; }
    throw new Error(`Símbolo no válido: «${c}»`);
  }
  return out;
}

// Gramática: expr := term (('+'|'-') term)* ; term := unary (('*'|'/') unary)* ;
// unary := '-' unary | pow ; pow := atom ('^' unary | sup)* ; atom := num | root atom | open expr close
export function parse(src) {
  const tk = tokenize(src); let p = 0;
  const peek = () => tk[p]; const next = () => tk[p++];
  function expr() {
    let l = term();
    while (peek() && peek().t === 'op' && (peek().v === '+' || peek().v === '-')) { const op = next().v; l = { k: 'bin', op, l, r: term() }; }
    return l;
  }
  function term() {
    let l = unary();
    while (peek() && peek().t === 'op' && (peek().v === '*' || peek().v === '/')) { const op = next().v; l = { k: 'bin', op, l, r: unary() }; }
    return l;
  }
  function unary() {
    if (peek() && peek().t === 'op' && peek().v === '-') { next(); const x = unary(); return x.k === 'num' ? { k: 'num', v: -x.v } : { k: 'neg', x }; }
    if (peek() && peek().t === 'op' && peek().v === '+') { next(); return unary(); }
    return pow();
  }
  function pow() {
    let b = atom();
    for (;;) {
      if (peek() && peek().t === 'sup') { b = { k: 'bin', op: '^', l: b, r: { k: 'num', v: next().v } }; continue; }
      if (peek() && peek().t === 'op' && peek().v === '^') { next(); b = { k: 'bin', op: '^', l: b, r: unary() }; continue; }
      return b;
    }
  }
  function atom() {
    const t = next();
    if (!t) throw new Error('La expresión está incompleta');
    if (t.t === 'n') return { k: 'num', v: t.v };
    if (t.t === 'root') return { k: 'root', x: atom() };
    if (t.t === 'open') { const x = expr(); const c = next(); if (!c || c.t !== 'close') throw new Error('Falta cerrar un paréntesis'); return { k: 'par', x, br: t.v }; }
    throw new Error('Expresión no válida');
  }
  const tree = expr();
  if (p < tk.length) throw new Error('Sobran símbolos en la expresión');
  return tree;
}

const apply = (op, a, b) => {
  if (op === '+') return a + b; if (op === '-') return a - b; if (op === '*') return a * b;
  if (op === '/') { if (b === 0) throw new Error('División entre cero'); return a / b; }
  return Math.pow(a, b);
};

export function evaluate(src) {
  const ev = (n) => {
    if (n.k === 'num') return n.v; if (n.k === 'par') return ev(n.x); if (n.k === 'neg') return -ev(n.x);
    if (n.k === 'root') { const v = ev(n.x); if (v < 0) throw new Error('Raíz de un negativo'); return Math.sqrt(v); }
    return apply(n.op, ev(n.l), ev(n.r));
  };
  return ev(parse(src));
}

// ---- impresión ----
function show(n, mark, ctx = {}) {
  const wrap = (s) => (n === mark ? `<mark>${s}</mark>` : s);
  if (n.k === 'num') { const s = fmtN(n.v); return n.v < 0 && ctx.paren ? `(${s})` : s; }
  if (n.k === 'par') return wrap(`${n.br}${show(n.x, mark)}${OPEN[n.br]}`);
  if (n.k === 'neg') return wrap(`−${show(n.x, mark, { paren: true })}`);
  if (n.k === 'root') return wrap(`√${n.x.k === 'num' || n.x.k === 'par' ? show(n.x, mark, { paren: true }) : `(${show(n.x, mark)})`}`);
  const sym = { '+': '+', '-': '−', '*': '×', '/': '÷', '^': '^' }[n.op];
  const l = show(n.l, mark, { paren: n.op === '^' });
  const r = n.op === '^' ? `<sup>${show(n.r, mark, { paren: true })}</sup>` : show(n.r, mark, { paren: true });
  return wrap(n.op === '^' ? `${l}${r}` : `${l} ${sym} ${r}`);
}

// quita paréntesis que solo contienen un número y resuelve negativos simples (sin paso visible)
function tidy(n) {
  if (n.k === 'par') { const x = tidy(n.x); return x.k === 'num' ? x : { ...n, x }; }
  if (n.k === 'neg') { const x = tidy(n.x); return x.k === 'num' ? { k: 'num', v: -x.v } : { ...n, x }; }
  if (n.k === 'root') return { ...n, x: tidy(n.x) };
  if (n.k === 'bin') return { ...n, l: tidy(n.l), r: tidy(n.r) };
  return n;
}

function reducibles(n, depth = 0, out = []) {
  if (n.k === 'par') reducibles(n.x, depth + 1, out);
  else if (n.k === 'neg') reducibles(n.x, depth, out);
  else if (n.k === 'root') { reducibles(n.x, depth, out); if (n.x.k === 'num') out.push({ n, depth, rank: 0 }); }
  else if (n.k === 'bin') {
    reducibles(n.l, depth, out); reducibles(n.r, depth, out);
    if (n.l.k === 'num' && n.r.k === 'num') out.push({ n, depth, rank: n.op === '^' ? 0 : (n.op === '*' || n.op === '/') ? 1 : 2 });
  }
  return out;
}

function replace(n, target, val) {
  if (n === target) return { k: 'num', v: val };
  if (n.k === 'par' || n.k === 'neg' || n.k === 'root') return { ...n, x: replace(n.x, target, val) };
  if (n.k === 'bin') return { ...n, l: replace(n.l, target, val), r: replace(n.r, target, val) };
  return n;
}

const NOTE = ['Potencias y raíces', 'Multiplicación y división, de izquierda a derecha', 'Suma y resta, de izquierda a derecha'];

// Devuelve [{html, note}] con el subpaso marcado, y el último con el resultado.
export function steps(src) {
  let tree = tidy(parse(src)); const out = [];
  for (let guard = 0; guard < 60; guard++) {
    if (tree.k === 'num') { out.push({ html: `<b>${fmtN(tree.v)}</b>`, note: 'Resultado' }); return out; }
    const cand = reducibles(tree);
    if (!cand.length) throw new Error('No se pudo resolver');
    cand.sort((a, b) => b.depth - a.depth || a.rank - b.rank);   // sort estable: queda la más a la izquierda
    const c = cand[0];
    const val = c.n.k === 'root' ? Math.sqrt(c.n.x.v) : apply(c.n.op, c.n.l.v, c.n.r.v);
    out.push({ html: show(tree, c.n), note: (c.depth > 0 ? 'Dentro de la agrupación: ' : '') + NOTE[c.rank].toLowerCase().replace(/^./, (x) => x.toUpperCase()) });
    tree = tidy(replace(tree, c.n, val));
  }
  throw new Error('Expresión demasiado larga');
}

export const pretty = (src) => { try { return show(tidy(parse(src))); } catch { return src; } };
