#!/usr/bin/env python3
"""
generate_donors.py — Generate CSV publik untuk halaman donasi

Cara pakai:
1. Simpan data donor lengkap di donors_private.csv (ada email asli & No HP)
2. Jalankan:  python tools/generate_donors.py
3. Output:  _data/donors.csv  → siap commit ke repo publik

Format donors_private.csv:
  name,email,phone,amount,date

Output donors.csv:
  name,email,amount,date  (email disensor, No HP dihapus)
"""

import csv
import os
from datetime import datetime

# ---- CONFIG ----
INPUT_FILE  = os.path.join(os.path.dirname(__file__), "donors_private.csv")
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "..", "_data", "donors.csv")

def censor_email(email: str) -> str:
    """Sensor email: 4 karakter pertama + 8 bintang. Contoh: budi********"""
    if not email or email.strip() == "":
        return ""
    return email[:4] + "********"

def generate():
    if not os.path.exists(INPUT_FILE):
        print(f"❌ File input tidak ditemukan: {INPUT_FILE}")
        print("   Buat dulu tools/donors_private.csv dengan format: name,email,phone,amount,date")
        return

    rows = []
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            name   = row.get("name", "").strip()
            email  = censor_email(row.get("email", "").strip())
            amount = row.get("amount", "").strip()
            date   = row.get("date", "").strip()
            
            # Skip baris kosong atau timestamp
            if name == "__TS__":
                continue
            
            rows.append([name, email, amount, date])

    # Urutkan by date (terbaru di bawah)
    rows.sort(key=lambda r: r[3])

    # Tulis output CSV
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f, lineterminator="\n")
        writer.writerow(["name", "email", "amount", "date"])
        writer.writerows(rows)
        
        # Baris timestamp
        now = datetime.now().strftime("%d %B %Y, %H:%M WIB")
        writer.writerow(["__TS__", now, "", ""])

    print(f"✅ {len(rows)} donasi diproses → {OUTPUT_FILE}")
    print(f"   Timestamp: {now}")

if __name__ == "__main__":
    generate()
