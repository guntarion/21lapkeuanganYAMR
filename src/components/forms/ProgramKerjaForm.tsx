import React, { useState } from 'react';

interface ProgramKerjaFormProps {
  className?: string;
}

// Data structures for Bidang and Unit
const BIDANG = {
  SK: 'KESEKRETARIATAN',
  AG: 'KEAGAMAAN',
  SO: 'SOSIAL',
  KM: 'KEMANUSIAAN',
} as const;

const UNITS = {
  SK: [
    // KESEKRETARIATAN
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
    // KEAGAMAAN
    { code: 'TKM', name: 'KETAKMIRAN' },
    { code: 'KID', name: 'REMASKIDZ' },
    { code: 'TPQ', name: 'TPQ' },
    { code: 'MUS', name: 'KEMUSLIMAHAN' },
  ],
  SO: [
    // SOSIAL
    { code: 'DCR', name: 'DAYCARE' },
    { code: 'KBT', name: 'KBTK' },
    { code: 'KOL', name: 'KOLAM RENANG' },
  ],
  KM: [
    // KEMANUSIAAN
    { code: 'LAZ', name: 'LAZ MUHAJIRIN' },
    { code: 'AMB', name: 'AMBULANS' },
    { code: 'JNZ', name: 'LAYANAN JENAZAH' },
  ],
} as const;

