(() => {
  // Announcement bar (markup lives in each page; edit the text there). The x only hides it until the page is reloaded.
  const bar = document.querySelector('[data-announce]');
  if (!bar) return;
  bar.querySelector('button').addEventListener('click', () => {
    bar.remove();
    document.body.classList.remove('has-bar');
  });
})();
(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.getElementById('site-nav');

  // Header background once the page has moved past the hero's top edge.
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu.
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });

  // Reveal on scroll.
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Stagger: children of grouped lists appear one after another with their parent.
  if (!calm) {
    document.querySelectorAll('.rows, .columns, .timeline, .people, .ledger, .dates, .faq').forEach((group) => {
      const parent = group.closest('.reveal');
      if (!parent) return;
      const kids = [...group.children];
      kids.forEach((k, i) => { k.classList.add('st'); k.style.setProperty('--i', i); });
      const watch = new MutationObserver(() => {
        if (!parent.classList.contains('in')) return;
        watch.disconnect();
        // Drop the entrance transition afterwards so hover effects behave normally.
        setTimeout(() => kids.forEach((k) => k.classList.remove('st')), 1400 + kids.length * 90);
      });
      watch.observe(parent, { attributes: true, attributeFilter: ['class'] });
    });
  }

  // Images sit in a clipping frame so they can zoom gently on hover.
  document.querySelectorAll('.figure img').forEach((img) => {
    const frame = document.createElement('div');
    frame.className = 'frame';
    img.replaceWith(frame);
    frame.append(img);
  });

  // Scroll progress line and a slow parallax on the hero photo.
  if (!calm) {
    const bar = document.createElement('div');
    bar.className = 'progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.prepend(bar);
    const heroArt = document.querySelector('.hero-art');
    let ticking = false;
    const frameUpdate = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
      if (heroArt && window.scrollY < window.innerHeight * 1.2) {
        heroArt.style.translate = `0 ${Math.round(window.scrollY * 0.12)}px`;
      }
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(frameUpdate); }
    }, { passive: true });
    frameUpdate();
  }

  // Programme finder (academics page).
  const finder = document.querySelector('[data-finder]');
  if (finder) {
    const chips = [...finder.querySelectorAll('.chip')];
    const search = finder.querySelector('input');
    const items = [...document.querySelectorAll('.programme')];
    const count = document.querySelector('[data-count]');
    let school = 'all';

    const apply = () => {
      const q = search.value.trim().toLowerCase();
      let shown = 0;
      items.forEach((item) => {
        const match = (school === 'all' || item.dataset.school === school)
          && (!q || item.textContent.toLowerCase().includes(q));
        item.hidden = !match;
        if (match) shown += 1;
      });
      count.textContent = shown
        ? `Showing ${shown} of ${items.length} programmes`
        : 'No programmes match that search. Try a broader word, or clear the filter.';
    };

    chips.forEach((chip) => chip.addEventListener('click', () => {
      school = chip.dataset.filter;
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      apply();
    }));
    search.addEventListener('input', apply);
    apply();
  }

  // Enquiry form: a static site has no server, so it opens WhatsApp with the message pre-filled.
  const form = document.querySelector('[data-enquiry]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const text = `Hello, I have an enquiry for Radha Krishna Computer Education College, Khaddi.\n\nName: ${d.get('name')}\nEmail: ${d.get('email')}\nTopic: ${d.get('topic')}\n\n${d.get('message')}`;
      const url = `https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(text)}`;
      const win = window.open(url, '_blank', 'noopener');
      if (!win) window.location.href = url;
      const status = form.querySelector('[data-status]');
      status.textContent = 'WhatsApp should now be open with your message ready to send. Press send there to deliver it.';
      // Also email the enquiry to the college (via FormSubmit, no server needed).
      if (form.dataset.mail) {
        fetch(`https://formsubmit.co/ajax/${form.dataset.mail}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: `New enquiry: ${d.get('topic')} (${d.get('name')})`,
            _replyto: d.get('email'),
            _template: 'table',
            _captcha: 'false',
            Name: d.get('name'),
            Email: d.get('email'),
            Topic: d.get('topic'),
            Message: d.get('message'),
          }),
        })
          .then((r) => { if (!r.ok) throw new Error(r.status); status.textContent += ' Your enquiry has also been emailed to the college.'; })
          .catch(() => { status.textContent += ' (We could not send the email copy, so please press send in WhatsApp.)'; });
      }
    });
  }
})();
