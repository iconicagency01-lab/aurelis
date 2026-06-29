// Shared nav + reveal logic for all AURÉLIS pages
(function() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  // Scroll state
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // Burger toggle
  const burger = document.getElementById('burger');
  if (burger) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('open');
    });
  }

  // Dropdown toggles
  const dropToggles = nav.querySelectorAll('.drop-toggle');
  dropToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const item = toggle.closest('.nav-item');
      // Close other drops
      nav.querySelectorAll('.nav-item').forEach(other => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });

  // Close drops on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      nav.querySelectorAll('.nav-item.open').forEach(item => item.classList.remove('open'));
    }
  });

  // Close mobile menu when clicking a real link inside it
  nav.querySelectorAll('.drop a, .links-left > a, .links-right > a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
})();

// Shared IntersectionObserver for reveal animations
window.AurelisIO = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); window.AurelisIO.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => window.AurelisIO.observe(el));
