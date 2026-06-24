export interface OpenFootballMatch {
  round?: string;
  num?: number;
  date: string;
  time?: string;
  team1: string;
  team2: string;
  score?: {
    ft: [number, number];
    ht?: [number, number];
  };
  group?: string;
  ground?: string;
}

export interface OpenFootballWorldCup {
  name: string;
  matches: OpenFootballMatch[];
}
