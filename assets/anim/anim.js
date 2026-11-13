// Motor común de las animaciones paso a paso (botones, pasos, modo dentro de la plataforma).
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const A = window.A = {};
  A.$ = (id) => document.getElementById(id);
  A.el = (t, a, p) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); p && p.appendChild(e); return e; };
  A.pt = (cx, cy, r, d) => { d = (d - 90) * Math.PI / 180; return [cx + r * Math.cos(d), cy + r * Math.sin(d)]; };
  A.sector = (cx, cy, r, a0, a1) => {
    if (a1 - a0 >= 360) return `M${cx - r},${cy}a${r},${r} 0 1 0 ${2 * r},0a${r},${r} 0 1 0 ${-2 * r},0Z`;
    const [p, q] = [A.pt(cx, cy, r, a0), A.pt(cx, cy, r, a1)];
    return `M${cx},${cy}L${p[0]},${p[1]}A${r},${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${q[0]},${q[1]}Z`;
  };
  A.pop = (e) => { e.classList.remove('pop'); void e.offsetWidth; e.classList.add('pop'); };
  let UID = 0;
  // Pizza de n rebanadas. Devuelve { cortar(on), comer(i, on) }
  A.pizza = (parent, cx, cy, r, n) => {
    const root = A.el('g', {}, parent), gh = A.el('g', {}, root), gs = A.el('g', {}, root);
    const pep = [[20, .55], [70, .3], [100, .7], [150, .45], [200, .72], [235, .35], [280, .62], [320, .4], [345, .78], [0, 0]];
    const s = [];
    for (let i = 0; i < n; i++) {
      const a0 = i * 360 / n, a1 = a0 + 360 / n, mid = (a0 + a1) / 2, id = 'cp' + (++UID);
      const ghost = A.el('path', { d: A.sector(cx, cy, r, a0, a1), class: 'fantasma' }, gh);
      const cp = A.el('clipPath', { id }, gs); A.el('path', { d: A.sector(cx, cy, r * .89, a0, a1) }, cp);
      const g = A.el('g', { class: 'rebanada' }, gs);
      const c = A.pt(cx, cy, r * .5, mid); g.style.transformOrigin = `${c[0]}px ${c[1]}px`;
      A.el('path', { d: A.sector(cx, cy, r, a0, a1), fill: '#c97a2b', class: 'borde', stroke: '#c97a2b', 'stroke-width': 2 }, g);
      const ch = A.el('g', { 'clip-path': `url(#${id})` }, g);
      A.el('rect', { x: cx - r, y: cy - r, width: 2 * r, height: 2 * r, fill: '#ffcf4a' }, ch);
      pep.forEach(([a, f]) => { const p = A.pt(cx, cy, r * .89 * f, a); A.el('circle', { cx: p[0], cy: p[1], r: r * .1, fill: '#c0392b' }, ch); });
      const fs = Math.max(14, Math.min(r * .3, 600 / n / 2));
      const fp = A.pt(cx, cy, r * (n > 4 ? .62 : .5), n == 1 ? 180 : mid);
      const face = A.el('text', { x: fp[0], y: fp[1] + fs * .35, 'text-anchor': 'middle', 'font-size': fs, class: 'carita' }, gh); face.textContent = '😋';
      s.push({ g, ghost, face, mid, borde: g.firstChild });
    }
    // Pizza entera encima (sin rayitas) mientras no está cortada
    const ent = A.el('g', { class: 'entera' }, root);
    A.el('circle', { cx, cy, r, fill: '#c97a2b' }, ent); A.el('circle', { cx, cy, r: r * .89, fill: '#ffcf4a' }, ent);
    pep.forEach(([a, f]) => { const p = A.pt(cx, cy, r * .89 * f, a); A.el('circle', { cx: p[0], cy: p[1], r: r * .1, fill: '#c0392b' }, ent); });
    return {
      cortar(on) { ent.style.opacity = on ? 0 : 1; s.forEach(({ g, ghost, face, mid, borde }) => { const d = on && n > 1 ? r * .07 : 0, a = (mid - 90) * Math.PI / 180, t = `translate(${d * Math.cos(a)}px,${d * Math.sin(a)}px)`; g.style.transform = t; ghost.style.transform = t; face.style.transform = t; borde.setAttribute('stroke', on ? '#fff' : '#c97a2b'); }); },
      comer(i, on = true) { const x = s[i]; x.g.classList.toggle('comida', on); x.ghost.classList.toggle('on', on); x.face.classList.toggle('on', on); },
      n,
    };
  };
  // pasos: [{n:'nombre', t:'texto', s:'subtexto', d:ms para "Ver todo solo"}]; mostrar(n, animar, later)
  A.iniciar = (pasos, mostrar) => {
    const P = A.$('pasos'), T = A.$('texto'), C = A.$('controles');
    P.innerHTML = pasos.map((p, i) => `<div>${i + 1}. ${p.n}</div>`).join('');
    C.innerHTML = '<button class="sec" id="atras">◀ Atrás</button><button id="sig">Siguiente paso ▶</button><button class="sec" id="auto">▶ Ver todo solo</button><button class="sec" id="rep">🔁 Repetir</button>';
    let paso = 0, timers = [], auto = false; const last = pasos.length - 1;
    const later = (ms, f) => timers.push(setTimeout(f, ms));
    const ir = (n, animar = true) => {
      timers.forEach(clearTimeout); timers = []; paso = n;
      [...P.children].forEach((d, i) => { d.className = i == n ? 'on' : i < n ? 'ok' : ''; });
      T.innerHTML = `${pasos[n].t}<small>${pasos[n].s || ''}</small>`; A.pop(T);
      A.$('atras').disabled = n == 0; A.$('sig').disabled = n == last;
      mostrar(n, animar, later);
      if (auto && n < last) later(pasos[n].d || 4000, () => ir(n + 1));
      if (auto && n == last) { auto = false; A.$('auto').disabled = false; }
    };
    const stop = () => { auto = false; A.$('auto').disabled = false; };
    A.$('sig').onclick = () => { stop(); paso < last && ir(paso + 1); };
    A.$('atras').onclick = () => { stop(); paso > 0 && ir(paso - 1, false); };
    A.$('rep').onclick = () => { stop(); ir(0); };
    A.$('auto').onclick = () => { auto = true; A.$('auto').disabled = true; ir(0); };
    ir(0);
    if (window.self !== window.top || /embed/.test(location.search)) {
      document.body.classList.add('embed');
      const avisa = () => parent.postMessage({ anim: 'alto', h: document.documentElement.scrollHeight }, '*');
      new ResizeObserver(avisa).observe(document.body); addEventListener('load', avisa);
    }
  };
})();
