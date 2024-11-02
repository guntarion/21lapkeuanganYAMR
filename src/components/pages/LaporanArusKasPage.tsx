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
  operasi: {
    penerimaan: [
      { kode: '4101', nama: 'Penerimaan Donasi', nilai: 750000000 },
      { kode: '4102', nama: 'Penerimaan Program', nilai: 500000000 },
      { kode: '4103', nama: 'Penerimaan Unit Usaha', nilai: 300000000 },
    ],
    pengeluaran: [
      { kode: '5101', nama: 'Pembayaran Program', nilai: -600000000 },
      { kode: '5102', nama: 'Pembayaran Gaji', nilai: -350000000 },
      { kode: '5103', nama: 'Pembayaran Operasional', nilai: -200000000 },
    ],
  },
  investasi: {
    penerimaan: [
      { kode: '4201', nama: 'Penjualan Aset Tetap', nilai: 100000000 },
    ],
    pengeluaran: [
      { kode: '5201', nama: 'Pembelian Aset Tetap', nilai: -500000000 },
      { kode: '5202', nama: 'Renovasi Gedung', nilai: -300000000 },
    ],
  },
  pendanaan: {
    penerimaan: [
      { kode: '4301', nama: 'Penerimaan Pinjaman', nilai: 1000000000 },
    ],
    pengeluaran: [
      { kode: '5301', nama: 'Pembayaran Pinjaman', nilai: -200000000 },
    ],
  },
  kasAwal: 500000000,
};

