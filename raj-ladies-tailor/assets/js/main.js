(function () {
  const cfg = window.SITE_CONFIG || {};

  // Header nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Footer dynamic bits
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
  const phoneLink = document.getElementById('phone-link');
  if (phoneLink && cfg.phoneE164 && cfg.phoneDisplay) {
    phoneLink.href = `tel:${cfg.phoneE164}`;
    phoneLink.textContent = cfg.phoneDisplay;
  }
  const waLink = document.getElementById('whatsapp-link');
  const floatingWa = document.getElementById('floating-wa');
  const waHref = cfg.whatsappNumber ? `https://wa.me/${cfg.whatsappNumber.replace(/\D/g, '')}` : '#';
  if (waLink) waLink.href = waHref;
  if (floatingWa) floatingWa.href = waHref;

  const instaLink = document.getElementById('insta-link');
  if (instaLink && cfg.instagramUsername) {
    instaLink.href = `https://instagram.com/${cfg.instagramUsername}`;
  }

  // Testimonials slider
  const sliders = document.querySelectorAll('[data-slider]');
  sliders.forEach((slider) => {
    const slides = slider.querySelector('.slides');
    const slideEls = slider.querySelectorAll('.slide');
    const dots = slider.querySelector('.dots');
    let current = 0;
    function goTo(index) {
      current = (index + slideEls.length) % slideEls.length;
      slides.style.transform = `translateX(-${current * 100}%)`;
      if (dots) {
        dots.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === current));
      }
    }
    if (dots) {
      slideEls.forEach((_, i) => {
        const b = document.createElement('button');
        b.setAttribute('aria-label', `Show testimonial ${i + 1}`);
        b.addEventListener('click', () => goTo(i));
        dots.appendChild(b);
      });
    }
    goTo(0);
    setInterval(() => goTo(current + 1), 5000);
  });

  // Instagram feed placeholder using a simple public image list
  const insta = document.getElementById('insta-feed');
  if (insta) {
    // If you integrate a third-party widget, inject it here.
    const sample = [
      'https://images.unsplash.com/photo-1520975624748-0a7b2e37eb81?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542060748-10c28b62716b?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614032686310-7c016cbf3779?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342394129-539efe6cf1fa?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=600&auto=format&fit=crop'
    ];
    insta.innerHTML = '';
    sample.forEach((src) => {
      const a = document.createElement('a');
      a.href = insta.nextElementSibling?.querySelector('a')?.href || '#';
      a.target = '_blank';
      a.rel = 'noopener';
      const img = document.createElement('img');
      img.src = src;
      img.loading = 'lazy';
      img.alt = 'Boutique outfit';
      a.appendChild(img);
      insta.appendChild(a);
    });
  }
})();

