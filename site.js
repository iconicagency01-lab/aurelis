// Shared nav + reveal for all AURÉLIS pages
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
      // Close any open dropdowns when burger closes
      if (!nav.classList.contains('open')) {
        nav.querySelectorAll('.nav-item.open').forEach(i => i.classList.remove('open'));
      }
    });
  }

  // Dropdown toggles (work on both desktop and mobile)
  nav.querySelectorAll('.drop-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const item = toggle.closest('.nav-item');
      nav.querySelectorAll('.nav-item').forEach(other => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });

  // Close drops on outside click (desktop only)
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && window.innerWidth > 900) {
      nav.querySelectorAll('.nav-item.open').forEach(item => item.classList.remove('open'));
    }
  });

  // Close mobile menu when tapping a real link
  nav.querySelectorAll('.drop a, .links-left > a:not(.drop-toggle), .links-right > a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 900) nav.classList.remove('open');
    });
  });

  // Mark current page in nav
  const path = location.pathname.toLowerCase();
  nav.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href').toLowerCase();
    if (href === '/' || href === 'index.html' || href === '/index.html') {
      if (path === '/' || path.endsWith('/index.html') || path.endsWith('/')) a.classList.add('current');
    } else if (href && !href.startsWith('http') && !href.startsWith('#') && path.includes(href.replace(/^\.\//,''))) {
      a.classList.add('current');
      const dropItem = a.closest('.nav-item');
      if (dropItem) dropItem.classList.add('current');
    }
  });
})();

// Shared IntersectionObserver for reveal
window.AurelisIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      window.AurelisIO.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => window.AurelisIO.observe(el));
