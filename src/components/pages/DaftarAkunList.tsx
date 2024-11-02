import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface Akun {
  id: string;
  kodeAkun: string;
  namaAkun: string;
  kategori: string;
  tipeAkun: string;
  deskripsi: string;
  statusAktif: boolean;
}

// Sample data - in real app this would come from an API/database
const sampleAkun: Akun[] = [
  {
    id: '1',
    kodeAkun: '4101',
    namaAkun: 'Pendapatan Donasi',
    kategori: 'Pendapatan',
    tipeAkun: 'Kredit',
    deskripsi: 'Pendapatan yang berasal dari donasi',
    statusAktif: true,
  },
  {
    id: '2',
    kodeAkun: '4102',
    namaAkun: 'Pendapatan Program',
    kategori: 'Pendapatan',
    tipeAkun: 'Kredit',
    deskripsi: 'Pendapatan yang berasal dari program',
    statusAktif: true,
  },
  {
    id: '3',
    kodeAkun: '5101',
    namaAkun: 'Biaya Operasional',
    kategori: 'Beban',
    tipeAkun: 'Debit',
    deskripsi: 'Biaya operasional rutin',
    statusAktif: true,
  },
];

interface DaftarAkunListProps {
  onEdit?: (akun: Akun) => void;
  onDelete?: (akun: Akun) => void;
}

const DaftarAkunList: React.FC<DaftarAkunListProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-900'>Daftar Akun</h2>
        <div className='flex gap-2'>
          <select className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
            <option value=''>Semua Kategori</option>
            <option value='aset'>Aset</option>
            <option value='kewajiban'>Kewajiban</option>
            <option value='ekuitas'>Ekuitas</option>
            <option value='pendapatan'>Pendapatan</option>
            <option value='beban'>Beban</option>
          </select>
          <input
            type='text'
            placeholder='Cari akun...'
            className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          />
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full border-collapse table-auto'>
          <thead>
            <tr className='bg-gray-50 border-b border-gray-200'>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                Kode
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                Nama Akun
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                Kategori
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                Tipe
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                Status
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {sampleAkun.map((akun) => (
              <tr
                key={akun.id}
                className='border-b border-gray-200 hover:bg-gray-50'
              >
                <td className='px-4 py-3 text-sm text-gray-600'>
                  {akun.kodeAkun}
                </td>
                <td className='px-4 py-3 text-sm text-gray-900 font-medium'>
                  {akun.namaAkun}
                  {akun.deskripsi && (
                    <p className='text-xs text-gray-500 mt-1'>
                      {akun.deskripsi}
                    </p>
                  )}
                </td>
                <td className='px-4 py-3 text-sm text-gray-600'>
                  {akun.kategori}
                </td>
                <td className='px-4 py-3 text-sm text-gray-600'>
                  {akun.tipeAkun}
                </td>
                <td className='px-4 py-3 text-sm'>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      akun.statusAktif
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {akun.statusAktif ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className='px-4 py-3 text-sm'>
                  <div className='flex space-x-2'>
                    <button
                      onClick={() => onEdit?.(akun)}
                      className='p-1 text-blue-600 hover:text-blue-800'
                      title='Edit'
                    >
                      <Pencil className='h-4 w-4' />
                    </button>
                    <button
                      onClick={() => onDelete?.(akun)}
                      className='p-1 text-red-600 hover:text-red-800'
                      title='Hapus'
                    >
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarAkunList;
