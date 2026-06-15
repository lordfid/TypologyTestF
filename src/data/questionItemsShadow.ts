import type { QuestionItem } from '../types';
import { choiceItem, option, swipeItem } from './questionItems';

const shadowSwipes = [
  ['ditantang di depan umum', 'Seseorang berkata, “kau cuma berani kalau suasananya gampang.” Mana yang lebih mungkin terjadi?', ['Fi', 'eight', 'willFirm'], ['Fe', 'two', 'emotionFlexible'], 'opposing'],
  ['standar batin terlalu keras', 'Kau gagal melakukan sesuatu yang sudah kau janji akan bereskan. Malam itu, suara di kepalamu paling mirip apa?', ['one', 'Ti', 'logicFirm'], ['nine', 'Si', 'quiet'], 'critical'],
  ['salah baca suasana', 'Kau baru sadar leluconmu membuat seseorang diam. Setelah itu, mana yang paling dekat?', ['Fe', 'six', 'tender'], ['Ti', 'five', 'quiet'], 'trickster'],
  ['titik balik', 'Seseorang mengkhianatimu setelah kau memberi terlalu banyak ruang. Adegan berikutnya lebih dekat ke mana?', ['eight', 'Te', 'willFirm'], ['four', 'Fi', 'sx'], 'transformative'],
  ['dipaksa memilih cepat', 'Orang-orang menunggu jawabanmu sekarang juga. Tubuhmu belum siap, tapi waktu sudah habis.', ['Se', 'bold', 'eight'], ['Ni', 'quiet', 'five'], 'inferior'],
  ['dibilang berlebihan', 'Kau baru membuka sedikit isi hati, lalu seseorang bilang kau terlalu dramatis.', ['Fi', 'four', 'emotionFirm'], ['Fe', 'two', 'tender'], 'opposing'],
  ['hasil kerjamu dirusak', 'Pekerjaan yang kau susun rapi diubah mendadak tanpa bertanya padamu.', ['Te', 'one', 'willFirm'], ['Ne', 'seven', 'freedom'], 'critical'],
  ['aturan tidak tertulis', 'Semua orang tampak paham sesuatu yang tidak ada yang menjelaskan padamu.', ['Ti', 'five', 'logicFirm'], ['Fe', 'so', 'emotionFlexible'], 'trickster'],
  ['krisis kepercayaan', 'Kau mengetahui seseorang memakai ceritamu untuk membuat dirinya terlihat baik.', ['Fi', 'truth', 'eight'], ['Fe', 'image', 'three'], 'transformative'],
  ['tubuh terlalu lelah', 'Kau terlalu capek untuk menjadi versi sopan dari dirimu. Mana yang lebih mungkin bocor?', ['Se', 'eight', 'bold'], ['Si', 'nine', 'quiet'], 'inferior'],
  ['dipaksa menjelaskan', 'Mereka meminta alasan, tapi pertanyaannya terasa seperti jebakan.', ['Ti', 'truth', 'five'], ['Fe', 'tender', 'six'], 'opposing'],
  ['menahan marah lama', 'Kau sudah lama diam. Hari itu satu kalimat kecil membuat semuanya naik.', ['eight', 'Se', 'emotionFirm'], ['one', 'Si', 'order'], 'critical']
] as const;

const items: QuestionItem[] = [];

shadowSwipes.forEach(([theme, prompt, leftSignals, rightSignals, role], i) => {
  items.push(
    swipeItem({
      id: `shadow_swipe_${String(i + 1).padStart(3, '0')}`,
      index: 200 + i,
      theme,
      prompt,
      left: option('left', i % 2 === 0 ? 'Aku menatap langsung dan berhenti membuatnya nyaman.' : 'Aku menutup layar, menarik napas, lalu membiarkan kalimat dingin keluar.', 'Defensive edge under pressure.', leftSignals as any, { stackRole: { [role]: 1 } as any }),
      right: option('right', i % 2 === 0 ? 'Aku tersenyum kecil, tapi setelah itu semua akses ke diriku kupindahkan pelan-pelan.' : 'Aku diam sampai semua orang mengira itu selesai, padahal aku mengingatnya utuh.', 'Indirect containment under pressure.', rightSignals as any, { stackRole: { [role]: 1 } as any }),
      pairKind: 'shadowContrast',
      strength: i % 3 === 0 ? 'extreme' : 'strong',
      targetSignals: ['shadow role', role, 'pressure response'],
      reliability: 0.74
    })
  );
});

