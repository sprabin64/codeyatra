/* ═══════════════════════════════════════════════════════════
   CODEYATRA — Main App JS
   Nav, Hero Terminal, Reveals, Projects, Outcomes,
   Testimonials, CTA Form
════════════════════════════════════════════════════════════ */
'use strict';

/* ── DATA ──────────────────────────────────────────────── */
const PROJECTS_DATA = [
  {
    title: 'Full-Stack E-Commerce',
    desc: 'Multi-vendor marketplace with cart, payments, real-time inventory, and admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB'],
    tagStyle: ['', '', ''],
    phase: 'Phase 1', week: 'Wk 4',
    duration: '4 weeks', filter: 'fullstack',
    gradient: 'linear-gradient(135deg,#1A1F38 0%,#2D3352 100%)',
    icon: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-10 2a2 2 0 100 4 2 2 0 000-4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    title: 'Real-Time Chat App',
    desc: 'Rooms, DMs, typing indicators, media sharing, and presence — all with WebSockets.',
    tags: ['Socket.io', 'React', 'Redis'],
    tagStyle: ['proj-tag-blue', '', 'proj-tag-green'],
    phase: 'Phase 1', week: 'Wk 6',
    duration: '3 weeks', filter: 'fullstack',
    gradient: 'linear-gradient(135deg,#1a2e3d 0%,#1A1F38 100%)',
    icon: `<svg viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`
  },
  {
    title: 'AI Resume Builder',
    desc: 'AI-powered resume generator. Input your skills, get a polished, ATS-ready resume in seconds.',
    tags: ['React', 'OpenAI API', 'TypeScript'],
    tagStyle: ['', 'proj-tag-blue', ''],
    phase: 'Phase 3', week: 'Wk 10',
    duration: '3 weeks', filter: 'ai',
    gradient: 'linear-gradient(135deg,#2D1A38 0%,#1A1F38 100%)',
    icon: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M9 12a3 3 0 006 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9 9h.01M15 9h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    title: 'REST API: Job Board',
    desc: 'Production-grade REST API with auth, role-based access, pagination, and full test coverage.',
    tags: ['Node.js', 'Express', 'MongoDB'],
    tagStyle: ['proj-tag-blue', '', ''],
    phase: 'Phase 2', week: 'Wk 7',
    duration: '2 weeks', filter: 'api',
    gradient: 'linear-gradient(135deg,#1a2a1a 0%,#1A1F38 100%)',
    icon: `<svg viewBox="0 0 24 24" fill="none"><path d="M10 20l4-16M4 15l-3-3 3-3M20 15l3-3-3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    title: 'Social Media Dashboard',
    desc: 'Full social platform — posts, likes, follows, notifications, analytics, and responsive UI.',
    tags: ['Next.js', 'GraphQL', 'PostgreSQL'],
    tagStyle: ['', 'proj-tag-green', ''],
    phase: 'Phase 2', week: 'Wk 9',
    duration: '5 weeks', filter: 'fullstack',
    gradient: 'linear-gradient(135deg,#38241a 0%,#1A1F38 100%)',
    icon: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>`
  },
  {
    title: 'AI Code Review Bot',
    desc: 'GitHub-integrated bot that reviews PRs using AI, suggests improvements, and tracks code quality.',
    tags: ['Node.js', 'OpenAI API', 'TypeScript'],
    tagStyle: ['proj-tag-blue', 'proj-tag-blue', ''],
    phase: 'Phase 3', week: 'Wk 12',
    duration: '4 weeks', filter: 'ai',
    gradient: 'linear-gradient(135deg,#1A1F38 0%,#2D2352 100%)',
    icon: `<svg viewBox="0 0 24 24" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  }
];

const SKILLS_DATA = [
  { name: 'React & Next.js', pct: 92 },
  { name: 'Node.js & Express', pct: 88 },
  { name: 'TypeScript', pct: 85 },
  { name: 'MongoDB & PostgreSQL', pct: 80 },
  { name: 'System Design', pct: 72 },
  { name: 'CI/CD & Docker', pct: 68 }
];

const ROLES_DATA = [
  { title: 'Frontend Developer', salary: '₹4–8 LPA' },
  { title: 'Backend Developer', salary: '₹5–10 LPA' },
  { title: 'Full-Stack Engineer', salary: '₹7–14 LPA' },
  { title: 'React Native Dev', salary: '₹5–9 LPA' },
  { title: 'DevOps Engineer', salary: '₹8–15 LPA' },
  { title: 'Remote Freelancer', salary: '$30–80/hr' }
];

const SALARY_DATA = [
  { label: 'Entry (0–1 yr)', val: '₹4–6 LPA', pct: 45, color: 'linear-gradient(90deg,#FF6B35,#FF8F66)' },
  { label: 'Mid (1–3 yr)', val: '₹7–12 LPA', pct: 70, color: 'linear-gradient(90deg,#2563EB,#60a5fa)' },
  { label: 'Senior (3+ yr)', val: '₹14–24 LPA', pct: 92, color: 'linear-gradient(90deg,#16A34A,#4ade80)' },
  { label: 'Remote (Global)', val: '$4–10K/mo', pct: 85, color: 'linear-gradient(90deg,#D97706,#FBBF24)' }
];

const TESTIMONIALS_DATA = [
  {
    text: `I graduated with a CS degree and couldn't pass a basic interview. CodeYatra changed everything. After 90 days I had <em>3 live projects</em>, an offer letter, and actual confidence.`,
    name: 'Priya Sharma', role: 'Frontend Dev at InnoTech', company: '₹8 LPA',
    initials: 'PS', color: '#FF6B35'
  },
  {
    text: `My university taught C in 2024. I didn't know React existed until I joined CodeYatra. Now I'm <em>building SaaS products</em> and consulting for startups remotely.`,
    name: 'Bibek Adhikari', role: 'Full-Stack Freelancer', company: '$55/hr',
    initials: 'BA', color: '#1A1F38'
  },
  {
    text: `The project-first approach is what makes this different. You're not watching videos — you're <em>shipping code to production</em> from week 2. That's what gets you hired.`,
    name: 'Sarita Thapa', role: 'Backend Engineer at CloudBase', company: '₹11 LPA',
    initials: 'ST', color: '#16A34A'
  },
  {
    text: `I dropped out of my BCA because it felt useless. Joined CodeYatra at 20. Within 3 months I was earning more than <em>my professors</em>. No regrets.`,
    name: 'Rajan Karki', role: 'React Native Dev', company: '₹9.5 LPA',
    initials: 'RK', color: '#D97706'
  }
];

