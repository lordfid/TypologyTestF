import type { QuestionItem, QuestionOption } from '../types';
import { choiceItem, option, swipeItem } from './questionItems';

const items: QuestionItem[] = [];

const workSwipes = [
  ['interview kerja', 'Di ruang wawancara, pewawancara bertanya tentang kegagalanmu. Mana yang lebih mungkin kau pilih?', ['three', 'Te', 'image'], ['truth', 'Fi', 'one']],
  ['dokumen ribet', 'Dokumen administrasi berputar dari loket ke loket. Mana yang lebih dekat?', ['Te', 'order', 'sp'], ['Fe', 'tender', 'so']],
  ['teman curang', 'Kau melihat teman curang tapi semua orang sedang mengejar selesai cepat.', ['truth', 'one', 'Ti'], ['Fe', 'six', 'tender']],
  ['ide kreatif ditolak', 'Ide kreatifmu ditolak karena “biasanya tidak begitu.” Mana yang terjadi?', ['Ne', 'freedom', 'four'], ['Si', 'order', 'one']],
  ['pelanggan marah', 'Pelanggan marah keras di depan banyak orang. Mana yang paling mungkin?', ['Fe', 'tender', 'so'], ['Te', 'bold', 'eight']],
  ['target tinggi', 'Target kerja naik mendadak dan semua orang mengeluh. Mana yang terjadi?', ['Te', 'three', 'willFirm'], ['nine', 'Fe', 'tender']],
  ['pilihan benar tapi mahal', 'Ada keputusan yang lebih jujur, tapi membuatmu rugi. Mana yang lebih dekat?', ['truth', 'one', 'Fi'], ['sp', 'Te', 'six']],
  ['kelas kacau', 'Kelas atau pelatihan menjadi kacau karena semua orang bicara sendiri. Mana yang terjadi?', ['Te', 'bold', 'order'], ['Fe', 'two', 'tender']]
] as const;

workSwipes.forEach(([theme, prompt, leftSignals, rightSignals], i) => {
  items.push(
    swipeItem({
      id: `work_swipe_${String(i + 1).padStart(3, '0')}`,
      index: 700 + i,
      theme,
      prompt,
      left: option('left', i % 2 === 0 ? 'Aku menjawab jujur, tapi memilih bagian yang menunjukkan aku tidak berhenti di sana.' : 'Aku mengambil nomor, mencatat nama petugas, lalu bergerak ke loket berikutnya.', 'Work-value pole A.', leftSignals as any, { riasec: { Enterprising: 0.4, Conventional: 0.4 }, disc: { D: 0.4 } }),
      right: option('right', i % 2 === 0 ? 'Aku menyebut bagian yang memang salah, tanpa membuat diriku tampak lebih suci dari orang lain.' : 'Aku bicara ke orang yang paling bisa melunakkan suasana, baru kembali ke urusan utama.', 'Work-value pole B.', rightSignals as any, { riasec: { Social: 0.5, Conventional: 0.2 }, disc: { S: 0.5 } }),
      pairKind: 'traitContrast',
      strength: 'medium',
      targetSignals: ['work', 'values', 'moral', 'DISC', 'RIASEC'],
      reliability: 0.8
    })
  );
});

