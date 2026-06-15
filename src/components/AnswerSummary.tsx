import type { AnswerMap, QuestionItem } from '../types';

export function AnswerSummary({ questions, answers }: { questions: QuestionItem[]; answers: AnswerMap }) {
  const answered = Object.values(answers).filter((answer) => answer.kind !== 'skip').length;
  const skipped = Object.values(answers).filter((answer) => answer.kind === 'skip').length;
  return (
    <div className="answerSummary">
      <span>Dijawab: {answered}</span>
      <span>Dilewati: {skipped}</span>
      <span>Total aktif: {questions.length}</span>
    </div>
  );
}
