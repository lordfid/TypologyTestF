import type { FinalResult, RankedScore } from '../types';

const topName = (items: RankedScore[], fallback: string) => items[0]?.key ?? fallback;

export function makeLocalNarrative(result: FinalResult): string {
  const topMbti = result.topMbti[0];
  const secondMbti = result.topMbti[1];
  const enneagram = result.enneagram[0];
  const stress = topName(result.stressResponse, 'campuran');
  const defense = topName(result.defensePattern, 'menahan diri');
  const relation = topName(result.relationshipTendency, 'kontekstual');
  const evidence = result.evidence.slice(0, 5).map((x) => x.key).join(', ');

  const closeNote = secondMbti
    ? `Tipe pertama mengungguli ${secondMbti.type}, tetapi jaraknya tetap perlu dibaca hati-hati kalau beberapa jawabanmu banyak berada di tengah.`
    : 'Tidak ada tipe kedua yang cukup dekat untuk ditarik terlalu jauh.';

  return [
    `Pola jawabanmu paling dekat dengan ${topMbti?.type ?? 'hasil yang masih kabur'} dengan keyakinan ${result.confidenceLabel.toLowerCase()}. Ini bukan label final; ia lebih seperti peta kecenderungan dari cara kau memilih adegan, benda, tempat, kalimat, dan reaksi kecil.`,
    `Yang tampak kuat: ${evidence || 'beberapa sinyal masih tersebar'}. Artinya, hasil ini tidak hanya membaca satu pilihan besar, tetapi pengulangan kecil dari banyak konteks.`,
    enneagram
      ? `Untuk Enneagram, kecenderungan teratas mengarah ke tipe ${enneagram.key}. Bacanya bukan “kau pasti tipe itu”, melainkan dorongan batin itu cukup sering muncul di balik cara kau menolak, membantu, pergi, diam, atau tetap tinggal.`
      : 'Sinyal Enneagram belum terlalu tajam, jadi bagian ini perlu dibaca lebih longgar.',
    `Dalam tekanan, respons yang tampak lebih sering adalah ${stress}. Cara bertahan yang muncul cenderung ${defense}. Dalam relasi, kecenderungannya mengarah ke ${relation}, tetapi konteks tetap penting: orang, tempat, dan rasa aman bisa mengubah caramu bergerak.`,
    closeNote,
    result.notes.join(' ')
  ].filter(Boolean).join('\n\n');
}

export const RESULT_READING_ADVICE = [
  'Baca hasil sebagai kecenderungan, bukan vonis.',
  'Perhatikan bagian yang dekat skornya; kadang itulah area paling hidup.',
  'Jika banyak jawaban “dua-duanya” atau “tergantung”, hasilmu mungkin sangat dipengaruhi konteks.',
  'Gunakan hasil untuk refleksi, bukan untuk mengunci diri atau orang lain.'
];
