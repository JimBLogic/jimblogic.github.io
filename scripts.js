// script.js

// Sidebar toggle
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

sidebarBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Navigation logic
const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const pageId = link.dataset.navLink;

    pages.forEach(page => {
      if (this.dataset.navLink === page.dataset.page) {
        page.classList.add('active');
        link.classList.add('active');
        window.scrollTo(0, 0);
      } else {
        page.classList.remove('active');
        link.classList.remove('active');
      }
    });
  });
});

// Scroll to top functionality
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});
