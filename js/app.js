/**
 * GANIMAR Flagship Portal — Dan Template Script
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.GANIMAR_DATA;
  if (!data) return;

  // 1. Динамический расчет года
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Рендеринг веток экосистемы
  renderBranches(data);

  // 3. Рендеринг поддоменов
  renderSubdomains(data);

  // 4. Рендеринг метрик
  renderStats(data);

  // 5. Рендеринг кейсов
  renderCases(data);

  // 6. Рендеринг продуктов
  renderProducts(data);

  // 7. Скролл навигации
  initNavScroll();
});

function renderBranches(data) {
  const container = document.getElementById('branches-container');
  if (!container) return;
  container.innerHTML = '';

  data.branches.forEach((b) => {
    const col = document.createElement('div');
    col.className = 'col-md-6 mb-4';

    col.innerHTML = `
      <div class="hub-card">
        <div>
          <div class="hub-sub">${b.domain}</div>
          <h4>${b.title}</h4>
          <p>${b.desc}</p>
        </div>
        <div>
          <div class="mb-3" style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${b.features.map(f => `<span style="font-size: 12px; color: #bbb; background: rgba(255,255,255,0.05); padding: 3px 8px; border-radius: 2px;">${f}</span>`).join('')}
          </div>
          <a href="${b.url}" target="_blank" rel="noopener noreferrer" class="hub-btn">
            <span>${b.ctaText}</span>
            <span>→</span>
          </a>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

function renderSubdomains(data) {
  const container = document.getElementById('subdomains-container');
  if (!container) return;
  container.innerHTML = '';

  data.subdomains.forEach((s) => {
    const col = document.createElement('div');
    col.className = 'col-md-3 col-sm-6 mb-4';

    col.innerHTML = `
      <div class="hub-card">
        <div>
          <div class="hub-sub">${s.subdomain}</div>
          <h4>${s.title}</h4>
          <div class="hub-target">${s.target}</div>
          <p>${s.desc}</p>
        </div>
        <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="hub-btn">
          <span>Открыть ${s.tag}</span>
          <span>↗</span>
        </a>
      </div>
    `;
    container.appendChild(col);
  });
}

function renderStats(data) {
  const container = document.getElementById('stats-container');
  if (!container) return;
  container.innerHTML = '';

  data.statsGrid.forEach((st) => {
    const col = document.createElement('div');
    col.className = 'col-md-3 col-sm-6 mb-4';

    col.innerHTML = `
      <div class="stat-box">
        <div style="font-family: 'Barlow Condensed'; font-size: 12px; color: #f96f00; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px;">${st.badge}</div>
        <div class="num amber">${st.number}</div>
        <h5>${st.title}</h5>
        <p>${st.desc}</p>
      </div>
    `;
    container.appendChild(col);
  });
}

function renderCases(data) {
  const container = document.getElementById('cases-container');
  if (!container) return;
  container.innerHTML = '';

  data.cases.forEach((c) => {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6 mb-4';

    col.innerHTML = `
      <div class="hub-card">
        <div>
          <div class="hub-sub">${c.niche}</div>
          <h4>${c.title}</h4>
          <div style="font-size: 14px; font-weight: 600; color: #fff; background: rgba(249,111,0,0.12); border-left: 2px solid #f96f00; padding: 6px 10px; margin: 10px 0;">
            ${c.metrics}
          </div>
          <p>${c.desc}</p>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 5px;">
          ${c.tags.map(t => `<span style="font-size: 11px; color: #aaa; background: rgba(255,255,255,0.04); padding: 2px 6px;">${t}</span>`).join('')}
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

function renderProducts(data) {
  const container = document.getElementById('products-container');
  if (!container) return;
  container.innerHTML = '';

  data.products.forEach((p) => {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6 mb-4';

    col.innerHTML = `
      <div class="hub-card">
        <div>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h4 class="mb-0">${p.name}</h4>
            <span style="font-family: 'Barlow Condensed'; font-size: 11px; color: #f96f00; border: 1px solid rgba(249,111,0,0.4); padding: 2px 6px; text-transform: uppercase;">${p.status}</span>
          </div>
          <div class="hub-target">${p.role}</div>
          <p>${p.desc}</p>
        </div>
        <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="hub-btn">
          <span>Подробнее о ${p.name}</span>
          <span>→</span>
        </a>
      </div>
    `;
    container.appendChild(col);
  });
}

function initNavScroll() {
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav?.classList.add('nav-scroll');
    } else {
      nav?.classList.remove('nav-scroll');
    }
  });
}
