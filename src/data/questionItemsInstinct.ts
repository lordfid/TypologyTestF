import type { QuestionItem, QuestionOption } from '../types';
import { choiceItem, option, swipeItem } from './questionItems';

const items: QuestionItem[] = [];

const swipes = [
  ['dompet menipis', 'Uangmu tinggal sedikit, tapi malam itu seseorang yang menarik mengajakmu pergi.', ['sp', 'Si', 'order'], ['sx', 'Se', 'seven']],
  ['ruangan baru', 'Kau masuk komunitas baru. Orang-orang sudah punya lingkaran masing-masing.', ['so', 'Fe', 'image'], ['sx', 'Fi', 'four']],
  ['tubuh capek', 'Tubuhmu capek, tapi grup chat ramai mengajak kumpul.', ['sp', 'Si', 'quiet'], ['so', 'Fe', 'two']],
  ['satu orang mencolok', 'Di ruangan penuh orang, ada satu orang yang membuat semua suara lain terasa jauh.', ['sx', 'Ni', 'four'], ['so', 'Ne', 'bold']],
  ['rumah berantakan', 'Rumah berantakan, kulkas hampir kosong, dan seseorang mengajakmu bicara berat malam itu.', ['sp', 'Te', 'one'], ['sx', 'Fi', 'eight']],
  ['nama disebut', 'Namamu disebut di grup besar untuk sesuatu yang belum kau siap tanggapi.', ['so', 'Fe', 'six'], ['sp', 'Si', 'quiet']]
] as const;

swipes.forEach(([theme, prompt, leftSignals, rightSignals], i) => {
  items.push(
    swipeItem({
      id: `instinct_swipe_${String(i + 1).padStart(3, '0')}`,
      index: 400 + i,
      theme,
      prompt: `${prompt} Mana yang paling dekat?`,
      left: option('left', i % 2 === 0 ? 'Aku mengecek isi dompet, baterai, dan jalan pulang sebelum menjawab.' : 'Aku memilih tempat duduk yang membuatku bisa melihat siapa datang dan pergi.', 'Survival or social orientation.', leftSignals as any),
      right: option('right', i % 2 === 0 ? 'Aku ikut sebentar, karena ada sesuatu di udara malam itu yang ingin kutahu.' : 'Aku mencari satu tatapan yang terasa paling hidup, lalu sisanya menjadi latar.', 'Intensity or visibility pull.', rightSignals as any),
      pairKind: 'traitContrast',
      strength: 'strong',
      targetSignals: ['instinct', 'sp sx so'],
      reliability: 0.79
    })
  );
});

const options: QuestionOption[] = [
  option('blanket', 'selimut tebal dan air minum', 'Body first.', ['sp', 'Si', 'bodyFirm']),
  option('onecall', 'satu panggilan yang tidak ingin kau akhiri cepat', 'One-person pull.', ['sx', 'Fi', 'emotionFirm']),
  option('group', 'grup chat yang memastikan kau tidak tertinggal kabar', 'Group map.', ['so', 'Fe', 'image']),
  option('cash', 'uang tunai dan charger penuh', 'Practical readiness.', ['sp', 'Te', 'order']),
  option('stare', 'kursi dekat orang yang membuatmu penasaran', 'Magnetic attention.', ['sx', 'Ni', 'seven']),
  option('role', 'meja tempat semua orang bisa melihatmu membantu', 'Visible contribution.', ['so', 'three', 'bold'])
];

const prompts = [
  ['hari buruk', 'Kau pulang dari hari yang membuat tubuh dan kepala sama-sama lelah. Mana yang kau pilih duluan?'],
  ['pesta kecil', 'Di pesta kecil, apa yang paling mungkin membuatmu bertahan lebih lama?'],
  ['perjalanan jauh', 'Kau akan pergi tiga hari. Barang kecil mana yang paling menenangkan untuk dibawa?'],
  ['orang baru', 'Ada orang baru yang membuatmu sulit biasa saja. Apa yang paling mungkin kau lakukan?'],
  ['grup berubah', 'Lingkaran pertemananmu berubah tanpa pemberitahuan. Apa yang kau lakukan?'],
  ['malam mendadak', 'Malam itu semua rencana berubah. Apa yang paling ingin kau pastikan?']
];

prompts.forEach(([theme, prompt], i) => {
  items.push(
    choiceItem({
      id: `instinct_choice_${String(i + 1).padStart(3, '0')}`,
      index: 430 + i,
      kind: i % 2 === 0 ? 'objectChoice' : 'placeChoice',
      theme,
      prompt,
      instruction: 'Pilih satu.',
      options: [...options.slice(i % 4), ...options.slice(0, i % 4)],
      targetSignals: ['instinct stacking', 'survival bond group'],
      reliability: 0.78
    })
  );
});

export const questionItemsInstinct: QuestionItem[] = items;
