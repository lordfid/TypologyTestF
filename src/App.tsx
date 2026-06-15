import { useEffect, useMemo, useState } from 'react';
import type { AnswerMap, FinalResult, QuestionItem, StoredAnswer, SwipeAnswerValue } from './types';
import { allQuestions, baseQuestions } from './data/questions';
import { auditScoring } from './scoring/auditScoring';
import { calculateResults } from './scoring/calculateResults';
import { generateTieBreakItems } from './scoring/tieBreakRules';
import { clearProgress, loadProgress, loadTheme, saveProgress, saveTheme } from './services/storage';
import { AnswerSummary } from './components/AnswerSummary';
import { ProgressBar } from './components/ProgressBar';
import { QuestionRenderer } from './components/QuestionRenderer';
import { ResultPage } from './components/ResultPage';
import { StartScreen } from './components/StartScreen';
import { ThemeToggle } from './components/ThemeToggle';

const questionById = new Map(allQuestions.map((question) => [question.id, question]));

type Screen = 'start' | 'test' | 'result';

export default function App() {
  const saved = useMemo(() => loadProgress(), []);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => loadTheme());
  const [screen, setScreen] = useState<Screen>('start');
  const [questions, setQuestions] = useState<QuestionItem[]>(baseQuestions);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tieBreakAdded, setTieBreakAdded] = useState(false);
  const [result, setResult] = useState<FinalResult | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    auditScoring(allQuestions);
  }, []);

  useEffect(() => {
    if (screen !== 'test') return;
    saveProgress({
      answers,
      currentIndex,
      tieBreakAdded,
      questionIds: questions.map((question) => question.id),
      savedAt: new Date().toISOString()
    });
  }, [answers, currentIndex, questions, screen, tieBreakAdded]);

  function startFresh() {
    clearProgress();
    setQuestions(baseQuestions);
    setAnswers({});
    setCurrentIndex(0);
    setTieBreakAdded(false);
    setResult(null);
    setScreen('test');
  }

  function resume() {
    const progress = loadProgress();
    if (!progress) return startFresh();
    const restored = progress.questionIds.map((id) => questionById.get(id)).filter(Boolean) as QuestionItem[];
    setQuestions(restored.length ? restored : baseQuestions);
    setAnswers(progress.answers ?? {});
    setCurrentIndex(Math.min(progress.currentIndex ?? 0, Math.max(0, restored.length - 1)));
    setTieBreakAdded(Boolean(progress.tieBreakAdded));
    setResult(null);
    setScreen('test');
  }

  function finishOrAddTieBreak(nextAnswers: AnswerMap, currentQuestions: QuestionItem[]) {
    const interim = calculateResults(currentQuestions, nextAnswers);
    if (!tieBreakAdded) {
      const tieBreak = generateTieBreakItems(interim).filter((question) => !currentQuestions.some((item) => item.id === question.id));
      if (tieBreak.length > 0) {
        setQuestions([...currentQuestions, ...tieBreak]);
        setTieBreakAdded(true);
        setCurrentIndex(currentQuestions.length);
        return;
      }
    }
    setResult(interim);
    setScreen('result');
    clearProgress();
  }

  function recordAnswer(answer: StoredAnswer) {
    const nextAnswers = { ...answers, [answer.questionId]: answer };
    setAnswers(nextAnswers);
    if (currentIndex >= questions.length - 1) {
      finishOrAddTieBreak(nextAnswers, questions);
      return;
    }
    setCurrentIndex((index) => index + 1);
  }

  function recordSwipeAnswer(value: SwipeAnswerValue) {
    const question = questions[currentIndex];
    if (!question) return;
    recordAnswer({ kind: value, questionId: question.id, answeredAt: new Date().toISOString() } as StoredAnswer);
  }

  function skipCurrent() {
    const question = questions[currentIndex];
    if (!question) return;
    recordAnswer({ kind: 'skip', questionId: question.id, answeredAt: new Date().toISOString() });
  }

  function goBack() {
    setCurrentIndex((index) => Math.max(0, index - 1));
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="appShell">
      <header className="topBar">
        <div>
          <strong>Tes Kepribadian Mendalam</strong>
          <span>pilih adegan, baca kecenderungan</span>
        </div>
        <ThemeToggle theme={theme} onToggle={() => setTheme((value) => value === 'dark' ? 'light' : 'dark')} />
      </header>

      {screen === 'start' && (
        <StartScreen
          hasSavedProgress={Boolean(saved)}
          totalQuestions={baseQuestions.length}
          onStart={startFresh}
          onResume={resume}
          onReset={() => { clearProgress(); window.location.reload(); }}
        />
      )}

      {screen === 'test' && currentQuestion && (
        <main className="testScreen">
          <ProgressBar current={currentIndex + 1} total={questions.length} />
          <AnswerSummary questions={questions} answers={answers} />
          <QuestionRenderer
            question={currentQuestion}
            onAnswer={recordAnswer}
            onSwipeAnswer={recordSwipeAnswer}
            onSkip={skipCurrent}
            onBack={goBack}
            canBack={currentIndex > 0}
          />
          <div className="bottomNav">
            <button className="ghostButton" type="button" onClick={goBack} disabled={currentIndex === 0}>Kembali</button>
            <button className="ghostButton" type="button" onClick={skipCurrent}>Lewati</button>
          </div>
        </main>
      )}

      {screen === 'result' && result && <ResultPage result={result} onRestart={startFresh} />}
    </div>
  );
}
