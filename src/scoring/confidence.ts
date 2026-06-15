import type { RawScores } from '../types';

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

export function confidenceLabel(score: number): string {
  if (score < 40) return 'Lemah / masih kabur';
  if (score < 60) return 'Sedang';
  if (score < 75) return 'Cukup kuat';
  if (score < 90) return 'Kuat';
  return 'Sangat kuat, tetap bukan kepastian';
}

export function calculateConfidence(args: { topScore: number; secondScore: number; raw: RawScores; topContextSpread: number }): number {
  const { topScore, secondScore, raw, topContextSpread } = args;
  const gapScore = clamp((topScore - secondScore) * 4 + 35);
  const evidenceVolume = clamp((raw.answeredCount / Math.max(1, raw.totalQuestions)) * 100);
  const contextSpread = clamp((topContextSpread / 6) * 100);
  const neutral = (raw.answerPatternCounts.both ?? 0) + (raw.answerPatternCounts.depends ?? 0) + (raw.answerPatternCounts.neither ?? 0);
  const consistencyScore = clamp(100 - neutral * 1.2 - raw.contradiction * 1.5);
  const lowContradictionScore = clamp(100 - raw.contradiction * 3);
  const answerCompleteness = clamp(((raw.totalQuestions - raw.skippedCount) / Math.max(1, raw.totalQuestions)) * 100);
  return Math.round((
    gapScore * 0.25 +
    evidenceVolume * 0.18 +
    contextSpread * 0.18 +
    consistencyScore * 0.18 +
    lowContradictionScore * 0.11 +
    answerCompleteness * 0.10
  ) * 10) / 10;
}
