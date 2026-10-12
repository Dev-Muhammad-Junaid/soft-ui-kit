/* Soft UI Kit promo — one paused, seekable GSAP timeline (HyperFrames contract). */
(function () {
  const P = window.__PROMO;
  const V = P.format === "vertical";
  const W = P.W;
  const H = P.H;
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => Array.from(r.querySelectorAll(s));
  const tl = gsap.timeline({ paused: true });

  /* ——— Beat grid: 120 BPM → one beat every 0.5s ——— */
  const T = {
    wall: 2.5,
    themes: 6.0,
    themeStep: 0.8,
    taste: 10.0,
    charts: 13.5,
    slide: 0.5,
    mosaic: 18.5,
    dash: 21.0,
    icons: 25.0,
    outro: 27.4,
    end: P.duration,
  };

  /* ——— Helpers ——— */

  // Discrete state change that stays correct when the playhead seeks either way.
  function state(t, apply) {
    const proxy = { v: 0 };
    tl.to(
      proxy,
      {
        v: 1,
        duration: 0.04,
        ease: "none",
        onUpdate: () => apply(proxy.v > 0.5),
      },
      t,
    );
  }

  function drift(scene, start, dur) {
    const blobs = qa(".blob", scene);
    tl.fromTo(
      blobs,
      { x: 0, y: 0, scale: 1 },
      {
        x: (i) => [60, -70, 50, -40][i % 4],
        y: (i) => [40, 50, -60, -30][i % 4],
        scale: (i) => [1.18, 1.1, 1.22, 1.12][i % 4],
        duration: dur,
        ease: "none",
      },
      start,
    );
  }

  function zoomThrough(oldEl, newEl, t, d = 0.42) {
    tl.to(oldEl, { scale: 2.4, opacity: 0, filter: "blur(10px)", duration: d, ease: "power3.in" }, t);
    tl.set(oldEl, { display: "none" }, t + d);
    // Incoming scene punches in from slightly oversized so its edges never show.
    tl.fromTo(
      newEl,
      { display: "block", opacity: 0, scale: 1.35, filter: "blur(12px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: d + 0.1, ease: "power3.out", immediateRender: false },
      t + 0.08,
    );
    tl.set(newEl, { clearProps: "filter" }, t + d + 0.2);
  }

  function whip(oldEl, newEl, t, dir = 1, d = 0.26) {
    const axis = V ? "yPercent" : "xPercent";
    tl.to(oldEl, { [axis]: -55 * dir, opacity: 0, filter: "blur(14px)", duration: d, ease: "power4.in" }, t);
    tl.set(oldEl, { display: "none" }, t + d);
    tl.fromTo(
      newEl,
      { display: "block", opacity: 0, [axis]: 55 * dir, filter: "blur(14px)" },
      { opacity: 1, [axis]: 0, filter: "blur(0px)", duration: d, ease: "power4.out", immediateRender: false },
      t + d * 0.45,
    );
  }

  function push(oldEl, newEl, t, d = 0.45) {
    const axis = V ? "xPercent" : "yPercent";
    tl.to(oldEl, { [axis]: -100, duration: d, ease: "power3.inOut" }, t);
    tl.set(oldEl, { display: "none" }, t + d);
    tl.fromTo(
      newEl,
      { display: "block", opacity: 1, [axis]: 100 },
      { [axis]: 0, duration: d, ease: "power3.inOut", immediateRender: false },
      t,
    );
  }

  function iris(oldEl, newEl, t, x, y, d = 0.5) {
    const R = Math.hypot(W, H) * 1.1;
    tl.set(newEl, { display: "block", opacity: 1, clipPath: `circle(0px at ${x}px ${y}px)` }, t);
    tl.to(newEl, { clipPath: `circle(${R}px at ${x}px ${y}px)`, duration: d, ease: "power3.inOut" }, t);
    tl.set(newEl, { clipPath: "none" }, t + d);
    if (oldEl) tl.set(oldEl, { display: "none" }, t + d);
  }

  function counter(el, from, to, t, d, fmt = (v) => String(Math.round(v))) {
    const proxy = { v: from };
    tl.to(
      proxy,
      { v: to, duration: d, ease: "power2.out", onUpdate: () => (el.textContent = fmt(proxy.v)) },
      t,
    );
  }

  function hueVars(el, hue, dark) {
    const h = ((hue % 360) + 360) % 360;
    const accent = `hsl(${h} 85% ${dark ? 58 : 48}%)`;
    el.style.setProperty("--t-accent-h", String(h));
    el.style.setProperty("--accent", accent);
    el.style.setProperty("--accent-soft", dark ? `hsl(${h} 42% 20%)` : `hsl(${h} 90% 92%)`);
    el.style.setProperty("--accent-ink", dark ? `hsl(${h} 90% 78%)` : `hsl(${h} 70% 28%)`);
    el.style.setProperty("--chart-1", accent);
    el.style.setProperty("--chart-2", `hsl(${(h + 48) % 360} 75% ${dark ? 68 : 58}%)`);
    el.style.setProperty("--chart-3", `hsl(${(h + 130) % 360} 70% ${dark ? 58 : 46}%)`);
    el.style.setProperty("--chart-4", `hsl(${(h + 210) % 360} 80% ${dark ? 62 : 52}%)`);
    el.style.setProperty("--orb-a", `hsl(${h} 90% 82%)`);
    el.style.setProperty("--orb-c", `hsl(${(h + 60) % 360} 85% 84%)`);
  }

  function radiusVars(el, r) {
    el.style.setProperty("--t-radius", String(r));
    el.style.setProperty("--radius-xs", `${6 * r}px`);
    el.style.setProperty("--radius-sm", `${10 * r}px`);
    el.style.setProperty("--radius-md", `${16 * r}px`);
    el.style.setProperty("--radius-lg", `${24 * r}px`);
    el.style.setProperty("--radius-xl", `${32 * r}px`);
    el.style.setProperty("--radius-pill", `${999 * r}px`);
  }

  /* Kit charts render their final state; every reveal below is GSAP-driven. */
  function revealCharts(root, t, k = 1) {
    const bars = qa(".chart-bar__fill", root);
    if (bars.length)
      tl.fromTo(
        bars,
        { scaleY: 0, transformOrigin: "50% 100%" },
        { scaleY: 1, duration: 0.5 * k, ease: "back.out(1.8)", stagger: 0.028 * k },
        t,
      );

    qa(".chart-line", root).forEach((l) =>
      tl.fromTo(l, { strokeDashoffset: 800 }, { strokeDashoffset: 0, duration: 0.7 * k, ease: "power2.inOut" }, t),
    );
    qa(".scatter-line, .sparkline polyline", root).forEach((l) =>
      tl.fromTo(
        l,
        { strokeDasharray: 900, strokeDashoffset: 900 },
        { strokeDashoffset: 0, duration: 0.7 * k, ease: "power2.inOut" },
        t,
      ),
    );

    const area = qa(".chart-area", root);
    if (area.length) tl.fromTo(area, { opacity: 0 }, { opacity: 1, duration: 0.5 * k }, t + 0.2 * k);

    const dots = qa(".chart-dot, .scatter-dot", root);
    if (dots.length)
      tl.fromTo(
        dots,
        { scale: 0, transformOrigin: "50% 50%" },
        { scale: 1, duration: 0.3 * k, ease: "back.out(3)", stagger: 0.03 * k },
        t + 0.15 * k,
      );

    qa(".donut-seg", root).forEach((seg, i) => {
      const full = seg.getAttribute("stroke-dasharray");
      const [a, b] = full.split(" ").map(Number);
      tl.fromTo(
        seg,
        { attr: { "stroke-dasharray": `0 ${a + b}` } },
        { attr: { "stroke-dasharray": full }, duration: 0.45 * k, ease: "power2.out" },
        t + i * 0.09 * k,
      );
    });

    qa(".radial-fill", root).forEach((ring, i) => {
      const full = ring.getAttribute("stroke-dasharray");
      const [a, b] = full.split(" ").map(Number);
      tl.fromTo(
        ring,
        { attr: { "stroke-dasharray": `0 ${b}` } },
        { attr: { "stroke-dasharray": `${a} ${b}` }, duration: 0.7 * k, ease: "power3.out" },
        t + i * 0.08 * k,
      );
    });
    qa(".radial-value", root).forEach((txt) => {
      const target = parseFloat(txt.textContent);
      if (!Number.isNaN(target)) counter(txt, 0, target, t, 0.7 * k, (v) => `${Math.round(v)}%`);
    });

    qa(".chart--radar svg", root).forEach((svg) => {
      const size = Number(svg.getAttribute("width")) || 260;
      const origin = `${size / 2} ${size / 2}`;
      const rings = qa(".radar-ring, .radar-spoke", svg);
      tl.fromTo(rings, { opacity: 0 }, { opacity: 1, duration: 0.3 * k, stagger: 0.02 * k }, t);
      tl.fromTo(
        qa(".radar-area", svg),
        { scale: 0, rotation: -40, svgOrigin: origin },
        { scale: 1, rotation: 0, svgOrigin: origin, duration: 0.6 * k, ease: "back.out(1.6)" },
        t + 0.1 * k,
      );
    });

    const funnel = qa(".funnel-bar", root);
    if (funnel.length)
      tl.fromTo(
        funnel,
        { scaleX: 0, transformOrigin: "0% 50%" },
        { scaleX: 1, duration: 0.45 * k, ease: "expo.out", stagger: 0.07 * k },
        t,
      );

    qa(".heatmap-grid", root).forEach((grid) => {
      const cols = Number(grid.style.getPropertyValue("--hm-cols")) || 14;
      const cells = qa(".heatmap-cell", grid);
      tl.fromTo(
        cells,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3 * k,
          ease: "back.out(2)",
          stagger: (i) => ((i % cols) + Math.floor(i / cols)) * 0.016 * k,
        },
        t,
      );
    });

    qa(".dot-chart__col", root).forEach((col, ci) => {
      const cells = qa(".dot-chart__cell", col);
      tl.fromTo(
        cells,
        { scaleY: 0, opacity: 0, transformOrigin: "50% 100%" },
        { scaleY: 1, opacity: (i, el) => (el.classList.contains("is-filled") ? 1 : 0.7), duration: 0.22 * k, ease: "power2.out", stagger: { each: 0.012 * k, from: "end" } },
        t + ci * 0.022 * k,
      );
    });

    const segs = qa(".seg-bar__chunk, .timeline-bar__seg, .ui-progress__bar", root);
    if (segs.length)
      tl.fromTo(
        segs,
        { scaleX: 0, transformOrigin: "0% 50%" },
        { scaleX: 1, duration: 0.5 * k, ease: "expo.out", stagger: 0.08 * k },
        t,
      );
  }

  /* ════════ 1 · Intro ════════ */
  const intro = q("#s-intro");
  drift(intro, 0, T.wall + 0.5);
  tl.fromTo(
    q(".intro__logo", intro),
    { scale: 0, rotation: -140 },
    { scale: 1, rotation: 0, duration: 0.75, ease: "back.out(1.9)" },
    0.1,
  );
  tl.fromTo(q(".intro__pulse", intro), { scale: 0.5, opacity: 0.9 }, { scale: 3, opacity: 0, duration: 1, ease: "power2.out" }, 0.38);
  tl.fromTo(
    qa(".intro__title .ch", intro),
    { y: 90, opacity: 0, rotationX: -90, filter: "blur(8px)" },
    { y: 0, opacity: 1, rotationX: 0, filter: "blur(0px)", duration: 0.6, ease: "expo.out", stagger: 0.04 },
    0.5,
  );
  tl.fromTo(
    qa(".intro__chips .chip", intro),
    { scale: 0.4, opacity: 0, y: 20 },
    { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: "back.out(2)", stagger: 0.08 },
    1.2,
  );
  tl.fromTo(q(".intro", intro), { scale: 1 }, { scale: 1.07, duration: 1.0, ease: "power1.in" }, 1.5);

  /* ════════ 2 · Component wall ════════ */
  const wallScene = q("#s-wall");
  zoomThrough(intro, wallScene, T.wall);
  drift(wallScene, T.wall, 3.9);
  const wall = q(".wall", wallScene);
  tl.fromTo(
    wall,
    { rotationX: V ? 22 : 30, rotationZ: V ? -8 : -12, scale: V ? 1.2 : 1.3, y: 50 },
    { rotationX: 6, rotationZ: -2, scale: V ? 0.98 : 1.0, y: 0, duration: 3.5, ease: "power2.out" },
    T.wall,
  );
  const tiles = qa(".w-tile", wall);
  const mid = (tiles.length - 1) / 2;
  tl.fromTo(
    tiles,
    { opacity: 0, scale: 0.3, y: 120, rotationX: -70 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      rotationX: 0,
      duration: 0.6,
      ease: "back.out(1.4)",
      stagger: (i) => Math.abs(i - mid) * 0.032,
    },
    T.wall + 0.05,
  );
  const stat = q(".big-stat", wallScene);
  tl.fromTo(stat, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(2)" }, T.wall + 0.35);
  counter(q(".count", wallScene), 0, 66, T.wall + 0.4, 1.1);

  // Micro-interactions on the beat.
  const swA = q(".sw-a", wall);
  state(T.wall + 1.0, (on) => {
    swA.classList.toggle("is-on", on);
    swA.setAttribute("aria-checked", String(on));
  });
  const ckB = q(".ck-b input", wall) || q('[data-k="check"] input:not([checked])', wall);
  if (ckB) state(T.wall + 1.5, (on) => (ckB.checked = on));
  const tabBtns = qa('[data-k="tabs"] .ui-tabs__tab', wall);
  [
    [T.wall + 1.25, 1],
    [T.wall + 2.25, 2],
  ].forEach(([t, idx]) =>
    state(t, (on) => {
      const active = on ? idx : idx - 1;
      tabBtns.forEach((b, i) => b.classList.toggle("is-active", i === active));
    }),
  );
  const toggles = qa('[data-k="toggle"] .ui-toggle', wall);
  [
    [T.wall + 1.75, 2],
    [T.wall + 2.75, 0],
  ].forEach(([t, idx], n) =>
    state(t, (on) => {
      const prev = n === 0 ? 1 : 2;
      toggles.forEach((b, i) => b.classList.toggle("is-on", i === (on ? idx : prev)));
    }),
  );
  const slider = q('[data-k="slider"] input', wall);
  const sp = { v: 64 };
  tl.to(sp, { v: 12, duration: 0.6, ease: "power2.inOut", onUpdate: () => (slider.value = sp.v) }, T.wall + 1.0);
  tl.to(sp, { v: 94, duration: 0.8, ease: "power3.inOut", onUpdate: () => (slider.value = sp.v) }, T.wall + 1.9);
  const prog = q('[data-k="progress"]', wall);
  const progLabel = qa(".ui-progress__head span", prog)[1];
  const pp = { v: 8 };
  tl.to(
    pp,
    {
      v: 100,
      duration: 2.2,
      ease: "power1.inOut",
      onUpdate: () => {
        q(".ui-progress__bar", prog).style.width = `${pp.v}%`;
        progLabel.textContent = `${Math.round(pp.v)}%`;
      },
    },
    T.wall + 0.6,
  );
  tl.fromTo(
    qa('[data-k="otp"] input, [data-k="otp"] .ui-otp__cell, [data-k="otp"] .ui-otp > *', wall),
    { scale: 0.2, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(3)", stagger: 0.12 },
    T.wall + 0.9,
  );
  revealCharts(q('[data-k="spark"]', wall), T.wall + 0.8);
  revealCharts(q('[data-k="radial"]', wall), T.wall + 0.8);
  tl.fromTo(
    qa('[data-k="badges"] .ui-badge', wall),
    { scale: 0 },
    { scale: 1, duration: 0.35, ease: "back.out(3)", stagger: 0.1 },
    T.wall + 1.2,
  );
  tl.fromTo(
    qa('[data-k="avatar"] .ui-avatar', wall),
    { x: -30, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.35, ease: "back.out(2)", stagger: 0.08 },
    T.wall + 1.4,
  );

  /* ════════ 3 · Themes ════════ */
  const layers = qa(".theme-layer");
  zoomThrough(wallScene, layers[0], T.themes);
  layers.forEach((layer) => drift(layer, T.themes, 4.2));
  tl.fromTo(
    qa(".hc", document).filter((el) => el.closest(".theme-layer")),
    { scale: 1, y: 8 },
    { scale: 1.035, y: -8, duration: 4.4, ease: "none" },
    T.themes,
  );
  const firstCards = qa(".hc-card", layers[0]);
  tl.fromTo(
    firstCards,
    { opacity: 0, y: 50, scale: 0.94 },
    { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.5)", stagger: 0.06 },
    T.themes + 0.1,
  );
  tl.fromTo(q(".tswitch", layers[0]), { y: -70 }, { y: 0, duration: 0.5, ease: "back.out(2)" }, T.themes + 0.15);
  revealCharts(layers[0], T.themes + 0.25);

  // Iris from the active theme dot (constants match .tswitch layout in promo.css).
  const pillLeft = W / 2 - 150;
  const pillTop = V ? 150 : 24;
  for (let i = 1; i < layers.length; i += 1) {
    const t = T.themes + T.themeStep * i;
    const dotX = pillLeft + 16 + 10 + i * 28;
    const dotY = pillTop + 23;
    iris(layers[i - 1], layers[i], t, dotX, dotY, 0.55);
    const dot = qa(".tdot", layers[i])[i];
    tl.fromTo(dot, { scale: 0.6 }, { scale: 1, duration: 0.4, ease: "back.out(4)" }, t + 0.1);
    tl.fromTo(q(".tname", layers[i]), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, t + 0.15);
    const bars = qa(".hc-bars .chart-bar__fill", layers[i]);
    tl.fromTo(
      bars,
      { scaleY: 0.25, transformOrigin: "50% 100%" },
      { scaleY: 1, duration: 0.45, ease: "back.out(1.8)", stagger: 0.02 },
      t + 0.1,
    );
  }

  /* ════════ 4 · Taste dials ════════ */
  const taste = q("#s-taste");
  push(layers[layers.length - 1], taste, T.taste);
  drift(taste, T.taste, 3.9);
  tl.fromTo(
    q(".taste-panel", taste),
    { x: V ? 0 : -60, y: V ? 60 : 0, opacity: 0 },
    { x: 0, y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
    T.taste + 0.25,
  );
  tl.fromTo(
    qa(".tt-card, .tt-chip", taste),
    { y: 40, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)", stagger: 0.08 },
    T.taste + 0.3,
  );
  revealCharts(q(".tt", taste), T.taste + 0.45);
  tl.fromTo(q(".tt-card", taste), { rotationY: V ? 0 : -10, rotationX: V ? 8 : 0 }, { rotationY: V ? 0 : 8, rotationX: V ? -6 : 0, duration: 3.4, ease: "sine.inOut" }, T.taste + 0.2);

  const hueInput = q(".ts-hue input", taste);
  const hueLabel = q(".ts-hue .ui-slider__value", taste);
  const hp = { h: 199 };
  tl.to(
    hp,
    {
      h: 199 + 360,
      duration: 1.5,
      ease: "power1.inOut",
      onUpdate: () => {
        hueVars(taste, hp.h, false);
        const v = Math.round(hp.h % 360);
        hueInput.value = v;
        hueLabel.textContent = v;
      },
    },
    T.taste + 0.7,
  );

  const radInput = q(".ts-radius input", taste);
  const radLabel = q(".ts-radius .ui-slider__value", taste);
  const rp = { r: 1 };
  const applyR = () => {
    radiusVars(taste, rp.r);
    radInput.value = rp.r;
    radLabel.textContent = rp.r.toFixed(2);
  };
  tl.to(rp, { r: 0, duration: 0.35, ease: "power2.inOut", onUpdate: applyR }, T.taste + 1.6);
  tl.to(rp, { r: 2, duration: 0.5, ease: "power2.inOut", onUpdate: applyR }, T.taste + 2.05);
  tl.to(rp, { r: 1, duration: 0.4, ease: "back.out(2)", onUpdate: applyR }, T.taste + 2.65);

  const blurInput = q(".ts-blur input", taste);
  const blurLabel = q(".ts-blur .ui-slider__value", taste);
  const glowInput = q(".ts-glow input", taste);
  const glowLabel = q(".ts-glow .ui-slider__value", taste);
  const bp = { b: 22, g: 55 };
  const applyB = () => {
    taste.style.setProperty("--t-glass-blur", `${bp.b}px`);
    taste.style.setProperty("--t-ring-glow", String(bp.g / 100));
    blurInput.value = bp.b;
    blurLabel.textContent = Math.round(bp.b);
    glowInput.value = bp.g;
    glowLabel.textContent = Math.round(bp.g);
  };
  tl.to(bp, { b: 2, g: 100, duration: 0.4, ease: "power2.inOut", onUpdate: applyB }, T.taste + 2.3);
  tl.to(bp, { b: 40, g: 20, duration: 0.5, ease: "power2.inOut", onUpdate: applyB }, T.taste + 2.75);
  tl.to(bp, { b: 22, g: 55, duration: 0.35, ease: "power2.out", onUpdate: applyB }, T.taste + 3.25);

  /* ════════ 5 · Charts, one per beat ════════ */
  const slides = qa(".cslide");
  slides.forEach((slide, i) => {
    const t = T.charts + i * T.slide;
    const prev = i === 0 ? taste : slides[i - 1];
    whip(prev, slide, t, 1, i === 0 ? 0.32 : 0.24);
    drift(slide, t, 0.9);
    tl.fromTo(
      q(".cslide__word", slide),
      { x: V ? 0 : 140, y: V ? 120 : 0 },
      { x: V ? 0 : -140, y: V ? -120 : 0, duration: 0.8, ease: "none" },
      t,
    );
    tl.fromTo(
      q(".chart-card", slide),
      { scale: 0.88, rotationY: V ? 0 : -14, rotationX: V ? 12 : 0 },
      { scale: 1, rotationY: 0, rotationX: 0, duration: 0.45, ease: "power3.out" },
      t + 0.05,
    );
    tl.fromTo(q(".cslide__count", slide), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 }, t + 0.1);
    revealCharts(slide, t + 0.1, 0.55);
  });

  /* ════════ 6 · Chart mosaic ════════ */
  const mosaicScene = q("#s-mosaic");
  const lastSlide = slides[slides.length - 1];
  tl.set(lastSlide, { zIndex: 10 }, T.mosaic);
  tl.to(lastSlide, { scale: 0.25, opacity: 0, rotation: -8, duration: 0.4, ease: "power3.in" }, T.mosaic);
  tl.set(lastSlide, { display: "none", zIndex: "auto" }, T.mosaic + 0.4);
  tl.fromTo(mosaicScene, { display: "block", opacity: 0 }, { opacity: 1, duration: 0.25, immediateRender: false }, T.mosaic);
  drift(mosaicScene, T.mosaic, 2.7);
  const cells = qa(".mz", mosaicScene);
  const cols = V ? 3 : 4;
  tl.fromTo(
    cells,
    {
      opacity: 0,
      x: (i) => ((i % cols) - (cols - 1) / 2) * 260,
      y: (i) => (Math.floor(i / cols) - 1.5) * 200,
      z: -900,
      rotationY: (i) => ((i % cols) - (cols - 1) / 2) * 30,
      rotationX: (i) => (Math.floor(i / cols) - 1.5) * -25,
    },
    { opacity: 1, x: 0, y: 0, z: 0, rotationY: 0, rotationX: 0, duration: 0.8, ease: "expo.out", stagger: 0.045 },
    T.mosaic + 0.1,
  );
  cells.forEach((cell, i) => revealCharts(cell, T.mosaic + 0.35 + i * 0.045, 0.7));
  tl.fromTo(
    q(".mosaic", mosaicScene),
    { scale: 1.12, rotationX: 10 },
    { scale: V ? 0.98 : 0.96, rotationX: 0, duration: 2.6, ease: "power2.out" },
    T.mosaic,
  );

  /* ════════ 7 · SaaS dashboards coverflow ════════ */
  const dashScene = q("#s-dash");
  zoomThrough(mosaicScene, dashScene, T.dash);
  drift(dashScene, T.dash, 4.3);
  const dashes = qa(".dash", dashScene);
  const flow = { p: -0.6 };
  const layout = () => {
    dashes.forEach((el, i) => {
      const d = i - flow.p;
      const a = Math.min(Math.abs(d), 3);
      gsap.set(el, V
        ? { x: 0, y: d * 470, z: -a * 420, rotationX: -d * 26, rotationY: 0, scale: 0.5, opacity: 1 - Math.max(0, a - 1.6) }
        : { x: d * 600, y: 0, z: -a * 460, rotationY: -d * 34, rotationX: 0, scale: 0.6, opacity: 1 - Math.max(0, a - 1.8) });
    });
  };
  tl.to(flow, { p: 0, duration: 0.5, ease: "power3.out", onUpdate: layout }, T.dash);
  [0, 1, 2, 3].forEach((n) =>
    tl.to(flow, { p: n + 1, duration: 0.55, ease: "power3.inOut", onUpdate: layout }, T.dash + 0.8 + n * 0.75),
  );
  tl.to(flow, { p: 4.3, duration: 0.6, ease: "power1.in", onUpdate: layout }, T.dash + 3.6);
  const dstat = q(".big-stat--dash", dashScene);
  tl.fromTo(dstat, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(2)" }, T.dash + 0.4);

  /* ════════ 8 · Icons ════════ */
  const iconScene = q("#s-icons");
  iris(dashScene, iconScene, T.icons, W / 2, H / 2, 0.5);
  drift(iconScene, T.icons, 2.6);
  const rings = qa(".ic-ring", iconScene);
  const icCols = V ? 5 : 10;
  const icRows = Math.ceil(rings.length / icCols);
  const cellW = 64 + (V ? 50 : 40);
  const cellH = 64 + (V ? 40 : 30);
  const offX = (i) => ((i % icCols) - (icCols - 1) / 2) * cellW;
  const offY = (i) => (Math.floor(i / icCols) - (icRows - 1) / 2) * cellH;
  tl.fromTo(
    rings,
    { scale: 0, rotation: -120, opacity: 0 },
    {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(2.2)",
      stagger: (i) => Math.hypot(offX(i), offY(i)) * 0.0011,
    },
    T.icons + 0.1,
  );
  tl.to(
    rings,
    {
      y: -16,
      duration: 0.25,
      ease: "sine.inOut",
      yoyo: true,
      repeat: 1,
      stagger: (i) => (i % icCols) * 0.05 + Math.floor(i / icCols) * 0.03,
    },
    T.icons + 0.95,
  );
  tl.to(
    rings,
    {
      x: (i) => -offX(i),
      y: (i) => -offY(i),
      scale: 0.2,
      opacity: 0,
      rotation: 180,
      duration: 0.45,
      ease: "power3.in",
      stagger: (i) => (1 - Math.hypot(offX(i), offY(i)) / 600) * 0.15,
    },
    T.outro - 0.45,
  );

  /* ════════ 9 · Outro ════════ */
  const outro = q("#s-outro");
  tl.fromTo(outro, { display: "block", opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, T.outro - 0.1);
  tl.set(iconScene, { display: "none" }, T.outro + 0.2);
  drift(outro, T.outro - 0.1, T.end - T.outro + 0.1);
  tl.fromTo(
    q(".outro__logo", outro),
    { scale: 0, rotation: -180 },
    { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(2)" },
    T.outro,
  );
  tl.fromTo(
    qa(".outro__title .ch", outro),
    { y: 70, opacity: 0, filter: "blur(8px)" },
    { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.55, ease: "expo.out", stagger: 0.035 },
    T.outro + 0.25,
  );
  tl.fromTo(
    q(".outro__npm", outro),
    { scale: 0.6, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2)" },
    T.outro + 0.8,
  );
  tl.fromTo(
    q(".outro__npm .cmd", outro),
    { clipPath: "inset(0 100% 0 0)" },
    { clipPath: "inset(0 0% 0 0)", duration: 0.85, ease: "steps(17)" },
    T.outro + 1.0,
  );
  tl.fromTo(
    q(".caret", outro),
    { opacity: 0 },
    { opacity: 1, duration: 0.25, ease: "steps(1)", yoyo: true, repeat: 5 },
    T.outro + 1.85,
  );
  tl.fromTo(
    qa(".outro__stats .stat", outro),
    { y: 30, opacity: 0, scale: 0.8 },
    { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2)", stagger: 0.1 },
    T.outro + 1.5,
  );
  tl.fromTo(q(".outro", outro), { scale: 1 }, { scale: 1.04, duration: T.end - T.outro - 1.5, ease: "none" }, T.outro + 1.5);
  tl.to(q(".outro", outro), { opacity: 0, duration: 0.5, ease: "power2.in" }, T.end - 0.5);

  window.__timelines["main"] = tl;
})();
