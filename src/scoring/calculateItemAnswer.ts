import type { QuestionItem, QuestionOption, StoredAnswer } from '../types';
import { RANK_MULTIPLIERS } from './scoreSchema';

export type ItemAnswerCalculation = {
  entries: Array<{ option: QuestionOption; multiplier: number }>;
  possible: QuestionOption[];
  ambiguity: number;
  contradiction: number;
  reliabilityMultiplier: number;
  skipped: boolean;
};

export function calculateItemAnswer(question: QuestionItem, answer: StoredAnswer | undefined): ItemAnswerCalculation {
  if (!answer || answer.kind === 'skip') {
    return { entries: [], possible: collectPossible(question), ambiguity: 0, contradiction: 0, reliabilityMultiplier: 0, skipped: true };
  }

  if (answer.kind === 'choice') {
    const selected = question.options?.find((opt) => opt.id === answer.optionId);
    return {
      entries: selected ? [{ option: selected, multiplier: 1 }] : [],
      possible: collectPossible(question),
      ambiguity: 0,
      contradiction: 0,
      reliabilityMultiplier: 1,
      skipped: !selected
    };
  }

  if (answer.kind === 'multi') {
    const selected = (question.options ?? []).filter((opt) => answer.optionIds.includes(opt.id));
    const tooMany = answer.optionIds.length > 3;
    return {
      entries: selected.map((option) => ({ option, multiplier: tooMany ? 0.55 : 0.75 })),
      possible: collectPossible(question),
      ambiguity: Math.max(0, answer.optionIds.length - 2) * 0.35,
      contradiction: tooMany ? 0.3 : 0,
      reliabilityMultiplier: tooMany ? 0.75 : 0.9,
      skipped: selected.length === 0
    };
  }

  if (answer.kind === 'rank') {
    const byId = new Map((question.options ?? []).map((opt) => [opt.id, opt]));
    const entries = answer.orderedOptionIds
      .map((id, idx) => {
        const option = byId.get(id);
        return option ? { option, multiplier: RANK_MULTIPLIERS[idx] ?? -0.1 } : undefined;
      })
      .filter(Boolean) as Array<{ option: QuestionOption; multiplier: number }>;
    return {
      entries,
      possible: collectPossible(question),
      ambiguity: 0,
      contradiction: 0,
      reliabilityMultiplier: 0.92,
      skipped: entries.length === 0
    };
  }

  if (answer.kind === 'match') {
    const entries: Array<{ option: QuestionOption; multiplier: number }> = [];
    for (const pair of question.pairs ?? []) {
      const selected = pair.rightOptions.find((opt) => opt.id === answer.pairs[pair.leftId]);
      if (selected) entries.push({ option: selected, multiplier: 1 });
    }
    return {
      entries,
      possible: collectPossible(question),
      ambiguity: entries.length < (question.pairs?.length ?? 0) ? 0.4 : 0,
      contradiction: 0,
      reliabilityMultiplier: 0.86,
      skipped: entries.length === 0
    };
  }

  if (answer.kind === 'connect') {
    const dots = question.dots ?? [];
    const byId = new Map(dots.map((dot) => [dot.id, dot]));
    const entries: Array<{ option: QuestionOption; multiplier: number }> = [];
    for (const [leftId, rightId] of Object.entries(answer.connections)) {
      const left = byId.get(leftId);
      const right = byId.get(rightId);
      if (left) entries.push({ option: { id: left.id, text: left.label, subtleMeaning: 'Connected left dot.', weights: left.weights }, multiplier: 0.65 });
      if (right) entries.push({ option: { id: right.id, text: right.label, subtleMeaning: 'Connected right dot.', weights: right.weights }, multiplier: 0.65 });
    }
    return {
      entries,
      possible: collectPossible(question),
      ambiguity: 0.2,
      contradiction: 0,
      reliabilityMultiplier: 0.82,
      skipped: entries.length === 0
    };
  }

  return { entries: [], possible: collectPossible(question), ambiguity: 0, contradiction: 0, reliabilityMultiplier: 0, skipped: true };
}

export function collectPossible(question: QuestionItem): QuestionOption[] {
  if (question.options?.length) return question.options;
  if (question.left && question.right) return [question.left, question.right];
  if (question.pairs?.length) return question.pairs.flatMap((pair) => pair.rightOptions);
  if (question.dots?.length) return question.dots.map((dot) => ({ id: dot.id, text: dot.label, subtleMeaning: 'Connect dot.', weights: dot.weights }));
  return [];
}
