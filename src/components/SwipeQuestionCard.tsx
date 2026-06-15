import { useEffect, useRef, useState } from 'react';
import type { QuestionItem, SwipeAnswerValue } from '../types';

type Props = {
  question: QuestionItem;
  onAnswer: (answer: SwipeAnswerValue) => void;
  onBack: () => void;
  canBack: boolean;
};

export function SwipeQuestionCard({ question, onAnswer, onBack, canBack }: Props) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.tagName === 'SELECT') return;
      const key = event.key.toLowerCase();
      if (key === 'a') onAnswer('left');
      if (key === 'd') onAnswer('right');
      if (key === 'w') onAnswer('both');
      if (key === 's') onAnswer('neither');
      if (key === 't') onAnswer('depends');
      if (key === 'l') onAnswer('skip');
      if (event.key === 'Backspace' && canBack) onBack();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [canBack, onAnswer, onBack]);

  return (
    <article className="questionCard swipeCard" ref={cardRef}
      onTouchStart={(e) => setTouchStart(e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        if (touchStart === null) return;
        const end = e.changedTouches[0]?.clientX ?? touchStart;
        const diff = end - touchStart;
        if (Math.abs(diff) > 70) onAnswer(diff < 0 ? 'left' : 'right');
        setTouchStart(null);
      }}>
      <div className="contextPills">
        <span>{question.context.place}</span>
        <span>{question.context.relationship}</span>
        <span>{question.context.emotion}</span>
      </div>
      <h2>{question.prompt}</h2>
      <p className="instruction">{question.instruction}</p>
      <div className="swipeChoices">
        <button type="button" className="choiceTile" onClick={() => onAnswer('left')}>
          <span className="choiceLabel">Kiri</span>
          {question.left?.text}
        </button>
        <button type="button" className="choiceTile" onClick={() => onAnswer('right')}>
          <span className="choiceLabel">Kanan</span>
          {question.right?.text}
        </button>
      </div>
      <div className="neutralGrid">
        <button type="button" onClick={() => onAnswer('both')}>Dua-duanya</button>
        <button type="button" onClick={() => onAnswer('neither')}>Tidak dua-duanya</button>
        <button type="button" onClick={() => onAnswer('depends')}>Tergantung</button>
        <button type="button" onClick={() => onAnswer('skip')}>Lewati</button>
      </div>
      <p className="keyboardHint">Desktop: A kiri, D kanan, W dua-duanya, S tidak dua-duanya, T tergantung, L lewati.</p>
    </article>
  );
}
