# deepin Indonesia — Donasi Site

Halaman donasi komunitas deepin Indonesia: **[donasi.deepin.id](https://donasi.deepin.id)**

Menampilkan total donasi, top 3 donatur, 10 donasi terbaru, dan tombol donasi via Midtrans Payment Link.

---

## Tech Stack

| | |
|---|---|
| **Framework** | [Astro 7](https://astro.build) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) |
| **Icons** | [Font Awesome 6](https://fontawesome.com) (CDN) |
| **Sitemap** | `@astrojs/sitemap` |
| **Donasi** | [Midtrans Payment Link](https://midtrans.com) |
| **Deploy** | [Cloudflare Pages](https://pages.cloudflare.com) |
| **Analytics** | Google Analytics 4 (`G-2J4TLB9W7H`) |
| **Runtime** | Node.js 24 |

## Project Structure

```
donasi-site/
├── src/
│   ├── components/
│   │   ├── Layout.astro      # Base layout (HTML head, GA4, SEO meta)
│   │   ├── Header.astro      # Sticky header + nav + mobile menu
│   │   ├── Footer.astro      # Footer dengan social links
│   │   └── WhyDeepin.astro   # Section keunggulan deepin
│   ├── data/
│   │   ├── site.ts           # Site config, MAIN_NAV, ABOUT_NAV, social
│   │   └── donors.ts         # Data donatur (dari CSV) — format, total, top3, latest
│   ├── pages/
│   │   ├── index.astro       # Halaman donasi — hero, stats, Midtrans CTA, donor list
│   │   └── 404.astro         # Custom 404
│   └── styles/
│       └── global.css        # Tailwind import + @theme colors
├── public/
│   └── robots.txt            # Crawler rules + Sitemap directive
├── tools/
│   ├── generate_donors.py            # Python script: sensor email, generate HMAC-SHA512 donor_id
│   ├── donors_private.example.csv    # Contoh format data privat
│   ├── donors_private.csv           # 🔒 Gitignored — data asli (nama, email, no HP, amount)
│   └── .secret_key                  # 🔒 Gitignored — key HMAC
├── astro.config.mjs          # site: https://donasi.deepin.id
├── package.json
└── tsconfig.json
```

## Getting Started

```bash
git clone https://github.com/deepin-Indonesia/donasi-site.git
cd donasi-site
npm install
npm run dev        # → http://localhost:4323
npm run build      # Production build → dist/
```

## Deployment

Push ke branch `main` → Cloudflare Pages auto-deploy.

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Branch | `main` |

## Contributing

Semua orang bisa berkontribusi — tidak perlu jadi anggota organisasi.

### Untuk kontributor luar (via Fork)

1. **Fork** repo ini (klik tombol Fork di GitHub)
2. Clone fork kamu: `git clone https://github.com/USERNAME/donasi-site.git`
3. `git checkout preview && git checkout -b feat/deskripsi`
4. Edit, commit, push ke fork kamu
5. Buka **Pull Request** ke `deepin-Indonesia/donasi-site` → target: `preview`

### Untuk anggota organisasi (push langsung)

1. `git checkout preview && git checkout -b feat/deskripsi`
2. Commit & push
3. Buat PR ke `preview`
4. Setelah review, merge `preview` → `main`

> ⚠️ Jangan push langsung ke `main` — harus lewat PR.

## Cara Update Data Donatur

### 1. Edit data privat

`tools/donors_private.csv` (⚠️ **gitignored**):

```csv
name,email,phone,amount,date
Budi Santoso,budi@email.com,081234567890,100000,2026-07-30
Siti Rahayu,siti@email.com,,150000,2026-07-30
,,,50000,2026-07-30
```

### 2. Generate data publik

```bash
python tools/generate_donors.py
```

Output: `src/data/donors.ts` — email disensor, donor_id HMAC-SHA512, no HP dihapus.

### 3. Commit & push

```bash
git add src/data/donors.ts
git commit -m "update: data donatur"
git push origin preview
```

## 🔒 Keamanan

| # | Lapisan |
|---|---|
| 1 | `donors_private.csv` — gitignored, data asli tidak pernah commit |
| 2 | `generate_donors.py` — sensor email (4 karakter + `********`), hapus No HP |
| 3 | `HMAC-SHA512` — donor_id dari email + secret key, impossible to reverse |
| 4 | `.secret_key` — gitignored, tanpa key tidak bisa verifikasi apapun |
| **Production** | `main` | GitHub Pages (`donasi.deepin.id`) |
| **Preview** | `preview` | Netlify (deploy preview) |

---

## Setup Lokal

```bash
git clone --recurse-submodules https://github.com/deepin-Indonesia/donasi-site.git
cd donasi-site
bundle install
bundle exec jekyll serve
```

Buka `http://localhost:4000`.

---

## Subdomain

| Situs | Domain |
|---|---|
| Home | [deepin.id](https://deepin.id) |
| Download | [os.deepin.id](https://os.deepin.id) |
| News | [news.deepin.id](https://news.deepin.id) |
| **Donasi** | **[donasi.deepin.id](https://donasi.deepin.id)** |

---

## Lisensi

Proyek komunitas deepin Indonesia.
