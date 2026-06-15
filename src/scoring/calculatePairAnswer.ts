import type { QuestionItem, QuestionOption, ScoreWeight, SwipeAnswerValue } from '../types';

export type WeightedEntry = {
  option: QuestionOption;
  multiplier: number;
};

export type PairAnswerCalculation = {
  entries: WeightedEntry[];
  possible: QuestionOption[];
  ambiguity: number;
  contradiction: number;
  reliabilityMultiplier: number;
  extraEvidence: ScoreWeight;
  skipped: boolean;
};

function pairKindModifier(question: QuestionItem): number {
  switch (question.pairKind) {
    case 'tieBreak': return 1.1;
    case 'shadowContrast': return 1.05;
    case 'sameBehaviorDifferentMotive': return 0.95;
    case 'sameMotiveDifferentBehavior': return 0.95;
    default: return 1;
  }
}

function oppositionContra(question: QuestionItem): number {
  const strength = question.opposition?.strength ?? 'medium';
  if (strength === 'extreme') return -0.15;
  if (strength === 'strong') return -0.1;
  return 0;
}

export function calculatePairAnswer(question: QuestionItem, answer: SwipeAnswerValue): PairAnswerCalculation {
  const left = question.left;
  const right = question.right;
  if (!left || !right) {
    return { entries: [], possible: [], ambiguity: 0, contradiction: 0, reliabilityMultiplier: 0, extraEvidence: {}, skipped: true };
  }

  const modifier = pairKindModifier(question);
  const contra = oppositionContra(question);
  const strong = question.opposition?.strength === 'strong' || question.opposition?.strength === 'extreme';
  const extreme = question.opposition?.strength === 'extreme';

  if (answer === 'skip') {
    return { entries: [], possible: [left, right], ambiguity: 0, contradiction: 0, reliabilityMultiplier: 0, extraEvidence: {}, skipped: true };
  }

  if (answer === 'left') {
    return {
      entries: [{ option: left, multiplier: 1 * modifier }, ...(contra ? [{ option: right, multiplier: contra * modifier }] : [])],
      possible: [left, right],
      ambiguity: 0,
      contradiction: 0,
      reliabilityMultiplier: 1,
      extraEvidence: {},
      skipped: false
    };
  }

  if (answer === 'right') {
    return {
      entries: [{ option: right, multiplier: 1 * modifier }, ...(contra ? [{ option: left, multiplier: contra * modifier }] : [])],
      possible: [left, right],
      ambiguity: 0,
      contradiction: 0,
      reliabilityMultiplier: 1,
      extraEvidence: {},
      skipped: false
    };
  }

  if (answer === 'both') {
    return {
      entries: [
        { option: left, multiplier: 0.45 * modifier },
        { option: right, multiplier: 0.45 * modifier }
      ],
      possible: [left, right],
      ambiguity: 1,
      contradiction: extreme ? 1.2 : strong && question.pairKind !== 'sameBehaviorDifferentMotive' ? 0.8 : 0.25,
      reliabilityMultiplier: strong ? 0.78 : 0.88,
      extraEvidence: { evidence: { mixedPattern: 1, ambiguityTolerance: 0.6 }, ambiguity: 1, contradiction: strong ? 0.7 : 0.2 },
      skipped: false
    };
  }

  if (answer === 'neither') {
    return {
      entries: [
        { option: left, multiplier: -0.15 * modifier },
        { option: right, multiplier: -0.15 * modifier }
      ],
      possible: [left, right],
      ambiguity: 0.5,
      contradiction: 0,
      reliabilityMultiplier: 0.68,
      extraEvidence: { evidence: { nonIdentification: 1 }, ambiguity: 0.5 },
      skipped: false
    };
  }

  return {
    entries: [
      { option: left, multiplier: 0.25 * modifier },
      { option: right, multiplier: 0.25 * modifier }
    ],
    possible: [left, right],
    ambiguity: 0.7,
    contradiction: strong ? 0.35 : 0.15,
    reliabilityMultiplier: 0.7,
    extraEvidence: { evidence: { contextDependence: 1, ambiguityTolerance: 0.8 }, ambiguity: 0.7, contradiction: strong ? 0.25 : 0.1 },
    skipped: false
  };
}
