import type { QuestionItem, StoredAnswer, SwipeAnswerValue } from '../types';
import { ChoiceQuestionCard } from './ChoiceQuestionCard';
import { ConnectQuestionCard } from './ConnectQuestionCard';
import { FictionalFateCard } from './FictionalFateCard';
import { MatchQuestionCard } from './MatchQuestionCard';
import { RankingQuestionCard } from './RankingQuestionCard';
import { SongGenreCard } from './SongGenreCard';
import { SwipeQuestionCard } from './SwipeQuestionCard';

type Props = {
  question: QuestionItem;
  onAnswer: (answer: StoredAnswer) => void;
  onSwipeAnswer: (answer: SwipeAnswerValue) => void;
  onSkip: () => void;
  onBack: () => void;
  canBack: boolean;
};

export function QuestionRenderer({ question, onAnswer, onSwipeAnswer, onSkip, onBack, canBack }: Props) {
  if (question.kind === 'swipePair') {
    return <SwipeQuestionCard question={question} onAnswer={onSwipeAnswer} onBack={onBack} canBack={canBack} />;
  }

  if (question.kind === 'ranking') {
    return <RankingQuestionCard question={question} onAnswer={onAnswer} onSkip={onSkip} />;
  }

  if (question.kind === 'dragMatch') {
    return <MatchQuestionCard question={question} onAnswer={onAnswer} onSkip={onSkip} />;
  }

  if (question.kind === 'connectDots') {
    return <ConnectQuestionCard question={question} onAnswer={onAnswer} onSkip={onSkip} />;
  }

  if (question.kind === 'songGenreChoice') {
    return <SongGenreCard question={question} onAnswer={onAnswer} onSkip={onSkip} />;
  }

  if (question.kind === 'fictionalFate') {
    return <FictionalFateCard question={question} onAnswer={onAnswer} onSkip={onSkip} />;
  }

  return <ChoiceQuestionCard question={question} onAnswer={onAnswer} onSkip={onSkip} />;
}
