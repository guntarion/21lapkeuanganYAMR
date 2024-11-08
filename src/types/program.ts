// src/types/program.ts

export type ProgramCategory = 'Aktivitas' | 'Kegiatan' | 'Pengadaan';

export interface Program {
  id: number;
  title: string;
  category: ProgramCategory;
  status: 'Ongoing' | 'Completed';
  startDate: string;
  isEvaluated: boolean;
  evaluation?: ProgramEvaluation;
}

export interface ProgramEvaluation {
  // Common fields
  id: number;
  programId: number;
  notes?: string;

  // Aktivitas fields
  statusCompletion?: number;
  timelineAdherence?: 'On Time' | 'Slightly Delayed' | 'Significantly Delayed';
  resourceUtilization?: 'Efficient' | 'Moderate' | 'Inefficient';
  impact?: string;
  challenges?: string;
  lessonsLearned?: string;

  // Kegiatan fields
  attendance?: number;
  participantEngagement?: 'Very High' | 'High' | 'Moderate' | 'Low';
  budgetAdherence?: 'Under Budget' | 'On Budget' | 'Over Budget';
  communityFeedback?: string;
  objectives?: string;

  // Pengadaan fields
  costEffectiveness?:
    | 'Very Cost-Effective'
    | 'Moderately Cost-Effective'
    | 'Not Cost-Effective';
  qualityAssessment?: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  supplierPerformance?: string;
  usageAssessment?: string;
}
