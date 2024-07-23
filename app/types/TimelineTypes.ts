export type TimeLineDto = {
  metadata: MetadataTimeLineDto; // Match metadata
  info: InfoTimeLineDto; // Match info
};

export type InfoTimeLineDto = {
  endOfGameResult: string; // Indicates if the game ended in termination
  frameInterval: number;
  gameId: number;
  participants: ParticipantTimeLineDto[];
  frames: FramesTimeLineDto[];
};

type MetadataTimeLineDto = {
  dataVersion: string; // Match data version
  matchId: string; // Match ID
  participants: string[]; // A list of participant PUUIDs
};

type FramesTimeLineDto = {
  events: EventsTimeLineDto[];
  participantFrames: ParticipantFramesDto;
  timestamp: number;
};

type ParticipantFramesDto = {
  [key: number]: ParticipantFrameDto; // Key value mapping for each participant (1-9)
};

type EventsTimeLineDto = {
  timestamp: number;
  realTimestamp: number;
  type: string;
};

type ParticipantTimeLineDto = {
  participantId: number;
  puuid: string;
};
type ChampionStatsDto = {
  abilityHaste: number;
  abilityPower: number;
  armor: number;
  armorPen: number;
  armorPenPercent: number;
  attackDamage: number;
  attackSpeed: number;
  bonusArmorPenPercent: number;
  bonusMagicPenPercent: number;
  ccReduction: number;
  cooldownReduction: number;
  health: number;
  healthMax: number;
  healthRegen: number;
  lifesteal: number;
  magicPen: number;
  magicPenPercent: number;
  magicResist: number;
  movementSpeed: number;
  omnivamp: number;
  physicalVamp: number;
  power: number;
  powerMax: number;
  powerRegen: number;
  spellVamp: number;
};

type DamageStatsDto = {
  magicDamageDone: number;
  magicDamageDoneToChampions: number;
  magicDamageTaken: number;
  physicalDamageDone: number;
  physicalDamageDoneToChampions: number;
  physicalDamageTaken: number;
  totalDamageDone: number;
  totalDamageDoneToChampions: number;
  totalDamageTaken: number;
  trueDamageDone: number;
  trueDamageDoneToChampions: number;
  trueDamageTaken: number;
};

type PositionDto = {
  x: number;
  y: number;
};

type ParticipantFrameDto = {
  championStats: ChampionStatsDto;
  currentGold: number;
  damageStats: DamageStatsDto;
  goldPerSecond: number;
  jungleMinionsKilled: number;
  level: number;
  minionsKilled: number;
  participantId: number;
  position: PositionDto;
  timeEnemySpentControlled: number;
  totalGold: number;
  xp: number;
};
