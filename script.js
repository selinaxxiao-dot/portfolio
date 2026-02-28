(() => {
  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const topbar = document.querySelector('.topbar');
  const toggle = document.querySelector('.nav__toggle');
  if (toggle && topbar) {
    toggle.addEventListener('click', () => {
      const open = topbar.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    // Close on link click
    document.querySelectorAll('.nav a').forEach(a => {
      a.addEventListener('click', () => topbar.classList.remove('is-open'));
    });
  }

  // Scroll reveal
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('is-visible');
    });
  }, { threshold: 0.14 });
  els.forEach(el => io.observe(el));

  
  // Lightbox (gallery by section)
  const lb = document.querySelector('.lightbox');
  const lbImg = document.querySelector('.lightbox__img');
  const lbCap = document.querySelector('.lightbox__caption');
  const lbCount = document.querySelector('.lightbox__count');
  const btnPrev = document.querySelector('[data-prev]');
  const btnNext = document.querySelector('[data-next]');

  let activeTiles = [];
  let activeIndex = 0;

  function setNavVisibility() {
    if (!btnPrev || !btnNext) return;
    btnPrev.classList.toggle('is-hidden', activeTiles.length <= 1);
    btnNext.classList.toggle('is-hidden', activeTiles.length <= 1);
  }

  function renderActive() {
    if (!lb || !lbImg || !lbCap) return;
    const tile = activeTiles[activeIndex];
    if (!tile) return;

    const src = tile.getAttribute('data-full');
    const caption = tile.getAttribute('data-caption') || '';
    lbImg.src = src || '';
    lbImg.alt = caption || 'Preview image';
    lbCap.textContent = caption;

    if (lbCount) {
      lbCount.textContent = activeTiles.length > 1 ? `${activeIndex + 1} / ${activeTiles.length}` : '';
    }

    setNavVisibility();
  }

  function openLightboxFor(tile) {
    if (!lb || !tile) return;

    const section = tile.closest('section');
    const group = (section && section.id) ? section.id : 'default';

    activeTiles = Array.from(document.querySelectorAll(`section#${CSS.escape(group)} .tile[data-full]`));
    activeIndex = Math.max(0, activeTiles.indexOf(tile));

    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    renderActive();
  }

  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    if (lbImg) lbImg.src = '';
    if (lbCap) lbCap.textContent = '';
    if (lbCount) lbCount.textContent = '';
    document.body.style.overflow = '';
    activeTiles = [];
    activeIndex = 0;
  }

  function prev() {
    if (activeTiles.length <= 1) return;
    activeIndex = (activeIndex - 1 + activeTiles.length) % activeTiles.length;
    renderActive();
  }

  function next() {
    if (activeTiles.length <= 1) return;
    activeIndex = (activeIndex + 1) % activeTiles.length;
    renderActive();
  }

  // Open from tiles
  document.querySelectorAll('.tile[data-full]').forEach(tile => {
    tile.addEventListener('click', () => openLightboxFor(tile));
    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightboxFor(tile);
      }
    });
  });

  // Controls
  if (btnPrev) btnPrev.addEventListener('click', prev);
  if (btnNext) btnNext.addEventListener('click', next);

  // Click image to advance
  if (lbImg) lbImg.addEventListener('click', next);

  document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeLightbox));
  document.addEventListener('keydown', (e) => {
    if (!lb || !lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });


})();