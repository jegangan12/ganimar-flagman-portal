/**
 * GANIMAR Flagship Portal — Script
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.GANIMAR_DATA;
  if (!data) return;

  // Динамический год
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Рендеринг веток
  renderBranches(data);

  // Рендеринг поддоменов
  renderSubdomains(data);

  // Рендеринг метрик
  renderStats(data);

  // Рендеринг кейсов
  renderCases(data);

  // Рендеринг продуктов
  renderProducts(data);

  // Скролл шапки
  initNavScroll();
});

function renderBranches(data) {
  const container = document.getElementById('branches-grid');
  if (!container) return;
  container.innerHTML = '';

  data.branches.forEach((b) => {
    const card = document.createElement('div');
    card.className = 'branch-card';
    card.innerHTML = `
      <div>
        <div class="branch-top">
          <h3 class="branch-title">${b.title}</h3>
          <span class="branch-pill">${b.domain}</span>
        </div>
        <p class="branch-desc">${b.desc}</p>
      </div>
      <div>
        <div class="branch-tags">
          ${b.features.map(f => `<span class="branch-tag">${f}</span>`).join('')}
        </div>
        <a href="${b.url}" target="_blank" rel="noopener noreferrer" class="branch-btn">
          <span>${b.ctaText}</span>
          <span>→</span>
        </a>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderSubdomains(data) {
  const container = document.getElementById('subdomains-grid');
  if (!container) return;
  container.innerHTML = '';

  data.subdomains.forEach((s) => {
    const card = document.createElement('div');
    card.className = 'subdomain-card';
    card.innerHTML = `
      <div>
        <div class="sub-badge">${s.subdomain}</div>
        <h3 class="sub-title">${s.title}</h3>
        <div class="sub-target">${s.target}</div>
        <p class="sub-desc">${s.desc}</p>
      </div>
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="sub-btn">
        <span>Открыть ${s.tag}</span>
        <span>↗</span>
      </a>
    `;
    container.appendChild(card);
  });
}

function renderStats(data) {
  const container = document.getElementById('stats-grid');
  if (!container) return;
  container.innerHTML = '';

  data.statsGrid.forEach((st) => {
    const card = document.createElement('div');
    card.className = 'stat-card';
    card.innerHTML = `
      <div class="stat-badge">${st.badge}</div>
      <div class="stat-val highlight">${st.number}</div>
      <div class="stat-title">${st.title}</div>
      <div class="stat-desc">${st.desc}</div>
    `;
    container.appendChild(card);
  });
}

function renderCases(data) {
  const container = document.getElementById('cases-grid');
  if (!container) return;
  container.innerHTML = '';

  data.cases.forEach((c) => {
    const card = document.createElement('div');
    card.className = 'case-card';
    card.innerHTML = `
      <div>
        <div class="case-niche">${c.niche}</div>
        <h3 class="case-title">${c.title}</h3>
        <div class="case-metric">${c.metrics}</div>
        <p class="case-desc">${c.desc}</p>
      </div>
      <div class="branch-tags">
        ${c.tags.map(t => `<span class="branch-tag">${t}</span>`).join('')}
      </div>
    `;
    container.appendChild(card);
  });
}

function renderProducts(data) {
  const container = document.getElementById('products-grid');
  if (!container) return;
  container.innerHTML = '';

  data.products.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <h3 class="product-title" style="margin: 0;">${p.name}</h3>
          <span style="font-family: var(--font-display); font-size: 11px; color: var(--accent-amber); border: 1px solid var(--border-amber); padding: 2px 6px; text-transform: uppercase;">${p.status}</span>
        </div>
        <div class="sub-target">${p.role}</div>
        <p class="product-desc">${p.desc}</p>
      </div>
      <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="sub-btn">
        <span>Подробнее о ${p.name}</span>
        <span>→</span>
      </a>
    `;
    container.appendChild(card);
  });
}

function initNavScroll() {
  const nav = document.getElementById('site-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  });
}
