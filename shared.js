/* ── Raseen Shared Utilities ── */

/* Auth helpers */
const Auth = {
  STORAGE_KEY: 'raseen-auth',

  login(user) {
    try { localStorage.setItem(Auth.STORAGE_KEY, JSON.stringify(user)); } catch(e){}
  },

  logout() {
    try { localStorage.removeItem(Auth.STORAGE_KEY); } catch(e){}
    window.location.href = 'login.html';
  },

  getUser() {
    try {
      const raw = localStorage.getItem(Auth.STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch(e) { return null; }
  },

  requireRole(...allowedRoles) {
    const u = Auth.getUser();
    if (!u) {
      window.location.href = 'login.html';
      return null;
    }
    if (allowedRoles.length && !allowedRoles.includes(u.role)) {
      // Wrong role — redirect to correct dashboard
      window.location.href = Auth.dashboardFor(u.role);
      return null;
    }
    return u;
  },

  dashboardFor(role) {
    switch (role) {
      case 'manager':  return 'manager.html';
      case 'employee': return 'employee.html';
      case 'user':
      default:         return 'user.html';
    }
  },

  roleLabel(role) {
    return { manager: 'مدير', employee: 'موظف', user: 'مستخدم' }[role] || 'مستخدم';
  }
};

/* Theme helpers */
const Theme = {
  apply(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('raseen-theme', t); } catch(e){}
  },
  toggle() {
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    Theme.apply(cur === 'dark' ? 'light' : 'dark');
  },
  init() {
    let saved = 'dark';
    try { saved = localStorage.getItem('raseen-theme') || 'dark'; } catch(e){}
    Theme.apply(saved);
  }
};
Theme.init();

/* Marble background — injects shared HTML */
function injectMarbleBackground() {
  if (document.querySelector('.marble-bg')) return;
  const div = document.createElement('div');
  div.className = 'marble-bg';
  div.setAttribute('aria-hidden', 'true');
  div.innerHTML = `
    <div class="marble-base"></div>
    <div class="marble-blob blob-1"></div>
    <div class="marble-blob blob-2"></div>
    <div class="marble-blob blob-3"></div>
  `;
  document.body.insertBefore(div, document.body.firstChild);
}

/* Toast helper */
function showToast(msg, type) {
  const t = document.createElement('div');
  const colors = {
    success: '#4ADE80',
    error:   '#EF4444',
    info:    '#6AAED8',
  };
  const color = colors[type] || colors.info;
  t.style.cssText = `position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);
    background:var(--bg-secondary);border:1px solid ${color}40;
    color:var(--text-primary);padding:.85rem 1.5rem;border-radius:12px;
    z-index:300;box-shadow:0 12px 40px rgba(0,0,0,.4);font-size:.9rem;
    animation:fadeUp .3s ease;border-right:3px solid ${color};`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; }, 2700);
  setTimeout(() => t.remove(), 3000);
}
