import { SUPABASE_URL, SUPABASE_KEY } from './config.js';

export const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const $ = (sel, el = document) => el.querySelector(sel);
export const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const DIAS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
export const fmtDate = (d) => { if (!d) return '—'; const x = new Date(d); return `${x.getDate()} ${MESES[x.getMonth()]} ${x.getFullYear()}`; };
export const fmtDateTime = (d) => { if (!d) return '—'; const x = new Date(d); return `${x.getDate()} ${MESES[x.getMonth()]}, ${String(x.getHours()).padStart(2, '0')}:${String(x.getMinutes()).padStart(2, '0')}`; };
export const dayName = (d) => DIAS[new Date(d + 'T12:00:00').getDay()];
export const parseDay = (s) => new Date(s + 'T12:00:00');
export const todayStr = () => { const x = new Date(); return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`; };
export const toLocalInput = (d) => { if (!d) return ''; const x = new Date(d); x.setMinutes(x.getMinutes() - x.getTimezoneOffset()); return x.toISOString().slice(0, 16); };

export function toast(msg, type = '') {
  const t = document.createElement('div');
  t.className = 'toast ' + type; t.textContent = msg;
  $('#toasts').append(t);
  setTimeout(() => t.remove(), type === 'err' ? 6000 : 3200);
}

// Markdown mínimo y seguro (todo se escapa; imágenes solo de assets/lessons/ o https)
const okImg = (u) => /^assets\/lessons\/[\w.-]+\.(svg|png|jpe?g|webp)$/.test(u) || /^https:\/\/[^\s"']+$/.test(u);
export const mdInline = (t) => esc(t)
  .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (m, a, u) => (okImg(u) ? `<img src="${u}" alt="${a}" loading="lazy">` : ''))
  .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
  .replace(/(^|[^*\w])\*([^*\n]+)\*/g, '$1<i>$2</i>');

export function md(src) {
  const inline = mdInline;
  const lines = String(src ?? '').replace(/\r/g, '').split('\n');
  const out = []; let i = 0;
  const special = (l) => /^(#{1,3} |\||[-*] |\d+\. |> |---$|!\[)/.test(l);
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    let m;
    if ((m = l.match(/^(#{1,3}) (.*)/))) { out.push(`<h${m[1].length + 1}>${inline(m[2])}</h${m[1].length + 1}>`); i++; }
    else if (/^---$/.test(l)) { out.push('<hr>'); i++; }
    else if (l.startsWith('|')) {
      const rows = []; while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++].trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
      const head = rows[0]; const body = rows.slice(/^[\s:-]+$/.test(rows[1]?.join('')) ? 2 : 1);
      out.push(`<div class="tablewrap"><table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
    }
    else if (/^[-*] /.test(l)) { const it = []; while (i < lines.length && /^[-*] /.test(lines[i])) it.push(lines[i++].slice(2)); out.push(`<ul>${it.map((x) => `<li>${inline(x)}</li>`).join('')}</ul>`); }
    else if (/^\d+\. /.test(l)) { const it = []; while (i < lines.length && /^\d+\. /.test(lines[i])) it.push(lines[i++].replace(/^\d+\. /, '')); out.push(`<ol>${it.map((x) => `<li>${inline(x)}</li>`).join('')}</ol>`); }
    else if (l.startsWith('> ')) { const it = []; while (i < lines.length && lines[i].startsWith('> ')) it.push(lines[i++].slice(2)); out.push(`<blockquote>${it.map(inline).join('<br>')}</blockquote>`); }
    else if (/^!\[/.test(l)) { out.push(`<figure>${inline(l)}</figure>`); i++; }
    else { const p = []; while (i < lines.length && lines[i].trim() && !special(lines[i])) p.push(lines[i++]); if (!p.length) { p.push(lines[i++]); } out.push(`<p>${p.map(inline).join('<br>')}</p>`); }
  }
  return out.join('');
}

