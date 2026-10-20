import { sb, esc, $, $$, run, toast, fmtDate, parseDay, dayName, todayStr, PASS_HELP, passOk } from './ui.js';

const KIND = { clase: ['Clase', 'brand'], ae: ['Evaluación', 'warn'], encuadre: ['Encuadre', 'info'], repaso: ['Repaso', 'info'], inhabil: ['Inhábil', 'bad'], ctec: ['Sin clases', 'bad'], corte: ['Corte de calificaciones', 'warn'] };

export async function calendarView(el) {
  const [{ data: sch }, { data: units }] = await Promise.all([
    sb.from('schedule').select('*').order('day').order('ord'),
    sb.from('units').select('code,title').order('ord'),
  ]);
  const ut = Object.fromEntries(units.map((u) => [u.code, u.title]));
  const today = todayStr();
  let showAll = false;
  const draw = () => {
    const days = {};
    sch.forEach((s) => (days[s.day] ||= []).push(s));
    const keys = Object.keys(days).filter((d) => showAll || d >= today);
    let lastMonth = '';
    const html = keys.map((d) => {
      const dt = parseDay(d); const mon = dt.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
      const head = mon !== lastMonth ? `<h3 style="margin:18px 0 4px">${mon.charAt(0).toUpperCase() + mon.slice(1).replace(' de ', ' ')}</h3>` : ''; lastMonth = mon;
      return `${head}<div class="day ${d < today ? 'past' : ''} ${d === today ? 'today' : ''}"><div class="d">${dt.getDate()}<small>${dayName(d)}</small></div><div class="grow" style="flex:1">${days[d].map((s) => {
        const [k, c] = KIND[s.kind] || ['', ''];
        return `<div style="margin-bottom:4px"><span class="badge ${c}">${k}</span> ${esc(s.label)}${s.unit_code && ut[s.unit_code] ? ` <span class="muted small">· ${esc(ut[s.unit_code])}</span>` : ''}</div>`;
      }).join('')}</div></div>`;
    }).join('');
    $('#cal', el).innerHTML = html || '<div class="empty">No hay más sesiones programadas.</div>';
    $('#tgl', el).textContent = showAll ? 'Ocultar fechas pasadas' : 'Mostrar fechas pasadas';
  };
  el.innerHTML = `<div class="head"><h1>Cronograma</h1><button class="btn ghost sm" id="tgl"></button></div><div class="card" id="cal"></div>`;
  $('#tgl', el).onclick = () => { showAll = !showAll; draw(); };
  draw();
}

export async function profileView(el, { profile, reload }) {
  const { data: g } = profile.group_id ? await sb.from('groups').select('name').eq('id', profile.group_id).single() : { data: null };
  let attHtml = '';
  if (profile.role === 'student') {
    const { data: a } = await sb.from('attendance').select('day,status').eq('student_id', profile.id);
    if (a?.length) { const c = (k) => a.filter((x) => x.status === k).length; const pct = Math.round((c('P') + c('R') + c('J')) / a.length * 100);
      attHtml = `<div class="card"><h3>🗒️ Mi asistencia</h3><div class="chips"><span class="chip">✔ Asistencias: <b>${c('P')}</b></span><span class="chip">⏰ Retardos: <b>${c('R')}</b></span><span class="chip">✖ Faltas: <b>${c('F')}</b></span><span class="chip">📝 Justificadas: <b>${c('J')}</b></span><span class="chip">📈 <b>${pct} %</b></span></div></div>`; }
  }
  el.innerHTML = `<div class="head"><h1>Mi perfil</h1></div>
  <div class="card"><h3>${esc(profile.full_name)}</h3><div class="muted">${esc(profile.email)}</div>${profile.matricula ? `<div class="muted">🪪 Matrícula: ${esc(profile.matricula)}</div>` : ''}
    <div style="margin-top:8px"><span class="badge brand">${profile.role === 'teacher' ? 'Docente' : 'Alumno'}</span> ${g ? `<span class="badge">Grupo ${esc(g.name)}</span>` : ''}</div></div>
  ${attHtml}<div class="card"><h3>Cambiar contraseña</h3><form id="f" style="max-width:420px">
    <label for="p1">Nueva contraseña</label><input id="p1" type="password" autocomplete="new-password" required>
    <label for="p2">Repite la contraseña</label><input id="p2" type="password" autocomplete="new-password" required>
    <p class="muted small">${PASS_HELP}</p><div id="m"></div><button class="btn block">Actualizar contraseña</button></form></div>`;
  $('#f', el).onsubmit = (e) => { e.preventDefault(); run($('.btn', el), async () => {
    const a = $('#p1', el).value, b = $('#p2', el).value, m = $('#m', el);
    if (!passOk(a)) return m.innerHTML = `<div class="msg err">${PASS_HELP}</div>`;
    if (a !== b) return m.innerHTML = `<div class="msg err">Las contraseñas no coinciden.</div>`;
    const { error } = await sb.auth.updateUser({ password: a });
    if (error) return m.innerHTML = `<div class="msg err">${esc(error.message)}</div>`;
    toast('Contraseña actualizada', 'ok'); $('#f', el).reset(); m.innerHTML = '';
  }); };
}

export const gradeBadge = (s, max) => {
  if (s == null) return '<span class="badge">Sin calificar</span>';
  const p = s / max;
  return `<span class="badge ${p >= 0.6 ? 'ok' : 'bad'}">${Math.round(s * 10) / 10}/${max}</span>`;
};
