import { sb, esc, $, $$, run, toast, modal, confirmBox, copy, downloadCSV, parseCSV, fmtDate, fmtDateTime, todayStr, parseDay, toLocalInput, signedUrl, uploadFile, safeName, isUrl, computeGrades, fmtNum } from './ui.js';
import { calendarView, profileView, gradeBadge } from './shared.js';
import { material as studentMaterial, tareasPreview } from './student.js';
import { moduloView } from './modulo.js';
import { describe, ago, fmtSecs, plain, watchPresence } from './live.js';

const empty = (t) => `<div class="empty">${esc(t)}</div>`;
const opt = (list, val, label, sel) => list.map((x) => `<option value="${esc(x[val])}" ${x[val] === sel ? 'selected' : ''}>${esc(typeof label === 'function' ? label(x) : x[label])}</option>`).join('');

async function fn(action, payload) {
  const { data, error } = await sb.functions.invoke('admin-users', { body: { action, ...payload } });
  if (error) { let m = error.message; try { m = (await error.context.json()).error || m; } catch { /* noop */ } throw new Error(m); }
  if (data?.error) throw new Error(data.error);
  return data;
}

// ============================ PANEL ============================
async function panel(el) {
  const today = todayStr();
  const [{ data: studs }, { data: subs }, { data: asg }, { data: sch }, { data: groups }, { data: evs }] = await Promise.all([
    sb.from('profiles').select('id,full_name,active,must_change_password,group_id').eq('role', 'student'),
    sb.from('submissions').select('id,assignment_id,student_id,submitted_at,score').order('submitted_at', { ascending: false }),
    sb.from('assignments').select('id,title,published,is_ae'),
    sb.from('schedule').select('*').gte('day', today).order('day').order('ord').limit(8),
    sb.from('groups').select('*'),
    sb.from('activity_log').select('*').order('created_at', { ascending: false }).limit(60),
  ]);
  const active = studs.filter((s) => s.active);
  const toGrade = subs.filter((s) => s.score == null);
  const sn = Object.fromEntries(studs.map((s) => [s.id, s.full_name])); const an = Object.fromEntries(asg.map((a) => [a.id, a.title]));
  const nd = sch[0]?.day; const nItems = sch.filter((s) => s.day === nd);
  el.innerHTML = `<div class="head"><h1>Panel del docente</h1></div>
  <div class="stats">
    <div class="stat"><b>${active.length}</b><span>Alumnos activos</span></div>
    <div class="stat"><b>${toGrade.length}</b><span>Entregas por calificar</span></div>
    <div class="stat"><b>${asg.filter((a) => a.published).length}</b><span>Tareas publicadas</span></div>
    <div class="stat"><b>${active.filter((s) => s.must_change_password).length}</b><span>Sin cambiar contraseña temporal</span></div>
  </div>
  <div class="grid">
    <div class="card"><h2>Por calificar</h2>${toGrade.length ? `<div class="list">${toGrade.slice(0, 8).map((s) => `<a class="item" href="#/entregas/${s.assignment_id}"><div class="grow"><div class="t">${esc(sn[s.student_id] || '—')}</div><div class="muted small">${esc(an[s.assignment_id] || '')} · ${fmtDateTime(s.submitted_at)}</div></div></a>`).join('')}</div>` : empty('Todo calificado ✔')}</div>
    <div class="card"><h2>Próxima sesión</h2>${nd ? `<p><b>${parseDay(nd).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}</b></p>${nItems.map((s) => `<div>• ${esc(s.label)}</div>`).join('')}<p><a href="#/cronograma">Ver cronograma completo →</a></p>` : empty('Sin sesiones próximas')}</div>
    <div class="card"><h2>Actividad reciente <a class="small" href="#/envivo">ver en vivo →</a></h2><div class="feed">${(evs || []).filter((e) => describe(e).imp).slice(0, 10).map((e) => feedItem(e, Object.fromEntries(studs.map((s) => [s.id, s])))).join('') || '<div class="empty">Aún no hay actividad de alumnos.</div>'}</div></div>
    <div class="card"><h2>Accesos rápidos</h2><div class="list">
      <a class="item" href="#/alumnos">👥 Alumnos y contraseñas</a><a class="item" href="#/material">📚 Subir material</a><a class="item" href="#/tareas">✅ Crear tarea</a><a class="item" href="#/notas">📊 Calificaciones</a></div></div>
  </div>`;
}

// ============================ ALUMNOS ============================
async function alumnos(el) {
  const [{ data: studs }, { data: groups }] = await Promise.all([
    sb.from('profiles').select('*').eq('role', 'student').order('full_name'),
    sb.from('groups').select('*').order('name'),
  ]);
  const gn = Object.fromEntries(groups.map((g) => [g.id, g.name]));
  let fg = '', q = '';
  const draw = () => {
    const list = studs.filter((s) => (!fg || s.group_id === fg) && (!q || (s.full_name + s.email).toLowerCase().includes(q)));
    $('#tb', el).innerHTML = list.length ? list.map((s) => `<tr><td><b>${esc(s.full_name)}</b><div class="muted small">${esc(s.email)}</div></td><td>${esc(gn[s.group_id] || '—')}</td>
      <td>${s.active ? '' : '<span class="badge bad">Desactivado</span> '}${s.must_change_password ? '<span class="badge warn">Contraseña temporal</span>' : '<span class="badge ok">Activo</span>'}</td>
      <td class="right"><button class="btn soft sm" data-a="pw" data-id="${s.id}">🔑 Contraseña</button> <button class="btn ghost sm" data-a="ed" data-id="${s.id}">Editar</button></td></tr>`).join('') : `<tr><td colspan="4">${empty('No hay alumnos con ese filtro.')}</td></tr>`;
    $('#cnt', el).textContent = `${list.length} alumno(s)`;
  };
  el.innerHTML = `<div class="head"><h1>Alumnos</h1><span class="muted" id="cnt"></span></div>
  <div class="toolbar"><input id="q" type="search" placeholder="Buscar nombre o correo"><select id="g"><option value="">Todos los grupos</option>${opt(groups, 'id', 'name')}</select>
    <button class="btn" id="add">+ Alumno</button><button class="btn soft" id="imp">Importar lista</button><button class="btn ghost" id="grp">Grupos</button></div>
  <div class="tablewrap"><table><thead><tr><th>Alumno</th><th>Grupo</th><th>Estado</th><th></th></tr></thead><tbody id="tb"></tbody></table></div>`;
  $('#q', el).oninput = (e) => { q = e.target.value.toLowerCase(); draw(); };
  $('#g', el).onchange = (e) => { fg = e.target.value; draw(); };
  $('#add', el).onclick = () => addStudents(groups, () => alumnos(el), false);
  $('#imp', el).onclick = () => addStudents(groups, () => alumnos(el), true);
  $('#grp', el).onclick = () => manageGroups(groups, () => alumnos(el));
  $('#tb', el).onclick = (e) => {
    const b = e.target.closest('[data-a]'); if (!b) return; const s = studs.find((x) => x.id === b.dataset.id);
    if (b.dataset.a === 'pw') resetPw(s, () => alumnos(el));
    else editStudent(s, groups, () => alumnos(el));
  };
  draw();
}

