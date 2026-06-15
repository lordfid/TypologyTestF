import type { QuestionItem, StoredAnswer } from '../types';
import { ChoiceQuestionCard } from './ChoiceQuestionCard';

export function SongGenreCard({ question, onAnswer, onSkip }: { question: QuestionItem; onAnswer: (answer: StoredAnswer) => void; onSkip: () => void }) {
  return <ChoiceQuestionCard question={question} onAnswer={onAnswer} onSkip={onSkip} />;
}
