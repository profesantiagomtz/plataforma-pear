// Seguimiento en tiempo real: bitácora de actividad + presencia («en línea ahora»).
import { sb } from './ui.js';

export const plain = (s) => String(s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

// ---------- bitácora ----------
let me = null;
export function setMe(profile) { me = profile; }
export function logEvent(kind, module, page, detail = {}) {
  if (!me || me.role !== 'student') return;
  sb.from('activity_log').insert({ student_id: me.id, kind, module: module || null, page: page ?? null, detail }).then(({ error }) => { if (error) console.warn('log', error.message); });
}

// ---------- presencia («en línea ahora») ----------
// Cada alumno actualiza su propia fila cada 20 s; el docente ve «en línea» a quien lo hizo en el último minuto.
let beat = null, pstate = null, pTimer = null;
const push = () => { if (!pstate) return; sb.from('presence').upsert({ student_id: pstate.id, module: pstate.module, page: pstate.page, total: pstate.total, title: pstate.title, at: new Date().toISOString() }).then(({ error }) => { if (error) console.warn('presence', error.message); }); };
export function startPresence(profile) {
  if (beat || profile.role !== 'student') return;
  pstate = { id: profile.id, module: null, page: null, total: null, title: '' };
  push(); beat = setInterval(() => { if (!document.hidden) push(); }, 20000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) push(); });
}
export function setPresence(patch) { if (!pstate) return; pstate = { ...pstate, ...patch }; clearTimeout(pTimer); pTimer = setTimeout(push, 300); }
export function stopPresence() { if (beat) { clearInterval(beat); beat = null; if (pstate) sb.from('presence').delete().eq('student_id', pstate.id).then(() => {}); pstate = null; } }

export function watchPresence(cb, names = {}) {
  let rows = new Map(); let ch;
  const emit = () => { const cut = Date.now() - 60000; cb([...rows.values()].filter((r) => new Date(r.at).getTime() > cut).map((r) => ({ ...r, id: r.student_id, name: names[r.student_id]?.full_name || '—', at: new Date(r.at).getTime() }))); };
  sb.from('presence').select('*').then(({ data }) => { rows = new Map((data || []).map((r) => [r.student_id, r])); emit(); });
  ch = sb.channel('presence-' + Math.random().toString(36).slice(2)).on('postgres_changes', { event: '*', schema: 'public', table: 'presence' }, (p) => { if (p.eventType === 'DELETE') rows.delete(p.old.student_id); else rows.set(p.new.student_id, p.new); emit(); }).subscribe();
  const t = setInterval(emit, 10000);
  return () => { clearInterval(t); sb.removeChannel(ch); };
}

// ---------- redacción de eventos ----------
export function describe(ev, ctx = {}) {
  const d = ev.detail || {}; const mod = ev.module ? ev.module.replace('m1-', '1.') : '';
  const t = d.title ? `«${d.title}»` : '';
  switch (ev.kind) {
    case 'module_open': return { icon: '🎓', text: `abrió el módulo ${mod}`, imp: true };
    case 'lesson_read': return { icon: '📖', text: `leyó ${t} (${mod})${d.secs ? ` · ${fmtSecs(d.secs)}` : ''}`, imp: true };
    case 'attempt': return d.pass ? { icon: '✅', text: `superó ${t} (${mod}) · ${d.ok}/${d.tot}${d.a > 1 ? ` · intento ${d.a}` : ''}`, imp: true } : { icon: '❌', text: `falló ${t} (${mod}) · ${d.ok}/${d.tot} · intento ${d.a}`, imp: true };
    case 'reveal': return { icon: '👀', text: `pidió ver las respuestas de ${t} (${mod})`, imp: true };
    case 'skip': return { icon: '⏭️', text: `saltó ${t} (${mod}) tras varios intentos`, imp: true };
    case 'practice_step': return { icon: '📝', text: `práctica final (${mod}): paso ${d.n} de ${d.tot}`, imp: true };
    case 'module_done': return { icon: '🏆', text: `completó el módulo ${mod}`, imp: true };
    case 'open_material': return { icon: '📂', text: `abrió ${t}`, imp: true };
    case 'submit': return { icon: '📥', text: `entregó ${t}`, imp: true };
    case 'page_view': return { icon: '👣', text: `entró a ${t} (${mod})`, imp: false };
    default: return { icon: '•', text: ev.kind, imp: false };
  }
}
export const fmtSecs = (s) => (s < 60 ? `${s} s` : `${Math.floor(s / 60)} min ${s % 60 ? (s % 60) + ' s' : ''}`.trim());
export const ago = (d) => { const s = Math.max(0, Math.round((Date.now() - new Date(d).getTime()) / 1000)); if (s < 10) return 'ahora'; if (s < 60) return `hace ${s} s`; if (s < 3600) return `hace ${Math.floor(s / 60)} min`; if (s < 86400) return `hace ${Math.floor(s / 3600)} h`; return `hace ${Math.floor(s / 86400)} d`; };
