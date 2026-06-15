import { useMemo, useState } from 'react';
import type { QuestionItem, StoredAnswer } from '../types';

type Props = {
  question: QuestionItem;
  onAnswer: (answer: StoredAnswer) => void;
  onSkip: () => void;
};

export function ConnectQuestionCard({ question, onAnswer, onSkip }: Props) {
  const dots = question.dots ?? [];
  const leftDots = useMemo(() => dots.filter((dot) => dot.group === 'left'), [dots]);
  const rightDots = useMemo(() => dots.filter((dot) => dot.group === 'right'), [dots]);
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [activeLeft, setActiveLeft] = useState<string | null>(null);

  function connect(rightId: string) {
    if (!activeLeft) return;
    setConnections((current) => ({ ...current, [activeLeft]: rightId }));
    setActiveLeft(null);
  }

  return (
    <article className="questionCard">
      <div className="contextPills"><span>{question.context.place}</span><span>{question.context.relationship}</span><span>{question.context.emotion}</span></div>
      <h2>{question.prompt}</h2>
      <p className="instruction">{question.instruction}</p>
      <div className="connectGrid">
        <div>
          <h4>Sisi kiri</h4>
          {leftDots.map((dot) => (
            <button key={dot.id} className={`dotButton ${activeLeft === dot.id ? 'selected' : ''}`} type="button" onClick={() => setActiveLeft(dot.id)}>{dot.label}</button>
          ))}
        </div>
        <div>
          <h4>Sisi kanan</h4>
          {rightDots.map((dot) => (
            <button key={dot.id} className="dotButton" type="button" onClick={() => connect(dot.id)} disabled={!activeLeft}>{dot.label}</button>
          ))}
        </div>
      </div>
      <div className="connectionList">
        {Object.entries(connections).map(([left, right]) => (
          <span key={left}>{leftDots.find((dot) => dot.id === left)?.label} → {rightDots.find((dot) => dot.id === right)?.label}</span>
        ))}
      </div>
      <div className="questionActions">
        <button className="primaryButton" type="button" onClick={() => onAnswer({ kind: 'connect', questionId: question.id, connections, answeredAt: new Date().toISOString() })} disabled={Object.keys(connections).length === 0}>Simpan hubungan</button>
        <button className="ghostButton" type="button" onClick={onSkip}>Lewati</button>
      </div>
    </article>
  );
}
