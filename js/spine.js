/* ==========================================================================
   Glass spine illustration (side view), drawn as SVG from a handful of numbers.
   Used in the "A closer look at every part of your spine" section.

   ChiroSpine.mount(element)           draws the spine into the element
   ChiroSpine.set(element, region)     highlights 'cervical' | 'thoracic' | 'lumbar' | 'pelvis' (or null)

   To change the look: edit CENTERLINE (the spine's curve), the SIZES in build(),
   or the gradient colours in defs().
   ========================================================================== */
(function () {
  'use strict';

  // The spine's curve, top to bottom. x grows toward the front of the body.
  const CENTERLINE = [
    [200, 36], [214, 86], [220, 134], [212, 184], [194, 226], [168, 278], [148, 336], [146, 396],
    [158, 448], [182, 492], [206, 540], [222, 590], [222, 640], [206, 684], [176, 730], [142, 772], [124, 800],
  ];
  const RIBS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // rib length per thoracic vertebra (0 = none). Try [58, 92, 122, 142, 152, 158, 158, 148, 128, 98, 68, 48] for a rib cage
  const f1 = (n) => Math.round(n * 10) / 10;

  /* ---- curve helpers: smooth line through the points, then "where is arc-length s?" ---- */
  function makeCurve(pts, per) {
    const P = [pts[0], ...pts, pts[pts.length - 1]];
    const out = [];
    for (let i = 1; i < P.length - 2; i++) {
      for (let k = 0; k < per; k++) {
        const u = k / per, u2 = u * u, u3 = u2 * u;
        const c = (a) => 0.5 * (2 * P[i][a] + (-P[i - 1][a] + P[i + 1][a]) * u +
          (2 * P[i - 1][a] - 5 * P[i][a] + 4 * P[i + 1][a] - P[i + 2][a]) * u2 +
          (-P[i - 1][a] + 3 * P[i][a] - 3 * P[i + 1][a] + P[i + 2][a]) * u3);
        out.push([c(0), c(1)]);
      }
    }
    out.push(pts[pts.length - 1]);
    const cum = [0];
    for (let i = 1; i < out.length; i++) cum.push(cum[i - 1] + Math.hypot(out[i][0] - out[i - 1][0], out[i][1] - out[i - 1][1]));
    return { pts: out, cum, len: cum[cum.length - 1] };
  }
  function at(c, s) {
    s = Math.max(0, Math.min(c.len, s));
    let lo = 0, hi = c.cum.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (c.cum[m] < s) lo = m; else hi = m; }
    const a = c.pts[lo], b = c.pts[hi], seg = c.cum[hi] - c.cum[lo] || 1, f = (s - c.cum[lo]) / seg;
    const a2 = c.pts[Math.max(0, lo - 1)], b2 = c.pts[Math.min(c.pts.length - 1, hi + 1)];
    let tx = b2[0] - a2[0], ty = b2[1] - a2[1];
    const l = Math.hypot(tx, ty) || 1;
    return { x: a[0] + (b[0] - a[0]) * f, y: a[1] + (b[1] - a[1]) * f, tx: tx / l, ty: ty / l };
  }
  // local drawing space of one bone: x points to the front of the body, y points down the spine
  const place = (p) => `matrix(${f1(p.ty * 100) / 100} ${f1(-p.tx * 100) / 100} ${f1(p.tx * 100) / 100} ${f1(p.ty * 100) / 100} ${f1(p.x)} ${f1(p.y)})`;

  function defs() {
    return `<defs>
      <linearGradient id="sp-glass" x1=".25" y1="0" x2=".55" y2="1">
        <stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset=".3" stop-color="#f0fcc6" stop-opacity=".98"/><stop offset=".72" stop-color="#b9ec4e" stop-opacity=".98"/><stop offset="1" stop-color="#6db514" stop-opacity=".98"/>
      </linearGradient>
      <linearGradient id="sp-proc" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#a8de3a" stop-opacity=".95"/><stop offset="1" stop-color="#f4fdd8" stop-opacity=".98"/>
      </linearGradient>
      <radialGradient id="sp-disc" cx=".5" cy=".5" r=".7">
        <stop offset="0" stop-color="#e9ff8a" stop-opacity="1"/><stop offset="1" stop-color="#6fbf10" stop-opacity=".95"/>
      </radialGradient>
      <radialGradient id="sp-lime" cx=".5" cy=".5" r=".7">
        <stop offset="0" stop-color="#d9ff6a" stop-opacity=".95"/><stop offset="1" stop-color="#a6e21e" stop-opacity=".6"/>
      </radialGradient>
      <linearGradient id="sp-rib" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#8fcf22" stop-opacity=".95"/><stop offset=".5" stop-color="#d4f58a" stop-opacity=".85"/><stop offset="1" stop-color="#e9ffb0" stop-opacity="0"/>
      </linearGradient>
      <filter id="sp-blur" x="-30%" y="-10%" width="160%" height="120%"><feGaussianBlur stdDeviation="5"/></filter>
    </defs>`;
  }

  function build() {
    const curve = makeCurve(CENTERLINE, 26);
    const parts = [];          // vertebrae, discs, ribs (drawn in this order)
    const cord = [];           // points along the back of the spine for the glowing nerve line
    let s = 12, n = 0;

    const bone = (region, h, d, spLen, slope, rib, gap) => {
      const p = at(curve, s + h / 2);
      const x0 = -d / 2;
      const tipY = h * 0.1 + slope * h * 0.95;
      let g = `<g class="vert" data-region="${region}" transform="${place(p)}">`;
      if (rib) {
        g += `<path d="M${f1(x0 + 2)} 0C${f1(x0 + 2 + rib * 0.2)} -13 ${f1(rib * 0.62)} ${f1(rib * 0.1)} ${f1(rib)} ${f1(rib * 0.36 + 10)}" fill="none" stroke="url(#sp-rib)" stroke-width="3" stroke-linecap="round" opacity=".85"/>`;
      }
      // spinous process (the bump you can feel down your back)
      g += `<path d="M${f1(x0 + 2)} ${f1(-h * 0.3)}L${f1(x0 - spLen)} ${f1(tipY - 2.4)}Q${f1(x0 - spLen - 3)} ${f1(tipY)} ${f1(x0 - spLen)} ${f1(tipY + 2.6)}L${f1(x0 + 2)} ${f1(h * 0.24)}Z" fill="url(#sp-proc)" stroke="#5f9a0c" stroke-opacity=".7" stroke-width="1" stroke-linejoin="round"/>`;
      g += `<ellipse cx="${f1(x0 - 3)}" cy="0" rx="7" ry="${f1(h * 0.36)}" fill="url(#sp-proc)" stroke="#5f9a0c" stroke-opacity=".65" stroke-width="1"/>`;
      g += `<ellipse cx="${f1(x0 + 1)}" cy="${f1(-h / 2 + 1)}" rx="5.5" ry="3.4" fill="url(#sp-proc)" stroke="#5f9a0c" stroke-opacity=".6" stroke-width="1"/>`;
      g += `<ellipse cx="${f1(x0 + 1)}" cy="${f1(h / 2 - 1)}" rx="5.5" ry="3.4" fill="url(#sp-proc)" stroke="#5f9a0c" stroke-opacity=".6" stroke-width="1"/>`;
      // vertebral body
      g += `<rect x="${f1(x0)}" y="${f1(-h / 2)}" width="${f1(d)}" height="${f1(h)}" rx="${f1(Math.min(h * 0.34, 8))}" fill="url(#sp-glass)" stroke="#5f9a0c" stroke-opacity=".75" stroke-width="1"/>`;
      g += `<rect x="${f1(x0 + 3)}" y="${f1(-h / 2 + 2)}" width="${f1(d * 0.55)}" height="2.4" rx="1.2" fill="#fff" opacity=".8"/>`;
      g += `<rect class="vglow" style="--n:${n}" x="${f1(x0)}" y="${f1(-h / 2)}" width="${f1(d)}" height="${f1(h)}" rx="${f1(Math.min(h * 0.34, 8))}" fill="url(#sp-lime)"/>`;
      g += `</g>`;
      parts.push(g);
      cord.push(p, d);
      const end = s + h;
      if (gap) { // the disc that cushions the gap below this bone
        const q = at(curve, end + gap / 2), dd = d * 0.94;
        parts.push(`<g class="vert" data-region="${region}" transform="${place(q)}"><rect x="${f1(-dd / 2)}" y="${f1(-gap / 2 - 0.6)}" width="${f1(dd)}" height="${f1(gap + 1.2)}" rx="${f1(gap / 2)}" fill="url(#sp-disc)"/></g>`);
      }
      s = end + gap; n++;
    };

    for (let i = 0; i < 7; i++) bone('cervical', i === 0 ? 13 : 15 + i * 0.55, i === 0 ? 28 : 30 + i * 1.6, i === 6 ? 32 : 13 + i * 1.3, 0.15, 0, 4);
    for (let i = 0; i < 12; i++) bone('thoracic', 20 + i * 0.75, 40 + i * 1.9, i < 9 ? 30 - i * 0.4 : 20, i < 9 ? 0.95 : 0.45, RIBS[i], 5);
    for (let i = 0; i < 5; i++) bone('lumbar', 28 + i * 0.7, 62 + i * 2.2, 25, 0.08, 0, 7);

    // sacrum: one curved wedge that tapers to a tip, then three small coccyx bones
    const sacLen = 104, wTop = 84, wTip = 20, N = 30, ant = [], post = [];
    for (let k = 0; k < N; k++) {
      const t = k / (N - 1), p = at(curve, s + sacLen * t), w = wTip + (wTop - wTip) * Math.pow(1 - t, 0.8);
      ant.push(`${f1(p.x + p.ty * w / 2)} ${f1(p.y - p.tx * w / 2)}`);
      post.push(`${f1(p.x - p.ty * w / 2)} ${f1(p.y + p.tx * w / 2)}`);
    }
    let sac = `<g class="vert" data-region="pelvis"><path d="M${ant.join('L')}L${post.reverse().join('L')}Z" fill="url(#sp-glass)" stroke="#5f9a0c" stroke-opacity=".75" stroke-width="1.2" stroke-linejoin="round"/>`;
    for (let k = 0; k < 4; k++) {
      const tt = 0.13 + k * 0.2, p = at(curve, s + sacLen * tt), w = (wTip + (wTop - wTip) * Math.pow(1 - tt, 0.8)) * 0.26;
      sac += `<ellipse cx="${f1(p.x - p.ty * w)}" cy="${f1(p.y + p.tx * w)}" rx="${f1(3.6 - k * 0.4)}" ry="${f1(3.2 - k * 0.3)}" fill="#c4ea6a" opacity=".85"/>`;
    }
    sac += `<path class="vglow" style="--n:${n}" d="M${ant.join('L')}L${post.join('L')}Z" fill="url(#sp-lime)"/></g>`;
    parts.push(sac);
    let cs = s + sacLen + 6;
    [[15, 12], [12, 10.5], [9, 9]].forEach(([w, h], i) => {
      const p = at(curve, cs + h / 2);
      parts.push(`<g class="vert" data-region="pelvis" transform="${place(p)}"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h * 0.38}" fill="url(#sp-glass)" stroke="#5f9a0c" stroke-opacity=".75" stroke-width="1"/></g>`);
      cs += h + 2;
    });

    // glowing nerve line down the back of the spine
    const line = [];
    for (let i = 0; i < cord.length; i += 2) {
      const p = cord[i], d = cord[i + 1];
      line.push(`${f1(p.x - p.ty * (d / 2 + 5))} ${f1(p.y + p.tx * (d / 2 + 5))}`);
    }
    const cordPath = 'M' + line.join('L');
    const cordSvg = `<path d="${cordPath}" fill="none" stroke="#b6ef3c" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" opacity=".5" filter="url(#sp-blur)"/>` +
      `<path class="cord" d="${cordPath}" fill="none" stroke="#e6ff9a" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`;

    return `<svg viewBox="0 0 420 830" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">${defs()}${parts.join('')}${cordSvg}</svg>`;
  }

  window.ChiroSpine = {
    mount(el) { if (el) el.innerHTML = build(); },
    set(el, region) {
      if (!el) return;
      if (region) el.setAttribute('data-active', region); else el.removeAttribute('data-active');
    },
  };
})();
