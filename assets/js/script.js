"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.dataset.navLink === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
});

// Fetch and display certificates
fetch("assets/js/certificates.json")
  .then(response => response.json())
  .then(data => {
    const certificateList = document.getElementById("certificateList");
    data.forEach(cert => {
      const li = document.createElement("li");
      li.className = "certificate-item";
      li.innerHTML = `
        <a href="${cert.url}" target="_blank" class="certificate-link">
          <figure class="certificate-img">
            <img src="${cert.image}" alt="${cert.alt}" loading="lazy">
          </figure>
          <h3 class="certificate-title">${cert.title}</h3>
          <p class="certificate-category">${cert.category}</p>
        </a>
      `;
      certificateList.appendChild(li);
    });
  })
  .catch(error => console.error("Error loading certificates:", error));

// Fetch and display software
fetch("assets/js/software.json")
  .then(response => response.json())
  .then(data => {
    const softwareList = document.getElementById("softwareList");
    data.forEach(software => {
      const li = document.createElement("li");
      li.className = "software-item";
      li.innerHTML = `
        <img src="${software.image}" alt="${software.name}" class="software-image">
      `;
      softwareList.appendChild(li);
    });
  })
  .catch(error => console.error("Error loading software:", error));

// Fetch and display tools
fetch("assets/js/tools.json")
  .then(response => response.json())
  .then(data => {
    const toolsList = document.getElementById("toolsList");
    data.forEach(tool => {
      const li = document.createElement("li");
      li.className = "tools-item";
      li.innerHTML = `
        <img src="${tool.image}" alt="${tool.name}" class="tool-image">
      `;
      toolsList.appendChild(li);
    });
  })
  .catch(error => console.error("Error loading tools:", error));

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
