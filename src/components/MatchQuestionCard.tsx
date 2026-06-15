import { useState } from 'react';
import type { QuestionItem, StoredAnswer } from '../types';

type Props = {
  question: QuestionItem;
  onAnswer: (answer: StoredAnswer) => void;
  onSkip: () => void;
};

export function MatchQuestionCard({ question, onAnswer, onSkip }: Props) {
  const [pairs, setPairs] = useState<Record<string, string>>({});
  const rows = question.pairs ?? [];

  return (
    <article className="questionCard">
      <div className="contextPills"><span>{question.context.place}</span><span>{question.context.relationship}</span><span>{question.context.emotion}</span></div>
      <h2>{question.prompt}</h2>
      <p className="instruction">{question.instruction}</p>
      <div className="matchList">
        {rows.map((row) => (
          <label className="matchRow" key={row.leftId}>
            <span>{row.leftText}</span>
            <select value={pairs[row.leftId] ?? ''} onChange={(event) => setPairs((current) => ({ ...current, [row.leftId]: event.target.value }))}>
              <option value="">Pilih pasangan</option>
              {row.rightOptions.map((opt) => <option key={opt.id} value={opt.id}>{opt.text}</option>)}
            </select>
          </label>
        ))}
      </div>
      <div className="questionActions">
        <button className="primaryButton" type="button" onClick={() => onAnswer({ kind: 'match', questionId: question.id, pairs, answeredAt: new Date().toISOString() })} disabled={Object.keys(pairs).length === 0}>Simpan pasangan</button>
        <button className="ghostButton" type="button" onClick={onSkip}>Lewati</button>
      </div>
    </article>
  );
}