const options: QuestionOption[] = [
  option('tool', 'membongkar alatnya dan mencari bagian yang macet', 'Hands-on repair.', ['craft', 'Se', 'Ti'], { riasec: { Realistic: 2 }, work: { maker: 1 }, disc: { C: 0.4 } }),
  option('research', 'membaca tiga sumber sebelum memberi saran', 'Investigation before move.', ['five', 'Ti', 'logicFirm'], { riasec: { Investigative: 2 }, learning: { deepResearch: 1 } }),
  option('sketch', 'membuat sketsa kasar di kertas struk', 'Artistic association.', ['four', 'Ne', 'Fi'], { riasec: { Artistic: 2 }, values: { beauty: 1 } }),
  option('sit', 'duduk di sebelah orang yang hampir menyerah', 'Social support.', ['two', 'Fe', 'tender'], { riasec: { Social: 2 }, work: { helper: 1 } }),
  option('pitch', 'menawarkan cara baru dan meminta orang memilih hari itu juga', 'Enterprising push.', ['three', 'Te', 'bold'], { riasec: { Enterprising: 2 }, disc: { D: 1, I: 0.4 } }),
  option('folder', 'memberi nama folder, menyusun file, lalu mengirim versi rapi', 'Conventional finish.', ['order', 'Si', 'Te'], { riasec: { Conventional: 2 }, disc: { C: 1 } }),
  option('truth', 'mengembalikan barang yang bisa saja kau ambil diam-diam', 'Integrity without audience.', ['truth', 'one', 'Fi'], { moral: { integrityBased: 1.8, truthBased: 1 }, hexaco: { honestyHumility: 1.4 } }),
  option('freedom', 'memilih jalan yang membuatmu tidak perlu berbohong pada diri sendiri', 'Freedom value.', ['freedom', 'Fi', 'seven'], { moral: { freedomBased: 1.5 }, values: { freedom: 1.3 } })
];

for (let i = 0; i < 8; i += 1) {
  items.push(
    choiceItem({
      id: `work_choice_${String(i + 1).padStart(3, '0')}`,
      index: 730 + i,
      kind: ['objectChoice', 'scenarioCard', 'dialogueChoice', 'placeChoice', 'firstReaction', 'hiddenReaction', 'endingChoice', 'singleChoice'][i] as any,
      theme: ['alat rusak', 'riset cepat', 'catatan ide', 'orang hampir menyerah', 'menjual ide', 'file kacau', 'barang temuan', 'jalan sulit'][i],
      prompt: [
        'Di tempat kerja, sesuatu rusak dan semua orang hanya menatap. Apa yang kau lakukan?',
        'Kau diminta memberi saran penting sore ini. Apa yang kau pilih duluan?',
        'Ide datang saat kau sedang di jalan. Apa yang kau lakukan?',
        'Seseorang di tim hampir menyerah. Apa yang paling mungkin kau lakukan?',
        'Ada cara baru yang menurutmu bisa menyelamatkan proyek. Apa yang terjadi?',
        'File kerja berantakan dan deadline dekat. Apa yang kau lakukan?',
        'Kau menemukan barang berharga tanpa saksi. Apa yang terjadi?',
        'Ada pilihan yang membuat hidupmu lebih mudah, tapi harus berpura-pura lama. Apa yang kau pilih?'
      ][i],
      instruction: 'Pilih satu.',
      options: [...options.slice(i % 5), ...options.slice(0, i % 5)].slice(0, 6),
      targetSignals: ['work style', 'values', 'RIASEC', 'moral'],
      reliability: 0.79
    })
  );
}

const songOptions: QuestionOption[] = [
  option('ballad', 'piano pelan, seperti menahan air mata di lampu merah', 'Private emotional processing.', ['Fi', 'four', 'Ni'], { evidence: { moodRegulation: 1, symbolicMeaning: 1 } }),
  option('rock', 'rock marah yang membuat langkahmu lebih cepat', 'Anger mobilization.', ['Se', 'eight', 'sx'], { stress: { fight: 1 }, evidence: { angerResponse: 1.2 } }),
  option('pop', 'pop cerah agar wajahmu tidak runtuh', 'Reframing with a face on.', ['Fe', 'seven', 'image'], { defense: { humorDeflection: 0.8 }, evidence: { imageManagement: 0.8 } }),
  option('dark', 'instrumental gelap seperti adegan film hujan', 'Cinematic inwardness.', ['Ni', 'four', 'sx'], { values: { beauty: 0.8 } }),
  option('old', 'lagu lama dari masa kecil yang masih hafal baunya', 'Nostalgia regulation.', ['Si', 'sp', 'nine'], { evidence: { nostalgiaSeeking: 1.3 } }),
  option('silence', 'tidak ada lagu, hanya suara jalan dan napas sendiri', 'Sensory grounding or numbness.', ['Se', 'five', 'quiet'], { stress: { numb: 0.8 } })
];

