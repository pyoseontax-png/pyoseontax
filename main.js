/* 세무회계 표선 — pyoseontax.com */
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');

  /* ---------- 나침반 눈금 생성 ---------- */
  var ticks = document.getElementById('ticks');
  if (ticks) {
    var svgNS = 'http://www.w3.org/2000/svg';
    for (var deg = 0; deg < 360; deg += 5) {
      var major = deg % 45 === 0;
      var rad = (deg - 90) * Math.PI / 180;
      var r1 = 252, r2 = major ? 232 : 243;
      var line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', (300 + r1 * Math.cos(rad)).toFixed(2));
      line.setAttribute('y1', (300 + r1 * Math.sin(rad)).toFixed(2));
      line.setAttribute('x2', (300 + r2 * Math.cos(rad)).toFixed(2));
      line.setAttribute('y2', (300 + r2 * Math.sin(rad)).toFixed(2));
      line.setAttribute('stroke-width', major ? '1.6' : '0.7');
      ticks.appendChild(line);
    }
  }

  /* ---------- 스크롤 시 헤더 전환 ---------- */
  function onScroll() {
    header.classList.toggle('is-solid', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- 모바일 메뉴 ---------- */
  function closeNav() {
    nav.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeNav();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------- 스크롤 등장 효과 ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll(
    '.sec-head, .about-lede, .about-points li, .card, .step, .profile-photo, .profile-body, .form, .contact-info, .loc-map, .loc-body'
  );
  if (!reduce && 'IntersectionObserver' in window) {
    Array.prototype.forEach.call(targets, function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 6) * 60 + 'ms';
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  }

  /* ---------- 상담 신청 폼 ---------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      var action = form.getAttribute('action') || '';

      // 폼 서비스 연동 전이면 이메일 안내
      if (action.indexOf('YOUR_FORM_ID') !== -1) {
        e.preventDefault();
        status.className = 'form-status err';
        status.textContent =
          '상담 신청 폼이 아직 연결되지 않았습니다. jmw@pyoseontax.com 또는 010-8287-3549로 연락해 주세요.';
        return;
      }

      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = '보내는 중…';
      status.className = 'form-status';
      status.textContent = '';

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (!res.ok) throw new Error('전송 실패');
          form.reset();
          status.className = 'form-status ok';
          status.textContent = '상담 신청이 접수되었습니다. 영업일 기준 당일 회신드리겠습니다.';
        })
        .catch(function () {
          status.className = 'form-status err';
          status.textContent =
            '전송에 실패했습니다. 010-8287-3549 또는 jmw@pyoseontax.com으로 연락해 주세요.';
        })
        .then(function () {
          btn.disabled = false;
          btn.textContent = '상담 신청 보내기';
        });
    });
  }
})();
