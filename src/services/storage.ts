import type { AnswerMap } from '../types';

const STORAGE_KEY = 'tes-kepribadian-mendalam:v1';
const THEME_KEY = 'tes-kepribadian-mendalam:theme';

export type SavedProgress = {
  answers: AnswerMap;
  currentIndex: number;
  tieBreakAdded: boolean;
  questionIds: string[];
  savedAt: string;
};

export function saveProgress(progress: SavedProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function loadProgress(): SavedProgress | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedProgress;
  } catch {
    return null;
  }
}

export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

export function saveTheme(theme: 'light' | 'dark') {
  localStorage.setItem(THEME_KEY, theme);
}

export function loadTheme(): 'light' | 'dark' {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}