function showPasswords(rows, title = 'Contraseñas temporales') {
  const ok = rows.filter((r) => r.ok);
  const m = modal(title, `<p class="muted small">Entrégalas a cada alumno. Al entrar tendrán que crear una contraseña propia. Esta lista solo se muestra ahora.</p>
    <div class="tablewrap"><table><thead><tr><th>Alumno</th><th>Correo</th><th>Contraseña</th></tr></thead><tbody>${ok.map((r) => `<tr><td>${esc(r.full_name || '')}</td><td>${esc(r.email)}</td><td><code>${esc(r.password)}</code></td></tr>`).join('')}</tbody></table></div>
    ${rows.some((r) => !r.ok) ? `<div class="msg err"><b>No se pudieron crear:</b><br>${rows.filter((r) => !r.ok).map((r) => `${esc(r.email)} — ${esc(r.error)}`).join('<br>')}</div>` : ''}
    <div class="foot"><button class="btn ghost" id="cp">Copiar</button><button class="btn" id="cs">Descargar CSV</button></div>`);
  $('#cp', m.el).onclick = () => copy(ok.map((r) => `${r.full_name}\t${r.email}\t${r.password}`).join('\n'));
  $('#cs', m.el).onclick = () => downloadCSV('contrasenas-temporales.csv', [['Nombre', 'Correo', 'Contraseña temporal'], ...ok.map((r) => [r.full_name, r.email, r.password])]);
}

function addStudents(groups, done, bulk) {
  const m = modal(bulk ? 'Importar lista de alumnos' : 'Nuevo alumno', bulk ? `
    <p class="muted small">Pega o sube un CSV con columnas: <b>nombre, correo, grupo</b> (grupo opcional). Se crean cuentas con contraseña temporal individual.</p>
    <label for="fi">Archivo CSV</label><input id="fi" type="file" accept=".csv,.txt">
    <label for="tx">O pega aquí la lista</label><textarea id="tx" rows="6" placeholder="Juan Pérez López,juan@dominio.edu.mx,111"></textarea>
    <label for="dg">Grupo por omisión</label><select id="dg"><option value="">—</option>${opt(groups, 'id', 'name')}</select>
    <div class="foot"><button class="btn" id="go">Crear cuentas</button></div>` : `
    <label for="n">Nombre completo</label><input id="n"><label for="e">Correo institucional</label><input id="e" type="email">
    <label for="dg">Grupo</label><select id="dg"><option value="">—</option>${opt(groups, 'id', 'name')}</select>
    <label for="pw">Contraseña temporal (opcional)</label><input id="pw" placeholder="Si lo dejas vacío se genera: Temp-1234$">
    <div class="foot"><button class="btn" id="go">Crear cuenta</button></div>`);
  const e = m.el;
  if (bulk) $('#fi', e).onchange = async (ev) => { $('#tx', e).value = await ev.target.files[0].text(); };
  $('#go', e).onclick = (ev) => run(ev.target, async () => {
    const gid = $('#dg', e).value || null; let students;
    if (bulk) {
      let rows = parseCSV($('#tx', e).value); if (rows.length && /nombre|correo|email/i.test(rows[0].join(' '))) rows.shift();
      students = rows.map((r) => ({ full_name: r[0], email: r[1], group: r[2] || null, group_id: r[2] ? null : gid }));
    } else students = [{ full_name: $('#n', e).value, email: $('#e', e).value, group_id: gid }];
    if (!students.length) throw new Error('No hay alumnos para crear');
    const { results } = await fn('create_students', { students, password: bulk ? undefined : ($('#pw', e).value.trim() || undefined) });
    m.close(); showPasswords(results); done();
  });
}

function resetPw(s, done) {
  const m = modal('Restablecer contraseña', `<p>Se asignará una contraseña temporal a <b>${esc(s.full_name)}</b> y se le pedirá cambiarla al entrar.</p>
    <label for="pw">Contraseña temporal (opcional)</label><input id="pw" placeholder="Vacío = se genera una"><div class="foot"><button class="btn ghost" id="no">Cancelar</button><button class="btn" id="go">Restablecer</button></div>`);
  $('#no', m.el).onclick = m.close;
  $('#go', m.el).onclick = (ev) => run(ev.target, async () => {
    const r = await fn('reset_password', { user_id: s.id, password: $('#pw', m.el).value.trim() || undefined });
    m.close(); showPasswords([{ ok: true, full_name: s.full_name, email: s.email, password: r.password }], 'Nueva contraseña temporal'); done();
  });
}

