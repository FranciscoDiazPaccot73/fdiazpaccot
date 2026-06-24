export type MatchStatus = "finished" | "live" | "scheduled";

export interface WorldCupMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  status: MatchStatus;
  homeScore?: number;
  awayScore?: number;
  /** ISO 8601 UTC datetime for sorting and Argentina-time display */
  kickoff: string;
}

export interface WorldCupData {
  liveMatches: WorldCupMatch[];
  recentResults: WorldCupMatch[];
  upcomingMatches: WorldCupMatch[];
}
