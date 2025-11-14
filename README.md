# AI Agriculture Support

> Lightweight static front-end demonstrating an AI-assisted farm support landing page and small interactive features.

This repository contains a simple static website (HTML, CSS, and vanilla JavaScript) built as a UI prototype for an AI-driven agriculture assistant. It demonstrates typical product landing features, a minimal client-side authentication simulation, navbar user controls, hover animations, and a confirmation modal.

---

## Quick overview

- Project: `AI-agriculture-support`
- Type: Static website (no server required)
- Tech: HTML, CSS, JavaScript
- Purpose: Prototype UI for farmer-facing AI product — shows features, how-it-works steps, and small interactive elements (login simulation, dropdown, modal, animations).

---

## Files & structure

```
AI-agriculture-support/
├─ img/                # PNG images used by the UI (icons, logo)
├─ index.html          # Main landing page
├─ features.html       # Features page
├─ get-started.html    # Get started page
├─ login.html          # Login page (client-side simulated auth)
├─ styles.css          # Main stylesheet
├─ script.js           # Client-side behavior (menu, auth, dropdowns, modal, animations)
├─ README.md           # This file
└─ LICENSE
```

Notes:
- All PNG assets live in the `img/` folder. Icons used in the features grid reference `img/pin.png`, `img/crop.png`, `img/bot.png`, `img/voice.png`, `img/tube.png`, and `img/chart.png`.
- The favicon used by pages points at `img/logo.png`.

---

## Main features implemented

- Responsive navbar with a hamburger `menu-toggle` for small screens.
- Client-side (simulated) authentication:
	- `login.html` contains a small form. A sample farmer is hard-coded in `script.js` (ID `123456`, password `abcd`).
	- On successful login the farmer ID is stored in `localStorage` under the key `ai-agri-farmer-id`.
	- When logged in, the navbar `Login` link is replaced by a user chip/button showing `Farmer ID: {id}`.
- User dropdown from navbar:
	- Clicking the farmer button toggles a small dropdown with a `Profile` link and `Logout` button.
	- `Profile` currently links to `get-started.html` as a placeholder.
- Logout confirmation modal:
	- Clicking `Logout` opens a confirmation modal. Confirm clears the `localStorage` key and redirects to `login.html`.
	- Modal closes on Cancel, Escape, or clicking outside.
- Animations and micro-interactions:
	- Buttons have a radial hover effect based on mouse position (CSS variables `--x`/`--y`).
	- Workflow / tiles (`.list-card`) have lift/scale, decorative gradient, and staggered list-item entrance.
	- “How It Works” steps highlight using a glow (text-shadow) on hover/focus without changing text color.

---

## Key implementation details

- script.js
	- `AUTH_STORAGE_KEY` stores the key name (`ai-agri-farmer-id`).
	- On `DOMContentLoaded`, script checks for a stored farmer ID. If present it injects the user menu into the navbar and wires up dropdown + modal behavior.
	- The login form logic validates against a `SAMPLE_FARMER` object and writes to `localStorage`.
	- IntersectionObserver is used to animate `.feature-card`, `.list-card`, and `.card` elements into view.

- styles.css
	- Uses CSS variables for the colour palette and a modern, rounded aesthetic.
	- Navbar link underline animation uses a `::after` pseudo-element; this is disabled for `.btn` links in the nav so the Login/Profile button does not show the underline or overlap neighbor links.
	- `.feature-card .icon img` sizing ensures PNG icons fit the circular icon container.

---

## How to run / preview

No build step required — this is plain static HTML/CSS/JS. Two quick ways to preview:

1) Open directly in the browser

	 - Double-click `index.html` or open it with your browser (works for most browsers).

2) Serve with a local static server (recommended for correct relative paths and CORS-free loading)

	 - Using Python 3 (from project folder):

		 ```powershell
		 python -m http.server 8000
		 # then open http://localhost:8000 in your browser
		 ```

	 - Or using Node.js `http-server` if installed:

		 ```powershell
		 npx http-server -c-1 .
		 ```

---

## Quick test checklist

- Login flow:
	- Open `login.html` and use Farmer ID `123456` / password `abcd`.
	- Confirm you are redirected to `index.html` and the navbar shows `Farmer ID: 123456`.
- Dropdown & Logout:
	- Click the farmer chip to open the dropdown; click `Logout` and confirm in the modal.
	- Verify localStorage no longer contains `ai-agri-farmer-id` and you land on `login.html`.
