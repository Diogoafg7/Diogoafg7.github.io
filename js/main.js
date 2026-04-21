/* Nav: solid background on scroll */
(function () {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  window.addEventListener('scroll', function () {
    nav.classList.toggle('nav--scrolled', window.scrollY > 60);
  }, { passive: true });
})();

/* Hamburger menu */
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

/* Active nav link on scroll */
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

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