export function modal(title, html, { onMount, wide } = {}) {
  const bg = document.createElement('div');
  bg.className = 'modal-bg';
  bg.innerHTML = `<div class="modal ${wide ? 'wide' : ''}" role="dialog" aria-modal="true"><div class="mh"><h2>${esc(title)}</h2><button class="x" aria-label="Cerrar">×</button></div><div class="mb">${html}</div></div>`;
  const close = () => bg.remove();
  bg.addEventListener('mousedown', (e) => { if (e.target === bg) close(); });
  $('.x', bg).onclick = close;
  document.body.append(bg);
  onMount?.($('.mb', bg), close);
  return { el: $('.mb', bg), close };
}

export function confirmBox(text, okLabel = 'Aceptar', danger = false) {
  return new Promise((res) => {
    const m = modal('Confirmar', `<p>${esc(text)}</p><div class="foot"><button class="btn ghost" data-no>Cancelar</button><button class="btn ${danger ? 'danger' : ''}" data-ok>${esc(okLabel)}</button></div>`);
    $('[data-no]', m.el).onclick = () => { m.close(); res(false); };
    $('[data-ok]', m.el).onclick = () => { m.close(); res(true); };
  });
}

export async function run(btn, fn) {
  const label = btn?.textContent;
  if (btn) { btn.disabled = true; btn.textContent = '…'; }
  try { return await fn(); }
  catch (e) { toast(e.message || String(e), 'err'); }
  finally { if (btn) { btn.disabled = false; btn.textContent = label; } }
}

export function copy(text) {
  navigator.clipboard?.writeText(text).then(() => toast('Copiado', 'ok'), () => toast('No se pudo copiar', 'err'));
}

export function downloadCSV(name, rows) {
  const q = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const blob = new Blob(['﻿' + rows.map((r) => r.map(q).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export function parseCSV(text) {
  const rows = []; let row = [], cur = '', inQ = false;
  const first = text.split(/\r?\n/)[0] || '';
  const sep = (first.match(/;/g) || []).length > (first.match(/,/g) || []).length ? ';' : (first.includes('\t') ? '\t' : ',');
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) { if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else inQ = false; } else cur += c; }
    else if (c === '"') inQ = true;
    else if (c === sep) { row.push(cur.trim()); cur = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cur.trim()); if (row.some(Boolean)) rows.push(row); row = []; cur = ''; }
    else cur += c;
  }
  row.push(cur.trim()); if (row.some(Boolean)) rows.push(row);
  return rows;
}

export const safeName = (n) => n.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\w.\-]+/g, '_');

export async function signedUrl(bucket, path) {
  const { data, error } = await sb.storage.from(bucket).createSignedUrl(path, 3600);
  if (error) throw error;
  return data.signedUrl;
}

export async function uploadFile(bucket, path, file) {
  if (file.size > 25 * 1024 * 1024) throw new Error('El archivo supera 25 MB');
  const { error } = await sb.storage.from(bucket).upload(path, file, { upsert: true, contentType: file.type || undefined });
  if (error) throw error;
  return path;
}

export const PASS_HELP = 'Mínimo 8 caracteres, con letras y números.';
export const passOk = (p) => p.length >= 8 && /[A-Za-z]/.test(p) && /\d/.test(p);

export const isUrl = (s) => { try { const u = new URL(s); return u.protocol === 'http:' || u.protocol === 'https:'; } catch { return false; } };

// ---- calificaciones (ponderación según el programa) ----
// Cada propósito pondera con sus actividades de evaluación (is_ae). Calificación = suma(prom. AE de la unidad * peso).
export function computeGrades(units, assignments, subs) {
  const bySub = new Map(subs.map((s) => [s.assignment_id, s]));
  let total = 0; const perUnit = {};
  for (const u of units) {
    const aes = assignments.filter((a) => a.unit_id === u.id && a.is_ae);
    const graded = aes.map((a) => ({ a, s: bySub.get(a.id) })).filter((x) => x.s && x.s.score != null);
    let pct = null, pts = 0;
    if (graded.length) {
      pct = graded.reduce((t, x) => t + (x.s.score / x.a.max_score), 0) / aes.length; // las AE sin calificar cuentan 0
      pts = pct * u.weight;
    }
    perUnit[u.id] = { pct, pts, n: aes.length, graded: graded.length };
    total += pts;
  }
  return { perUnit, total };
}
export const fmtNum = (n) => (n == null ? '—' : (Math.round(n * 10) / 10).toString());
