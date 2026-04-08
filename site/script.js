(function () {
  /* ── DOM References ── */
  const el           = document.getElementById('visitorCount');
  const yearEl       = document.getElementById('year');
  const toggleBtn    = document.getElementById('themeToggle');
  const navToggleBtn = document.getElementById('navToggle');
  const nav          = document.getElementById('main-nav');
  const endpoint     = window.VISITOR_COUNT_ENDPOINT || null;

  /* ── Year ── */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ──────────────────────────
     Theme Toggle
     ────────────────────────── */
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  // Listen for OS preference changes while tab is open
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  /* ──────────────────────────
     Mobile Nav Toggle
     ────────────────────────── */
  if (navToggleBtn && nav) {
    navToggleBtn.addEventListener('click', function () {
      navToggleBtn.classList.toggle('open');
      nav.classList.toggle('open');
    });

    // Close nav when a link is clicked
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggleBtn.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  /* ──────────────────────────
     Scroll Reveal (IntersectionObserver)
     ────────────────────────── */
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && reveals.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show everything
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ──────────────────────────
     Active Nav Highlighting
     ────────────────────────── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav a[data-section]');

  function onScroll() {
    var scrollY = window.scrollY + 120;

    sections.forEach(function (section) {
      var top    = section.offsetTop;
      var height = section.offsetHeight;
      var id     = section.getAttribute('id');

      navLinks.forEach(function (link) {
        if (link.getAttribute('data-section') === id) {
          if (scrollY >= top && scrollY < top + height) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ──────────────────────────
     Visitor Counter (preserved logic)
     ────────────────────────── */
  async function fetchCount() {
    if (!el) return;

    if (!endpoint) {
      el.textContent = '-';
      return;
    }

    try {
      var response = await fetch(endpoint, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-store',
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error('HTTP ' + response.status);

      var text = await response.text();
      var data;
      try { data = JSON.parse(text); } catch (e) { throw new Error('Invalid JSON'); }

      var count = null;

      if (data && typeof data === 'object') {
        if (data.body) {
          if (typeof data.body === 'string') {
            try { count = JSON.parse(data.body).count; } catch (e) { /* skip */ }
          } else if (typeof data.body === 'object') {
            count = data.body.count;
          }
        } else if (typeof data.count !== 'undefined') {
          count = data.count;
        }
      }

      if (typeof count === 'number' && Number.isFinite(count)) {
        el.textContent = count.toLocaleString('tr-TR');
      } else {
        el.textContent = '0';
      }
    } catch (err) {
      console.error('Visitor count error:', err);
      el.textContent = '-';
    }
  }

  fetchCount();
})();