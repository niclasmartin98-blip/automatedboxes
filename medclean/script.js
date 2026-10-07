(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    }));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); }
    });
  }

  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

  const story = document.querySelector('.scroll-story');
  const sticky = document.querySelector('.story-sticky');
  const progressBar = document.querySelector('.story-progress span');
  const cards = [...document.querySelectorAll('.story-card')];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateStory(){
    if (!story || !sticky) return;
    const rect = story.getBoundingClientRect();
    const total = Math.max(1, story.offsetHeight - window.innerHeight);
    const scrolled = Math.min(total, Math.max(0, -rect.top));
    const p = scrolled / total;
    sticky.style.setProperty('--progress', `${Math.round(p * 100)}%`);
    if (!reduceMotion) {
      // The mat appears to feed down and toward the viewer while the page scrolls.
      const travel = Math.min(window.innerHeight * .36, 310);
      sticky.style.setProperty('--mat-y', `${p * travel}px`);
    }

    const center = window.innerHeight * .56;
    let nearest = null, dist = Infinity;
    cards.forEach(card => {
      const r = card.getBoundingClientRect();
      const d = Math.abs((r.top + r.height/2) - center);
      if (d < dist) { dist = d; nearest = card; }
    });
    cards.forEach(c => c.classList.toggle('active', c === nearest));
  }

  let ticking = false;
  function onScroll(){
    if (!ticking) {
      requestAnimationFrame(() => { updateStory(); ticking = false; });
      ticking = true;
    }
  }
  addEventListener('scroll', onScroll, {passive:true});
  addEventListener('resize', onScroll);
  updateStory();
})();
