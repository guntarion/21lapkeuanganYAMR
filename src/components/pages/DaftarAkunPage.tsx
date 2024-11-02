import React, { useState } from 'react';
import DaftarAkunForm from '../forms/DaftarAkunForm';
import DaftarAkunList from './DaftarAkunList';

const DaftarAkunPage = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'form'>('list');

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-semibold text-gray-900'>Kode Akun</h1>
        {activeTab === 'list' && (
          <button
            onClick={() => setActiveTab('form')}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Tambah Akun
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className='border-b border-gray-200 mb-6'>
        <nav className='-mb-px flex space-x-8'>
          <button
            onClick={() => setActiveTab('list')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'list'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Daftar Akun
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'form'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Input Akun
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'list' ? (
        <DaftarAkunList
          onEdit={(akun) => {
            console.log('Edit akun:', akun);
            setActiveTab('form');
          }}
          onDelete={(akun) => {
            console.log('Delete akun:', akun);
            // Implement delete confirmation and handling
          }}
        />
      ) : (
        <DaftarAkunForm />
      )}
    </div>
  );
};

export default DaftarAkunPage;
