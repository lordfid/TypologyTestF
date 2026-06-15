import type { QuestionItem, QuestionOption } from '../types';
import { choiceItem, option, swipeItem } from './questionItems';

const items: QuestionItem[] = [];

const traitSwipes = [
  ['kamar berantakan', 'Kamar berantakan, tapi ada ide kecil yang membuatmu ingin keluar malam itu.', ['order', 'Si', 'one'], ['Ne', 'seven', 'freedom']],
  ['diajak tampil', 'Seseorang menyodorkan microphone di acara kecil.', ['bold', 'Se', 'three'], ['quiet', 'Ni', 'five']],
  ['orang minta maaf', 'Orang yang menyakitimu meminta maaf tanpa banyak penjelasan.', ['tender', 'Fe', 'nine'], ['truth', 'Ti', 'one']],
  ['hari terlalu penuh', 'Jadwalmu penuh dan kepala mulai panas.', ['order', 'Te', 'sp'], ['quiet', 'Fi', 'five']],
  ['toko baju', 'Kau memilih pakaian untuk hari yang penting.', ['image', 'three', 'so'], ['bodyFirm', 'sp', 'Si']],
  ['ide aneh', 'Sebuah ide aneh muncul saat semua orang memilih cara biasa.', ['Ne', 'freedom', 'seven'], ['order', 'Si', 'one']]
] as const;

traitSwipes.forEach(([theme, prompt, leftSignals, rightSignals], i) => {
  items.push(
    swipeItem({
      id: `trait_swipe_${String(i + 1).padStart(3, '0')}`,
      index: 500 + i,
      theme,
      prompt: `${prompt} Mana yang lebih dekat?`,
      left: option('left', i % 2 === 0 ? 'Aku membereskan bagian yang paling mengganggu dulu, baru mengikuti dorongan lain.' : 'Aku maju sebentar, tersenyum, dan membiarkan ruangan tahu aku ada.', 'Trait pole A.', leftSignals as any),
      right: option('right', i % 2 === 0 ? 'Aku membiarkan tas tetap terbuka dan mengikuti rasa penasaran itu dulu.' : 'Aku mundur ke kursi belakang dan membiarkan orang lain mengambil sorot lampu.', 'Trait pole B.', rightSignals as any),
      pairKind: 'traitContrast',
      strength: 'medium',
      targetSignals: ['Big Five', 'HEXACO', 'trait contrast'],
      reliability: 0.76
    })
  );
});

const traitOptions: QuestionOption[] = [
  option('tidy', 'menyusun meja sampai ada ruang kosong', 'Order and reset.', ['order', 'Te', 'sp'], { hexaco: { conscientiousness: 1 }, bigFive: { conscientiousness: 1 } }),
  option('ask', 'bertanya pada orang paling diam apakah ia mau ikut', 'Gentle inclusion.', ['tender', 'Fe', 'two'], { bigFive: { agreeableness: 1.1 }, hexaco: { agreeableness: 0.8 } }),
  option('stage', 'mengambil tempat dekat lampu agar wajahmu tidak hilang', 'Visible energy.', ['bold', 'image', 'three'], { bigFive: { extraversion: 1.1 }, hexaco: { extraversion: 1 } }),
  option('strange', 'membeli benda kecil yang tidak berguna tapi terasa seperti cerita', 'Aesthetic curiosity.', ['Ne', 'four'], { bigFive: { openness: 1.3 }, hexaco: { openness: 1.2 } }),
  option('fair', 'mengembalikan uang lebih walau tidak ada yang tahu', 'Quiet honesty.', ['one', 'truth'], { hexaco: { honestyHumility: 2 }, moral: { integrityBased: 1 } }),
  option('shaking', 'menutup pintu dan duduk sampai tangan berhenti gemetar', 'Threat sensitivity.', ['quiet', 'six'], { bigFive: { neuroticism: 1.4 }, hexaco: { emotionality: 1.3 }, stress: { freeze: 0.6 } })
];

