# AI Usage Report – Assignment 2

**Student:** Lamar Alshehri
**Student ID:** 202282400
**Course:** SWE 363
**Assignment:** Assignment 2 – Interactive Features

---

## Overview

Claude (Anthropic) was the primary AI tool used throughout this assignment. It was used across planning, code generation, debugging, and documentation. Every piece of AI-generated output was reviewed, understood, modified, and integrated deliberately — AI was used as a learning aid, not a shortcut.

---

## Tool Used

### Claude (Anthropic) — claude.ai

---

## How Claude Was Used

### 1. Architecture & Commit Planning
Before writing any code, I asked Claude to help me plan which interactive features to implement and how to structure them across meaningful Git commits. Claude suggested breaking the work into 11 commits, each scoped to a single feature or concern. I reviewed the plan, reordered two commits to better reflect how I actually wanted to build (skills/footer after form validation rather than before), and used the structure as a roadmap throughout development.

**What I learned:** How to think about Git history as documentation of intent, not just a save log.

---

### 2. CSS Variable Theming System
I asked Claude to suggest a CSS custom property architecture that would support light/dark mode without duplicating selectors. Claude generated an initial `:root` block with variable names like `--primary` and `--bg-secondary`. I renamed every variable to match my own naming conventions (`--accent`, `--surface`, `--text-muted`, etc.), added the dark mode overrides manually based on my Assignment 1 colour palette, and integrated the variables into every component myself.

**What I changed:** All variable names, all dark mode colour values, and the decision to use `--nav-bg` separately from `--surface` so the navbar stays dark in both modes.

**What I learned:** How CSS custom properties cascade and why they are the cleanest approach to theming compared to duplicating class selectors.

---

### 3. localStorage Theme Persistence
I asked Claude how to persist the user's theme preference across page reloads. Claude explained the `localStorage.getItem` / `localStorage.setItem` pattern and suggested reading the preference on load before the first render to prevent a flash of the wrong theme. I implemented this as a named `applyTheme()` function rather than Claude's suggested inline approach, which made it reusable from both the load step and the click handler.

**What I changed:** Refactored into a named function, added the emoji toggle (`☀️` / `🌙`) as a visual affordance Claude did not include.

**What I learned:** Why theme preference must be applied before first paint, and how `localStorage` persists data across sessions without a backend.

---

### 4. Scroll-Triggered Fade-In Animations
I asked Claude to explain `IntersectionObserver` and generate an implementation for fade-in on scroll. Claude provided a working example and explained the `threshold` option, the `entries` callback pattern, and why `observer.unobserve()` should be called after the animation triggers so the callback does not fire repeatedly. I adjusted the threshold from Claude's suggested `0.1` to `0.12` after testing on my actual content, and wrote the CSS transition myself.

**What I changed:** Threshold value, CSS transition timing (`0.55s ease`), and the decision to use `translateY` alongside opacity for a more polished effect.

**What I learned:** Why `IntersectionObserver` is preferred over scroll event listeners for performance — it runs off the main thread and does not fire on every pixel of scroll.

---

### 5. Project Filter and Live Search
I asked Claude to help design a filtering system that works on both category buttons and a live search input simultaneously. Claude suggested using `data-category` and `data-tags` HTML attributes on each card, and composing both filters with an AND condition inside a single `filterProjects()` function. I designed the attribute values for all five of my projects myself, added the empty state message when no results match, and wrote the filter button active state logic.

**What I changed:** All `data-category` and `data-tags` values, the empty state UX, and the decision to match the search query against title, description, and tags rather than just title.

**What I learned:** How `dataset` properties work in JavaScript and how to compose multiple filter conditions cleanly without nested conditionals.

---

### 6. GitHub API Integration
I asked Claude to help me fetch and display my public GitHub repositories. Claude generated an initial `fetch()` call and a basic render function. During review I noticed the original code did not check `response.ok` before parsing JSON — Claude explained that the Fetch API only rejects on network failure, not on HTTP error status codes like 403 or 404, so the check is essential. I restructured the code into three named functions (`fetchRepos`, `renderRepos`, `langDot`), added the retry button pattern, and built the language colour map myself.

**What I changed:** Split into named functions, added `response.ok` check, added the retry button wired to `fetchRepos()`, built the `LANG_COLORS` map, and added the `GITHUB_USERNAME` constant at the top as a clear configuration point rather than hardcoding inline.

**What I learned:** The difference between a network error and an HTTP error in the Fetch API, and why `response.ok` must always be checked explicitly.

---

### 7. Contact Form Validation
I asked Claude to suggest a better approach than the single `submit` handler from Assignment 1. Claude recommended the blur event pattern for inline per-field validation, which gives users feedback as they move between fields rather than only on submit. I implemented `showError()` and `clearError()` helper functions to keep the submit handler readable, wrote the email regex myself, added the minimum message length check (10 characters), and added the auto-dismissing success banner with `setTimeout`.

**What I changed:** Added the minimum length check, the auto-dismiss after 5 seconds, and the `scrollIntoView` call so the success message is always visible on submit.

**What I learned:** The blur event approach to form UX and why it is more user-friendly than submit-only validation.

---

### 8. Font Selection
I asked Claude whether Trebuchet MS would be appropriate for a technical portfolio. Claude confirmed it is a system-native sans-serif with good readability and no external font request needed. I applied it via a single `font-family` declaration on `body`, replacing the previous Segoe UI stack.

**What I changed:** Made the decision independently after reviewing the font on the actual site.

---

### 9. Documentation
I asked Claude to help outline both the `README.md` and `technical-documentation.md`. Claude generated initial structures which I then rewrote entirely in my own words, expanding every section with details specific to my implementation decisions, my project data, and my actual development process.

**What I changed:** All content was rewritten. Claude provided structure only.

---

## AI Use Summary Table

| Area | AI Tool | My Contribution |
|---|---|---|
| Architecture & commit planning | Claude | Reordered commits, made final decisions |
| CSS variable theming | Claude | All variable names, dark mode values, integration |
| localStorage persistence | Claude | Refactored into named function, added emoji toggle |
| Scroll fade-in animations | Claude | Threshold tuning, CSS transition, unobserve logic |
| Project filter + live search | Claude | All data attributes, empty state, AND composition |
| GitHub API integration | Claude | Named functions, response.ok fix, retry, lang map |
| Contact form validation | Claude | Length check, auto-dismiss, scrollIntoView |
| Font selection | Claude | Final decision and application |
| Documentation | Claude | All content rewritten in my own words |

---

## Reflection

Using Claude throughout this assignment accelerated development significantly, but the learning came from the moments where I had to understand the output before I could use it. The most valuable example was the `response.ok` issue with the GitHub fetch — Claude's explanation of why the Fetch API does not throw on HTTP errors changed how I will write every future API call. I made deliberate edits in every section of the code rather than copying outputs directly, and I can explain every line of the final implementation.