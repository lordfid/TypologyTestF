import type { QuestionItem } from '../types';
import { choiceItem, cognitiveOption, option, swipeItem } from './questionItems';

export const questionItemsTieBreak: QuestionItem[] = [
  swipeItem({
    id: 'tie_mbti_nise_001',
    index: 900,
    theme: 'tie break Ni Se',
    prompt: 'Ketika semua orang panik dan waktu tinggal sedikit, mana yang lebih dekat denganmu?',
    left: cognitiveOption('left', 'Ni', 0, ['five']),
    right: cognitiveOption('right', 'Se', 0, ['eight']),
    pairKind: 'tieBreak',
    strength: 'extreme',
    targetSignals: ['MBTI tie break', 'Ni', 'Se'],
    reliability: 0.86
  }),
  swipeItem({
    id: 'tie_mbti_ne_si_001',
    index: 901,
    theme: 'tie break Ne Si',
    prompt: 'Saat rencana lama runtuh, mana yang lebih mungkin kau lakukan lebih dulu?',
    left: cognitiveOption('left', 'Ne', 1, ['seven']),
    right: cognitiveOption('right', 'Si', 1, ['six']),
    pairKind: 'tieBreak',
    strength: 'strong',
    targetSignals: ['MBTI tie break', 'Ne', 'Si'],
    reliability: 0.84
  }),
  swipeItem({
    id: 'tie_mbti_fi_fe_001',
    index: 902,
    theme: 'tie break Fi Fe',
    prompt: 'Seseorang memintamu memaafkan di depan orang banyak, padahal luka itu belum selesai. Mana yang lebih dekat?',
    left: cognitiveOption('left', 'Fi', 0, ['four']),
    right: cognitiveOption('right', 'Fe', 0, ['two']),
    pairKind: 'tieBreak',
    strength: 'extreme',
    targetSignals: ['MBTI tie break', 'Fi', 'Fe'],
    reliability: 0.86
  }),
  swipeItem({
    id: 'tie_mbti_ti_te_001',
    index: 903,
    theme: 'tie break Ti Te',
    prompt: 'Kerja tim hampir gagal. Semua ingin cepat, tapi ada bagian yang terasa tidak beres. Mana yang kau pilih?',
    left: cognitiveOption('left', 'Ti', 1, ['truth']),
    right: cognitiveOption('right', 'Te', 0, ['three']),
    pairKind: 'tieBreak',
    strength: 'strong',
    targetSignals: ['MBTI tie break', 'Ti', 'Te'],
    reliability: 0.86
  }),
  choiceItem({
    id: 'tie_ennea_001',
    index: 904,
    kind: 'firstReaction',
    theme: 'tie break Enneagram',
    prompt: 'Di malam paling jujur, apa yang paling tidak ingin kau rasakan?',
    instruction: 'Pilih satu kalimat yang paling dekat.',
    options: [
      option('wrong', 'menjadi orang yang diam saat sesuatu jelas-jelas tidak adil', 'Type 1 line.', ['one', 'truth']),
      option('unwanted', 'dibutuhkan hanya saat orang lain rusak', 'Type 2 line.', ['two', 'Fe']),
      option('failure', 'pulang tanpa membawa hasil apa pun', 'Type 3 line.', ['three', 'Te']),
      option('ordinary', 'hidup seperti tidak pernah benar-benar menjadi dirimu', 'Type 4 line.', ['four', 'Fi']),
      option('incompetent', 'diminta maju saat kau belum mengerti cukup dalam', 'Type 5 line.', ['five', 'Ti']),
      option('unsafe', 'percaya, lalu sadar dari awal tanda-tandanya sudah ada', 'Type 6 line.', ['six', 'Si'])
    ],
    targetSignals: ['Enneagram tie break'],
    reliability: 0.82
  }),
  choiceItem({
    id: 'tie_instinct_001',
    index: 905,
    kind: 'objectChoice',
    theme: 'tie break instinct',
    prompt: 'Sebelum meninggalkan rumah untuk sesuatu yang tidak pasti, apa yang kau pastikan dulu?',
    instruction: 'Pilih satu.',
    options: [
      option('money', 'uang tunai, obat, dan jalan pulang', 'sp line.', ['sp', 'Si']),
      option('person', 'satu orang tahu kau pergi ke mana', 'sx line.', ['sx', 'Fi']),
      option('group', 'orang-orang penting tidak salah membaca posisimu', 'so line.', ['so', 'Fe']),
      option('nothing', 'tidak ada; kalau sudah pergi, ya pergi', 'free exit.', ['seven', 'Se', 'freedom'])
    ],
    targetSignals: ['Instinct tie break'],
    reliability: 0.8
  }),
  choiceItem({
    id: 'tie_ap_001',
    index: 906,
    kind: 'dialogueChoice',
    theme: 'tie break AP',
    prompt: 'Dalam obrolan yang membuatmu sensitif, bagian mana yang paling ingin ditangani dengan hati-hati?',
    instruction: 'Pilih satu.',
    options: [
      option('explain', '“jangan asal simpulkan; tanya dulu maksudku.”', 'L sensitivity.', ['logicFirm', 'Ti']),
      option('feel', '“jangan tertawakan caraku bereaksi.”', 'E sensitivity.', ['emotionFirm', 'Fi']),
      option('body', '“jangan atur tubuhku seperti aku barang.”', 'F sensitivity.', ['bodyFirm', 'sp']),
      option('choice', '“jangan putuskan hidupku sambil menyebut itu bantuan.”', 'V sensitivity.', ['willFirm', 'eight'])
    ],
    targetSignals: ['AP tie break'],
    reliability: 0.78
  }),
  choiceItem({
    id: 'tie_relation_001',
    index: 907,
    kind: 'endingChoice',
    theme: 'tie break relationship',
    prompt: 'Orang yang kau sayangi berkata, “aku nggak mau kehilangan kamu,” tapi tindakannya masih melukaimu. Ending mana yang terjadi?',
    instruction: 'Pilih satu ending.',
    options: [
      option('talk', 'kau duduk dan meminta satu pembicaraan yang tidak boleh kabur lagi', 'secure repair.', ['Fe', 'truth'], { relationship: { secureLeaning: 1.5 } }),
      option('test', 'kau menunggu apakah ia mengejarmu setelah kau diam', 'testing repair.', ['six', 'sx'], { relationship: { anxiousLeaning: 1.2, emotionalTesting: 1 } }),
      option('leave', 'kau pergi sebelum suaramu terdengar membutuhkan', 'distance repair.', ['five', 'Fi'], { relationship: { avoidantLeaning: 1.3, withdrawalWhenHurt: 1 } }),
      option('break', 'kau memutus cepat, lalu menangis di tempat yang tidak ia tahu', 'fearful exit.', ['four', 'eight'], { relationship: { fearfulAvoidantLeaning: 1.4 } })
    ],
    targetSignals: ['relationship tie break'],
    reliability: 0.78
  })
];
