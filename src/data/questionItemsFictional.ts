import type { QuestionItem, QuestionOption } from '../types';
import { choiceItem, option } from './questionItems';

const fictionOptions: QuestionOption[] = [
  option('wall', 'menyentuh dinding kamar, seperti baru sadar tempat itu bukan rumah', 'Reality reframed through space.', ['Ni', 'Fi', 'four'], { stackRole: { transformative: 0.8 }, stress: { freeze: 0.5 } }),
  option('bag', 'mencari tas kecil dan memasukkan benda penting', 'Immediate preparation.', ['Te', 'Si', 'sp'], { stackRole: { inferior: 0.4 }, stress: { control: 0.7 } }),
  option('question', 'menatap orang itu dan bertanya, “apa lagi yang kau sembunyikan?”', 'Direct truth extraction.', ['Ti', 'truth', 'eight'], { stress: { fight: 0.7 } }),
  option('window', 'membuka jendela dan melihat keluar lama sekali', 'Threshold and longing.', ['Ne', 'Ni', 'seven'], { evidence: { symbolicMeaning: 1, noveltySeeking: 0.5 } }),
  option('cry', 'menangis dulu, lalu diam mendadak', 'Emotional break then lock.', ['Fi', 'four', 'quiet'], { stress: { collapse: 0.7 }, defense: { emotionalSuppression: 0.6 } }),
  option('run', 'kabur tanpa menunggu penjelasan', 'Immediate exit.', ['Se', 'freedom', 'eight'], { stress: { flight: 1 }, values: { freedom: 0.8 } })
];

const scenes = [
  ['Rapunzel', 'kebenaran keluarga', 'menara', 'ibu palsu / pengasuh', 'Bayangkan kau adalah Rapunzel. Kau baru sadar orang yang selama ini mengasuhmu telah berbohong tentang dunia luar dan tentang dirimu. Apa yang kau lakukan pertama kali?'],
  ['Elsa', 'pintu tertutup', 'kamar istana', 'adik yang membutuhkanmu', 'Bayangkan kau adalah Elsa setelah kehilangan besar. Anna mengetuk pintu dan membutuhkanmu, tapi kau takut melukainya. Apa yang paling mungkin kau lakukan?'],
  ['Cinderella', 'pesta selesai', 'rumah yang merendahkanmu', 'keluarga tiri', 'Bayangkan kau adalah Cinderella setelah pesta selesai. Rumah masih penuh orang yang merendahkanmu. Apa yang kau lakukan sebelum matahari naik?'],
  ['Katniss', 'sebelum arena', 'backstage', 'orang yang ingin menjadikanmu lambang', 'Bayangkan kau adalah Katniss sebelum masuk arena. Semua orang ingin menjadikanmu lambang. Apa yang kau pegang paling erat?'],
  ['Harry Potter', 'rumah lama', 'kamar kecil', 'keluarga yang menyembunyikan surat', 'Bayangkan kau adalah anak yang menemukan banyak surat disembunyikan darimu. Apa yang kau lakukan pertama kali?'],
  ['Hermione', 'aturan runtuh', 'perpustakaan', 'teman yang gegabah', 'Bayangkan kau adalah Hermione saat aturan tidak lagi cukup menyelamatkan temanmu. Apa yang kau pilih?'],
  ['Frodo', 'beban kecil', 'jalan panjang', 'sahabat yang setia', 'Bayangkan kau membawa benda kecil yang membuat semua orang berubah sikap. Apa yang kau lakukan saat sahabatmu menawarkan ikut?'],
  ['Belle', 'rumah asing', 'perpustakaan besar', 'orang yang sulit dipercaya', 'Bayangkan kau berada di rumah asing yang menyimpan kamar terkunci dan buku-buku tua. Apa yang kau lakukan malam pertama?'],
  ['Mulan', 'nama keluarga', 'pagi sebelum pergi', 'keluarga yang ingin kau lindungi', 'Bayangkan kau harus pergi menggantikan seseorang yang kau sayangi. Apa yang kau ambil sebelum keluar?'],
  ['Elizabeth Bennet', 'surat mengejutkan', 'taman sepi', 'orang yang kau salah baca', 'Bayangkan kau membaca surat yang membuatmu sadar penilaianmu mungkin terlalu cepat. Apa yang kau lakukan setelah selesai membaca?']
] as const;

const specificOptions: Record<string, QuestionOption[]> = {
  Elsa: [
    option('behind', 'berdiri di balik pintu tanpa membukanya', 'Protect through distance.', ['Ni', 'six', 'quiet'], { relationship: { avoidantLeaning: 1 }, stress: { freeze: 0.6 } }),
    option('slit', 'membuka sedikit, tapi tidak membiarkannya masuk sepenuhnya', 'Partial contact.', ['Fe', 'Fi', 'six'], { relationship: { fearfulAvoidantLeaning: 0.9 } }),
    option('note', 'menulis pesan pendek dan menyelipkannya dari bawah pintu', 'Indirect care.', ['Fi', 'Si', 'tender'], { communication: { reserved: 0.8 } }),
    option('away', 'membuka pintu, lalu langsung menyuruhnya menjauh', 'Care through harsh line.', ['Te', 'Fi', 'eight'], { conflict: { direct: 0.8 } }),
    option('silent', 'menangis tanpa suara sampai ketukannya berhenti', 'Private collapse.', ['four', 'quiet', 'Fi'], { stress: { collapse: 0.8 } }),
    option('here', 'membuka pintu dan berkata, “aku takut, tapi aku di sini.”', 'Honest closeness.', ['Fe', 'truth', 'tender'], { relationship: { secureLeaning: 1.2 } })
  ],
  Katniss: [
    option('pin', 'pin kecil dari rumah', 'Home anchor.', ['Si', 'six', 'sp']),
    option('knife', 'pisau', 'Immediate survival.', ['Se', 'eight', 'sp']),
    option('hand', 'tangan orang yang kau lindungi', 'Protective bond.', ['Fe', 'two', 'sx']),
    option('camera', 'tatapan kosong ke kamera', 'Public mask.', ['so', 'three', 'image']),
    option('food', 'makanan yang disimpan diam-diam', 'Survival stash.', ['sp', 'Si', 'five']),
    option('line', 'kalimat pendek yang akan membuat mereka ingat padamu', 'Public strike.', ['Te', 'Fi', 'eight'])
  ]
};

export const questionItemsFictional: QuestionItem[] = scenes.map(([inspiration, theme, place, relationship, prompt], i) => {
  const options = specificOptions[inspiration] ?? [...fictionOptions.slice(i % 4), ...fictionOptions.slice(0, i % 4)].slice(0, 6);
  return choiceItem({
    id: `fic_${String(i + 1).padStart(3, '0')}`,
    index: 800 + i,
    kind: 'fictionalFate',
    theme,
    prompt,
    instruction: 'Pilih reaksi pertama.',
    options,
    targetSignals: ['fictional fate', 'symbolic crisis', 'first reaction'],
    reliability: 0.7,
    context: {
      place,
      relationship,
      emotion: 'terkejut dan terbelah',
      pressureLevel: 'crisis',
      timeOrientation: 'present',
      socialExposure: 'private',
      emotionalCharge: 'high',
      fictionalMode: true,
      inspiration
    }
  });
});