- Visuals & icons:
	- Verify the images in `img/` load (logo and feature icons). If a PNG is missing, the browser shows a broken image placeholder.
- Hover animations:
	- Hover the workflow tiles (`Today's Recommendations`, `Weather Snapshot`, `Voice AI Tip`) to see the lift and child animations.
	- Hover the How It Works steps to see the glow without color change.

---

## Accessibility notes

- The dropdown uses `aria-expanded` on the toggle button and the modal uses `role="dialog"` and `aria-modal="true"`.
- Keyboard support:
	- The dropdown can be opened with Enter/Space when focused on the toggle (native button behavior).
	- Escape closes the modal.
	- Consider adding a focus trap in the modal for stricter accessibility.

---

## Troubleshooting

- If images do not appear:
	- Confirm the files exist in `img/` and that the filenames match exactly (case-sensitive on some systems).
	- Hard-refresh the page (Ctrl+F5) to clear cached assets.
- If navbar underline overlaps neighboring items:
	- The project already disables the underline for `.btn` elements in the nav. If customization changed selectors, check `.nav-links li .btn::after` is present.

---

## Next steps / suggestions

- Move icons to SVG for sharper scaling and smaller sizes.
- Add a real authentication backend or integrate OAuth for production.
- Replace the sample `Profile` link with a dedicated `profile.html` that fetches and shows stored profile details.
- Add unit / integration tests around visual behaviors using Playwright or Cypress for end-to-end checks.

---

If you'd like, I can also:
- generate a simple `profile.html` placeholder and wire it to the `Profile` link;
- add a small focus trap for accessibility to the logout modal;
- convert the PNG icons to an inline SVG sprite.

---

Author: repository owner
Date: November 2025
# AgriPredict AI — Farmer Advancement App

A lightweight front-end prototype that helps farmers with crop diagnosis, an Agri chatbot, and a cultivation planner. This repository contains a single-page HTML app built with Tailwind CSS utilities and Lucide icons. The UI uses minimal JavaScript for interactivity.

## What I changed
- Extracted inline CSS into `styles.css`.
- Extracted inline JavaScript into `app.js`.
- Updated `index.htm` to reference `styles.css` and `app.js`.

Files in this project
- `index.htm` — Main HTML page. Includes Tailwind and Lucide via CDN and the app HTML structure.
- `styles.css` — Styles (moved from the original `<style>` block in `index.htm`).
- `app.js` — Application JavaScript (moved from the original `<script>` block in `index.htm`).
- `LICENSE` — Project license (unchanged).

## Features
- Crop Scan & Diagnosis (UI mock + simulated diagnosis display).
- Agri-AI Chatbot (simulated responses based on keywords).
- Cultivation Planner (select crop/region to generate a sample timeline).
- Responsive layout using Tailwind utility classes.

## How to preview locally
You can open `index.htm` directly in a browser (double-click). For a more reliable preview (so relative paths and fetches behave like a server), run a simple static server.

Using Python (if installed):

```powershell
# from project root
python -m http.server 8000
# then open in your browser:
Start-Process "http://localhost:8000/index.htm"
```

Or use VS Code Live Server extension: open the folder, right-click `index.htm`, and choose "Open with Live Server".

## Developer notes
- `index.htm` keeps script includes for Tailwind and Lucide from CDNs. Internet access is required to load those.
- `app.js` expects the Lucide script to be present so it can call `lucide.createIcons()`; the Lucide CDN is loaded in the `<head>` of `index.htm`.
- The app uses data attributes like `data-lucide` and `data-tab` to wire up icons and tab behavior.

Accessibility & polish suggestions (recommended)
- The chat send button currently only shows an icon. Add an accessible label so screen readers can announce the button:

```html
<button id="send-btn" aria-label="Send message"> ... </button>
```

- The file input (`#crop-image-input`) should have an associated label for accessibility. Either add a visible label or a visually-hidden label with `class="sr-only"`.

If you want, I can apply these accessibility fixes now.

## Troubleshooting
- If icons don't appear, ensure your browser can access `https://unpkg.com/lucide@latest`.
- If styles look off, confirm `styles.css` is present in the project root and `index.htm` references it.

## Next steps you might want
- Add real AI integration for crop diagnosis (upload + server or client ML model).
- Replace simulated chatbot responses with a backend or local model.
- Improve accessibility for forms, buttons, and focus management.

---
Created/updated by an automated edit to separate CSS & JS into `styles.css` and `app.js`. If you'd like the README tweaked (more usage examples, screenshots, or deployment steps), tell me what to add.