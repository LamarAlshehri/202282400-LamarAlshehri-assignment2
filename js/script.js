// ─────────────────────────────────────────
// 1. THEME TOGGLE  (persisted via localStorage)
// ─────────────────────────────────────────
const themeToggle = document.getElementById("themeToggle");

function applyTheme(isDark) {
    document.body.classList.toggle("dark", isDark);
    themeToggle.textContent = isDark ? "☀️" : "🌙";
}

// Load saved preference
const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "dark");

themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ─────────────────────────────────────────
// 2. FADE-IN ON SCROLL (Intersection Observer)
// ─────────────────────────────────────────
const fadeEls = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

fadeEls.forEach((el) => observer.observe(el));

// ─────────────────────────────────────────
// 3. PROJECT FILTER & LIVE SEARCH
// ─────────────────────────────────────────
const searchInput   = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards  = document.querySelectorAll("#projectGrid .card");
const emptyState    = document.getElementById("emptyState");

let activeFilter = "all";

function filterProjects() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    projectCards.forEach((card) => {
        const category = card.dataset.category;
        const tags     = card.dataset.tags || "";
        const title    = card.querySelector("h3").textContent.toLowerCase();
        const desc     = card.querySelector("p").textContent.toLowerCase();

        const matchesCategory = activeFilter === "all" || category === activeFilter;
        const matchesQuery    =
            !query ||
            title.includes(query) ||
            desc.includes(query) ||
            tags.includes(query);

        const visible = matchesCategory && matchesQuery;
        card.classList.toggle("hidden", !visible);
        if (visible) visibleCount++;
    });

    emptyState.classList.toggle("hidden", visibleCount > 0);
}

filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = btn.dataset.filter;
        filterProjects();
    });
});

searchInput.addEventListener("input", filterProjects);

// Contact Form Interaction
const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    message.textContent = "✅ Message sent successfully (demo only).";
});