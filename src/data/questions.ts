import type { QuestionItem } from '../types';
import { questionItemsCognitive } from './questionItemsCognitive';
import { questionItemsShadow } from './questionItemsShadow';
import { questionItemsEnneagram } from './questionItemsEnneagram';
import { questionItemsInstinct } from './questionItemsInstinct';
import { questionItemsTraits } from './questionItemsTraits';
import { questionItemsRelationship } from './questionItemsRelationship';
import { questionItemsWorkValues } from './questionItemsWorkValues';
import { questionItemsFictional } from './questionItemsFictional';
import { questionItemsTieBreak } from './questionItemsTieBreak';

export const baseQuestions: QuestionItem[] = [
  ...questionItemsCognitive,
  ...questionItemsShadow,
  ...questionItemsEnneagram,
  ...questionItemsInstinct,
  ...questionItemsTraits,
  ...questionItemsRelationship,
  ...questionItemsWorkValues,
  ...questionItemsFictional
];

export const tieBreakQuestions: QuestionItem[] = questionItemsTieBreak;

export const allQuestions: QuestionItem[] = [...baseQuestions, ...tieBreakQuestions];

export function getQuestionById(id: string): QuestionItem | undefined {
  return allQuestions.find((question) => question.id === id);
}
