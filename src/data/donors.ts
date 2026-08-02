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

export const lastUpdated = "02 August 2026, 20:57 WIB";

export const donors: Donor[] = [
  { name: '[DUMMY] Budi Santoso', email: 'dumm********', donor_id: '276bf8109181', amount: 100000, date: '2026-07-01' },
  { name: '[DUMMY] Siti Rahayu', email: 'dumm********', donor_id: '0329b56508c3', amount: 150000, date: '2026-07-01' },
  { name: '', email: '', donor_id: '', amount: 50000, date: '2026-07-02' },
  { name: '[DUMMY] Andi Pratama', email: 'dumm********', donor_id: '3a585de8cae0', amount: 250000, date: '2026-07-03' },
  { name: '[DUMMY] Maya Indah', email: 'dumm********', donor_id: '08034d1e058c', amount: 75000, date: '2026-07-03' },
  { name: '[DUMMY] Rizky Fauzi', email: 'dumm********', donor_id: 'a968114fa811', amount: 100000, date: '2026-07-03' },
  { name: '', email: '', donor_id: '', amount: 200000, date: '2026-07-04' },
  { name: '[DUMMY] Dian Permata', email: 'dumm********', donor_id: '9707a9b712c0', amount: 150000, date: '2026-07-05' },
  { name: '[DUMMY] Hendra Gunawan', email: 'dumm********', donor_id: 'f87acdad103a', amount: 50000, date: '2026-07-05' },
  { name: '[DUMMY] Budi Santoso', email: 'dumm********', donor_id: '276bf8109181', amount: 500000, date: '2026-07-06' },
  { name: '[DUMMY] Putri Amelia', email: 'dumm********', donor_id: '2b8072bff10e', amount: 175000, date: '2026-07-07' },
  { name: '', email: '', donor_id: '', amount: 100000, date: '2026-07-07' },
  { name: '[DUMMY] Siti Rahayu', email: 'dumm********', donor_id: '0329b56508c3', amount: 350000, date: '2026-07-08' },
  { name: '[DUMMY] Ahmad Fauzan', email: 'dumm********', donor_id: '6a4e0921e46b', amount: 200000, date: '2026-07-09' },
  { name: '[DUMMY] Rina Marlina', email: 'dumm********', donor_id: 'b2b5b788c7ad', amount: 125000, date: '2026-07-10' },
  { name: '', email: '', donor_id: '', amount: 150000, date: '2026-07-10' },
  { name: '[DUMMY] Dian Permata', email: 'dumm********', donor_id: '9707a9b712c0', amount: 300000, date: '2026-07-12' },
  { name: '[DUMMY] Yoga Prasetya', email: 'dumm********', donor_id: '71d6ea5b06e4', amount: 180000, date: '2026-07-13' },
  { name: '[DUMMY] Budi Santoso', email: 'dumm********', donor_id: '276bf8109181', amount: 75000, date: '2026-07-14' },
  { name: '[DUMMY] Nurul Hidayah', email: 'dumm********', donor_id: '903efd05c468', amount: 225000, date: '2026-07-15' },
  { name: '', email: '', donor_id: '', amount: 75000, date: '2026-07-15' },
  { name: '[DUMMY] Andi Pratama', email: 'dumm********', donor_id: '3a585de8cae0', amount: 400000, date: '2026-07-16' },
  { name: '[DUMMY] Siska Wulandari', email: 'dumm********', donor_id: '5e297979368b', amount: 95000, date: '2026-07-17' },
  { name: '[DUMMY] Maya Indah', email: 'dumm********', donor_id: '08034d1e058c', amount: 150000, date: '2026-07-18' },
  { name: '', email: '', donor_id: '', amount: 300000, date: '2026-07-19' },
  { name: '[DUMMY] Rizky Fauzi', email: 'dumm********', donor_id: 'a968114fa811', amount: 250000, date: '2026-07-20' },
  { name: '[DUMMY] Kartika Dewi', email: 'dumm********', donor_id: 'e5915e025ae9', amount: 135000, date: '2026-07-20' },
  { name: '[DUMMY] Hendra Gunawan', email: 'dumm********', donor_id: 'f87acdad103a', amount: 200000, date: '2026-07-22' },
  { name: '[DUMMY] Putri Amelia', email: 'dumm********', donor_id: '2b8072bff10e', amount: 325000, date: '2026-07-23' },
  { name: '', email: '', donor_id: '', amount: 50000, date: '2026-07-23' },
  { name: '[DUMMY] Dimas Ardiansyah', email: 'dumm********', donor_id: '66ad0a4ebcb7', amount: 160000, date: '2026-07-24' },
  { name: '[DUMMY] Siti Rahayu', email: 'dumm********', donor_id: '0329b56508c3', amount: 275000, date: '2026-07-25' },
  { name: '[DUMMY] Ahmad Fauzan', email: 'dumm********', donor_id: '6a4e0921e46b', amount: 100000, date: '2026-07-26' },
  { name: '', email: '', donor_id: '', amount: 175000, date: '2026-07-27' },
  { name: '[DUMMY] Budi Santoso', email: 'dumm********', donor_id: '276bf8109181', amount: 200000, date: '2026-07-28' },
  { name: '[DUMMY] Rina Marlina', email: 'dumm********', donor_id: 'b2b5b788c7ad', amount: 310000, date: '2026-07-29' },
  { name: '[DUMMY] Yoga Prasetya', email: 'dumm********', donor_id: '71d6ea5b06e4', amount: 50000, date: '2026-07-30' },
];