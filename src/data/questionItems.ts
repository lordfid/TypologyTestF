import type { CognitiveFunction, OppositionStrength, PairKind, QuestionItem, QuestionKind, QuestionOption, ScoreWeight } from '../types';

export type SignalKey =
  | CognitiveFunction
  | 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine'
  | 'sp' | 'sx' | 'so'
  | 'order' | 'tender' | 'bold' | 'quiet' | 'craft' | 'image' | 'truth' | 'freedom'
  | 'logicFirm' | 'logicFlexible' | 'emotionFirm' | 'emotionFlexible' | 'bodyFirm' | 'bodyFlexible' | 'willFirm' | 'willFlexible';

export const signalWeights: Record<SignalKey, ScoreWeight> = {
  Ni: {
    cognitive: { Ni: 2, Fi: 0.4 },
    stackRole: { dominant: 0.9, auxiliary: 0.4 },
    mbtiAxis: { I: 0.5, N: 1, J: 0.35 },
    evidence: { patternReading: 2, futureProjection: 1.3, observeFirst: 1, meaningSeeking: 0.8, silentMonitoring: 0.7 },
    decision: { reflective: 1, longView: 1 },
    learning: { conceptual: 1, reflective: 1 },
    reliability: 0.86
  },
  Ne: {
    cognitive: { Ne: 2, Ti: 0.35 },
    stackRole: { dominant: 0.7, auxiliary: 0.6, tertiary: 0.3 },
    mbtiAxis: { E: 0.3, N: 1, P: 0.8 },
    evidence: { possibilitySeeking: 2, noveltySeeking: 1.3, ambiguityTolerance: 1, indirectEngagement: 0.5 },
    decision: { exploratory: 1.3, optionTesting: 1 },
    learning: { experimental: 1, associative: 1 },
    reliability: 0.84
  },
  Si: {
    cognitive: { Si: 2, Fe: 0.25 },
    stackRole: { dominant: 0.7, auxiliary: 0.7, tertiary: 0.3 },
    mbtiAxis: { I: 0.4, S: 1, J: 0.8 },
    evidence: { memoryReferencing: 2, pastComparison: 1.4, riskAvoidance: 0.8, comfortSeeking: 0.7, practicalRepair: 0.5 },
    values: { security: 1, loyalty: 0.7 },
    learning: { repetition: 1, notes: 1 },
    reliability: 0.86
  },
  Se: {
    cognitive: { Se: 2, Te: 0.3 },
    stackRole: { dominant: 0.7, auxiliary: 0.5, inferior: 0.35 },
    mbtiAxis: { E: 0.6, S: 1, P: 0.7 },
    evidence: { sensoryImmediacy: 2, actionFirst: 1.5, riskTaking: 0.9, bodyAwareness: 0.9, directEngagement: 1 },
    stress: { fight: 0.6, flight: 0.3 },
    learning: { handsOn: 1.2 },
    reliability: 0.84
  },
  Fi: {
    cognitive: { Fi: 2, Ni: 0.35 },
    stackRole: { dominant: 0.8, auxiliary: 0.6, tertiary: 0.25 },
    mbtiAxis: { I: 0.5, F: 1, P: 0.3 },
    evidence: { personalValueFiltering: 2, selfRespect: 1.1, boundarySetting: 0.9, emotionalExpression: 0.8, meaningSeeking: 0.6 },
    moral: { integrityBased: 1, truthBased: 0.8, freedomBased: 0.4 },
    relationship: { autonomyProtection: 0.8, withdrawalWhenHurt: 0.3 },
    reliability: 0.86
  },
  Fe: {
    cognitive: { Fe: 2, Si: 0.25 },
    stackRole: { dominant: 0.75, auxiliary: 0.75, inferior: 0.25 },
    mbtiAxis: { E: 0.6, F: 1, J: 0.5 },
    evidence: { socialHarmonyMonitoring: 2, peopleFirst: 1.2, appeasement: 0.5, belongingSeeking: 0.8, imageManagement: 0.45 },
    moral: { careBased: 1.2, loyaltyBased: 0.8 },
    relationship: { reassuranceSeeking: 0.4, secureLeaning: 0.5 },
    reliability: 0.86
  },
  Ti: {
    cognitive: { Ti: 2, Ne: 0.35 },
    stackRole: { dominant: 0.75, auxiliary: 0.75, tertiary: 0.25 },
    mbtiAxis: { I: 0.4, T: 1, P: 0.5 },
    evidence: { internalLogicChecking: 2, analysisLoop: 1.1, truthSeeking: 0.9, observeFirst: 0.7, certaintySeeking: 0.4 },
    decision: { principleTesting: 1.2, evidenceBased: 1 },
    learning: { analytic: 1.2, selfDirected: 0.8 },
    reliability: 0.86
  },
  Te: {
    cognitive: { Te: 2, Se: 0.25 },
    stackRole: { dominant: 0.8, auxiliary: 0.7, inferior: 0.2 },
    mbtiAxis: { E: 0.45, T: 1, J: 0.9 },
    evidence: { externalEfficiencySeeking: 2, systemFirst: 1, practicalRepair: 1.1, actionFirst: 0.8, controlSeeking: 0.6 },
    decision: { executionFirst: 1.2, evidenceBased: 0.7 },
    work: { organizer: 1.1, deadlineDriven: 1 },
    reliability: 0.86
  },
  one: {
    enneagram: { '1': 2 }, coreFear: { fearWrong: 2 }, coreDesire: { desireIntegrity: 2 },
    evidence: { justiceSeeking: 1, certaintySeeking: 0.7, selfRespect: 0.4 }, defense: { perfectionism: 1, control: 0.5 }, moral: { integrityBased: 1.4, ruleBased: 0.8 }, reliability: 0.82
  },
  two: {
    enneagram: { '2': 2 }, coreFear: { fearUnwanted: 2 }, coreDesire: { desireNeeded: 2 },
    evidence: { belongingSeeking: 1.2, peopleFirst: 1.2, validationSeeking: 0.7 }, defense: { peoplePleasing: 1, selfBlame: 0.3 }, moral: { careBased: 1.3 }, relationship: { reassuranceSeeking: 0.8 }, reliability: 0.82
  },
  three: {
    enneagram: { '3': 2 }, coreFear: { fearFailure: 2 }, coreDesire: { desireWorth: 2 },
    evidence: { achievementSeeking: 1.5, imageManagement: 1.2, statusAwareness: 0.9 }, defense: { rationalization: 0.6 }, work: { targetDriven: 1.2 }, reliability: 0.82
  },
  four: {
    enneagram: { '4': 2 }, coreFear: { fearOrdinary: 2 }, coreDesire: { desireIdentity: 2 },
    evidence: { meaningSeeking: 1.5, symbolicMeaning: 1.3, emotionalExpression: 0.8, shameResponse: 0.6 }, defense: { idealization: 0.5, withdrawal: 0.5 }, values: { beauty: 1.1 }, reliability: 0.82
  },
  five: {
    enneagram: { '5': 2 }, coreFear: { fearIncompetent: 2 }, coreDesire: { desireUnderstanding: 2 },
    evidence: { competenceSeeking: 1.4, analysisLoop: 1.2, withdrawal: 1 }, defense: { intellectualization: 1.1, emotionalSuppression: 0.5 }, learning: { deepResearch: 1.3 }, reliability: 0.82
  },
  six: {
    enneagram: { '6': 2 }, coreFear: { fearUnsafe: 2 }, coreDesire: { desireCertainty: 2 },
    evidence: { loyaltySeeking: 1.2, riskAvoidance: 1.1, certaintySeeking: 1, silentMonitoring: 0.6 }, defense: { projection: 0.4, overExplaining: 0.5 }, stress: { freeze: 0.5, control: 0.5 }, reliability: 0.82
  },
  seven: {
    enneagram: { '7': 2 }, coreFear: { fearTrapped: 2 }, coreDesire: { desireFreedom: 2 },
    evidence: { noveltySeeking: 1.5, riskTaking: 0.8, moodRegulation: 0.9, possibilitySeeking: 0.7 }, defense: { avoidance: 0.8, humorDeflection: 0.8 }, values: { freedom: 1.2 }, reliability: 0.82
  },
  eight: {
    enneagram: { '8': 2 }, coreFear: { fearControlled: 2 }, coreDesire: { desireStrength: 2 },
    evidence: { confrontation: 1.4, autonomyProtection: 1.2, boundarySetting: 1, angerResponse: 0.9 }, stress: { fight: 1.2 }, conflict: { direct: 1.2 }, reliability: 0.82
  },
  nine: {
    enneagram: { '9': 2 }, coreFear: { fearConflict: 2 }, coreDesire: { desirePeace: 2 },
    evidence: { peaceSeeking: 1.5, appeasement: 0.8, comfortSeeking: 0.7, withdrawal: 0.5 }, stress: { numb: 0.8, freeze: 0.5 }, defense: { avoidance: 0.6 }, conflict: { calming: 1.1 }, reliability: 0.82
  },
  sp: { instinct: { sp: 2 }, evidence: { comfortSeeking: 1.2, riskAvoidance: 1, practicalRepair: 0.8, bodyAwareness: 0.7 }, values: { security: 1.2 }, stress: { control: 0.4 }, reliability: 0.8 },
  sx: { instinct: { sx: 2 }, evidence: { intimacySeeking: 1.4, intensitySeeking: 1.3, emotionalTesting: 0.5, meaningSeeking: 0.4 }, relationship: { intimacyFear: 0.3, fearfulAvoidantLeaning: 0.3 }, values: { intimacy: 1.2 }, reliability: 0.8 },
  so: { instinct: { so: 2 }, evidence: { belongingSeeking: 1.3, statusAwareness: 1, visibleRole: 0.8, peopleFirst: 0.7 }, values: { impact: 0.8, belonging: 1 }, reliability: 0.8 },
  order: { bigFive: { conscientiousness: 2 }, hexaco: { conscientiousness: 2 }, disc: { C: 1.2 }, evidence: { orderSeeking: 1.4, practicalRepair: 0.8 }, work: { planner: 1.1 }, reliability: 0.78 },
  tender: { bigFive: { agreeableness: 1.8, neuroticism: 0.4 }, hexaco: { agreeableness: 1.2, emotionality: 1 }, communication: { gentle: 1.2 }, conflict: { softBoundary: 1 }, evidence: { peopleFirst: 1, appeasement: 0.4 }, reliability: 0.78 },
  bold: { bigFive: { extraversion: 1.6 }, hexaco: { extraversion: 1.4 }, disc: { D: 1.4, I: 0.5 }, communication: { direct: 1.2 }, conflict: { direct: 1 }, evidence: { directEngagement: 1.2, visibleRole: 0.8 }, reliability: 0.78 },
  quiet: { bigFive: { neuroticism: 0.6 }, hexaco: { emotionality: 0.7 }, communication: { reserved: 1.2 }, relationship: { withdrawalWhenHurt: 0.8 }, evidence: { withdrawal: 1, silentMonitoring: 0.9 }, reliability: 0.78 },
  craft: { riasec: { Realistic: 1.4, Investigative: 0.5 }, work: { maker: 1.2 }, learning: { handsOn: 1.1 }, evidence: { practicalRepair: 1, bodyAwareness: 0.5 }, reliability: 0.78 },
  image: { riasec: { Enterprising: 1.1, Artistic: 0.5 }, evidence: { imageManagement: 1.2, statusAwareness: 0.8 }, work: { publicFacing: 1 }, reliability: 0.78 },
  truth: { moral: { truthBased: 1.5, justiceBased: 0.9 }, decision: { evidenceBased: 1.2 }, evidence: { truthSeeking: 1.5, confrontation: 0.4 }, reliability: 0.8 },
  freedom: { moral: { freedomBased: 1.3 }, values: { freedom: 1.5 }, evidence: { autonomyProtection: 1.2, noveltySeeking: 0.6 }, conflict: { exit: 0.8 }, reliability: 0.8 },
  logicFirm: { attitudinalPsyche: { L_confidence: 2, L_flexibility: -0.2 }, evidence: { truthSeeking: 0.8, certaintySeeking: 0.6 }, decision: { principleTesting: 1 }, reliability: 0.76 },
  logicFlexible: { attitudinalPsyche: { L_flexibility: 2, L_confidence: 0.5 }, evidence: { ambiguityTolerance: 0.8, overExplaining: 0.2 }, communication: { dialogic: 1 }, reliability: 0.76 },
  emotionFirm: { attitudinalPsyche: { E_confidence: 2 }, evidence: { emotionalExpression: 1.1, directEngagement: 0.4 }, communication: { expressive: 1.1 }, reliability: 0.76 },
  emotionFlexible: { attitudinalPsyche: { E_flexibility: 2 }, evidence: { peopleFirst: 0.8, moodRegulation: 0.5 }, communication: { warm: 1 }, reliability: 0.76 },
  bodyFirm: { attitudinalPsyche: { F_confidence: 2 }, evidence: { bodyAwareness: 1.2, comfortSeeking: 0.8 }, instinct: { sp: 0.6 }, reliability: 0.76 },
  bodyFlexible: { attitudinalPsyche: { F_flexibility: 2, F_indifference: 0.2 }, evidence: { practicalRepair: 0.6, bodyAwareness: 0.2 }, reliability: 0.76 },
  willFirm: { attitudinalPsyche: { V_confidence: 2 }, evidence: { autonomyProtection: 1.1, controlSeeking: 0.7 }, disc: { D: 0.8 }, reliability: 0.76 },
  willFlexible: { attitudinalPsyche: { V_flexibility: 2, V_insecurity: 0.2 }, evidence: { ambiguityTolerance: 0.7, peopleFirst: 0.4 }, relationship: { secureLeaning: 0.4 }, reliability: 0.76 }
};

