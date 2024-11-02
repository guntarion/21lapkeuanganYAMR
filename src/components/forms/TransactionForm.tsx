import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface TransactionFormProps {
  className?: string;
  type?: 'pemasukan' | 'pengeluaran';
}

interface FormErrors {
  [key: string]: string;
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

const TransactionForm: React.FC<TransactionFormProps> = ({
  className = '',
  type,
}) => {
  const location = useLocation();
  const [transactionType, setTransactionType] = useState(
    type === 'pemasukan'
      ? 'income'
      : type === 'pengeluaran'
      ? 'expense'
      : 'income'
  );
  const [bidang, setBidang] = useState('');
  const [unit, setUnit] = useState('');
  const [isPlannedProgram, setIsPlannedProgram] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [entity, setEntity] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Set the transaction type based on the route
  useEffect(() => {
    if (location.pathname === '/input/pemasukan') {
      setTransactionType('income');
    } else if (location.pathname === '/input/pengeluaran') {
      setTransactionType('expense');
    }
  }, [location.pathname]);

  // Sample data structure for Program Kerja
  const programKerja = {
    SK: {
      SEK: [
        { id: 1, name: 'Program Administrasi', budget: 1000000 },
        { id: 2, name: 'Program Pengembangan SDM', budget: 2000000 },
      ],
    },
  };

  // Sample data structure for Chart of Accounts
  const chartOfAccounts = {
    income: [
      { code: '4101', name: 'Pendapatan Donasi' },
      { code: '4102', name: 'Pendapatan Program' },
      { code: '4103', name: 'Pendapatan Zakat' },
    ],
    expense: [
      { code: '5101', name: 'Biaya Operasional' },
      { code: '5102', name: 'Biaya Program' },
      { code: '5103', name: 'Biaya Pegawai' },
    ],
  };

  const handleBidangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBidang = e.target.value;
    setBidang(newBidang);
    setUnit(''); // Reset unit when bidang changes
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!bidang) newErrors.bidang = 'Bidang harus dipilih';
    if (!unit) newErrors.unit = 'Unit harus dipilih';
    if (!selectedAccount) newErrors.selectedAccount = 'Kode akun harus dipilih';
    if (!amount) newErrors.amount = 'Jumlah harus diisi';
    if (!entity) newErrors.entity = 'Entitas terkait harus diisi';
    if (!description) newErrors.description = 'Keterangan harus diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log({
        transactionType,
        bidang,
        unit,
        isPlannedProgram,
        selectedAccount,
        amount,
        entity,
        description,
      });

      setSubmitSuccess(true);
      // Reset form
      setBidang('');
      setUnit('');
      setSelectedAccount('');
      setAmount('');
      setEntity('');
      setDescription('');
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get the page title based on the route
  const getPageTitle = () => {
    if (location.pathname === '/input/pemasukan') {
      return 'Input Pemasukan';
    } else if (location.pathname === '/input/pengeluaran') {
      return 'Input Pengeluaran';
    }
    return 'Input Transaksi';
  };

  return (
    <div className='p-6 bg-white'>
      <h1 className='text-2xl font-semibold text-gray-900 mb-6'>
        {getPageTitle()}
      </h1>
      <form onSubmit={handleSubmit} className={`w-full max-w-3xl ${className}`}>
        {submitSuccess && (
          <div className='mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg'>
            Transaksi berhasil disimpan!
          </div>
        )}

        <div className='space-y-6'>
          {/* Transaction Type Selection - Only show if not on a specific route */}
          {!type && (
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                Jenis Transaksi
              </label>
              <div className='flex space-x-6'>
                <label
                  className={`inline-flex items-center px-4 py-2 rounded-lg border cursor-pointer hover:bg-gray-50 ${
                    transactionType === 'income'
                      ? 'bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-200 text-gray-700'
                  }`}
                >
                  <input
                    type='radio'
                    className='w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500'
                    name='transactionType'
                    value='income'
                    checked={transactionType === 'income'}
                    onChange={(e) => setTransactionType(e.target.value)}
                  />
                  <span
                    className={`ml-2 font-medium ${
                      transactionType === 'income'
                        ? 'text-blue-600'
                        : 'text-gray-700'
                    }`}
                  >
                    Pemasukan
                  </span>
                </label>
                <label
                  className={`inline-flex items-center px-4 py-2 rounded-lg border cursor-pointer hover:bg-gray-50 ${
                    transactionType === 'expense'
                      ? 'bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-200 text-gray-700'
                  }`}
                >
                  <input
                    type='radio'
                    className='w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500'
                    name='transactionType'
                    value='expense'
                    checked={transactionType === 'expense'}
                    onChange={(e) => setTransactionType(e.target.value)}
                  />
                  <span
                    className={`ml-2 font-medium ${
                      transactionType === 'expense'
                        ? 'text-blue-600'
                        : 'text-gray-700'
                    }`}
                  >
                    Pengeluaran
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Rest of the form remains unchanged */}
          {/* Bidang and Unit Selection */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <label
                htmlFor='bidang'
                className='block text-sm font-medium text-gray-700'
              >
                Bidang
              </label>
              <div className='relative'>
                <select
                  id='bidang'
                  value={bidang}
                  onChange={handleBidangChange}
                  className={`block w-full p-2.5 bg-white border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.bidang ? 'border-red-500' : 'border-gray-300'
                  }`}
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
              {errors.bidang && (
                <p className='mt-1 text-sm text-red-500'>{errors.bidang}</p>
              )}
            </div>

            <div className='space-y-2'>
              <label
                htmlFor='unit'
                className='block text-sm font-medium text-gray-700'
              >
                Unit
              </label>
              <div className='relative'>
                <select
                  id='unit'
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className={`block w-full p-2.5 bg-white border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.unit ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={!bidang}
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
              {errors.unit && (
                <p className='mt-1 text-sm text-red-500'>{errors.unit}</p>
              )}
            </div>
          </div>

          {/* Program Selection */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='program'
                className='block text-sm font-medium text-gray-700'
              >
                Program Kerja
              </label>
              <div className='flex items-center space-x-2'>
                <input
                  id='isPlannedProgram'
                  type='checkbox'
                  checked={isPlannedProgram}
                  onChange={(e) => setIsPlannedProgram(e.target.checked)}
                  className='w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500'
                />
                <label
                  htmlFor='isPlannedProgram'
                  className='text-sm text-gray-600'
                >
                  Program Terencana
                </label>
              </div>
            </div>

            {isPlannedProgram ? (
              <div className='relative'>
                <select
                  id='program'
                  className='block w-full p-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  disabled={!bidang || !unit}
                >
                  <option value=''>Pilih program</option>
                  {programKerja[bidang as keyof typeof programKerja]?.[
                    unit as keyof (typeof programKerja)[keyof typeof programKerja]
                  ]?.map((program) => (
                    <option key={program.id} value={program.id.toString()}>
                      {program.name} (Budget: Rp{' '}
                      {program.budget.toLocaleString()})
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
            ) : (
              <input
                type='text'
                id='newProgram'
                placeholder='Masukkan nama program baru'
                className='w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              />
            )}
          </div>

          {/* Account Selection */}
          <div className='space-y-2'>
            <label
              htmlFor='account'
              className='block text-sm font-medium text-gray-700'
            >
              Kode Akun
            </label>
            <div className='relative'>
              <select
                id='account'
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className={`block w-full p-2.5 bg-white border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.selectedAccount ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value=''>Pilih kode akun</option>
                {chartOfAccounts[
                  transactionType as keyof typeof chartOfAccounts
                ]?.map((account) => (
                  <option key={account.code} value={account.code}>
                    {account.code} - {account.name}
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
            {errors.selectedAccount && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.selectedAccount}
              </p>
            )}
          </div>

          {/* Amount and Details */}
          <div className='space-y-4'>
            <div className='space-y-2'>
              <label
                htmlFor='amount'
                className='block text-sm font-medium text-gray-700'
              >
                Jumlah
              </label>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
                  Rp
                </span>
                <input
                  id='amount'
                  type='number'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder='0'
                  className={`w-full pl-10 p-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.amount ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.amount && (
                <p className='mt-1 text-sm text-red-500'>{errors.amount}</p>
              )}
            </div>

            <div className='space-y-2'>
              <label
                htmlFor='entity'
                className='block text-sm font-medium text-gray-700'
              >
                Entitas Terkait
              </label>
              <input
                id='entity'
                type='text'
                value={entity}
                onChange={(e) => setEntity(e.target.value)}
                placeholder='Nama orang/badan/organisasi'
                className={`w-full p-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.entity ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.entity && (
                <p className='mt-1 text-sm text-red-500'>{errors.entity}</p>
              )}
            </div>

            <div className='space-y-2'>
              <label
                htmlFor='description'
                className='block text-sm font-medium text-gray-700'
              >
                Keterangan
              </label>
              <textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Deskripsi detail transaksi'
                rows={3}
                className={`w-full p-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Attachment */}
          <div className='space-y-2'>
            <label
              htmlFor='attachment'
              className='block text-sm font-medium text-gray-700'
            >
              Lampiran
            </label>
            <input
              id='attachment'
              type='file'
              className='w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
            />
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className={`w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
              isSubmitting
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Menyimpan...' : 'Submit Transaksi'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
