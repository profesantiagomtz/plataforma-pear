import { sb, esc, $, toast, run, PASS_HELP, passOk } from './ui.js';
import { studentRoutes } from './student.js';
import { teacherRoutes } from './teacher.js';
import { setMe, startPresence, stopPresence } from './live.js';

const app = $('#app');
const state = { session: null, profile: null, recovery: /type=recovery/.test(location.hash), booted: false };

const logo = `<div class="logo"><div class="mark">π</div><div><b>PEAR</b><span>Pensamiento Matemático</span></div></div>`;

const pwField = (id, label, auto) => `<label for="${id}">${label}</label><div class="pw"><input id="${id}" type="password" autocomplete="${auto}" required><button type="button" data-eye="${id}" aria-label="Mostrar contraseña">👁</button></div>`;
const bindEyes = (root) => root.querySelectorAll('[data-eye]').forEach((b) => b.onclick = () => { const i = $('#' + b.dataset.eye, root); i.type = i.type === 'password' ? 'text' : 'password'; });

// ---------------- pantallas de acceso ----------------
function viewLogin(mode = 'login', note = '') {
  app.innerHTML = `<div class="auth"><div class="auth-card">${logo}
    ${mode === 'login' ? `
      <h1>Iniciar sesión</h1><p class="muted">Entra con tu correo institucional.</p>
      <form id="f"><label for="em">Correo</label><input id="em" type="email" autocomplete="username" placeholder="tu correo institucional" required>
      ${pwField('pw', 'Contraseña', 'current-password')}
      <div id="m"></div>${note ? `<div class="msg ok">${esc(note)}</div>` : ''}
      <button class="btn block">Entrar</button></form>
      <div class="msg info" style="text-align:center"><b>¿No recuerdas tu contraseña?</b><br>No pasa nada: <b>pídele a tu profe</b> que te dé una nueva. No necesitas entrar a tu correo.</div>
      <p class="muted small center">Primer ingreso: usa la contraseña temporal que te dio tu profe.</p>
      <p class="center" style="margin-top:6px"><button class="linkbtn small" id="forgot" style="font-weight:400;color:var(--muted)">Soy docente y olvidé mi contraseña</button></p>`
    : `<h1>Restablecer contraseña</h1><p class="muted">Escribe tu correo y te enviaremos un enlace para crear una nueva contraseña.</p>
      <form id="f"><label for="em">Correo</label><input id="em" type="email" autocomplete="username" required><div id="m"></div><button class="btn block">Enviar enlace</button></form>
      <p class="muted small">Si el correo no llega en unos minutos (revisa spam), pide a tu docente una contraseña temporal nueva.</p>
      <p class="center"><button class="linkbtn" id="back">← Volver</button></p>`}
  </div></div>`;
  bindEyes(app);
  const f = $('#f'), m = $('#m');
  if (mode === 'login') {
    $('#forgot').onclick = () => viewLogin('forgot');
    f.onsubmit = (e) => { e.preventDefault(); run($('.btn', f), async () => {
      const { error } = await sb.auth.signInWithPassword({ email: $('#em').value.trim().toLowerCase(), password: $('#pw').value });
      if (error) m.innerHTML = `<div class="msg err">${/Invalid login/i.test(error.message) ? 'Correo o contraseña incorrectos.' : esc(error.message)}</div>`;
    }); };
  } else {
    $('#back').onclick = () => viewLogin();
    f.onsubmit = (e) => { e.preventDefault(); run($('.btn', f), async () => {
      const { error } = await sb.auth.resetPasswordForEmail($('#em').value.trim().toLowerCase(), { redirectTo: location.origin + location.pathname });
      m.innerHTML = error ? `<div class="msg err">${esc(error.message)}</div>` : `<div class="msg ok">Si el correo está registrado, recibirás un enlace en unos minutos.</div>`;
    }); };
  }
}

