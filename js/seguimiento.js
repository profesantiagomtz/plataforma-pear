// Seguimiento completo de alumnos: tabla general con alertas + expediente individual.
import { sb, esc, $, $$, fmtDateTime, computeGrades, fmtNum, bySurname, listName } from './ui.js';
import { describe, ago, fmtSecs, plain } from './live.js';

const KINDNAME = { intro: 'Inicio', lesson: 'Lección', match: 'Actividad', mc: 'Repaso', order: 'Actividad', cloze: 'Actividad', gen: 'Práctica', tt: 'Actividad', abaco: 'Actividad', write: 'Actividad', practica: 'Práctica final' };
const empty = (t) => `<div class="empty">${esc(t)}</div>`;
const days = (d) => Math.floor((Date.now() - new Date(d).getTime()) / 86400000);

// ---------- cálculo por alumno (compartido con el Panel) ----------
export async function loadSeguimiento() {
  const [{ data: studs }, { data: prog }, { data: subs }, { data: asg }, { data: units }, { data: evs }, { data: groups }] = await Promise.all([
    sb.from('profiles').select('id,full_name,nombres,apellido_p,apellido_m,email,matricula,group_id,active,profile_done,must_change_password,created_at').eq('role', 'student').eq('active', true),
    sb.from('module_progress').select('student_id,module,pct,done,updated_at'),
    sb.from('submissions').select('assignment_id,student_id,score,submitted_at'),
    sb.from('assignments').select('id,title,unit_id,group_id,due_at,max_score,is_ae,published'),
    sb.from('units').select('id,code,title,weight').order('ord'),
    sb.from('activity_log').select('student_id,kind,created_at').order('created_at', { ascending: false }).limit(4000),
    sb.from('groups').select('*').order('name'),
  ]);
  studs.sort(bySurname);
  const D = { studs, units, asg, groups, prog: new Map(), subs: new Map(), last: new Map() };
  prog.forEach((p) => { if (!D.prog.has(p.student_id)) D.prog.set(p.student_id, []); D.prog.get(p.student_id).push(p); });
  subs.forEach((s) => { if (!D.subs.has(s.student_id)) D.subs.set(s.student_id, []); D.subs.get(s.student_id).push(s); });
  (evs || []).forEach((e) => { if (!D.last.has(e.student_id)) D.last.set(e.student_id, e.created_at); });
  return D;
}

export function statsFor(s, D) {
  const pr = D.prog.get(s.id) || []; const mine = D.subs.get(s.id) || [];
  const avg = Math.round(pr.reduce((t, p) => t + (p.pct || 0), 0) / (D.units.length || 7));
  let secs = 0, rv = 0, struggles = 0, skipped = 0;
  pr.forEach((p) => Object.values(p.done || {}).forEach((d) => { secs += d.t || 0; rv += d.rv || 0; if ((d.f || 0) >= 3) struggles++; if (d.sk) skipped++; }));
  const applies = D.asg.filter((a) => a.published && (!a.group_id || a.group_id === s.group_id));
  const done = new Set(mine.map((x) => x.assignment_id));
  const overdue = applies.filter((a) => a.due_at && new Date(a.due_at) < new Date() && !done.has(a.id));
  const grades = computeGrades(D.units, applies, mine);
  const lastP = pr.map((p) => p.updated_at).sort().pop(); const lastE = D.last.get(s.id);
  const last = [lastP, lastE].filter(Boolean).sort().pop() || null;
  const alerts = [];
  if (!s.profile_done) alerts.push({ sev: 'info', t: 'Perfil pendiente (falta matrícula)' });
  if (!last) alerts.push({ sev: days(s.created_at) >= 2 ? 'bad' : 'warn', t: 'Nunca ha trabajado en la plataforma' });
  else if (days(last) >= 7) alerts.push({ sev: 'bad', t: `Sin actividad hace ${days(last)} días` });
  else if (days(last) >= 4) alerts.push({ sev: 'warn', t: `Sin actividad hace ${days(last)} días` });
  if (overdue.length) alerts.push({ sev: 'bad', t: `${overdue.length} tarea(s) vencida(s) sin entregar` });
  if (struggles) alerts.push({ sev: 'warn', t: `Se atora en ${struggles} actividad(es) (3+ fallos)` });
  if (rv >= 5) alerts.push({ sev: 'warn', t: `Pide ver respuestas seguido (${rv} veces)` });
  if (skipped) alerts.push({ sev: 'info', t: `Saltó ${skipped} actividad(es)` });
  const sev = alerts.some((a) => a.sev === 'bad') ? 2 : alerts.some((a) => a.sev === 'warn') ? 1 : 0;
  return { avg, secs, rv, struggles, skipped, applies, done: applies.filter((a) => done.has(a.id)).length, overdue: overdue.length, pts: grades.total, grades, last, alerts, sev };
}
export const alertBadges = (al) => (al.length ? al.map((a) => `<span class="badge ${a.sev}" title="${esc(a.t)}">${esc(a.t)}</span>`).join(' ') : '<span class="badge ok">✔ Sin alertas</span>');