/* ═══════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════ */
(function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const mobile = document.getElementById('navMobile');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  burger?.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    mobile.classList.toggle('open', open);
  });

  document.querySelectorAll('.nav-mobile-panel a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      mobile.classList.remove('open');
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu if open
      burger?.classList.remove('open');
      mobile?.classList.remove('open');
    });
  });
})();

/* ═══════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════ */
function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .1, rootMargin: '0px 0px -30px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ═══════════════════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════════════════ */
function startCounters() {
  const els = document.querySelectorAll('[data-count]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting || e.target.dataset.done) return;
      e.target.dataset.done = '1';
      const target = +e.target.dataset.count;
      const dur = 1800;
      const start = performance.now();
      const ease = t => 1 - Math.pow(2, -10 * t);
      (function tick(now) {
        const pct = Math.min((now - start) / dur, 1);
        e.target.textContent = Math.round(ease(pct) * target);
        if (pct < 1) requestAnimationFrame(tick);
      })(start);
    });
  }, { threshold: .4 });
  els.forEach(el => obs.observe(el));
}

/* ═══════════════════════════════════════════════
   WHY SECTION BARS
═══════════════════════════════════════════════ */
(function initWhyBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const fill = e.target.querySelector('.wc-bar-fill');
      if (fill) {
        const w = fill.dataset.width || '50';
        fill.style.width = w + '%';
      }
      obs.unobserve(e.target);
    });
  }, { threshold: .3 });
  document.querySelectorAll('.wc-metric').forEach(el => obs.observe(el));
})();