function editStudent(s, groups, done) {
  const m = modal('Editar alumno', `<label for="n">Nombre</label><input id="n" value="${esc(s.full_name)}"><div class="muted small">${esc(s.email)}</div>
    <label for="g">Grupo</label><select id="g"><option value="">—</option>${opt(groups, 'id', 'name', s.group_id)}</select>
    <label class="check"><input type="checkbox" id="ac" ${s.active ? 'checked' : ''}> Cuenta activa</label>
    <div class="foot"><button class="btn danger" id="del">Eliminar</button><button class="btn" id="sv">Guardar</button></div>`);
  $('#sv', m.el).onclick = (ev) => run(ev.target, async () => {
    const { error } = await sb.from('profiles').update({ full_name: $('#n', m.el).value.trim(), group_id: $('#g', m.el).value || null, active: $('#ac', m.el).checked }).eq('id', s.id);
    if (error) throw error;
    await sb.from('roster').update({ full_name: $('#n', m.el).value.trim(), group_id: $('#g', m.el).value || null }).eq('email', s.email);
    m.close(); toast('Guardado', 'ok'); done();
  });
  $('#del', m.el).onclick = async () => {
    if (!(await confirmBox(`¿Eliminar a ${s.full_name}? Se borrarán su cuenta y sus entregas. No se puede deshacer.`, 'Eliminar', true))) return;
    await run(null, async () => { await fn('delete_user', { user_id: s.id }); m.close(); toast('Alumno eliminado', 'ok'); done(); });
  };
}

function manageGroups(groups, done) {
  const m = modal('Grupos', `<div class="list" id="gl">${groups.map((g) => `<div class="item"><div class="grow t">${esc(g.name)}</div><button class="btn danger sm" data-del="${g.id}">Borrar</button></div>`).join('') || empty('Sin grupos')}</div>
    <label for="gn">Nuevo grupo</label><div class="row"><input id="gn" placeholder="Ej. 111"><button class="btn" id="ga" style="flex:0 0 auto">Agregar</button></div>`);
  $('#ga', m.el).onclick = (ev) => run(ev.target, async () => {
    const name = $('#gn', m.el).value.trim(); if (!name) return;
    const { error } = await sb.from('groups').insert({ name }); if (error) throw error; m.close(); done();
  });
  $('#gl', m.el).onclick = async (ev) => {
    const id = ev.target.dataset.del; if (!id) return;
    if (!(await confirmBox('¿Borrar el grupo? Los alumnos quedarán sin grupo y se borrarán tareas/material exclusivos de él.', 'Borrar', true))) return;
    await run(null, async () => { const { error } = await sb.from('groups').delete().eq('id', id); if (error) throw error; m.close(); done(); });
  };
}

// ============================ MATERIAL ============================
async function material(el) {
  const [{ data: units }, { data: mats }, { data: groups }] = await Promise.all([
    sb.from('units').select('*').order('ord'), sb.from('materials').select('*').order('created_at', { ascending: false }), sb.from('groups').select('*').order('name'),
  ]);
  const order = (m) => (m.kind === 'module' ? 0 : m.teacher_only ? 2 : 1);
  const groupsList = [...units.map((u) => ({ id: u.id, title: `${u.code} · ${u.title}` })), { id: null, title: 'General (todo el curso)' }];
  const icon = { link: '🔗', video: '▶️', file: '📄', text: '📝', module: '🎓' };
  const itemHtml = (m) => `<div class="item ${m.published && !m.teacher_only ? '' : 'dim'}"><div style="font-size:1.4rem">${m.teacher_only ? '🔒' : icon[m.kind]}</div>
    <div class="grow"><div class="t">${esc(m.title)}</div><div class="small">${m.teacher_only ? '<span class="badge brand">🔒 Solo docente · los alumnos nunca lo ven</span>' : m.published ? '<span class="badge ok">👁️ Visible para alumnos</span>' : '<span class="badge warn">🙈 Oculto</span>'}</div></div>
    <div class="actions">${m.teacher_only ? '' : `<button class="btn ${m.published ? 'ghost' : ''} sm" data-pub="${m.id}">${m.published ? '🙈 Ocultar' : '👁️ Mostrar'}</button>`}<button class="btn soft sm" data-ed="${m.id}">Editar</button></div></div>`;
  const sections = groupsList.map((g) => { const items = mats.filter((m) => (m.unit_id || null) === g.id).sort((a, b) => order(a) - order(b));
    if (!items.length) return ''; const pub = items.filter((m) => m.published && !m.teacher_only).length, tot = items.filter((m) => !m.teacher_only).length;
    return `<div class="card"><div class="head" style="margin-bottom:10px"><h2 style="margin:0;flex:1">${esc(g.title)} <span class="badge ${pub === tot ? 'ok' : pub ? 'info' : 'warn'}">${pub}/${tot} visibles</span></h2>
      <button class="btn ghost sm" data-all="show" data-unit="${g.id || ''}">👁️ Mostrar todo</button><button class="btn ghost sm" data-all="hide" data-unit="${g.id || ''}">🙈 Ocultar todo</button></div>
      <div class="list">${items.map(itemHtml).join('')}</div></div>`; }).join('');
  el.innerHTML = `<div class="head"><h1>Material</h1><button class="btn" id="add">+ Agregar</button></div>
    <p class="muted small">Cada propósito agrupa su material. Usa <b>Ocultar / Mostrar</b> para controlar lo que ven los alumnos. Lo marcado con 🔒 (por ejemplo, las respuestas) es solo para ti.</p>${sections || empty('Aún no has agregado material.')}`;
  $('#add', el).onclick = () => matForm(null, units, groups, () => material(el));
  el.onclick = (e) => {
    const p = e.target.closest('[data-pub]'), d = e.target.closest('[data-ed]'), a = e.target.closest('[data-all]');
    if (p) { const m = mats.find((x) => x.id === p.dataset.pub); run(p, async () => { const { error } = await sb.from('materials').update({ published: !m.published }).eq('id', m.id); if (error) throw error; material(el); }); }
    if (d) matForm(mats.find((x) => x.id === d.dataset.ed), units, groups, () => material(el));
    if (a) run(a, async () => { let q = sb.from('materials').update({ published: a.dataset.all === 'show' }).eq('teacher_only', false); q = a.dataset.unit ? q.eq('unit_id', a.dataset.unit) : q.is('unit_id', null); const { error } = await q; if (error) throw error; toast(a.dataset.all === 'show' ? 'Ahora es visible para los alumnos' : 'Oculto para los alumnos', 'ok'); material(el); });
  };
}

