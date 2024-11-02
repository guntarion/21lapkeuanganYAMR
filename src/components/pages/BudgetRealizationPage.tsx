import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Search } from 'lucide-react';

const BudgetRealizationPage = () => {
  const [selectedYear, setSelectedYear] = React.useState('2024');
  const [selectedBidang, setSelectedBidang] = React.useState('all');

  // Sample data - would come from your database
  const monthlyData = [
    { month: 'Jan', budget: 50000000, actual: 48000000, variance: -2000000 },
    { month: 'Feb', budget: 45000000, actual: 46500000, variance: 1500000 },
    { month: 'Mar', budget: 55000000, actual: 52000000, variance: -3000000 },
  ];

  const programData = [
    {
      id: 'YAMR-2024-KSK-SKR-001',
      name: 'Program Administrasi',
      unit: 'Sekretariat',
      bidang: 'Kesekretariatan',
      totalBudget: 120000000,
      actualSpent: 115000000,
      status: 'On Track',
      variance: -5000000,
      percentageUsed: 95.83,
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card>
          <div className='p-6'>
            <h3 className='text-sm font-medium text-muted-foreground'>
              Total Anggaran
            </h3>
            <div className='mt-2'>
              <span className='text-2xl font-bold'>Rp 600.000.000</span>
              <p className='text-xs text-muted-foreground mt-1'>Tahun 2024</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className='p-6'>
            <h3 className='text-sm font-medium text-muted-foreground'>
              Realisasi
            </h3>
            <div className='mt-2'>
              <span className='text-2xl font-bold'>Rp 515.000.000</span>
              <p className='text-xs text-muted-foreground mt-1'>
                85.83% dari anggaran
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className='p-6'>
            <h3 className='text-sm font-medium text-muted-foreground'>
              Sisa Anggaran
            </h3>
            <div className='mt-2'>
              <span className='text-2xl font-bold'>Rp 85.000.000</span>
              <p className='text-xs text-muted-foreground mt-1'>
                14.17% tersisa
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className='p-6'>
            <h3 className='text-sm font-medium text-muted-foreground'>
              Program Status
            </h3>
            <div className='mt-2'>
              <span className='text-2xl font-bold'>45/50</span>
              <p className='text-xs text-muted-foreground mt-1'>
                Program on track
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className='p-4'>
          <div className='flex flex-wrap gap-4'>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className='w-[180px] rounded-md border border-input bg-background px-3 py-2'
            >
              <option value='2024'>2024</option>
              <option value='2023'>2023</option>
            </select>

            <select
              value={selectedBidang}
              onChange={(e) => setSelectedBidang(e.target.value)}
              className='w-[180px] rounded-md border border-input bg-background px-3 py-2'
            >
              <option value='all'>Semua Bidang</option>
              <option value='KSK'>Kesekretariatan</option>
              <option value='KAG'>Keagamaan</option>
              <option value='SOS'>Sosial</option>
              <option value='KMN'>Kemanusiaan</option>
            </select>

            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input placeholder='Cari program...' className='pl-8' />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <div className='space-y-4'>
        <Card>
          <div className='p-6'>
            <h3 className='text-lg font-semibold mb-4'>
              Budget vs Realization Trend
            </h3>
            <div className='h-[400px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey='budget' fill='#8884d8' name='Budget' />
                  <Bar dataKey='actual' fill='#82ca9d' name='Actual' />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Card>
            <div className='p-6'>
              <h3 className='text-lg font-semibold mb-4'>
                Persentase Realisasi per Bidang
              </h3>
              <div className='h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart
                    data={[
                      { name: 'Kesekretariatan', percentage: 85 },
                      { name: 'Keagamaan', percentage: 78 },
                      { name: 'Sosial', percentage: 92 },
                      { name: 'Kemanusiaan', percentage: 88 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey='percentage' fill='#8884d8' />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          <Card>
            <div className='p-6'>
              <h3 className='text-lg font-semibold mb-4'>
                Program Status Overview
              </h3>
              <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <span>On Track</span>
                  <span className='text-green-600'>45</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span>At Risk</span>
                  <span className='text-yellow-600'>3</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span>Over Budget</span>
                  <span className='text-red-600'>2</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span>Completed</span>
                  <span className='text-blue-600'>15</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b'>
                  <th className='p-4 text-left'>Kode Program</th>
                  <th className='p-4 text-left'>Nama Program</th>
                  <th className='p-4 text-left'>Unit</th>
                  <th className='p-4 text-right'>Anggaran</th>
                  <th className='p-4 text-right'>Realisasi</th>
                  <th className='p-4 text-right'>Variance</th>
                  <th className='p-4 text-center'>Status</th>
                  <th className='p-4 text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {programData.map((program) => (
                  <tr key={program.id} className='border-b'>
                    <td className='p-4'>{program.id}</td>
                    <td className='p-4'>{program.name}</td>
                    <td className='p-4'>{program.unit}</td>
                    <td className='p-4 text-right'>
                      Rp {program.totalBudget.toLocaleString()}
                    </td>
                    <td className='p-4 text-right'>
                      Rp {program.actualSpent.toLocaleString()}
                    </td>
                    <td className='p-4 text-right'>
                      <span
                        className={
                          program.variance < 0
                            ? 'text-red-600'
                            : 'text-green-600'
                        }
                      >
                        Rp {Math.abs(program.variance).toLocaleString()}
                      </span>
                    </td>
                    <td className='p-4 text-center'>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          program.status === 'On Track'
                            ? 'bg-green-100 text-green-800'
                            : program.status === 'At Risk'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {program.status}
                      </span>
                    </td>
                    <td className='p-4 text-center'>
                      <Button variant='outline' size='sm'>
                        Detail
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BudgetRealizationPage;