function viewSetPassword(title, intro) {
  app.innerHTML = `<div class="auth"><div class="auth-card">${logo}<h1>${esc(title)}</h1><p class="muted">${esc(intro)}</p>
    <form id="f">${pwField('p1', 'Nueva contraseña', 'new-password')}${pwField('p2', 'Repite la contraseña', 'new-password')}
    <p class="muted small">${PASS_HELP}</p><div id="m"></div><button class="btn block">Guardar contraseña</button></form>
    <p class="center"><button class="linkbtn" id="out">Cerrar sesión</button></p></div></div>`;
  bindEyes(app);
  $('#out').onclick = () => sb.auth.signOut();
  $('#f').onsubmit = (e) => { e.preventDefault(); run($('.btn'), async () => {
    const a = $('#p1').value, b = $('#p2').value, m = $('#m');
    if (!passOk(a)) return m.innerHTML = `<div class="msg err">${PASS_HELP}</div>`;
    if (a !== b) return m.innerHTML = `<div class="msg err">Las contraseñas no coinciden.</div>`;
    if (/^Temp-/i.test(a)) return m.innerHTML = `<div class="msg err">Elige una contraseña propia, no una temporal.</div>`;
    const { error } = await sb.auth.updateUser({ password: a });
    if (error) return m.innerHTML = `<div class="msg err">${esc(error.message)}</div>`;
    await sb.rpc('mark_password_changed');
    state.recovery = false; history.replaceState(null, '', location.pathname + '#/');
    toast('Contraseña actualizada', 'ok');
    await loadProfile(); render();
  }); };
}

// ---------------- shell + router ----------------
function shell() {
  startPresence(state.profile);
  const routes = state.profile.role === 'teacher' ? teacherRoutes : studentRoutes;
  const [name, ...rest] = (location.hash.replace(/^#\/?/, '') || '').split('/');
  const key = routes[name] ? name : Object.keys(routes)[0];
  const nav = Object.entries(routes).filter(([, r]) => r.nav).map(([k, r]) => `<a href="#/${k}" class="${k === key ? 'on' : ''}"><span class="ic">${r.icon}</span>${esc(r.title)}</a>`).join('');
  app.innerHTML = `<div class="shell">
    <header class="topbar">${logo}<div class="sp"></div><span class="who">${esc(state.profile.full_name)}</span><button class="btn ghost sm" id="out">Salir</button></header>
    <nav class="nav">${nav}</nav><main id="view"><div class="boot" style="height:40vh"><div class="spinner"></div></div></main></div>`;
  $('#out').onclick = () => sb.auth.signOut();
  const view = $('#view');
  Promise.resolve(routes[key].render(view, { profile: state.profile, param: rest, reload: render }))
    .catch((e) => { console.error(e); view.innerHTML = `<div class="msg err">Ocurrió un error: ${esc(e.message || e)}</div>`; });
  window.scrollTo(0, 0);
}

async function loadProfile() {
  const { data, error } = await sb.from('profiles').select('*').eq('id', state.session.user.id).single();
  if (error) throw error;
  state.profile = data; setMe(data);
}

function render() {
  if (!state.booted) return;
  if (state.recovery) return viewSetPassword('Crea tu nueva contraseña', 'Escribe una contraseña nueva para tu cuenta.');
  if (!state.session) return viewLogin();
  if (!state.profile) return app.innerHTML = `<div class="boot"><div class="spinner"></div></div>`;
  if (!state.profile.active) { toast('Tu cuenta está desactivada. Habla con tu docente.', 'err'); return sb.auth.signOut(); }
  if (state.profile.must_change_password) return viewSetPassword('Crea tu contraseña', 'Por seguridad, cambia la contraseña temporal por una propia antes de continuar.');
  shell();
}

window.addEventListener('hashchange', () => { if (state.session && state.profile && !state.profile.must_change_password && !state.recovery) shell(); });

sb.auth.onAuthStateChange((event, session) => {
  setTimeout(async () => {
    if (event === 'PASSWORD_RECOVERY') state.recovery = true;
    const prev = state.session?.user?.id;
    state.session = session;
    if (!session) { stopPresence(); state.profile = null; state.booted = true; state.recovery = false; return render(); }
    if (event === 'TOKEN_REFRESHED') return;
    // misma sesión (p. ej. al volver a la pestaña): no redibujar para no perder lo que se está escribiendo
    if (state.profile && prev === session.user.id && event !== 'PASSWORD_RECOVERY' && event !== 'USER_UPDATED') return;
    try {
      state.booted = true;
      if (!state.profile || prev !== session.user.id) { state.profile = null; render(); await loadProfile(); }
      render();
    } catch (e) { console.error(e); toast('No se pudo cargar tu perfil', 'err'); await sb.auth.signOut(); }
  });
});