const LaporanArusKasPage = () => {
  const [selectedBidang, setSelectedBidang] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [periode, setPeriode] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM format

  const handleBidangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBidang = e.target.value;
    setSelectedBidang(newBidang);
    setSelectedUnit('');
  };

  // Calculate totals
  const totalOperasiPenerimaan = sampleData.operasi.penerimaan.reduce(
    (sum, item) => sum + item.nilai,
    0
  );
  const totalOperasiPengeluaran = sampleData.operasi.pengeluaran.reduce(
    (sum, item) => sum + item.nilai,
    0
  );
  const netOperasi = totalOperasiPenerimaan + totalOperasiPengeluaran;

  const totalInvestasiPenerimaan = sampleData.investasi.penerimaan.reduce(
    (sum, item) => sum + item.nilai,
    0
  );
  const totalInvestasiPengeluaran = sampleData.investasi.pengeluaran.reduce(
    (sum, item) => sum + item.nilai,
    0
  );
  const netInvestasi = totalInvestasiPenerimaan + totalInvestasiPengeluaran;

  const totalPendanaanPenerimaan = sampleData.pendanaan.penerimaan.reduce(
    (sum, item) => sum + item.nilai,
    0
  );
  const totalPendanaanPengeluaran = sampleData.pendanaan.pengeluaran.reduce(
    (sum, item) => sum + item.nilai,
    0
  );
  const netPendanaan = totalPendanaanPenerimaan + totalPendanaanPengeluaran;

  const totalPerubahanKas = netOperasi + netInvestasi + netPendanaan;
  const kasAkhir = sampleData.kasAwal + totalPerubahanKas;

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
        Laporan Arus Kas
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

      {/* Cash Flow Report */}
      <div className='space-y-6'>
        {/* Kas Awal */}
        <div className='flex justify-between py-3 font-semibold border-b-2 border-gray-300'>
          <span>Kas dan Setara Kas Awal Periode</span>
          <span>{formatCurrency(sampleData.kasAwal)}</span>
        </div>

        {/* Arus Kas dari Aktivitas Operasi */}
        <div>
          <h2 className='text-lg font-semibold mb-4'>
            Arus Kas dari Aktivitas Operasi
          </h2>

          {/* Penerimaan Operasi */}
          <div className='mb-4'>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>
              Penerimaan
            </h3>
            {sampleData.operasi.penerimaan.map((item) => (
              <div key={item.kode} className='flex justify-between py-1'>
                <span className='text-sm text-gray-600'>
                  {item.kode} - {item.nama}
                </span>
                <span className='text-sm'>{formatCurrency(item.nilai)}</span>
              </div>
            ))}
          </div>

          {/* Pengeluaran Operasi */}
          <div className='mb-4'>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>
              Pengeluaran
            </h3>
            {sampleData.operasi.pengeluaran.map((item) => (
              <div key={item.kode} className='flex justify-between py-1'>
                <span className='text-sm text-gray-600'>
                  {item.kode} - {item.nama}
                </span>
                <span className='text-sm'>{formatCurrency(item.nilai)}</span>
              </div>
            ))}
          </div>

          <div className='flex justify-between py-2 font-medium border-t border-gray-200'>
            <span>Kas Bersih dari Aktivitas Operasi</span>
            <span
              className={netOperasi >= 0 ? 'text-green-600' : 'text-red-600'}
            >
              {formatCurrency(netOperasi)}
            </span>
          </div>
        </div>

        {/* Arus Kas dari Aktivitas Investasi */}
        <div>
          <h2 className='text-lg font-semibold mb-4'>
            Arus Kas dari Aktivitas Investasi
          </h2>

          {/* Penerimaan Investasi */}
          <div className='mb-4'>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>
              Penerimaan
            </h3>
            {sampleData.investasi.penerimaan.map((item) => (
              <div key={item.kode} className='flex justify-between py-1'>
                <span className='text-sm text-gray-600'>
                  {item.kode} - {item.nama}
                </span>
                <span className='text-sm'>{formatCurrency(item.nilai)}</span>
              </div>
            ))}
          </div>

          {/* Pengeluaran Investasi */}
          <div className='mb-4'>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>
              Pengeluaran
            </h3>
            {sampleData.investasi.pengeluaran.map((item) => (
              <div key={item.kode} className='flex justify-between py-1'>
                <span className='text-sm text-gray-600'>
                  {item.kode} - {item.nama}
                </span>
                <span className='text-sm'>{formatCurrency(item.nilai)}</span>
              </div>
            ))}
          </div>

          <div className='flex justify-between py-2 font-medium border-t border-gray-200'>
            <span>Kas Bersih dari Aktivitas Investasi</span>
            <span
              className={netInvestasi >= 0 ? 'text-green-600' : 'text-red-600'}
            >
              {formatCurrency(netInvestasi)}
            </span>
          </div>
        </div>

        {/* Arus Kas dari Aktivitas Pendanaan */}
        <div>
          <h2 className='text-lg font-semibold mb-4'>
            Arus Kas dari Aktivitas Pendanaan
          </h2>

          {/* Penerimaan Pendanaan */}
          <div className='mb-4'>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>
              Penerimaan
            </h3>
            {sampleData.pendanaan.penerimaan.map((item) => (
              <div key={item.kode} className='flex justify-between py-1'>
                <span className='text-sm text-gray-600'>
                  {item.kode} - {item.nama}
                </span>
                <span className='text-sm'>{formatCurrency(item.nilai)}</span>
              </div>
            ))}
          </div>

          {/* Pengeluaran Pendanaan */}
          <div className='mb-4'>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>
              Pengeluaran
            </h3>
            {sampleData.pendanaan.pengeluaran.map((item) => (
              <div key={item.kode} className='flex justify-between py-1'>
                <span className='text-sm text-gray-600'>
                  {item.kode} - {item.nama}
                </span>
                <span className='text-sm'>{formatCurrency(item.nilai)}</span>
              </div>
            ))}
          </div>

          <div className='flex justify-between py-2 font-medium border-t border-gray-200'>
            <span>Kas Bersih dari Aktivitas Pendanaan</span>
            <span
              className={netPendanaan >= 0 ? 'text-green-600' : 'text-red-600'}
            >
              {formatCurrency(netPendanaan)}
            </span>
          </div>
        </div>

        {/* Kenaikan (Penurunan) Kas */}
        <div className='flex justify-between py-3 font-semibold border-t-2 border-gray-300'>
          <span>Kenaikan (Penurunan) Kas</span>
          <span
            className={
              totalPerubahanKas >= 0 ? 'text-green-600' : 'text-red-600'
            }
          >
            {formatCurrency(totalPerubahanKas)}
          </span>
        </div>

        {/* Kas Akhir */}
        <div className='flex justify-between py-3 font-semibold text-lg border-t-2 border-double border-gray-300'>
          <span>Kas dan Setara Kas Akhir Periode</span>
          <span>{formatCurrency(kasAkhir)}</span>
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

export default LaporanArusKasPage;
