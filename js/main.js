/* ==========================================================================
   Chiro Core — page behaviour (no libraries)
   1  Videos     the VIDEOS list below feeds the grid, filters and player
   2  Everything else is small, independent blocks marked with ---------- headings
   ========================================================================== */
(() => {
  'use strict';

  /* ------------------------------------------------------------------------
     VIDEOS — real videos from youtube.com/@ChiroCore (titles, views and lengths
     as shown on YouTube in October 2026). To add one: add a line here (id = the part
     after v= in the YouTube link). Its thumbnail is loaded from YouTube automatically;
     for faster loading you can add images/v-<id>-480.webp and -800.webp (see README).
     topic: neck | back | limbs | family | sport | long     lq: tiny blurred preview (optional)
     ------------------------------------------------------------------------ */
  const VIDEOS = [
    { id: 'EhzLv5tlxGY', t: 'Patient was Unable to Walk - Then This Happened', v: '31M', d: '6:19', topic: 'back',
      lq: 'data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAAAQBQCdASogABIAPwl4tVMrpyUiqAqpcCEJQBWAAevwF7D+zpdzvD7PMnElXt17MNsIAP7JFV5pkXgocgKepuKgDpcmYVyDywVXqNtoSl1UgVLfXWdjGwn2GnAzg/23QXi/TRfQpkhUur/WyXwqn9oZ92yDoprXiFIAAA==' },
    { id: '1Etpq3cGNoM', t: 'Extremely Flexible Girl Receives Gonstead Adjustment', v: '25M', d: '4:09', topic: 'back',
      lq: 'data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAACQBACdASogABIAPwl0r1ArpyQisAgBcCEJYwDE2Ayh7XKZdR2tsSHg01aUFKAA/rsNkxYQTA3AZEv+g4YXCWMVe3u3GZzlk40JNDavDSYCjYdUisiZZoDJkDkEveZqz1RV5Q/Wz6ReL21iGgA=' },
    { id: 'mqvVpxAJGJ4', t: 'He Couldn’t Control the Neck Pain', v: '21M', d: '7:27', topic: 'neck',
      lq: 'data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAADwBACdASogABIAPwlysVIrpqSisBgIAXAhCWMAwzQKVHJ0qko5BkmAi9zGSBo3I4AA/W8ietZ+02P+N8zkqxyZgQ69K3YQ7N4XNKGdf+Eh+Qmx9YBckyr0jX+2YQL1QtNrwAAA' },
    { id: 'tK6HPhbcdas', t: 'From Sudden Neck Pain to Relief', v: '15M', d: '5:30', topic: 'neck',
      lq: 'data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAABQBACdASogABIAPwFsqU+rJiOiMAwBYCAJZQAAQULdRKTNXLYZBlF6ipmAAP5dvstzvppArLG8lUI2h53dPGRM2nRfJbTGRzVMlyDjMn9w+ok/h4HgAA==' },
    { id: 'xKC-t4OcHrg', t: 'She Was in Serious Arm Pain — Then This Happened', v: '7.1M', d: '8:40', topic: 'limbs',
      lq: 'data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAADQBACdASogABIAPwFoq0+rJiQiMAwBYCAJYwC32QytWAM82/25PCBb0ILEneb9gAD+pmJ6A/MwAVkU2X1pm4qYWJ5++NmVThaz2XrtMOHtH+UkR/vLNVguLdXMM63ZFNFj/tWkwN6XqdrIQe7G38rVgxSm+SSvHOWWOr8VwgA=' },
    { id: 'UZePzBEdbLU', t: 'Watch His Arm After This', v: '6.8M', d: '4:57', topic: 'limbs',
      lq: 'data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAADQBACdASogABIAPwl0sVGrpqSisBgIAXAhCWUAsOwLxkJtqEIMXoTm+R5E4DkGMAD90o7TmsKHLMbK+INl3UR/fBzuLcGLo4GrSOWw4fUfSG1sV7hFmDEII3+IpjZhP9RXwYuqEnPWNkpx74RAAA==' },
    { id: 'eJy1Te6gNfM', t: 'Helping a Child With Hearing Issues', v: '5.9M', d: '6:11', topic: 'family',
      lq: 'data:image/webp;base64,UklGRpYAAABXRUJQVlA4IIoAAABwBQCdASogABIAPwl4sVGrp6SisBgIAXAhCWgAtRqABRrCKDfOV20pGQfcxrwISMw1M98AAP7uiF0FR8jWAFdoJxA5XXrxJq3BxVG5449T3PTmRWQX7WlUA7G3T1sELKi/FxbO7F4dLkGcvGsIE8NHzxMw9E08HZVMiJfhwWGUADFZOG9Kb32D4AA=' },
    { id: 'EisjkH_0yAM', t: 'After a Fall, a Child Comes in for Jaw Help', v: '4.7M', d: '7:01', topic: 'family',
      lq: 'data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAACQBACdASogABIAPv1qq0+rJiQiMAwBYB+JYwC/7CH49ZVO4MTuqj1PuEoHEgAA/tVZO0X7gmqkpsArfRy0yJknjSeFthg2pyOyETTDIU1RfSfNbUrss4WSGkP99Yf/r7LuDNOLN0L2C/o7GVCAAA==' },
    { id: '_MG0l2aErAA', t: 'When an Athlete Pushes Their Body Too Far', v: '4.6M', d: '6:14', topic: 'sport',
      lq: 'data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAAAwBQCdASogABIAPwl2sFErp6SisBgIAXAhCUATplqohAK5/jRa5vieeXlQT/FC2bg4HAD+7Uw3sucvdM/Kdtk/iAJVFX8NnHMGuRDqryG/zqkAZVB4ThdyikBaxOj2gArtpFfenwLTo0MVLIbMH9+bS+c/ldR8XJ4lg9AJcGGMTfkmivgAAA==' },
    { id: 'N1rv2HCjsnw', t: 'How a Gentle Chiropractic Adjustment Is Done', v: '4.4M', d: '6:17', topic: 'back',
      lq: 'data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAAAwBQCdASogABIAPwlwrlArpqQisAgBcCEJYwC2+y/DNlwEy1na+BuCYH2B75p59sQdgAD+5F6PGZCfIGGBFIqHCn/a3pry5cBpinEubSv38mbyKrVYL5hRqzjQLNTUqR2vCns5/aFy9TCje1Emzsh/SUKCBLT+aEoMFAg7MsFb20QLTQAAAA==' },
    { id: 'MyiipqA1Orw', t: 'When Knee Pain Becomes a Daily Struggle', v: '3.4M', d: '4:27', topic: 'limbs',
      lq: 'data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAAAwBQCdASogABIAPvlmqk+qpaQiN/qoAVAfCWUAznQWaBoGk5AWH/SrYPwKFa926UCu6AD+pVcDgjH2oa2AK7Q5PDEESkb42yHAx24zeDIO2nSIJX8LoAB5062gZloCexRf5JvD7s23tQAA' },
    { id: 'O0PqWplY_m4', t: 'After a Bad Fall, a 5-Year-Old Comes In for Help', v: '1.9M', d: '7:32', topic: 'family',
      lq: 'data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAABwBACdASogABIAPwFqq0+rJiOiMAwBYCAJQBWAA2ZorWeiTHuzhasIxCl/TAD+YAUteuxNuUn9pYbzTZZPdt/xoLDRROnEzRDRlQzrA7XbHhZg866Aglhlse6aB5jk89Hp4cHp50GSTyo9FAA=' },
    { id: 'rvgtYUH-Z_g', t: 'From Crutches to Moving Freely', v: '1.7M', d: '6:49', topic: 'limbs',
      lq: 'data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAADQBACdASogABIAPv1orE+rJiQiMAwBYB+JYwDA3CCnQZ9awD3EqJNxEuDYVaHWAAD+PRJ8cvj6lmUDqNmH5Vl0BzrVVD3RsUlMVOGnECZQnd7nMjpRAmlcWNKjF3o1QuNUAAAA' },
    { id: 'hXFDRVc7P4M', t: 'A Careful Adjustment During Late Pregnancy', v: '1.4M', d: '6:59', topic: 'family',
      lq: 'data:image/webp;base64,UklGRpQAAABXRUJQVlA4IIgAAADQBACdASogABIAPwl4sVErp6SisBgIAXAhCWUAuwAJuvXPBlGF8Ev3jQ1q0sUdOAD+1C5zlHuO5p7j16h9I2ZUcz6oDDej9afnGaNpAO6WQa8X5SAdpLe5auIesanRxUcmU4Nx4AFEXPFB+eEUjToxnV3MxRRg8blwViyQhfRQt7Gysv0d4AAA' },
    { id: 'cgUgbxf0xX8', t: 'What Years of Elite Training Did to His Body', v: '1.2M', d: '6:30', topic: 'sport',
      lq: 'data:image/webp;base64,UklGRpYAAABXRUJQVlA4IIoAAABQBQCdASogABIAPwl0r1ArpyQisAgBcCEJYgC1Guz7T8WCp2A1c6PEzealF6XSxMVl1OAA/tkhOWbKUq+2d5Ie272twFcIspb8tSO4nymI5WxPMITeql+z3yVp0dc86SYm57/jPSjgV41sWXTLX9r7mwIpuHjdPHaTMIaUCF6q6VnedCXBoEuCQAA=' },
    { id: 'a32bW9Ipwbw', t: 'She Tried to Move Her Neck — and Froze', v: '1M', d: '4:17', topic: 'neck',
      lq: 'data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAAAwBQCdASogABIAPwl0sFGrpqSisBgIAXAhCWQAtOgw7qZ227ZdBMm1AoV22igG+AIAgAD4H71q+zPLvpSdwRx7tL6Brfa+2GcMZLnI8qm+loxvf0ImoHzgu0cb7vlMcznsDBzKGixC70yqhgHPSmstz3kXtOd+HAA=' },
    { id: 'cp9wAyde9YQ', t: 'When Back Pain Suddenly Changes Everything', v: '746K', d: '3:43', topic: 'back',
      lq: 'data:image/webp;base64,UklGRoIAAABXRUJQVlA4IHYAAACwBACdASogABIAPwl0q0+rpyOiMBgMAXAhCWUArhwLxFDY/G8EWoV/BcOq6F3AAP7XbMdH735miZ+6KlyC776qcvgA0x2Fzhx6+IohL0mIXBJpT++kW9gAcOMDJOxKJLbAK+qwWS+CqelJAL3XqkeVkeikAAAA' },
    { id: '-VRNT66cS7U', t: 'After a 140mph Motorcycle Crash, Recovery Took a Different Path', v: '584K', d: '18:40', topic: 'sport',
      lq: 'data:image/webp;base64,UklGRrgAAABXRUJQVlA4IKwAAAAQBQCdASogABIAPwlsslKrpSSisBgIAXAhCWQAuzMbMkxiZKw0R1pdqu3b/P17NcCAAPAkoiv1zOKxFcIw15B5l4xA4t36b11/fRAt7+mNOjlyr52cVB2itUvJsMbEu+o8H/UC2uKR57Fb3IaH7w2mTWJvZLAj1fv25RBJxdf++n1RQ4XFsHAdmOOhbLoL9jTrx+WT6JmKmMElKAL+sjSEIOkxJJ1EQVzOYcAA' },
    { id: 'MsEx1S6-58c', t: 'Three Hours of Dr Ian’s Most Unforgettable Moments', v: '215K', d: '2:53:56', topic: 'long',
      lq: 'data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAAAwBQCdASogABIAPwl0sVArpySisAgBcCEJQBbfbIBAhGJSET8dkZH/UBkuYe8rUiYB4AD8pEinOciaaa8cCqTMHj8NUzQJlnHlW084y3a5xUFr9wZ/gBvJrR3MCb3NzBC6WkQFpklOsfi0Cwdf1TugR8NQVuEvj9I1W7l1CzdbCIKuRbgAAA==' },
    { id: '32rHxsaTRyA', t: 'Straightening The Spine Back Into Place', v: '89K', d: '15:17', topic: 'back',
      lq: 'data:image/webp;base64,UklGRpYAAABXRUJQVlA4IIoAAABQBQCdASogABIAPwlurk+rpiQiMAgBcCEJZgCdABn6Be8RL3K+KZd5in6VEAXHPPVMFgAA/rm+ek56aJik7zFDd19ZjwjzQvsOpIXJBZiXw6HQ8uMufuk6vDCaYj7VS67/PXGlORxDQBSpi2PN3lPzzV4S2pc5QEHR6fTbS7bBKvj4N4/cEOGZAAA=' },
  ];
  const TOPICS = {
    all: 'All cases', neck: 'Neck', back: 'Back & spine', limbs: 'Arms, legs & mobility',
    family: 'Children & family', sport: 'Sport & injury', long: 'Long-form',
  };
  const EMAIL = 'chirocoreco@gmail.com';
  const PAGE = 9;           // videos shown before "Show more"
  const NO_EMBED = !!window.CHIRO_NO_EMBED; // preview pages that can't embed YouTube link out instead

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // IntersectionObserver that also works inside preview iframes (root: document), with a plain fallback
  function observe(els, cb, opts = {}) {
    if (!('IntersectionObserver' in window)) { els.forEach((el) => cb([{ isIntersecting: true, target: el }], { unobserve() {} })); return null; }
    let io;
    try { io = new IntersectionObserver(cb, { root: document, ...opts }); } catch (e) { io = new IntersectionObserver(cb, opts); }
    els.forEach((el) => io.observe(el));
    return io;
  }

  /* ---------- photos: blurred preview fades into the real image ---------- */
  function markLoaded(root = document) {
    $$('.ph img', root).forEach((img) => {
      if (img.classList.contains('is-loaded')) return;
      if (img.complete && img.naturalWidth) img.classList.add('is-loaded');
      else img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
    });
  }
  markLoaded();
  const heroImg = $('.hero__photo img');
  if (heroImg) { if (heroImg.complete && heroImg.naturalWidth) heroImg.classList.add('is-loaded'); else heroImg.addEventListener('load', () => heroImg.classList.add('is-loaded'), { once: true }); }

  /* ---------- reveal on scroll ---------- */
  const reveals = $$('.reveal');
  const finishReveal = (el) => setTimeout(() => { el.classList.remove('reveal', 'is-in'); el.style.removeProperty('--d'); }, 1500 + (parseFloat(el.style.getPropertyValue('--d')) || 0) * 1000);
  if (reduce) reveals.forEach((el) => el.classList.add('is-in'));
  else {
    $$('.hero .reveal').forEach((el) => requestAnimationFrame(() => { el.classList.add('is-in'); finishReveal(el); }));
    observe($$('.reveal:not(.is-in)'), (entries, io) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in'); finishReveal(e.target); io.unobserve && io.unobserve(e.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
  }

  /* ---------- header: glass pill after scrolling, mobile menu, current section ---------- */
  const nav = $('#nav'), burger = $('#burger'), menu = $('#menu');
  const sections = ['topics', 'spine', 'videos', 'about', 'faq', 'contact'].map((id) => $('#' + id)).filter(Boolean);
  const dock = $('#dock');
  let dockDismissed = false;
  try { dockDismissed = sessionStorage.getItem('cc-dock') === '1'; } catch (e) { /* storage blocked */ }
  let ticking = false;
  function onScroll() {
    ticking = false;
    nav.classList.toggle('is-stuck', scrollY > 40);
    let cur = '';
    sections.forEach((s) => { if (s.getBoundingClientRect().top < innerHeight * 0.42) cur = s.id; });
    $$('.nav__links a').forEach((a) => a.classList.toggle('is-current', a.getAttribute('href') === '#' + cur));
    if (dock && !dockDismissed) {
      const c = $('#contact').getBoundingClientRect();
      dock.classList.toggle('is-hidden', scrollY < 320 || c.top < innerHeight * 0.55);
    }
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();
  if (dock && !dockDismissed) dock.classList.add('is-hidden');

  function setMenu(open) {
    menu.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', () => setMenu(menu.hidden));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });
  addEventListener('resize', () => { if (innerWidth > 960 && !menu.hidden) setMenu(false); });

  $('#dockX').addEventListener('click', () => {
    dockDismissed = true; dock.classList.add('is-hidden');
    try { sessionStorage.setItem('cc-dock', '1'); } catch (e) { /* ignore */ }
  });

  /* ---------- glass tilt + glare that follow the cursor ---------- */
  function tilt(el, target, max, guard) {
    if (!canHover || reduce) return;
    let raf = 0;
    el.addEventListener('pointermove', (e) => {
      if (guard && !guard()) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        target.classList.add('is-tilting');
        target.style.setProperty('--ry', ((px - 0.5) * max * 1.4).toFixed(2) + 'deg');
        target.style.setProperty('--rx', ((0.5 - py) * max).toFixed(2) + 'deg');
        target.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        target.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      });
    });
    el.addEventListener('pointerleave', () => {
      cancelAnimationFrame(raf);
      target.classList.remove('is-tilting');
      target.style.setProperty('--rx', '0deg'); target.style.setProperty('--ry', '0deg');
    });
  }

  /* ---------- topics: tilted card fan ---------- */
  const fan = $('#fan');
  const cards = $$('.fcard', fan);
  const half = Math.floor(cards.length / 2);
  let cur = 1, dragMoved = false;
  function render() {
    cards.forEach((c, j) => {
      let o = ((j - cur + cards.length + half) % cards.length) - half;
      c.style.setProperty('--o', o);
      c.style.setProperty('--a', Math.abs(o));
      c.style.zIndex = String(20 - Math.abs(o));
      c.classList.toggle('is-active', o === 0);
      c.classList.toggle('is-far', Math.abs(o) > 2);
      c.setAttribute('aria-hidden', Math.abs(o) > 2 ? 'true' : 'false');
      c.setAttribute('aria-label', `${j + 1} of ${cards.length}`);
    });
  }
  const go = (d) => { cur = (cur + d + cards.length) % cards.length; render(); };
  render();
  $('#fanPrev').addEventListener('click', () => go(-1));
  $('#fanNext').addEventListener('click', () => go(1));
  fan.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
  });
  cards.forEach((c, j) => {
    c.addEventListener('click', (e) => {
      if (dragMoved) { e.preventDefault(); return; }
      if (!c.classList.contains('is-active')) { e.preventDefault(); cur = j; render(); }
    });
    tilt(c, $('.fcard__in', c), 9, () => c.classList.contains('is-active'));
  });
  // swipe / drag
  let sx = 0, sy = 0, dragging = false;
  fan.addEventListener('pointerdown', (e) => { dragging = true; dragMoved = false; sx = e.clientX; sy = e.clientY; });
  addEventListener('pointerup', (e) => {
    if (!dragging) return;
    dragging = false;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) { dragMoved = true; go(dx < 0 ? 1 : -1); setTimeout(() => { dragMoved = false; }, 60); }
  });
  if (reduce) fan.classList.add('is-in');
  else observe([fan], (entries, io) => entries.forEach((e) => { if (e.isIntersecting) { fan.classList.add('is-in'); io.unobserve && io.unobserve(fan); } }), { threshold: 0.2 });

  /* ---------- the spine: regions light up on hover, and cycle by themselves ---------- */
  const spineEl = $('#spineArt');
  if (window.ChiroSpine) ChiroSpine.mount(spineEl);
  const orbs = $$('.orb');
  const regions = orbs.map((o) => o.dataset.region);
  let lock = false, auto = 0, idx = -1, orbitVisible = false;
  function activate(region) {
    if (window.ChiroSpine) ChiroSpine.set(spineEl, region);
    orbs.forEach((o) => o.classList.toggle('is-on', o.dataset.region === region));
  }
  orbs.forEach((o) => {
    const on = () => { lock = true; idx = regions.indexOf(o.dataset.region); activate(o.dataset.region); };
    const off = () => { lock = false; activate(null); };
    o.addEventListener('mouseenter', on); o.addEventListener('mouseleave', off);
    o.addEventListener('focusin', on); o.addEventListener('focusout', off);
    o.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      on(); clearTimeout(auto); auto = setTimeout(off, 6000);
    });
  });
  if (!reduce) {
    setInterval(() => { if (lock || !orbitVisible) return; idx = (idx + 1) % regions.length; activate(regions[idx]); }, 3200);
    observe([$('#orbit')], (entries) => entries.forEach((e) => { orbitVisible = e.isIntersecting; if (!orbitVisible && !lock) activate(null); }), { threshold: 0.25 });
  }

  /* ---------- "when an adjustment is worth a closer look": drag the row with a mouse ---------- */
  const rail = $('#rail');
  let rDown = false, rx = 0, rl = 0;
  rail.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; rDown = true; rx = e.clientX; rl = rail.scrollLeft; });
  addEventListener('pointermove', (e) => { if (!rDown) return; const dx = e.clientX - rx; if (Math.abs(dx) > 4) rail.classList.add('is-drag'); rail.scrollLeft = rl - dx; });
  addEventListener('pointerup', () => { rDown = false; rail.classList.remove('is-drag'); });
  rail.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') rail.scrollBy({ left: 280, behavior: 'smooth' });
    if (e.key === 'ArrowLeft') rail.scrollBy({ left: -280, behavior: 'smooth' });
  });

  /* ---------- videos: filter chips, grid, "show more", player ---------- */
  const grid = $('#vgrid'), chips = $('#chips'), more = $('#vmore');
  let filter = 'all', shown = PAGE;
  const file = (id) => 'v-' + id.replace(/[^A-Za-z0-9]/g, '_');
  const list = () => (filter === 'all' ? VIDEOS : VIDEOS.filter((v) => v.topic === filter));
  const vcard = (v, i, feat) => `
    <a class="vcard${feat ? ' vcard--feature' : ''}" style="--i:${i}" href="https://www.youtube.com/watch?v=${v.id}" data-vid="${v.id}" target="_blank" rel="noopener" aria-label="Play: ${esc(v.t)}">
      <span class="vcard__thumb ph"${v.lq ? ` style="--lq:url(${v.lq})"` : ''}>
        <img src="images/${file(v.id)}-480.webp" srcset="images/${file(v.id)}-480.webp 480w, images/${file(v.id)}-800.webp 800w" sizes="${feat ? '(max-width: 960px) 92vw, 62vw' : '(max-width: 960px) 92vw, 31vw'}" width="480" height="270" alt="" loading="lazy" decoding="async">
        <span class="vcard__play"><svg class="ic" aria-hidden="true"><use href="#i-play"/></svg></span>
        <span class="vcard__dur">${v.d}</span>
      </span>
      <span class="vcard__body"><span class="vcard__topic">${TOPICS[v.topic]}</span><b>${esc(v.t)}</b><span class="vcard__meta">${v.v} views</span></span>
    </a>`;
  function renderChips() {
    chips.innerHTML = Object.keys(TOPICS).map((k) => {
      const n = k === 'all' ? VIDEOS.length : VIDEOS.filter((v) => v.topic === k).length;
      return n ? `<button class="chip" type="button" role="tab" aria-selected="${k === filter}" data-f="${k}">${TOPICS[k]}<small>${n}</small></button>` : '';
    }).join('');
  }
  function renderGrid() {
    const items = list();
    grid.innerHTML = items.slice(0, shown).map((v, i) => vcard(v, i % PAGE, i === 0 && filter === 'all')).join('');
    more.hidden = shown >= items.length;
    $$('.vcard img', grid).forEach((img) => img.addEventListener('error', () => { // no local thumbnail yet: use YouTube's own
      img.removeAttribute('srcset'); img.src = `https://i.ytimg.com/vi/${img.closest('.vcard').dataset.vid}/hqdefault.jpg`;
    }, { once: true }));
    markLoaded(grid);
    $$('.vcard', grid).forEach((c) => tilt(c, c, 6));
  }
  chips.addEventListener('click', (e) => {
    const b = e.target.closest('[data-f]'); if (!b) return;
    filter = b.dataset.f; shown = PAGE; renderChips(); renderGrid();
  });
  more.addEventListener('click', () => { shown = Math.min(shown + 6, list().length); renderGrid(); });
  document.addEventListener('click', (e) => { // topic cards and spine links jump here with a filter applied
    const a = e.target.closest('[data-filter]'); if (!a || !TOPICS[a.dataset.filter]) return;
    filter = a.dataset.filter; shown = PAGE; renderChips(); renderGrid();
  });
  renderChips(); renderGrid();

  const player = $('#player'), frame = $('#playerFrame');
  function openPlayer(id) {
    const v = VIDEOS.find((x) => x.id === id); if (!v) return;
    $('#playerTitle').textContent = v.t;
    $('#playerLink').href = 'https://www.youtube.com/watch?v=' + v.id;
    frame.style.backgroundImage = `url(images/${file(v.id)}-800.webp)`;
    frame.innerHTML = NO_EMBED
      ? `<a class="dlg__open" href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener"><span class="vcard__play"><svg class="ic" aria-hidden="true"><use href="#i-play"/></svg></span><b>Watch on YouTube</b></a>`
      : `<iframe src="https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1" title="${esc(v.t)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
    player.showModal();
  }
  grid.addEventListener('click', (e) => {
    const a = e.target.closest('.vcard');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    if (typeof player.showModal !== 'function') return; // old browser: let the link open YouTube
    e.preventDefault(); openPlayer(a.dataset.vid);
  });
  player.addEventListener('close', () => { frame.innerHTML = ''; });

  // dialogs: close button + click on the dark backdrop
  $$('dialog').forEach((d) => {
    $$('[data-close]', d).forEach((b) => b.addEventListener('click', () => d.close()));
    d.addEventListener('click', (e) => {
      const r = d.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close();
    });
  });
  $('#openDisclaimer').addEventListener('click', () => $('#disclaimer').showModal());

  /* ---------- numbers count up when they scroll into view ---------- */
  const fmt = (el, v) => { const dec = +(el.dataset.dec || 0); return (dec ? v.toFixed(dec) : Math.round(v)) + (el.dataset.suffix || ''); };
  function countUp(el) {
    const end = parseFloat(el.dataset.count), t0 = performance.now(), dur = 1500;
    const step = (t) => { const p = Math.min(1, (t - t0) / dur); el.textContent = fmt(el, end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  if (!reduce) observe($$('[data-count]'), (entries, io) => entries.forEach((e) => { if (e.isIntersecting) { countUp(e.target); io.unobserve && io.unobserve(e.target); } }), { threshold: 0.6 });

  /* ---------- contact: copy email + form (opens the visitor's email app) ---------- */
  const copyBtn = $('#copyMail');
  copyBtn.addEventListener('click', async () => {
    let ok = false;
    try { await navigator.clipboard.writeText(EMAIL); ok = true; } catch (e) {
      const t = document.createElement('textarea'); t.value = EMAIL; t.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(t); t.select();
      try { ok = document.execCommand('copy'); } catch (e2) { /* ignore */ } t.remove();
    }
    $('span', copyBtn).textContent = ok ? 'Copied' : EMAIL;
    copyBtn.classList.toggle('is-done', ok);
    setTimeout(() => { $('span', copyBtn).textContent = 'Copy'; copyBtn.classList.remove('is-done'); }, 2200);
  });

  const form = $('#form'), ok = $('#formOk');
  const rules = {
    name: (v) => (v.trim().length >= 2 ? '' : 'Please tell us your name.'),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address.'),
    message: (v) => (v.trim().length >= 10 ? '' : 'Please write at least a short sentence (10 characters).'),
  };
  $$('input, textarea', form).forEach((el) => el.addEventListener('input', () => {
    const f = el.closest('.field'); f.classList.remove('is-bad'); const er = $('.err', f); if (er) er.textContent = '';
  }));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let bad = null;
    Object.keys(rules).forEach((k) => {
      const el = form.elements[k], msg = rules[k](el.value), f = el.closest('.field');
      f.classList.toggle('is-bad', !!msg); $('.err', f).textContent = msg;
      if (msg && !bad) bad = el;
    });
    if (bad) { bad.focus(); return; }
    const d = Object.fromEntries(new FormData(form));
    const subject = `[Website] ${d.topic}: ${d.name.trim()}`;
    const body = `${d.message.trim()}\n\n${d.name.trim()}\n${d.email.trim()}`;
    ok.hidden = false;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  $('#year').textContent = new Date().getFullYear();
})();
