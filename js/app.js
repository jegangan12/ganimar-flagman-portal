/**
 * GANIMAR Flagship Portal - Main Application Script (Dan Aesthetic)
 * Standards: Safe textContent injection, Dynamic Year, Canvas Constellation,
 *            Interactive Navigator, Modals, Zero Jitter
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.GANIMAR_DATA;
  if (!data) {
    console.error('GANIMAR_DATA not loaded');
    return;
  }

  initDynamicYear();
  initCanvasConstellation();
  renderEcosystemBranches(data);
  renderSubdomainHub(data);
  renderStatsGrid(data);
  renderCasesShowcase(data);
  renderProductsLab(data);
  initInteractiveNavigator(data);
  initContactActions();
  initMobileMenu();
  initNavbarScroll();
});

/**
 * 1. Динамический расчет года в подвале
 * Стандарт Евгения Ганимара: год рассчитывается скриптом, без хардкода
 */
function initDynamicYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * 2. Интерактивное фоновое созвездие на Canvas
 */
function initCanvasConstellation() {
  const canvas = document.getElementById('constellation-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: -1000, y: -1000, radius: 120 };
  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 28), 40);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.radius = Math.random() * 1.4 + 0.6;
      this.baseAlpha = Math.random() * 0.35 + 0.15;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const angle = Math.atan2(dy, dx);
        const force = (mouse.radius - dist) / mouse.radius;
        this.x -= Math.cos(angle) * force * 1.2;
        this.y -= Math.sin(angle) * force * 1.2;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(249, 111, 0, ${this.baseAlpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          const alpha = (1 - dist / 100) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(249, 111, 0, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });
}

/**
 * 3. Рендеринг веток экосистемы зонтика
 */
function renderEcosystemBranches(data) {
  const container = document.getElementById('branches-grid');
  if (!container) return;
  container.innerHTML = '';

  data.branches.forEach((branch) => {
    const card = document.createElement('div');
    card.className = 'branch-card';

    const header = document.createElement('div');
    header.className = 'branch-header';

    const titleBox = document.createElement('div');
    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = branch.title;

    const badge = document.createElement('div');
    badge.className = 'branch-domain';
    badge.textContent = branch.domain;

    titleBox.appendChild(title);
    header.appendChild(titleBox);
    header.appendChild(badge);

    const desc = document.createElement('p');
    desc.className = 'card-text';
    desc.textContent = branch.desc;

    const featuresList = document.createElement('div');
    featuresList.className = 'branch-features';
    branch.features.forEach((feat) => {
      const featTag = document.createElement('span');
      featTag.className = 'feature-tag';
      featTag.textContent = feat;
      featuresList.appendChild(featTag);
    });

    const link = document.createElement('a');
    link.href = branch.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'branch-link-btn';
    link.innerHTML = `<span>${branch.ctaText}</span> <span>→</span>`;

    card.appendChild(header);
    card.appendChild(desc);
    card.appendChild(featuresList);
    card.appendChild(link);
    container.appendChild(card);
  });
}

/**
 * 4. Рендеринг Хаба поддоменов (me, cases, portfolio, cv)
 */
function renderSubdomainHub(data) {
  const container = document.getElementById('subdomains-grid');
  if (!container) return;
  container.innerHTML = '';

  data.subdomains.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'subdomain-card';

    const badge = document.createElement('div');
    badge.className = 'subdomain-badge';
    badge.textContent = item.subdomain;

    const title = document.createElement('h3');
    title.className = 'subdomain-title';
    title.textContent = item.title;

    const target = document.createElement('div');
    target.className = 'subdomain-target';
    target.textContent = item.target;

    const desc = document.createElement('p');
    desc.className = 'subdomain-desc';
    desc.textContent = item.desc;

    const btn = document.createElement('a');
    btn.href = item.url;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.className = 'subdomain-btn';
    btn.innerHTML = `<span>Открыть ${item.tag}</span> <span>↗</span>`;

    card.appendChild(badge);
    card.appendChild(title);
    card.appendChild(target);
    card.appendChild(desc);
    card.appendChild(btn);
    container.appendChild(card);
  });
}

/**
 * 5. Рендеринг метрик
 */
function renderStatsGrid(data) {
  const container = document.getElementById('stats-grid-wrapper');
  if (!container) return;
  container.innerHTML = '';

  data.statsGrid.forEach((stat) => {
    const tile = document.createElement('div');
    tile.className = 'stat-tile';

    const top = document.createElement('div');
    top.className = 'stat-tile-top';
    const pill = document.createElement('span');
    pill.className = 'stat-pill';
    pill.textContent = stat.badge;
    top.appendChild(pill);

    const huge = document.createElement('div');
    huge.className = 'stat-huge';
    huge.textContent = stat.number;

    const body = document.createElement('div');
    const title = document.createElement('div');
    title.className = 'stat-tile-title';
    title.textContent = stat.title;

    const desc = document.createElement('div');
    desc.className = 'stat-tile-desc';
    desc.textContent = stat.desc;

    body.appendChild(title);
    body.appendChild(desc);

    tile.appendChild(top);
    tile.appendChild(huge);
    tile.appendChild(body);
    container.appendChild(tile);
  });
}

