import type { CognitiveFunction, ScoreBucketName, StackRole } from '../types';

export const SCORE_BUCKETS: ScoreBucketName[] = [
  'cognitive',
  'stackRole',
  'mbtiAxis',
  'enneagram',
  'instinct',
  'bigFive',
  'hexaco',
  'attitudinalPsyche',
  'disc',
  'riasec',
  'moral',
  'decision',
  'conflict',
  'communication',
  'relationship',
  'stress',
  'defense',
  'values',
  'work',
  'learning',
  'coreFear',
  'coreDesire',
  'evidence'
];

export const COGNITIVE_FUNCTIONS: CognitiveFunction[] = ['Ni', 'Ne', 'Si', 'Se', 'Fi', 'Fe', 'Ti', 'Te'];

export const STACK_ROLES: StackRole[] = [
  'dominant',
  'auxiliary',
  'tertiary',
  'inferior',
  'opposing',
  'critical',
  'trickster',
  'transformative'
];

export const ROLE_IMPORTANCE: Record<StackRole, number> = {
  dominant: 4,
  auxiliary: 3,
  tertiary: 2,
  inferior: 1.5,
  opposing: 2,
  critical: 2,
  trickster: 1.2,
  transformative: 1.2
};

export const RANK_MULTIPLIERS = [1, 0.7, 0.45, 0.2, -0.05, -0.1, -0.12, -0.15];

export const BUCKET_LABELS: Record<ScoreBucketName, string> = {
  cognitive: 'Fungsi kognitif',
  stackRole: 'Peran fungsi',
  mbtiAxis: 'Sumbu MBTI',
  enneagram: 'Enneagram',
  instinct: 'Instinct',
  bigFive: 'Big Five',
  hexaco: 'HEXACO',
  attitudinalPsyche: 'Attitudinal Psyche',
  disc: 'DISC',
  riasec: 'RIASEC',
  moral: 'Moral style',
  decision: 'Decision style',
  conflict: 'Conflict style',
  communication: 'Communication style',
  relationship: 'Kecenderungan relasi',
  stress: 'Respons tekanan',
  defense: 'Defense pattern',
  values: 'Values',
  work: 'Work style',
  learning: 'Learning style',
  coreFear: 'Core fear',
  coreDesire: 'Core desire',
  evidence: 'Evidence dasar'
};
