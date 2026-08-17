/**
 * GANIMAR Flagship Portal — Script
 * Features: Clickable whole cards, Image previews, Blog rendering, Scroll effects
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
  renderSubdomains(data);
  renderStats(data);
  renderCases(data);
  renderProducts(data);
  renderBlog(data);

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
    card.setAttribute('onclick', `window.open('${b.url}', '_blank')`);
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
    const card = document.createElement('div');
    card.className = 'subdomain-card';
    card.setAttribute('onclick', `window.open('${s.url}', '_blank')`);
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
    const card = document.createElement('div');
    card.className = 'case-card';
    card.setAttribute('onclick', `window.open('${c.url}', '_blank')`);
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
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('onclick', `window.open('${p.url}', '_blank')`);
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

function renderBlog(data) {
  const container = document.getElementById('blog-grid');
  if (!container || !data.blogPosts) return;
  container.innerHTML = '';

  data.blogPosts.forEach((post) => {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.setAttribute('onclick', `window.open('${post.url}', '_blank')`);
    card.innerHTML = `
      <div>
        <img src="${post.preview}" alt="${post.title}" class="card-img-top" />
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span class="blog-category">${post.category}</span>
          <span style="font-size: 12px; color: #777;">${post.readTime}</span>
        </div>
        <h3 class="blog-title">${post.title}</h3>
        <p class="blog-desc">${post.desc}</p>
      </div>
      <div class="sub-btn">
        <span>Читать статью</span>
        <span>↗</span>
      </div>
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