/**
 * 6. Рендеринг кейсов
 */
function renderCasesShowcase(data) {
  const container = document.getElementById('cases-carousel');
  if (!container) return;
  container.innerHTML = '';

  data.cases.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'case-card';

    const niche = document.createElement('div');
    niche.className = 'case-niche';
    niche.textContent = item.niche;

    const title = document.createElement('h3');
    title.className = 'case-title';
    title.textContent = item.title;

    const metrics = document.createElement('div');
    metrics.className = 'case-metrics-banner';
    metrics.textContent = item.metrics;

    const desc = document.createElement('p');
    desc.className = 'case-desc';
    desc.textContent = item.desc;

    const tagsBox = document.createElement('div');
    tagsBox.className = 'case-tags';
    item.tags.forEach((tag) => {
      const span = document.createElement('span');
      span.className = 'case-tag';
      span.textContent = tag;
      tagsBox.appendChild(span);
    });

    card.appendChild(niche);
    card.appendChild(title);
    card.appendChild(metrics);
    card.appendChild(desc);
    card.appendChild(tagsBox);
    container.appendChild(card);
  });
}

/**
 * 7. Рендеринг продуктов
 */
function renderProductsLab(data) {
  const container = document.getElementById('products-grid');
  if (!container) return;
  container.innerHTML = '';

  data.products.forEach((prod) => {
    const card = document.createElement('div');
    card.className = 'product-card';

    const header = document.createElement('div');
    header.className = 'product-header';

    const name = document.createElement('h3');
    name.className = 'product-name';
    name.textContent = prod.name;

    const status = document.createElement('span');
    status.className = 'product-status-pill';
    status.textContent = prod.status;

    header.appendChild(name);
    header.appendChild(status);

    const role = document.createElement('div');
    role.className = 'product-role';
    role.textContent = prod.role;

    const desc = document.createElement('p');
    desc.className = 'product-desc';
    desc.textContent = prod.desc;

    const link = document.createElement('a');
    link.href = prod.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'subdomain-btn';
    link.innerHTML = `<span>Подробнее о ${prod.name}</span> <span>→</span>`;

    card.appendChild(header);
    card.appendChild(role);
    card.appendChild(desc);
    card.appendChild(link);
    container.appendChild(card);
  });
}

/**
 * 8. Интерактивный навигатор потребностей
 */
function initInteractiveNavigator(data) {
  const tabsContainer = document.getElementById('navigator-tabs');
  const panelContainer = document.getElementById('navigator-panel');
  if (!tabsContainer || !panelContainer) return;

  tabsContainer.innerHTML = '';

  function renderPanel(activeId) {
    const item = data.navigator.find((n) => n.id === activeId) || data.navigator[0];

    panelContainer.innerHTML = `
      <div>
        <span class="section-subtitle">${item.subtitle}</span>
        <h3 class="nav-recommend-title">${item.title}</h3>
        <p class="nav-recommend-text">${item.recommendation}</p>
        <div class="nav-links-row">
          <a href="${item.primaryUrl}" target="_blank" rel="noopener noreferrer" class="btn-dan-primary">
            ${item.actionText} →
          </a>
          <a href="${item.proofUrl}" target="_blank" rel="noopener noreferrer" class="btn-dan-outline">
            Посмотреть ${item.proofLink}
          </a>
        </div>
      </div>
      <div style="background: var(--bg-alt); padding: 24px; border: 1px solid var(--border-light);">
        <div style="font-family: 'Barlow Condensed'; font-size: 15px; font-weight: 700; color: var(--accent-amber); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px;">
          Рекомендуемый маршрут
        </div>
        <div style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">
          ${item.id === 'client' ? '1. Изучите твердые кейсы в МФЮА и застройщиках<br>2. Ознакомьтесь с услугами на ganimarketing.ru<br>3. Напишите Евгению в Telegram для экспресс-аудита' : ''}
          ${item.id === 'student' ? '1. Посмотрите открытые материалы в Школе<br>2. Ознакомьтесь с платформой GVIDERA<br>3. Запишитесь на поток по вайб-кодингу' : ''}
          ${item.id === 'partner' ? '1. Ознакомьтесь с деком portfolio.ganimar.ru<br>2. Посмотрите витрину 51 AI-продукта<br>3. Обсудите формат партнерства в личном чате' : ''}
        </div>
      </div>
    `;
  }

  data.navigator.forEach((navItem, index) => {
    const btn = document.createElement('button');
    btn.className = `nav-tab-btn ${index === 0 ? 'active' : ''}`;
    btn.textContent = navItem.title;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-tab-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderPanel(navItem.id);
    });
    tabsContainer.appendChild(btn);
  });

  renderPanel(data.navigator[0].id);
}

/**
 * 9. Копирование контактов и тост
 */
function initContactActions() {
  const copyButtons = document.querySelectorAll('[data-copy-text]');
  const toast = document.getElementById('toast-box');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy-text');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Скопировано: ${textToCopy} ✨`);
        });
      }
    });
  });
}

/**
 * 10. Мобильное меню
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      toggleBtn.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggleBtn.textContent = '☰';
      });
    });
  }
}

/**
 * 11. Плавная шапка при скролле (Dan Nav-Scroll)
 */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });
}
