// src/components/pages/MonitoringKabarPage.tsx

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Plus,
  Edit2,
  Trash2,
  AlertCircle,
  Newspaper,
  Bell,
} from 'lucide-react';
import MonitoringEntryForm from '../forms/MonitoringEntryForm';
import type { MonitoringEntry, EntryType } from '../../types/monitoring';
import { UNITS } from '../../types/monitoring';

// Sample data
const SAMPLE_DATA: MonitoringEntry[] = [
  {
    id: 1,
    type: 'issues',
    title: 'Kebocoran Pipa Air di Area Wudhu',
    description:
      'Terjadi kebocoran pipa air di area wudhu masjid yang menyebabkan genangan',
    date: '2024-11-08',
    status: 'in_progress',
    unit: 'MAI',
    createdAt: '2024-11-08T10:00:00Z',
    updatedAt: '2024-11-08T10:00:00Z',
  },
  {
    id: 2,
    type: 'news',
    title: 'Pembangunan Jalan Baru di Sekitar Yayasan',
    description:
      'Pemkot akan melakukan pembangunan jalan baru di sekitar yayasan mulai bulan depan',
    date: '2024-11-08',
    source: 'Pengumuman Pemkot',
    catatan: 'Konfirmasi langsung dari Dinas PU, sudah ada surat resmi',
    createdAt: '2024-11-08T09:00:00Z',
    updatedAt: '2024-11-08T09:00:00Z',
  },
  {
    id: 3,
    type: 'updates',
    title: 'Perubahan Jadwal Kajian Mingguan',
    description:
      'Kajian mingguan akan dipindah ke hari Sabtu mulai minggu depan',
    date: '2024-11-08',
    units: ['TKM', 'HUM'],
    createdAt: '2024-11-08T08:00:00Z',
    updatedAt: '2024-11-08T08:00:00Z',
  },
];

