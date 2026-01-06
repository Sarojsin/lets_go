# Project: lets_do – Professional Website Redesign

## Overview
This repository contains a fully redesigned, senior‑level website built with vanilla HTML, CSS, and JavaScript. The design system follows a **Glassmorphism** aesthetic, uses HSL‑based color variables, fluid typography, and premium animations powered by GSAP and Three.js.

---

## How to Update Individual Details

### 1. Text Content (HTML)
- Open the relevant HTML file (`index.html`, `about.html`, `contact.html`, `team.html`).
- Locate the section you want to edit (e.g., hero title, about paragraph, team member description).
- Edit the text directly between the tags. Example:
  ```html
  <h1 class="hero-title">New Hero Title</h1>
  ```
- Save the file and refresh the browser to see the change.

### 2. Images & Media
- Replace image files in the `img/` folder (or wherever the project stores assets).
- Update the `src` attribute in the HTML to point to the new file name.
  ```html
  <img src="img/new‑photo.jpg" alt="New Photo" />
  ```
- Commit the new image file if you push changes.

### 3. Styles (CSS)
- All visual styling lives in `css/style.css`.
- **Color palette** – modify the HSL variables at the top of the file:
  ```css
  :root {
    --primary-hue: 250;   /* change hue for primary color */
    --primary-sat: 80%;   /* saturation */
    --primary-lig: 55%;   /* lightness */
    --color-primary: hsl(var(--primary-hue), var(--primary-sat), var(--primary-lig));
  }
  ```
- **Typography** – fluid sizes are defined with `clamp()`. Adjust the min/max values if needed.
- **Component tweaks** – look for sections like `.hero`, `.service-card`, `.modal`, etc., and edit the properties (padding, border‑radius, backdrop‑filter) as required.

### 4. JavaScript Behavior (JS)
- Main scripts are in the `js/` folder:
  - `animations.js` – GSAP animations and scroll triggers.
  - `particles.js` – Three.js particle background.
  - `modal.js` – Team‑member modal logic.
- To change a specific animation, locate the relevant selector in `animations.js` and modify the GSAP parameters (duration, ease, delay).
- For particle colors, edit the HSL variables used in `particles.js`.

### 5. Adding New Team Members (Modal)
1. **HTML** – Add a new `.team-member` block in `team.html` with a unique `data-member` attribute.
2. **JS** – Extend the `teamMembers` object in `js/modal.js` with the new member’s details (name, role, bio, skills, etc.).
3. The modal will automatically pick up the new entry.

### 6. Deploy / Test Locally
```bash
# Serve the site (any static server works, e.g., Python)
python -m http.server 8000
# Open http://localhost:8000 in your browser
```

---

## Version Control
- After making changes, run:
  ```bash
  git add .
  git commit -m "Describe your change"
  git push
  ```
- Ensure you have push rights to the remote repository.

---

## Contact
For questions or contributions, open an issue or submit a pull request.



#saroj
## hello push on the time i have assigned you on.

