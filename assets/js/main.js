/* ========================================================
   BASKER ENERGY — Site Behaviors
   ======================================================== */

(function () {
  'use strict';

  /* ── Mobile nav toggle ── */
  document.addEventListener('click', function (e) {
    const burger = e.target.closest('.nav__burger');
    if (burger) {
      const links = document.querySelector('.nav__links');
      if (links) links.classList.toggle('open');
    }
  });

  /* ── Sticky nav darken on scroll ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    let lastY = 0;
    window.addEventListener('scroll', function () {
      const y = window.scrollY;
      if (y > 20) nav.style.background = 'rgba(5,8,15,0.92)';
      else nav.style.background = 'rgba(10,14,26,0.75)';
      lastY = y;
    }, { passive: true });
  }

  /* ── Mark active nav link based on path ── */
  try {
    const path = location.pathname.split('/').pop().replace('.html', '') || 'index';
    document.querySelectorAll('.nav__links a').forEach(function (a) {
      const href = a.getAttribute('href') || '';
      const slug = href.split('/').pop().replace('.html', '');
      if ((path === 'index' && (slug === '' || slug === 'index')) || (path && slug === path)) {
        a.classList.add('active');
      }
    });
  } catch (e) {}

  /* ── Reveal on scroll ── */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ── Count-up animation on stat strong[data-count] ── */
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
  function animateCount(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const dur = parseInt(el.getAttribute('data-duration') || '1600', 10);
    const start = performance.now();
    function step(ts) {
      const t = Math.min((ts - start) / dur, 1);
      const v = target * easeOutCubic(t);
      el.textContent = prefix + v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          io2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { io2.observe(c); });
  }

  /* ── Tabs ── */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    const tabs = group.querySelectorAll('.tab');
    const panes = group.querySelectorAll('.tabpane');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const target = tab.getAttribute('data-target');
        tabs.forEach(function (t) { t.classList.remove('active'); });
        panes.forEach(function (p) { p.classList.remove('active'); });
        tab.classList.add('active');
        const pane = group.querySelector('[data-pane="' + target + '"]');
        if (pane) pane.classList.add('active');
      });
    });
  });

  /* ── Sub-nav active highlight on scroll ── */
  const subnavLinks = document.querySelectorAll('.subnav a');
  if (subnavLinks.length) {
    const sections = Array.from(subnavLinks).map(function (a) {
      const id = a.getAttribute('href');
      if (id && id.startsWith('#')) return document.querySelector(id);
      return null;
    });
    window.addEventListener('scroll', function () {
      const y = window.scrollY + 200;
      let activeIndex = -1;
      sections.forEach(function (sec, i) {
        if (sec && sec.offsetTop <= y) activeIndex = i;
      });
      subnavLinks.forEach(function (a, i) { a.classList.toggle('active', i === activeIndex); });
    }, { passive: true });
  }

  /* ── Year in footer ── */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

})();
