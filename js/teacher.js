import { sb, esc, $, $$, run, toast, modal, confirmBox, copy, downloadCSV, parseCSV, fmtDate, fmtDateTime, todayStr, parseDay, toLocalInput, signedUrl, uploadFile, safeName, isUrl, computeGrades, fmtNum } from './ui.js';
import { calendarView, profileView, gradeBadge } from './shared.js';
import { material as studentMaterial, tareasPreview } from './student.js';

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
  const [{ data: studs }, { data: subs }, { data: asg }, { data: sch }, { data: groups }] = await Promise.all([
    sb.from('profiles').select('id,full_name,active,must_change_password,group_id').eq('role', 'student'),
    sb.from('submissions').select('id,assignment_id,student_id,submitted_at,score').order('submitted_at', { ascending: false }),
    sb.from('assignments').select('id,title,published,is_ae'),
    sb.from('schedule').select('*').gte('day', today).order('day').order('ord').limit(8),
    sb.from('groups').select('*'),
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
  const un = Object.fromEntries(units.map((u) => [u.id, u]));
  el.innerHTML = `<div class="head"><h1>Material</h1><button class="btn" id="add">+ Agregar</button></div>
  <div class="list">${mats.length ? mats.map((m) => `<div class="item"><div style="font-size:1.4rem">${{ link: '🔗', video: '▶️', file: '📄', text: '📝' }[m.kind]}</div>
    <div class="grow"><div class="t">${esc(m.title)}</div><div class="muted small">${m.unit_id ? 'Propósito ' + esc(un[m.unit_id]?.code) : 'General'} · ${m.published ? '<span class="badge ok">Publicado</span>' : '<span class="badge">Borrador</span>'}</div></div>
    <div class="actions"><button class="btn ghost sm" data-pub="${m.id}">${m.published ? 'Ocultar' : 'Publicar'}</button><button class="btn soft sm" data-ed="${m.id}">Editar</button></div></div>`).join('') : empty('Aún no has agregado material.')}</div>`;
  $('#add', el).onclick = () => matForm(null, units, groups, () => material(el));
  el.onclick = (e) => {
    const p = e.target.closest('[data-pub]'), d = e.target.closest('[data-ed]');
    if (p) { const m = mats.find((x) => x.id === p.dataset.pub); run(p, async () => { await sb.from('materials').update({ published: !m.published }).eq('id', m.id); material(el); }); }
    if (d) matForm(mats.find((x) => x.id === d.dataset.ed), units, groups, () => material(el));
  };
}

function matForm(m, units, groups, done) {
  const k = m?.kind || 'link';
  const md = modal(m ? 'Editar material' : 'Nuevo material', `<label for="t">Título</label><input id="t" value="${esc(m?.title)}">
    <label for="d">Descripción</label><textarea id="d" rows="2">${esc(m?.description)}</textarea>
    <div class="row"><div><label for="u">Propósito formativo</label><select id="u"><option value="">General</option>${opt(units, 'id', (u) => `${u.code} · ${u.title}`, m?.unit_id)}</select></div>
    <div><label for="k">Tipo</label><select id="k"><option value="link">Enlace</option><option value="video">Video (enlace)</option><option value="file">Archivo</option><option value="text">Texto</option></select></div></div>
    <div id="kz"></div>
    <label for="g">Visible para</label><select id="g"><option value="">Todos los grupos</option>${opt(groups, 'id', 'name', m?.group_id)}</select>
    <label class="check"><input type="checkbox" id="p" ${m?.published ? 'checked' : ''}> Publicado (visible para alumnos)</label>
    <div class="foot">${m ? '<button class="btn danger" id="del">Eliminar</button>' : ''}<button class="btn" id="sv">Guardar</button></div>`);
  const e = md.el; $('#k', e).value = k;
  const kz = () => { const t = $('#k', e).value; $('#kz', e).innerHTML = t === 'file' ? `<label for="f">Archivo (máx. 25 MB)</label><input id="f" type="file">${m?.file_path ? '<div class="muted small">Ya hay un archivo; sube otro solo para reemplazarlo.</div>' : ''}` : t === 'text' ? `<label for="b">Contenido</label><textarea id="b" rows="14">${esc(m?.body)}</textarea><div class="muted small">Formato: ## título, **negritas**, listas con - o 1., tablas con |, imágenes ![texto](assets/lessons/archivo.svg)</div>` : `<label for="ur">Enlace</label><input id="ur" type="url" placeholder="https://" value="${esc(m?.url)}">`; };
  $('#k', e).onchange = kz; kz();
  $('#sv', e).onclick = (ev) => run(ev.target, async () => {
    const t = $('#t', e).value.trim(), kind = $('#k', e).value; if (!t) throw new Error('Falta el título');
    const row = { title: t, description: $('#d', e).value.trim() || null, unit_id: $('#u', e).value || null, group_id: $('#g', e).value || null, kind, published: $('#p', e).checked, url: null, body: null, file_path: m?.file_path ?? null };
    if (kind === 'file') { const f = $('#f', e).files[0]; if (f) { if (m?.file_path) await sb.storage.from('materials').remove([m.file_path]); row.file_path = await uploadFile('materials', `${Date.now()}-${safeName(f.name)}`, f); } if (!row.file_path) throw new Error('Selecciona un archivo'); }
    else if (kind === 'text') row.body = $('#b', e).value; else { row.url = $('#ur', e).value.trim(); if (!isUrl(row.url)) throw new Error('Enlace no válido'); if (m?.file_path) { await sb.storage.from('materials').remove([m.file_path]); row.file_path = null; } }
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
  anuncios: { title: 'Avisos', icon: '📣', nav: true, render: anuncios },
  cronograma: { title: 'Cronograma', icon: '🗓️', nav: true, render: calendarView },
  vista: { title: 'Vista alumno', icon: '👁️', nav: true, render: vistaAlumno },
  perfil: { title: 'Perfil', icon: '👤', nav: true, render: profileView },
};
