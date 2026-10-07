/* =========================================================
   PROJECT DATA
   Replace videoUrl with your real YouTube/Vimeo links and
   thumbnail with an image URL (or leave blank for the
   generated placeholder). Add/remove entries freely.
========================================================= */
const projects = [
  {
    title: "Video Edits",
    category: "Narrative Short",
    videoUrl: "videos/0922 (1).mp4",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Documentary Videos",
    category: "Music Video",
    videoUrl: "videos/0919.mp4",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
  },
 
  {
    title: "Movie Edits",
    category: "Video Editing",
    videoUrl: "videos/0922.mp4",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
  }
];

/* =========================================================
   INTRO SHUTTER
========================================================= */
window.addEventListener("load", () => {
  const shutter = document.getElementById("shutter");
  requestAnimationFrame(() => {
    setTimeout(() => shutter.classList.add("open"), 200);
    setTimeout(() => (shutter.style.display = "none"), 1400);
  });
});

/* =========================================================
   NAV: background on scroll + mobile menu
========================================================= */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
});

const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");
navToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});
mobileMenu.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => mobileMenu.classList.remove("open"))
);

/* =========================================================
   BUILD FILMSTRIP
========================================================= */
const filmstrip = document.getElementById("filmstrip");

function playIconSVG() {
  return `<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M6 4.5v9l8-4.5-8-4.5z" fill="#ece8e1"/>
  </svg>`;
}

projects.forEach((project, i) => {
  const frame = document.createElement("div");
  frame.className = "frame reveal";
  frame.innerHTML = `
    <div class="frame-sprockets">${"<span></span>".repeat(8)}</div>
    <div class="frame-thumb frame-thumb--plain">
      <div class="play-btn">${playIconSVG()}</div>
    </div>
    <div class="frame-info">
      <p class="tag">${project.category}</p>
      <h3>${project.title}</h3>
    </div>
  `;
  frame.addEventListener("click", () => openModal(project.videoUrl));
  filmstrip.appendChild(frame);
});

/* =========================================================
   MODAL / VIDEO EMBED
========================================================= */
const modal = document.getElementById("modal");
const modalPlayer = document.getElementById("modalPlayer");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = document.getElementById("modalBackdrop");

function toEmbedUrl(url) {
  if (url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg")) {
    return url;
  }
  const yt = url.match(/(?:youtu\.be\/|v=)([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return "";
}

function openModal(url) {
  const embed = toEmbedUrl(url);
  const isVideo = embed && (embed.endsWith(".mp4") || embed.endsWith(".webm") || embed.endsWith(".ogg"));

  modalPlayer.innerHTML = embed
    ? isVideo
      ? `<video controls autoplay playsinline style="width:100%;height:100%;object-fit:cover;background:#000;"><source src="${embed}" type="video/mp4"></video>`
      : `<iframe src="${embed}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
    : `<p style="color:#918d85;padding:2rem;font-family:Inter,sans-serif;">Add a real YouTube or Vimeo link in script.js to play this project.</p>`;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modalPlayer.innerHTML = "";
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* =========================================================
   SCROLL REVEAL
========================================================= */
document.querySelectorAll(
  ".about, .services, .contact, .section-head, .about-copy, .service"
).forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* =========================================================
   FOOTER YEAR
========================================================= */
document.getElementById("year").textContent = new Date().getFullYear();