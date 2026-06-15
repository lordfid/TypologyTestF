import type { QuestionItem, QuestionOption } from '../types';
import { choiceItem, cognitiveOption, cognitiveScenePairs, option, swipeItem } from './questionItems';

const items: QuestionItem[] = [];
let n = 0;

for (let round = 0; round < 5; round += 1) {
  cognitiveScenePairs.forEach(([leftFn, rightFn, theme, scene, note], i) => {
    const idx = n + i + round * 10;
    items.push(
      swipeItem({
        id: `cog_swipe_${String(items.length + 1).padStart(3, '0')}`,
        index: idx,
        theme,
        prompt: `${scene} Mana yang paling mungkin keluar darimu lebih dulu?`,
        left: cognitiveOption('left', leftFn, round + i),
        right: cognitiveOption('right', rightFn, round + i + 1),
        strength: round % 2 === 0 ? 'strong' : 'medium',
        targetSignals: [note, leftFn, rightFn],
        reliability: 0.84
      })
    );
  });
}

const objectPrompts = [
  ['pergi dari rumah', 'Kau harus pergi malam ini. Tasmu kecil, waktumu sedikit. Barang mana yang paling mungkin kau ambil?'],
  ['hari pertama di tempat baru', 'Kau masuk ruangan baru dan belum mengenal siapa pun. Satu benda di tasmu terasa paling menolong. Mana itu?'],
  ['pesan yang tidak jadi dikirim', 'Setelah mengetik terlalu panjang, kau menutup layar. Benda mana yang tertinggal paling dekat dengan tanganmu?'],
  ['acara yang terasa palsu', 'Di acara yang terlalu ramai, kau ingin tetap tampak baik-baik saja. Benda mana yang kau pegang?'],
  ['rumah lama', 'Kau kembali ke rumah lama dan hanya boleh mengambil satu benda sebelum pergi lagi. Mana yang kau simpan?'],
  ['malam sebelum keputusan besar', 'Besok sesuatu harus diputuskan. Benda mana yang kau letakkan di samping tempat tidur?'],
  ['setelah dipermalukan', 'Kau baru saja dipermalukan di depan orang. Benda mana yang kau cari lebih dulu?'],
  ['seseorang tidak menjawab', 'Chatmu dibaca, tapi tidak dibalas. Benda mana yang paling mungkin kau pegang sambil menunggu?']
];

const objectOptions: QuestionOption[] = [
  option('key', 'kunci cadangan', 'Return route and fallback.', ['Si', 'sp', 'order']),
  option('book', 'buku catatan lama', 'Private continuity and inner archive.', ['Fi', 'Si', 'four']),
  option('cash', 'uang tunai di laci', 'Practical exit and body-level readiness.', ['Te', 'Se', 'sp']),
  option('headphones', 'headphone', 'Boundary through sound and retreat.', ['Fi', 'quiet', 'five']),
  option('ticket', 'tiket kereta', 'Door out of the room.', ['Ne', 'freedom', 'seven']),
  option('photo', 'foto kecil yang dilipat', 'Memory anchor.', ['Si', 'Fi', 'four']),
  option('marker', 'spidol hitam', 'Taking the board.', ['Te', 'bold', 'three']),
  option('mirror', 'kaca kecil', 'Self-check and held face.', ['Fe', 'image', 'three']),
  option('lighter', 'korek api', 'Small risky spark.', ['Se', 'eight', 'sx']),
  option('letter', 'surat yang belum dikirim', 'Private sentence kept alive.', ['Ni', 'Fi', 'four'])
];

objectPrompts.forEach(([theme, prompt], i) => {
  items.push(
    choiceItem({
      id: `cog_obj_${String(i + 1).padStart(3, '0')}`,
      index: 60 + i,
      kind: 'objectChoice',
      theme,
      prompt,
      instruction: 'Pilih satu benda.',
      options: objectOptions.slice(i % 5, i % 5 + 6).length === 6 ? objectOptions.slice(i % 5, i % 5 + 6) : [...objectOptions.slice(i % 5), ...objectOptions.slice(0, 6 - objectOptions.slice(i % 5).length)],
      targetSignals: ['symbolic object', 'first anchor', 'self regulation'],
      reliability: 0.8
    })
  );
});

const placePrompts = [
  ['setelah bertengkar', 'Setelah bertengkar dengan seseorang yang kau sayangi, kakimu bergerak duluan. Ke mana ia pergi?'],
  ['menunggu kabar', 'Seseorang belum memberi kabar. Rumah terasa terlalu sempit. Kau paling mungkin pergi ke mana?'],
  ['dipanggil mendadak', 'Namamu dipanggil di acara kecil, padahal kau belum siap. Posisi mana yang kau ambil?'],
  ['rahasia besar', 'Kau baru diberi rahasia yang berat. Tempat mana yang kau cari sebelum menjawab?'],
  ['ingin menangis', 'Air mata sudah naik, tapi kau belum mau dilihat. Ke mana tubuhmu berbelok?'],
  ['harus bicara', 'Ada kalimat yang harus keluar hari ini. Kau memilih tempat mana untuk mengatakannya?'],
  ['keluarga mulai panas', 'Obrolan keluarga mulai tajam. Kau berdiri dan bergerak ke mana?'],
  ['hari terasa palsu', 'Kau pulang dari hari yang membuatmu merasa memainkan wajah orang lain. Tempat mana yang terasa memanggil?']
];

