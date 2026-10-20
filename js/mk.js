// Constructores para escribir módulos de forma compacta.
export const lesson = (t, sub, blocks, take, nav) => ({ type: 'lesson', t, sub, blocks, take, nav });
export const def = (h, p) => ({ k: 'def', h, p });
export const ex = (p, h) => ({ k: 'ex', h, p });
export const ana = (p, h) => ({ k: 'ana', h, p });
export const warn = (p, h) => ({ k: 'warn', h, p });
export const it = (h, p) => ({ k: 'it', h, p });
export const p = (s) => ({ k: 'p', s });
export const md = (s) => ({ k: 'md', s });
export const img = (src, alt) => ({ k: 'img', src, alt });
export const flow = (items, label) => ({ k: 'ill', kind: 'flow', items, label });
export const tiles = (items) => ({ k: 'tiles', items });
export const tbl = (head, rows) => ({ k: 'tbl', head, rows });
export const steps = (t, list) => ({ k: 'steps', t, steps: list });
export const words = (items) => ({ k: 'words', items });
export const vis = (rows, cap) => ({ k: 'vis', rows, cap });
export const alt = (p, h) => ({ k: 'alt', h, p });
export const viz =(name, h, extra = {}) => ({ k: 'viz', name, h, ...extra });

export const guia = (t, sub, steps, intro, nav) => ({ type: 'guia', t, sub, steps, intro, nav });
export const match =(t, sub, rows, options, nav) => ({ type: 'match', t, sub, rows, options, nav });
export const mc = (t, sub, qs, nav) => ({ type: 'mc', t, sub, qs, nav });
export const order = (t, sub, items, nav) => ({ type: 'order', t, sub, items, nav });
export const cloze = (t, sub, tpl, blanks, nav) => ({ type: 'cloze', t, sub, tpl, blanks, nav });
export const gen = (t, sub, name, n = 5, nav) => ({ type: 'gen', t, sub, gen: name, n, nav });
export const tt = (t, sub, vars, cols, hint, nav) => ({ type: 'tt', t, sub, vars, cols, hint, nav });
export const abaco = (t, sub, targets, rods = 4, nav) => ({ type: 'abaco', t, sub, targets, rods, nav });
export const write = (t, sub, prompt, crit, min, take, nav) => ({ type: 'write', t, sub, prompt, crit, min, take, nav });
export const practica = (o) => ({ type: 'practica', nav: 'Práctica final', ...o });
