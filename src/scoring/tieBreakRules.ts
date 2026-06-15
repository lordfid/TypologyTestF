import type { FinalResult, QuestionItem } from '../types';
import { tieBreakQuestions } from '../data/questions';

export function generateTieBreakItems(result: FinalResult): QuestionItem[] {
  const picks = new Set<string>();
  const top = result.topMbti[0];
  const second = result.topMbti[1];
  if (top && second && Math.abs(top.score - second.score) < 7) {
    picks.add('tie_mbti_nise_001');
    picks.add('tie_mbti_ne_si_001');
    picks.add('tie_mbti_fi_fe_001');
    picks.add('tie_mbti_ti_te_001');
  }
  if (result.enneagram[1] && Math.abs(result.enneagram[0].score - result.enneagram[1].score) < 8) picks.add('tie_ennea_001');
  const instincts = result.instinctStacking.split('/');
  if (instincts.length === 3) picks.add('tie_instinct_001');
  if (result.attitudinalPsyche.length >= 4) picks.add('tie_ap_001');
  if (result.relationshipTendency[1] && Math.abs(result.relationshipTendency[0].score - result.relationshipTendency[1].score) < 8) picks.add('tie_relation_001');
  return tieBreakQuestions.filter((question) => picks.has(question.id));
}
