// script.js

const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

sidebarBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const pageId = link.dataset.navLink;

    pages.forEach(page => {
      if (page.dataset.page === pageId) {
        page.classList.add('active');
        link.classList.add('active');
      } else {
        page.classList.remove('active');
        link.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Load certificates dynamically
fetch("./assets/js/certificates.json")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("certificateList");
    data.forEach((cert, index) => {
      const li = document.createElement("li");
      li.className = "certificate-item";
      li.style.setProperty('--i', index);
      li.innerHTML = `
        <a href="${cert.url}" target="_blank">
          <figure class="certificate-img">
            <img src="${cert.image}" alt="${cert.title}">
          </figure>
          <h3>${cert.title}</h3>
          <p>${cert.category}</p>
        </a>`;
      list.appendChild(li);
    });
  })
  .catch(error => console.error("Error loading certificates:", error));

// Scroll to top button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
