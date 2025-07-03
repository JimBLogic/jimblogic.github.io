// assets/js/script.js

// Animate background with particles
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const particles = [];
for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    radius: Math.random() * 3 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);

  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;
  }

  requestAnimationFrame(animate);
}
animate();

// Language switcher logic
function setLang(lang) {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
    if (el.tagName === "UL") {
      const items = el.querySelectorAll("li");
      items.forEach((li, index) => {
        li.textContent = el.getAttribute(`data-${lang}`).split(", ")[index] || "";
      });
    }
  });

  document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.lang-btn[data-lang="${lang}"]`).classList.add("active");
}

setLang("en"); // default
