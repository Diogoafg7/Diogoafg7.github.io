/* ============================================================
   NAV: solid on scroll + glassmorphism
   ============================================================ */
(function () {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.classList.toggle('nav--scrolled', window.scrollY > 60);
  }, { passive: true });
})();

/* ============================================================
   HAMBURGER MENU
   ============================================================ */
(function () {
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('nav__menu--open', !isOpen);
  });

  menu.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('nav__menu--open');
    });
  });
})();

/* ============================================================
   ACTIVE NAV LINK
   ============================================================ */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (link) {
          link.classList.toggle(
            'nav__link--active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(function (section) { observer.observe(section); });
})();

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
(function () {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.appendChild(bar);

  window.addEventListener('scroll', function () {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (scrolled / total) + ')';
  }, { passive: true });
})();

/* ============================================================
   CURSOR SPOTLIGHT
   ============================================================ */
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch

  const spotlight = document.createElement('div');
  spotlight.id = 'cursor-spotlight';
  document.body.appendChild(spotlight);

  let mx = -400, my = -400;
  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    spotlight.style.transform = 'translate(' + (mx - 300) + 'px, ' + (my - 300) + 'px)';
  });

  // hide when leaving window
  document.addEventListener('mouseleave', function () {
    spotlight.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function () {
    spotlight.style.opacity = '1';
  });
})();

/* ============================================================
   MAGNETIC BUTTONS
   ============================================================ */
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      const rect   = btn.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) * 0.35;
      const dy     = (e.clientY - cy) * 0.35;
      btn.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
    });

    btn.addEventListener('mouseleave', function () {
      btn.style.transform = '';
    });
  });
})();

/* ============================================================
   TYPEWRITER — hero role line
   ============================================================ */
(function () {
  const el = document.getElementById('hero-typewriter');
  if (!el) return;

  const phrases = [
    'Fullstack Developer · C# / .NET · REST APIs',
    'Building APIs that work.',
    'C# · .NET · SQL · Angular',
    'Fullstack Developer · Porto, Portugal'
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let deleting    = false;
  let paused      = false;

  function tick() {
    const phrase  = phrases[phraseIndex];
    const current = deleting
      ? phrase.substring(0, charIndex - 1)
      : phrase.substring(0, charIndex + 1);

    el.textContent = current;

    if (!deleting && current === phrase) {
      paused = true;
      setTimeout(function () { deleting = true; paused = false; tick(); }, 2200);
      return;
    }

    if (deleting && current === '') {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      charIndex   = 0;
      setTimeout(tick, 400);
      return;
    }

    charIndex += deleting ? -1 : 1;
    setTimeout(tick, deleting ? 35 : 65);
  }

  el.textContent = '';
  setTimeout(tick, 800);
})();

/* ============================================================
   SCROLL REVEAL — fade + slide up
   ============================================================ */
(function () {
  const targets = document.querySelectorAll(
    '.reveal, .card, .timeline__item, .skills__group, .section-title'
  );
  if (!targets.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        // stagger children of a grid
        const delay = entry.target.dataset.delay || 0;
        setTimeout(function () {
          entry.target.classList.add('revealed');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(function (el, i) {
    // stagger cards/groups automatically
    if (el.classList.contains('card') || el.classList.contains('skills__group')) {
      const siblings = el.parentElement.children;
      const idx = Array.from(siblings).indexOf(el);
      el.dataset.delay = idx * 90;
    }
    observer.observe(el);
  });
})();

/* ============================================================
   HERO PARALLAX — photo shifts slightly on scroll
   ============================================================ */
(function () {
  const photo = document.querySelector('.hero__photo');
  if (!photo) return;

  window.addEventListener('scroll', function () {
    const y = window.scrollY;
    photo.style.transform = 'translateY(' + (y * 0.12) + 'px)';
  }, { passive: true });
})();

/* ============================================================
   HERO ANIMATED GRADIENT — orbs that drift
   ============================================================ */
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  let t = 0;
  function frame() {
    t += 0.003;
    const x1 = 40 + Math.sin(t)        * 15;
    const y1 = 30 + Math.cos(t * 0.7)  * 12;
    const x2 = 70 + Math.cos(t * 1.1)  * 12;
    const y2 = 60 + Math.sin(t * 0.9)  * 15;
    const x3 = 20 + Math.sin(t * 0.5)  * 10;
    const y3 = 70 + Math.cos(t * 1.3)  * 10;

    hero.style.setProperty('--orb1-x', x1 + '%');
    hero.style.setProperty('--orb1-y', y1 + '%');
    hero.style.setProperty('--orb2-x', x2 + '%');
    hero.style.setProperty('--orb2-y', y2 + '%');
    hero.style.setProperty('--orb3-x', x3 + '%');
    hero.style.setProperty('--orb3-y', y3 + '%');

    requestAnimationFrame(frame);
  }
  frame();
})();

/* ============================================================
   CARD TILT — subtle 3D on hover (desktop only)
   ============================================================ */
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = 'perspective(600px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 6) + 'deg) translateY(-4px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });
})();

/* ============================================================
   GLITCH TEXT — hero name on hover
   ============================================================ */
(function () {
  const name = document.querySelector('.hero__name');
  if (!name) return;

  name.addEventListener('mouseenter', function () {
    name.classList.add('glitch');
  });
  name.addEventListener('animationend', function () {
    name.classList.remove('glitch');
  });
})();
