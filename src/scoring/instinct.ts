import type { NormalizedScores } from '../types';

export function inferInstinctStacking(normalized: NormalizedScores): string {
  const scores = ['sp', 'sx', 'so']
    .map((key) => ({ key, score: normalized.buckets.instinct[key] ?? 0 }))
    .sort((a, b) => b.score - a.score);
  return `${scores[0]?.key ?? 'sp'}/${scores[1]?.key ?? 'sx'}/${scores[2]?.key ?? 'so'}`;
}