export function option(id: string, text: string, subtleMeaning: string, signals: SignalKey[], extra: ScoreWeight = {}): QuestionOption {
  const knownWeights = signals.map((signal) => signalWeights[signal]).filter(Boolean);
  return {
    id,
    text,
    subtleMeaning,
    weights: mergeWeights(...knownWeights, extra)
  };
}

export function mergeWeights(...weights: ScoreWeight[]): ScoreWeight {
  const result: ScoreWeight = {};
  for (const weight of weights) {
    for (const [bucket, value] of Object.entries(weight) as [keyof ScoreWeight, any][]) {
      if (bucket === 'reliability' || bucket === 'ambiguity' || bucket === 'contradiction') {
        result[bucket] = (result[bucket] ?? 0) + (value ?? 0);
      } else {
        result[bucket] = result[bucket] ?? {};
        for (const [key, num] of Object.entries(value ?? {})) {
          (result[bucket] as Record<string, number>)[key] = ((result[bucket] as Record<string, number>)[key] ?? 0) + Number(num);
        }
      }
    }
  }
  return result;
}

const places = [
  'meja makan keluarga', 'dapur saat acara keluarga', 'balkon malam', 'ruang kelas', 'kantor', 'ruang meeting',
  'rumah sakit', 'kafe ramai', 'kafe sepi', 'stasiun', 'parkiran', 'jalan malam', 'rumah lama', 'kos',
  'rooftop', 'toko buku', 'minimarket tengah malam', 'ruang karaoke', 'studio kecil', 'grup chat keluarga'
];