function matForm(m, units, groups, done) {
  const k = m?.kind || 'link';
  const md = modal(m ? 'Editar material' : 'Nuevo material', `<label for="t">Título</label><input id="t" value="${esc(m?.title)}">
    <label for="d">Descripción</label><textarea id="d" rows="2">${esc(m?.description)}</textarea>
    <div class="row"><div><label for="u">Propósito formativo</label><select id="u"><option value="">General</option>${opt(units, 'id', (u) => `${u.code} · ${u.title}`, m?.unit_id)}</select></div>
    <div><label for="k">Tipo</label><select id="k"><option value="link">Enlace</option><option value="video">Video (enlace)</option><option value="file">Archivo</option><option value="text">Texto</option><option value="module">Módulo interactivo</option></select></div></div>
    <div id="kz"></div>
    <label for="g">Visible para</label><select id="g"><option value="">Todos los grupos</option>${opt(groups, 'id', 'name', m?.group_id)}</select>
    <label class="check"><input type="checkbox" id="p" ${m?.published ? 'checked' : ''}> 👁️ Visible para alumnos</label>
    <label class="check"><input type="checkbox" id="to" ${m?.teacher_only ? 'checked' : ''}> 🔒 Solo para mí (respuestas, notas del docente; nunca lo ven los alumnos)</label>
    <div class="foot">${m ? '<button class="btn danger" id="del">Eliminar</button>' : ''}<button class="btn" id="sv">Guardar</button></div>`);
  const e = md.el; $('#k', e).value = k;
  const kz = () => { const t = $('#k', e).value; $('#kz', e).innerHTML = t === 'module' ? `<label for="ur">Módulo</label><select id="ur">${['1', '2', '3', '4', '5', '6', '7'].map((n) => `<option value="m1-${n}" ${m?.url === 'm1-' + n ? 'selected' : ''}>Propósito 1.${n}</option>`).join('')}</select>` : t === 'file' ? `<label for="f">Archivo (máx. 25 MB)</label><input id="f" type="file">${m?.file_path ? '<div class="muted small">Ya hay un archivo; sube otro solo para reemplazarlo.</div>' : ''}` : t === 'text' ? `<label for="b">Contenido</label><textarea id="b" rows="14">${esc(m?.body)}</textarea><div class="muted small">Formato: ## título, **negritas**, listas con - o 1., tablas con |, imágenes ![texto](assets/lessons/archivo.svg)</div>` : `<label for="ur">Enlace</label><input id="ur" type="url" placeholder="https://" value="${esc(m?.url)}">`; };
  $('#k', e).onchange = kz; kz();
  $('#sv', e).onclick = (ev) => run(ev.target, async () => {
    const t = $('#t', e).value.trim(), kind = $('#k', e).value; if (!t) throw new Error('Falta el título');
    const row = { title: t, description: $('#d', e).value.trim() || null, unit_id: $('#u', e).value || null, group_id: $('#g', e).value || null, kind, teacher_only: $('#to', e).checked, published: $('#p', e).checked && !$('#to', e).checked, url: null, body: null, file_path: m?.file_path ?? null };
    if (kind === 'file') { const f = $('#f', e).files[0]; if (f) { if (m?.file_path) await sb.storage.from('materials').remove([m.file_path]); row.file_path = await uploadFile('materials', `${Date.now()}-${safeName(f.name)}`, f); } if (!row.file_path) throw new Error('Selecciona un archivo'); }
    else if (kind === 'text') row.body = $('#b', e).value; else if (kind === 'module') row.url = $('#ur', e).value; else { row.url = $('#ur', e).value.trim(); if (!isUrl(row.url)) throw new Error('Enlace no válido'); if (m?.file_path) { await sb.storage.from('materials').remove([m.file_path]); row.file_path = null; } }
    const { error } = m ? await sb.from('materials').update(row).eq('id', m.id) : await sb.from('materials').insert(row);
    if (error) throw error; md.close(); toast('Guardado', 'ok'); done();
  });
  $('#del', e)?.addEventListener('click', async () => {
    if (!(await confirmBox('¿Eliminar este material?', 'Eliminar', true))) return;
    await run(null, async () => { if (m.file_path) await sb.storage.from('materials').remove([m.file_path]); await sb.from('materials').delete().eq('id', m.id); md.close(); done(); });
  });
}

// ============================ TAREAS ============================
async function tareas(el) {
  const [{ data: units }, { data: asg }, { data: groups }, { data: subs }] = await Promise.all([
    sb.from('units').select('*').order('ord'), sb.from('assignments').select('*').order('created_at', { ascending: false }), sb.from('groups').select('*').order('name'), sb.from('submissions').select('assignment_id,score'),
  ]);
  const un = Object.fromEntries(units.map((u) => [u.id, u]));
  el.innerHTML = `<div class="head"><h1>Tareas</h1><button class="btn" id="add">+ Nueva tarea</button></div>
  <div class="list">${asg.length ? asg.map((a) => { const ss = subs.filter((s) => s.assignment_id === a.id); return `<div class="item"><div class="grow"><div class="t">${esc(a.title)}</div>
    <div class="muted small">${a.unit_id ? 'Propósito ' + esc(un[a.unit_id]?.code) + ' · ' : ''}${a.due_at ? 'Vence ' + fmtDateTime(a.due_at) : 'Sin fecha'} · ${ss.length} entrega(s), ${ss.filter((s) => s.score == null).length} por calificar</div>
    <div style="margin-top:4px">${a.is_ae ? '<span class="badge warn">Evaluación</span> ' : ''}${a.published ? '<span class="badge ok">Publicada</span>' : '<span class="badge">Borrador</span>'}</div></div>
    <div class="actions"><a class="btn soft sm" href="#/entregas/${a.id}">Entregas</a><button class="btn ghost sm" data-ed="${a.id}">Editar</button></div></div>`; }).join('') : empty('Aún no hay tareas.')}</div>`;
  $('#add', el).onclick = () => asgForm(null, units, groups, () => tareas(el));
  el.onclick = (e) => { const d = e.target.closest('[data-ed]'); if (d) asgForm(asg.find((x) => x.id === d.dataset.ed), units, groups, () => tareas(el)); };
}

