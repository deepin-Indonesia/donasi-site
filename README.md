# Donasi deepin Indonesia

[![Netlify Status](https://api.netlify.com/api/v1/badges/REPLACE_ME/deploy-status)](https://app.netlify.com/sites/donasi-deepin-id/deploys)

> Repository **PUBLIC** — email donatur otomatis disensor oleh script sebelum commit.

Situs halaman donasi komunitas deepin Indonesia, beralamat di **[donasi.deepin.id](https://donasi.deepin.id)**.

---

## Tentang

Situs ini menampilkan:
- Form donasi via **Midtrans Payment Link**
- Daftar **Top 3 Donatur** (berdasarkan total donasi per email)
- Daftar **10 Donasi Terbaru**
- Banner **Donatur Anonim**

---

## Struktur

```
donasi-site/
├── _config.yml          # Konfigurasi Jekyll
├── netlify.toml         # Konfigurasi Netlify (build + redirect + headers)
├── Gemfile              # Dependensi Ruby
├── index.md             # Halaman utama (Markdown + Liquid)
├── _data/
│   ├── donors.csv       # Data donatur TERPUBLIKASI (email disensor)
│   └── navigation.yml   # Navigasi header/footer
├── tools/
│   ├── generate_donors.py           # Script sensor email → output _data/donors.csv
│   └── donors_private.example.csv  # Contoh format data privat
├── _theme/              # Submodule: deepin-theme-site
├── assets/              # CSS, JS, images
└── README.md
```

---

## Cara Update Data Donatur

### 1. Siapkan data privat

Buat `tools/donors_private.csv` (⚠️ **file ini di-gitignore, jangan di-commit!**):

```csv
name,email,phone,amount,date
Budi Santoso,budi@example.com,081234567890,100000,2026-07-30
Siti Rahayu,siti@example.com,081234567891,150000,2026-07-30
,,,50000,2026-07-30
```

- **name**: Nama donatur (kosongkan untuk anonim)
- **email**: Email **asli** (akan otomatis disensor)
- **phone**: No HP (TIDAK akan dipublikasikan)
- **amount**: Nominal donasi (Rupiah)
- **date**: Tanggal (`YYYY-MM-DD`)

### 2. Jalankan script sensor

```bash
python tools/generate_donors.py
```

Output: `_data/donors.csv` dengan email disensor → `budi********`

### 3. Commit & push

```bash
git add _data/donors.csv
git commit -m "update: data donatur"
git push
```

Netlify auto-build & deploy.

---

## 🔒 Keamanan Data

| Lapisan | Mekanisme |
|---|---|
| **Script sensor** | `generate_donors.py` menyensor email (4 karakter + `********`), hapus No HP |
| **`.gitignore`** | `tools/donors_private.csv` tidak pernah di-commit |
| **Jekyll** | Folder `_data/` tidak pernah di-copy ke output `_site/` |
| **Netlify redirect** | Semua path `*.csv`, `/data/*`, `/_data/*`, `/donors*` → **404** |
| **Security headers** | `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` |

> ⚠️ **Double-check** `_data/donors.csv` sebelum commit — pastikan tidak ada email asli!

---

## Deploy

| Environment | Branch | Trigger |
|---|---|---|
| **Production** | `main` | Push → Netlify build & deploy |
| **Preview** | `preview` / PR | Push → Netlify deploy preview |

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

Buka `http://localhost:4000` di browser.

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

Proyek internal komunitas deepin Indonesia — tidak untuk distribusi publik.
