# BASKER Energy — Global Website

The official marketing & demo site for **BASKER Energy**, the intelligent energy infrastructure company.

🌐 **Live:** https://anshvachhani04.github.io/basker-energy-website/

## Architecture

Pure static HTML / CSS / JavaScript multi-page site, deployed via GitHub Pages.
No build step required — GitHub Pages serves the repo root directly.

```
.
├── index.html              # Home — cinematic hero, 12 solutions, comparison, CTA
├── platform.html           # Energy Cloud — architecture, AI, data, edge, security
├── solutions.html          # 12 production-ready solution modules
├── industries.html         # Sector packs (utilities, industry, cities, etc.)
├── investors.html          # ARR, market sizing, unit economics, ESG, governance
├── about.html              # Founder, team, mission, origin story
├── contact.html            # Contact form + offices + reach paths
├── calculator.html         # Interactive ROI calculator (live recompute)
├── dashboard.html          # Live operator console demo (streaming charts)
├── assistant.html          # Ask BASKER AI (scripted demo)
├── map.html                # Global deployments map (interactive)
├── 404.html                # Not-found page
└── assets/
    ├── css/main.css        # Full design system
    ├── js/main.js          # Nav, scroll-reveal, count-up, tabs, sub-nav
    └── img/                # Logos & favicon
```

## Stack

- HTML5, CSS (custom design tokens), vanilla ES2020 JavaScript
- Chart.js 4.x via CDN for data visualization
- Inter + JetBrains Mono via Google Fonts
- Zero npm dependencies, zero build step

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

Push to `main`. GitHub Actions workflow `.github/workflows/deploy.yml` deploys to GitHub Pages automatically.

## Brand & contact

- **Founder:** Ansh Vachhani
- **Email:** basker.global@gmail.com
- **Phone:** +91 76005 65870
- **GitHub:** [@anshvachhani04](https://github.com/anshvachhani04)