function asgForm(a, units, groups, done) {
  const md = modal(a ? 'Editar tarea' : 'Nueva tarea', `<label for="t">Título</label><input id="t" value="${esc(a?.title)}">
    <label for="i">Instrucciones</label><textarea id="i" rows="5">${esc(a?.instructions)}</textarea>
    <div class="row"><div><label for="u">Propósito formativo</label><select id="u"><option value="">—</option>${opt(units, 'id', (u) => `${u.code} · ${u.title}`, a?.unit_id)}</select></div>
    <div><label for="g">Grupo</label><select id="g"><option value="">Todos</option>${opt(groups, 'id', 'name', a?.group_id)}</select></div></div>
    <div class="row"><div><label for="d">Fecha límite</label><input id="d" type="datetime-local" value="${toLocalInput(a?.due_at)}"></div>
    <div><label for="mx">Puntaje máximo</label><input id="mx" type="number" min="1" value="${a?.max_score ?? 100}"></div></div>
    <label class="check"><input type="checkbox" id="ae" ${a?.is_ae ? 'checked' : ''}> Es actividad de evaluación (pondera según el programa)</label>
    <label class="check"><input type="checkbox" id="p" ${a?.published ? 'checked' : ''}> Publicada</label>
    <div class="foot">${a ? '<button class="btn danger" id="del">Eliminar</button>' : ''}<button class="btn" id="sv">Guardar</button></div>`);
  const e = md.el;
  $('#sv', e).onclick = (ev) => run(ev.target, async () => {
    const t = $('#t', e).value.trim(); if (!t) throw new Error('Falta el título');
    const row = { title: t, instructions: $('#i', e).value.trim() || null, unit_id: $('#u', e).value || null, group_id: $('#g', e).value || null, due_at: $('#d', e).value ? new Date($('#d', e).value).toISOString() : null, max_score: Number($('#mx', e).value) || 100, is_ae: $('#ae', e).checked, published: $('#p', e).checked };
    const { error } = a ? await sb.from('assignments').update(row).eq('id', a.id) : await sb.from('assignments').insert(row);
    if (error) throw error; md.close(); toast('Guardado', 'ok'); done();
  });
  $('#del', e)?.addEventListener('click', async () => {
    if (!(await confirmBox('¿Eliminar la tarea y todas sus entregas?', 'Eliminar', true))) return;
    await run(null, async () => { const { error } = await sb.from('assignments').delete().eq('id', a.id); if (error) throw error; md.close(); done(); });
  });
}

// ============================ ENTREGAS ============================
async function entregas(el, { param }) {
  const { data: asg } = await sb.from('assignments').select('*').order('created_at', { ascending: false });
  if (!asg.length) { el.innerHTML = `<div class="head"><h1>Entregas</h1></div>` + empty('Primero crea una tarea.'); return; }
  const id = param[0] || asg[0].id; const a = asg.find((x) => x.id === id) || asg[0];
  const [{ data: studs }, { data: subs }] = await Promise.all([
    sb.from('profiles').select('id,full_name,email,group_id').eq('role', 'student').eq('active', true).order('full_name'),
    sb.from('submissions').select('*').eq('assignment_id', a.id),
  ]);
  const sm = new Map(subs.map((s) => [s.student_id, s]));
  const list = studs.filter((s) => !a.group_id || s.group_id === a.group_id);
  el.innerHTML = `<div class="head"><h1>Entregas</h1></div>
  <div class="toolbar"><select id="sel">${opt(asg, 'id', (x) => x.title, a.id)}</select></div>
  <div class="tablewrap"><table><thead><tr><th>Alumno</th><th>Estado</th><th class="num">Calificación</th><th></th></tr></thead><tbody>${list.map((s) => { const x = sm.get(s.id);
    return `<tr><td>${esc(s.full_name)}</td><td>${x ? `<span class="badge ${x.score == null ? 'info' : 'ok'}">${x.score == null ? 'Entregada' : 'Calificada'}</span> <span class="muted small">${fmtDateTime(x.submitted_at)}</span>` : '<span class="badge">Sin entregar</span>'}</td>
    <td class="num">${x ? gradeBadge(x.score, a.max_score) : '—'}</td><td class="right"><button class="btn soft sm" data-s="${s.id}">${x ? 'Revisar' : 'Calificar'}</button></td></tr>`; }).join('')}</tbody></table></div>`;
  $('#sel', el).onchange = (e) => { location.hash = '#/entregas/' + e.target.value; };
  el.onclick = (e) => { const b = e.target.closest('[data-s]'); if (b) review(a, list.find((s) => s.id === b.dataset.s), sm.get(b.dataset.s), () => entregas(el, { param: [a.id] })); };
}

function review(a, s, x, done) {
  const md = modal(s.full_name, `<p><b>${esc(a.title)}</b></p>
    ${x ? `<div class="card flat"><div class="muted small">Entregado ${fmtDateTime(x.submitted_at)}${a.due_at && new Date(x.submitted_at) > new Date(a.due_at) ? ' · <span class="badge bad">Tarde</span>' : ''}</div>
      ${x.body ? `<div class="pre" style="margin-top:6px">${esc(x.body)}</div>` : ''}${x.link_url ? `<p><a href="${isUrl(x.link_url) ? esc(x.link_url) : '#'}" target="_blank" rel="noopener">Abrir enlace</a></p>` : ''}${x.file_path ? '<p><button class="btn soft sm" id="vf">Ver archivo</button></p>' : ''}</div>` : '<p class="muted">El alumno aún no entrega. Puedes calificar de todos modos.</p>'}
    <div class="row"><div><label for="sc">Calificación (máx. ${a.max_score})</label><input id="sc" type="number" step="0.5" min="0" max="${a.max_score}" value="${x?.score ?? ''}"></div></div>
    <label for="fb">Retroalimentación</label><textarea id="fb" rows="3">${esc(x?.feedback)}</textarea>
    <div class="foot">${x?.score != null ? '<button class="btn ghost" id="un">Quitar calificación</button>' : ''}<button class="btn" id="sv">Guardar</button></div>`);
  const e = md.el;
  $('#vf', e)?.addEventListener('click', (ev) => run(ev.target, async () => window.open(await signedUrl('submissions', x.file_path), '_blank', 'noopener')));
  const save = (score, fb) => run(null, async () => {
    const row = { assignment_id: a.id, student_id: s.id, score, feedback: fb, graded_at: score == null ? null : new Date().toISOString() };
    const { error } = x ? await sb.from('submissions').update(row).eq('id', x.id) : await sb.from('submissions').insert({ ...row, submitted_at: new Date().toISOString() });
    if (error) throw error; md.close(); toast('Guardado', 'ok'); done();
  });
  $('#sv', e).onclick = () => { const v = $('#sc', e).value; const n = v === '' ? null : Number(v); if (n != null && (n < 0 || n > a.max_score)) return toast(`La calificación debe estar entre 0 y ${a.max_score}`, 'err'); save(n, $('#fb', e).value.trim() || null); };
  $('#un', e)?.addEventListener('click', () => save(null, $('#fb', e).value.trim() || null));
}