const ProgramKerjaForm: React.FC<ProgramKerjaFormProps> = ({
  className = '',
}) => {
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');
  const [showMonthlyDetails, setShowMonthlyDetails] = useState(false);
  const [bidang, setBidang] = useState('');
  const [unit, setUnit] = useState('');
  const [namaProgram, setNamaProgram] = useState('');
  const [jenisProgram, setJenisProgram] = useState('');
  const [statusProgram, setStatusProgram] = useState('');
  const [kodeAkun, setKodeAkun] = useState('');
  const [statusAset, setStatusAset] = useState('nonasset');
  const [pic, setPic] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [targetCapaian, setTargetCapaian] = useState('');

  const generateProgramCode = (bidang: string, unit: string): string => {
    // Logic to generate sequential number would be implemented here
    return `YAMR-2024-${bidang}-${unit}-001`;
  };

  const handleBidangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBidang = e.target.value;
    setBidang(newBidang);
    setUnit(''); // Reset unit when bidang changes
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      bidang,
      unit,
      namaProgram,
      jenisProgram,
      statusProgram,
      selectedFrequency,
      kodeAkun,
      statusAset,
      pic,
      keterangan,
      targetCapaian,
    });
  };

  return (
    <div className='p-6 bg-white'>
      <form onSubmit={handleSubmit} className={`w-full max-w-4xl ${className}`}>
        {/* Basic Information */}
        <div className='grid grid-cols-2 gap-4 mb-6'>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Bidang
            </label>
            <div className='relative'>
              <select
                value={bidang}
                onChange={handleBidangChange}
                className='block w-full p-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              >
                <option value=''>Pilih bidang</option>
                {Object.entries(BIDANG).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                </svg>
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Unit
            </label>
            <div className='relative'>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                disabled={!bidang}
                className='block w-full p-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              >
                <option value=''>Pilih unit</option>
                {bidang &&
                  UNITS[bidang as keyof typeof UNITS]?.map((unit) => (
                    <option key={unit.code} value={unit.code}>
                      {unit.name}
                    </option>
                  ))}
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Program Code */}
        <div className='space-y-2 mb-6'>
          <label className='block text-sm font-medium text-gray-700'>
            Kode Program
          </label>
          <input
            type='text'
            disabled
            value={generateProgramCode(bidang, unit)}
            className='w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          />
        </div>

        {/* Program Name */}
        <div className='space-y-2 mb-6'>
          <label className='block text-sm font-medium text-gray-700'>
            Nama Program
          </label>
          <input
            type='text'
            value={namaProgram}
            onChange={(e) => setNamaProgram(e.target.value)}
            placeholder='Masukkan nama program'
            className='w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          />
        </div>

        {/* Program Type and Status */}
        <div className='grid grid-cols-2 gap-4 mb-6'>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Jenis Program
            </label>
            <div className='relative'>
              <select
                value={jenisProgram}
                onChange={(e) => setJenisProgram(e.target.value)}
                className='block w-full p-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              >
                <option value=''>Pilih jenis</option>
                <option value='pemasukan'>Pemasukan</option>
                <option value='pengeluaran'>Pengeluaran</option>
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                </svg>
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Status Program
            </label>
            <div className='relative'>
              <select
                value={statusProgram}
                onChange={(e) => setStatusProgram(e.target.value)}
                className='block w-full p-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              >
                <option value=''>Pilih status</option>
                <option value='terencana'>Terencana</option>
                <option value='insidentil'>Insidentil</option>
                <option value='pengajuan'>Pengajuan</option>
                <option value='ditolak'>Ditolak</option>
                <option value='situasional'>Situasional</option>
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Program Frequency */}
        <div className='space-y-4 mb-6'>
          <label className='block text-sm font-medium text-gray-700'>
            Frekuensi Program
          </label>
          <div className='grid grid-cols-2 gap-4'>
            {[
              { value: 'once', label: 'Satu Kali' },
              { value: 'weekly', label: 'Mingguan' },
              { value: 'monthly', label: 'Bulanan' },
              { value: 'flexible', label: 'Fleksibel' },
            ].map((option) => (
              <div key={option.value} className='flex items-center space-x-2'>
                <input
                  type='radio'
                  id={option.value}
                  name='frequency'
                  value={option.value}
                  checked={selectedFrequency === option.value}
                  onChange={(e) => setSelectedFrequency(e.target.value)}
                  className='w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500'
                />
                <label htmlFor={option.value} className='text-sm text-gray-700'>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Budget Planning */}
        {selectedFrequency === 'monthly' && (
          <div className='space-y-4 mb-6'>
            <div className='flex items-center justify-between'>
              <label className='block text-sm font-medium text-gray-700'>
                Rencana Anggaran Bulanan
              </label>
              <button
                type='button'
                onClick={() => setShowMonthlyDetails(!showMonthlyDetails)}
                className='px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100'
              >
                {showMonthlyDetails ? 'Sembunyikan Detail' : 'Tampilkan Detail'}
              </button>
            </div>

            {showMonthlyDetails && (
              <div className='grid grid-cols-3 gap-4'>
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700'>
                      Bulan {i + 1}
                    </label>
                    <input
                      type='number'
                      placeholder='Rp 0'
                      className='w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Account Assignment */}
        <div className='space-y-2 mb-6'>
          <label className='block text-sm font-medium text-gray-700'>
            Kode Akun Terkait
          </label>
          <div className='relative'>
            <select
              value={kodeAkun}
              onChange={(e) => setKodeAkun(e.target.value)}
              className='block w-full p-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            >
              <option value=''>Pilih kode akun</option>
              <option value='4101'>4101 - Pendapatan Donasi</option>
              <option value='4102'>4102 - Pendapatan Program</option>
              <option value='5101'>5101 - Biaya Operasional</option>
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
              </svg>
            </div>
          </div>
        </div>

        {/* Asset Status */}
        <div className='space-y-2 mb-6'>
          <label className='block text-sm font-medium text-gray-700'>
            Status Aset
          </label>
          <div className='flex space-x-4'>
            {[
              { value: 'asset', label: 'Aset' },
              { value: 'nonasset', label: 'Non-Aset' },
            ].map((option) => (
              <div key={option.value} className='flex items-center space-x-2'>
                <input
                  type='radio'
                  id={option.value}
                  name='assetStatus'
                  value={option.value}
                  checked={statusAset === option.value}
                  onChange={(e) => setStatusAset(e.target.value)}
                  className='w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500'
                />
                <label htmlFor={option.value} className='text-sm text-gray-700'>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* PIC and Description */}
        <div className='space-y-4 mb-6'>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Penanggung Jawab (PIC)
            </label>
            <div className='relative'>
              <select
                value={pic}
                onChange={(e) => setPic(e.target.value)}
                className='block w-full p-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              >
                <option value=''>Pilih PIC</option>
                <option value='pic1'>Ahmad (Ketua Unit)</option>
                <option value='pic2'>Budi (Wakil Unit)</option>
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                </svg>
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Keterangan
            </label>
            <textarea
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              placeholder='Masukkan deskripsi dan detail program'
              rows={4}
              className='w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
        </div>

        {/* Additional Fields */}
        <div className='space-y-4 mb-6'>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Target Capaian
            </label>
            <textarea
              value={targetCapaian}
              onChange={(e) => setTargetCapaian(e.target.value)}
              placeholder='Masukkan target capaian program'
              rows={3}
              className='w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Dokumen Pendukung
            </label>
            <input
              type='file'
              multiple
              className='w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
            />
          </div>
        </div>

        <button
          type='submit'
          className='w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
        >
          Simpan Program Kerja
        </button>
      </form>
    </div>
  );
};

export default ProgramKerjaForm;
