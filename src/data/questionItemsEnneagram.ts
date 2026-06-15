import type { QuestionItem, QuestionOption } from '../types';
import { choiceItem, option, swipeItem } from './questionItems';

const typeSignals = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'] as const;

const enneagramItems: QuestionItem[] = [];

const prompts = [
  'Kau melihat orang yang lebih lemah disalahkan agar acara tetap terlihat rapi. Mana yang paling mungkin keluar darimu?',
  'Seseorang terus datang saat rusak, lalu menghilang saat sudah baik. Kali ini ia kembali.',
  'Namamu dipuji di depan umum, tapi kau tahu bagian terpenting dari kerjamu tidak disebut.',
  'Kau berada di pesta kecil yang semua orangnya tampak punya tempat, kecuali kau.',
  'Orang-orang meminta jawaban cepat untuk hal yang belum kau pahami utuh.',
  'Teman dekatmu berubah nada bicara, dan tidak ada yang menjelaskan kenapa.',
  'Hari itu terlalu berat, lalu ada ajakan pergi tanpa rencana.',
  'Seseorang mencoba mengatur pilihanmu dengan suara lembut seolah itu demi kebaikanmu.',
  'Dua orang yang kau sayangi saling menyerang di depanmu.'
];

const optionPool: Record<(typeof typeSignals)[number], QuestionOption> = {
  one: option('one', 'Aku berdiri dan bilang, “jangan lempar salah ke orang yang tidak bisa membalas.”', 'Wrongness and restrained anger.', ['one', 'truth', 'Fi']),
  two: option('two', 'Aku mengambil air untuknya, tapi kali ini aku tidak langsung duduk di sebelahnya.', 'Help with visible cost.', ['two', 'Fe', 'tender']),
  three: option('three', 'Aku tersenyum rapi, lalu memastikan hasil kerjaku terlihat jelas setelah itu.', 'Recognition and managed face.', ['three', 'Te', 'image']),
  four: option('four', 'Aku keluar ke balkon, merasa ada bagian diriku yang tidak bisa ikut tertawa.', 'Private ache and difference.', ['four', 'Fi', 'Ni']),
  five: option('five', 'Aku meminta waktu, membawa dokumen itu pulang, dan membaca sampai kepalaku tenang.', 'Distance before engagement.', ['five', 'Ti', 'quiet']),
  six: option('six', 'Aku membuka chat lama, mencari kapan nadanya mulai berubah.', 'Threat scan through traces.', ['six', 'Si', 'Ti']),
  seven: option('seven', 'Aku ikut pergi, menutup pintu, dan membiarkan udara malam mengganti isi kepala.', 'Escape through movement.', ['seven', 'Ne', 'freedom']),
  eight: option('eight', 'Aku menatapnya dan berkata, “jangan bungkus perintahmu seolah itu sayang.”', 'Control resistance.', ['eight', 'Se', 'truth']),
  nine: option('nine', 'Aku menaruh makanan di tengah meja dan meminta semuanya berhenti sebentar.', 'Peacekeeping through soft pause.', ['nine', 'Fe', 'sp'])
};

for (let i = 0; i < 9; i += 1) {
  const a = typeSignals[i];
  const b = typeSignals[(i + 4) % typeSignals.length];
  itemsPushSwipe(i, a, b);
}

function itemsPushSwipe(i: number, a: (typeof typeSignals)[number], b: (typeof typeSignals)[number]) {
  enneagramItems.push(
    swipeItem({
      id: `ennea_swipe_${String(i + 1).padStart(3, '0')}`,
      index: 300 + i,
      theme: ['salah ditimpakan', 'datang saat butuh', 'pencapaian dipotong', 'asing di pesta', 'jawaban cepat', 'nada berubah', 'ajakan kabur', 'diatur lembut', 'pertengkaran dua pihak'][i],
      prompt: prompts[i],
      left: optionPool[a],
      right: optionPool[b],
      pairKind: 'sameBehaviorDifferentMotive',
      strength: i % 2 === 0 ? 'medium' : 'strong',
      targetSignals: ['fear desire motive', a, b],
      reliability: 0.81
    })
  );
}

const choicePrompts = [
  ['uang tinggal sedikit', 'Uang tinggal sedikit dan seseorang mengajakmu ikut acara yang mungkin menyenangkan. Apa yang paling dekat?'],
  ['tidak dipilih', 'Kau tidak dipilih untuk sesuatu yang diam-diam kau inginkan. Setelah semua orang pergi, apa yang terjadi?'],
  ['rahasia yang diminta', 'Seseorang memintamu menyimpan rahasia yang terasa berat. Apa yang kau lakukan?'],
  ['kalah di depan orang', 'Kau kalah di depan orang yang pernah meremehkanmu. Apa gerakan pertamamu setelah pulang?'],
  ['orang menangis diam-diam', 'Di sudut ruangan, seseorang menangis tanpa suara. Apa yang paling mungkin kau lakukan?'],
  ['rencana dibatalkan', 'Rencana yang kau tunggu dibatalkan mendadak. Apa yang kau pilih malam itu?'],
  ['harus meminta maaf', 'Kau tahu kau salah, tapi meminta maaf terasa seperti menelan batu. Kalimat mana yang keluar?'],
  ['ditinggal sendirian', 'Semua orang pergi lebih dulu dan kau tertinggal membereskan sisa-sisa acara. Apa yang terjadi?'],
  ['pujian terasa palsu', 'Seseorang memujimu terlalu manis sampai terasa seperti ada yang disembunyikan. Apa yang kau lakukan?']
];

