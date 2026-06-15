import type { CognitiveFunction, NormalizedScores, RawScores, ScoreBucketName, ScoreBuckets, StackRole } from '../types';
import { COGNITIVE_FUNCTIONS, SCORE_BUCKETS, STACK_ROLES } from './scoreSchema';

function emptyBuckets(): ScoreBuckets {
  return SCORE_BUCKETS.reduce((acc, bucket) => {
    acc[bucket] = {};
    return acc;
  }, {} as ScoreBuckets);
}

function normalizeValue(raw: number, min: number, max: number): number {
  if (max === min) return raw > 0 ? 100 : 0;
  return Math.max(0, Math.min(100, ((raw - min) / (max - min)) * 100));
}

export function normalizeScores(raw: RawScores): NormalizedScores {
  const buckets = emptyBuckets();
  for (const bucket of SCORE_BUCKETS) {
    const keys = new Set([
      ...Object.keys(raw.buckets[bucket]),
      ...Object.keys(raw.maxPossible[bucket]),
      ...Object.keys(raw.minPossible[bucket])
    ]);
    for (const key of keys) {
      buckets[bucket][key] = normalizeValue(raw.buckets[bucket][key] ?? 0, raw.minPossible[bucket][key] ?? 0, raw.maxPossible[bucket][key] ?? 1);
    }
  }

  const maxRole = Math.max(
    1,
    ...COGNITIVE_FUNCTIONS.flatMap((fn) => STACK_ROLES.map((role) => Math.abs(raw.functionRole[fn][role] ?? 0)))
  );
  const functionRole = COGNITIVE_FUNCTIONS.reduce((acc, fn) => {
    acc[fn] = STACK_ROLES.reduce((roleAcc, role) => {
      roleAcc[role] = Math.max(0, Math.min(100, ((raw.functionRole[fn][role] ?? 0) / maxRole) * 100));
      return roleAcc;
    }, {} as Record<StackRole, number>);
    return acc;
  }, {} as Record<CognitiveFunction, Record<StackRole, number>>);

  const functionContexts = COGNITIVE_FUNCTIONS.reduce((acc, fn) => {
    acc[fn] = { ...raw.functionContexts[fn] };
    return acc;
  }, {} as Record<CognitiveFunction, Record<string, number>>);

  return { buckets, functionRole, functionContexts };
}

export function rankBucket(bucket: Record<string, number>, limit = 99) {
  return Object.entries(bucket)
    .map(([key, score]) => ({ key, score: Math.round(score * 10) / 10 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function bucketTopKey(bucket: Record<string, number>, fallback = '-') {
  return rankBucket(bucket, 1)[0]?.key ?? fallback;
}

export function contextSpreadFor(raw: RawScores, bucket: ScoreBucketName, key: string): number {
  const context = raw.contextScores[`${bucket}.${key}`] ?? {};
  return Object.keys(context).length;
}
