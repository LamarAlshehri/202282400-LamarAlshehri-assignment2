# Technical Documentation

## 1. System Overview
This project is a front-end portfolio website developed using HTML, CSS, and JavaScript.  
The goal is to provide a clean, responsive structure that presents personal information, project work, and a way to contact the user.

The application runs entirely in the browser and does not require a backend.

---

## 2. Architecture
The project follows a simple separation-of-concerns model:

- **HTML** → structure and content  
- **CSS** → visual presentation and layout  
- **JavaScript** → interactivity and dynamic behavior  

Each technology is stored in its own folder to improve readability and maintainability.

---

## 3. File Organization
assignment-1/
├── index.html # main page
├── css/styles.css # styling and responsiveness
├── js/script.js # interactive features
├── assets/images/ # images and media
├── docs/ # reports and documentation


This organization allows future expansion while keeping responsibilities clear.

---

## 4. HTML Structure
The website is divided into semantic sections:

- **Header / Navigation** → links to page sections  
- **About** → short introduction  
- **Projects** → list of project cards  
- **Contact** → form for user input  

Anchor links are used to allow quick navigation between sections.

---

## 5. Styling & Layout
CSS is responsible for:

- Typography and spacing  
- Card design  
- Navigation appearance  
- Responsive behavior  

### Layout Techniques
- **Flexbox** is used in the navigation bar.
- **CSS Grid** is used to create a flexible project layout that adapts to screen size.

### Responsiveness
The grid uses `auto-fit` and `minmax()` so the number of columns adjusts automatically depending on the device width.

---

## 6. Dark Mode Implementation
Dark mode is implemented by toggling a `dark` class on the `<body>` element.

When active:
- Background colors change
- Text colors adapt
- Card and image backgrounds are updated

This approach keeps JavaScript simple and lets CSS handle visual changes.

---

## 7. JavaScript Functionality

### Theme Toggle
A button listens for click events and toggles the `dark` class on the body.

### Contact Form
The form prevents default submission and instead displays a confirmation message.  
This simulates interaction without requiring a server.

---

## 8. Maintainability Considerations
- Code is split into logical files.
- Reusable class names are used.
- Styling avoids unnecessary complexity.
- Comments are added where behavior might not be obvious.

This ensures the project can grow in future assignments.

---

## 9. Limitations
- No backend or data storage  
- Projects are placeholders  
- Form submission is simulated only  

---

## 10. Future Expansion
The structure supports future improvements such as:
- Backend integration  
- Project filtering  
- Animations  
- Real deployment  
