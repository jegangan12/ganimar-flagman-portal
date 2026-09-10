/**
 * GANIMAR Flagship Portal - Script
 * Features: Clickable whole cards, Image previews, Scroll effects
 * Блог рендерится статически в HTML (/blog/) - ради индексации без JS
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.GANIMAR_DATA;
  if (!data) return;

  // Динамический год
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Рендеринг всех секций
  renderBranches(data);
  renderEcoExtra(data);
  renderSubdomains(data);
  renderStats(data);
  renderCases(data);
  renderProducts(data);
  renderSocials(data);

  // Скролл шапки
  initNavScroll();
  initMobileNav();
});

function renderBranches(data) {
  const container = document.getElementById('branches-grid');
  if (!container) return;
  container.innerHTML = '';

  data.branches.forEach((b) => {
    const card = createCard('branch-card', b.url);
    card.innerHTML = `
      <div>
        <img src="${b.preview}" alt="${b.title}" class="card-img-preview" />
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
        <div class="branch-btn">
          <span>${b.ctaText}</span>
          <span>→</span>
        </div>
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
    const card = createCard('subdomain-card', s.url);
    card.innerHTML = `
      <div>
        <div class="sub-badge">${s.subdomain}</div>
        <h3 class="sub-title">${s.title}</h3>
        <div class="sub-target">${s.target}</div>
        <p class="sub-desc">${s.desc}</p>
      </div>
      <div class="sub-btn">
        <span>Открыть ${s.tag}</span>
        <span>↗</span>
      </div>
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
    const card = createCard('case-card', c.url);
    card.innerHTML = `
      <div>
        <img src="${c.preview}" alt="${c.title}" class="card-img-top" />
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
    const card = createCard('product-card', p.url);
    card.innerHTML = `
      <div>
        <img src="${p.preview}" alt="${p.name}" class="card-img-top" />
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <h3 class="product-title" style="margin: 0;">${p.name}</h3>
          <span style="font-family: var(--font-display); font-size: 11px; color: var(--accent-amber); border: 1px solid var(--border-amber); padding: 2px 6px; text-transform: uppercase;">${p.status}</span>
        </div>
        <div class="sub-target">${p.role}</div>
        <p class="product-desc">${p.desc}</p>
      </div>
      <div class="sub-btn">
        <span>Подробнее о ${p.name}</span>
        <span>→</span>
      </div>
    `;
    container.appendChild(card);
  });
}


const SOCIAL_ICONS = {
  tg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.7 3.3 2.9 10.6c-1 .4-1 1.8.1 2.1l4.7 1.4 1.8 5.5c.3.9 1.4 1.1 2 .4l2.6-2.7 4.6 3.4c.8.6 1.9.1 2.1-.8l3-14.4c.2-1-.8-1.8-1.7-1.4zM9.6 14.2l8.1-5.6-6.4 6.5-.3 3.1-1.4-4z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.3A10 10 0 1 0 12 2zm5.3 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.5-.6-2.7-1.2-4.4-3.9-4.6-4.1-.1-.2-1-1.4-1-2.6s.6-1.8.9-2.1c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.4.5c-.1.2-.3.3-.1.6.1.3.7 1.2 1.5 1.9 1 .9 1.8 1.2 2.1 1.3.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.5.3.1.2.1.6-.1 1.1z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.3 15.3 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.8-.1zm0 3.3A6.5 6.5 0 1 0 18.5 12 6.5 6.5 0 0 0 12 5.5zm0 10.7A4.2 4.2 0 1 1 16.2 12 4.2 4.2 0 0 1 12 16.2zm6.8-10.9a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5z"/></svg>',
  th: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.2 21c-2.9 0-5.1-1-6.6-2.9C4.3 16.4 3.6 14.2 3.6 11.6v-.1c0-2.7.7-4.9 2.1-6.5C7.2 3.1 9.4 2.2 12.2 2.2c2 0 3.7.4 5 1.3 1.2.8 2.1 2 2.6 3.5l-2.1.7c-.8-2.3-2.5-3.4-5.4-3.4-2.1 0-3.6.6-4.7 1.9-1 1.2-1.5 2.9-1.5 5.1v.1c0 2.1.5 3.8 1.6 5.1 1.1 1.3 2.6 1.9 4.6 1.9 1.8 0 3.1-.4 4-1.2.8-.7 1.2-1.6 1.2-2.6 0-.9-.3-1.6-1-2.2-.3.9-.8 1.6-1.6 2.1-.8.5-1.7.8-2.8.8-1.2 0-2.2-.3-3-1-.8-.7-1.2-1.6-1.2-2.7 0-1.1.4-2 1.3-2.7.9-.7 2-1 3.4-1 .9 0 1.8.1 2.6.4v-.4c0-1.5-.8-2.3-2.4-2.3-1.1 0-1.9.4-2.5 1.3l-1.7-1.2c1-1.5 2.4-2.2 4.3-2.2 1.5 0 2.6.4 3.4 1.2.8.8 1.2 1.9 1.2 3.4v.9c1.5 1 2.3 2.4 2.3 4.1 0 1.7-.7 3.1-2 4.2-1.4 1.1-3.2 1.6-5.6 1.6zm.5-9.1c-.8 0-1.4.2-1.9.5-.4.3-.6.7-.6 1.2 0 .5.2.9.6 1.2.4.3.9.4 1.5.4.8 0 1.4-.2 1.9-.7.5-.5.8-1.1.9-1.9-.8-.5-1.6-.7-2.4-.7z"/></svg>'
};

function socialGlyph(social) {
  if (SOCIAL_ICONS[social.icon]) return SOCIAL_ICONS[social.icon];
  const letters = { vk: 'VK', dzen: 'Д', tc: 'TC', st: 'C' };
  return `<span class="social-mono">${letters[social.icon] || '·'}</span>`;
}

function renderEcoExtra(data) {
  const container = document.getElementById('eco-extra');
  if (!container || !data.ecosystemExtra) return;
  container.innerHTML = `
    <span class="eco-extra-label">Ещё в экосистеме</span>
    <div class="eco-extra-list">
      ${data.ecosystemExtra.map(item => {
        const inner = `<span class="eco-extra-title">${item.title}</span><span class="eco-extra-note">${item.note}</span>`;
        return item.url
          ? `<a class="eco-extra-item" href="${item.url}" target="_blank" rel="noopener noreferrer">${inner}</a>`
          : `<span class="eco-extra-item eco-extra-item--soon">${inner}</span>`;
      }).join('')}
    </div>
  `;
}

function renderSocials(data) {
  const container = document.getElementById('socials-row');
  if (!container || !data.socials) return;
  container.innerHTML = data.socials.map(s => `
    <a class="social-chip" href="${s.url}" ${s.url.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} aria-label="${s.title}">
      <span class="social-ico">${socialGlyph(s)}</span>
      <span class="social-text"><span class="social-name">${s.title}</span><span class="social-handle">${s.handle}</span></span>
    </a>
  `).join('');
}

function createCard(className, url) {
  const card = document.createElement(url ? 'a' : 'div');
  card.className = className;
  if (url) {
    card.href = url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
  } else {
    card.classList.add('branch-card--soon');
  }
  return card;
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

function initMobileNav() {
  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector('.menu-toggle');
  const primaryNav = document.getElementById('primary-nav');
  if (!nav || !toggle || !primaryNav) return;

  const closeMenu = () => {
    nav.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Открыть меню');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });
  primaryNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1500) closeMenu();
  });
}
