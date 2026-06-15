import type { NormalizedScores, RankedScore } from '../types';
import { rankBucket } from './normalizeScores';

const wings: Record<string, [string, string]> = {
  '1': ['9', '2'], '2': ['1', '3'], '3': ['2', '4'], '4': ['3', '5'], '5': ['4', '6'], '6': ['5', '7'], '7': ['6', '8'], '8': ['7', '9'], '9': ['8', '1']
};

export function rankEnneagram(normalized: NormalizedScores): RankedScore[] {
  return rankBucket(normalized.buckets.enneagram, 9).filter((x) => /^[1-9]$/.test(x.key));
}

export function inferWing(ennea: RankedScore[], normalized: NormalizedScores): string {
  const main = ennea[0]?.key ?? '4';
  const [a, b] = wings[main] ?? ['-', '-'];
  const scoreA = normalized.buckets.enneagram[a] ?? 0;
  const scoreB = normalized.buckets.enneagram[b] ?? 0;
  return `${main}w${scoreA >= scoreB ? a : b}`;
}

export function inferTritype(ennea: RankedScore[]): string {
  const byKey = new Map(ennea.map((x) => [x.key, x.score]));
  const heart = ['2', '3', '4'].sort((a, b) => (byKey.get(b) ?? 0) - (byKey.get(a) ?? 0))[0];
  const head = ['5', '6', '7'].sort((a, b) => (byKey.get(b) ?? 0) - (byKey.get(a) ?? 0))[0];
  const gut = ['8', '9', '1'].sort((a, b) => (byKey.get(b) ?? 0) - (byKey.get(a) ?? 0))[0];
  const main = ennea[0]?.key ?? heart;
  return [main, heart, head, gut].filter((value, idx, arr) => arr.indexOf(value) === idx).slice(0, 3).join('');
}
