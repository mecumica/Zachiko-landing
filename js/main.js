/* ==========================================================
   ZACHIKŌ Sushi · Temporada Sakura — interacciones
   ========================================================== */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wa = (tel) => "https://wa.me/" + tel.replace(/\D/g, "");
  const telHref = (tel) => "tel:" + tel.replace(/\s/g, "");

  /* ---------- Header y menú ---------- */
  const header = $("#header"), burger = $("#burger"), nav = $("#nav");
  const onScroll = () => header.classList.toggle("is-solid", scrollY > 40);
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });
  const setMenu = (open) => {
    burger.setAttribute("aria-expanded", open);
    nav.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  const secObs = new IntersectionObserver(
    (es) => es.forEach((e) => {
      if (e.isIntersecting) $$("a", nav).forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  $$("main section[id]").forEach((s) => secObs.observe(s));

  /* ---------- Hero: si existe la foto del combo sin fondo (img/marca/hero-combo.png), reemplaza a la caja ---------- */
  const heroImg = $("#heroImg");
  if (heroImg && heroImg.dataset.combo) {
    const hc = new Image();
    hc.onload = () => { heroImg.src = hc.src; heroImg.classList.add("is-combo"); };
    hc.src = heroImg.dataset.combo;
  }

  /* ---------- Combos ---------- */
  const chip = (c) => `<span class="chip-combo" style="--c:${c.color};--t:${c.tinta}">${c.nombre}</span>`;
  $("#combosGrid").innerHTML = COMBOS.map((c) => `
    <article class="combo reveal" id="combo-${c.id}" style="--c:${c.color};--t:${c.tinta}">
      <h3 class="combo__nombre">${c.nombre} <span class="combo__kanji">${c.kanji}</span></h3>
      <div class="combo__img" data-src="">
        <img src="${c.foto}" alt="Combo ${c.nombre}: caja Zachikō abierta con 20 piezas, palillos, salsas de soja y teriyaki y servilleta" loading="lazy" />
      </div>
      <button class="combo__toggle" type="button" aria-expanded="false" aria-controls="det-${c.id}">Ver qué trae <span aria-hidden="true">+</span></button>
      <div class="combo__body">
        <div class="combo__det" id="det-${c.id}">
        <p class="combo__sig">“${c.significado}”</p>
        <p class="combo__txt">${c.texto}</p>
        <p class="combo__incl">${INCLUYE.join(" · ")}</p>
        </div>
        <a href="#locales" class="btn btn--sm btn--block">Pedí en tu local</a>
      </div>
    </article>`).join("");
  // Mobile: desplegar la info de cada combo
  $$(".combo__toggle").forEach((b) => b.addEventListener("click", () => {
    const card = b.closest(".combo");
    const open = card.classList.toggle("is-open");
    b.setAttribute("aria-expanded", open);
    b.innerHTML = open ? 'Cerrar <span aria-hidden="true">−</span>' : 'Ver qué trae <span aria-hidden="true">+</span>';
  }));
  // Si existe una foto propia del combo (img/combos/<id>-caja.jpg), reemplaza al mockup genérico
  $$(".combo__img").forEach((box) => {
    if (!box.dataset.src) return;
    const img = new Image();
    img.onload = () => { box.querySelector("img").src = img.src; };
    img.src = box.dataset.src;
  });

  /* ---------- Fechas + Google Calendar ---------- */
  const ymd = (d) => d.toISOString().slice(0, 10).replace(/-/g, "");
  const gcal = (r) => {
    const d = new Date(r.fecha);
    const p = new URLSearchParams({
      action: "TEMPLATE",
      text: `Zachikō · Servilleta Sakura de regalo (${r.lugar})`,
      dates: `${ymd(d)}/${ymd(new Date(d.getTime() + 864e5))}`,
      details: `Florece el cerezo en ${r.lugar}. Los primeros 25 clientes de cada local Zachikō que pidan un combo Sakura (${COMBOS.map((c) => c.nombre).join(", ")}) se llevan una servilleta bordada de regalo.\nHorario: ${HORARIO.mediodia} y ${HORARIO.noche}.`,
      location: "Zachikō Sushi · Palermo, Belgrano, Vicente López o San Isidro",
      ctz: "America/Argentina/Buenos_Aires",
    });
    return "https://calendar.google.com/calendar/render?" + p.toString();
  };
  const hoy = new Date();
  const fechas = REGALOS.map((r) => ({ ...r, d: new Date(r.fecha) }));
  const proxima = fechas.find((f) => f.d >= new Date(hoy.toDateString()));
  const mesCorto = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  $("#fechas").innerHTML = fechas.map((f) => `
    <li class="fecha reveal ${f === proxima ? "is-next" : f.d < hoy ? "is-past" : ""}">
      <div class="fecha__dia"><b>${f.d.getDate()}</b><span>${mesCorto[f.d.getMonth()]}</span></div>
      <div>
        <h3>${f.dia}</h3>
        <p><strong>${f.lugar}</strong> · ${f.detalle}</p>
      </div>
      <a class="fecha__cal" href="${gcal(f)}" target="_blank" rel="noopener" aria-label="Agregar ${f.dia} a Google Calendar">
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 10h18M8 3v4M16 3v4M12 13v5M9.5 15.5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        Agendar
      </a>
    </li>`).join("");

  /* ---------- Piezas ---------- */
  $("#leyenda").innerHTML = COMBOS.map((c) => `<li>${chip(c)}</li>`).join("");
  const enCombos = (id) => COMBOS.filter((c) => c.piezas.some(([p]) => p === id));
  $("#piezasGrid").innerHTML = Object.entries(PIEZAS).map(([id, p]) => `
    <article class="pieza reveal" id="pieza-${id}">
      <div class="pieza__img"><img src="${p.img}" alt="${p.nombre}" width="400" height="400" /></div>
      <h3>${p.nombre}</h3>
      <ul class="pieza__ing">${p.ingredientes.map((x) => `<li>${x}</li>`).join("")}</ul>
      <div class="pieza__combos"><span>Viene en</span>${enCombos(id).map(chip).join("")}</div>
    </article>`).join("");

  /* ---------- Locales: mapa ilustrado + info ---------- */
  const mapa = $("#mapa"), info = $("#localInfo");
  mapa.insertAdjacentHTML("beforeend", LOCALES.map((l) => `
    <button class="pin" data-id="${l.id}" style="left:${l.pin[0]}%;top:${l.pin[1]}%" aria-label="Ver local ${l.nombre}">
      <span class="pin__nombre">${l.nombre}</span>
    </button>`).join(""));

  function activar(id) {
    const l = LOCALES.find((x) => x.id === id);
    $$(".pin", mapa).forEach((p) => {
      const on = p.dataset.id === id;
      p.classList.toggle("is-on", on);
      p.setAttribute("aria-pressed", on);
    });
    info.innerHTML = `
      <div class="local-info__card">
        <div class="local-info__nombre">
          <p class="kicker">Local seleccionado</p>
          <h3>${l.nombre}</h3>
          <p>${l.direccion}</p>
        </div>
        <div class="local-info__datos">
          <div class="local-info__dato">
            <h4>Horario</h4>
            <p>${HORARIO.dias}<br>${HORARIO.mediodia} y ${HORARIO.noche}<br><strong>${HORARIO.cerrado}</strong></p>
          </div>
          <div class="local-info__dato">
            <h4>Teléfono</h4>
            <p><a href="${telHref(l.telefono)}">${l.telefono}</a></p>
          </div>
        </div>
        <div class="local-info__acciones">
          <a class="btn-mini btn-mini--wa" href="${wa(l.telefono)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3z"/></svg>Pedir por WhatsApp</a>
          <a class="btn-mini btn-mini--linea" href="https://www.google.com/maps/dir/?api=1&destination=${l.coords.join(",")}" target="_blank" rel="noopener">Cómo llegar</a>
        </div>
      </div>
      <div class="local-info__tabs" role="group" aria-label="Elegir local">
        ${LOCALES.map((x) => `<button data-id="${x.id}" class="${x.id === id ? "is-on" : ""}" aria-pressed="${x.id === id}">${x.nombre}</button>`).join("")}
      </div>`;
    $$(".local-info__tabs button", info).forEach((b) => b.addEventListener("click", () => activar(b.dataset.id)));
  }
  $$(".pin", mapa).forEach((p) => p.addEventListener("click", () => {
    activar(p.dataset.id);
    if (innerWidth < 1080) info.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  }));
  activar(LOCALES[0].id);

  /* ---------- Footer ---------- */
  $("#fHorario").innerHTML = `<h4>Horarios</h4><p><b>${HORARIO.dias}</b><br>Mediodía ${HORARIO.mediodia} · Noche ${HORARIO.noche}<br><span class="rosa">${HORARIO.cerrado}</span></p>`;
  $("#fLocales").innerHTML = LOCALES.map((l) => `<li><b>${l.nombre}</b><br>${l.direccion.split(",")[0]} · <a class="tel" href="${telHref(l.telefono)}">${l.telefono}</a></li>`).join("");

  /* ---------- Aparición al scrollear ---------- */
  const rev = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); rev.unobserve(e.target); }
  }), { threshold: 0.12 });
  $$(".reveal").forEach((el) => rev.observe(el));

  /* ---------- Botón flotante (celular) ---------- */
  const fab = $("#fab"), heroEl = $(".hero"), loc = $("#locales");
  let heroVis = true, locVis = false;
  const upd = () => fab.classList.toggle("is-on", !heroVis && !locVis);
  new IntersectionObserver(([e]) => { heroVis = e.isIntersecting; upd(); }).observe(heroEl);
  new IntersectionObserver(([e]) => { locVis = e.isIntersecting; upd(); }, { threshold: 0.05 }).observe(loc);

  /* ---------- Pétalos (solo en el hero) ---------- */
  const cv = $("#petalos");
  if (!reduceMotion && cv.getContext) {
    const ctx = cv.getContext("2d");
    let W, H, P = [], activo = true;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const colores = ["#EFA6CA", "#F8CFE2", "#ffffff"];
    const nuevo = (ini) => ({
      x: Math.random() * W, y: ini ? Math.random() * H : -20,
      s: (6 + Math.random() * 8) * dpr, vy: (0.4 + Math.random() * 0.8) * dpr, vx: (0.2 + Math.random() * 0.6) * dpr,
      a: Math.random() * 6.28, va: (Math.random() - 0.5) * 0.04, w: Math.random() * 6.28,
      c: colores[(Math.random() * colores.length) | 0],
    });
    const resize = () => {
      W = cv.width = heroEl.offsetWidth * dpr; H = cv.height = heroEl.offsetHeight * dpr;
      P = Array.from({ length: innerWidth < 760 ? 14 : 28 }, () => nuevo(true));
    };
    new IntersectionObserver(([e]) => (activo = e.isIntersecting)).observe(heroEl);
    const loop = () => {
      if (activo) {
        ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < P.length; i++) {
          const p = P[i];
          p.y += p.vy; p.x += p.vx + Math.sin(p.w) * 0.5; p.a += p.va; p.w += 0.03;
          if (p.y > H + 20 || p.x > W + 20) P[i] = nuevo(false);
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.scale(1, Math.abs(Math.sin(p.w)) * 0.6 + 0.4);
          ctx.fillStyle = p.c; ctx.globalAlpha = 0.9; ctx.beginPath();
          ctx.moveTo(0, -p.s);
          ctx.bezierCurveTo(p.s, -p.s * 0.6, p.s * 0.8, p.s * 0.7, 0, p.s);
          ctx.bezierCurveTo(-p.s * 0.8, p.s * 0.7, -p.s, -p.s * 0.6, 0, -p.s);
          ctx.fill(); ctx.restore();
        }
      }
      requestAnimationFrame(loop);
    };
    resize();
    addEventListener("resize", resize);
    loop();
  }
})();
