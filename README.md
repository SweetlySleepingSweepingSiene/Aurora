# Aurora UI Prototype v1.2.1

Interactive GitHub Pages prototype for Aurora.

## Structure
- `index.html` — UI markup
- `styles.css` — visual styling
- `app.js` — UI behavior and navigation
- `data-*.js` — prototype scene/content definitions

The prototype has been split into maintainable files so routine UI and behavior updates can be pushed without replacing a multi-megabyte monolithic HTML file.

## v1.2.1
The NOW/MENU control flips only when the NOW/MENU control itself is pressed. Ordinary menu navigation updates its state without replaying the flip animation.
