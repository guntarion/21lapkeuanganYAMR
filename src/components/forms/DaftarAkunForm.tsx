import React, { useState } from 'react';

interface DaftarAkunFormProps {
  className?: string;
}

const DaftarAkunForm: React.FC<DaftarAkunFormProps> = ({ className = '' }) => {
  const [kodeAkun, setKodeAkun] = useState('');
  const [namaAkun, setNamaAkun] = useState('');
  const [kategori, setKategori] = useState('');
  const [tipeAkun, setTipeAkun] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [statusAktif, setStatusAktif] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      kodeAkun,
      namaAkun,
      kategori,
      tipeAkun,
      deskripsi,
      statusAktif,
    });
  };

  return (
    <div className='p-6 bg-white'>
      <form onSubmit={handleSubmit} className={`w-full max-w-3xl ${className}`}>
        {/* Kode Akun */}
        <div className='space-y-2 mb-6'>
          <label className='block text-sm font-medium text-gray-700'>
            Kode Akun
          </label>
          <input
            type='text'
            value={kodeAkun}
            onChange={(e) => setKodeAkun(e.target.value)}
            placeholder='Contoh: 4101'
            className='w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          />
        </div>

        {/* Nama Akun */}
        <div className='space-y-2 mb-6'>
          <label className='block text-sm font-medium text-gray-700'>
            Nama Akun
          </label>
          <input
            type='text'
            value={namaAkun}
            onChange={(e) => setNamaAkun(e.target.value)}
            placeholder='Contoh: Pendapatan Donasi'
            className='w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          />
        </div>

        {/* Kategori and Tipe */}
        <div className='grid grid-cols-2 gap-4 mb-6'>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Kategori
            </label>
            <div className='relative'>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className='block w-full p-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              >
                <option value=''>Pilih kategori</option>
                <option value='aset'>Aset</option>
                <option value='kewajiban'>Kewajiban</option>
                <option value='ekuitas'>Ekuitas</option>
                <option value='pendapatan'>Pendapatan</option>
                <option value='beban'>Beban</option>
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
              Tipe Akun
            </label>
            <div className='relative'>
              <select
                value={tipeAkun}
                onChange={(e) => setTipeAkun(e.target.value)}
                className='block w-full p-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              >
                <option value=''>Pilih tipe</option>
                <option value='debit'>Debit</option>
                <option value='kredit'>Kredit</option>
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

        {/* Deskripsi */}
        <div className='space-y-2 mb-6'>
          <label className='block text-sm font-medium text-gray-700'>
            Deskripsi
          </label>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder='Masukkan deskripsi akun'
            rows={3}
            className='w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          />
        </div>

        {/* Status Aktif */}
        <div className='flex items-center space-x-2 mb-6'>
          <input
            type='checkbox'
            id='statusAktif'
            checked={statusAktif}
            onChange={(e) => setStatusAktif(e.target.checked)}
            className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
          />
          <label
            htmlFor='statusAktif'
            className='text-sm font-medium text-gray-700'
          >
            Akun Aktif
          </label>
        </div>

        <button
          type='submit'
          className='w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
        >
          Simpan Akun
        </button>
      </form>
    </div>
  );
};

export default DaftarAkunForm;