const relationships = [
  'keluarga besar', 'ibu', 'sahabat lama', 'teman baru', 'pasangan', 'mantan', 'atasan', 'rekan kerja',
  'orang asing', 'tetangga', 'orang yang pernah merendahkanmu', 'orang yang membuatmu aman'
];

const emotions = [
  'tertahan', 'malu', 'kesal', 'gugup', 'lega yang aneh', 'ingin pergi', 'muak', 'kosong', 'ingin membuktikan diri',
  'merasa kecil', 'rindu yang tidak mau disebut', 'tidak dianggap'
];

export function contextFor(index: number, theme: string, overrides: Partial<QuestionItem['context']> = {}): QuestionItem['context'] {
  const pressure = ['low', 'medium', 'high', 'crisis'] as const;
  const time = ['past', 'present', 'future', 'mixed'] as const;
  const exposure = ['private', 'semiPrivate', 'public'] as const;
  const charge = ['low', 'medium', 'high'] as const;
  return {
    theme,
    place: places[index % places.length],
    relationship: relationships[index % relationships.length],
    emotion: emotions[index % emotions.length],
    pressureLevel: pressure[index % pressure.length],
    timeOrientation: time[(index + 1) % time.length],
    socialExposure: exposure[(index + 2) % exposure.length],
    emotionalCharge: charge[index % charge.length],
    fictionalMode: false,
    ...overrides
  };
}

