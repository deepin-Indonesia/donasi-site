<div align="center">

# deepin Indonesia — Donasi Site

**The deepin Indonesia community donation page**

[donasi.deepin.id](https://donasi.deepin.id) · 🇬🇧 **English** · [🇮🇩 Bahasa Indonesia](README.md)

</div>

---

A static donation page for **[donasi.deepin.id](https://donasi.deepin.id)** — showing total donations, the top 3 donors, the latest 10 donations, and a secure payment button via **Midtrans Payment Link**.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Donation Flow](#donation-flow)
- [Managing Donor Data](#managing-donor-data)
- [Data Security](#data-security)
- [Deployment](#deployment)
- [SEO, Performance & AdSense](#seo-performance--adsense)
- [Analytics](#analytics)
- [Contributing](#contributing)
- [License](#license)

## About

`donasi-site` is the official donation page of the deepin Indonesia community. Donations support server operations, community events, educational content, and the sustainability of the deepin open-source ecosystem in Indonesia.

Payments are processed through **Midtrans** (PT Midtrans, part of GoTo Financial) — supporting bank transfer, GoPay, QRIS, and virtual accounts. This site **does not** store card numbers, CVV, or payment credentials; Midtrans handles all of that.

### The deepin Indonesia ecosystem

| Subdomain | Repo | Purpose |
|---|---|---|
| [deepin.id](https://deepin.id) | `home-site` | Home page |
| [os.deepin.id](https://os.deepin.id) | `download-site` | deepin image downloads |
| [news.deepin.id](https://news.deepin.id) | `news-site` | News & articles |
| [about.deepin.id](https://about.deepin.id) | `about-site` | Community & product planning |
| [donasi.deepin.id](https://donasi.deepin.id) | `donasi-site` ← this repo | Community donations |

## Features

- **Total donations** and donation count.
- **Top 3 donors** by accumulated amount.
- **Latest 10 donations** with dates.
- **Anonymous donors** (empty name) counted separately.
- **Midtrans donation button** with conversion tracking (`donate_click`).
- **Privacy**: emails are censored, phone numbers are never published.
- **SEO**, Google Analytics, and Google AdSense.

## Tech Stack

| Technology | Detail |
|---|---|
| **Framework** | [Astro 7](https://astro.build) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) |
| **Language** | TypeScript (`strict`), alias `@/*` → `src/*` |
| **Icons** | [Font Awesome 6](https://fontawesome.com) (CDN) |
| **Payments** | [Midtrans Payment Link](https://midtrans.com) |
| **Data tooling** | Python 3 (`tools/generate_donors.py`) |
| **Sitemap** | `@astrojs/sitemap` |
| **Analytics** | Google Analytics 4 — `G-2J4TLB9W7H` |
| **Ads** | Google AdSense — `ca-pub-1345939033565649` |
| **Deploy** | [Cloudflare Pages](https://pages.cloudflare.com) |
| **Runtime** | Node.js 20+ |

## Project Structure

```
donasi-site/
├── src/
│   ├── components/
│   │   ├── Layout.astro      # <head>, SEO, AdSense, GA, privacy
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Analytics.astro
│   │   └── WhyDeepin.astro
│   ├── data/
│   │   ├── site.ts           # Site config
│   │   └── donors.ts         # Donor data (auto-generated) + formatRupiah
│   ├── pages/
│   │   ├── index.astro       # Donation page
│   │   └── 404.astro         # 404 (noindex)
│   └── styles/
│       └── global.css        # Tailwind + deepin palette
├── public/
│   ├── _redirects            # /privacy/ → https://deepin.id/privacy/ (301)
│   ├── ads.txt
│   ├── robots.txt
│   ├── llms.txt
│   └── site.webmanifest
├── tools/
│   ├── generate_donors.py            # Private CSV → donors.ts (censor + HMAC)
│   ├── csv_to_ts.py                  # Public CSV → donors.ts
│   ├── donors_private.example.csv    # Example private data format
│   ├── donors_private.csv            # 🔒 gitignored — real data
│   └── .secret_key                   # 🔒 gitignored — HMAC key
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 20+
- Python 3 (only for managing donor data)

### Install & develop

```bash
git clone https://github.com/deepin-Indonesia/donasi-site.git
cd donasi-site
npm install
npm run dev        # → http://localhost:4321 (or the next free port)
```

### Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the build |

## Donation Flow

1. A visitor clicks **"Donasi via Midtrans"** → redirected to the Midtrans payment link.
2. Midtrans processes the payment (bank transfer, GoPay, QRIS, virtual account).
3. On success, the donation data (name, email, phone, amount, date) is recorded by the community maintainer.
4. The maintainer updates `tools/donors_private.csv`, runs the generator, and commits `src/data/donors.ts`.
5. The page shows totals, the top 3, and recent donations from the anonymized data.

## Managing Donor Data

### 1. Fill in the private data

`tools/donors_private.csv` (⚠️ **gitignored** — never commit this):

```csv
name,email,phone,amount,date
Budi Santoso,budi@email.com,081234567890,100000,2026-07-30
Siti Rahayu,siti@email.com,,150000,2026-07-30
,,,50000,2026-07-30
```

- An empty name → anonymous donation.
- Phone number is optional and is **never** published.

### 2. Generate the public data

```bash
python tools/generate_donors.py
```

Output `src/data/donors.ts`:
- Email censored to the first 4 characters + `********`.
- `donor_id` = HMAC-SHA512(email, secret key), 12 chars — irreversible.
- Phone number removed.

### 3. Commit & deploy

```bash
git add src/data/donors.ts
git commit -m "update: donor data"
git push origin preview
```

After review, merge `preview` → `main`.

## Data Security

| # | Layer |
|---|---|
| 1 | `donors_private.csv` — gitignored; real data never enters the repo |
| 2 | `generate_donors.py` — censors email (4 chars + `********`) and drops the phone number |
| 3 | `HMAC-SHA512` — `donor_id` from email + secret key; irreversible |
| 4 | `.secret_key` — gitignored; without it, `donor_id` cannot be reproduced |

> 🔒 **Never commit** `donors_private.csv`, `.secret_key`, or any personal data.

## Deployment

Push to `main` → **Cloudflare Pages** builds and deploys automatically.

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Production branch | `main` |

## SEO, Performance & AdSense

- **Per-page meta**: description, canonical, `robots`, `hreflang`.
- **Full Open Graph & Twitter Card**.
- **JSON-LD** `Organization`; 404 `noindex, follow`.
- **Automatic sitemap** + `robots.txt` + `llms.txt`.
- **AdSense** via the script + `google-adsense-account` + `public/ads.txt`.
- **Privacy Policy** is centralized at **https://deepin.id/privacy/** (covers donation data & Midtrans); `/privacy/` on this subdomain 301-redirects there.

## Analytics

One GA4 property (`G-2J4TLB9W7H`) for all subdomains; every event carries a `site` parameter. Key events on this page: **`donate_click`** (Midtrans button click), `cta_click`, `contact_click`, `footer_click`.

Custom events are added via `data-track`:

```html
<a href="https://app.midtrans.com/..." data-track="donate_click">Donate via Midtrans</a>
```

## Contributing

1. Fork the repo, then branch from `preview`: `git checkout preview && git checkout -b feat/description`.
2. Commit with a clear message, push to your fork, and open a **Pull Request** against `deepin-Indonesia/donasi-site` (target: **`preview`**).
3. After review, merge `preview` → `main`.

> ⚠️ Do not push directly to `main` — that branch goes live automatically.

## Troubleshooting & Contact

### Branch `main` vs `preview`

- **`main`** — production. Only pushes to `main` trigger **Cloudflare Pages**, which deploys automatically to the main domain.
- **`preview`** — staging for review. Pushing to `preview` does **not** trigger a deploy; changes are reviewed **locally** (`npm run dev`) before merging into `main`.

### Common issues

| Issue | Fix |
|---|---|
| Port `4321` already in use | Astro moves to the next port automatically, or run `npm run dev -- --port 4322`. |
| Build fails after updating dependencies | Delete `node_modules` and `package-lock.json`, then run `npm install` again. |
| 404 in dev | Make sure the route file exists in `src/pages/` and the filename is exact (case-sensitive on Linux). |
| Changes not showing | Hard-refresh (`Ctrl+Shift+R`) or restart the dev server. |
| Node.js too old | Use Node.js 20+; check with `node -v`. |
| `generate_donors.py` fails | Make sure Python 3 is installed and `tools/donors_private.csv` is filled in. |

### Reporting issues

- **Bugs / feature requests** → open an [Issue](https://github.com/deepin-Indonesia/donasi-site/issues).
- **Quick chat** → [deepin Indonesia Telegram group](https://t.me/Linux_deepin_ID).
- **Contact** → [deepin@siberin.id](mailto:deepin@siberin.id).

## License

Released under the [MIT License](LICENSE) © deepin Indonesia.

---

<div align="center">

Made with ❤️ by the [deepin Indonesia](https://deepin.id) community · [Telegram](https://t.me/Linux_deepin_ID) · [GitHub](https://github.com/deepin-Indonesia)

</div>