// ---------- tabla general ----------
export async function seguimiento(el, { param } = {}, tools = {}) {
  if (param?.[0]) return expediente(el, param[0], tools);
  const D = await loadSeguimiento();
  let fg = '', sort = 'atencion', q = '';
  const mods = D.units.map((u) => 'm1-' + u.code.split('.')[1]);
  const draw = () => {
    let rows = D.studs.filter((s) => (!fg || s.group_id === fg) && (!q || (s.full_name + s.email + (s.matricula || '')).toLowerCase().includes(q))).map((s) => ({ s, st: statsFor(s, D) }));
    rows.sort((a, b) => sort === 'atencion' ? b.st.sev - a.st.sev || a.st.avg - b.st.avg : sort === 'avance' ? a.st.avg - b.st.avg : sort === 'nota' ? b.st.pts - a.st.pts : sort === 'reciente' ? (b.st.last || '').localeCompare(a.st.last || '') : bySurname(a.s, b.s));
    const pend = rows.filter((r) => r.st.sev === 2).length;
    $('#sum', el).innerHTML = `<div class="stat"><b>${rows.length}</b><span>Alumnos</span></div><div class="stat"><b>${rows.length ? Math.round(rows.reduce((t, r) => t + r.st.avg, 0) / rows.length) : 0} %</b><span>Avance promedio</span></div><div class="stat"><b>${pend}</b><span>Necesitan atención</span></div><div class="stat"><b>${rows.filter((r) => r.st.last && days(r.st.last) < 1).length}</b><span>Activos hoy</span></div>`;
    $('#tb', el).innerHTML = rows.map(({ s, st }) => `<tr><td><a href="#/avance/${s.id}"><b>${esc(listName(s))}</b></a><div class="muted small">${s.matricula ? '🪪 ' + esc(s.matricula) : 'sin matrícula'}</div></td>
      <td class="num"><b>${st.avg} %</b><div class="bar" style="width:70px;margin:4px auto 0"><i style="width:${st.avg}%"></i></div></td>
      <td class="num"><b>${fmtNum(st.pts)}</b><span class="muted small"> / 100</span></td><td class="num">${st.done}/${st.applies.length}</td>
      <td class="small">${st.last ? ago(st.last) : '<span class="muted">nunca</span>'}</td><td class="small">${st.secs ? fmtSecs(st.secs) : '—'}</td>
      ${mods.map((m) => { const p = (D.prog.get(s.id) || []).find((x) => x.module === m); return `<td class="num">${p ? `<span class="badge ${p.pct >= 100 ? 'ok' : p.pct > 0 ? 'info' : ''}">${p.pct}</span>` : '<span class="muted">·</span>'}</td>`; }).join('')}
      <td>${alertBadges(st.alerts)}</td></tr>`).join('') || `<tr><td colspan="${7 + mods.length}">${empty('Sin alumnos')}</td></tr>`;
  };
  el.innerHTML = `<div class="head"><h1>Seguimiento de alumnos</h1><span class="badge ok">● se actualiza solo</span></div>
    <div class="stats" id="sum"></div>
    <div class="toolbar"><input id="q" type="search" placeholder="Buscar nombre, correo o matrícula"><select id="g"><option value="">Todos los grupos</option>${D.groups.map((g) => `<option value="${g.id}">${esc(g.name)}</option>`).join('')}</select>
      <select id="o"><option value="atencion">Ordenar: necesitan atención primero</option><option value="nombre">Ordenar: nombre</option><option value="avance">Ordenar: menor avance</option><option value="nota">Ordenar: mejor nota</option><option value="reciente">Ordenar: actividad reciente</option></select></div>
    <p class="muted small">Toca el nombre de un alumno para ver su <b>expediente completo</b>. Las columnas <b>1.1 a 1.7</b> son el % de avance en cada módulo.</p>
    <div class="tablewrap"><table><thead><tr><th>Alumno</th><th class="num">Avance</th><th class="num">Nota</th><th class="num">Tareas</th><th>Último acceso</th><th>Tiempo</th>${D.units.map((u) => `<th class="num">${esc(u.code)}</th>`).join('')}<th>Alertas</th></tr></thead><tbody id="tb"></tbody></table></div>`;
  $('#q', el).oninput = (e) => { q = e.target.value.toLowerCase(); draw(); };
  $('#g', el).onchange = (e) => { fg = e.target.value; draw(); };
  $('#o', el).onchange = (e) => { sort = e.target.value; draw(); };
  draw();
  const ch = sb.channel('seg-' + Math.random().toString(36).slice(2))
    .on('postgres_changes', { event: '*', schema: 'public', table: 'module_progress' }, (p) => { const r = p.new; if (!r?.student_id) return; const arr = D.prog.get(r.student_id) || []; const i = arr.findIndex((x) => x.module === r.module); if (i >= 0) arr[i] = r; else arr.push(r); D.prog.set(r.student_id, arr); draw(); })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activity_log' }, (p) => { D.last.set(p.new.student_id, p.new.created_at); draw(); })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'submissions' }, (p) => { const r = p.new; if (!r?.student_id) return; const arr = (D.subs.get(r.student_id) || []).filter((x) => x.assignment_id !== r.assignment_id); arr.push(r); D.subs.set(r.student_id, arr); draw(); })
    .subscribe();
  const t = setInterval(() => { if (!el.isConnected) { clearInterval(t); sb.removeChannel(ch); } else draw(); }, 20000);
}