export function swipeItem(args: {
  id: string;
  index: number;
  theme: string;
  prompt: string;
  left: QuestionOption;
  right: QuestionOption;
  pairKind?: PairKind;
  strength?: OppositionStrength;
  targetSignals: string[];
  reliability?: number;
  context?: Partial<QuestionItem['context']>;
}): QuestionItem {
  return {
    id: args.id,
    kind: 'swipePair',
    pairKind: args.pairKind ?? 'cognitiveContrast',
    context: contextFor(args.index, args.theme, args.context),
    prompt: args.prompt,
    instruction: 'Pilih sisi yang paling dekat, atau pilih jawaban netral kalau dua sisi terasa sama-sama benar.',
    left: args.left,
    right: args.right,
    opposition: {
      strength: args.strength ?? 'medium',
      note: 'Dua pilihan memberi tarikan berbeda; jawaban netral tetap dihitung sebagai data.'
    },
    scoringMode: 'forcedChoice',
    targetSignals: args.targetSignals,
    reliability: args.reliability ?? 0.82
  };
}

export function choiceItem(args: {
  id: string;
  index: number;
  kind: QuestionKind;
  theme: string;
  prompt: string;
  instruction?: string;
  options: QuestionOption[];
  targetSignals: string[];
  reliability?: number;
  context?: Partial<QuestionItem['context']>;
}): QuestionItem {
  return {
    id: args.id,
    kind: args.kind,
    context: contextFor(args.index, args.theme, args.context),
    prompt: args.prompt,
    instruction: args.instruction ?? (args.kind === 'multiChoice' ? 'Pilih sampai tiga.' : 'Pilih satu.'),
    options: args.options,
    scoringMode: args.kind === 'ranking' ? 'rankWeighted' : args.kind === 'multiChoice' ? 'multiSignal' : 'symbolicPreference',
    targetSignals: args.targetSignals,
    reliability: args.reliability ?? 0.78
  };
}

