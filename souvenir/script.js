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


/* Automatic Boxes contact form integration */
(() => {
  const CONTACT_ENDPOINT = "https://script.google.com/macros/s/AKfycbwsl-GbNNk8uQ5quzOA5NAFV52VBQlWdZHgpoIoB5JubWpdOAIu2KhfWI8fpOZfRose/exec";

  const injectContactStyles = () => {
    if (document.getElementById('ab-contact-form-styles')) return;
    const style = document.createElement('style');
    style.id = 'ab-contact-form-styles';
    style.textContent = `
      .ab-contact-form {
        width: 100%;
        display: grid;
        gap: 14px;
        position: relative;
        z-index: 2;
      }
      .ab-contact-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      .ab-contact-field {
        display: grid;
        gap: 7px;
      }
      .ab-contact-field.full {
        grid-column: 1 / -1;
      }
      .ab-contact-field label {
        font-size: 11px;
        font-weight: 800;
        letter-spacing: .06em;
        text-transform: uppercase;
      }
      .ab-contact-field input,
      .ab-contact-field textarea {
        width: 100%;
        font: inherit;
        border-radius: 12px;
        padding: 13px 14px;
        outline: none;
        transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
      }
      .ab-contact-field textarea {
        min-height: 130px;
        resize: vertical;
      }
      .ab-contact-submit {
        appearance: none;
        border: 0;
        border-radius: 13px;
        padding: 15px 20px;
        font: inherit;
        font-weight: 800;
        cursor: pointer;
        transition: transform .2s ease, opacity .2s ease, box-shadow .2s ease;
      }
      .ab-contact-submit:hover {
        transform: translateY(-1px);
      }
      .ab-contact-submit:disabled {
        cursor: wait;
        opacity: .68;
        transform: none;
      }
      .ab-contact-status {
        min-height: 22px;
        margin: 0;
        font-size: 13px;
        line-height: 1.45;
        font-weight: 650;
      }
      .ab-contact-note {
        margin: 0;
        font-size: 11px;
        line-height: 1.5;
        opacity: .74;
      }
      .ab-honeypot {
        position: absolute !important;
        left: -9999px !important;
        width: 1px !important;
        height: 1px !important;
        overflow: hidden !important;
      }

      .ab-contact-form.is-blue .ab-contact-field label { color: #536a84; }
      .ab-contact-form.is-blue input,
      .ab-contact-form.is-blue textarea {
        color: #0c2346;
        background: #f8fbfe;
        border: 1px solid #cfddea;
      }
      .ab-contact-form.is-blue input:focus,
      .ab-contact-form.is-blue textarea:focus {
        border-color: #1688ff;
        box-shadow: 0 0 0 4px rgba(22,136,255,.10);
        background: #fff;
      }
      .ab-contact-form.is-blue .ab-contact-submit {
        color: #fff;
        background: linear-gradient(135deg,#0e66e6,#1688ff);
        box-shadow: 0 10px 24px rgba(14,102,230,.22);
      }
      .ab-contact-form.is-blue .ab-contact-status { color: #0d5cae; }
      .ab-contact-form.is-blue .ab-contact-note { color: #64748b; }

      .ab-contact-form.is-red .ab-contact-field label { color: rgba(255,255,255,.78); }
      .ab-contact-form.is-red input,
      .ab-contact-form.is-red textarea {
        color: #fff;
        background: rgba(255,255,255,.09);
        border: 1px solid rgba(255,255,255,.25);
      }
      .ab-contact-form.is-red input::placeholder,
      .ab-contact-form.is-red textarea::placeholder { color: rgba(255,255,255,.52); }
      .ab-contact-form.is-red input:focus,
      .ab-contact-form.is-red textarea:focus {
        border-color: rgba(255,255,255,.72);
        box-shadow: 0 0 0 4px rgba(255,255,255,.10);
        background: rgba(255,255,255,.13);
      }
      .ab-contact-form.is-red .ab-contact-submit {
        color: #9d171d;
        background: #fff;
        box-shadow: 0 12px 30px rgba(80,0,0,.18);
      }
      .ab-contact-form.is-red .ab-contact-status,
      .ab-contact-form.is-red .ab-contact-note { color: rgba(255,255,255,.88); }

      @media (max-width: 700px) {
        .ab-contact-grid { grid-template-columns: 1fr; }
        .ab-contact-field.full { grid-column: auto; }
      }
    `;
    document.head.appendChild(style);
  };

  const makeForm = (boxName, theme) => {
    const form = document.createElement('form');
    form.className = `ab-contact-form is-${theme}`;
    form.setAttribute('novalidate', '');
    form.innerHTML = `
      <input type="hidden" name="box" value="${boxName}">
      <div class="ab-honeypot" aria-hidden="true">
        <label>Website <input type="text" name="website" tabindex="-1" autocomplete="off"></label>
      </div>

      <div class="ab-contact-grid">
        <div class="ab-contact-field">
          <label>Name *</label>
          <input type="text" name="name" autocomplete="name" required>
        </div>
        <div class="ab-contact-field">
          <label>Firma</label>
          <input type="text" name="firma" autocomplete="organization">
        </div>
        <div class="ab-contact-field">
          <label>E-Mail *</label>
          <input type="email" name="email" autocomplete="email" required>
        </div>
        <div class="ab-contact-field">
          <label>Telefon</label>
          <input type="tel" name="telefon" autocomplete="tel">
        </div>
        <div class="ab-contact-field full">
          <label>Standort / Projekt</label>
          <input type="text" name="standort" placeholder="z. B. Zermatt, Tankstelle, Hotel, Bergbahn …">
        </div>
        <div class="ab-contact-field full">
          <label>Nachricht *</label>
          <textarea name="nachricht" required placeholder="Erzählen Sie uns kurz von Ihrem Standort oder Projekt."></textarea>
        </div>
      </div>

      <button class="ab-contact-submit" type="submit">Anfrage senden →</button>
      <p class="ab-contact-status" role="status" aria-live="polite"></p>
      <p class="ab-contact-note">Ihre Angaben werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.</p>
    `;

    const status = form.querySelector('.ab-contact-status');
    const submit = form.querySelector('.ab-contact-submit');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      submit.disabled = true;
      submit.textContent = 'Wird gesendet …';
      status.textContent = '';

      try {
        await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          body: new FormData(form),
          mode: 'no-cors'
        });

        form.reset();
        status.textContent = 'Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns schnellstmöglich bei Ihnen.';
      } catch (error) {
        status.textContent = 'Die Anfrage konnte leider nicht gesendet werden. Bitte versuchen Sie es erneut.';
      } finally {
        submit.disabled = false;
        submit.textContent = 'Anfrage senden →';
      }
    });

    return form;
  };

  const setupContact = (boxName, theme) => {
    injectContactStyles();

    document.querySelectorAll('a[href="../#kontakt"]').forEach((link) => {
      link.setAttribute('href', '#kontakt');
    });

    const section = document.getElementById('kontakt');
    if (!section || section.querySelector('.ab-contact-form')) return;

    const card = section.querySelector('.contact-card');
    if (!card) return;

    const form = makeForm(boxName, theme);

    if (theme === 'red') {
      const actions = card.querySelector('.contact-actions');
      if (actions) {
        const parentLink = Array.from(actions.querySelectorAll('a')).find(a => !a.classList.contains('button'));
        actions.innerHTML = '';
        actions.appendChild(form);
        if (parentLink) {
          parentLink.textContent = 'Zur Dachmarke Automatic Boxes ↗';
          parentLink.href = '../';
          parentLink.className = 'text-link light-link';
          actions.appendChild(parentLink);
        }
      } else {
        card.appendChild(form);
      }
    } else {
      const oldButton = card.querySelector('.contact-button');
      if (oldButton) oldButton.remove();
      card.appendChild(form);
    }
  };

  window.__abSetupContact = setupContact;
})();

window.__abSetupContact('Swiss Souvenir Box', 'red');
