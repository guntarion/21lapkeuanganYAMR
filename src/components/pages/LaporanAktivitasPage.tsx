import React, { useState } from 'react';

// Data structures for Bidang and Unit
const BIDANG = {
  SK: 'KESEKRETARIATAN',
  AG: 'KEAGAMAAN',
  SO: 'SOSIAL',
  KM: 'KEMANUSIAAN',
} as const;

const UNITS = {
  SK: [
    { code: 'SEK', name: 'SEKRETARIAT' },
    { code: 'MAI', name: 'TEKNIK MAINTENANCE' },
    { code: 'MUT', name: 'PENJAMINAN MUTU' },
    { code: 'SDM', name: 'PERSONALIA SDM' },
    { code: 'KEA', name: 'KEBERSIHAN KEAMANAN' },
    { code: 'HUM', name: 'KEHUMASAN' },
    { code: 'DAN', name: 'USAHA DANA' },
    { code: 'KED', name: 'KEDAI' },
  ],
  AG: [
    { code: 'TKM', name: 'KETAKMIRAN' },
    { code: 'KID', name: 'REMASKIDZ' },
    { code: 'TPQ', name: 'TPQ' },
    { code: 'MUS', name: 'KEMUSLIMAHAN' },
  ],
  SO: [
    { code: 'DCR', name: 'DAYCARE' },
    { code: 'KBT', name: 'KBTK' },
    { code: 'KOL', name: 'KOLAM RENANG' },
  ],
  KM: [
    { code: 'LAZ', name: 'LAZ MUHAJIRIN' },
    { code: 'AMB', name: 'AMBULANS' },
    { code: 'JNZ', name: 'LAYANAN JENAZAH' },
  ],
} as const;

// Sample data
const sampleData = {
  pendapatan: {
    tanpaPembatasan: [
      { kode: '4101', nama: 'Pendapatan Donasi Umum', nilai: 750000000 },
      { kode: '4102', nama: 'Pendapatan Program Sosial', nilai: 500000000 },
      { kode: '4103', nama: 'Pendapatan Unit Usaha', nilai: 300000000 },
    ],
    denganPembatasan: [
      { kode: '4201', nama: 'Pendapatan Donasi Khusus', nilai: 250000000 },
      { kode: '4202', nama: 'Pendapatan Program Terikat', nilai: 200000000 },
    ],
  },
  beban: {
    program: [
      { kode: '5101', nama: 'Beban Program Pendidikan', nilai: 400000000 },
      { kode: '5102', nama: 'Beban Program Sosial', nilai: 300000000 },
      { kode: '5103', nama: 'Beban Program Keagamaan', nilai: 250000000 },
    ],
    manajemenUmum: [
      { kode: '5201', nama: 'Beban Gaji dan Tunjangan', nilai: 350000000 },
      { kode: '5202', nama: 'Beban Operasional', nilai: 200000000 },
      { kode: '5203', nama: 'Beban Pemeliharaan', nilai: 150000000 },
    ],
  },
};

