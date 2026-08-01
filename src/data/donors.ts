export interface Donor {
  name: string;
  email: string;
  donor_id: string;
  amount: number;
  date: string;
}

export function formatRupiah(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const lastUpdated = "30 July 2026, 12:13 WIB";

export const donors: Donor[] = [
  { name: '[DUMMY] Budi Santoso', email: 'budi********', donor_id: '5bee0bb99943', amount: 100000, date: '2026-07-01' },
  { name: '[DUMMY] Siti Rahayu', email: 'siti********', donor_id: '267a12e43722', amount: 150000, date: '2026-07-01' },
  { name: '', email: '', donor_id: '', amount: 50000, date: '2026-07-02' },
  { name: '[DUMMY] Andi Pratama', email: 'andi********', donor_id: 'fa49b7a36e6f', amount: 250000, date: '2026-07-03' },
  { name: '[DUMMY] Maya Indah', email: 'maya********', donor_id: '785e3161d0f6', amount: 75000, date: '2026-07-03' },
  { name: '[DUMMY] Rizky Fauzi', email: 'rizk********', donor_id: 'c7470c345778', amount: 100000, date: '2026-07-03' },
  { name: '', email: '', donor_id: '', amount: 200000, date: '2026-07-04' },
  { name: '[DUMMY] Dian Permata', email: 'dian********', donor_id: '692ed6572a8d', amount: 150000, date: '2026-07-05' },
  { name: '[DUMMY] Hendra Gunawan', email: 'hend********', donor_id: '7573516d4674', amount: 50000, date: '2026-07-05' },
  { name: '[DUMMY] Budi Santoso', email: 'budi********', donor_id: '5bee0bb99943', amount: 500000, date: '2026-07-06' },
  { name: '[DUMMY] Putri Amelia', email: 'putr********', donor_id: 'c20e2d47a1d8', amount: 175000, date: '2026-07-07' },
  { name: '', email: '', donor_id: '', amount: 100000, date: '2026-07-07' },
  { name: '[DUMMY] Siti Rahayu', email: 'siti********', donor_id: '267a12e43722', amount: 350000, date: '2026-07-08' },
  { name: '[DUMMY] Ahmad Fauzan', email: 'ahma********', donor_id: '5c869db8e72b', amount: 200000, date: '2026-07-09' },
  { name: '[DUMMY] Rina Marlina', email: 'rina********', donor_id: '947e50ee6a73', amount: 125000, date: '2026-07-10' },
  { name: '', email: '', donor_id: '', amount: 150000, date: '2026-07-10' },
  { name: '[DUMMY] Dian Permata', email: 'dian********', donor_id: '692ed6572a8d', amount: 300000, date: '2026-07-12' },
  { name: '[DUMMY] Yoga Prasetya', email: 'yoga********', donor_id: '13fb8ee3d4b2', amount: 180000, date: '2026-07-13' },
  { name: '[DUMMY] Budi Santoso', email: 'budi********', donor_id: '5bee0bb99943', amount: 75000, date: '2026-07-14' },
  { name: '[DUMMY] Nurul Hidayah', email: 'nuru********', donor_id: 'b7cc732a0a7d', amount: 225000, date: '2026-07-15' },
  { name: '', email: '', donor_id: '', amount: 75000, date: '2026-07-15' },
  { name: '[DUMMY] Andi Pratama', email: 'andi********', donor_id: 'fa49b7a36e6f', amount: 400000, date: '2026-07-16' },
  { name: '[DUMMY] Siska Wulandari', email: 'sisk********', donor_id: 'c6bcddf6265c', amount: 95000, date: '2026-07-17' },
  { name: '[DUMMY] Maya Indah', email: 'maya********', donor_id: '785e3161d0f6', amount: 150000, date: '2026-07-18' },
  { name: '', email: '', donor_id: '', amount: 300000, date: '2026-07-19' },
  { name: '[DUMMY] Rizky Fauzi', email: 'rizk********', donor_id: 'c7470c345778', amount: 250000, date: '2026-07-20' },
  { name: '[DUMMY] Kartika Dewi', email: 'kart********', donor_id: '20ea3e29dbc1', amount: 135000, date: '2026-07-20' },
  { name: '[DUMMY] Hendra Gunawan', email: 'hend********', donor_id: '7573516d4674', amount: 200000, date: '2026-07-22' },
  { name: '[DUMMY] Putri Amelia', email: 'putr********', donor_id: 'c20e2d47a1d8', amount: 325000, date: '2026-07-23' },
  { name: '', email: '', donor_id: '', amount: 50000, date: '2026-07-23' },
  { name: '[DUMMY] Dimas Ardiansyah', email: 'dima********', donor_id: '0a240fa3760e', amount: 160000, date: '2026-07-24' },
  { name: '[DUMMY] Siti Rahayu', email: 'siti********', donor_id: '267a12e43722', amount: 275000, date: '2026-07-25' },
  { name: '[DUMMY] Ahmad Fauzan', email: 'ahma********', donor_id: '5c869db8e72b', amount: 100000, date: '2026-07-26' },
  { name: '', email: '', donor_id: '', amount: 175000, date: '2026-07-27' },
  { name: '[DUMMY] Budi Santoso', email: 'budi********', donor_id: '5bee0bb99943', amount: 200000, date: '2026-07-28' },
  { name: '[DUMMY] Rina Marlina', email: 'rina********', donor_id: '947e50ee6a73', amount: 310000, date: '2026-07-29' },
  { name: '[DUMMY] Yoga Prasetya', email: 'yoga********', donor_id: '13fb8ee3d4b2', amount: 50000, date: '2026-07-30' },
];