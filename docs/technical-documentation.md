# Technical Documentation – Assignment 2

**Student:** Lamar Alshehri
**Student ID:** 202282400
**Course:** SWE363
**Assignment:** Assignment 2 – Interactive Features

---

## Project Overview

This is the Assignment 2 iteration of my personal portfolio website, built entirely with plain HTML, CSS, and JavaScript — no frameworks or external libraries. It extends the static Assignment 1 foundation with five interactive feature areas: dynamic project filtering, live search, GitHub API integration, localStorage theme persistence, and full contact form validation with per-field inline feedback.

---

## Folder Structure
```
202282400-LamarAlshehri-assignment2/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       ├── project1.png
│       ├── project2.png
│       ├── project3.png
│       ├── project4.png
│       └── project5.png
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── README.md
└── .gitignore
```

---

## Tech Stack

- **HTML5** — semantic structure, ARIA labels, `novalidate` form, `data-*` attributes
- **CSS3** — custom properties, grid, flexbox, keyframe animations, media queries
- **JavaScript (ES6+)** — `IntersectionObserver`, Fetch API, `async/await`, `localStorage`, DOM manipulation
- **GitHub REST API** — public endpoint, no authentication required
- **No external libraries or frameworks**

---

## Features

### 1. Dynamic Content – Project Filter + Live Search

**Files:** `index.html` (filter bar, card attributes), `js/script.js` (Section 3), `css/styles.css` (filter styles)

Each project card carries two `data-*` attributes:
- `data-category` — one of `web`, `desktop`, or `data`
- `data-tags` — a space-separated string of relevant keywords

#### Project Categories

| Project | Category | Tags |
|---|---|---|
| Kommute | web | react, node, mysql, full-stack |
| Term Schedule Visualizer | desktop | java, javafx, excel, schedule |
| Horse Racing Management System | desktop | java, javafx, mysql, management |
| Well Log Ingestion & Query API | data | python, fastapi, pandas, docker, postgresql, etl |
| Reservoir Data Integration Service | data | python, fastapi, streamlit, docker, github actions |

Four filter buttons (All / Web / Desktop / Data) set an `activeFilter` variable. The search input listens on the `input` event for real-time matching. Both conditions are composed with AND inside a single `filterProjects()` function — a card is visible only if it matches both the active category and the search query. The query is matched against the card's title text, description text, and tag string. If no cards are visible, an empty state message appears.

---

### 2. Data Handling – GitHub API

**Files:** `index.html` (`#github` section), `js/script.js` (Section 4), `css/styles.css` (repo/spinner/error styles)

Fetches the authenticated user's public repositories from the GitHub REST API:
```
GET https://api.github.com/users/LamarAlshehri/repos?sort=pushed&per_page=6
```

The response is sorted by last push date and capped at 6 repositories. Each repository is rendered as a linked card showing the name, description, primary language (with a colour-coded dot), star count, and fork count.

#### State Management

| State | UI shown |
|---|---|
| Loading | Spinner + "Loading repositories…" text |
| Success | Repo grid with 6 cards |
| Empty | "No public repositories found" message |
| Error | Red-bordered error banner with Retry button |

The Retry button re-calls `fetchRepos()` directly, resetting all state before the new request. The `response.ok` check ensures HTTP error responses (e.g. 403 rate limit, 404 not found) are caught and handled the same as network failures.

---

### 3. Data Handling – localStorage Theme Persistence

**Files:** `js/script.js` (Section 1), `css/styles.css` (`:root` and `body.dark` variables)

The user's theme preference is saved to `localStorage` under the key `"theme"` on every toggle. On page load, the saved value is read and applied via `applyTheme()` before the first render, preventing a flash of the incorrect theme. The toggle button emoji updates to `☀️` in dark mode and `🌙` in light mode as a visual affordance.

---

### 4. Animations and Transitions

**Files:** `css/styles.css` (animation section), `js/script.js` (Section 2)

#### Scroll Fade-In
All `.fade-in` elements start at `opacity: 0` and `translateY(18px)`. An `IntersectionObserver` watches each element with a threshold of `0.12` (12% of the element must be in the viewport). When the threshold is crossed, the `visible` class is added, triggering the CSS transition. `observer.unobserve()` is called immediately after so the callback fires only once per element.