const hiddenOptions = [
  option('old', 'membuka ulang percakapan itu berkali-kali', 'Looping through stored traces.', ['Si', 'six', 'quiet'], { stackRole: { inferior: 0.7 }, defense: { rumination: 1 } as any }),
  option('clean', 'membersihkan kamar sampai tanganmu pegal', 'Displaced repair.', ['Si', 'Te', 'order'], { stackRole: { critical: 0.6 } }),
  option('walk', 'keluar membeli minuman padahal tidak haus', 'Body escape.', ['Se', 'seven', 'sp'], { stackRole: { inferior: 0.5 } }),
  option('draft', 'menulis pesan panjang lalu menghapus semuanya', 'Private over-explanation.', ['Fi', 'Ni', 'four'], { defense: { overExplaining: 1 }, stackRole: { opposing: 0.6 } }),
  option('proof', 'menyimpan screenshot di folder tersembunyi', 'Evidence keeping.', ['Ti', 'six', 'truth'], { stackRole: { trickster: 0.4, opposing: 0.4 } }),
  option('plan', 'menyusun langkah kecil agar itu tidak terjadi lagi', 'Control through next move.', ['Te', 'one', 'sp'], { stackRole: { critical: 0.7 } })
];

for (let i = 0; i < 6; i += 1) {
  items.push(
    choiceItem({
      id: `shadow_hidden_${String(i + 1).padStart(3, '0')}`,
      index: 240 + i,
      kind: 'hiddenReaction',
      theme: ['senyum palsu', 'dipuji tapi tidak dipercaya', 'ditinggal membaca pesan', 'nama disebut salah', 'ditekan memilih', 'dituduh dingin'][i],
      prompt: [
        'Di luar kau bilang “nggak apa-apa”. Setelah pintu tertutup, apa yang lebih mungkin terjadi?',
        'Orang-orang memujimu, tapi kau merasa mereka tidak benar-benar melihatmu. Apa yang kau lakukan setelah pulang?',
        'Seseorang berhenti membalas saat obrolan mulai penting. Apa yang kau lakukan sebelum tidur?',
        'Namamu disebut salah oleh orang yang seharusnya mengenalmu. Apa yang kau simpan diam-diam?',
        'Kau dipaksa memilih saat kepala belum selesai. Apa gerakan kecil yang muncul duluan?',
        'Seseorang bilang kau dingin, padahal kau sedang menahan banyak hal. Apa yang kau lakukan ketika sendirian?'
      ][i],
      instruction: 'Pilih yang paling mungkin terjadi diam-diam.',
      options: [...hiddenOptions.slice(i % 3), ...hiddenOptions.slice(0, i % 3)],
      targetSignals: ['hidden response', 'defense', 'shadow pressure'],
      reliability: 0.72
    })
  );
}

const endingOptions = [
  option('helpLine', 'kau membantunya, tapi tidak membiarkannya masuk lagi', 'Care with locked gate.', ['Fe', 'Fi', 'one']),
  option('shortNo', 'kau menolak dengan satu kalimat pendek', 'Clean refusal.', ['Te', 'Fi', 'eight']),
  option('asUsual', 'kau membantunya seolah tidak pernah terjadi apa-apa', 'Self-erasing peacekeeping.', ['Fe', 'nine', 'two']),
  option('whyNow', 'kau bertanya dulu, “kenapa baru sekarang?”', 'Truth before action.', ['Ti', 'truth', 'six']),
  option('vanish', 'kau menghilang sebelum dia sempat menjelaskan', 'Exit response.', ['seven', 'quiet', 'freedom']),
  option('cryLater', 'kau membantunya, lalu menangis setelah pulang', 'Delayed private cost.', ['four', 'tender', 'Fe'])
];

for (let i = 0; i < 6; i += 1) {
  items.push(
    choiceItem({
      id: `shadow_end_${String(i + 1).padStart(3, '0')}`,
      index: 260 + i,
      kind: 'endingChoice',
      theme: ['orang lama meminta bantuan', 'mantan datang lagi', 'atasan menyalahkanmu', 'keluarga pura-pura lupa', 'teman yang iri kembali', 'pelanggan marah'][i],
      prompt: [
        'Seseorang yang dulu merendahkanmu sekarang meminta bantuan. Ending mana yang paling mungkin terjadi?',
        'Orang yang dulu pergi tiba-tiba muncul dengan suara lembut. Ending mana yang paling mirip denganmu?',
        'Atasan menyalahkanmu di depan orang, lalu meminta bantuan saat semua panik. Ending mana yang kau pilih?',
        'Keluarga yang pernah membiarkanmu sendirian kini ingin semuanya “normal lagi”. Ending mana yang terjadi?',
        'Teman yang dulu iri padamu datang ketika hidupnya berantakan. Ending mana yang paling dekat?',
        'Pelanggan marah besar, lalu kau tahu masalahnya bukan salahmu. Ending mana yang muncul?'
      ][i],
      instruction: 'Pilih ending adegan.',
      options: [...endingOptions.slice(i % 4), ...endingOptions.slice(0, i % 4)].slice(0, 6),
      targetSignals: ['ending', 'boundary', 'defense'],
      reliability: 0.74
    })
  );
}

export const questionItemsShadow: QuestionItem[] = items;
