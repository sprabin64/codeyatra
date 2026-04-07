/* ═══════════════════════════════════════════════════════════
   CODEYATRA — Interactive Roadmap
   Canvas path drawing + node interactions + XP system
════════════════════════════════════════════════════════════ */
'use strict';

const ROADMAP_NODES = [
  {
    id: 'start',
    label: 'Day 0\nBeginning',
    phase: 'Foundation',
    color: '#6B7280',
    xPct: .04, yPct: .5,
    topics: ['HTML5 & CSS3', 'JavaScript ES2024', 'Git & GitHub', 'VS Code Setup'],
    desc: 'Start from zero. No experience needed. We build the foundation most bootcamps skip.',
    xp: 0
  },
  {
    id: 'js',
    label: 'Week 1–2\nJavaScript',
    phase: 'Foundation',
    color: '#D97706',
    xPct: .18, yPct: .22,
    topics: ['ES6+ & TypeScript', 'Async/Await & Promises', 'DOM Manipulation', 'Error Handling'],
    desc: 'Master modern JavaScript and TypeScript. This is the language that runs the entire MERN stack.',
    xp: 15
  },
  {
    id: 'react',
    label: 'Week 3–4\nReact 19',
    phase: 'Foundation',
    color: '#2563EB',
    xPct: .32, yPct: .5,
    topics: ['Hooks & Server Components', 'State Management', 'React Query', 'Next.js Basics'],
    desc: 'Build interactive UIs with React 19. You\'ll ship your first live project here.',
    xp: 30
  },
  {
    id: 'node',
    label: 'Week 5–6\nNode & APIs',
    phase: 'Advanced',
    color: '#16A34A',
    xPct: .46, yPct: .22,
    topics: ['Express.js REST APIs', 'JWT Authentication', 'Middleware & Security', 'API Testing'],
    desc: 'Build the backend. Design APIs that are secure, scalable, and fast.',
    xp: 50
  },
  {
    id: 'db',
    label: 'Week 7–8\nDatabases',
    phase: 'Advanced',
    color: '#FF6B35',
    xPct: .6, yPct: .5,
    topics: ['MongoDB & Mongoose', 'PostgreSQL & Prisma', 'Schema Design', 'Aggregation Pipelines'],
    desc: 'Data lives in databases. You\'ll learn both NoSQL and SQL, and when to use each.',
    xp: 65
  },
  {
    id: 'advanced',
    label: 'Week 9–10\nAI + Realtime',
    phase: 'Mastery',
    color: '#9333EA',
    xPct: .74, yPct: .22,
    topics: ['OpenAI API Integration', 'Socket.io', 'Redis Caching', 'GraphQL'],
    desc: 'Level up to senior skills. Build AI features and real-time apps companies actually ship.',
    xp: 80
  },
  {
    id: 'devops',
    label: 'Week 11–12\nDevOps',
    phase: 'Mastery',
    color: '#0891B2',
    xPct: .85, yPct: .5,
    topics: ['Docker & Containers', 'CI/CD Pipelines', 'AWS Deployment', 'Monitoring & Logging'],
    desc: 'Ship code to production. Set up pipelines, containers, and cloud infrastructure.',
    xp: 90
  },
  {
    id: 'hired',
    label: 'Day 90\nJob-Ready',
    phase: 'Launch',
    color: '#16A34A',
    xPct: .96, yPct: .5,
    topics: ['Portfolio & GitHub', 'Resume & LinkedIn', 'System Design Interviews', 'Offer Negotiation'],
    desc: 'Launch your career. You have 3+ live projects, a polished portfolio, and the skills to get hired.',
    xp: 100
  }
];

const PHASE_COLORS = {
  Foundation: '#FF6B35',
  Advanced: '#2563EB',
  Mastery: '#9333EA',
  Launch: '#16A34A'
};

