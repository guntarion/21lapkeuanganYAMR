import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface ProgramKerja {
  id: string;
  kode: string;
  nama: string;
  bidang: string;
  unit: string;
  jenis: string;
  status: string;
  pic: string;
}

// Sample data - in real app this would come from an API/database
const samplePrograms: ProgramKerja[] = [
  {
    id: '1',
    kode: 'YAMR-2024-SK-SEK-001',
    nama: 'Program Pengembangan SDM',
    bidang: 'KESEKRETARIATAN',
    unit: 'SEKRETARIAT',
    jenis: 'Pengeluaran',
    status: 'Terencana',
    pic: 'Ahmad (Ketua Unit)',
  },
  {
    id: '2',
    kode: 'YAMR-2024-AG-TKM-001',
    nama: 'Program Kajian Rutin',
    bidang: 'KEAGAMAAN',
    unit: 'KETAKMIRAN',
    jenis: 'Pengeluaran',
    status: 'Terencana',
    pic: 'Budi (Wakil Unit)',
  },
];

interface ProgramKerjaListProps {
  onEdit?: (program: ProgramKerja) => void;
  onDelete?: (program: ProgramKerja) => void;
}

const ProgramKerjaList: React.FC<ProgramKerjaListProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-900'>
          Daftar Program Kerja
        </h2>
        <div className='flex gap-2'>
          <input
            type='text'
            placeholder='Cari program...'
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
                Nama Program
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                Bidang
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                Unit
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                Jenis
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                Status
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                PIC
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {samplePrograms.map((program) => (
              <tr
                key={program.id}
                className='border-b border-gray-200 hover:bg-gray-50'
              >
                <td className='px-4 py-3 text-sm text-gray-600'>
                  {program.kode}
                </td>
                <td className='px-4 py-3 text-sm text-gray-900 font-medium'>
                  {program.nama}
                </td>
                <td className='px-4 py-3 text-sm text-gray-600'>
                  {program.bidang}
                </td>
                <td className='px-4 py-3 text-sm text-gray-600'>
                  {program.unit}
                </td>
                <td className='px-4 py-3 text-sm text-gray-600'>
                  {program.jenis}
                </td>
                <td className='px-4 py-3 text-sm'>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      program.status === 'Terencana'
                        ? 'bg-green-100 text-green-800'
                        : program.status === 'Pengajuan'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {program.status}
                  </span>
                </td>
                <td className='px-4 py-3 text-sm text-gray-600'>
                  {program.pic}
                </td>
                <td className='px-4 py-3 text-sm'>
                  <div className='flex space-x-2'>
                    <button
                      onClick={() => onEdit?.(program)}
                      className='p-1 text-blue-600 hover:text-blue-800'
                      title='Edit'
                    >
                      <Pencil className='h-4 w-4' />
                    </button>
                    <button
                      onClick={() => onDelete?.(program)}
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

export default ProgramKerjaList;
