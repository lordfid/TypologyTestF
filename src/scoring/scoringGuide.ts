export const SCORING_GUIDE = {
  purpose:
    'Scoring utama memakai sinyal berlapis: evidence dasar, fungsi kognitif, role, konteks, stress, defense, dan sistem tipologi lain. Hasil dibaca sebagai kemungkinan tipologi, bukan kepastian klinis.',
  swipeMultipliers: {
    left: { left: 1, right: 0 },
    right: { left: 0, right: 1 },
    both: { left: 0.45, right: 0.45, ambiguity: 1, contextFlexibility: 1 },
    neither: { left: -0.15, right: -0.15, nonIdentification: 1, ambiguity: 0.5 },
    depends: { left: 0.25, right: 0.25, contextDependence: 1, ambiguity: 0.7 },
    skip: { left: 0, right: 0, skipped: 1 }
  },
  rankingMultipliers: [1, 0.7, 0.45, 0.2, -0.05, -0.1],
  confidenceIngredients: [
    'gap top 1 vs top 2',
    'volume evidence',
    'sebaran konteks',
    'konsistensi jawaban',
    'rendahnya kontradiksi',
    'kelengkapan jawaban'
  ],
  forbiddenUiHint:
    'Teks pilihan tidak boleh terasa seperti definisi fungsi atau istilah scoring. Opsi dibuat sebagai adegan, benda, tempat, kalimat, tindakan, atau asosiasi.'
} as const;