(function initRoadmap() {
  const wrap = document.getElementById('roadmapWrap');
  const nodesDiv = document.getElementById('roadmapNodes');
  const canvas = document.getElementById('roadmapCanvas');
  const rdInner = document.getElementById('rdInner');
  const xpFill = document.getElementById('xpFill');
  const xpLevel = document.getElementById('xpLevel');

  if (!wrap || !nodesDiv || !canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, activeNode = null;

  function resize() {
    W = canvas.width = wrap.offsetWidth;
    H = canvas.height = wrap.offsetHeight;
    renderNodes();
    drawCanvas();
  }

  function getNodePos(node) {
    return { x: node.xPct * W, y: node.yPct * H };
  }

  function drawCanvas() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < ROADMAP_NODES.length - 1; i++) {
      const a = getNodePos(ROADMAP_NODES[i]);
      const b = getNodePos(ROADMAP_NODES[i + 1]);
      const activeIdx = activeNode ? ROADMAP_NODES.findIndex(n => n.id === activeNode) : -1;
      const isCompleted = activeIdx > i;

      const cpx = (a.x + b.x) / 2;

      // Background line
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(cpx, a.y, b.x, b.y);
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      ctx.stroke();

      // Active highlight
      if (isCompleted) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(cpx, a.y, b.x, b.y);
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, ROADMAP_NODES[i].color);
        grad.addColorStop(1, ROADMAP_NODES[i + 1].color);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    }
    ctx.setLineDash([]);
  }

  function renderNodes() {
    nodesDiv.innerHTML = '';

    ROADMAP_NODES.forEach((node, idx) => {
      const pos = getNodePos(node);
      const el = document.createElement('div');
      el.className = `rm-node${activeNode === node.id ? ' active' : ''}`;
      el.dataset.id = node.id;
      el.style.left = pos.x + 'px';
      el.style.top = pos.y + 'px';

      const isActive = activeNode === node.id;
      const phaseColor = PHASE_COLORS[node.phase] || node.color;

      el.innerHTML = `
        <div class="rm-node-inner">
          <div class="rm-bubble" style="${isActive ? `border-color:${node.color}; color:${node.color}; box-shadow: 0 0 0 4px ${node.color}20;` : ''}">
            ${idx === 0 ? '{ }' : idx === ROADMAP_NODES.length - 1 ? '★' : String(idx).padStart(2, '0')}
          </div>
          <span class="rm-label">${node.label}</span>
          ${idx > 0 ? `<span class="rm-phase-tag" style="background:${phaseColor}12; color:${phaseColor}; border:1px solid ${phaseColor}30;">${node.phase}</span>` : ''}
        </div>
      `;

      el.addEventListener('click', () => {
        activeNode = node.id;
        renderNodes();
        drawCanvas();
        showDetail(node);
        updateXP(node.xp);
      });

      nodesDiv.appendChild(el);
    });
  }

  function showDetail(node) {
    if (!rdInner) return;
    rdInner.style.opacity = '0';
    rdInner.style.transform = 'translateY(6px)';

    setTimeout(() => {
      rdInner.innerHTML = `
        <div class="rd-title" style="color:${node.color}">${node.label.replace('\n', ' — ')}</div>
        <div>
          <div class="rd-pills">
            ${node.topics.map(t => `<span class="rd-pill" style="background:${node.color}10; border:1px solid ${node.color}25; color:${node.color}">${t}</span>`).join('')}
          </div>
        </div>
        <div class="rd-desc">${node.desc}</div>
      `;
      rdInner.style.transition = 'opacity .35s ease, transform .35s ease';
      rdInner.style.opacity = '1';
      rdInner.style.transform = 'none';
    }, 120);
  }

  function updateXP(pct) {
    if (!xpFill || !xpLevel) return;
    xpFill.style.width = pct + '%';

    const levels = [
      { min: 0, label: 'Level 1 — Beginner' },
      { min: 30, label: 'Level 2 — Builder' },
      { min: 60, label: 'Level 3 — Developer' },
      { min: 85, label: 'Level 4 — Engineer' },
      { min: 99, label: 'Level 5 — Job-Ready ★' }
    ];
    const lvl = [...levels].reverse().find(l => pct >= l.min);
    if (lvl) xpLevel.textContent = lvl.label;
  }

  new ResizeObserver(resize).observe(wrap);
  resize();

  // Select first node
  setTimeout(() => {
    activeNode = ROADMAP_NODES[0].id;
    renderNodes();
    drawCanvas();
    showDetail(ROADMAP_NODES[0]);
  }, 100);

})();
