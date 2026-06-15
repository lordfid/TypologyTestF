export type QuestionKind =
  | 'swipePair'
  | 'singleChoice'
  | 'multiChoice'
  | 'ranking'
  | 'dragMatch'
  | 'connectDots'
  | 'objectChoice'
  | 'placeChoice'
  | 'dialogueChoice'
  | 'songGenreChoice'
  | 'fictionalFate'
  | 'firstReaction'
  | 'hiddenReaction'
  | 'endingChoice'
  | 'scenarioCard';

export type AnswerKind =
  | 'left'
  | 'right'
  | 'choice'
  | 'multi'
  | 'rank'
  | 'match'
  | 'connect'
  | 'both'
  | 'neither'
  | 'depends'
  | 'skip';

export type CognitiveFunction = 'Ni' | 'Ne' | 'Si' | 'Se' | 'Fi' | 'Fe' | 'Ti' | 'Te';

export type StackRole =
  | 'dominant'
  | 'auxiliary'
  | 'tertiary'
  | 'inferior'
  | 'opposing'
  | 'critical'
  | 'trickster'
  | 'transformative';

export type PairKind =
  | 'cognitiveContrast'
  | 'roleContrast'
  | 'sameBehaviorDifferentMotive'
  | 'sameMotiveDifferentBehavior'
  | 'shadowContrast'
  | 'traitContrast'
  | 'symbolicChoice'
  | 'dialogueChoice'
  | 'placeChoice'
  | 'objectChoice'
  | 'tieBreak';

export type OppositionStrength = 'soft' | 'medium' | 'strong' | 'extreme';

export type ScoreWeight = {
  cognitive?: Partial<Record<CognitiveFunction, number>>;
  stackRole?: Partial<Record<StackRole, number>>;
  mbtiAxis?: Partial<Record<string, number>>;
  enneagram?: Partial<Record<string, number>>;
  instinct?: Partial<Record<string, number>>;
  bigFive?: Partial<Record<string, number>>;
  hexaco?: Partial<Record<string, number>>;
  attitudinalPsyche?: Partial<Record<string, number>>;
  disc?: Partial<Record<string, number>>;
  riasec?: Partial<Record<string, number>>;
  moral?: Partial<Record<string, number>>;
  decision?: Partial<Record<string, number>>;
  conflict?: Partial<Record<string, number>>;
  communication?: Partial<Record<string, number>>;
  relationship?: Partial<Record<string, number>>;
  stress?: Partial<Record<string, number>>;
  defense?: Partial<Record<string, number>>;
  values?: Partial<Record<string, number>>;
  work?: Partial<Record<string, number>>;
  learning?: Partial<Record<string, number>>;
  coreFear?: Partial<Record<string, number>>;
  coreDesire?: Partial<Record<string, number>>;
  evidence?: Partial<Record<string, number>>;
  reliability?: number;
  ambiguity?: number;
  contradiction?: number;
};

export type QuestionOption = {
  id: string;
  text: string;
  subtleMeaning: string;
  weights: ScoreWeight;
};

export type MatchPair = {
  leftId: string;
  leftText: string;
  rightOptions: QuestionOption[];
};

export type ConnectDot = {
  id: string;
  label: string;
  group?: string;
  weights: ScoreWeight;
};

export type QuestionItem = {
  id: string;
  kind: QuestionKind;
  pairKind?: PairKind;
  context: {
    theme: string;
    place: string;
    relationship: string;
    emotion: string;
    pressureLevel: 'low' | 'medium' | 'high' | 'crisis';
    timeOrientation: 'past' | 'present' | 'future' | 'mixed';
    socialExposure: 'private' | 'semiPrivate' | 'public';
    emotionalCharge: 'low' | 'medium' | 'high';
    fictionalMode?: boolean;
    inspiration?: string;
  };
  prompt: string;
  instruction: string;
  options?: QuestionOption[];
  left?: QuestionOption;
  right?: QuestionOption;
  pairs?: MatchPair[];
  dots?: ConnectDot[];
  opposition?: {
    strength: OppositionStrength;
    axis?: string;
    note: string;
  };
  scoringMode:
    | 'forcedChoice'
    | 'multiSignal'
    | 'rankWeighted'
    | 'matchAssociation'
    | 'symbolicPreference'
    | 'reactionTrace';
  targetSignals: string[];
  reliability: number;
};

