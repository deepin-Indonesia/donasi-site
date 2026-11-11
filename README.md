<div align="center">

# deepin Indonesia — Donasi Site

**Halaman donasi komunitas deepin Indonesia**

[donasi.deepin.id](https://donasi.deepin.id) · 🇮🇩 **Bahasa Indonesia** · [🇬🇧 English](README.en.md)

</div>

---

Halaman donasi statis untuk **[donasi.deepin.id](https://donasi.deepin.id)** — menampilkan total donasi, top 3 donatur, 10 donasi terbaru, dan tombol pembayaran aman via **Midtrans Payment Link**.

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Fitur](#fitur)
- [Tech Stack](#tech-stack)
- [Struktur Proyek](#struktur-proyek)
- [Memulai](#memulai)
- [Alur Donasi](#alur-donasi)
- [Mengelola Data Donatur](#mengelola-data-donatur)
- [Keamanan Data](#keamanan-data)
- [Deployment](#deployment)
- [SEO, Performa & AdSense](#seo-performa--adsense)
- [Analitik](#analitik)
- [Berkontribusi](#berkontribusi)
- [Lisensi](#lisensi)

## Tentang Proyek

`donasi-site` adalah halaman donasi resmi komunitas deepin Indonesia. Donasi dipakai untuk operasional server, event komunitas, konten edukasi, dan keberlangsungan ekosistem open source deepin di Indonesia.

Pembayaran diproses melalui **Midtrans** (PT Midtrans, bagian dari GoTo Financial) — mendukung transfer bank, GoPay, QRIS, dan virtual account. Situs ini **tidak** menyimpan nomor kartu, CVV, atau kredensial pembayaran; semua ditangani Midtrans.

### Ekosistem deepin Indonesia

| Subdomain | Repo | Fungsi |
|---|---|---|
| [deepin.id](https://deepin.id) | `home-site` | Halaman utama |
| [os.deepin.id](https://os.deepin.id) | `download-site` | Download image deepin |
| [news.deepin.id](https://news.deepin.id) | `news-site` | Berita & artikel |
| [about.deepin.id](https://about.deepin.id) | `about-site` | Tentang & product planning |
| [donasi.deepin.id](https://donasi.deepin.id) | `donasi-site` ← repo ini | Donasi komunitas |

## Fitur

- **Total donasi** dan jumlah donasi terkumpul.
- **Top 3 donatur** berdasarkan akumulasi.
- **10 donasi terbaru** dengan tanggal.
- **Donatur anonim** (nama dikosongkan) dihitung terpisah.
- **Tombol donasi Midtrans** dengan pelacakan konversi (`donate_click`).
- **Privasi**: email disensor, nomor HP tidak pernah dipublikasikan.
- **SEO**, Google Analytics, dan Google AdSense.

## Tech Stack

| Teknologi | Detail |
|---|---|
| **Framework** | [Astro 7](https://astro.build) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) |
| **Bahasa** | TypeScript (`strict`), alias `@/*` → `src/*` |
| **Ikon** | [Font Awesome 6](https://fontawesome.com) (CDN) |
| **Pembayaran** | [Midtrans Payment Link](https://midtrans.com) |
| **Tooling data** | Python 3 (`tools/generate_donors.py`) |
| **Sitemap** | `@astrojs/sitemap` |
| **Analitik** | Google Analytics 4 — `G-2J4TLB9W7H` |
| **Iklan** | Google AdSense — `ca-pub-1345939033565649` |
| **Deploy** | [Cloudflare Pages](https://pages.cloudflare.com) |
| **Runtime** | Node.js 20+ |

## Struktur Proyek

```
donasi-site/
├── src/
│   ├── components/
│   │   ├── Layout.astro      # <head>, SEO, AdSense, GA, privasi
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Analytics.astro
│   │   └── WhyDeepin.astro
│   ├── data/
│   │   ├── site.ts           # Konfigurasi situs
│   │   └── donors.ts         # Data donatur (auto-generated) + formatRupiah
│   ├── pages/
│   │   ├── index.astro       # Halaman donasi
│   │   └── 404.astro         # 404 (noindex)
│   └── styles/
│       └── global.css        # Tailwind + palet deepin
├── public/
│   ├── _redirects            # /privacy/ → https://deepin.id/privacy/ (301)
│   ├── ads.txt
│   ├── robots.txt
│   ├── llms.txt
│   └── site.webmanifest
├── tools/
│   ├── generate_donors.py            # CSV privat → donors.ts (sensor + HMAC)
│   ├── csv_to_ts.py                  # CSV publik → donors.ts
│   ├── donors_private.example.csv    # Contoh format data privat
│   ├── donors_private.csv            # 🔒 gitignored — data asli
│   └── .secret_key                   # 🔒 gitignored — kunci HMAC
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Memulai

### Prasyarat

- [Node.js](https://nodejs.org) 20+
- Python 3 (hanya untuk mengelola data donatur)

### Instalasi & pengembangan

```bash
git clone https://github.com/deepin-Indonesia/donasi-site.git
cd donasi-site
npm install
npm run dev        # → http://localhost:4321 (atau port berikutnya)
```

### Perintah

| Perintah | Kegunaan |
|---|---|
| `npm run dev` | Server pengembangan |
| `npm run build` | Build produksi ke `dist/` |
| `npm run preview` | Preview hasil build |

## Alur Donasi

1. Pengunjung klik **"Donasi via Midtrans"** → diarahkan ke payment link Midtrans.
2. Midtrans memproses pembayaran (transfer bank, GoPay, QRIS, virtual account).
3. Setelah pembayaran berhasil, data donasi (nama, email, nomor HP, nominal, tanggal) dicatat oleh pengelola komunitas.
4. Pengelola memperbarui `tools/donors_private.csv`, menjalankan generator, lalu commit `src/data/donors.ts`.
5. Halaman menampilkan total, top 3, dan donasi terbaru dari data yang sudah dianonimkan.

## Mengelola Data Donatur

### 1. Isi data privat

`tools/donors_private.csv` (⚠️ **gitignored** — jangan pernah di-commit):

```csv
name,email,phone,amount,date
Budi Santoso,budi@email.com,081234567890,100000,2026-07-30
Siti Rahayu,siti@email.com,,150000,2026-07-30
,,,50000,2026-07-30
```

- Nama kosong → donasi anonim.
- Nomor HP opsional dan **tidak akan** dipublikasikan.

### 2. Generate data publik

```bash
python tools/generate_donors.py
```

Output `src/data/donors.ts`:
- Email disensor menjadi 4 karakter pertama + `********`.
- `donor_id` = HMAC-SHA512(email, secret key), 12 karakter — tidak bisa dibalik.
- Nomor HP dihapus.

### 3. Commit & deploy

```bash
git add src/data/donors.ts
git commit -m "update: data donatur"
git push origin preview
```

Setelah review, merge `preview` → `main`.

## Keamanan Data

| # | Lapisan |
|---|---|
| 1 | `donors_private.csv` — gitignored; data asli tidak pernah masuk repo |
| 2 | `generate_donors.py` — sensor email (4 karakter + `********`) dan hapus nomor HP |
| 3 | `HMAC-SHA512` — `donor_id` dari email + secret key; tidak bisa dibalik |
| 4 | `.secret_key` — gitignored; tanpa key, `donor_id` tidak bisa direproduksi |

> 🔒 **Jangan commit** `donors_private.csv`, `.secret_key`, atau data pribadi dalam bentuk apa pun.

## Deployment

Push ke `main` → **Cloudflare Pages** otomatis build & deploy.

| Setting | Nilai |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Production branch | `main` |

## SEO, Performa & AdSense

- **Meta per halaman**: description, canonical, `robots`, `hreflang`.
- **Open Graph & Twitter Card** lengkap.
- **JSON-LD** `Organization`; 404 `noindex, follow`.
- **Sitemap** otomatis + `robots.txt` + `llms.txt`.
- **AdSense** via script + `google-adsense-account` + `public/ads.txt`.
- **Kebijakan Privasi** terpusat di **https://deepin.id/privacy/** (mencakup data donasi & Midtrans); `/privacy/` di subdomain ini 301 ke sana.

## Analitik

Satu property GA4 (`G-2J4TLB9W7H`) untuk semua subdomain; setiap event membawa parameter `site`. Event utama di halaman ini: **`donate_click`** (klik tombol Midtrans), `cta_click`, `contact_click`, `footer_click`.

Event kustom ditambahkan lewat `data-track`:

```html
<a href="https://app.midtrans.com/..." data-track="donate_click">Donasi via Midtrans</a>
```

## Berkontribusi

1. Fork repo, lalu buat branch dari `preview`: `git checkout preview && git checkout -b feat/deskripsi`.
2. Commit dengan pesan jelas, push ke fork, dan buka **Pull Request** ke `deepin-Indonesia/donasi-site` (target: **`preview`**).
3. Setelah review, merge `preview` → `main`.

> ⚠️ Jangan push langsung ke `main` — branch itu otomatis tayang.

## Pemecahan Masalah & Kontak

### Branch `main` vs `preview`

- **`main`** — produksi. Setiap push otomatis tayang lewat Cloudflare Pages.
- **`preview`** — staging. Semua perubahan masuk ke sini dulu; setiap push ke `preview` juga menghasilkan URL *preview deployment* Cloudflare Pages untuk dicek sebelum merge ke `main`.

### Masalah umum

| Masalah | Solusi |
|---|---|
| Port `4321` sudah dipakai | Astro otomatis pindah ke port berikutnya, atau jalankan `npm run dev -- --port 4322`. |
| Build gagal setelah update dependensi | Hapus `node_modules` dan `package-lock.json`, lalu `npm install` ulang. |
| Halaman 404 saat dev | Pastikan file route ada di `src/pages/` dan nama file benar (huruf besar/kecil berpengaruh di Linux). |
| Perubahan tidak muncul | Hard refresh (`Ctrl+Shift+R`) atau restart dev server. |
| Node.js terlalu lama | Gunakan Node.js 20+; cek dengan `node -v`. |
| `generate_donors.py` gagal | Pastikan Python 3 terpasang dan `tools/donors_private.csv` sudah diisi. |

### Melaporkan masalah

- **Bug / usulan fitur** → buka [Issue](https://github.com/deepin-Indonesia/donasi-site/issues).
- **Diskusi cepat** → [grup Telegram deepin Indonesia](https://t.me/Linux_deepin_ID).
- **Kontak** → [deepin@siberin.id](mailto:deepin@siberin.id).

## Lisensi

Dirilis di bawah [MIT License](LICENSE) © deepin Indonesia.

---

<div align="center">

Dibuat dengan ❤️ oleh komunitas [deepin Indonesia](https://deepin.id) · [Telegram](https://t.me/Linux_deepin_ID) · [GitHub](https://github.com/deepin-Indonesia)

</div>
