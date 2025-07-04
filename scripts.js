// Sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// Navigation logic
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const pageId = link.dataset.navLink;

    pages.forEach(page => {
      if (page.dataset.page === pageId) {
        page.classList.add("active");
        link.classList.add("active");
      } else {
        page.classList.remove("active");
        link.classList.remove("active");
      }
    });

    window.scrollTo(0, 0);
  });
});

// Load certificates dynamically
fetch("./assets/js/certificates.json")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("certificateList");
    data.forEach(cert => {
      const li = document.createElement("li");
      li.className = "certificate-item";
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
  });

// Load software icons
fetch("./assets/js/software.json")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("softwareList");
    data.forEach(item => {
      const li = document.createElement("li");
      li.className = "software-item";
      li.innerHTML = `<img src="${item.image}" alt="${item.name}">`;
      list.appendChild(li);
    });
  });

// Load tool icons
fetch("./assets/js/tools.json")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("toolsList");
    data.forEach(item => {
      const li = document.createElement("li");
      li.className = "tool-item";
      li.innerHTML = `<img src="${item.image}" alt="${item.name}">`;
      list.appendChild(li);
    });
  });

// Scroll to top
document.getElementById("scrollToTopBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
