// src/components/forms/MonitoringEntryForm.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { EntryType } from '../../types/monitoring';
import { UNITS } from '../../types/monitoring'; // Remove 'type' to import the actual value

interface MonitoringEntryFormProps {
  type: EntryType;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  initialData?: {
    id?: number;
    title?: string;
    description?: string;
    date?: string;
    status?: string;
    unit?: string;
    resolution?: string;
    source?: string;
    catatan?: string;
    units?: string[];
  };
}

const MonitoringEntryForm: React.FC<MonitoringEntryFormProps> = ({
  type,
  onSubmit,
  onCancel,
  initialData,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Handle multi-select for units in updates
    if (type === 'updates') {
      const selectedUnitsArray = Array.from(formData.getAll('units'));
      formData.delete('units');
      selectedUnitsArray.forEach((unit) => {
        formData.append('units[]', unit.toString());
      });
    }

    onSubmit(formData);
  };

  return (
    <Card className='max-w-2xl mx-auto m-6'>
      <CardHeader>
        <CardTitle>
          {type === 'issues' && 'Tambah Masalah'}
          {type === 'news' && 'Tambah Berita'}
          {type === 'updates' && 'Tambah Update'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Judul</label>
            <Input
              name='title'
              required
              defaultValue={initialData?.title}
              placeholder='Masukkan judul'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Deskripsi</label>
            <textarea
              name='description'
              className='w-full border rounded-md p-2'
              rows={3}
              required
              defaultValue={initialData?.description}
              placeholder='Jelaskan secara detail'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Tanggal</label>
            <Input
              type='date'
              name='date'
              required
              defaultValue={initialData?.date}
            />
          </div>

          {type === 'issues' && (
            <>
              <div>
                <label className='block text-sm font-medium mb-1'>Status</label>
                <select
                  name='status'
                  className='w-full border rounded-md p-2'
                  required
                  defaultValue={initialData?.status || 'open'}
                >
                  <option value='open'>Terbuka</option>
                  <option value='in_progress'>Sedang Ditangani</option>
                  <option value='resolved'>Selesai</option>
                  <option value='closed'>Ditutup</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>Unit</label>
                <select
                  name='unit'
                  className='w-full border rounded-md p-2'
                  required
                  defaultValue={initialData?.unit}
                >
                  <optgroup label='Sekretariat'>
                    {UNITS.SK.map((unit) => (
                      <option key={unit.code} value={unit.code}>
                        {unit.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label='Keagamaan'>
                    {UNITS.AG.map((unit) => (
                      <option key={unit.code} value={unit.code}>
                        {unit.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label='Sosial'>
                    {UNITS.SO.map((unit) => (
                      <option key={unit.code} value={unit.code}>
                        {unit.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label='Kemasyarakatan'>
                    {UNITS.KM.map((unit) => (
                      <option key={unit.code} value={unit.code}>
                        {unit.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
              {(initialData?.status === 'resolved' ||
                initialData?.status === 'closed') && (
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Penyelesaian
                  </label>
                  <textarea
                    name='resolution'
                    className='w-full border rounded-md p-2'
                    rows={3}
                    required
                    defaultValue={initialData?.resolution}
                    placeholder='Jelaskan bagaimana masalah ini diselesaikan'
                  />
                </div>
              )}
            </>
          )}

          {type === 'news' && (
            <>
              <div>
                <label className='block text-sm font-medium mb-1'>Sumber</label>
                <Input
                  name='source'
                  required
                  defaultValue={initialData?.source}
                  placeholder='Sumber berita'
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Catatan
                  <span className='text-gray-500 text-xs ml-1'>
                    (Pemisahan fakta dan opini)
                  </span>
                </label>
                <textarea
                  name='catatan'
                  className='w-full border rounded-md p-2'
                  rows={3}
                  required
                  defaultValue={initialData?.catatan}
                  placeholder='Berikan catatan untuk membedakan fakta dan opini dalam berita ini'
                />
              </div>
            </>
          )}

          {type === 'updates' && (
            <div>
              <label className='block text-sm font-medium mb-1'>
                Unit Terkait
              </label>
              <select
                name='units'
                multiple
                className='w-full border rounded-md p-2'
                required
                defaultValue={initialData?.units || []}
                size={8}
              >
                <optgroup label='Sekretariat'>
                  {UNITS.SK.map((unit) => (
                    <option key={unit.code} value={unit.code}>
                      {unit.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label='Keagamaan'>
                  {UNITS.AG.map((unit) => (
                    <option key={unit.code} value={unit.code}>
                      {unit.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label='Sosial'>
                  {UNITS.SO.map((unit) => (
                    <option key={unit.code} value={unit.code}>
                      {unit.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label='Kemasyarakatan'>
                  {UNITS.KM.map((unit) => (
                    <option key={unit.code} value={unit.code}>
                      {unit.name}
                    </option>
                  ))}
                </optgroup>
              </select>
              <p className='text-sm text-gray-500 mt-1'>
                Tahan Ctrl (Windows) atau Command (Mac) untuk memilih beberapa
                unit
              </p>
            </div>
          )}

          <div className='flex justify-end gap-4 mt-6'>
            <Button type='button' variant='outline' onClick={onCancel}>
              Batal
            </Button>
            <Button type='submit'>{initialData ? 'Update' : 'Simpan'}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MonitoringEntryForm;
