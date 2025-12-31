const btn = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const body = document.body;

function toggleSidebar() {
  const isOpen = sidebar.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  body.classList.toggle('sidebar-open', isOpen);

  // accessibility
  btn.setAttribute('aria-expanded', String(isOpen));
  sidebar.setAttribute('aria-hidden', String(!isOpen));
}

// زر الهامبرغر
btn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleSidebar();
});

// إغلاق عند النقر خارج الشريط (اختياري)
document.addEventListener('click', (e) => {
  if (!sidebar.classList.contains('open')) return;
  const target = e.target;
  if (!sidebar.contains(target) && !btn.contains(target)) {
    toggleSidebar();
  }
});

// إغلاق بمفتاح Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidebar.classList.contains('open')) {
    toggleSidebar();
  }
});