// ============================ CALIFICACIONES ============================
async function notas(el) {
  const [{ data: units }, { data: asg }, { data: subs }, { data: studs }, { data: groups }] = await Promise.all([
    sb.from('units').select('*').order('ord'), sb.from('assignments').select('*'), sb.from('submissions').select('*'),
    sb.from('profiles').select('id,full_name,group_id').eq('role', 'student').eq('active', true).order('full_name'), sb.from('groups').select('*').order('name'),
  ]);
  let fg = '';
  const rowsFor = () => studs.filter((s) => !fg || s.group_id === fg).map((s) => ({ s, g: computeGrades(units, asg.filter((a) => !a.group_id || a.group_id === s.group_id), subs.filter((x) => x.student_id === s.id)) }));
  const draw = () => {
    const rows = rowsFor();
    $('#tb', el).innerHTML = rows.map(({ s, g }) => `<tr><td>${esc(s.full_name)}</td>${units.map((u) => `<td class="num">${g.perUnit[u.id].graded ? fmtNum(g.perUnit[u.id].pts) : '—'}</td>`).join('')}<td class="num"><b>${fmtNum(g.total)}</b></td></tr>`).join('') || `<tr><td colspan="9">${empty('Sin alumnos')}</td></tr>`;
  };
  el.innerHTML = `<div class="head"><h1>Calificaciones</h1></div>
  <div class="toolbar"><select id="g"><option value="">Todos los grupos</option>${opt(groups, 'id', 'name')}</select><button class="btn soft" id="ex">Exportar CSV</button></div>
  <p class="muted small">Puntos por propósito = promedio de sus actividades de evaluación × ponderación del programa (${units.map((u) => `${u.code}: ${u.weight}`).join(' · ')}). Las evaluaciones sin calificar cuentan 0.</p>
  <div class="tablewrap"><table><thead><tr><th>Alumno</th>${units.map((u) => `<th class="num">${u.code}<br>(${u.weight})</th>`).join('')}<th class="num">Total</th></tr></thead><tbody id="tb"></tbody></table></div>`;
  $('#g', el).onchange = (e) => { fg = e.target.value; draw(); };
  $('#ex', el).onclick = () => downloadCSV('calificaciones-pear.csv', [['Alumno', ...units.map((u) => `${u.code} (${u.weight})`), 'Total'], ...rowsFor().map(({ s, g }) => [s.full_name, ...units.map((u) => g.perUnit[u.id].graded ? fmtNum(g.perUnit[u.id].pts) : ''), fmtNum(g.total)])]);
  draw();
}

// ============================ ANUNCIOS ============================
async function anuncios(el) {
  const [{ data: ann }, { data: groups }] = await Promise.all([sb.from('announcements').select('*').order('created_at', { ascending: false }), sb.from('groups').select('*').order('name')]);
  el.innerHTML = `<div class="head"><h1>Avisos</h1><button class="btn" id="add">+ Nuevo aviso</button></div>
  <div class="list">${ann.length ? ann.map((a) => `<div class="item" style="align-items:flex-start"><div class="grow"><div class="t">${a.pinned ? '📌 ' : ''}${esc(a.title)}</div><div class="pre small">${esc(a.body)}</div><div class="muted small">${fmtDate(a.created_at)}</div></div><button class="btn danger sm" data-del="${a.id}">Borrar</button></div>`).join('') : empty('Sin avisos.')}</div>`;
  $('#add', el).onclick = () => { const m = modal('Nuevo aviso', `<label for="t">Título</label><input id="t"><label for="b">Mensaje</label><textarea id="b" rows="4"></textarea>
    <label for="g">Para</label><select id="g"><option value="">Todos los grupos</option>${opt(groups, 'id', 'name')}</select><label class="check"><input type="checkbox" id="p"> Fijar arriba</label><div class="foot"><button class="btn" id="sv">Publicar</button></div>`);
    $('#sv', m.el).onclick = (ev) => run(ev.target, async () => { const t = $('#t', m.el).value.trim(); if (!t) throw new Error('Falta el título');
      const { error } = await sb.from('announcements').insert({ title: t, body: $('#b', m.el).value.trim(), group_id: $('#g', m.el).value || null, pinned: $('#p', m.el).checked }); if (error) throw error; m.close(); anuncios(el); }); };
  el.onclick = async (e) => { const d = e.target.closest('[data-del]'); if (d && await confirmBox('¿Borrar aviso?', 'Borrar', true)) { await sb.from('announcements').delete().eq('id', d.dataset.del); anuncios(el); } };
}

// ============================ AVANCE EN MÓDULOS ============================
const feedItem = (ev, names) => { const d = describe(ev); const s = names[ev.student_id]; return `<div class="fi ${d.imp ? '' : 'minor'}"><span class="fic">${d.icon}</span><div class="grow"><a href="#/avance/${ev.student_id}"><b>${esc(s?.full_name || '—')}</b></a> ${esc(d.text)}</div><span class="muted small">${ago(ev.created_at)}</span></div>`; };

