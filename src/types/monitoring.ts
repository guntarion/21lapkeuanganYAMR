// src/types/monitoring.ts

export type UnitCode =
  | 'SEK'
  | 'MAI'
  | 'MUT'
  | 'SDM'
  | 'KEA'
  | 'HUM'
  | 'DAN'
  | 'KED'
  | 'TKM'
  | 'KID'
  | 'TPQ'
  | 'MUS'
  | 'DCR'
  | 'KBT'
  | 'KOL'
  | 'LAZ'
  | 'AMB'
  | 'JNZ';

export type EntryType = 'issues' | 'news' | 'updates';

export type IssueStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

interface BaseEntry {
  id: number;
  title: string;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Issue extends BaseEntry {
  type: 'issues';
  status: IssueStatus;
  unit: UnitCode;
  resolution?: string;
}

export interface News extends BaseEntry {
  type: 'news';
  source: string;
  catatan: string; // For differentiating fact vs opinion
}

export interface Update extends BaseEntry {
  type: 'updates';
  units: UnitCode[]; // Multiple units can be related
}

export type MonitoringEntry = Issue | News | Update;

export const UNITS = {
  SK: [
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
    { code: 'TKM', name: 'KETAKMIRAN' },
    { code: 'KID', name: 'REMASKIDZ' },
    { code: 'TPQ', name: 'TPQ' },
    { code: 'MUS', name: 'KEMUSLIMAHAN' },
  ],
  SO: [
    { code: 'DCR', name: 'DAYCARE' },
    { code: 'KBT', name: 'KBTK' },
    { code: 'KOL', name: 'KOLAM RENANG' },
  ],
  KM: [
    { code: 'LAZ', name: 'LAZ MUHAJIRIN' },
    { code: 'AMB', name: 'AMBULANS' },
    { code: 'JNZ', name: 'LAYANAN JENAZAH' },
  ],
} as const;
