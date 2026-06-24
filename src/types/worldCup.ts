export type MatchStatus = "finished" | "scheduled";

export interface WorldCupMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  status: MatchStatus;
  homeScore?: number;
  awayScore?: number;
  /** ISO 8601 datetime for scheduled kickoff */
  kickoff: string;
}

export interface WorldCupData {
  recentResults: WorldCupMatch[];
  upcomingMatches: WorldCupMatch[];
}
