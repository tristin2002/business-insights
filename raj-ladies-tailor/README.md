# Raj Ladies Tailor - Boutique Website

Elegant, modern, and fast static site for Raj Ladies Tailor (Ahmedabad).

## Quick Start

Serve the `raj-ladies-tailor` folder with any static server. Example:

```bash
cd raj-ladies-tailor
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Configure Your Details

Edit `assets/js/config.js`:

- `phoneE164` and `phoneDisplay`: Your phone number
- `whatsappNumber`: WhatsApp E.164 (e.g. +919876543210)
- `instagramUsername`: Your Instagram handle
- `formsEndpoint`: Optional Formspree (or similar) endpoint to receive contact form submissions
- `siteUrl`: Your domain (used for SEO/canonical)
- `addressText`, `hoursText`: Footer and contact page text

Pages include SEO meta, Open Graph, and JSON‑LD. Update titles/descriptions per your preference.

Update canonical URLs and JSON-LD `url` fields across pages if you change the domain.

## Instagram Feed

The homepage shows a placeholder grid. To use a live feed without backend, embed a third‑party widget (e.g., SnapWidget or LightWidget). Paste their embed snippet into `index.html` replacing the `#insta-feed` markup or inject in `assets/js/main.js`.

## Contact Form

Option 1 (recommended): Use Formspree. Create a form, copy its endpoint, set `formsEndpoint` in `config.js`.

Option 2: Use `mailto:` in the contact form as a fallback (already present if no endpoint).

## SEO

- Meta titles/descriptions per page
- Open Graph & Twitter cards
- JSON-LD `LocalBusiness`
- `sitemap.xml` and `robots.txt`

If deploying under a subpath or different domain, update canonical links and `sitemap.xml` URLs.

## Assets

Replace placeholder images with your own in `assets/img/` and update `src` paths in HTML if serving locally. Current demo uses high-quality Unsplash sources.

## Deployment

This is a static site. You can deploy to Netlify, Vercel, GitHub Pages, or any static host. Ensure HTTPS is enabled for better SEO and trust.

