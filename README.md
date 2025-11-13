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