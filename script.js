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

  // Lightbox
  const lb = document.querySelector('.lightbox');
  const lbImg = document.querySelector('.lightbox__img');
  const lbCap = document.querySelector('.lightbox__caption');

  function openLightbox(src, caption) {
    if (!lb || !lbImg || !lbCap) return;
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    lbImg.src = src;
    lbImg.alt = caption || 'Preview image';
    lbCap.textContent = caption || '';
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    if (lbImg) lbImg.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const src = tile.getAttribute('data-full');
      const caption = tile.getAttribute('data-caption') || '';
      if (src) openLightbox(src, caption);
    });
  });

  document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeLightbox));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();