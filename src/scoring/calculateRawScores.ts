import type { AnswerMap, CognitiveFunction, QuestionItem, QuestionKind, RawScores, ScoreBucketName, ScoreBuckets, ScoreWeight, StackRole, StoredAnswer, SwipeAnswerValue } from '../types';
import { COGNITIVE_FUNCTIONS, SCORE_BUCKETS, STACK_ROLES } from './scoreSchema';
import { calculateItemAnswer, collectPossible } from './calculateItemAnswer';
import { calculatePairAnswer } from './calculatePairAnswer';

function emptyBuckets(): ScoreBuckets {
  return SCORE_BUCKETS.reduce((acc, bucket) => {
    acc[bucket] = {};
    return acc;
  }, {} as ScoreBuckets);
}

function emptyFunctionRole(): Record<CognitiveFunction, Record<StackRole, number>> {
  return COGNITIVE_FUNCTIONS.reduce((acc, fn) => {
    acc[fn] = STACK_ROLES.reduce((roleAcc, role) => {
      roleAcc[role] = 0;
      return roleAcc;
    }, {} as Record<StackRole, number>);
    return acc;
  }, {} as Record<CognitiveFunction, Record<StackRole, number>>);
}

function emptyFunctionContexts(): Record<CognitiveFunction, Record<string, number>> {
  return COGNITIVE_FUNCTIONS.reduce((acc, fn) => {
    acc[fn] = {};
    return acc;
  }, {} as Record<CognitiveFunction, Record<string, number>>);
}

export function createEmptyRawScores(totalQuestions: number): RawScores {
  return {
    buckets: emptyBuckets(),
    maxPossible: emptyBuckets(),
    minPossible: emptyBuckets(),
    functionRole: emptyFunctionRole(),
    functionContexts: emptyFunctionContexts(),
    skippedTheme: {},
    skippedKind: {} as Record<QuestionKind, number>,
    answerPatternCounts: {},
    contextScores: {},
    contradiction: 0,
    ambiguity: 0,
    reliabilitySum: 0,
    answeredCount: 0,
    skippedCount: 0,
    totalQuestions
  };
}

function addToBucket(bucket: Record<string, number>, key: string, value: number) {
  bucket[key] = (bucket[key] ?? 0) + value;
}

function inferDefaultRole(question: QuestionItem): StackRole {
  if (question.context.pressureLevel === 'crisis') return 'transformative';
  if (question.context.pressureLevel === 'high') return 'inferior';
  if (question.pairKind === 'shadowContrast') return 'opposing';
  if (question.context.theme.includes('gagal') || question.context.emotion.includes('malu')) return 'critical';
  if (question.context.socialExposure === 'public') return 'auxiliary';
  if (question.context.emotionalCharge === 'low') return 'tertiary';
  return 'dominant';
}

function weightReliability(weight: ScoreWeight): number {
  const own = weight.reliability;
  if (typeof own === 'number') return Math.max(0.45, Math.min(1.05, own));
  return 1;
}

function addContext(raw: RawScores, bucket: ScoreBucketName, key: string, theme: string, value: number) {
  const contextKey = `${bucket}.${key}`;
  raw.contextScores[contextKey] = raw.contextScores[contextKey] ?? {};
  raw.contextScores[contextKey][theme] = (raw.contextScores[contextKey][theme] ?? 0) + Math.abs(value);
}

function addPossible(raw: RawScores, weight: ScoreWeight, factor: number) {
  for (const bucket of SCORE_BUCKETS) {
    const values = weight[bucket];
    if (!values) continue;
    for (const [key, value] of Object.entries(values)) {
      const scaled = Number(value) * Math.abs(factor);
      if (scaled >= 0) addToBucket(raw.maxPossible[bucket], key, scaled);
      else addToBucket(raw.minPossible[bucket], key, scaled);
    }
  }
}

function addSelected(raw: RawScores, question: QuestionItem, weight: ScoreWeight, factor: number) {
  const scaledFactor = factor * weightReliability(weight);
  for (const bucket of SCORE_BUCKETS) {
    const values = weight[bucket];
    if (!values) continue;
    for (const [key, value] of Object.entries(values)) {
      const scaled = Number(value) * scaledFactor;
      addToBucket(raw.buckets[bucket], key, scaled);
      addContext(raw, bucket, key, question.context.theme, scaled);
    }
  }

  if (weight.cognitive) {
    const roles = weight.stackRole ?? { [inferDefaultRole(question)]: 1 } as Partial<Record<StackRole, number>>;
    for (const [fn, fnValue] of Object.entries(weight.cognitive) as [CognitiveFunction, number][]) {
      const contextName = `${question.context.theme} / ${question.context.place}`;
      raw.functionContexts[fn][contextName] = (raw.functionContexts[fn][contextName] ?? 0) + Math.abs(fnValue * scaledFactor);
      for (const [role, roleValue] of Object.entries(roles) as [StackRole, number][]) {
        raw.functionRole[fn][role] += fnValue * roleValue * scaledFactor;
      }
    }
  }

  if (typeof weight.ambiguity === 'number') raw.ambiguity += weight.ambiguity * Math.abs(scaledFactor);
  if (typeof weight.contradiction === 'number') raw.contradiction += weight.contradiction * Math.abs(scaledFactor);
}

function markSkipped(raw: RawScores, question: QuestionItem) {
  raw.skippedCount += 1;
  raw.skippedTheme[question.context.theme] = (raw.skippedTheme[question.context.theme] ?? 0) + 1;
  raw.skippedKind[question.kind] = (raw.skippedKind[question.kind] ?? 0) + 1;
}

function incrementPattern(raw: RawScores, kind: string) {
  raw.answerPatternCounts[kind] = (raw.answerPatternCounts[kind] ?? 0) + 1;
}

export function calculateRawScores(questions: QuestionItem[], answers: AnswerMap): RawScores {
  const raw = createEmptyRawScores(questions.length);

  for (const question of questions) {
    const answer = answers[question.id];
    const baseReliability = question.reliability;

    if (question.kind === 'swipePair') {
      const swipe = (answer?.kind ?? 'skip') as SwipeAnswerValue;
      const calc = calculatePairAnswer(question, swipe);
      calc.possible.forEach((opt) => addPossible(raw, opt.weights, baseReliability));
      incrementPattern(raw, swipe);
      if (calc.skipped) {
        markSkipped(raw, question);
        continue;
      }
      raw.answeredCount += 1;
      raw.reliabilitySum += baseReliability * calc.reliabilityMultiplier;
      raw.ambiguity += calc.ambiguity;
      raw.contradiction += calc.contradiction;
      if (calc.extraEvidence) addSelected(raw, question, calc.extraEvidence, baseReliability);
      calc.entries.forEach((entry) => addSelected(raw, question, entry.option.weights, baseReliability * calc.reliabilityMultiplier * entry.multiplier));
      continue;
    }

    const calc = calculateItemAnswer(question, answer as StoredAnswer | undefined);
    collectPossible(question).forEach((opt) => addPossible(raw, opt.weights, baseReliability));
    incrementPattern(raw, answer?.kind ?? 'skip');
    if (calc.skipped) {
      markSkipped(raw, question);
      continue;
    }
    raw.answeredCount += 1;
    raw.reliabilitySum += baseReliability * calc.reliabilityMultiplier;
    raw.ambiguity += calc.ambiguity;
    raw.contradiction += calc.contradiction;
    calc.entries.forEach((entry) => addSelected(raw, question, entry.option.weights, baseReliability * calc.reliabilityMultiplier * entry.multiplier));
  }

  return raw;
}