async function envivo(el) {
  const [{ data: studs }, { data: groups }, { data: ev }] = await Promise.all([
    sb.from('profiles').select('id,full_name,group_id').eq('role', 'student'), sb.from('groups').select('*').order('name'),
    sb.from('activity_log').select('*').order('created_at', { ascending: false }).limit(200),
  ]);
  const names = Object.fromEntries(studs.map((s) => [s.id, s]));
  let events = ev || [], online = [], fg = '', all = false;
  const inGroup = (id) => !fg || names[id]?.group_id === fg;
  const drawOnline = () => {
    const list = online.filter((o) => inGroup(o.id)).sort((a, b) => b.at - a.at);
    $('#on', el).innerHTML = list.length ? list.map((o) => `<a class="item" href="#/avance/${o.id}"><span class="live">●</span><div class="grow"><div class="t">${esc(o.name)}</div><div class="muted small">${o.module ? `🎓 Módulo ${esc(o.module.replace('m1-', '1.'))} · paso ${o.page}/${o.total} · «${esc(o.title || '')}»` : '🟢 En la plataforma'}</div></div><span class="muted small">${ago(o.at)}</span></a>`).join('') : '<div class="empty">Nadie conectado en este momento.</div>';
    $('#onc', el).textContent = list.length;
  };
  const drawFeed = () => {
    const list = events.filter((e) => inGroup(e.student_id) && (all || describe(e).imp)).slice(0, 80);
    $('#feed', el).innerHTML = list.length ? list.map((e) => feedItem(e, names)).join('') : '<div class="empty">Todavía no hay actividad.</div>';
  };
  el.innerHTML = `<div class="head"><h1>En vivo</h1><span class="badge ok">● tiempo real</span></div>
  <div class="toolbar"><select id="g"><option value="">Todos los grupos</option>${opt(groups, 'id', 'name')}</select><label class="check" style="margin:0"><input type="checkbox" id="all"> Mostrar también cada página que visitan</label></div>
  <div class="grid"><div class="card"><h2>En línea ahora (<span id="onc">0</span>)</h2><div class="list" id="on"></div></div>
  <div class="card"><h2>Lo que están haciendo</h2><div id="feed" class="feed"></div></div></div>`;
  $('#g', el).onchange = (e) => { fg = e.target.value; drawOnline(); drawFeed(); };
  $('#all', el).onchange = (e) => { all = e.target.checked; drawFeed(); };
  drawOnline(); drawFeed();
  const ch = sb.channel('feed-' + Math.random().toString(36).slice(2)).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activity_log' }, (p) => { events.unshift(p.new); drawFeed(); }).subscribe();
  const stopP = watchPresence((l) => { online = l; drawOnline(); }, names);
  const t = setInterval(() => { if (!el.isConnected) { clearInterval(t); sb.removeChannel(ch); stopP(); return; } drawOnline(); drawFeed(); }, 15000);
}

async function avanceAlumno(el, id) {
  const [{ data: s }, { data: prog }, { data: ev }, { data: units }] = await Promise.all([
    sb.from('profiles').select('id,full_name,email,group_id').eq('id', id).maybeSingle(), sb.from('module_progress').select('*').eq('student_id', id),
    sb.from('activity_log').select('*').eq('student_id', id).order('created_at', { ascending: false }).limit(60), sb.from('units').select('code,title').order('ord'),
  ]);
  if (!s) { el.innerHTML = empty('Alumno no encontrado.'); return; }
  const pm = Object.fromEntries(prog.map((p) => [p.module, p]));
  const secsAll = prog.reduce((t, p) => t + Object.values(p.done || {}).reduce((a, d) => a + (d.t || 0), 0), 0);
  const blocks = [];
  for (const u of units) {
    const mid = 'm1-' + u.code.split('.')[1]; const p = pm[mid]; let mod; try { mod = (await import(`../content/${mid}.js`)).default; } catch { continue; }
    const pages = [{ type: 'intro', t: 'Inicio' }, ...mod.pages]; const done = p?.done || {};
    const rows = pages.map((pg, k) => { const d = done[k]; let state;
      if (!d) state = '<span class="badge">⏳ Pendiente</span>';
      else if (pg.type === 'intro') state = '<span class="badge ok">✅ Entró</span>';
      else if (pg.type === 'lesson') state = d.r ? '<span class="badge ok">📖 Leída</span>' : '<span class="badge info">Empezó</span>';
      else if (pg.type === 'practica') { const c = d.c || []; const n = c.filter(Boolean).length; state = `<span class="badge ${n === c.length && n ? 'ok' : 'info'}">📝 ${n}/${pg.steps.length} pasos</span>`; }
      else if (d.sk) state = '<span class="badge warn">⏭️ Saltada</span>';
      else if ((d.s || 0) >= 0.6) state = `<span class="badge ok">✅ Superada</span>`;
      else if (d.rv) state = '<span class="badge warn">👀 Vio respuestas</span>';
      else if (d.f) state = `<span class="badge bad">🔁 ${d.f} fallo(s)</span>`;
      else state = '<span class="badge info">Empezó</span>';
      return `<tr><td class="num">${k + 1}</td><td>${esc(KINDNAME[pg.type] || '')}</td><td>${esc(plain(pg.t))}</td><td>${state}</td><td class="num">${d?.a || '—'}</td><td class="num">${d?.t ? fmtSecs(d.t) : '—'}</td></tr>`; }).join('');
    const tsecs = Object.values(done).reduce((a, d) => a + (d.t || 0), 0);
    blocks.push(`<details class="card" ${p ? 'open' : ''}><summary style="cursor:pointer;font-weight:700"><span class="code">${esc(u.code)}</span> ${esc(u.title)} <span class="badge ${p?.pct >= 100 ? 'ok' : 'brand'}">${p?.pct || 0} %</span> <span class="muted small">${tsecs ? '· ' + fmtSecs(tsecs) : ''}</span></summary>
      <div class="tablewrap" style="margin-top:10px"><table><thead><tr><th class="num">#</th><th>Tipo</th><th>Parte</th><th>Estado</th><th class="num">Intentos</th><th class="num">Tiempo</th></tr></thead><tbody>${rows}</tbody></table></div></details>`);
  }
  el.innerHTML = `<p><a href="#/avance">← Avance</a></p><div class="head"><h1>${esc(s.full_name)}</h1><span class="muted">${esc(s.email)}</span></div>
    <div class="stats"><div class="stat"><b>${Math.round(prog.reduce((t, p) => t + p.pct, 0) / 7)} %</b><span>Avance promedio</span></div><div class="stat"><b>${fmtSecs(secsAll)}</b><span>Tiempo en módulos</span></div><div class="stat"><b>${ev[0] ? ago(ev[0].created_at) : '—'}</b><span>Última actividad</span></div></div>
    ${blocks.join('')}<div class="card"><h2>Actividad reciente</h2><div class="feed">${ev.length ? ev.filter((e) => describe(e).imp).map((e) => feedItem(e, { [s.id]: s })).join('') : '<div class="empty">Sin actividad.</div>'}</div></div>`;
}
const KINDNAME = { intro: 'Inicio', lesson: 'Lección', match: 'Actividad', mc: 'Repaso', order: 'Actividad', cloze: 'Actividad', gen: 'Práctica', tt: 'Actividad', abaco: 'Actividad', write: 'Actividad', practica: 'Práctica final' };