const placeOptions: QuestionOption[] = [
  option('bathroom', 'kamar mandi, mengunci pintu sebentar', 'Private reset.', ['Si', 'quiet', 'nine']),
  option('balcony', 'balkon, menatap jalan tanpa bicara', 'Distance and symbolic looking out.', ['Ni', 'four', 'sx']),
  option('mini', 'minimarket tengah malam', 'Body reset through small purchase.', ['Se', 'sp', 'seven']),
  option('friend', 'rumah sahabat', 'Seeking human landing.', ['Fe', 'two', 'so']),
  option('books', 'toko buku paling sepi', 'Retreat into contained thought.', ['Ti', 'five', 'Ni']),
  option('street', 'jalan tanpa tujuan', 'Movement before words.', ['Se', 'Ne', 'freedom']),
  option('stage', 'dekat panggung kecil', 'Visible stance.', ['Te', 'bold', 'three']),
  option('kitchen', 'dapur, pura-pura mencari gelas', 'Backstage repair.', ['Fe', 'Si', 'tender'])
];

placePrompts.forEach(([theme, prompt], i) => {
  items.push(
    choiceItem({
      id: `cog_place_${String(i + 1).padStart(3, '0')}`,
      index: 80 + i,
      kind: 'placeChoice',
      theme,
      prompt,
      instruction: 'Pilih satu tempat.',
      options: [...placeOptions.slice(i % 3), ...placeOptions.slice(0, i % 3)].slice(0, 6),
      targetSignals: ['body direction', 'distance setting', 'scene choice'],
      reliability: 0.78
    })
  );
});

const dialoguePrompts = [
  ['orang memelintir niatmu', 'Seseorang berkata, “kau terlalu sensitif.” Kalimat mana yang paling mungkin lolos dari mulutmu?'],
  ['teman hampir menangis', 'Temanmu terlihat hampir menangis di tengah meja ramai. Kalimat mana yang kau pilih?'],
  ['rapat berputar', 'Rapat tidak selesai-selesai dan semua mulai lelah. Kalimat mana yang kau keluarkan?'],
  ['chat terakhir', 'Orang yang kau percaya menulis, “maaf, aku nggak tahu harus bilang apa.” Balasan mana yang paling mungkin kau kirim?']
];

const dialogueOptions: QuestionOption[] = [
  option('a', '“Aku butuh waktu.”', 'Boundary without full disclosure.', ['Fi', 'Ni', 'quiet']),
  option('b', '“Kita ngomong sekarang.”', 'Direct engagement.', ['Se', 'Te', 'bold']),
  option('c', '“Kau aman?”', 'Check the person before the topic.', ['Fe', 'two', 'tender']),
  option('d', '“Tunggu, bagian itu tidak seperti yang kau bilang.”', 'One precise cut.', ['Ti', 'truth', 'five']),
  option('e', '“Biar aku yang urus.”', 'Taking the task.', ['Te', 'three', 'order']),
  option('f', '“Aku ngerti, tapi aku tetap nggak setuju.”', 'Soft line, firm refusal.', ['Fi', 'Fe', 'one']),
  option('g', '“Lucu juga kamu ngomong begitu.”', 'Heat hidden behind wit.', ['Ne', 'seven', 'bold']),
  option('h', '“Jangan jadikan aku kambing hitam.”', 'Name the attack.', ['Fi', 'eight', 'truth'])
];

dialoguePrompts.forEach(([theme, prompt], i) => {
  items.push(
    choiceItem({
      id: `cog_dialogue_${String(i + 1).padStart(3, '0')}`,
      index: 100 + i,
      kind: 'dialogueChoice',
      theme,
      prompt,
      instruction: 'Pilih satu kalimat.',
      options: [...dialogueOptions.slice(i), ...dialogueOptions.slice(0, i)].slice(0, 6),
      targetSignals: ['spoken line', 'conflict trace', 'communication'],
      reliability: 0.8
    })
  );
});

const rankPrompts = [
  ['hidup berantakan', 'Saat hidupmu terasa berantakan, urutkan dari yang paling mungkin kau lakukan duluan.'],
  ['sebelum membuka pesan berat', 'Sebelum membuka pesan yang kau takutkan, urutkan gerakan yang paling dekat denganmu.'],
  ['setelah acara gagal', 'Setelah acara yang kau bantu gagal, urutkan yang paling mungkin terjadi malam itu.'],
  ['hari baru dimulai buruk', 'Pagi baru mulai, tapi suasana sudah buruk. Urutkan yang paling mungkin kau lakukan.']
];

const rankOptions: QuestionOption[] = [
  option('list', 'menulis daftar kecil', 'Bring scattered things into steps.', ['Te', 'order']),
  option('shower', 'mandi lama', 'Body reset.', ['Si', 'sp', 'quiet']),
  option('oldchat', 'membuka chat lama', 'Return to clues.', ['Si', 'Ni', 'six']),
  option('walk', 'keluar rumah tanpa tujuan', 'Movement and air.', ['Se', 'freedom']),
  option('letter', 'menulis surat yang tidak dikirim', 'Private expression.', ['Fi', 'four']),
  option('call', 'menelepon satu orang', 'Human landing.', ['Fe', 'two']),
  option('read', 'membaca ulang detail kecil', 'Precision before response.', ['Ti', 'five']),
  option('music', 'menyalakan lagu keras', 'Mood push.', ['Ne', 'seven', 'sx'])
];

rankPrompts.forEach(([theme, prompt], i) => {
  items.push(
    choiceItem({
      id: `cog_rank_${String(i + 1).padStart(3, '0')}`,
      index: 120 + i,
      kind: 'ranking',
      theme,
      prompt,
      instruction: 'Geser urutan dengan tombol naik/turun. Nomor satu paling dekat denganmu.',
      options: [...rankOptions.slice(i), ...rankOptions.slice(0, i)].slice(0, 6),
      targetSignals: ['first repair', 'stress ordering', 'cognitive priority'],
      reliability: 0.78
    })
  );
});

export const questionItemsCognitive: QuestionItem[] = items;
