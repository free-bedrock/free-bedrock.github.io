function buildListing(filter) {
  const list = filter === "all" ? ADDONS : ADDONS.filter(a => a.category === filter);
  const grid = document.getElementById("listing-grid");
  
  grid.innerHTML = list.map((a, i) => `
    <a href="${a.url}" class="list-card" style="animation:fadeUp .25s ${i*45}ms both">
      <div class="list-thumb"></div>
      <div class="list-info">
        <span class="list-tag ${a.category}">${CATEGORIES[a.category]}</span>
        <div class="list-name">${a.title}</div>
        <div class="list-sub">${a.shortDesc}</div>
        <div class="list-row">
          <span class="list-ver">v${a.version}</span>
          <span class="list-free">Free</span>
        </div>
      </div>
    </a>`).join("");
}

// Set active tab based on URL parameter
function setActiveTabFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const filter = params.get('filter') || 'all';
  
  document.querySelectorAll('.cat-tab').forEach(tab => {
    const tabFilter = tab.dataset.filter;
    if (tabFilter === filter) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
  
  buildListing(filter);
}

// Initialize on page load
if (document.getElementById("listing-grid")) {
  setActiveTabFromUrl();
}

// Handle category clicks
document.querySelectorAll('.cat-tab').forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    const filter = tab.dataset.filter;
    window.location.href = `index.html?filter=${filter}`;
  });
});
