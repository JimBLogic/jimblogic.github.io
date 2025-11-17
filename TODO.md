# TODO – Site Improvements (ordered by priority)

## High
- [ ] Add a descriptive `<title>` and `<meta name="description">` (done)
- [ ] Generate and publish `sitemap.xml` (done)
- [ ] Optimize all images (convert to WebP, lazy-load, add `srcset`)
- [ ] Implement a responsive navigation menu (hamburger on mobile)
- [ ] Add a simple contact form (Netlify Forms / Formspree) with spam protection

## Medium
- [ ] Add a lightweight analytics script (Plausible or Umami) with GDPR consent banner
- [ ] Create a `robots.txt` that allows all crawling (done)
- [ ] Add Open Graph and Twitter Card meta tags for rich sharing
- [ ] Add a `CNAME` file (future-proof for a custom domain)
- [ ] Write a `CHANGELOG.md` entry documenting the site launch

## Low
- [ ] Add JSON-LD structured data for `Person` and `WebSite` (Person added)
- [ ] Add a “Skip to content” link for screen‑reader users (done)
- [ ] Add Subresource Integrity hashes to any external scripts/styles
- [ ] Set up a backup branch (`backup-site`) with the built `_site/` folder
- [ ] Write a short “Contributing” guide for anyone who wants to help improve the site


Commit this file after creation:

```
git add TODO.md
git commit -m "docs: add TODO list for site improvements"
git push
```