// ---------- expediente individual ----------
async function expediente(el, id, tools) {
  const [{ data: s }, D, { data: ev }] = await Promise.all([
    sb.from('profiles').select('*').eq('id', id).maybeSingle(), loadSeguimiento(),
    sb.from('activity_log').select('*').eq('student_id', id).order('created_at', { ascending: false }).limit(400),
  ]);
  if (!s) { el.innerHTML = empty('Alumno no encontrado.'); return; }
  const st = statsFor(s, D); const grp = D.groups.find((g) => g.id === s.group_id);
  const reload = () => expediente(el, id, tools);
  const mine = D.subs.get(id) || []; const smap = new Map(mine.map((x) => [x.assignment_id, x]));
  const { data: subFull } = await sb.from('submissions').select('assignment_id,score,feedback,submitted_at').eq('student_id', id);
  const sf = new Map((subFull || []).map((x) => [x.assignment_id, x]));
  const uname = Object.fromEntries(D.units.map((u) => [u.id, u.code]));

  // calificaciones por propósito
  const gradeRows = D.units.map((u) => { const g = st.grades.perUnit[u.id]; const aes = st.applies.filter((a) => a.unit_id === u.id && a.is_ae);
    return `<tr><td><span class="code">${esc(u.code)}</span> ${esc(u.title)}</td><td class="num">${aes.length ? aes.map((a) => { const x = sf.get(a.id); return x ? (x.score != null ? `${fmtNum(x.score)}/${a.max_score}` : 'entregada') : 'sin entregar'; }).join(', ') : '<span class="muted">sin tarea publicada</span>'}</td><td class="num">${g.graded ? `<b>${fmtNum(g.pts)}</b>` : '—'} / ${u.weight}</td></tr>`; }).join('');
  // tareas
  const taskRows = st.applies.sort((a, b) => (a.due_at || '9').localeCompare(b.due_at || '9')).map((a) => { const x = sf.get(a.id); const late = a.due_at && x && new Date(x.submitted_at) > new Date(a.due_at); const over = a.due_at && !x && new Date(a.due_at) < new Date();
    const state = x ? (x.score != null ? `<span class="badge ok">Calificada ${fmtNum(x.score)}/${a.max_score}</span>` : '<span class="badge info">Entregada · por calificar</span>') : over ? '<span class="badge bad">Vencida sin entregar</span>' : '<span class="badge warn">Pendiente</span>';
    return `<tr><td>${esc(a.title)}${a.is_ae ? ' <span class="badge warn">Evaluación</span>' : ''}<div class="muted small">${uname[a.unit_id] ? 'Propósito ' + uname[a.unit_id] : ''}</div></td><td class="small">${a.due_at ? fmtDateTime(a.due_at) : 'sin fecha'}</td><td>${state}${late ? ' <span class="badge bad">Tarde</span>' : ''}${x?.feedback ? `<div class="muted small">💬 ${esc(x.feedback)}</div>` : ''}</td><td class="small">${x ? fmtDateTime(x.submitted_at) : '—'}</td><td class="right"><a class="btn soft sm" href="#/entregas/${a.id}">${x ? 'Revisar' : 'Abrir'}</a></td></tr>`; }).join('');
  // módulos
  const prog = D.prog.get(id) || []; const pm = Object.fromEntries(prog.map((p) => [p.module, p])); const blocks = [];
  for (const u of D.units) {
    const mid = 'm1-' + u.code.split('.')[1]; const p = pm[mid]; let mod; try { mod = (await import(`../content/${mid}.js`)).default; } catch { continue; }
    const pages = [{ type: 'intro', t: 'Inicio' }, ...mod.pages]; const done = p?.done || {};
    const rows = pages.map((pg, k) => { const d = done[k]; let state;
      if (!d) state = '<span class="badge">⏳ Pendiente</span>';
      else if (pg.type === 'intro') state = '<span class="badge ok">✅ Entró</span>';
      else if (pg.type === 'lesson') state = d.r ? '<span class="badge ok">📖 Leída</span>' : '<span class="badge info">Empezó</span>';
      else if (pg.type === 'practica') { const c = d.c || []; const n = c.filter(Boolean).length; state = `<span class="badge ${n === c.length && n ? 'ok' : 'info'}">📝 ${n}/${pg.steps.length} pasos</span>`; }
      else if (d.sk) state = '<span class="badge warn">⏭️ Saltada</span>';
      else if ((d.s || 0) >= 0.6) state = '<span class="badge ok">✅ Superada</span>';
      else if (d.rv) state = '<span class="badge warn">👀 Vio respuestas</span>';
      else if (d.f) state = `<span class="badge bad">🔁 ${d.f} fallo(s)</span>`;
      else state = '<span class="badge info">Empezó</span>';
      return `<tr><td class="num">${k + 1}</td><td>${esc(KINDNAME[pg.type] || '')}</td><td>${esc(plain(pg.t))}</td><td>${state}</td><td class="num">${d?.a || '—'}</td><td class="num">${d?.rv || '—'}</td><td class="num">${d?.t ? fmtSecs(d.t) : '—'}</td></tr>`; }).join('');
    const tsecs = Object.values(done).reduce((a, d) => a + (d.t || 0), 0);
    blocks.push(`<details class="card" ${p ? 'open' : ''}><summary style="cursor:pointer;font-weight:700"><span class="code">${esc(u.code)}</span> ${esc(u.title)} <span class="badge ${p?.pct >= 100 ? 'ok' : 'brand'}">${p?.pct || 0} %</span> <span class="muted small">${tsecs ? '· ' + fmtSecs(tsecs) : '· sin empezar'}</span></summary>
      <div class="tablewrap" style="margin-top:10px"><table><thead><tr><th class="num">#</th><th>Tipo</th><th>Parte</th><th>Estado</th><th class="num">Intentos</th><th class="num">Vio resp.</th><th class="num">Tiempo</th></tr></thead><tbody>${rows}</tbody></table></div></details>`);
  }
  const opened = ev.filter((e) => e.kind === 'open_material');
  const logins = ev.filter((e) => e.kind === 'login');
  let all = false;
  const feedHtml = () => { const list = ev.filter((e) => all || describe(e).imp).slice(0, 150); return list.length ? list.map((e) => { const d = describe(e); return `<div class="fi ${d.imp ? '' : 'minor'}"><span class="fic">${d.icon}</span><div class="grow">${esc(d.text)}</div><span class="muted small" title="${fmtDateTime(e.created_at)}">${ago(e.created_at)}</span></div>`; }).join('') : '<div class="empty">Sin actividad todavía.</div>'; };

  el.innerHTML = `<p><a href="#/avance">← Seguimiento</a></p>
    <div class="card"><div class="head" style="margin-bottom:6px"><h1 style="margin:0">${esc(s.full_name)}</h1>
      <button class="btn soft sm" id="rp">🔑 Restablecer contraseña</button><button class="btn ghost sm" id="ed">✏️ Editar</button></div>
      <div class="muted">${esc(s.email)}</div>
      <div class="chips" style="margin-top:8px"><span class="chip">🪪 ${s.matricula ? esc(s.matricula) : 'sin matrícula'}</span><span class="chip">👥 Grupo ${esc(grp?.name || '—')}</span>${s.must_change_password ? '<span class="chip">🔐 Aún con contraseña temporal</span>' : '<span class="chip">🔐 Contraseña propia</span>'}${s.profile_done ? '' : '<span class="chip">Perfil pendiente</span>'}</div></div>
    <div class="card"><h2>⚠️ Alertas</h2><div>${alertBadges(st.alerts)}</div></div>
    <div class="stats"><div class="stat"><b>${st.avg} %</b><span>Avance en módulos</span></div><div class="stat"><b>${fmtNum(st.pts)}</b><span>Puntos acumulados de 100</span></div><div class="stat"><b>${st.done}/${st.applies.length}</b><span>Tareas entregadas</span></div><div class="stat"><b>${fmtSecs(st.secs)}</b><span>Tiempo en módulos</span></div><div class="stat"><b>${st.last ? ago(st.last) : 'nunca'}</b><span>Último acceso</span></div><div class="stat"><b>${logins.length}</b><span>Ingresos (últimos 400 eventos)</span></div></div>
    <div class="card"><h2>📊 Calificación por propósito</h2><div class="tablewrap"><table><thead><tr><th>Propósito</th><th class="num">Evaluación</th><th class="num">Puntos</th></tr></thead><tbody>${gradeRows}<tr><td><b>Total</b></td><td></td><td class="num"><b>${fmtNum(st.pts)}</b> / 100</td></tr></tbody></table></div></div>
    <div class="card"><h2>✅ Tareas</h2>${taskRows ? `<div class="tablewrap"><table><thead><tr><th>Tarea</th><th>Vence</th><th>Estado</th><th>Entregada</th><th></th></tr></thead><tbody>${taskRows}</tbody></table></div>` : '<div class="empty">Aún no hay tareas publicadas para este alumno.</div>'}</div>
    <h2 style="margin:18px 0 8px">🎓 Módulos interactivos</h2>${blocks.join('')}
    <div class="card"><h2>📂 Materiales que ha abierto</h2>${opened.length ? [...new Set(opened.map((e) => e.detail?.title))].map((t) => `<div class="fi"><span class="fic">📂</span><div class="grow">${esc(t)} <span class="muted small">· ${opened.filter((e) => e.detail?.title === t).length} vez/veces</span></div></div>`).join('') : '<div class="empty">Todavía no ha abierto material.</div>'}</div>
    <div class="card"><div class="head" style="margin-bottom:6px"><h2 style="margin:0;flex:1">🕒 Historial de actividad</h2><label class="check" style="margin:0"><input type="checkbox" id="all"> Mostrar también cada página que visita</label></div><div class="feed" id="feed">${feedHtml()}</div></div>`;
  $('#all', el).onchange = (e) => { all = e.target.checked; $('#feed', el).innerHTML = feedHtml(); };
  $('#rp', el).onclick = () => tools.resetPw?.(s, reload);
  $('#ed', el).onclick = () => tools.editStudent?.(s, D.groups, reload);
  const ch = sb.channel('exp-' + id + Math.random().toString(36).slice(2)).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activity_log', filter: `student_id=eq.${id}` }, (p) => { ev.unshift(p.new); $('#feed', el) && ($('#feed', el).innerHTML = feedHtml()); }).subscribe();
  const t = setInterval(() => { if (!el.isConnected) { clearInterval(t); sb.removeChannel(ch); } }, 5000);
}