async function avance(el, { param } = {}) {
  if (param?.[0]) return avanceAlumno(el, param[0]);
  const [{ data: studs }, { data: prog }, { data: units }, { data: groups }] = await Promise.all([
    sb.from('profiles').select('id,full_name,group_id').eq('role', 'student').eq('active', true).order('full_name'),
    sb.from('module_progress').select('student_id,module,pct,updated_at'), sb.from('units').select('code').order('ord'), sb.from('groups').select('*').order('name'),
  ]);
  const mods = units.map((u) => 'm1-' + u.code.split('.')[1]); const pm = new Map(prog.map((p) => [p.student_id + p.module, p]));
  let fg = '';
  const draw = () => {
    const rows = studs.filter((s) => !fg || s.group_id === fg);
    $('#tb', el).innerHTML = rows.map((s) => { const vals = mods.map((m) => pm.get(s.id + m)); const avg = Math.round(vals.reduce((t, v) => t + (v?.pct || 0), 0) / mods.length); const last = vals.filter(Boolean).map((v) => v.updated_at).sort().pop();
      return `<tr><td><a href="#/avance/${s.id}"><b>${esc(s.full_name)}</b></a></td>${vals.map((v) => `<td class="num">${v ? `<span class="badge ${v.pct >= 100 ? 'ok' : v.pct > 0 ? 'info' : ''}">${v.pct} %</span>` : '<span class="muted">—</span>'}</td>`).join('')}<td class="num"><b>${avg} %</b></td><td class="muted small">${last ? fmtDateTime(last) : '—'}</td></tr>`; }).join('') || `<tr><td colspan="10">${empty('Sin alumnos')}</td></tr>`;
  };
  el.innerHTML = `<div class="head"><h1>Avance en módulos</h1><span class="badge ok">● se actualiza solo</span></div><div class="toolbar"><select id="g"><option value="">Todos los grupos</option>${opt(groups, 'id', 'name')}</select></div>
    <div class="tablewrap"><table><thead><tr><th>Alumno</th>${units.map((u) => `<th class="num">${u.code}</th>`).join('')}<th class="num">Prom.</th><th>Última actividad</th></tr></thead><tbody id="tb"></tbody></table></div>`;
  $('#g', el).onchange = (e) => { fg = e.target.value; draw(); };
  draw();
  const ch = sb.channel('avance-' + Math.random().toString(36).slice(2)).on('postgres_changes', { event: '*', schema: 'public', table: 'module_progress' }, (p) => { const r = p.new; if (r?.student_id) { pm.set(r.student_id + r.module, r); draw(); } }).subscribe();
  const t = setInterval(() => { if (!el.isConnected) { clearInterval(t); sb.removeChannel(ch); } }, 5000);
}

// ============================ VISTA ALUMNO ============================
async function vistaAlumno(el, { param }) {
  const tab = param[0] || 'material';
  el.innerHTML = `<div class="msg info" style="margin:0 0 14px">👁️ <b>Vista previa de alumno.</b> Así lo verán tus alumnos; lo marcado como «Borrador» solo lo ves tú.</div>
  <div class="head"><h1>Vista alumno</h1></div>
  <div class="tabs">${[['material', 'Material'], ['tareas', 'Tareas'], ['cronograma', 'Cronograma']].map(([k, t]) => `<button class="${k === tab ? 'on' : ''}" data-t="${k}">${t}</button>`).join('')}</div><div id="pv"></div>`;
  $$('.tabs button', el).forEach((b) => b.onclick = () => { location.hash = '#/vista/' + b.dataset.t; });
  const box = $('#pv', el);
  if (tab === 'tareas') await tareasPreview(box);
  else if (tab === 'cronograma') await calendarView(box);
  else await studentMaterial(box, { preview: true });
}

export const teacherRoutes = {
  panel: { title: 'Panel', icon: '🏠', nav: true, render: panel },
  alumnos: { title: 'Alumnos', icon: '👥', nav: true, render: alumnos },
  material: { title: 'Material', icon: '📚', nav: true, render: material },
  tareas: { title: 'Tareas', icon: '✅', nav: true, render: tareas },
  entregas: { title: 'Entregas', icon: '📥', nav: true, render: entregas },
  notas: { title: 'Notas', icon: '📊', nav: true, render: notas },
  envivo: { title: 'En vivo', icon: '📡', nav: true, render: envivo },
  avance: { title: 'Avance', icon: '📈', nav: true, render: avance },
  modulo: { title: 'Módulo', icon: '🎓', nav: false, render: moduloView },
  anuncios: { title: 'Avisos', icon: '📣', nav: true, render: anuncios },
  cronograma: { title: 'Cronograma', icon: '🗓️', nav: true, render: calendarView },
  vista: { title: 'Vista alumno', icon: '👁️', nav: true, render: vistaAlumno },
  perfil: { title: 'Perfil', icon: '👤', nav: true, render: profileView },
};
