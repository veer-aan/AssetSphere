# AssetSphere — marketing site (v1)

Plain HTML/CSS/JS, no build step. Open any `.html` file directly in a browser, or serve the folder with any static server.

## Pages
- `index.html` — landing page (hero, services, stats, proof, CTA)
- `pricing.html` — plans, billing toggle, feature comparison, FAQ
- `login.html` — combined login / register (tab-switching, no backend wired up yet)

## Structure
- `css/style.css` — design tokens (`:root` vars), nav, buttons, hero, animated background, shared sections, footer
- `css/pricing.css` — pricing-page-only styles
- `css/auth.css` — login/register-page-only styles
- `js/main.js` — nav scroll state, scroll-linked background "scenes," reveal-on-scroll
- `js/pricing.js` — monthly/annual toggle
- `js/auth.js` — tab switching, reads `?mode=` and `?plan=` from the URL, blocks real form submission (placeholder only)

## Notes for customizing
- All colors/fonts are CSS variables at the top of `css/style.css` — change them once, they cascade everywhere.
- The animated background is `.bg-field` + three `.blob` divs; each section can opt into a "scene" via `data-scene="hero|features|proof|cta"`, which retunes hue/saturation/position as it scrolls into view.
- The foreground squares/circles are `.shape.circle` / `.shape.square` — used in the hero and on the login page.
- Forms in `login.html` don't submit anywhere yet — `js/auth.js` just prevents the default action so it's safe to wire up to a real backend later.
