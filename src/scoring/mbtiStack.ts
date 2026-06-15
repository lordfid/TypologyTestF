import type { CognitiveFunction, MbtiResult, NormalizedScores, RawScores, StackRole } from '../types';
import { COGNITIVE_FUNCTIONS } from './scoreSchema';

export const MBTI_STACKS: Record<string, CognitiveFunction[]> = {
  INTJ: ['Ni', 'Te', 'Fi', 'Se'],
  INFJ: ['Ni', 'Fe', 'Ti', 'Se'],
  ENTJ: ['Te', 'Ni', 'Se', 'Fi'],
  ENFJ: ['Fe', 'Ni', 'Se', 'Ti'],
  INTP: ['Ti', 'Ne', 'Si', 'Fe'],
  INFP: ['Fi', 'Ne', 'Si', 'Te'],
  ENTP: ['Ne', 'Ti', 'Fe', 'Si'],
  ENFP: ['Ne', 'Fi', 'Te', 'Si'],
  ISTJ: ['Si', 'Te', 'Fi', 'Ne'],
  ISFJ: ['Si', 'Fe', 'Ti', 'Ne'],
  ESTJ: ['Te', 'Si', 'Ne', 'Fi'],
  ESFJ: ['Fe', 'Si', 'Ne', 'Ti'],
  ISTP: ['Ti', 'Se', 'Ni', 'Fe'],
  ISFP: ['Fi', 'Se', 'Ni', 'Te'],
  ESTP: ['Se', 'Ti', 'Fe', 'Ni'],
  ESFP: ['Se', 'Fi', 'Te', 'Ni']
};

const AXIS_FOR_TYPE = (type: string) => [type[0], type[1], type[2], type[3]];

export function rankFunctions(normalized: NormalizedScores) {
  return COGNITIVE_FUNCTIONS.map((fn) => ({ key: fn, score: Math.round((normalized.buckets.cognitive[fn] ?? 0) * 10) / 10 }))
    .sort((a, b) => b.score - a.score);
}

function rawRankFit(stack: CognitiveFunction[], normalized: NormalizedScores): number {
  const rank = rankFunctions(normalized).map((x) => x.key);
  const points = stack.reduce((sum, fn, idx) => {
    const found = rank.indexOf(fn);
    const desired = idx;
    const distance = found === -1 ? 8 : Math.abs(found - desired);
    return sum + Math.max(0, 100 - distance * 18) * [0.4, 0.3, 0.18, 0.12][idx];
  }, 0);
  return Math.max(0, Math.min(100, points));
}

function roleScore(normalized: NormalizedScores, fn: CognitiveFunction, role: StackRole) {
  return normalized.functionRole[fn]?.[role] ?? 0;
}

function dichotomyFit(type: string, normalized: NormalizedScores): number {
  const axisScores = normalized.buckets.mbtiAxis;
  const axes = AXIS_FOR_TYPE(type);
  return axes.reduce((sum, axis) => sum + (axisScores[axis] ?? 50), 0) / axes.length;
}

function behaviorEvidenceFit(type: string, normalized: NormalizedScores): number {
  const e = normalized.buckets.evidence;
  const intro = type[0] === 'I' ? (e.observeFirst ?? 0) + (e.withdrawal ?? 0) + (e.silentMonitoring ?? 0) : (e.directEngagement ?? 0) + (e.visibleRole ?? 0) + (e.actionFirst ?? 0);
  const perceiving = type[3] === 'P' ? (e.noveltySeeking ?? 0) + (e.ambiguityTolerance ?? 0) : (e.orderSeeking ?? 0) + (e.externalEfficiencySeeking ?? 0);
  return Math.max(0, Math.min(100, (intro + perceiving) / 4));
}

function shadowFit(stack: CognitiveFunction[], normalized: NormalizedScores): number {
  const [dom, aux, tert, inf] = stack;
  const stable = roleScore(normalized, dom, 'dominant') * 0.4 + roleScore(normalized, aux, 'auxiliary') * 0.25;
  const stress = roleScore(normalized, inf, 'inferior') * 0.2 + roleScore(normalized, tert, 'tertiary') * 0.15;
  return Math.max(0, Math.min(100, stable + stress));
}

function stackFit(stack: CognitiveFunction[], type: string, normalized: NormalizedScores): number {
  const [dom, aux, tert, inf] = stack;
  const role = roleScore(normalized, dom, 'dominant') * 0.35 +
    roleScore(normalized, aux, 'auxiliary') * 0.25 +
    roleScore(normalized, tert, 'tertiary') * 0.15 +
    roleScore(normalized, inf, 'inferior') * 0.15 +
    dichotomyFit(type, normalized) * 0.1;
  const penalty = roleScore(normalized, inf, 'dominant') > roleScore(normalized, dom, 'dominant') ? 8 : 0;
  return Math.max(0, Math.min(100, role - penalty));
}