export type SwipeAnswerValue = 'left' | 'right' | 'both' | 'neither' | 'depends' | 'skip';

export type StoredAnswer =
  | { kind: 'left' | 'right' | 'both' | 'neither' | 'depends' | 'skip'; questionId: string; answeredAt: string }
  | { kind: 'choice'; questionId: string; optionId: string; answeredAt: string }
  | { kind: 'multi'; questionId: string; optionIds: string[]; answeredAt: string }
  | { kind: 'rank'; questionId: string; orderedOptionIds: string[]; answeredAt: string }
  | { kind: 'match'; questionId: string; pairs: Record<string, string>; answeredAt: string }
  | { kind: 'connect'; questionId: string; connections: Record<string, string>; answeredAt: string };

export type AnswerMap = Record<string, StoredAnswer>;

export type ScoreBucketName =
  | 'cognitive'
  | 'stackRole'
  | 'mbtiAxis'
  | 'enneagram'
  | 'instinct'
  | 'bigFive'
  | 'hexaco'
  | 'attitudinalPsyche'
  | 'disc'
  | 'riasec'
  | 'moral'
  | 'decision'
  | 'conflict'
  | 'communication'
  | 'relationship'
  | 'stress'
  | 'defense'
  | 'values'
  | 'work'
  | 'learning'
  | 'coreFear'
  | 'coreDesire'
  | 'evidence';

export type ScoreBuckets = Record<ScoreBucketName, Record<string, number>>;

export type ContextSpread = Record<string, Record<string, number>>;

export type RawScores = {
  buckets: ScoreBuckets;
  maxPossible: ScoreBuckets;
  minPossible: ScoreBuckets;
  functionRole: Record<CognitiveFunction, Record<StackRole, number>>;
  functionContexts: Record<CognitiveFunction, Record<string, number>>;
  skippedTheme: Record<string, number>;
  skippedKind: Record<QuestionKind, number>;
  answerPatternCounts: Record<string, number>;
  contextScores: ContextSpread;
  contradiction: number;
  ambiguity: number;
  reliabilitySum: number;
  answeredCount: number;
  skippedCount: number;
  totalQuestions: number;
};

export type NormalizedScores = {
  buckets: ScoreBuckets;
  functionRole: Record<CognitiveFunction, Record<StackRole, number>>;
  functionContexts: Record<CognitiveFunction, Record<string, number>>;
};

export type RankedScore = {
  key: string;
  score: number;
  label?: string;
};

export type MbtiResult = {
  type: string;
  score: number;
  confidence: number;
  stack: CognitiveFunction[];
  note: string;
};

export type FinalResult = {
  generatedAt: string;
  answeredCount: number;
  skippedCount: number;
  totalQuestions: number;
  confidence: number;
  confidenceLabel: string;
  topMbti: MbtiResult[];
  functionRanking: RankedScore[];
  stackRoles: Record<StackRole, string>;
  shadowRoles: Record<StackRole, string>;
  mbtiAxis: RankedScore[];
  enneagram: RankedScore[];
  wing: string;
  instinctStacking: string;
  tritype: string;
  bigFive: RankedScore[];
  hexaco: RankedScore[];
  socionics: string;
  quadra: string;
  temperament: string;
  classicalTemperament: string;
  attitudinalPsyche: string;
  disc: RankedScore[];
  riasec: RankedScore[];
  moralStyle: RankedScore[];
  decisionStyle: RankedScore[];
  conflictStyle: RankedScore[];
  communicationStyle: RankedScore[];
  relationshipTendency: RankedScore[];
  stressResponse: RankedScore[];
  coreFear: RankedScore[];
  coreDesire: RankedScore[];
  valuesRanking: RankedScore[];
  workStyle: RankedScore[];
  learningStyle: RankedScore[];
  defensePattern: RankedScore[];
  evidence: RankedScore[];
  notes: string[];
  localNarrative: string;
  closeResults: string[];
  normalized: NormalizedScores;
  raw: RawScores;
};

export type AuditWarning = {
  level: 'info' | 'warning' | 'danger';
  message: string;
};
