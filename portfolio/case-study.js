/* ============================================
   CASE STUDY — case-study.js
   ============================================ */

(function () {
  'use strict';

  // ==========================================
  // FONT LOAD
  // ==========================================

  document.fonts.ready.then(function () {
    document.body.classList.add('loaded');
  });

  // ==========================================
  // READING PROGRESS BAR
  // ==========================================

  var progressBar = document.getElementById('cs-progress');

  if (progressBar) {
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? scrollY / docHeight : 0;
      progressBar.style.transform = 'scaleX(' + Math.min(progress, 1) + ')';
    }, { passive: true });
  }

  // ==========================================
  // SCROLL REVEAL
  // ==========================================

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    revealObserver.observe(el);
  });

  // ==========================================
  // NAVIGATION
  // ==========================================

  var nav = document.getElementById('nav');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }, { passive: true });

  // Mobile menu
  var hamburger = document.querySelector('.nav-hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.contains('active');
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });
  }

  // ==========================================
  // CUSTOM CURSOR
  // ==========================================

  var cursor = document.getElementById('cursor');
  var hasMouse = window.matchMedia('(hover: hover)').matches;

  if (cursor && hasMouse) {
    var cursorX = 0, cursorY = 0;
    var targetX = 0, targetY = 0;

    document.addEventListener('mousemove', function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    function animateCursor() {
      cursorX += (targetX - cursorX) * 0.15;
      cursorY += (targetY - cursorY) * 0.15;
      cursor.style.transform = 'translate(' + cursorX + 'px, ' + cursorY + 'px)';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener('mouseleave', function () {
      cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
      cursor.style.opacity = '1';
    });
  } else if (cursor) {
    cursor.style.display = 'none';
  }

})();