for (let i = 0; i < 6; i += 1) {
  items.push(
    choiceItem({
      id: `trait_choice_${String(i + 1).padStart(3, '0')}`,
      index: 520 + i,
      kind: ['objectChoice', 'placeChoice', 'firstReaction', 'hiddenReaction', 'scenarioCard', 'dialogueChoice'][i] as any,
      theme: ['pagi kacau', 'orang baru di meja', 'hari penting', 'toko kecil', 'uang kembalian', 'kabur dari ramai'][i],
      prompt: [
        'Pagi kacau. Benda atau aksi kecil mana yang kau pilih agar bisa bergerak lagi?',
        'Di meja yang penuh orang baru, apa yang paling mungkin kau lakukan?',
        'Hari penting, banyak mata melihat. Apa yang kau pilih?',
        'Di toko kecil, matamu berhenti pada benda yang tidak masuk daftar belanja. Apa yang terjadi?',
        'Kasir memberi uang kembalian lebih. Apa yang kau lakukan tanpa banyak berpikir?',
        'Ruangan terlalu ramai dan tubuhmu mulai memberi sinyal. Apa yang kau lakukan?'
      ][i],
      instruction: 'Pilih satu.',
      options: [...traitOptions.slice(i % 3), ...traitOptions.slice(0, i % 3)],
      targetSignals: ['Big Five', 'HEXACO', 'temperament'],
      reliability: 0.77
    })
  );
}

const apOptions: QuestionOption[] = [
  option('l1', 'aku bertanya satu hal kecil sampai jawabannya tidak licin lagi', 'Confident logic stance.', ['logicFirm', 'Ti', 'truth']),
  option('l2', 'aku membuka ruang untuk orang lain membongkar jawabannya bersamaku', 'Flexible logic stance.', ['logicFlexible', 'Ne', 'tender']),
  option('e1', 'aku menyebut perasaanku tanpa membuatnya jadi teka-teki', 'Confident emotion stance.', ['emotionFirm', 'Fi', 'sx']),
  option('e2', 'aku menyesuaikan nada bicara agar orang lain berani jujur', 'Flexible emotion stance.', ['emotionFlexible', 'Fe', 'two']),
  option('f1', 'aku makan dulu, mandi, lalu baru bicara soal yang berat', 'Confident body stance.', ['bodyFirm', 'sp', 'Si']),
  option('f2', 'aku mengambilkan kursi, air, dan ruang untuk siapa pun yang butuh', 'Flexible physical care.', ['bodyFlexible', 'Fe', 'craft']),
  option('v1', 'aku memilih dan siap membuat orang tidak setuju', 'Confident will stance.', ['willFirm', 'Te', 'eight']),
  option('v2', 'aku menanyakan apa yang mereka mau sebelum menentukan arah', 'Flexible will stance.', ['willFlexible', 'Fe', 'so'])
];

for (let i = 0; i < 12; i += 1) {
  items.push(
    choiceItem({
      id: `ap_choice_${String(i + 1).padStart(3, '0')}`,
      index: 550 + i,
      kind: i % 4 === 0 ? 'dialogueChoice' : i % 4 === 1 ? 'firstReaction' : i % 4 === 2 ? 'objectChoice' : 'scenarioCard',
      theme: ['debat kecil', 'orang menangis', 'tubuh lapar', 'pilihan sulit', 'kelas ramai', 'kafe sepi', 'rumah sakit', 'kerja mendesak', 'keluarga menuntut', 'pasangan diam', 'gagal rencana', 'teman meminta arah'][i],
      prompt: [
        'Dalam debat kecil yang mulai melebar, gerakan mana yang paling dekat?',
        'Seseorang menangis tapi tidak mau menjelaskan. Respons mana yang muncul?',
        'Kau lapar, lelah, dan orang meminta obrolan berat. Apa yang kau pilih?',
        'Semua orang menunggu keputusanmu. Apa yang lebih mungkin terjadi?',
        'Di kelas ramai, jawaban guru terasa tidak jelas. Apa yang kau lakukan?',
        'Di kafe sepi, temanmu menahan sesuatu di wajahnya. Apa yang kau lakukan?',
        'Di ruang tunggu rumah sakit, apa yang pertama kau pastikan?',
        'Kerja mendesak dan orang-orang saling tunggu. Apa gerakanmu?',
        'Keluarga menuntut jawaban yang tidak ingin kau beri. Apa yang kau lakukan?',
        'Pasangan diam terlalu lama. Apa kalimat atau gerakanmu?',
        'Rencana gagal mendadak. Apa yang kau pegang dulu?',
        'Teman meminta arah hidup padamu. Apa yang kau lakukan?'
      ][i],
      instruction: 'Pilih satu yang paling terasa natural.',
      options: [...apOptions.slice(i % 5), ...apOptions.slice(0, i % 5)].slice(0, 6),
      targetSignals: ['Attitudinal Psyche', 'L E F V', 'position attitude'],
      reliability: 0.74
    })
  );
}

export const questionItemsTraits: QuestionItem[] = items;
