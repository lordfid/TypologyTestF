import { useMemo, useState } from 'react';
import type { QuestionItem, StoredAnswer } from '../types';

type Props = {
  question: QuestionItem;
  onAnswer: (answer: StoredAnswer) => void;
  onSkip: () => void;
};

export function RankingQuestionCard({ question, onAnswer, onSkip }: Props) {
  const initial = useMemo(() => (question.options ?? []).map((opt) => opt.id), [question]);
  const [order, setOrder] = useState(initial);
  const byId = new Map((question.options ?? []).map((opt) => [opt.id, opt]));

  function move(id: string, direction: -1 | 1) {
    setOrder((current) => {
      const idx = current.indexOf(id);
      const nextIdx = idx + direction;
      if (idx < 0 || nextIdx < 0 || nextIdx >= current.length) return current;
      const copy = [...current];
      [copy[idx], copy[nextIdx]] = [copy[nextIdx], copy[idx]];
      return copy;
    });
  }

  return (
    <article className="questionCard">
      <div className="contextPills"><span>{question.context.place}</span><span>{question.context.relationship}</span><span>{question.context.emotion}</span></div>
      <h2>{question.prompt}</h2>
      <p className="instruction">{question.instruction}</p>
      <div className="rankingList">
        {order.map((id, idx) => (
          <div className="rankingItem" key={id}>
            <span className="rankNumber">{idx + 1}</span>
            <span>{byId.get(id)?.text}</span>
            <div className="rankControls">
              <button type="button" onClick={() => move(id, -1)} disabled={idx === 0}>Naik</button>
              <button type="button" onClick={() => move(id, 1)} disabled={idx === order.length - 1}>Turun</button>
            </div>
          </div>
        ))}
      </div>
      <div className="questionActions">
        <button className="primaryButton" type="button" onClick={() => onAnswer({ kind: 'rank', questionId: question.id, orderedOptionIds: order, answeredAt: new Date().toISOString() })}>Simpan urutan</button>
        <button className="ghostButton" type="button" onClick={onSkip}>Lewati</button>
      </div>
    </article>
  );
}
