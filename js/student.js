import { sb, esc, $, $$, run, toast, fmtDate, fmtDateTime, todayStr, parseDay, dayName, signedUrl, uploadFile, safeName, isUrl, computeGrades, fmtNum } from './ui.js';
import { calendarView, profileView, gradeBadge } from './shared.js';

const empty = (t) => `<div class="empty">${esc(t)}</div>`;

async function inicio(el, { profile }) {
  const today = todayStr();
  const [{ data: ann }, { data: asg }, { data: subs }, { data: sch }, { data: units }] = await Promise.all([
    sb.from('announcements').select('*').order('pinned', { ascending: false }).order('created_at', { ascending: false }).limit(5),
    sb.from('assignments').select('*').order('due_at', { nullsFirst: false }),
    sb.from('submissions').select('*').eq('student_id', profile.id),
    sb.from('schedule').select('*').gte('day', today).order('day').order('ord').limit(6),
    sb.from('units').select('*').order('ord'),
  ]);
  const done = new Set(subs.map((s) => s.assignment_id));
  const pending = asg.filter((a) => !done.has(a.id)).slice(0, 5);
  const g = computeGrades(units, asg, subs);
  const nextDay = sch[0]?.day;
  const nextItems = sch.filter((s) => s.day === nextDay);
  const first = profile.full_name.split(' ')[0];
  el.innerHTML = `<div class="head"><h1>Hola, ${esc(first)} 👋</h1></div>
  <div class="stats">
    <div class="stat"><b>${pending.length}</b><span>Tareas pendientes</span></div>
    <div class="stat"><b>${fmtNum(g.total)}</b><span>Puntos acumulados de 100</span></div>
    <div class="stat"><b>${nextDay ? `${parseDay(nextDay).getDate()}/${parseDay(nextDay).getMonth() + 1}` : '—'}</b><span>Próxima sesión${nextItems[0] ? ': ' + esc(nextItems[0].label) : ''}</span></div>
  </div>
  ${ann.length ? `<div class="card"><h2>Avisos</h2><div class="list">${ann.map((a) => `<div class="item" style="align-items:flex-start"><div class="grow"><div class="t">${a.pinned ? '📌 ' : ''}${esc(a.title)}</div><div class="pre small">${esc(a.body)}</div><div class="muted small">${fmtDate(a.created_at)}</div></div></div>`).join('')}</div></div>` : ''}
  <div class="card"><h2>Por entregar</h2>${pending.length ? `<div class="list">${pending.map((a) => `<a class="item" href="#/tareas/${a.id}"><div class="grow"><div class="t">${esc(a.title)}</div><div class="muted small">${a.due_at ? 'Entrega: ' + fmtDateTime(a.due_at) : 'Sin fecha límite'}</div></div>${a.is_ae ? '<span class="badge warn">Evaluación</span>' : ''}</a>`).join('')}</div>` : empty('¡Estás al día! 🎉')}</div>`;
}

async function material(el, { profile }) {
  const [{ data: units }, { data: mats }] = await Promise.all([
    sb.from('units').select('*').order('ord'),
    sb.from('materials').select('*').order('created_at'),
  ]);
  const blocks = units.map((u) => ({ u, items: mats.filter((m) => m.unit_id === u.id) }));
  const loose = mats.filter((m) => !m.unit_id);
  if (loose.length) blocks.push({ u: { code: '', title: 'General', contents: [] }, items: loose });
  el.innerHTML = `<div class="head"><h1>Material</h1></div>` + (mats.length ? blocks.filter((b) => b.items.length).map(({ u, items }) => `
    <details class="unit" open><summary>${u.code ? `<span class="code">${esc(u.code)}</span>` : ''}${esc(u.title)}<span class="badge">${items.length}</span></summary>
    <div class="body">${items.map((m) => `<div class="item" style="align-items:flex-start"><div style="font-size:1.4rem">${{ link: '🔗', video: '▶️', file: '📄', text: '📝' }[m.kind]}</div><div class="grow"><div class="t">${esc(m.title)}</div>${m.description ? `<div class="muted small pre">${esc(m.description)}</div>` : ''}${m.kind === 'text' ? `<div class="pre" style="margin-top:6px">${esc(m.body)}</div>` : ''}</div>${m.kind !== 'text' ? `<button class="btn soft sm" data-open="${m.id}">Abrir</button>` : ''}</div>`).join('')}</div></details>`).join('') : empty('Aún no hay material publicado.'));
  $$('[data-open]', el).forEach((b) => b.onclick = () => run(b, async () => {
    const m = mats.find((x) => x.id === b.dataset.open);
    const url = m.kind === 'file' ? await signedUrl('materials', m.file_path) : m.url;
    if (!isUrl(url)) throw new Error('Enlace no válido');
    window.open(url, '_blank', 'noopener');
  }));
}