/* ═══════════════════════════════════════════════
   HERO TERMINAL ANIMATION
═══════════════════════════════════════════════ */
function renderHeroTerminal() {
  const el = document.getElementById('heroTerminal');
  if (!el) return;

  const lines = [
    { type: 'cmd', text: 'npx create-career --stack mern' },
    { type: 'out', text: '✓ Setting up React 19...', cls: 't-green' },
    { type: 'out', text: '✓ Configuring Node.js backend...', cls: 't-blue' },
    { type: 'out', text: '✓ Connecting MongoDB...', cls: 't-orange' },
    { type: 'out', text: '✓ Loading 6 real projects...', cls: 't-green' },
    { type: 'cmd', text: 'git push origin main' },
    { type: 'out', text: '↑ Portfolio: LIVE at your-name.dev', cls: 't-blue' },
    { type: 'out', text: '↑ Offers: 3 received ✓', cls: 't-orange' },
    { type: 'cursor' }
  ];

  el.innerHTML = '';
  let i = 0;

  function addLine() {
    if (i >= lines.length) return;
    const ln = lines[i++];
    const div = document.createElement('div');
    div.className = 't-line';

    if (ln.type === 'cmd') {
      div.innerHTML = `<span class="t-prompt">$</span><span class="t-cmd"> ${ln.text}</span>`;
    } else if (ln.type === 'out') {
      div.innerHTML = `<span class="t-out ${ln.cls || ''}">${ln.text}</span>`;
    } else if (ln.type === 'cursor') {
      div.innerHTML = `<span class="t-prompt">$</span><span class="t-blink"></span>`;
    }

    div.style.opacity = '0';
    div.style.transform = 'translateX(-6px)';
    el.appendChild(div);
    requestAnimationFrame(() => {
      div.style.transition = 'opacity .3s ease, transform .3s ease';
      div.style.opacity = '1';
      div.style.transform = 'none';
    });

    const delay = ln.type === 'cmd' ? 500 : 280;
    if (i < lines.length) setTimeout(addLine, delay);
  }

  setTimeout(addLine, 400);
}

/* ═══════════════════════════════════════════════
   PROJECTS
═══════════════════════════════════════════════ */
(function initProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  function render(filter = 'all') {
    const data = filter === 'all' ? PROJECTS_DATA : PROJECTS_DATA.filter(p => p.filter === filter);
    grid.innerHTML = data.map((p, i) => `
      <div class="proj-card" data-reveal style="transition-delay:${(i % 3) * .06}s">
        <div class="proj-visual">
          <div class="proj-visual-bg" style="background:${p.gradient}; position:absolute; inset:0;"></div>
          <span class="proj-phase">${p.phase}</span>
          <span class="proj-week">${p.week}</span>
          <div class="proj-icon-wrap">${p.icon}</div>
        </div>
        <div class="proj-body">
          <div class="proj-tags">
            ${p.tags.map((t, ti) => `<span class="proj-tag ${p.tagStyle[ti] || ''}">${t}</span>`).join('')}
          </div>
          <div class="proj-title">${p.title}</div>
          <div class="proj-desc">${p.desc}</div>
        </div>
        <div class="proj-footer">
          <span class="proj-duration">${p.duration}</span>
          <div class="proj-arrow">
            <svg viewBox="0 0 12 12" fill="none"><path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </div>
      </div>
    `).join('');

    // Re-observe for reveal
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: .08 });
    grid.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
  }

  render();

  // Filter buttons
  document.querySelectorAll('.pf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.dataset.filter);
    });
  });
})();

/* ═══════════════════════════════════════════════
   OUTCOMES
═══════════════════════════════════════════════ */
(function initOutcomes() {
  const skillsList = document.getElementById('skillsList');
  if (skillsList) {
    skillsList.innerHTML = SKILLS_DATA.map(s => `
      <div class="skill-row">
        <div class="skill-name"><span>${s.name}</span><span class="skill-pct">${s.pct}%</span></div>
        <div class="skill-track"><div class="skill-fill" data-pct="${s.pct}"></div></div>
      </div>
    `).join('');
  }

  const rolesGrid = document.getElementById('rolesGrid');
  if (rolesGrid) {
    rolesGrid.innerHTML = ROLES_DATA.map(r => `
      <div class="role-chip">
        ${r.title}
        <span class="role-salary">${r.salary}</span>
      </div>
    `).join('');
  }

  const salaryChart = document.getElementById('salaryChart');
  if (salaryChart) {
    salaryChart.innerHTML = SALARY_DATA.map(s => `
      <div class="salary-row">
        <div class="salary-label"><span>${s.label}</span><span class="salary-val">${s.val}</span></div>
        <div class="salary-track"><div class="salary-fill" data-pct="${s.pct}" style="background:${s.color}"></div></div>
      </div>
    `).join('');
  }

  // Animate bars when in view
  const section = document.querySelector('.outcomes-section');
  if (section) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.skill-fill, .salary-fill').forEach(bar => {
          bar.style.width = bar.dataset.pct + '%';
        });
        obs.unobserve(e.target);
      });
    }, { threshold: .2 });
    obs.observe(section);
  }
})();

