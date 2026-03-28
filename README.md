# 202282400-LamarAlshehri-assignment2

**Lamar Alshehri | 202282400**  
Assignment 2 – Interactive Features  
SWE Web Development Course, KFUPM  

---

## Project Description

A personal portfolio website built with plain HTML, CSS, and JavaScript. This version (Assignment 2) extends the static Assignment 1 foundation with:

- Live project filtering by category and keyword search
- GitHub API integration showing my latest public repositories
- Persistent dark/light theme via localStorage
- Smooth scroll-triggered fade-in animations
- Full form validation with per-field inline error messages

---

## Features

| Feature | Requirement |
|---|---|
| Project filter + search | Dynamic Content |
| GitHub API with loading/error/retry | Data Handling (Public API) |
| Theme saved to localStorage | Data Handling (localStorage) |
| Fade-in on scroll, hover effects | Animations & Transitions |
| Inline form errors, success message | Error Handling & User Feedback |

---

## Setup Instructions

No build step required. This is a plain HTML/CSS/JS project.

**To run locally:**

1. Clone the repository:
```bash
   git clone https://github.com/LamarAlshehri/202282400-LamarAlshehri-assignment2.git
```
2. Open `index.html` in any modern browser, or use a local server:
```bash
   # Option A – VS Code Live Server extension (recommended)
   # Right-click index.html → "Open with Live Server"

   # Option B – Python
   python3 -m http.server 8000
   # then visit http://localhost:8000
```

> **Note:** The GitHub API section requires internet access to load repositories.

---

## Folder Structure
```
assignment-2/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

---

## AI Usage Summary

Claude (Anthropic) was used to assist with planning, code generation, and debugging across several features. All AI output was reviewed, modified, and integrated with understanding. Full details are in [`docs/ai-usage-report.md`](docs/ai-usage-report.md).


---

## Academic Integrity

All code was written or reviewed with full understanding. AI tools were used as a learning aid, not as a replacement for understanding. No code was copied from classmates.