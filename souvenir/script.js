(() => {
  const header = document.querySelector('[data-header]');
  const nav = document.getElementById('primary-nav');
  const toggle = document.querySelector('.nav-toggle');

  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  if (toggle && nav) {
    const closeNav = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Navigation öffnen');
      nav.classList.remove('is-open');
    };

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Navigation öffnen' : 'Navigation schliessen');
      nav.classList.toggle('is-open', !open);
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) closeNav();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeNav();
    });
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealItems.forEach((item) => observer.observe(item));
  }
})();