for (let i = 0; i < 10; i += 1) {
  items.push(
    choiceItem({
      id: `song_${String(i + 1).padStart(3, '0')}`,
      index: 760 + i,
      kind: 'songGenreChoice',
      theme: ['hari buruk', 'pulang sendiri', 'ditolak halus', 'menang kecil', 'rindu yang malu', 'marah tertahan', 'malam stasiun', 'kota baru', 'sebelum minta maaf', 'setelah pergi'][i],
      prompt: [
        'Kau pulang dari hari yang membuatmu merasa kecil. Lagu seperti apa yang kau nyalakan?',
        'Kau pulang sendiri setelah berpura-pura kuat. Vibe lagu mana yang dekat?',
        'Seseorang menolakmu dengan sangat sopan. Lagu seperti apa yang masuk telinga?',
        'Kau menang kecil setelah lama diremehkan. Lagu mana yang kau pilih?',
        'Rindu datang tanpa izin. Suara seperti apa yang kau biarkan hidup?',
        'Marahmu belum punya alamat. Lagu mana yang menyala?',
        'Di stasiun malam, kau menunggu kereta dan kabar yang belum datang. Vibe mana yang kau pilih?',
        'Kota baru membuatmu terasa asing dan hidup sekaligus. Lagu seperti apa yang kau pasang?',
        'Sebelum minta maaf, kau duduk lama di lantai. Suara mana yang kau pilih?',
        'Setelah benar-benar pergi, lagu seperti apa yang tidak kau skip?'
      ][i],
      instruction: 'Pilih satu vibe lagu.',
      options: [...songOptions.slice(i % 4), ...songOptions.slice(0, i % 4)].slice(0, 6),
      targetSignals: ['mood regulation', 'emotion processing', 'song vibe'],
      reliability: 0.74
    })
  );
}


const matchRightOptions = [
  option('koper', 'koper kecil', 'Leaving and readiness.', ['freedom', 'sp', 'Te']),
  option('mic', 'microphone', 'Visible assertion.', ['bold', 'three', 'Fe']),
  option('letter', 'surat panjang', 'Private repair.', ['Fi', 'four', 'emotionFirm']),
  option('block', 'tombol block', 'Hard boundary.', ['eight', 'Fi', 'willFirm']),
  option('ticket', 'tiket kereta', 'New route.', ['Ne', 'seven', 'freedom']),
  option('blanket', 'selimut tebal', 'Body retreat.', ['sp', 'Si', 'nine']),
  option('mirror', 'kaca kecil', 'Face check.', ['image', 'three', 'Fe'])
];

for (let i = 0; i < 7; i += 1) {
  items.push({
    id: `match_${String(i + 1).padStart(3, '0')}`,
    kind: 'dragMatch',
    context: {
      theme: ['keadaan batin', 'setelah kalah', 'sebelum pergi', 'saat ingin pulang', 'saat ingin membuktikan diri', 'saat ingin memutus', 'saat ingin mulai lagi'][i],
      place: ['kamar malam', 'ruang karaoke', 'stasiun', 'rumah lama', 'panggung kecil', 'chat terakhir', 'kota baru'][i],
      relationship: ['diri sendiri', 'teman lama', 'keluarga', 'pasangan', 'orang yang meremehkanmu', 'mantan', 'masa depanmu'][i],
      emotion: ['campur aduk', 'panas', 'gugup', 'rindu', 'ingin menang', 'lelah', 'hidup lagi'][i],
      pressureLevel: i % 3 === 0 ? 'high' : 'medium',
      timeOrientation: 'mixed',
      socialExposure: i % 2 === 0 ? 'private' : 'semiPrivate',
      emotionalCharge: 'medium',
      fictionalMode: false
    },
    prompt: ['Pasangkan keadaan dengan benda yang paling terasa cocok bagimu.','Pasangkan luka kecil dengan barang yang akan kau pegang.','Pasangkan dorongan batin dengan benda di meja.','Pasangkan suasana malam dengan pilihan kecil.','Pasangkan keinginan diam-diam dengan benda yang muncul di adegan.','Pasangkan akhir hubungan dengan sesuatu yang kau pilih.','Pasangkan awal baru dengan benda yang paling kau percaya.'][i],
    instruction: 'Pilih satu pasangan untuk tiap keadaan. Tidak ada benar atau salah.',
    pairs: [
      { leftId: 'vanish', leftText: 'Saat ingin menghilang', rightOptions: matchRightOptions },
      { leftId: 'prove', leftText: 'Saat ingin membuktikan diri', rightOptions: matchRightOptions },
      { leftId: 'forgive', leftText: 'Saat ingin dimaafkan', rightOptions: matchRightOptions },
      { leftId: 'cut', leftText: 'Saat ingin memutus jarak', rightOptions: matchRightOptions },
      { leftId: 'restart', leftText: 'Saat ingin memulai ulang', rightOptions: matchRightOptions }
    ],
    scoringMode: 'matchAssociation',
    targetSignals: ['match association', 'symbolic response', 'stress response'],
    reliability: 0.68
  });
}