async function tareas(el, { profile, param }) {
  if (param[0]) return tareaDetalle(el, profile, param[0]);
  const [{ data: asg }, { data: subs }, { data: units }] = await Promise.all([
    sb.from('assignments').select('*').order('due_at', { nullsFirst: false }),
    sb.from('submissions').select('*').eq('student_id', profile.id),
    sb.from('units').select('id,code'),
  ]);
  const sm = new Map(subs.map((s) => [s.assignment_id, s])); const uc = Object.fromEntries(units.map((u) => [u.id, u.code]));
  let tab = 'p';
  const draw = () => {
    const list = asg.filter((a) => (tab === 'p') === !sm.has(a.id));
    $('#lst', el).innerHTML = list.length ? list.map((a) => { const s = sm.get(a.id); const late = !s && a.due_at && new Date(a.due_at) < new Date();
      return `<a class="item" href="#/tareas/${a.id}"><div class="grow"><div class="t">${esc(a.title)}</div><div class="muted small">${uc[a.unit_id] ? 'Propósito ' + uc[a.unit_id] + ' · ' : ''}${a.due_at ? 'Entrega: ' + fmtDateTime(a.due_at) : 'Sin fecha límite'}</div></div>${a.is_ae ? '<span class="badge warn">Evaluación</span>' : ''}${late ? '<span class="badge bad">Vencida</span>' : ''}${s ? gradeBadge(s.score, a.max_score) : ''}</a>`; }).join('') : empty(tab === 'p' ? 'No tienes tareas pendientes 🎉' : 'Aún no has entregado tareas.');
    $$('.tabs button', el).forEach((b) => b.classList.toggle('on', b.dataset.t === tab));
  };
  el.innerHTML = `<div class="head"><h1>Tareas</h1></div><div class="tabs"><button data-t="p">Pendientes</button><button data-t="e">Entregadas</button></div><div class="list" id="lst"></div>`;
  $$('.tabs button', el).forEach((b) => b.onclick = () => { tab = b.dataset.t; draw(); });
  draw();
}

