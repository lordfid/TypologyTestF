import type { QuestionItem, QuestionOption } from '../types';
import { choiceItem, option, swipeItem } from './questionItems';

const items: QuestionItem[] = [];

const relationSwipes = [
  ['pesan dingin', 'Pasanganmu membalas pendek setelah hari yang panjang. Mana yang paling mungkin terjadi?', ['six', 'Fe', 'tender'], ['five', 'Fi', 'quiet']],
  ['mantan kembali', 'Mantan datang lagi dengan nada seolah tidak pernah melukai. Mana yang lebih dekat?', ['eight', 'truth', 'willFirm'], ['four', 'Fi', 'sx']],
  ['sahabat berubah', 'Sahabat lama mulai jauh, tapi masih bilang semuanya biasa. Apa yang kau lakukan?', ['Si', 'six', 'truth'], ['Fe', 'two', 'tender']],
  ['crush tidak membalas', 'Orang yang kau suka tidak membalas, padahal biasanya cepat. Mana yang paling dekat?', ['quiet', 'four', 'Ni'], ['Se', 'seven', 'freedom']],
  ['keluarga meminta hadir', 'Keluarga meminta kau datang walau kau sedang habis tenaga. Mana yang terjadi?', ['nine', 'Fe', 'tender'], ['Fi', 'freedom', 'eight']],
  ['teman butuh bantuan', 'Temanmu butuh bantuan, tapi kau juga sedang nyaris runtuh. Mana yang paling mungkin?', ['two', 'Fe', 'bodyFlexible'], ['sp', 'Fi', 'willFirm']]
] as const;

relationSwipes.forEach(([theme, prompt, leftSignals, rightSignals], i) => {
  items.push(
    swipeItem({
      id: `rel_swipe_${String(i + 1).padStart(3, '0')}`,
      index: 600 + i,
      theme,
      prompt,
      left: option('left', i % 2 === 0 ? 'Aku mengetik “kau aman?” lalu menunggu, walau dadaku ikut menunggu.' : 'Aku datang sebentar dan memastikan orang lain tidak melihat aku capek.', 'Closeness through checking or care.', leftSignals as any, { relationship: { anxiousLeaning: 0.8, reassuranceSeeking: 0.8 }, stress: { fawn: 0.3 } }),
      right: option('right', i % 2 === 0 ? 'Aku menutup chat, mandi, dan baru membalas ketika wajahku tidak mudah dibaca.' : 'Aku bilang “aku nggak bisa bantu kali ini” lalu mematikan notifikasi.', 'Distance and boundary.', rightSignals as any, { relationship: { avoidantLeaning: 0.8, autonomyProtection: 0.8 }, stress: { isolate: 0.4 } }),
      pairKind: 'sameMotiveDifferentBehavior',
      strength: 'medium',
      targetSignals: ['relationship', 'attachment tendency', 'boundary'],
      reliability: 0.78
    })
  );
});

const relationshipOptions: QuestionOption[] = [
  option('safe', '“aku di sini, tapi aku butuh bicara pelan-pelan.”', 'Secure leaning with boundary.', ['Fe', 'Fi', 'tender'], { relationship: { secureLeaning: 2 }, communication: { warm: 1, clear: 1 } }),
  option('test', 'mengirim satu pesan pendek untuk melihat ia mengejarmu atau tidak', 'Testing closeness.', ['sx', 'six', 'four'], { relationship: { emotionalTesting: 1.8, anxiousLeaning: 0.8 } }),
  option('vanish', 'menghilang beberapa jam agar tidak terlihat terlalu butuh', 'Distance after hurt.', ['quiet', 'five', 'Fi'], { relationship: { avoidantLeaning: 1.4, withdrawalWhenHurt: 1.2 } }),
  option('explain', 'menjelaskan terlalu panjang sampai kau sendiri lelah', 'Over-explaining for repair.', ['Fe', 'six', 'logicFlexible'], { relationship: { overExplaining: 1.5, reassuranceSeeking: 0.7 }, defense: { overExplaining: 1 } }),
  option('block', 'menekan block, lalu menatap layar seperti baru melakukan operasi kecil', 'Hard exit with aftershock.', ['eight', 'Fi', 'willFirm'], { relationship: { autonomyProtection: 1.3, fearfulAvoidantLeaning: 0.7 }, stress: { fight: 0.7 } }),
  option('stay', 'tetap duduk di dekatnya, walau tidak tahu harus berkata apa', 'Presence before words.', ['nine', 'Fe', 'tender'], { relationship: { secureLeaning: 0.8, anxiousLeaning: 0.3 }, conflict: { calming: 1 } })
];

for (let i = 0; i < 6; i += 1) {
  items.push(
    choiceItem({
      id: `rel_choice_${String(i + 1).padStart(3, '0')}`,
      index: 630 + i,
      kind: i % 3 === 0 ? 'dialogueChoice' : i % 3 === 1 ? 'hiddenReaction' : 'endingChoice',
      theme: ['hampir putus', 'pesan tidak dibalas', 'rahasia pasangan', 'teman lama', 'crush berubah', 'keluarga menekan'][i],
      prompt: [
        'Seseorang yang kau sayangi berkata, “aku nggak tahu kita ini apa.” Apa yang paling dekat?',
        'Pesanmu dibaca lama sekali. Setelah itu, apa yang lebih mungkin terjadi?',
        'Kau tahu ia menyembunyikan sesuatu, tapi belum tahu seberapa besar. Apa reaksi pertamamu?',
        'Teman lama datang membawa cerita yang dulu membuatmu sakit. Ending mana yang kau pilih?',
        'Orang yang kau suka mendadak berubah. Apa yang kau lakukan sebelum terlihat santai?',
        'Keluarga menekanmu untuk memaafkan orang yang belum minta maaf. Apa yang kau lakukan?'
      ][i],
      instruction: 'Pilih satu.',
      options: [...relationshipOptions.slice(i % 4), ...relationshipOptions.slice(0, i % 4)].slice(0, 6),
      targetSignals: ['relationship tendency', 'attachment leaning', 'communication under hurt'],
      reliability: 0.78
    })
  );
}

export const questionItemsRelationship: QuestionItem[] = items;