const leftDots = [
  option('anger', 'marah', 'Anger source.', ['eight', 'Se']),
  option('longing', 'rindu', 'Longing source.', ['four', 'sx']),
  option('shame', 'malu', 'Shame source.', ['three', 'four']),
  option('free', 'bebas', 'Freedom source.', ['seven', 'freedom']),
  option('fear', 'takut', 'Fear source.', ['six', 'sp']),
  option('proud', 'bangga', 'Pride source.', ['three', 'Te'])
];
const rightDots = [
  option('night', 'jalan malam', 'Moving through heat.', ['Se', 'freedom']),
  option('locked', 'kamar terkunci', 'Retreat.', ['quiet', 'five']),
  option('stage', 'panggung kecil', 'Visibility.', ['bold', 'image']),
  option('unsent', 'pesan yang tidak dikirim', 'Held words.', ['Fi', 'Ni']),
  option('dish', 'piring yang dicuci diam-diam', 'Backstage repair.', ['Fe', 'Si']),
  option('leave', 'tiket pergi', 'Exit object.', ['Ne', 'seven'])
];

for (let i = 0; i < 7; i += 1) {
  items.push({
    id: `connect_${String(i + 1).padStart(3, '0')}`,
    kind: 'connectDots',
    context: {
      theme: ['asosiasi emosi', 'jalan pulang', 'hal yang disimpan', 'malam sebelum keputusan', 'ruang tunggu', 'setelah dimarahi', 'pintu yang tertutup'][i],
      place: ['kamar pribadi', 'jalan malam', 'laci meja', 'balkon', 'rumah sakit', 'dapur', 'depan cermin'][i],
      relationship: ['diri sendiri', 'orang yang dirindukan', 'keluarga', 'masa depanmu', 'orang sakit', 'orang yang marah', 'orang yang pergi'][i],
      emotion: ['campur aduk', 'kosong', 'tertahan', 'tegang', 'cemas', 'panas', 'hampa'][i],
      pressureLevel: 'medium',
      timeOrientation: 'mixed',
      socialExposure: 'private',
      emotionalCharge: 'medium',
      fictionalMode: false
    },
    prompt: ['Hubungkan hal yang terasa cocok bagimu.','Hubungkan emosi dengan tempat kecil yang muncul di kepala.','Hubungkan kata dengan benda yang seperti menyimpan rahasia.','Hubungkan dorongan dengan pintu yang ingin kau buka.','Hubungkan rasa dengan sesuatu yang akan kau pegang di ruang tunggu.','Hubungkan reaksi dengan adegan setelah dimarahi.','Hubungkan yang tertinggal dengan yang ingin dibawa pergi.'][i],
    instruction: 'Pilih satu sisi kiri, lalu pasangkan dengan satu sisi kanan.',
    dots: [
      ...leftDots.map((opt) => ({ id: `l_${opt.id}`, label: opt.text, group: 'left', weights: opt.weights })),
      ...rightDots.map((opt) => ({ id: `r_${opt.id}`, label: opt.text, group: 'right', weights: opt.weights }))
    ],
    scoringMode: 'matchAssociation',
    targetSignals: ['connect dots', 'association', 'symbolic map'],
    reliability: 0.66
  });
}

export const questionItemsWorkValues: QuestionItem[] = items;
