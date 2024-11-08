import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Database,
  Calendar,
  CheckCircle,
  AlertCircle,
  //   Plus,
} from 'lucide-react';

const ProgramMonitoringPage = () => {
  const navigate = useNavigate();
  // Sample data - replace with actual data from your backend
  const [programs] = useState([
    {
      id: 1,
      title: 'Kajian Kesehatan: Bekam',
      category: 'Aktivitas',
      status: 'Ongoing',
      startDate: '2024-11-01',
      isEvaluated: false,
    },
    {
      id: 2,
      title: 'Santunan Anak Yatim',
      category: 'Kegiatan',
      status: 'Completed',
      startDate: '2024-11-05',
      isEvaluated: true,
      evaluation: {
        attendance: 85,
        engagement: 'High',
        budgetAdherence: 'On Budget',
        feedback: 'Positive',
      },
    },
    {
      id: 3,
      title: 'Renovasi Kamar Mandi Pria',
      category: 'Pengadaan',
      status: 'Ongoing',
      startDate: '2024-11-03',
      isEvaluated: false,
    },
  ]);

  const CategoryIcon = ({ category }) => {
    switch (category) {
      case 'Aktivitas':
        return <CheckCircle className='h-5 w-5 text-green-500' />;
      case 'Kegiatan':
        return <Calendar className='h-5 w-5 text-blue-500' />;
      case 'Pengadaan':
        return <Database className='h-5 w-5 text-purple-500' />;
      default:
        return <AlertCircle className='h-5 w-5 text-gray-500' />;
    }
  };

  const handleEvaluate = (programId: number) => {
    navigate(`/monitoring/program/evaluate/${programId}`);
  };

  return (
    <div className='p-6 space-y-6'>
      {/* ... rest of your JSX ... */}
      {programs
        .filter((p) => !p.isEvaluated)
        .map((program) => (
          <div
            key={program.id}
            className='flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50'
          >
            <div className='flex items-center gap-4'>
              <CategoryIcon category={program.category} />
              <div>
                <h3 className='font-medium'>{program.title}</h3>
                <p className='text-sm text-gray-500'>
                  {program.category} • Started {program.startDate}
                </p>
              </div>
            </div>
            <Button
              variant='outline'
              onClick={() => handleEvaluate(program.id)}
            >
              Evaluate
            </Button>
          </div>
        ))}

      {/* Current Month Programs */}
      <Card>
        <CardHeader>
          <CardTitle>Current Month Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {programs
              .filter((p) => !p.isEvaluated)
              .map((program) => (
                <div
                  key={program.id}
                  className='flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50'
                >
                  <div className='flex items-center gap-4'>
                    <CategoryIcon category={program.category} />
                    <div>
                      <h3 className='font-medium'>{program.title}</h3>
                      <p className='text-sm text-gray-500'>
                        {program.category} • Started {program.startDate}
                      </p>
                    </div>
                  </div>
                  <Button variant='outline'>Evaluate</Button>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Evaluated Programs */}
      <Card>
        <CardHeader>
          <CardTitle>Evaluated Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {programs
              .filter((p) => p.isEvaluated)
              .map((program) => (
                <div
                  key={program.id}
                  className='p-4 border rounded-lg hover:bg-gray-50'
                >
                  <div className='flex items-center gap-4 mb-3'>
                    <CategoryIcon category={program.category} />
                    <div>
                      <h3 className='font-medium'>{program.title}</h3>
                      <p className='text-sm text-gray-500'>
                        {program.category} • Completed
                      </p>
                    </div>
                  </div>
                  {program.evaluation && (
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-2'>
                      <div className='text-sm'>
                        <span className='text-gray-500'>Attendance:</span>
                        <span className='ml-2'>
                          {program.evaluation.attendance}%
                        </span>
                      </div>
                      <div className='text-sm'>
                        <span className='text-gray-500'>Engagement:</span>
                        <span className='ml-2'>
                          {program.evaluation.engagement}
                        </span>
                      </div>
                      <div className='text-sm'>
                        <span className='text-gray-500'>Budget:</span>
                        <span className='ml-2'>
                          {program.evaluation.budgetAdherence}
                        </span>
                      </div>
                      <div className='text-sm'>
                        <span className='text-gray-500'>Feedback:</span>
                        <span className='ml-2'>
                          {program.evaluation.feedback}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramMonitoringPage;
