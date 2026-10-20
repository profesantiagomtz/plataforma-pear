// Pase de lista: lista del grupo en orden alfabético por apellidos.
import { sb, esc, $, $$, toast, downloadCSV, bySurname, listName, todayStr, parseDay, dayName, run } from './ui.js';

const ST = { P: ['✔', 'Asistió', 'ok'], R: ['⏰', 'Retardo', 'warn'], F: ['✖', 'Faltó', 'bad'], J: ['📝', 'Justificó', 'info'] };
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fday = (d) => { const x = parseDay(d); return `${dayName(d)} ${x.getDate()} ${MESES[x.getMonth()]}`; };

export async function asistencia(el) {
  const [{ data: studs }, { data: groups }, { data: sch }, { data: rows }] = await Promise.all([
    sb.from('profiles').select('id,full_name,nombres,apellido_p,apellido_m,matricula,group_id,active').eq('role', 'student').eq('active', true),
    sb.from('groups').select('*').order('name'),
    sb.from('schedule').select('day,label,kind').in('kind', ['clase', 'encuadre', 'ae', 'repaso']).order('day'),
    sb.from('attendance').select('student_id,day,status'),
  ]);
  studs.sort(bySurname);
  const dayLabels = {}; sch.forEach((s) => { (dayLabels[s.day] ||= new Set()).add(s.label.replace(/^Sesión /, '').replace(/\)$/, '')); });
  const days = Object.keys(dayLabels).sort();
  const att = new Map(); rows.forEach((r) => att.set(r.student_id + r.day, r.status));
  const today = todayStr();
  let day = days.includes(today) ? today : ([...days].reverse().find((d) => d <= today) || days[0]); let tab = 'dia'; let fg = '';

  const list = () => studs.filter((s) => !fg || s.group_id === fg);
  const numbered = () => list().map((s, i) => ({ s, n: i + 1 }));
  const markedDays = () => days.filter((d) => rows.some((r) => r.day === d) || [...att.keys()].some((k) => k.endsWith(d)));

  const set = async (s, st) => {
    const key = s.id + day; const cur = att.get(key);
    if (cur === st) { att.delete(key); const { error } = await sb.from('attendance').delete().eq('student_id', s.id).eq('day', day); if (error) throw error; rows.splice(rows.findIndex((r) => r.student_id === s.id && r.day === day), 1); }
    else { att.set(key, st); const { error } = await sb.from('attendance').upsert({ student_id: s.id, day, status: st, updated_at: new Date().toISOString() }); if (error) { att.set(key, cur); throw error; } const i = rows.findIndex((r) => r.student_id === s.id && r.day === day); if (i >= 0) rows[i].status = st; else rows.push({ student_id: s.id, day, status: st }); }
  };

  const drawDay = () => {
    const L = numbered(); const counts = { P: 0, R: 0, F: 0, J: 0, none: 0 }; L.forEach(({ s }) => { const v = att.get(s.id + day); if (v) counts[v]++; else counts.none++; });
    $('#chips', el).innerHTML = `<span class="chip">✔ Asistieron: <b>${counts.P}</b></span><span class="chip">⏰ Retardos: <b>${counts.R}</b></span><span class="chip">✖ Faltas: <b>${counts.F}</b></span><span class="chip">📝 Justificadas: <b>${counts.J}</b></span><span class="chip">Sin pasar: <b>${counts.none}</b></span>`;
    $('#dtb', el).innerHTML = L.length ? L.map(({ s, n }) => { const v = att.get(s.id + day); return `<tr><td class="num"><b>${n}</b></td><td><b>${esc(listName(s))}</b><div class="muted small">${esc(s.matricula || '')}</div></td><td class="att">${Object.entries(ST).map(([k, [ic, tx, cl]]) => `<button class="ab ${v === k ? 'on ' + cl : ''}" data-s="${s.id}" data-k="${k}" title="${tx}"><span>${ic}</span><small>${tx}</small></button>`).join('')}</td></tr>`; }).join('') : '<tr><td colspan="3"><div class="empty">Aún no hay alumnos registrados.</div></td></tr>';
  };

  const drawSum = () => {
    const md = markedDays();
    $('#stb', el).innerHTML = numbered().map(({ s, n }) => { const c = { P: 0, R: 0, F: 0, J: 0 }; md.forEach((d) => { const v = att.get(s.id + d); if (v) c[v]++; }); const tot = c.P + c.R + c.F + c.J; const pct = tot ? Math.round((c.P + c.R + c.J) / tot * 100) : null;
      return `<tr><td class="num">${n}</td><td><b>${esc(listName(s))}</b></td><td class="num">${c.P}</td><td class="num">${c.R}</td><td class="num">${c.F}</td><td class="num">${c.J}</td><td class="num">${pct == null ? '—' : `<span class="badge ${pct >= 80 ? 'ok' : pct >= 60 ? 'warn' : 'bad'}">${pct} %</span>`}</td></tr>`; }).join('') || '<tr><td colspan="7"><div class="empty">Sin alumnos.</div></td></tr>';
    $('#sinfo', el).textContent = `${md.length} día(s) con lista pasada`;
  };

  const exportCSV = () => { const md = markedDays(); downloadCSV('asistencia-pear.csv', [['No.', 'Matrícula', 'Apellidos y nombre', ...md.map(fday), 'Asistencias', 'Retardos', 'Faltas', 'Justificadas', '% asistencia'],
    ...numbered().map(({ s, n }) => { const vals = md.map((d) => att.get(s.id + d) || ''); const c = (k) => vals.filter((v) => v === k).length; const tot = vals.filter(Boolean).length; return [n, s.matricula || '', listName(s), ...vals, c('P'), c('R'), c('F'), c('J'), tot ? Math.round((c('P') + c('R') + c('J')) / tot * 100) : '']; })]); };

  const shell = () => {
    el.innerHTML = `<div class="head"><h1>Pase de lista</h1><span class="muted small">Lista del grupo, en orden alfabético por apellidos</span></div>
      <div class="tabs"><button data-t="dia" class="${tab === 'dia' ? 'on' : ''}">📅 Pasar lista</button><button data-t="sum" class="${tab === 'sum' ? 'on' : ''}">📊 Resumen</button></div>
      <div class="toolbar"><select id="g"><option value="">Todos los grupos</option>${groups.map((g) => `<option value="${g.id}" ${g.id === fg ? 'selected' : ''}>${esc(g.name)}</option>`).join('')}</select>
        ${tab === 'dia' ? `<select id="d">${days.map((d) => `<option value="${d}" ${d === day ? 'selected' : ''}>${fday(d)} · ${esc([...dayLabels[d]].join(', '))}${rows.some((r) => r.day === d) ? ' ✔' : ''}</option>`).join('')}</select><button class="btn soft" id="allp">✅ Todos presentes</button><button class="btn ghost" id="clr">🧹 Limpiar el día</button>` : '<button class="btn soft" id="csv">⬇️ Descargar CSV</button>'}</div>
      ${tab === 'dia' ? `<div class="chips" id="chips" style="margin-bottom:10px"></div><p class="muted small">Toca el estado de cada alumno: <b>✔ asistió · ⏰ retardo · ✖ faltó · 📝 justificó</b>. Se guarda al instante. Si tocas el mismo botón otra vez, se quita.</p>
        <div class="tablewrap"><table><thead><tr><th class="num">No.</th><th>Apellidos y nombre</th><th>Asistencia</th></tr></thead><tbody id="dtb"></tbody></table></div>`
      : `<p class="muted small" id="sinfo"></p><div class="tablewrap"><table><thead><tr><th class="num">No.</th><th>Apellidos y nombre</th><th class="num">✔</th><th class="num">⏰</th><th class="num">✖</th><th class="num">📝</th><th class="num">% asistencia</th></tr></thead><tbody id="stb"></tbody></table></div><p class="muted small">El % cuenta asistencias, retardos y justificadas sobre los días en que ya se pasó lista.</p>`}`;
    $$('.tabs button', el).forEach((b) => b.onclick = () => { tab = b.dataset.t; shell(); });
    $('#g', el).onchange = (e) => { fg = e.target.value; shell(); };
    if (tab === 'dia') {
      $('#d', el).onchange = (e) => { day = e.target.value; shell(); };
      $('#allp', el).onclick = (ev) => run(ev.target, async () => { const todo = list().filter((s) => !att.get(s.id + day)); if (!todo.length) return toast('Todos ya tienen asistencia marcada'); const payload = todo.map((s) => ({ student_id: s.id, day, status: 'P', updated_at: new Date().toISOString() })); const { error } = await sb.from('attendance').upsert(payload); if (error) throw error; todo.forEach((s) => { att.set(s.id + day, 'P'); rows.push({ student_id: s.id, day, status: 'P' }); }); drawDay(); toast('Listo: marcados como presentes', 'ok'); });
      $('#clr', el).onclick = (ev) => run(ev.target, async () => { const ids = list().map((s) => s.id); const { error } = await sb.from('attendance').delete().eq('day', day).in('student_id', ids); if (error) throw error; ids.forEach((id) => att.delete(id + day)); for (let i = rows.length - 1; i >= 0; i--) if (rows[i].day === day && ids.includes(rows[i].student_id)) rows.splice(i, 1); drawDay(); });
      $('#dtb', el).onclick = (e) => { const b = e.target.closest('.ab'); if (!b) return; const s = studs.find((x) => x.id === b.dataset.s); set(s, b.dataset.k).then(drawDay).catch((er) => toast(er.message, 'err')); };
      drawDay();
    } else { $('#csv', el).onclick = exportCSV; drawSum(); }
  };
  shell();
}
