# Roko Games Website

Single-page marketing site for **Roko Games Private Limited** (roko.co.in). Built with plain HTML/CSS/JS to stay fast, lightweight, and easy to maintain.

## What’s in this repo

- `index.html` — main site (single-page layout)
- `assets/css/style.css` — shared styling (dark glassmorphism theme)
- `assets/js/theme.js` — theme toggle (system/dark/light)
- `assets/images/` — brand + game art
- `RetroTennisScreenshots/` — full screenshot gallery page + images
- `privacypolicy/` — RetroTennis privacy policy

## Quick edits (content updates)

Most edits happen in **`index.html`**:
- Hero text + CTAs
- Game descriptions and statuses
- Metrics / social proof
- Founders and company details
- Links (Play Store, YouTube, Reddit, etc.)

## Image locations

- **Brand / studio images:** `assets/images/`
- **RetroTennis screenshots:** `RetroTennisScreenshots/images/`

If you add new images, keep filenames short and avoid spaces when possible (faster for CDNs and easier linking).

## Deployment (GitHub Pages)

This repo is published via GitHub Pages on the **`main`** branch.

**Steps:**
1. Commit changes
2. Push to `main`
3. GitHub Pages auto-deploys to **https://roko.co.in**

## Pre-launch checklist

- [ ] Open `index.html` locally and check layout on mobile + desktop
- [ ] Confirm all images load (no 404s)
- [ ] Verify all external links
- [ ] Check Open Graph preview (LinkedIn/Twitter)

## Mobile stability notes

To keep the site stable on mobile (no accidental desktop-like zoom/layout shifts), the CSS now enforces:

- global horizontal overflow protection (`html, body { overflow-x: hidden; }`)
- responsive container width (`width: min(980px, 100%)`)
- safe media sizing (`img, video, iframe { max-width: 100%; }`)
- mobile grid header layout (brand + toggle + nav)
- stacked CTA buttons in compact view (`.event-buttons` becomes 1-column)

If mobile layout ever looks “desktop-ish” again, first check for any new fixed-width elements or long unbroken text/button labels.

## Visual style guidance

The glass effect is intentionally subtle but more pronounced using:

- layered translucent gradients on cards
- slightly stronger border contrast
- soft inner highlight + blur/saturation

When editing, prefer small alpha tweaks over hard opacity jumps to keep the UI premium and light.

## Suggested deployment commands

Use these from repo root:

`git add .`

`git commit -m "Polish mobile stability and glass UI"`

`git push origin main`

## Contact

**Roko Games Private Limited**
- Email: gskskiran@gmail.com
- Phone: +91 9951055918
- Incubator: IMAGE CoE (STPI Hyderabad)
- UDYAM: UDYAM-AP-10-0124235
