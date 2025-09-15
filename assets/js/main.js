// RoyalForge Fitness Club - Main JS

// Smooth scrolling with Lenis
const lenis = new Lenis({ smoothWheel: true, lerp: 0.1 });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// Preloader hide on window load
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (pre) {
    pre.style.opacity = '0';
    pre.style.pointerEvents = 'none';
    setTimeout(() => pre.remove(), 600);
  }
});

// Header nav
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));
}

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Lottie accent animation in hero
try {
  lottie.loadAnimation({
    container: document.getElementById('hero-lottie'),
    renderer: 'svg', loop: true, autoplay: true,
    path: 'https://assets7.lottiefiles.com/private_files/lf30_jmgekfqg.json'
  });
} catch (e) {}

// Particles background
tsParticles.load('particles', {
  background: { color: 'transparent' },
  fpsLimit: 60,
  particles: {
    number: { value: 60, density: { enable: true, area: 800 } },
    color: { value: ['#d4af37', '#8ab4f8'] },
    shape: { type: 'circle' },
    opacity: { value: 0.3 },
    size: { value: { min: 1, max: 3 } },
    move: { enable: true, speed: 0.6 },
    links: { enable: true, color: '#d4af37', opacity: 0.2 }
  },
  detectRetina: true
});

// GLightbox
const lightbox = GLightbox({ selector: '.glightbox' });

// Swiper Testimonials
const testimonialSwiper = new Swiper('.testimonial-swiper', {
  loop: true,
  autoplay: { delay: 3500, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true },
});

// Classes & Schedule data
const classes = [
  { title: 'Vinyasa Flow', type: 'Yoga', day: 'Mon', time: '7:00 AM' },
  { title: 'Power Yoga', type: 'Yoga', day: 'Wed', time: '6:00 PM' },
  { title: 'Olympic Lifts', type: 'Strength', day: 'Tue', time: '5:30 PM' },
  { title: 'Metcon Blast', type: 'HIIT', day: 'Thu', time: '6:30 AM' },
  { title: 'CrossFit WOD', type: 'CrossFit', day: 'Fri', time: '7:00 PM' },
  { title: 'Mobility Reset', type: 'Yoga', day: 'Sat', time: '9:00 AM' },
  { title: 'Hypertrophy', type: 'Strength', day: 'Sun', time: '10:00 AM' },
  { title: 'Tabata Fury', type: 'HIIT', day: 'Tue', time: '7:00 AM' },
];

const scheduleGrid = document.getElementById('schedule-grid');
function renderSchedule(filter = 'all') {
  if (!scheduleGrid) return;
  scheduleGrid.innerHTML = '';
  classes
    .filter(c => filter === 'all' || c.type === filter)
    .forEach(c => {
      const el = document.createElement('div');
      el.className = 'class-card';
      el.innerHTML = `<h4>${c.title}</h4><div class="class-meta"><span>${c.type}</span><span>${c.day} • ${c.time}</span></div>`;
      scheduleGrid.appendChild(el);
    });
}
renderSchedule();
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderSchedule(btn.dataset.filter);
  });
});

// Animated counters using GSAP
gsap.utils.toArray('.counter span').forEach(el => {
  const target = Number(el.getAttribute('data-counter')) || 0;
  ScrollTrigger.create({
    trigger: el,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.fromTo(el, { textContent: 0 }, {
        duration: 2,
        textContent: target,
        ease: 'power2.out',
        snap: { textContent: 1 },
        onUpdate: () => { el.textContent = Math.floor(el.textContent); }
      });
    }
  });
});

// Scroll animations
gsap.registerPlugin(ScrollTrigger);
gsap.from('.headline', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' });
gsap.from('.subhead', { y: 20, opacity: 0, duration: 0.8, delay: 0.1, ease: 'power2.out' });
gsap.from('.hero-ctas', { y: 10, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' });

gsap.utils.toArray('.section').forEach((sec, i) => {
  gsap.from(sec.querySelectorAll('.section-title, .section-subtitle'), {
    scrollTrigger: { trigger: sec, start: 'top 80%' },
    y: 24, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.05
  });
});

// Forms (demo handlers)
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('formStatus');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    contactStatus.textContent = 'Sending...';
    await new Promise(r => setTimeout(r, 900));
    contactStatus.textContent = 'Thanks! We will be in touch shortly.';
    contactForm.reset();
  });
}

const newsletterForm = document.getElementById('newsletterForm');
const newsletterStatus = document.getElementById('newsletterStatus');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    newsletterStatus.textContent = 'Subscribing...';
    await new Promise(r => setTimeout(r, 600));
    newsletterStatus.textContent = 'You are subscribed!';
    newsletterForm.reset();
  });
}

