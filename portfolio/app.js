/* ============================================
   TYRON PORTFOLIO — app.js
   ============================================ */

(function () {
  'use strict';

  // ==========================================
  // FONT LOAD → HERO ANIMATION
  // ==========================================

  document.fonts.ready.then(function () {
    document.body.classList.add('loaded');
  });

  // ==========================================
  // SCROLL REVEAL (IntersectionObserver)
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

  // Contact heading gets its own observer (uses .revealed directly)
  var contactHeading = document.querySelector('.contact-heading');
  if (contactHeading) {
    var contactObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          contactObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    contactObserver.observe(contactHeading);
  }

  // ==========================================
  // PARALLAX ENGINE
  // ==========================================

  var parallaxElements = document.querySelectorAll('[data-parallax]');
  var ticking = false;
  var isDesktop = window.matchMedia('(min-width: 769px)').matches;

  function updateParallax() {
    if (!isDesktop) { ticking = false; return; }
    var scrollY = window.scrollY;
    parallaxElements.forEach(function (el) {
      var speed = parseFloat(el.dataset.parallax);
      var offset = scrollY * speed;
      el.style.transform = 'translateY(' + offset + 'px)';
    });
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // Update isDesktop on resize
  window.addEventListener('resize', function () {
    isDesktop = window.matchMedia('(min-width: 769px)').matches;
    if (!isDesktop) {
      parallaxElements.forEach(function (el) {
        el.style.transform = '';
      });
    }
  });

  // ==========================================
  // NAVIGATION — SCROLL BEHAVIOR
  // ==========================================

  var nav = document.getElementById('nav');
  var navLinks = document.querySelectorAll('.nav-link:not(.nav-link--icon)');
  var sections = document.querySelectorAll('section[id]');

  // Add background on scroll
  window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }, { passive: true });

  // Active section highlighting
  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.remove('nav-link--active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('nav-link--active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href').slice(1);
      var target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });

  // ==========================================
  // MOBILE MENU
  // ==========================================

  var hamburger = document.querySelector('.nav-hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  function closeMobileMenu() {
    if (hamburger && mobileMenu) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.contains('active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        hamburger.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
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

    // Cursor states for project cards
    document.querySelectorAll('[data-cursor="view"]').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('cursor--view');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('cursor--view');
      });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function () {
      cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
      cursor.style.opacity = '1';
    });
  } else if (cursor) {
    cursor.style.display = 'none';
  }

  // ==========================================
  // HERO PARALLAX FADE
  // ==========================================

  var heroContent = document.querySelector('.hero-content');
  var heroSection = document.querySelector('.hero');

  if (heroContent && heroSection && isDesktop) {
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      var heroHeight = heroSection.offsetHeight;
      var progress = Math.min(scrollY / heroHeight, 1);
      heroContent.style.opacity = 1 - progress * 1.5;
    }, { passive: true });
  }

})();