const mixedOptions: QuestionOption[] = [
  option('repair', 'aku membayar yang penting dulu, lalu pulang tanpa drama', 'Duty before want.', ['one', 'sp', 'order']),
  option('help', 'aku tanya siapa yang bisa kutemani pulang', 'Being useful for closeness.', ['two', 'Fe', 'tender']),
  option('shine', 'aku mengganti baju dan datang seolah hariku baik-baik saja', 'Face management and comeback.', ['three', 'image', 'bold']),
  option('letter', 'aku menulis panjang, lalu menyimpan semuanya untuk diriku sendiri', 'Inner ache kept private.', ['four', 'Fi', 'Ni']),
  option('read', 'aku mencari semua detail sebelum memberi jawaban', 'Knowledge before giving self.', ['five', 'Ti', 'logicFirm']),
  option('ask', 'aku bertanya dua kali agar tidak salah membaca situasi', 'Doubt check.', ['six', 'Si', 'truth']),
  option('go', 'aku keluar sebentar, membeli sesuatu, dan menunda sedih sampai nanti', 'Pain postponement.', ['seven', 'Ne', 'Se']),
  option('cut', 'aku bilang pendek, “jangan sentuh bagian hidupku itu.”', 'Hard boundary.', ['eight', 'Fi', 'willFirm']),
  option('quietTea', 'aku membuat teh dan duduk sampai ruangan tidak terasa tajam', 'Soften the field.', ['nine', 'Si', 'tender'])
];

choicePrompts.forEach(([theme, prompt], i) => {
  enneagramItems.push(
    choiceItem({
      id: `ennea_choice_${String(i + 1).padStart(3, '0')}`,
      index: 330 + i,
      kind: i % 3 === 0 ? 'firstReaction' : i % 3 === 1 ? 'hiddenReaction' : 'scenarioCard',
      theme,
      prompt,
      instruction: 'Pilih satu jawaban yang paling dekat.',
      options: [...mixedOptions.slice(i), ...mixedOptions.slice(0, i)].slice(0, 6),
      targetSignals: ['core fear', 'core desire', 'defense'],
      reliability: 0.8
    })
  );
});

const rankOptions: QuestionOption[] = [
  option('right', 'memastikan tidak ada yang dilempar salah', 'Integrity priority.', ['one', 'truth']),
  option('needed', 'mengecek siapa yang diam-diam butuh ditemani', 'Need to be needed.', ['two', 'Fe']),
  option('prove', 'membuat hasil yang tidak bisa diremehkan', 'Achievement push.', ['three', 'Te']),
  option('self', 'menulis satu halaman tentang rasa yang tidak bisa disebut', 'Identity pain.', ['four', 'Fi']),
  option('learn', 'mencari jawaban sampai tidak merasa bodoh', 'Competence seeking.', ['five', 'Ti']),
  option('safe', 'mengecek semua tanda sebelum percaya', 'Safety scan.', ['six', 'Si']),
  option('move', 'mencari pintu keluar yang paling cepat', 'Escape from trapped feeling.', ['seven', 'Ne']),
  option('stand', 'menolak diatur dengan suara paling tenang', 'Strength boundary.', ['eight', 'Se']),
  option('peace', 'membuat ruangan berhenti saling melukai', 'Peace need.', ['nine', 'Fe'])
];

for (let i = 0; i < 6; i += 1) {
  enneagramItems.push(
    choiceItem({
      id: `ennea_rank_${String(i + 1).padStart(3, '0')}`,
      index: 360 + i,
      kind: 'ranking',
      theme: ['malam berat', 'sebelum pulang', 'rapat keluarga', 'hari gagal', 'ditanya masa depan', 'saat tak punya tempat'][i],
      prompt: ['Saat semuanya terasa berat, urutkan yang paling ingin kau selamatkan duluan.','Saat sebelum pulang dari tempat yang menyakitimu, urutkan gerakan batin yang paling dekat.','Di rapat keluarga yang panas, urutkan dorongan yang muncul.','Hari itu gagal total. Urutkan yang paling mungkin menjadi alasanmu tetap bergerak.','Saat ditanya hidupmu mau ke mana, urutkan hal yang diam-diam kau kejar.','Saat merasa tidak punya tempat pulang, urutkan yang paling kau butuhkan.'][i],
      instruction: 'Nomor satu paling dekat denganmu.',
      options: [...rankOptions.slice(i), ...rankOptions.slice(0, i)].slice(0, 6),
      targetSignals: ['tritype', 'fear desire ranking'],
      reliability: 0.8
    })
  );
}

export const questionItemsEnneagram: QuestionItem[] = enneagramItems;
