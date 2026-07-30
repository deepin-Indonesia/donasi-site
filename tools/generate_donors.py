#!/usr/bin/env python3
"""
generate_donors.py — Generate CSV publik untuk halaman donasi

Cara pakai:
1. Simpan data donor lengkap di tools/donors_private.csv (ada email asli & No HP)
2. Jalankan:  python tools/generate_donors.py
3. Output:  _data/donors.csv  → siap commit ke repo publik

Format donors_private.csv:
  name,email,phone,amount,date

Output donors.csv:
  name,email,donor_id,amount,date
  - email: 4 karakter pertama + ******** (disensor)
  - donor_id: HMAC-SHA256(email, secret_key) → impossible to reverse
  - No HP dihapus
"""

import csv
import hashlib
import hmac
import os
import secrets
from datetime import datetime

# ---- CONFIG ----
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_FILE  = os.path.join(SCRIPT_DIR, "donors_private.csv")
OUTPUT_FILE = os.path.join(SCRIPT_DIR, "..", "_data", "donors.csv")
SECRET_FILE = os.path.join(SCRIPT_DIR, ".secret_key")


def get_secret_key() -> bytes:
    """Ambil atau buat secret key untuk HMAC.
    Prioritas: env var → file .secret_key → generate baru.
    Key TIDAK PERNAH di-commit (ada di .gitignore)."""
    env_key = os.environ.get("DONOR_SECRET_KEY")
    if env_key:
        return env_key.encode()

    if os.path.exists(SECRET_FILE):
        with open(SECRET_FILE, "rb") as f:
            return f.read()

    # Generate key baru
    key = secrets.token_bytes(32)
    with open(SECRET_FILE, "wb") as f:
        f.write(key)
    print(f"🔑 Secret key baru dibuat: {SECRET_FILE}")
    print("   ⚠️  Simpan file ini! Tanpa key ini, donor_id tidak bisa direproduksi.")
    return key


SECRET_KEY = None  # lazy init


def censor_email(email: str) -> str:
    """Sensor email: 4 karakter pertama + 8 bintang."""
    if not email or email.strip() == "":
        return ""
    return email[:4] + "********"


def donor_id(email: str) -> str:
    """Buat ID unik dari email via HMAC-SHA256 — impossible to reverse tanpa secret key."""
    global SECRET_KEY
    if not email or email.strip() == "":
        return ""
    if SECRET_KEY is None:
        SECRET_KEY = get_secret_key()
    return hmac.new(SECRET_KEY, email.strip().lower().encode(), hashlib.sha256).hexdigest()[:12]


def generate():
    if not os.path.exists(INPUT_FILE):
        print(f"❌ File input tidak ditemukan: {INPUT_FILE}")
        print("   Buat dulu tools/donors_private.csv dengan format: name,email,phone,amount,date")
        print("   Lihat contoh: tools/donors_private.example.csv")
        return

    rows = []
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            name = row.get("name", "").strip()
            email_raw = row.get("email", "").strip()
            email = censor_email(email_raw)
            did   = donor_id(email_raw)
            amount = row.get("amount", "").strip()
            date = row.get("date", "").strip()

            if name == "__TS__":
                continue

            rows.append([name, email, did, amount, date])

    rows.sort(key=lambda r: r[4])

    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f, lineterminator="\n")
        writer.writerow(["name", "email", "donor_id", "amount", "date"])
        writer.writerows(rows)

        now = datetime.now().strftime("%d %B %Y, %H:%M WIB")
        writer.writerow(["__TS__", now, "", "", ""])

    # Statistik
    unique_donors = len(set(r[2] for r in rows if r[2]))
    print(f"✅ {len(rows)} donasi diproses ({unique_donors} donatur unik) → {OUTPUT_FILE}")
    print(f"   Timestamp: {now}")


if __name__ == "__main__":
    generate()
