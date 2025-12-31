const btn = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const body = document.body;

function setBodyScrollLocked(lock) {
  if (lock) {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  } else {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }
}

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('show');
  btn.classList.add('open');
  btn.setAttribute('aria-expanded', 'true');
  sidebar.setAttribute('aria-hidden', 'false');
  overlay.setAttribute('aria-hidden', 'false');
  body.classList.add('sidebar-open');
  setBodyScrollLocked(true);
  // move focus for accessibility
  sidebar.focus && sidebar.focus();
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  sidebar.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('aria-hidden', 'true');
  body.classList.remove('sidebar-open');
  setBodyScrollLocked(false);
  btn.focus && btn.focus();
}

function toggleSidebar() {
  if (sidebar.classList.contains('open')) closeSidebar();
  else openSidebar();
}

// Events (click + touchstart for instant response on mobile)
btn.addEventListener('click', (e) => { e.stopPropagation(); toggleSidebar(); });
btn.addEventListener('touchstart', (e) => { e.stopPropagation(); toggleSidebar(); }, {passive:true});

// overlay click closes
overlay.addEventListener('click', closeSidebar);
overlay.addEventListener('touchstart', closeSidebar, {passive:true});

// close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebar();
});

// close when clicking outside (defensive)
document.addEventListener('click', (e) => {
  if (!sidebar.classList.contains('open')) return;
  const target = e.target;
  if (!sidebar.contains(target) && !btn.contains(target) && !overlay.contains(target)) {
    closeSidebar();
  }
});