export function calculateMbtiResults(normalized: NormalizedScores, raw: RawScores): MbtiResult[] {
  const contradictionPenalty = Math.min(12, raw.contradiction * 0.8 + (raw.answerPatternCounts.both ?? 0) * 0.12);
  return Object.entries(MBTI_STACKS)
    .map(([type, stack]) => {
      const score = stackFit(stack, type, normalized) * 0.6 +
        rawRankFit(stack, normalized) * 0.15 +
        dichotomyFit(type, normalized) * 0.1 +
        behaviorEvidenceFit(type, normalized) * 0.1 +
        shadowFit(stack, normalized) * 0.05 - contradictionPenalty;
      return {
        type,
        stack,
        score: Math.round(Math.max(0, Math.min(100, score)) * 10) / 10,
        confidence: 0,
        note: `${type} terbaca dari dukungan stack ${stack.join('-')} dan sumbu ${AXIS_FOR_TYPE(type).join('')}.`
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item, idx, arr) => ({
      ...item,
      confidence: Math.max(0, Math.min(100, item.score - (arr[idx + 1]?.score ?? 0) + 55))
    }));
}

export function inferStackRoles(normalized: NormalizedScores, topType: string): Record<StackRole, string> {
  const stack = MBTI_STACKS[topType] ?? ['Ni', 'Fe', 'Ti', 'Se'];
  return {
    dominant: stack[0],
    auxiliary: stack[1],
    tertiary: stack[2],
    inferior: stack[3],
    opposing: oppositeFunction(stack[0]),
    critical: oppositeFunction(stack[1]),
    trickster: oppositeFunction(stack[2]),
    transformative: oppositeFunction(stack[3])
  };
}

function oppositeFunction(fn: CognitiveFunction): CognitiveFunction {
  const map: Record<CognitiveFunction, CognitiveFunction> = { Ni: 'Ne', Ne: 'Ni', Si: 'Se', Se: 'Si', Fi: 'Fe', Fe: 'Fi', Ti: 'Te', Te: 'Ti' };
  return map[fn];
}

export function inferMbtiAxis(normalized: NormalizedScores) {
  return Object.entries(normalized.buckets.mbtiAxis)
    .map(([key, score]) => ({ key, score: Math.round(score * 10) / 10 }))
    .sort((a, b) => b.score - a.score);
}

export function inferSocionics(topType: string): { socionics: string; quadra: string } {
  const map: Record<string, { socionics: string; quadra: string }> = {
    INTJ: { socionics: 'ILI / LII dekat', quadra: 'Gamma / Alpha dekat' },
    INFJ: { socionics: 'IEI / EII dekat', quadra: 'Beta / Delta dekat' },
    ENTJ: { socionics: 'LIE', quadra: 'Gamma' },
    ENFJ: { socionics: 'EIE', quadra: 'Beta' },
    INTP: { socionics: 'LII / ILI dekat', quadra: 'Alpha / Gamma dekat' },
    INFP: { socionics: 'EII / IEI dekat', quadra: 'Delta / Beta dekat' },
    ENTP: { socionics: 'ILE', quadra: 'Alpha' },
    ENFP: { socionics: 'IEE', quadra: 'Delta' },
    ISTJ: { socionics: 'LSI / SLI dekat', quadra: 'Beta / Delta dekat' },
    ISFJ: { socionics: 'SEI / ESI dekat', quadra: 'Alpha / Gamma dekat' },
    ESTJ: { socionics: 'LSE', quadra: 'Delta' },
    ESFJ: { socionics: 'ESE', quadra: 'Alpha' },
    ISTP: { socionics: 'SLI / LSI dekat', quadra: 'Delta / Beta dekat' },
    ISFP: { socionics: 'ESI / SEI dekat', quadra: 'Gamma / Alpha dekat' },
    ESTP: { socionics: 'SLE', quadra: 'Beta' },
    ESFP: { socionics: 'SEE', quadra: 'Gamma' }
  };
  return map[topType] ?? { socionics: 'belum tajam', quadra: 'campuran' };
}

export function inferTemperament(type: string): string {
  if (type.includes('N') && type.includes('T')) return 'NT';
  if (type.includes('N') && type.includes('F')) return 'NF';
  if (type.includes('S') && type.includes('J')) return 'SJ';
  return 'SP';
}