#### Additional Transitions
| Element | Effect |
|---|---|
| Project cards | `translateY(-6px)` + `box-shadow` on hover |
| Repo cards | `translateY(-4px)` + `border-color` on hover |
| Skill tags | `translateY(-2px)` + accent background on hover |
| Filter buttons | `translateY(-2px)` + accent border on hover |
| Submit button | `translateY(-2px)` on hover |
| Theme toggle | Background fade on hover |
| Body | `background` and `color` transition on theme change |
| Spinner | CSS `@keyframes spin` rotation at `0.8s linear infinite` |
| Success message | `fadeIn` keyframe on appear |

---

### 5. Error Handling and User Feedback

| Scenario | Feedback |
|---|---|
| GitHub API loading | Spinner + "Loading repositories…" |
| GitHub API fails | Red-bordered error banner + Retry button |
| GitHub returns 0 repos | "No public repositories found" message |
| No projects match filter/search | "No projects match your search. Try a different keyword." |
| Form field left empty on blur | Inline red error below the field |
| Invalid email format on blur | "Please enter a valid email address." |
| Message under 10 characters on blur | "Message must be at least 10 characters." |
| Form submitted with errors | All invalid fields highlighted, errors shown |
| Form submitted successfully | Green success banner, auto-dismisses after 5 seconds |

All error messages use `var(--error)` so they adapt correctly in both light and dark mode.

---

## CSS Architecture

The stylesheet uses CSS custom properties defined on `:root` for light mode, overridden on `body.dark` for dark mode. This means every component automatically responds to a theme change with no additional JavaScript — only the class toggle on `body` is needed.
```css
:root {
    --bg, --surface, --surface-2       /* backgrounds */
    --text, --text-muted               /* typography */
    --accent, --accent-hover           /* interactive elements */
    --border, --shadow                 /* structure */
    --card-bg, --nav-bg                /* component-specific */
    --badge-web, --badge-desktop,
    --badge-data (+ -text variants)    /* category badges */
    --error, --success                 /* feedback colours */
    --transition                       /* shared timing */
}
```

Font: `Trebuchet MS, sans-serif` — system-native, no external font request.

---

## JavaScript Structure

`script.js` is divided into five clearly labelled sections:

| Section | Responsibility |
|---|---|
| 1. Theme Toggle | `localStorage` read/write, `applyTheme()`, button emoji |
| 2. Fade-in | `IntersectionObserver` setup, `visible` class management |
| 3. Project Filter | `filterProjects()`, button active state, search input listener |
| 4. GitHub API | `fetchRepos()`, `renderRepos()`, `langDot()`, state management |
| 5. Contact Form | `showError()`, `clearError()`, blur listeners, submit handler |

---

## Browser Compatibility

| Browser | Tested |
|---|---|
| Chrome 120+ | Yes |
| Firefox 121+ | Yes |
| Safari 17+ | Yes |
| Mobile Chrome (Android) | Yes |
| Mobile Safari (iOS) | Yes |

All APIs used (`IntersectionObserver`, `fetch`, `async/await`, `localStorage`, CSS custom properties, CSS Grid) are fully supported in all modern browsers without polyfills.

---

## Responsive Design

| Breakpoint | Behaviour |
|---|---|
| Desktop (>768px) | Full navbar, 3-column project grid, 2-column repo grid |
| Tablet (≤768px) | Navbar wraps, filter bar stacks vertically |
| Mobile (≤480px) | Reduced section padding, smaller heading font size |

---

## Performance Notes

- `IntersectionObserver` is used instead of scroll event listeners — no per-frame main thread calculation.
- `observer.unobserve()` ensures each fade-in callback fires exactly once.
- GitHub API request is lightweight — 6 repos, JSON only, no images fetched from API.
- Font is system-native (`Trebuchet MS`) — zero external font requests.
- No JavaScript frameworks, bundlers, or build steps — the site loads as-is with no compilation.

---

## Known Limitations

- The contact form does not send real emails. A backend service or third-party tool like EmailJS would be needed for production.
- The GitHub API allows 60 unauthenticated requests per hour per IP address. If the error banner appears despite a correct username, rate limiting is the likely cause — waiting an hour resolves it.
- Project images reuse the three Assignment 1 screenshots across five cards. Unique screenshots per project would improve presentation in a production version.