export const cognitiveScenePairs: Array<[CognitiveFunction, CognitiveFunction, string, string, string]> = [
  ['Ni', 'Se', 'makan malam yang terlalu tenang', 'Kau duduk di meja yang semua orangnya tersenyum terlalu rapi. Ada yang terasa akan pecah, tapi belum ada yang mengakuinya.', 'reading the room before movement vs immediate engagement'],
  ['Ne', 'Si', 'rencana pindah kota', 'Kau memegang tiket yang belum dibeli. Kota itu memanggil, sementara rumah lama masih penuh barang yang belum selesai.', 'opening branches vs keeping return route'],
  ['Fi', 'Fe', 'permintaan maaf yang hambar', 'Seseorang meminta maaf di depan banyak orang, tapi matanya tidak terlihat menyesal.', 'private line vs public softening'],
  ['Ti', 'Te', 'proyek kelompok kacau', 'Rapat sudah berputar lama. Semua orang bicara, tapi pekerjaan belum bergerak satu langkah pun.', 'examining detail vs making movement'],
  ['Ni', 'Ne', 'pesan tengah malam', 'Satu pesan masuk lewat tengah malam: “kau masih bangun?” Kalimat pendek itu membuat kepalamu ramai.', 'single thread vs many exits'],
  ['Si', 'Se', 'barang hilang', 'Dompetmu hilang di tempat ramai. Orang-orang mulai menyuruhmu cepat memilih tindakan.', 'retracing steps vs immediate search'],
  ['Fi', 'Ti', 'dijadikan kambing hitam', 'Seseorang memutar cerita sampai kesalahan itu hampir jatuh ke namamu.', 'line of self vs line of reason'],
  ['Fe', 'Te', 'acara berantakan', 'Acara kecil yang kau bantu mulai kacau. Ada yang panik, ada yang menyalahkan, ada yang hampir menangis.', 'warming people vs arranging tasks']
];

