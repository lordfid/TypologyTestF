import type { QuestionItem } from '../types';
import { runFairnessCheck } from './fairnessCheck';

export function auditScoring(questions: QuestionItem[]) {
  if (import.meta.env.DEV) {
    const warnings = runFairnessCheck(questions);
    warnings.forEach((warning) => {
      const prefix = `[audit scoring/${warning.level}]`;
      if (warning.level === 'danger') console.warn(prefix, warning.message);
      else console.warn(prefix, warning.message);
    });
  }
}
