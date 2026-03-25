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

// ─────────────────────────────────────────
// 4. GITHUB API  – fetch public repos
// ─────────────────────────────────────────
const GITHUB_USERNAME = "lamaralshehrii";   // update to your actual GitHub handle
const repoLoading     = document.getElementById("repoLoading");
const repoError       = document.getElementById("repoError");
const repoGrid        = document.getElementById("repoGrid");
const retryBtn        = document.getElementById("retryBtn");

const LANG_COLORS = {
    JavaScript : "#f1e05a",
    TypeScript : "#3178c6",
    Python     : "#3572A5",
    Java       : "#b07219",
    HTML       : "#e34c26",
    CSS        : "#563d7c",
    Shell      : "#89e051",
    default    : "#8f8f8f",
};

function langDot(lang) {
    const color = LANG_COLORS[lang] || LANG_COLORS.default;
    return `<span class="lang-dot" style="background:${color}"></span>`;
}

function renderRepos(repos) {
    if (repos.length === 0) {
        repoGrid.innerHTML =
            `<p style="color:var(--text-muted)">No public repositories found.</p>`;
        repoGrid.classList.remove("hidden");
        return;
    }

    repoGrid.innerHTML = repos
        .slice(0, 6)
        .map(
            (r) => `
        <a class="repo-card fade-in visible"
           href="${r.html_url}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Repository: ${r.name}">
            <h3>${r.name}</h3>
            <p>${r.description || "No description provided."}</p>
            <div class="repo-meta">
                ${r.language
                    ? `<span class="repo-lang">${langDot(r.language)} ${r.language}</span>`
                    : ""}
                <span>⭐ ${r.stargazers_count}</span>
                <span>🍴 ${r.forks_count}</span>
            </div>
        </a>`
        )
        .join("");

    repoGrid.classList.remove("hidden");
}

async function fetchRepos() {
    repoLoading.classList.remove("hidden");
    repoError.classList.add("hidden");
    repoGrid.classList.add("hidden");

    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=6`,
            { headers: { Accept: "application/vnd.github+json" } }
        );

        if (!response.ok) {
            throw new Error(`GitHub API returned ${response.status}`);
        }

        const repos = await response.json();
        renderRepos(repos);
    } catch (err) {
        console.error("GitHub fetch error:", err);
        repoError.classList.remove("hidden");
    } finally {
        repoLoading.classList.add("hidden");
    }
}

retryBtn.addEventListener("click", fetchRepos);
fetchRepos();

// Contact Form Interaction
const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    message.textContent = "✅ Message sent successfully (demo only).";
});