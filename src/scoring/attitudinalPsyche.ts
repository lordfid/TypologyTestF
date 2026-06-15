import type { NormalizedScores } from '../types';

const aspects = ['L', 'E', 'F', 'V'] as const;

type Aspect = (typeof aspects)[number];

function aspectScore(normalized: NormalizedScores, aspect: Aspect) {
  const bucket = normalized.buckets.attitudinalPsyche;
  const confidence = bucket[`${aspect}_confidence`] ?? 0;
  const flexibility = bucket[`${aspect}_flexibility`] ?? 0;
  const insecurity = bucket[`${aspect}_insecurity`] ?? 0;
  const indifference = bucket[`${aspect}_indifference`] ?? 0;
  return { confidence, flexibility, insecurity, indifference };
}

export function inferAttitudinalPsyche(normalized: NormalizedScores): string {
  const positionCandidates = aspects.map((aspect) => {
    const s = aspectScore(normalized, aspect);
    const p1 = s.confidence * 1.05 - s.insecurity * 0.35;
    const p2 = s.flexibility * 1.1 + s.confidence * 0.25;
    const p3 = s.insecurity * 1.1 + (100 - s.confidence) * 0.2;
    const p4 = s.indifference * 1.1 + (100 - Math.max(s.confidence, s.flexibility)) * 0.15;
    return { aspect, positions: [p1, p2, p3, p4] };
  });

  const result: Array<{ aspect: Aspect; position: number; score: number }> = [];
  const used = new Set<number>();
  for (let pos = 1; pos <= 4; pos += 1) {
    const best = positionCandidates
      .filter((c) => !result.find((r) => r.aspect === c.aspect))
      .map((c) => ({ aspect: c.aspect, position: pos, score: c.positions[pos - 1] }))
      .sort((a, b) => b.score - a.score)[0];
    if (best && !used.has(pos)) {
      result.push(best);
      used.add(pos);
    }
  }
  const byPosition = result.sort((a, b) => a.position - b.position).map((r) => r.aspect);
  const missing = aspects.filter((aspect) => !byPosition.includes(aspect));
  return [...byPosition, ...missing].slice(0, 4).join('');
}