export const signalText: Record<CognitiveFunction, string[]> = {
  Ni: [
    'Aku diam sebentar, memperhatikan siapa yang menahan napas, lalu baru menjawab pendek.',
    'Aku menaruh gelas, menunggu satu detik lebih lama, lalu memilih kalimat yang paling tidak bisa dipelintir.',
    'Aku melihat pintu, kursi kosong, dan wajah mereka; setelah itu aku tahu aku tidak mau ikut permainan ini.',
    'Aku membuka notes, menulis satu kalimat inti, lalu menghapus tiga kalimat lain yang terasa terlalu cepat.'
  ],
  Ne: [
    'Aku membuka tiga jalan keluar di kepala, lalu memilih yang paling tidak membuat malam itu mati total.',
    'Aku tertawa kecil, melempar ide aneh, dan melihat siapa yang berani ikut.',
    'Aku mengubah rute, masuk toko kecil, lalu membiarkan malam itu punya versi baru.',
    'Aku mengirim pesan pendek yang membuka pintu, bukan menutup semuanya sekaligus.'
  ],
  Si: [
    'Aku mencari chat lama, memastikan urutannya, lalu menyimpan bagian yang tidak boleh hilang.',
    'Aku mengambil jaket yang biasa kupakai saat keadaan berat, lalu duduk di tempat yang sudah kukenal.',
    'Aku mengulang dari awal: siapa datang duluan, siapa bicara apa, dan kapan semuanya berubah.',
    'Aku merapikan meja dulu, karena tanganku perlu sesuatu yang bisa dibereskan.'
  ],
  Se: [
    'Aku berdiri, mengambil jaket, dan menyelesaikannya di tempat itu juga.',
    'Aku menatap langsung, menaikkan dagu sedikit, lalu bilang, “sekarang.”',
    'Aku keluar sebentar, membeli minuman dingin, lalu kembali dengan kepala lebih terang.',
    'Aku mengambil kunci motor dan pergi sebelum tubuhku berubah jadi patung.'
  ],
  Fi: [
    'Aku menghapus chat itu, berdiri, lalu bilang, “aku nggak bisa ikut kalau caranya begini.”',
    'Aku menatap lantai lama sekali, lalu memilih tidak menjelaskan bagian diriku yang tidak mereka jaga.',
    'Aku menyimpan surat yang tidak kukirim, karena ada hal yang hanya boleh kubaca sendiri.',
    'Aku mundur satu langkah dan berkata, “aku paham, tapi aku tetap nggak mau.”'
  ],
  Fe: [
    'Aku mengangkat piring kosong dan bilang, “aku bantu cuci ya,” supaya meja itu berhenti terasa panas.',
    'Aku menyentuh lengan teman yang hampir meledak, lalu mengalihkan obrolan ke hal yang bisa ditahan semua orang.',
    'Aku tersenyum kecil, memastikan yang paling diam tidak tertinggal sendirian.',
    'Aku mengirim “kau aman?” sebelum bertanya bagian yang membuatku penasaran.'
  ],
  Ti: [
    'Aku bertanya satu detail yang membuat semua versi cerita mereka mulai goyah.',
    'Aku diam, menyusun urutan kejadian di kepala, lalu menunjuk bagian yang tidak nyambung.',
    'Aku membuka dokumen, membaca baris kecilnya, lalu berkata, “tunggu, ini tidak seperti yang kau bilang.”',
    'Aku memilih tidak bereaksi dulu sampai aku tahu bagian mana yang benar-benar terjadi.'
  ],
  Te: [
    'Aku mengambil spidol, membagi tugas di papan, lalu bilang, “ini selesai satu-satu, jangan debat dulu.”',
    'Aku menelepon orang yang bisa menyelesaikan urusan itu, lalu memotong obrolan yang tidak perlu.',
    'Aku membuka kalender, memilih tanggal, dan meminta semua orang memberi jawaban hari itu juga.',
    'Aku mengumpulkan barang, membayar, lalu membawa orang yang paling panik keluar dari sana.'
  ]
};

export function cognitiveOption(id: string, fn: CognitiveFunction, pick: number, extraSignals: SignalKey[] = []): QuestionOption {
  const text = signalText[fn][pick % signalText[fn].length];
  return option(id, text, `Visible behavior carrying ${fn} plus contextual traces.`, [fn, ...extraSignals]);
}
