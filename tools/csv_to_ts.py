import csv

with open('d:/GitHub/deepin-Indonesia/donasi-site/_data/donors.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

data = [r for r in rows if r['name'] != '__TS__']
ts = next((r for r in rows if r['name'] == '__TS__'), None)
ts_str = ts['email'] if ts else 'Unknown'

out = []
out.append('export interface Donor {')
out.append('  name: string;')
out.append('  email: string;')
out.append('  donor_id: string;')
out.append('  amount: number;')
out.append('  date: string;')
out.append('}')
out.append('')
out.append('export function formatRupiah(amount: number): string {')
out.append("  return amount.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, '.');")
out.append('}')
out.append('')
out.append(f'export const lastUpdated = "{ts_str}";')
out.append('')
out.append('export const donors: Donor[] = [')

for r in data:
    name = r['name'].replace("'", "\\'") if r['name'] else ''
    email = r['email'] if r['email'] else ''
    did = r['donor_id'] if r['donor_id'] else ''
    out.append(f"  {{ name: '{name}', email: '{email}', donor_id: '{did}', amount: {r['amount']}, date: '{r['date']}' }},")

out.append('];')

with open('d:/GitHub/deepin-Indonesia/donasi-site/src/data/donors.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))

print(f'✅ {len(data)} donors written')
