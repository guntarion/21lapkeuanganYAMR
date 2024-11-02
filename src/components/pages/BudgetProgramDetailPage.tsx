import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  // BarChart,
  // Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  // Calendar,
  FileText,
  // AlertTriangle,
  CheckCircle2,
  // Clock,
  ArrowUpRight,
  // ArrowDownRight,
  // Download,
  Upload,
  Users,
  Pencil,
} from 'lucide-react';

const BudgetProgramDetailPage = () => {
  // Sample program data
  const programData = {
    id: 'YAMR-2024-KSK-SKR-001',
    name: 'Program Administrasi Terpadu',
    bidang: 'Kesekretariatan',
    unit: 'Sekretariat',
    status: 'On Track',
    pic: {
      name: 'Ahmad Subagja',
      role: 'Kepala Unit',
      avatar: '/avatar.jpg',
    },
    budget: {
      total: 120000000,
      used: 85000000,
      committed: 15000000,
      remaining: 20000000,
      monthlyData: [
        { month: 'Jan', budget: 10000000, actual: 9500000 },
        { month: 'Feb', budget: 10000000, actual: 11000000 },
        { month: 'Mar', budget: 10000000, actual: 9800000 },
      ],
    },
    timeline: [
      { date: '2024-01-15', event: 'Program Started', type: 'milestone' },
      { date: '2024-02-01', event: 'Budget Adjustment (+2M)', type: 'budget' },
      { date: '2024-02-15', event: 'Monthly Report Submitted', type: 'report' },
    ],
  };

  return (
    <div className='space-y-6'>
      {/* Header Section */}
      <div className='flex justify-between items-start'>
        <div>
          <h1 className='text-2xl font-bold'>{programData.name}</h1>
          <div className='flex items-center space-x-2 mt-2'>
            <span className='px-2 py-1 bg-gray-100 rounded text-sm'>
              {programData.id}
            </span>
            <span
              className={`px-2 py-1 rounded text-sm ${
                programData.status === 'On Track'
                  ? 'bg-green-100 text-green-800'
                  : programData.status === 'At Risk'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {programData.status}
            </span>
          </div>
        </div>
        <div className='space-x-2'>
          <Button variant='outline'>
            <Pencil className='h-4 w-4 mr-2' />
            Edit Program
          </Button>
          <Button>
            <Upload className='h-4 w-4 mr-2' />
            Input Realisasi
          </Button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card>
          <div className='p-6'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-sm text-muted-foreground'>Total Anggaran</p>
                <p className='text-2xl font-bold mt-1'>
                  Rp {programData.budget.total.toLocaleString()}
                </p>
              </div>
              <span className='px-2 py-1 bg-gray-100 rounded text-sm'>
                Yearly
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <div className='p-6'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-sm text-muted-foreground'>Realisasi</p>
                <p className='text-2xl font-bold mt-1'>
                  Rp {programData.budget.used.toLocaleString()}
                </p>
              </div>
              <span className='text-green-600'>
                {(
                  (programData.budget.used / programData.budget.total) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <div className='p-6'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-sm text-muted-foreground'>Committed</p>
                <p className='text-2xl font-bold mt-1'>
                  Rp {programData.budget.committed.toLocaleString()}
                </p>
              </div>
              <span className='text-yellow-600'>
                {(
                  (programData.budget.committed / programData.budget.total) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <div className='p-6'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-sm text-muted-foreground'>Sisa</p>
                <p className='text-2xl font-bold mt-1'>
                  Rp {programData.budget.remaining.toLocaleString()}
                </p>
              </div>
              <span className='text-blue-600'>
                {(
                  (programData.budget.remaining / programData.budget.total) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='md:col-span-2 space-y-4'>
          {/* Budget Trend Chart */}
          <Card>
            <div className='p-6'>
              <h3 className='text-lg font-semibold mb-4'>
                Budget vs Realization Trend
              </h3>
              <div className='h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={programData.budget.monthlyData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='month' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type='monotone'
                      dataKey='budget'
                      stroke='#8884d8'
                      name='Budget'
                    />
                    <Line
                      type='monotone'
                      dataKey='actual'
                      stroke='#82ca9d'
                      name='Actual'
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          {/* Recent Activities */}
          <Card>
            <div className='p-6'>
              <h3 className='text-lg font-semibold mb-4'>Recent Activities</h3>
              <div className='space-y-4'>
                {programData.timeline.map((event, index) => (
                  <div key={index} className='flex items-start space-x-4'>
                    {event.type === 'milestone' && (
                      <CheckCircle2 className='h-5 w-5 text-green-500' />
                    )}
                    {event.type === 'budget' && (
                      <ArrowUpRight className='h-5 w-5 text-blue-500' />
                    )}
                    {event.type === 'report' && (
                      <FileText className='h-5 w-5 text-orange-500' />
                    )}
                    <div>
                      <p className='font-medium'>{event.event}</p>
                      <p className='text-sm text-muted-foreground'>
                        {event.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className='space-y-4'>
          {/* Program Info */}
          <Card>
            <div className='p-6'>
              <h3 className='text-lg font-semibold mb-4'>Program Info</h3>
              <div className='space-y-4'>
                <div>
                  <p className='text-sm text-muted-foreground'>PIC</p>
                  <div className='flex items-center space-x-2 mt-1'>
                    <div className='h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center'>
                      <span className='text-sm font-medium'>AS</span>
                    </div>
                    <div>
                      <p className='font-medium'>{programData.pic.name}</p>
                      <p className='text-sm text-muted-foreground'>
                        {programData.pic.role}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className='text-sm text-muted-foreground'>Bidang</p>
                  <p className='font-medium'>{programData.bidang}</p>
                </div>

                <div>
                  <p className='text-sm text-muted-foreground'>Unit</p>
                  <p className='font-medium'>{programData.unit}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <div className='p-6'>
              <h3 className='text-lg font-semibold mb-4'>Quick Actions</h3>
              <div className='space-y-2'>
                <Button variant='outline' className='w-full justify-start'>
                  <FileText className='h-4 w-4 mr-2' />
                  Generate Report
                </Button>
                <Button variant='outline' className='w-full justify-start'>
                  <Upload className='h-4 w-4 mr-2' />
                  Upload Document
                </Button>
                <Button variant='outline' className='w-full justify-start'>
                  <Users className='h-4 w-4 mr-2' />
                  Manage Team
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BudgetProgramDetailPage;