const MonitoringKabarPage: React.FC = () => {
  const [entries, setEntries] = useState<MonitoringEntry[]>(SAMPLE_DATA);
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState<EntryType | null>(null);
  const [editingEntry, setEditingEntry] = useState<MonitoringEntry | null>(
    null
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'text-red-500';
      case 'in_progress':
        return 'text-yellow-500';
      case 'resolved':
        return 'text-green-500';
      case 'closed':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const getUnitName = (code: string) => {
    for (const group of Object.values(UNITS)) {
      const unit = group.find((u) => u.code === code);
      if (unit) return unit.name;
    }
    return code;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'issues':
        return <AlertCircle className='h-5 w-5 text-red-500' />;
      case 'news':
        return <Newspaper className='h-5 w-5 text-blue-500' />;
      case 'updates':
        return <Bell className='h-5 w-5 text-green-500' />;
      default:
        return null;
    }
  };

  const handleAddNew = (type: EntryType) => {
    setSelectedType(type);
    setEditingEntry(null);
    setShowForm(true);
  };

  const handleEdit = (entry: MonitoringEntry) => {
    setSelectedType(entry.type);
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Yakin ingin menghapus entri ini?')) {
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  const handleSubmit = (formData: FormData) => {
    if (editingEntry) {
      // Update existing entry
      const updatedEntry = {
        ...editingEntry,
        title: formData.get('title')?.toString() || '',
        description: formData.get('description')?.toString() || '',
        date: formData.get('date')?.toString() || '',
        updatedAt: new Date().toISOString(),
        ...(selectedType === 'issues' && {
          status: formData.get('status')?.toString(),
          unit: formData.get('unit')?.toString(),
          resolution: formData.get('resolution')?.toString(),
        }),
        ...(selectedType === 'news' && {
          source: formData.get('source')?.toString(),
          catatan: formData.get('catatan')?.toString(),
        }),
        ...(selectedType === 'updates' && {
          units: Array.from(formData.getAll('units[]')).map(String),
        }),
      };

      setEntries(
        entries.map((entry) =>
          entry.id === editingEntry.id
            ? (updatedEntry as MonitoringEntry)
            : entry
        )
      );
    } else {
      // Create new entry
      const newEntry = {
        id: Math.max(...entries.map((e) => e.id)) + 1,
        type: selectedType,
        title: formData.get('title')?.toString() || '',
        description: formData.get('description')?.toString() || '',
        date: formData.get('date')?.toString() || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...(selectedType === 'issues' && {
          status: formData.get('status')?.toString() || 'open',
          unit: formData.get('unit')?.toString() || '',
          resolution: formData.get('resolution')?.toString(),
        }),
        ...(selectedType === 'news' && {
          source: formData.get('source')?.toString() || '',
          catatan: formData.get('catatan')?.toString() || '',
        }),
        ...(selectedType === 'updates' && {
          units: Array.from(formData.getAll('units[]')).map(String),
        }),
      };

      setEntries([newEntry as MonitoringEntry, ...entries]);
    }
    handleCancel();
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedType(null);
    setEditingEntry(null);
  };

  if (showForm && selectedType) {
    return (
      <div className='p-6'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold'>
            {editingEntry ? 'Edit' : 'Tambah'}{' '}
            {selectedType === 'issues'
              ? 'Masalah'
              : selectedType === 'news'
              ? 'Berita'
              : 'Update'}
          </h1>
        </div>
        <MonitoringEntryForm
          type={selectedType}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={editingEntry}
        />
      </div>
    );
  }

  return (
    <div className='p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Monitoring Kabar</h1>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            onClick={() => handleAddNew('issues')}
            className='flex items-center gap-2'
          >
            <AlertCircle className='h-4 w-4' />
            Tambah Issue
          </Button>
          <Button
            variant='outline'
            onClick={() => handleAddNew('news')}
            className='flex items-center gap-2'
          >
            <Newspaper className='h-4 w-4' />
            Tambah Berita
          </Button>
          <Button
            variant='outline'
            onClick={() => handleAddNew('updates')}
            className='flex items-center gap-2'
          >
            <Bell className='h-4 w-4' />
            Tambah Update
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Entri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {entries.length === 0 ? (
              <p className='text-center text-gray-500 py-4'>
                Belum ada entri. Silakan tambah entri baru.
              </p>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className='p-4 border rounded-lg hover:bg-gray-50'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex items-start gap-4'>
                      {getTypeIcon(entry.type)}
                      <div>
                        <h3 className='font-medium'>{entry.title}</h3>
                        <p className='text-sm text-gray-600 mt-1'>
                          {entry.description}
                        </p>

                        {entry.type === 'issues' && (
                          <div className='mt-2'>
                            <span
                              className={`text-sm font-medium ${getStatusColor(
                                entry.status
                              )}`}
                            >
                              {entry.status === 'open' && 'Terbuka'}
                              {entry.status === 'in_progress' &&
                                'Sedang Ditangani'}
                              {entry.status === 'resolved' && 'Selesai'}
                              {entry.status === 'closed' && 'Ditutup'}
                            </span>
                            <span className='text-sm text-gray-500 ml-2'>
                              • Unit: {getUnitName(entry.unit)}
                            </span>
                            {entry.resolution && (
                              <p className='text-sm text-gray-600 mt-1'>
                                Penyelesaian: {entry.resolution}
                              </p>
                            )}
                          </div>
                        )}

                        {entry.type === 'news' && (
                          <div className='mt-2 text-sm text-gray-500'>
                            <p>Sumber: {entry.source}</p>
                            <p className='mt-1'>Catatan: {entry.catatan}</p>
                          </div>
                        )}

                        {entry.type === 'updates' && (
                          <div className='mt-2 text-sm text-gray-500'>
                            Unit terkait:{' '}
                            {entry.units.map(getUnitName).join(', ')}
                          </div>
                        )}

                        <p className='text-xs text-gray-400 mt-2'>
                          {new Date(entry.date).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>

                    <div className='flex gap-2 ml-4'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleEdit(entry)}
                      >
                        <Edit2 className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleDelete(entry.id)}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringKabarPage;
