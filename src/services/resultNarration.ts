import type { FinalResult } from '../types';

export async function requestLongNarrative(result: FinalResult): Promise<string> {
  const response = await fetch('/api/generateResult', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ result })
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.ok || !data?.narrative) {
    throw new Error(data?.message ?? 'Versi bacaan panjang belum bisa dibuat. Hasil utama tetap tersedia.');
  }
  return data.narrative as string;
}