async function tareaDetalle(el, profile, id) {
  const [{ data: a }, { data: s }] = await Promise.all([
    sb.from('assignments').select('*').eq('id', id).maybeSingle(),
    sb.from('submissions').select('*').eq('assignment_id', id).eq('student_id', profile.id).maybeSingle(),
  ]);
  if (!a) { el.innerHTML = empty('Tarea no encontrada.') + '<p class="center"><a href="#/tareas">← Volver</a></p>'; return; }
  const locked = s && s.score != null;
  el.innerHTML = `<p><a href="#/tareas">← Tareas</a></p>
  <div class="card"><h1>${esc(a.title)}</h1><div>${a.is_ae ? '<span class="badge warn">Actividad de evaluación</span> ' : ''}<span class="badge">${a.due_at ? 'Entrega: ' + fmtDateTime(a.due_at) : 'Sin fecha límite'}</span></div>
    <p class="pre">${esc(a.instructions || 'Sin instrucciones adicionales.')}</p></div>
  ${locked ? `<div class="card"><h2>Calificación</h2><p>${gradeBadge(s.score, a.max_score)}</p>${s.feedback ? `<div class="msg info pre">${esc(s.feedback)}</div>` : ''}</div>` : ''}
  <div class="card"><h2>${s ? 'Tu entrega' : 'Entregar'}</h2>
    ${s ? `<p class="muted small">Entregado: ${fmtDateTime(s.submitted_at)}${s.file_path ? ' · archivo adjunto' : ''}</p>` : ''}
    <form id="f"><label for="b">Respuesta o comentarios</label><textarea id="b" ${locked ? 'disabled' : ''}>${esc(s?.body)}</textarea>
    <label for="l">Enlace (Drive, video, etc.)</label><input id="l" type="url" placeholder="https://" value="${esc(s?.link_url)}" ${locked ? 'disabled' : ''}>
    <label for="fi">Archivo o foto (máx. 25 MB)</label><input id="fi" type="file" accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,video/*" ${locked ? 'disabled' : ''}>
    ${s?.file_path ? `<p class="small"><button type="button" class="linkbtn" id="vf">Ver archivo enviado</button></p>` : ''}
    <div id="m"></div>${locked ? '<p class="muted small">Ya fue calificada; no se puede modificar.</p>' : `<button class="btn block">${s ? 'Actualizar entrega' : 'Enviar entrega'}</button>`}</form></div>`;
  $('#vf', el)?.addEventListener('click', (e) => run(e.target, async () => window.open(await signedUrl('submissions', s.file_path), '_blank', 'noopener')));
  $('#f', el).onsubmit = (e) => { e.preventDefault(); run($('.btn', el), async () => {
    const body = $('#b', el).value.trim(), link = $('#l', el).value.trim(), file = $('#fi', el).files[0];
    if (link && !isUrl(link)) throw new Error('El enlace debe empezar con http:// o https://');
    if (!body && !link && !file && !s?.file_path) throw new Error('Escribe una respuesta, agrega un enlace o adjunta un archivo');
    let file_path = s?.file_path ?? null;
    if (file) file_path = await uploadFile('submissions', `${profile.id}/${a.id}/${Date.now()}-${safeName(file.name)}`, file);
    const row = { assignment_id: a.id, student_id: profile.id, body, link_url: link || null, file_path, submitted_at: new Date().toISOString() };
    const { error } = s ? await sb.from('submissions').update(row).eq('id', s.id) : await sb.from('submissions').insert(row);
    if (error) throw error;
    toast('Entrega enviada ✔', 'ok'); tareaDetalle(el, profile, id);
  }); };
}

async function notas(el, { profile }) {
  const [{ data: units }, { data: asg }, { data: subs }] = await Promise.all([
    sb.from('units').select('*').order('ord'),
    sb.from('assignments').select('*').order('due_at'),
    sb.from('submissions').select('*').eq('student_id', profile.id),
  ]);
  const g = computeGrades(units, asg, subs); const sm = new Map(subs.map((s) => [s.assignment_id, s]));
  el.innerHTML = `<div class="head"><h1>Mis calificaciones</h1></div>
  <div class="card"><div class="stat" style="border:0;padding:0"><b>${fmtNum(g.total)} <small class="muted" style="font-size:1rem">/ 100</small></b><span>Puntos acumulados (las evaluaciones pendientes cuentan 0 hasta calificarse)</span></div><div class="bar" style="margin-top:10px"><i style="width:${Math.min(100, g.total)}%"></i></div></div>
  ${units.map((u) => { const p = g.perUnit[u.id]; const aes = asg.filter((a) => a.unit_id === u.id && a.is_ae); const others = asg.filter((a) => a.unit_id === u.id && !a.is_ae);
    return `<div class="card"><div class="head" style="margin:0 0 8px"><h3 style="margin:0;flex:1"><span class="code">${esc(u.code)}</span> ${esc(u.title)}</h3><span class="badge brand">${fmtNum(p.pts)} / ${u.weight}</span></div>
    ${[...aes, ...others].map((a) => { const s = sm.get(a.id); return `<div class="item" style="margin-top:6px"><div class="grow"><div class="t">${esc(a.title)}</div><div class="muted small">${a.is_ae ? 'Actividad de evaluación' : 'Práctica (no pondera)'}</div></div>${s ? gradeBadge(s.score, a.max_score) : '<span class="badge">Sin entregar</span>'}</div>`; }).join('') || '<div class="muted small">Sin actividades todavía.</div>'}</div>`; }).join('')}`;
}

export const studentRoutes = {
  inicio: { title: 'Inicio', icon: '🏠', nav: true, render: inicio },
  material: { title: 'Material', icon: '📚', nav: true, render: material },
  tareas: { title: 'Tareas', icon: '✅', nav: true, render: tareas },
  notas: { title: 'Notas', icon: '📊', nav: true, render: notas },
  cronograma: { title: 'Cronograma', icon: '🗓️', nav: true, render: calendarView },
  perfil: { title: 'Perfil', icon: '👤', nav: true, render: profileView },
};
