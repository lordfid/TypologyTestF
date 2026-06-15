import type { AnswerMap, FinalResult, RankedScore } from '../types';
import { makeLocalNarrative } from '../data/resultDescriptions';
import { QuestionItem } from '../types';
import { calculateRawScores } from './calculateRawScores';
import { calculateConfidence, confidenceLabel } from './confidence';
import { inferAttitudinalPsyche } from './attitudinalPsyche';
import { inferInstinctStacking } from './instinct';
import { inferTritype, inferWing, rankEnneagram } from './enneagram';
import { calculateMbtiResults, inferMbtiAxis, inferSocionics, inferStackRoles, inferTemperament, rankFunctions } from './mbtiStack';
import { contextSpreadFor, normalizeScores, rankBucket } from './normalizeScores';

function top(bucket: Record<string, number>, limit = 5): RankedScore[] {
  return rankBucket(bucket, limit);
}

function readableTemperament(disc: RankedScore[]): string {
  const high = disc[0]?.key;
  if (high === 'D') return 'choleric';
  if (high === 'I') return 'sanguine';
  if (high === 'S') return 'phlegmatic';
  if (high === 'C') return 'melancholic';
  return 'campuran';
}

function resultNotes(result: Pick<FinalResult, 'raw' | 'topMbti' | 'confidence'>): string[] {
  const raw = result.raw;
  const notes: string[] = [];
  const both = raw.answerPatternCounts.both ?? 0;
  const neither = raw.answerPatternCounts.neither ?? 0;
  const depends = raw.answerPatternCounts.depends ?? 0;
  const skip = raw.skippedCount;
  if (both > 8) notes.push('Beberapa bagian hasil dekat karena kau cukup sering memilih dua sisi yang sama-sama terasa benar. Itu bisa menunjukkan respons yang berubah menurut orang, tempat, atau tekanan.');
  if (neither > 5) notes.push('Jawabanmu beberapa kali menolak dua pilihan yang tersedia, jadi hasil dibaca sebagai kecenderungan, bukan kesimpulan keras.');
  if (depends > 6) notes.push('Jawaban “tergantung” muncul cukup sering; hasilmu punya warna kontekstual yang kuat.');
  if (skip > raw.totalQuestions * 0.15) notes.push('Ada cukup banyak item yang dilewati, sehingga beberapa bagian hasil perlu dibaca lebih longgar.');
  if (result.topMbti[1] && Math.abs(result.topMbti[0].score - result.topMbti[1].score) < 6) notes.push('Tipe pertama menang tipis; tipe kedua masih mungkin karena beberapa sinyal muncul dalam konteks yang berbeda.');
  if (result.confidence < 45) notes.push('Confidence rendah bukan berarti hasil gagal; ia berarti data yang muncul belum cukup menyatu menjadi satu bacaan keras.');
  return notes;
}

function closeResults(topItems: RankedScore[], label: string): string[] {
  const first = topItems[0];
  if (!first) return [];
  return topItems.slice(1, 4)
    .filter((item) => Math.abs(first.score - item.score) < 8)
    .map((item) => `${label}: ${first.key} dekat dengan ${item.key}`);
}

export function calculateResults(questions: QuestionItem[], answers: AnswerMap): FinalResult {
  const raw = calculateRawScores(questions, answers);
  const normalized = normalizeScores(raw);
  const topMbti = calculateMbtiResults(normalized, raw);
  const functionRanking = rankFunctions(normalized);
  const topFn = functionRanking[0]?.key ?? 'Ni';
  const contextSpread = contextSpreadFor(raw, 'cognitive', topFn);
  const confidence = calculateConfidence({
    topScore: topMbti[0]?.score ?? 0,
    secondScore: topMbti[1]?.score ?? 0,
    raw,
    topContextSpread: contextSpread
  });
  const topType = topMbti[0]?.type ?? 'INFJ';
  const stackRoles = inferStackRoles(normalized, topType);
  const { socionics, quadra } = inferSocionics(topType);
  const enneagram = rankEnneagram(normalized);
  const disc = top(normalized.buckets.disc, 4);
  const moralStyle = top(normalized.buckets.moral, 5);
  const relationshipTendency = top(normalized.buckets.relationship, 6);

  const resultBase: FinalResult = {
    generatedAt: new Date().toISOString(),
    answeredCount: raw.answeredCount,
    skippedCount: raw.skippedCount,
    totalQuestions: raw.totalQuestions,
    confidence,
    confidenceLabel: confidenceLabel(confidence),
    topMbti,
    functionRanking,
    stackRoles,
    shadowRoles: {
      opposing: stackRoles.opposing,
      critical: stackRoles.critical,
      trickster: stackRoles.trickster,
      transformative: stackRoles.transformative,
      dominant: stackRoles.dominant,
      auxiliary: stackRoles.auxiliary,
      tertiary: stackRoles.tertiary,
      inferior: stackRoles.inferior
    },
    mbtiAxis: inferMbtiAxis(normalized),
    enneagram,
    wing: inferWing(enneagram, normalized),
    instinctStacking: inferInstinctStacking(normalized),
    tritype: inferTritype(enneagram),
    bigFive: top(normalized.buckets.bigFive, 5),
    hexaco: top(normalized.buckets.hexaco, 6),
    socionics,
    quadra,
    temperament: inferTemperament(topType),
    classicalTemperament: readableTemperament(disc),
    attitudinalPsyche: inferAttitudinalPsyche(normalized),
    disc,
    riasec: top(normalized.buckets.riasec, 6),
    moralStyle,
    decisionStyle: top(normalized.buckets.decision, 6),
    conflictStyle: top(normalized.buckets.conflict, 6),
    communicationStyle: top(normalized.buckets.communication, 6),
    relationshipTendency,
    stressResponse: top(normalized.buckets.stress, 8),
    coreFear: top(normalized.buckets.coreFear, 6),
    coreDesire: top(normalized.buckets.coreDesire, 6),
    valuesRanking: top(normalized.buckets.values, 8),
    workStyle: top(normalized.buckets.work, 8),
    learningStyle: top(normalized.buckets.learning, 8),
    defensePattern: top(normalized.buckets.defense, 8),
    evidence: top(normalized.buckets.evidence, 12),
    notes: [],
    localNarrative: '',
    closeResults: [],
    normalized,
    raw
  };

  resultBase.notes = resultNotes(resultBase);
  resultBase.closeResults = [
    ...closeResults(resultBase.enneagram, 'Enneagram'),
    ...closeResults(resultBase.relationshipTendency, 'Relasi'),
    ...closeResults(resultBase.stressResponse, 'Tekanan'),
    ...closeResults(resultBase.moralStyle, 'Moral')
  ];
  resultBase.localNarrative = makeLocalNarrative(resultBase);
  return resultBase;
}