const LaporanAktivitasPage = () => {
  const [selectedBidang, setSelectedBidang] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [periode, setPeriode] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM format

  const handleBidangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBidang = e.target.value;
    setSelectedBidang(newBidang);
    setSelectedUnit('');
  };

  // Calculate totals
  const totalPendapatanTanpaPembatasan =
    sampleData.pendapatan.tanpaPembatasan.reduce(
      (sum, item) => sum + item.nilai,
      0
    );
  const totalPendapatanDenganPembatasan =
    sampleData.pendapatan.denganPembatasan.reduce(
      (sum, item) => sum + item.nilai,
      0
    );
  const totalPendapatan =
    totalPendapatanTanpaPembatasan + totalPendapatanDenganPembatasan;

  const totalBebanProgram = sampleData.beban.program.reduce(
    (sum, item) => sum + item.nilai,
    0
  );
  const totalBebanManajemen = sampleData.beban.manajemenUmum.reduce(
    (sum, item) => sum + item.nilai,
    0
  );
  const totalBeban = totalBebanProgram + totalBebanManajemen;

  const surplusDefisit = totalPendapatan - totalBeban;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold text-gray-900 mb-6'>
        Laporan Aktivitas
      </h1>

      {/* Filters */}
      <div className='grid grid-cols-3 gap-4 mb-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Periode
          </label>
          <input
            type='month'
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-lg'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Bidang
          </label>
          <select
            value={selectedBidang}
            onChange={handleBidangChange}
            className='w-full p-2 border border-gray-300 rounded-lg'
          >
            <option value=''>Semua Bidang</option>
            {Object.entries(BIDANG).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Unit
          </label>
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            disabled={!selectedBidang}
            className='w-full p-2 border border-gray-300 rounded-lg'
          >
            <option value=''>Semua Unit</option>
            {selectedBidang &&
              UNITS[selectedBidang as keyof typeof UNITS]?.map((unit) => (
                <option key={unit.code} value={unit.code}>
                  {unit.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Activity Report */}
      <div className='space-y-6'>
        {/* Pendapatan */}
        <div>
          <h2 className='text-lg font-semibold mb-4'>Pendapatan</h2>

          {/* Pendapatan Tanpa Pembatasan */}
          <div className='mb-6'>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>
              Pendapatan Tanpa Pembatasan
            </h3>
            {sampleData.pendapatan.tanpaPembatasan.map((item) => (
              <div key={item.kode} className='flex justify-between py-1'>
                <span className='text-sm text-gray-600'>
                  {item.kode} - {item.nama}
                </span>
                <span className='text-sm'>{formatCurrency(item.nilai)}</span>
              </div>
            ))}
            <div className='flex justify-between py-2 font-medium border-t border-gray-200 mt-2'>
              <span>Total Pendapatan Tanpa Pembatasan</span>
              <span>{formatCurrency(totalPendapatanTanpaPembatasan)}</span>
            </div>
          </div>

          {/* Pendapatan Dengan Pembatasan */}
          <div className='mb-6'>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>
              Pendapatan Dengan Pembatasan
            </h3>
            {sampleData.pendapatan.denganPembatasan.map((item) => (
              <div key={item.kode} className='flex justify-between py-1'>
                <span className='text-sm text-gray-600'>
                  {item.kode} - {item.nama}
                </span>
                <span className='text-sm'>{formatCurrency(item.nilai)}</span>
              </div>
            ))}
            <div className='flex justify-between py-2 font-medium border-t border-gray-200 mt-2'>
              <span>Total Pendapatan Dengan Pembatasan</span>
              <span>{formatCurrency(totalPendapatanDenganPembatasan)}</span>
            </div>
          </div>

          <div className='flex justify-between py-3 font-semibold border-t-2 border-gray-300'>
            <span>TOTAL PENDAPATAN</span>
            <span>{formatCurrency(totalPendapatan)}</span>
          </div>
        </div>

        {/* Beban */}
        <div>
          <h2 className='text-lg font-semibold mb-4'>Beban</h2>

          {/* Beban Program */}
          <div className='mb-6'>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>
              Beban Program
            </h3>
            {sampleData.beban.program.map((item) => (
              <div key={item.kode} className='flex justify-between py-1'>
                <span className='text-sm text-gray-600'>
                  {item.kode} - {item.nama}
                </span>
                <span className='text-sm'>{formatCurrency(item.nilai)}</span>
              </div>
            ))}
            <div className='flex justify-between py-2 font-medium border-t border-gray-200 mt-2'>
              <span>Total Beban Program</span>
              <span>{formatCurrency(totalBebanProgram)}</span>
            </div>
          </div>

          {/* Beban Manajemen dan Umum */}
          <div className='mb-6'>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>
              Beban Manajemen dan Umum
            </h3>
            {sampleData.beban.manajemenUmum.map((item) => (
              <div key={item.kode} className='flex justify-between py-1'>
                <span className='text-sm text-gray-600'>
                  {item.kode} - {item.nama}
                </span>
                <span className='text-sm'>{formatCurrency(item.nilai)}</span>
              </div>
            ))}
            <div className='flex justify-between py-2 font-medium border-t border-gray-200 mt-2'>
              <span>Total Beban Manajemen dan Umum</span>
              <span>{formatCurrency(totalBebanManajemen)}</span>
            </div>
          </div>

          <div className='flex justify-between py-3 font-semibold border-t-2 border-gray-300'>
            <span>TOTAL BEBAN</span>
            <span>{formatCurrency(totalBeban)}</span>
          </div>
        </div>

        {/* Surplus/Defisit */}
        <div className='flex justify-between py-4 font-semibold text-lg border-t-2 border-double border-gray-300'>
          <span>SURPLUS (DEFISIT)</span>
          <span
            className={surplusDefisit >= 0 ? 'text-green-600' : 'text-red-600'}
          >
            {formatCurrency(surplusDefisit)}
          </span>
        </div>
      </div>

      {/* Print Button */}
      <div className='mt-6'>
        <button
          onClick={() => window.print()}
          className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          Cetak Laporan
        </button>
      </div>
    </div>
  );
};

export default LaporanAktivitasPage;
