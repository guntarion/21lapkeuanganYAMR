import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type {
  Program,
  ProgramCategory,
  ProgramEvaluation,
} from '../../types/program';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars
interface EvaluationFormData
  extends Omit<ProgramEvaluation, 'id' | 'programId'> {}

const ProgramEvaluationForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [program, setProgram] = useState<Program | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<ProgramCategory>('Aktivitas');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await mockFetchProgram(parseInt(id || '0'));
        setProgram(response);
        setSelectedCategory(response.category);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch program'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value as ProgramCategory);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await mockSubmitEvaluation({
        programId: parseInt(id || '0'),
        category: selectedCategory,
        ...Object.fromEntries(formData.entries()),
      });
      navigate('/monitoring/program');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to submit evaluation'
      );
    }
  };

  const handleCancel = () => {
    navigate('/monitoring/program');
  };

  if (loading) return <div className='p-6'>Loading...</div>;
  if (error) return <div className='p-6 text-red-500'>Error: {error}</div>;
  if (!program) return <div className='p-6'>Program not found</div>;

  return (
    <Card className='max-w-2xl mx-auto m-6'>
      <CardHeader>
        <CardTitle>Evaluate Program: {program.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Program Details */}
          <div className='space-y-4'>
            <h3 className='font-medium'>Program Details</h3>
            <div>
              <label className='block text-sm font-medium mb-1'>Title</label>
              <Input value={program.title} disabled />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Category</label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className='w-full border rounded-md p-2'
                required
              >
                <option value='Aktivitas'>Aktivitas</option>
                <option value='Kegiatan'>Kegiatan</option>
                <option value='Pengadaan'>Pengadaan</option>
              </select>
            </div>
          </div>

          {/* Category-specific evaluation fields */}
          {selectedCategory === 'Aktivitas' && (
            <div className='space-y-4'>
              <h3 className='font-medium'>Evaluation for Aktivitas</h3>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Status Completion (%)
                </label>
                <Input
                  type='number'
                  name='statusCompletion'
                  min='0'
                  max='100'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Timeline Adherence
                </label>
                <select
                  name='timelineAdherence'
                  className='w-full border rounded-md p-2'
                  required
                >
                  <option value='On Time'>Tepat Waktu</option>
                  <option value='Slightly Delayed'>
                    Sedikit Mundur Jadwal
                  </option>
                  <option value='Significantly Delayed'>
                    Mundur dari Jadwal
                  </option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Tantangan yang Dihadapi
                </label>
                <textarea
                  name='challenges'
                  className='w-full border rounded-md p-2'
                  rows={3}
                  required
                  placeholder='Jelaskan tantangan yang dihadapi selama pelaksanaan'
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Pembelajaran yang Didapat
                </label>
                <textarea
                  name='lessonsLearned'
                  className='w-full border rounded-md p-2'
                  rows={3}
                  required
                  placeholder='Apa yang bisa dipelajari untuk perbaikan ke depan'
                />
              </div>
            </div>
          )}

          {selectedCategory === 'Kegiatan' && (
            <div className='space-y-4'>
              <h3 className='font-medium'>Evaluation for Kegiatan</h3>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Jumlah Peserta
                </label>
                <Input
                  type='number'
                  name='attendance'
                  min='0'
                  required
                  placeholder='Total peserta yang hadir'
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Tingkat Partisipasi Peserta
                </label>
                <select
                  name='participantEngagement'
                  className='w-full border rounded-md p-2'
                  required
                >
                  <option value='Very High'>Sangat Tinggi</option>
                  <option value='High'>Tinggi</option>
                  <option value='Moderate'>Cukup</option>
                  <option value='Low'>Rendah</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Kesesuaian dengan Anggaran
                </label>
                <select
                  name='budgetAdherence'
                  className='w-full border rounded-md p-2'
                  required
                >
                  <option value='Under Budget'>Di Bawah Anggaran</option>
                  <option value='On Budget'>Sesuai Anggaran</option>
                  <option value='Over Budget'>Melebihi Anggaran</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Tanggapan Peserta
                </label>
                <textarea
                  name='communityFeedback'
                  className='w-full border rounded-md p-2'
                  rows={3}
                  required
                  placeholder='Bagaimana tanggapan dan masukan dari peserta'
                />
              </div>
            </div>
          )}

          {selectedCategory === 'Pengadaan' && (
            <div className='space-y-4'>
              <h3 className='font-medium'>Evaluation for Pengadaan</h3>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Efektivitas Biaya
                </label>
                <select
                  name='costEffectiveness'
                  className='w-full border rounded-md p-2'
                  required
                >
                  <option value='Very Cost-Effective'>Sangat Efektif</option>
                  <option value='Moderately Cost-Effective'>
                    Cukup Efektif
                  </option>
                  <option value='Not Cost-Effective'>Kurang Efektif</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Penilaian Kualitas
                </label>
                <select
                  name='qualityAssessment'
                  className='w-full border rounded-md p-2'
                  required
                >
                  <option value='Excellent'>Sangat Baik</option>
                  <option value='Good'>Baik</option>
                  <option value='Fair'>Cukup</option>
                  <option value='Poor'>Kurang</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Kinerja Supplier
                </label>
                <textarea
                  name='supplierPerformance'
                  className='w-full border rounded-md p-2'
                  rows={3}
                  required
                  placeholder='Bagaimana kinerja dan layanan dari supplier'
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Penilaian Penggunaan
                </label>
                <textarea
                  name='usageAssessment'
                  className='w-full border rounded-md p-2'
                  rows={3}
                  required
                  placeholder='Bagaimana efektivitas penggunaan barang/jasa yang diadakan'
                />
              </div>
            </div>
          )}

          {/* Common fields */}
          <div>
            <label className='block text-sm font-medium mb-1'>
              Catatan Tambahan
            </label>
            <textarea
              name='notes'
              className='w-full border rounded-md p-2'
              rows={3}
              placeholder='Tambahan informasi atau catatan khusus'
            />
          </div>

          {/* Form Actions */}
          <div className='flex justify-end gap-4'>
            <Button type='button' variant='outline' onClick={handleCancel}>
              Batal
            </Button>
            <Button type='submit'>Submit Evaluasi</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Mock functions to simulate API calls
const mockFetchProgram = async (id: number): Promise<Program> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id,
    title: 'Contoh Program YAMR',
    category: 'Aktivitas',
    status: 'Ongoing',
    startDate: '2024-11-08',
    isEvaluated: false,
  };
};

const mockSubmitEvaluation = async (data: any): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log('Submitted evaluation:', data);
};

export default ProgramEvaluationForm;