/* ═══════════════════════════════════════════════
   TESTIMONIALS CAROUSEL
═══════════════════════════════════════════════ */
(function initTestimonials() {
  const track = document.getElementById('testiTrack');
  const dotsWrap = document.getElementById('testiDots');
  const prev = document.getElementById('testiPrev');
  const next = document.getElementById('testiNext');
  if (!track) return;

  track.innerHTML = TESTIMONIALS_DATA.map((t, i) => `
    <div class="testi-card ${i === 0 ? 'active' : ''}">
      <div class="testi-stars">
        ${Array(5).fill('<svg viewBox="0 0 12 12"><path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.3L6 8.5l-3 1.6.6-3.3L1.2 4.5l3.3-.5z" fill="currentColor"/></svg>').join('')}
      </div>
      <p class="testi-text">"${t.text}"</p>
      <div class="testi-author">
        <div class="testi-av" style="background:${t.color}">${t.initials}</div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-role">${t.role}</div>
        </div>
        <div class="testi-company">${t.company}</div>
      </div>
    </div>
  `).join('');

  dotsWrap.innerHTML = TESTIMONIALS_DATA.map((_, i) =>
    `<span class="testi-dot ${i === 0 ? 'active' : ''}" data-i="${i}"></span>`
  ).join('');

  let cur = 0;
  const cards = track.querySelectorAll('.testi-card');
  const dots = dotsWrap.querySelectorAll('.testi-dot');

  function goTo(idx) {
    cards[cur].classList.remove('active');
    dots[cur].classList.remove('active');
    cur = (idx + cards.length) % cards.length;
    cards[cur].classList.add('active');
    dots[cur].classList.add('active');
    const cardW = cards[0].offsetWidth + 20;
    track.style.transform = `translateX(-${cur * cardW}px)`;
  }

  prev?.addEventListener('click', () => goTo(cur - 1));
  next?.addEventListener('click', () => goTo(cur + 1));
  dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.i)));

  let auto = setInterval(() => goTo(cur + 1), 5000);
  track.addEventListener('mouseenter', () => clearInterval(auto));
  track.addEventListener('mouseleave', () => { auto = setInterval(() => goTo(cur + 1), 5000); });

  window.addEventListener('resize', () => {
    const cardW = cards[0].offsetWidth + 20;
    track.style.transform = `translateX(-${cur * cardW}px)`;
  });
})();

/* ═══════════════════════════════════════════════
   CTA FORM
═══════════════════════════════════════════════ */
(function initForm() {
  const form = document.getElementById('ctaForm');
  const success = document.getElementById('ctaSuccess');
  const btn = document.getElementById('ctaSubmit');
  const btnTxt = document.getElementById('ctaBtnText');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name = document.getElementById('ctaName')?.value?.trim();
    const email = document.getElementById('ctaEmail')?.value?.trim();
    const level = document.getElementById('ctaLevel')?.value;

    if (!name || !email || !level) {
      alert('Please fill in all fields.');
      return;
    }

    btnTxt.textContent = 'Submitting...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    await new Promise(r => setTimeout(r, 1200));

    try {
      await fetch('tables/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, level })
      });
    } catch (_) {}

    form.style.display = 'none';
    success.classList.add('visible');
  });
})();

/* ═══════════════════════════════════════════════
   INIT ON LOAD
═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  startCounters();
  renderHeroTerminal();
});
