// assets/js/script.js
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('[data-sidebar]');
  const sidebarBtn = document.querySelector('[data-sidebar-btn]');

  // Sidebar toggle
  sidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  // Navigation
  const navLinks = document.querySelectorAll('[data-nav-link]');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const pageId = e.target.getAttribute('data-nav-link');
      const page = document.querySelector(`[data-page="${pageId}"]`);
      page.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
