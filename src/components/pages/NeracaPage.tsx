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

// Sample balance sheet data
const sampleData = {
  aset: {
    lancar: [
      { kode: '1101', nama: 'Kas', nilai: 50000000 },
      { kode: '1102', nama: 'Bank', nilai: 150000000 },
      { kode: '1103', nama: 'Piutang', nilai: 25000000 },
      { kode: '1104', nama: 'Persediaan', nilai: 15000000 },
    ],
    tetap: [
      { kode: '1201', nama: 'Tanah', nilai: 2000000000 },
      { kode: '1202', nama: 'Bangunan', nilai: 3000000000 },
      { kode: '1203', nama: 'Kendaraan', nilai: 500000000 },
      { kode: '1204', nama: 'Peralatan', nilai: 250000000 },
      { kode: '1205', nama: 'Akumulasi Penyusutan', nilai: -750000000 },
    ],
  },
  kewajiban: {
    lancar: [
      { kode: '2101', nama: 'Hutang Usaha', nilai: 35000000 },
      { kode: '2102', nama: 'Hutang Gaji', nilai: 45000000 },
      { kode: '2103', nama: 'Pendapatan Diterima Dimuka', nilai: 20000000 },
    ],
    panjang: [{ kode: '2201', nama: 'Hutang Bank', nilai: 1000000000 }],
  },
  ekuitas: [
    { kode: '3101', nama: 'Modal Yayasan', nilai: 3890000000 },
    { kode: '3102', nama: 'Surplus Tahun Berjalan', nilai: 250000000 },
  ],
};

const NeracaPage = () => {
  const [selectedBidang, setSelectedBidang] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [periode, setPeriode] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM format

  const handleBidangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBidang = e.target.value;
    setSelectedBidang(newBidang);
    setSelectedUnit('');
  };

  // Calculate totals
  const totalAsetLancar = sampleData.aset.lancar.reduce(
    (sum, item) => sum + item.nilai,
    0
  );
  const totalAsetTetap = sampleData.aset.tetap.reduce(
    (sum, item) => sum + item.nilai,
    0
  );
  const totalAset = totalAsetLancar + totalAsetTetap;

  const totalKewajibanLancar = sampleData.kewajiban.lancar.reduce(
    (sum, item) => sum + item.nilai,
    0
  );
  const totalKewajibanPanjang = sampleData.kewajiban.panjang.reduce(
    (sum, item) => sum + item.nilai,
    0
  );
  const totalKewajiban = totalKewajibanLancar + totalKewajibanPanjang;

  const totalEkuitas = sampleData.ekuitas.reduce(
    (sum, item) => sum + item.nilai,
    0
  );

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
      <h1 className='text-2xl font-semibold text-gray-900 mb-6'>Neraca</h1>

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

      {/* Balance Sheet */}
      <div className='grid grid-cols-2 gap-6'>
        {/* Assets */}
        <div>
          <h2 className='text-lg font-semibold mb-4'>Aset</h2>

          {/* Current Assets */}
          <div className='mb-6'>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>
              Aset Lancar
            </h3>
            {sampleData.aset.lancar.map((item) => (
              <div key={item.kode} className='flex justify-between py-1'>
                <span className='text-sm text-gray-600'>
                  {item.kode} - {item.nama}
                </span>
                <span className='text-sm'>{formatCurrency(item.nilai)}</span>
              </div>
            ))}
            <div className='flex justify-between py-2 font-medium border-t border-gray-200 mt-2'>
              <span>Total Aset Lancar</span>
              <span>{formatCurrency(totalAsetLancar)}</span>
            </div>
          </div>

          {/* Fixed Assets */}
          <div className='mb-6'>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>
              Aset Tetap
            </h3>
            {sampleData.aset.tetap.map((item) => (
              <div key={item.kode} className='flex justify-between py-1'>
                <span className='text-sm text-gray-600'>
                  {item.kode} - {item.nama}
                </span>
                <span className='text-sm'>{formatCurrency(item.nilai)}</span>
              </div>
            ))}
            <div className='flex justify-between py-2 font-medium border-t border-gray-200 mt-2'>
              <span>Total Aset Tetap</span>
              <span>{formatCurrency(totalAsetTetap)}</span>
            </div>
          </div>

          <div className='flex justify-between py-3 font-semibold border-t-2 border-gray-300'>
            <span>TOTAL ASET</span>
            <span>{formatCurrency(totalAset)}</span>
          </div>
        </div>

        {/* Liabilities and Equity */}
        <div>
          <h2 className='text-lg font-semibold mb-4'>Kewajiban & Ekuitas</h2>

          {/* Current Liabilities */}
          <div className='mb-6'>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>
              Kewajiban Lancar
            </h3>
            {sampleData.kewajiban.lancar.map((item) => (
              <div key={item.kode} className='flex justify-between py-1'>
                <span className='text-sm text-gray-600'>
                  {item.kode} - {item.nama}
                </span>
                <span className='text-sm'>{formatCurrency(item.nilai)}</span>
              </div>
            ))}
            <div className='flex justify-between py-2 font-medium border-t border-gray-200 mt-2'>
              <span>Total Kewajiban Lancar</span>
              <span>{formatCurrency(totalKewajibanLancar)}</span>
            </div>
          </div>

          {/* Long-term Liabilities */}
          <div className='mb-6'>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>
              Kewajiban Jangka Panjang
            </h3>
            {sampleData.kewajiban.panjang.map((item) => (
              <div key={item.kode} className='flex justify-between py-1'>
                <span className='text-sm text-gray-600'>
                  {item.kode} - {item.nama}
                </span>
                <span className='text-sm'>{formatCurrency(item.nilai)}</span>
              </div>
            ))}
            <div className='flex justify-between py-2 font-medium border-t border-gray-200 mt-2'>
              <span>Total Kewajiban Jangka Panjang</span>
              <span>{formatCurrency(totalKewajibanPanjang)}</span>
            </div>
          </div>

          {/* Total Liabilities */}
          <div className='flex justify-between py-2 font-medium border-t border-gray-300'>
            <span>TOTAL KEWAJIBAN</span>
            <span>{formatCurrency(totalKewajiban)}</span>
          </div>

          {/* Equity */}
          <div className='mt-6'>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>Ekuitas</h3>
            {sampleData.ekuitas.map((item) => (
              <div key={item.kode} className='flex justify-between py-1'>
                <span className='text-sm text-gray-600'>
                  {item.kode} - {item.nama}
                </span>
                <span className='text-sm'>{formatCurrency(item.nilai)}</span>
              </div>
            ))}
            <div className='flex justify-between py-2 font-medium border-t border-gray-200 mt-2'>
              <span>Total Ekuitas</span>
              <span>{formatCurrency(totalEkuitas)}</span>
            </div>
          </div>

          <div className='flex justify-between py-3 font-semibold border-t-2 border-gray-300'>
            <span>TOTAL KEWAJIBAN & EKUITAS</span>
            <span>{formatCurrency(totalKewajiban + totalEkuitas)}</span>
          </div>
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

export default NeracaPage;
