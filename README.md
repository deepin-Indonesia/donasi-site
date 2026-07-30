# Donasi deepin Indonesia

[![Netlify Status](https://api.netlify.com/api/v1/badges/REPLACE_ME/deploy-status)](https://app.netlify.com/sites/donasi-deepin-id/deploys)

> **Repository PRIVATE** — Hanya untuk pengelola komunitas deepin Indonesia.

Situs halaman donasi komunitas deepin Indonesia, beralamat di **[donasi.deepin.id](https://donasi.deepin.id)**.

---

## Tentang

Situs ini menampilkan:
- Form donasi via **Midtrans Payment Link**
- Daftar **Top 3 Donatur** (berdasarkan total donasi per email)
- Daftar **10 Donasi Terbaru**
- Banner **Donatur Anonim**

Data donatur disimpan di `_data/donors.csv` dan diupload **langsung** (tanpa script generation).

---

## Struktur

```
donasi-site/
├── _config.yml          # Konfigurasi Jekyll
├── netlify.toml         # Konfigurasi deploy Netlify
├── Gemfile              # Dependensi Ruby
├── index.md             # Halaman utama (Markdown + Liquid)
├── _data/
│   ├── donors.csv       # Data donatur (upload langsung)
│   └── navigation.yml   # Navigasi header/footer
├── _theme/              # Submodule: deepin-theme-site
├── assets/
│   ├── css/main.scss    # Style khusus donasi
│   ├── js/main.js       # JavaScript
│   └── images/          # Gambar & screenshot
└── README.md
```

---

## Cara Update Data Donatur

1. Edit langsung `_data/donors.csv`
2. Format CSV:

   ```csv
   name,email,amount,date
   Nama Donatur,email********,150000,2026-07-30
   ,,100000,2026-07-30
   ```

   - **name**: Nama donatur (kosongkan untuk anonim)
   - **email**: Email yang **sudah disensor** (4 karakter pertama + `********`)
   - **amount**: Nominal donasi (Rupiah)
   - **date**: Tanggal donasi (`YYYY-MM-DD`)
   - Baris `__TS__` otomatis ditambahkan sebagai timestamp

3. Commit & push → GitHub Actions build + deploy ke Netlify otomatis

---

## 🔒 Keamanan Data

Data donatur (`_data/donors.csv`) **tidak bisa diakses publik** melalui website. Perlindungan berlapis:

| Lapisan | Mekanisme |
|---|---|
| **Jekyll** | Folder `_data/` tidak pernah di-copy ke output `_site/` |
| **`_config.yml`** | `*.csv` dan `_data/` di-exclude eksplisit dari build |
| **Netlify redirect** | Semua path `*.csv`, `/data/*`, `/_data/*`, `/donors*` → **404** |
| **Security headers** | `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` |

> ⚠️ Email di dalam CSV **tetap harus disensor** sebelum commit — sebagai pertahanan terakhir.

---

## Deploy

> ⚠️ Netlify build service **tidak support** private organization repository tanpa Pro.
> Solusi: **build via GitHub Actions**, lalu deploy hasil build ke Netlify via CLI.

| Environment | Branch | Trigger |
|---|---|---|
| **Production** | `main` | Push → GitHub Actions → Netlify prod |
| **Preview** | `preview` / PR | Push → GitHub Actions → Netlify branch deploy |

Workflow: `.github/workflows/deploy.yml`

### Setup Secrets (sekali saja)

1. Buka **Netlify** → User Settings → Applications → [Personal access tokens](https://app.netlify.com/user/applications#personal-access-tokens) → buat token
2. Buka **Netlify** → Site Settings → Site details → copy **Site ID**
3. Buka **GitHub repo** → Settings → Secrets & Variables → Actions → tambah:

   | Secret | Value |
   |---|---|
   | `NETLIFY_AUTH_TOKEN` | Personal access token dari Netlify |
   | `NETLIFY_SITE_ID` | Site ID dari Netlify (contoh: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`) |

4. **Disable Netlify auto-build**: Netlify → Site Settings → Build & deploy → Build settings → **Stop builds** (supaya tidak build dua kali)

---

## Setup Lokal

```bash
# Clone (pastikan akses private repo)
git clone --recurse-submodules <repo-url> donasi-site
cd donasi-site

# Install dependensi
bundle install

# Jalankan server development
bundle exec jekyll serve
```

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
