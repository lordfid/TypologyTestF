import { useState } from 'react';
import type { QuestionItem, StoredAnswer } from '../types';

type Props = {
  question: QuestionItem;
  onAnswer: (answer: StoredAnswer) => void;
  onSkip: () => void;
};

export function ChoiceQuestionCard({ question, onAnswer, onSkip }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const isMulti = question.kind === 'multiChoice';
  const options = question.options ?? [];

  function toggle(id: string) {
    if (!isMulti) {
      setSelected([id]);
      return;
    }
    setSelected((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  }

  function submit() {
    if (isMulti) {
      onAnswer({ kind: 'multi', questionId: question.id, optionIds: selected, answeredAt: new Date().toISOString() });
      return;
    }
    const optionId = selected[0];
    if (!optionId) return;
    onAnswer({ kind: 'choice', questionId: question.id, optionId, answeredAt: new Date().toISOString() });
  }

  return (
    <article className="questionCard">
      <div className="contextPills">
        <span>{question.context.place}</span>
        <span>{question.context.relationship}</span>
        <span>{question.context.emotion}</span>
      </div>
      <h2>{question.prompt}</h2>
      <p className="instruction">{question.instruction}</p>
      <div className="optionGrid">
        {options.map((option) => (
          <button
            type="button"
            key={option.id}
            className={`optionButton ${selected.includes(option.id) ? 'selected' : ''}`}
            onClick={() => toggle(option.id)}>
            {option.text}
          </button>
        ))}
      </div>
      <div className="questionActions">
        <button className="primaryButton" type="button" onClick={submit} disabled={selected.length === 0}>Jawab</button>
        <button className="ghostButton" type="button" onClick={onSkip}>Lewati</button>
      </div>
    </article>
  );
}
