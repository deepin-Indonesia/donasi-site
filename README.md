# Donasi deepin Indonesia

[![Netlify Status](https://api.netlify.com/api/v1/badges/REPLACE_ME/deploy-status)](https://app.netlify.com/sites/donasi-deepin-id/deploys)

> Repository **PUBLIC** — email disensor via HMAC-SHA512, donor_id ireversibel.

Situs halaman donasi komunitas deepin Indonesia: **[donasi.deepin.id](https://donasi.deepin.id)**

---

## Tentang

- Tombol donasi via **Midtrans Payment Link** (buka tab baru)
- Daftar **Top 3 Donatur** — grouping by donor_id (HMAC-SHA512)
- **10 Donasi Terbaru** + badge jumlah donasi per orang
- Banner **Donatur Anonim**

---

## Struktur

```
donasi-site/
├── _config.yml              # Konfigurasi Jekyll
├── netlify.toml              # Redirect 404 CSV + security headers
├── Gemfile
├── index.md                  # Halaman utama (Liquid)
├── _data/
│   ├── donors.csv            # Output script (email disensor, donor_id hash)
│   └── navigation.yml
├── _plugins/
│   └── rupiah_filter.rb      # Format Rp 1.500.000
├── tools/
│   ├── generate_donors.py            # Sensor + HMAC-SHA512
│   ├── donors_private.example.csv    # Contoh data privat
│   ├── donors_private.csv           # 🔒 Gitignored — data asli
│   └── .secret_key                  # 🔒 Gitignored — key HMAC
├── _theme/                   # Submodule: deepin-theme-site
└── assets/                   # CSS, JS, images
```

---

## Cara Update Data Donatur

### 1. Edit data privat

`tools/donors_private.csv` (⚠️ **gitignored**, tidak pernah commit):

```csv
name,email,phone,amount,date
Budi Santoso,budi@email.com,081234567890,100000,2026-07-30
Siti Rahayu,siti@email.com,,150000,2026-07-30
,,,50000,2026-07-30
```

### 2. Generate CSV publik

```bash
python tools/generate_donors.py
```

Output `_data/donors.csv`:
```csv
name,email,donor_id,amount,date
Budi Santoso,budi********,a1b2c3d4e5f6,100000,2026-07-30
Siti Rahayu,siti********,f6e5d4c3b2a1,150000,2026-07-30
,,,,50000,2026-07-30
```

- `email`: 4 karakter + `********`
- `donor_id`: HMAC-SHA512(email, secret_key) — **mustahil di-reverse**
- No HP: dihapus

### 3. Commit & push

```bash
git add _data/donors.csv
git commit -m "update: data donatur"
git push origin preview   # → Netlify deploy preview
```

Kalau sudah ok, merge ke `main` untuk production.

---

## 🔒 Keamanan (7 Lapis)

| # | Lapisan |
|---|---|
| 1 | `donors_private.csv` — **gitignored**, data asli tidak pernah commit |
| 2 | `generate_donors.py` — sensor email, hapus No HP |
| 3 | `HMAC-SHA512` — donor_id dari email + secret key, impossible to reverse |
| 4 | `.secret_key` — **gitignored**, tanpa key tidak bisa verifikasi apapun |
| 5 | Jekyll `_data/` — tidak di-copy ke `_site/` |
| 6 | Netlify redirect — `*.csv` `/data/*` `/_data/*` `/donors*` → **404** |
| 7 | Security headers — `nosniff`, `DENY` frame, `strict-origin` referrer |

---

## Deploy

| Environment | Branch | Platform |
|---|---|---|
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
