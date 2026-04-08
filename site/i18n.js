(function () {
  'use strict';

  /* ══════════════════════════════════════════
     Translation Dictionaries
     ══════════════════════════════════════════ */
  var translations = {
    tr: {
      /* ── Nav ── */
      'nav.about': 'Hakkımda',
      'nav.projects': 'Projeler',
      'nav.cv': 'CV',
      'nav.contact': 'İletişim',
      'nav.home': 'Ana Sayfa',
      'nav.faq': 'SSS',

      /* ── Hero / About ── */
      'hero.subtitle': 'Bulut altyapıları tasarlıyor, otomasyon çözümleri geliştiriyorum.',
      'visitor.label': 'Ziyaretçi: ',

      /* ── Projects ── */
      'projects.title': 'Projeler',
      'project.crc.desc': 'Statik web sitesi, API ve veritabanı birleşimiyle bulut üzerinde uçtan uca bir altyapı örneği.',
      'project.m365.name': 'Auto-M365-User-Add',
      'project.m365.desc': 'Microsoft Graph API ile otomatik M365 kullanıcı tedariki ve lisanslama akışı.',
      'project.iris.name': 'Iris Veri Seti Analizi',
      'project.iris.desc': 'Keşifsel veri analizi ve Plotly ile interaktif görselleştirme çalışması.',

      /* ── Contact ── */
      'contact.title': 'İletişim',

      /* ── Footer ── */
      'footer.about': 'Hakkımda',
      'footer.projects': 'Projeler',
      'footer.contact': 'İletişim',
      'footer.home': 'Ana Sayfa',
      'footer.faq': 'SSS',

      /* ── Aria labels ── */
      'aria.navToggle': 'Menüyü aç/kapat',
      'aria.themeToggle': 'Tema değiştir',
      'aria.langToggle': 'Switch to English',

      /* ── Meta ── */
      'meta.title': 'Ege Uzun | Cloud & DevOps',
      'meta.description': 'Ege Uzun — Bulut altyapıları, otomasyon çözümleri ve DevOps projeleri.',

      /* ── 404 Page ── */
      '404.title': '404',
      '404.desc': 'Aradığınız sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.',
      '404.home': 'Ana sayfaya dön',
      '404.back': 'Geri dön',
      '404.meta.title': '404 — Sayfa Bulunamadı',



      /* ── Iris Page ── */
      'iris.title': 'Iris Veri Seti Analizi ve Görselleştirme',
      'iris.desc': 'Iris veri seti; üç iris türü (setosa, versicolor, virginica) için sepal/petal uzunluk ve genişlik ölçümlerini içerir.',
      'iris.data.title': 'Veri Yükleme ve Keşif',
      'iris.data.desc': 'Sayfa, yerel <code>data/iris.csv</code> dosyasını otomatik yükler.',
      'iris.data.rows': 'İlk Satırlar',
      'iris.charts.title': 'Görselleştirmeler',
      'iris.model.title': 'Python ile Modelleme (KNN)',
      'iris.model.desc': 'Aşağıda KNN sınıflandırıcı ile örnek eğitim-değerlendirme akışı yer alır. İndirilebilir Jupyter defteri de mevcuttur.',
      'iris.download.notebook': 'Jupyter Notebook\'u indir',
      'iris.download.colab': 'Colab\'da aç',
      'iris.meta.title': 'Iris Veri Seti Analizi ve Görselleştirme',
      'iris.meta.description': 'Iris veri seti üzerinde keşifsel analiz, Plotly görselleştirme ve KNN modelleme.',

      /* ── Auto-M365 Page ── */
      'm365.title': 'Auto‑M365‑User‑Add',
      'm365.subtitle': 'Microsoft Graph API ile otomatik kullanıcı tedariki ve lisans atama script\'i.',
      'm365.summary.title': 'Özet',
      'm365.summary.text': 'Bu araç, Azure AD uygulama kimlik bilgileri (Client Credentials flow) ile Microsoft Graph API\'ye erişip yeni kullanıcı oluşturur ve lisans atar.',
      'm365.download.script': 'Python script\'i indir',
      'm365.requirements.title': 'Gereksinimler',
      'm365.req.1': 'Python 3.8+',
      'm365.req.2': 'Azure AD\'de uygulama (App registration) ve gerekli Graph izinleri',
      'm365.config.title': 'Yapılandırma',
      'm365.config.desc': 'Kimlik bilgilerini ortam değişkeni olarak ayarlayın:',
      'm365.config.note': 'Örnek kullanıcı ve lisans verisi script içinde yer alır; dilerseniz JSON\'dan da okuyacak şekilde genişletilebilir.',
      'm365.code.title': 'Örnek Kod',
      'm365.code.more': 'Daha fazlası:',
      'm365.code.link': 'Graph API — Kullanıcı oluştur',
      'm365.security.title': 'Güvenlik Notları',
      'm365.security.1': 'İstemci sırrını (.env/KeyVault) güvenli saklayın; koda gömmeyin.',
      'm365.security.2': 'Uygulama izinlerini en az ayrıcalık ilkesine göre verin.',
      'm365.security.3': 'Üretimde hata/denge kontrolleri ve kayıt (logging) ekleyin.',
      'm365.meta.title': 'Auto‑M365‑User‑Add — Otomatik Kullanıcı Tedariki',
      'm365.meta.description': 'Microsoft Graph API ile otomatik M365 kullanıcı tedariki ve lisans atama.',
    },

    en: {
      /* ── Nav ── */
      'nav.about': 'About',
      'nav.projects': 'Projects',
      'nav.cv': 'CV',
      'nav.contact': 'Contact',
      'nav.home': 'Home',
      'nav.faq': 'FAQ',

      /* ── Hero / About ── */
      'hero.subtitle': 'Designing cloud infrastructure and developing automation solutions.',
      'visitor.label': 'Visitors: ',

      /* ── Projects ── */
      'projects.title': 'Projects',
      'project.crc.desc': 'An end-to-end cloud infrastructure example combining a static website, API, and database.',
      'project.m365.name': 'Auto-M365-User-Add',
      'project.m365.desc': 'Automated M365 user provisioning and licensing workflow using Microsoft Graph API.',
      'project.iris.name': 'Iris Dataset Analysis',
      'project.iris.desc': 'Exploratory data analysis and interactive visualization using Plotly.',

      /* ── Contact ── */
      'contact.title': 'Contact',

      /* ── Footer ── */
      'footer.about': 'About',
      'footer.projects': 'Projects',
      'footer.contact': 'Contact',
      'footer.home': 'Home',
      'footer.faq': 'FAQ',

      /* ── Aria labels ── */
      'aria.navToggle': 'Toggle menu',
      'aria.themeToggle': 'Toggle theme',
      'aria.langToggle': 'Türkçe\'ye geç',

      /* ── Meta ── */
      'meta.title': 'Ege Uzun | Cloud & DevOps',
      'meta.description': 'Ege Uzun — Cloud infrastructure, automation solutions, and DevOps projects.',

      /* ── 404 Page ── */
      '404.title': '404',
      '404.desc': 'The page you\'re looking for may have been moved, deleted, or never existed.',
      '404.home': 'Go to homepage',
      '404.back': 'Go back',
      '404.meta.title': '404 — Page Not Found',


      /* ── Iris Page ── */
      'iris.title': 'Iris Dataset Analysis & Visualization',
      'iris.desc': 'The Iris dataset contains sepal/petal length and width measurements for three iris species (setosa, versicolor, virginica).',
      'iris.data.title': 'Data Loading & Exploration',
      'iris.data.desc': 'The page automatically loads the local <code>data/iris.csv</code> file.',
      'iris.data.rows': 'First Rows',
      'iris.charts.title': 'Visualizations',
      'iris.model.title': 'Modeling with Python (KNN)',
      'iris.model.desc': 'Below is an example training-evaluation flow with a KNN classifier. A downloadable Jupyter notebook is also available.',
      'iris.download.notebook': 'Download Jupyter Notebook',
      'iris.download.colab': 'Open in Colab',
      'iris.meta.title': 'Iris Dataset Analysis & Visualization',
      'iris.meta.description': 'Exploratory analysis, Plotly visualization, and KNN modeling on the Iris dataset.',

      /* ── Auto-M365 Page ── */
      'm365.title': 'Auto‑M365‑User‑Add',
      'm365.subtitle': 'Automated user provisioning and license assignment script using Microsoft Graph API.',
      'm365.summary.title': 'Summary',
      'm365.summary.text': 'This tool accesses the Microsoft Graph API using Azure AD application credentials (Client Credentials flow) to create new users and assign licenses.',
      'm365.download.script': 'Download Python script',
      'm365.requirements.title': 'Requirements',
      'm365.req.1': 'Python 3.8+',
      'm365.req.2': 'Azure AD application (App registration) and required Graph permissions',
      'm365.config.title': 'Configuration',
      'm365.config.desc': 'Set credentials as environment variables:',
      'm365.config.note': 'Sample user and license data is included in the script; you can extend it to read from JSON.',
      'm365.code.title': 'Sample Code',
      'm365.code.more': 'Learn more:',
      'm365.code.link': 'Graph API — Create User',
      'm365.security.title': 'Security Notes',
      'm365.security.1': 'Store client secrets securely (.env/KeyVault); never hardcode them.',
      'm365.security.2': 'Grant application permissions following the least privilege principle.',
      'm365.security.3': 'Add error handling, rate limiting, and logging for production use.',
      'm365.meta.title': 'Auto‑M365‑User‑Add — Automated User Provisioning',
      'm365.meta.description': 'Automated M365 user provisioning and license assignment using Microsoft Graph API.',
    }
  };

  /* ══════════════════════════════════════════
     Language Detection & Storage
     ══════════════════════════════════════════ */
  function detectLanguage() {
    // 1. Check localStorage
    var stored = localStorage.getItem('lang');
    if (stored && translations[stored]) return stored;

    // 2. Check browser / device language
    var browserLang = (navigator.language || navigator.userLanguage || 'tr').toLowerCase();
    if (browserLang.startsWith('tr')) return 'tr';
    return 'en';
  }

  function setLanguage(lang) {
    if (!translations[lang]) return;
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);
    applyTranslations(lang);
    updateLangToggle(lang);
    updateMetaTags(lang);
  }

  /* ══════════════════════════════════════════
     Apply Translations to DOM
     ══════════════════════════════════════════ */
  function applyTranslations(lang) {
    var dict = translations[lang];

    // Text content via data-i18n
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        // Some translations may include HTML (e.g. <code> tags)
        if (dict[key].indexOf('<') !== -1) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Aria labels via data-i18n-aria
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (dict[key] !== undefined) {
        el.setAttribute('aria-label', dict[key]);
      }
    });

    // Title via data-i18n-title (for the <title> tag)
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-title');
      if (dict[key] !== undefined) {
        document.title = dict[key];
      }
    });

    // Visitor count locale
    var visitorEl = document.getElementById('visitorCount');
    if (visitorEl && visitorEl.textContent !== '—' && visitorEl.textContent !== '-') {
      var num = parseInt(visitorEl.textContent.replace(/[^\d]/g, ''), 10);
      if (!isNaN(num)) {
        visitorEl.textContent = num.toLocaleString(lang === 'tr' ? 'tr-TR' : 'en-US');
      }
    }
  }

  /* ══════════════════════════════════════════
     Update <meta> Tags
     ══════════════════════════════════════════ */
  function updateMetaTags(lang) {
    var dict = translations[lang];

    // Update page title from data-i18n-title if present
    var titleEl = document.querySelector('[data-i18n-title]');
    if (titleEl) {
      var titleKey = titleEl.getAttribute('data-i18n-title');
      if (dict[titleKey]) document.title = dict[titleKey];
    }

    // Update meta description
    var descEl = document.querySelector('meta[name="description"]');
    var descMarker = document.querySelector('[data-i18n-meta-desc]');
    if (descEl && descMarker) {
      var descKey = descMarker.getAttribute('data-i18n-meta-desc');
      if (dict[descKey]) descEl.setAttribute('content', dict[descKey]);
    }
  }

  /* ══════════════════════════════════════════
     Language Toggle Button
     ══════════════════════════════════════════ */
  function updateLangToggle(lang) {
    var btn = document.getElementById('langToggle');
    if (!btn) return;

    var flagTR = btn.querySelector('.flag-tr');
    var flagEN = btn.querySelector('.flag-en');

    if (lang === 'tr') {
      // Currently TR → show EN flag (click to switch to EN)
      if (flagTR) flagTR.style.display = 'none';
      if (flagEN) flagEN.style.display = 'block';
      btn.setAttribute('aria-label', 'Switch to English');
    } else {
      // Currently EN → show TR flag (click to switch to TR)
      if (flagTR) flagTR.style.display = 'block';
      if (flagEN) flagEN.style.display = 'none';
      btn.setAttribute('aria-label', 'Türkçe\'ye geç');
    }
  }

  /* ══════════════════════════════════════════
     Initialization
     ══════════════════════════════════════════ */
  var currentLang = detectLanguage();

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Set initial language
    setLanguage(currentLang);

    // Bind toggle click
    var langBtn = document.getElementById('langToggle');
    if (langBtn) {
      langBtn.addEventListener('click', function () {
        var now = localStorage.getItem('lang') || currentLang;
        var next = now === 'tr' ? 'en' : 'tr';
        setLanguage(next);
      });
    }
  }

  // Expose for script.js visitor count locale
  window.__i18nGetLang = function () {
    return localStorage.getItem('lang') || currentLang;
  };
})();
