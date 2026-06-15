import type { AuditWarning, CognitiveFunction, QuestionItem } from '../types';
import { COGNITIVE_FUNCTIONS } from './scoreSchema';

const hintWords = [
  'pola', 'interaksi', 'makna', 'kemungkinan', 'harmoni', 'nilai pribadi', 'logika internal', 'efisiensi',
  'sensorik', 'masa depan', 'masa lalu', 'struktur', 'sistem', 'konsistensi', 'validasi', 'identitas',
  'intensitas', 'keamanan', 'kontrol', 'otonomi', 'keteraturan', 'spontanitas', 'abstrak', 'konkret',
  'intuitif', 'rasional', 'emosional', 'sosial', 'fungsi', 'tipe', 'enneagram', 'mbti', 'introvert', 'extrovert'
];

export function runFairnessCheck(questions: QuestionItem[]): AuditWarning[] {
  const warnings: AuditWarning[] = [];
  const kindCount: Record<string, number> = {};
  const functionCount: Record<CognitiveFunction, number> = Object.fromEntries(COGNITIVE_FUNCTIONS.map((fn) => [fn, 0])) as Record<CognitiveFunction, number>;
  const contextCount: Record<string, number> = {};
  let emptyWeightOptions = 0;
  let extremePairs = 0;
  let fictional = 0;
  let obviousText = 0;

  for (const question of questions) {
    kindCount[question.kind] = (kindCount[question.kind] ?? 0) + 1;
    contextCount[question.context.theme] = (contextCount[question.context.theme] ?? 0) + 1;
    if (question.context.fictionalMode) fictional += 1;
    if (question.opposition?.strength === 'extreme') extremePairs += 1;
    const options = [...(question.options ?? []), ...(question.left ? [question.left] : []), ...(question.right ? [question.right] : []), ...(question.pairs?.flatMap((p) => p.rightOptions) ?? [])];
    for (const opt of options) {
      if (!opt.weights || Object.keys(opt.weights).length === 0) emptyWeightOptions += 1;
      for (const [fn, value] of Object.entries(opt.weights.cognitive ?? {}) as [CognitiveFunction, number][]) {
        if (value > 0) functionCount[fn] += 1;
      }
      const lower = opt.text.toLowerCase();
      if (hintWords.some((word) => lower.includes(word))) obviousText += 1;
    }
  }

  if (questions.length < 180) warnings.push({ level: 'danger', message: `Jumlah item hanya ${questions.length}; target minimal 180.` });
  if (emptyWeightOptions > 0) warnings.push({ level: 'danger', message: `${emptyWeightOptions} opsi tidak punya bobot scoring.` });
  const minFn = Math.min(...Object.values(functionCount));
  const maxFn = Math.max(...Object.values(functionCount));
  if (maxFn - minFn > 35) warnings.push({ level: 'warning', message: `Sebaran fungsi kognitif agak timpang: min ${minFn}, max ${maxFn}.` });
  if ((kindCount.swipePair ?? 0) < questions.length * 0.2) warnings.push({ level: 'warning', message: 'Swipe pair terlalu sedikit untuk rancangan awal.' });
  if (fictional > questions.length * 0.12) warnings.push({ level: 'warning', message: 'Fictional fate terlalu dominan dibanding situasi hidup nyata.' });
  if (extremePairs > questions.length * 0.12) warnings.push({ level: 'warning', message: 'Pair extreme cukup banyak; peserta bisa merasa dipaksa.' });
  if (obviousText > 0) warnings.push({ level: 'warning', message: `${obviousText} opsi mengandung kata yang berpotensi terlalu memberi hint.` });
  return warnings;
}
