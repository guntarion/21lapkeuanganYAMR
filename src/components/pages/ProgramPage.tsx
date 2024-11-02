import React, { useState } from 'react';
import ProgramKerjaForm from '../forms/ProgramKerjaForm';
import ProgramKerjaList from './ProgramKerjaList';

const ProgramPage = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'form'>('list');

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-semibold text-gray-900'>Program Kerja</h1>
        {activeTab === 'list' && (
          <button
            onClick={() => setActiveTab('form')}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Tambah Program Kerja
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
            Daftar Program
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'form'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Input Program
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'list' ? (
        <ProgramKerjaList
          onEdit={(program) => {
            console.log('Edit program:', program);
            setActiveTab('form');
          }}
          onDelete={(program) => {
            console.log('Delete program:', program);
            // Implement delete confirmation and handling
          }}
        />
      ) : (
        <ProgramKerjaForm />
      )}
    </div>
  );
};

export default ProgramPage;
