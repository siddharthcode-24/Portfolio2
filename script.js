/* ==========================================================================
   Siddharth Bajaj — Portfolio interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('loaded'), 400);
  });

  /* ---------- Custom cursor ---------- */
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
  });
  (function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();
  document.querySelectorAll('a, button, .project-card, .cert-card, .skill-card, .tab-btn').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  /* ---------- Scroll progress + header state + back to top ---------- */
  const progressBar = document.getElementById('scroll-progress');
  const header = document.getElementById('site-header');
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = scrolled + '%';
    header.classList.toggle('scrolled', h.scrollTop > 10);
    backToTop.classList.toggle('show', h.scrollTop > 500);
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('main-nav');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mainNav.classList.toggle('open');
  });
  mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('open'); mainNav.classList.remove('open');
  }));

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('nav.main-nav a');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => navObserver.observe(s));

  /* ---------- Theme toggle ---------- */
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
  });

  /* ---------- Typed.js hero role cycle ---------- */
  if (window.Typed) {
    new Typed('#typed-role', {
      strings: [
        'Full-Stack Developer',
        'Python Developer',
        'AI &amp; ML Enthusiast',
        'Cyber Security Enthusiast',
        'National Hackathon Winner'
      ],
      typeSpeed: 55, backSpeed: 32, backDelay: 1400, startDelay: 400, loop: true, smartBackspace: true
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('in-view'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const duration = 1600;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  /* ---------- Skill + XP progress bars ---------- */
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.dataset.fill;
        const bar = entry.target.querySelector('.skill-bar-fill, .xp-fill');
        if (bar) bar.style.width = fill + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('[data-fill]').forEach(el => barObserver.observe(el));

  /* ---------- Skills filter tabs ---------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      skillCards.forEach(card => {
        const show = cat === 'all' || card.dataset.cat === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- Project filter ---------- */
  const filterBtns = document.querySelectorAll('.project-filters .tab-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      projectCards.forEach(card => {
        const show = cat === 'all' || card.dataset.cat.includes(cat);
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- Project tilt effect ---------- */
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ---------- Magnetic buttons ---------- */
  document.querySelectorAll('.btn, #terminal-fab').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* ---------- Ripple click effect ---------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- Certificate lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      lightboxImg.src = card.dataset.full;
      lightboxImg.alt = card.dataset.title;
      lightbox.classList.add('open');
    });
  });
  document.getElementById('lightbox-close').addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') lightbox.classList.remove('open'); });

  /* ---------- Contact form (Formspree, no redirect) ---------- */
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('send-btn');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    statusEl.textContent = ''; statusEl.className = 'form-status';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        statusEl.textContent = '✓ Message sent — thanks for reaching out! I\'ll reply soon.';
        statusEl.classList.add('ok');
        form.reset();
      } else {
        throw new Error('Send failed');
      }
    } catch (err) {
      statusEl.textContent = '✗ Something went wrong. Please email me directly instead.';
      statusEl.classList.add('err');
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });

  /* ---------- Terminal easter egg ---------- */
  const terminalFab = document.getElementById('terminal-fab');
  const terminalContainer = document.getElementById('terminal-container');
  const terminalBody = document.getElementById('terminal-body');
  const terminalHeader = document.getElementById('terminal-header');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');

  terminalFab.addEventListener('click', () => {
    const isOpen = terminalContainer.style.display === 'block';
    terminalContainer.style.display = isOpen ? 'none' : 'block';
    if (!isOpen) terminalInput.focus();
  });

  terminalHeader.addEventListener('dblclick', () => {
    terminalBody.style.display = terminalBody.style.display === 'none' ? 'flex' : 'none';
  });

  const commandMap = {
    home: 'home', about: 'about', skills: 'skills', experience: 'experience',
    projects: 'projects', certs: 'certifications', achievements: 'achievements', contact: 'contact'
  };

  function printLine(html) {
    const p = document.createElement('p');
    p.className = 'terminal-output-text';
    p.innerHTML = html;
    terminalOutput.appendChild(p);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  terminalInput.addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') return;
    const raw = terminalInput.value.trim();
    const cmd = raw.toLowerCase();
    terminalInput.value = '';
    printLine(`<span class="command-highlight">$</span> ${raw}`);
    if (cmd === 'help') {
      printLine("Commands: <span class='command-highlight'>home about skills experience projects certs achievements contact</span> — navigate<br>" +
                 "<span class='command-highlight'>whoami</span> — quick bio · <span class='command-highlight'>clear</span> — clear screen · <span class='command-highlight'>exit</span> — close terminal");
    } else if (cmd === 'whoami') {
      printLine("Siddharth Bajaj — CSE student, full-stack &amp; Python developer, cybersecurity enthusiast.");
    } else if (cmd === 'clear') {
      terminalOutput.innerHTML = '';
    } else if (cmd === 'exit') {
      terminalContainer.style.display = 'none';
    } else if (commandMap[cmd]) {
      document.getElementById(commandMap[cmd])?.scrollIntoView({ behavior: 'smooth' });
      printLine(`Navigating to <span class="command-highlight">#${commandMap[cmd]}</span> …`);
    } else {
      printLine(`Command not found: <span class="command-highlight">${raw}</span>. Type <span class="command-highlight">help</span>.`);
    }
  });
});
