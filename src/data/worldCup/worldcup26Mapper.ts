import type { WorldCup26Game, WorldCup26Response } from "../../types/worldcup26";
import type { MatchStatus, WorldCupData, WorldCupMatch } from "../../types/worldCup";
import { parseWallClockInTimeZone } from "./timeZone";

const RECENT_RESULTS_LIMIT = 3;
const UPCOMING_MATCHES_LIMIT = 3;

const STADIUM_TIMEZONES: Record<string, string> = {
  "1": "America/Mexico_City",
  "2": "America/Mexico_City",
  "3": "America/Monterrey",
  "4": "America/Chicago",
  "5": "America/Chicago",
  "6": "America/Chicago",
  "7": "America/New_York",
  "8": "America/New_York",
  "9": "America/New_York",
  "10": "America/New_York",
  "11": "America/New_York",
  "12": "America/Toronto",
  "13": "America/Vancouver",
  "14": "America/Los_Angeles",
  "15": "America/Los_Angeles",
  "16": "America/Los_Angeles",
};

function parseKickoffIso(localDate: string, stadiumId: string): string {
  const timeZone = STADIUM_TIMEZONES[stadiumId];

  if (!timeZone) {
    return new Date().toISOString();
  }

  return parseWallClockInTimeZone(localDate, timeZone).toISOString();
}

function parseScore(value: string): number | undefined {
  if (!value || value === "null") return undefined;

  const score = Number(value);
  return Number.isNaN(score) ? undefined : score;
}

function getTeamName(game: WorldCup26Game, side: "home" | "away"): string {
  if (side === "home") {
    return game.home_team_name_en ?? game.home_team_label ?? "TBD";
  }

  return game.away_team_name_en ?? game.away_team_label ?? "TBD";
}

function resolveMatchStatus(game: WorldCup26Game): MatchStatus {
  const elapsed = game.time_elapsed.toLowerCase();

  if (elapsed === "live") return "live";
  if (game.finished === "TRUE" || elapsed === "finished") return "finished";
  return "scheduled";
}

function getDisplayScore(
  game: WorldCup26Game,
  status: MatchStatus,
): [number | undefined, number | undefined] {
  if (status === "scheduled") return [undefined, undefined];

  return [parseScore(game.home_score), parseScore(game.away_score)];
}

export function mapWorldCup26Game(game: WorldCup26Game): WorldCupMatch {
  const status = resolveMatchStatus(game);
  const [homeScore, awayScore] = getDisplayScore(game, status);

  return {
    id: `wc-2026-${game.id.padStart(3, "0")}`,
    homeTeam: getTeamName(game, "home"),
    awayTeam: getTeamName(game, "away"),
    status,
    homeScore,
    awayScore,
    kickoff: parseKickoffIso(game.local_date, game.stadium_id),
  };
}

export function mapWorldCup26Response(
  data: WorldCup26Response,
): WorldCupData {
  const matches = data.games.map(mapWorldCup26Game);

  const liveMatches = matches
    .filter((match) => match.status === "live")
    .sort(
      (a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime(),
    );

  const recentResults = matches
    .filter((match) => match.status === "finished")
    .sort(
      (a, b) => new Date(b.kickoff).getTime() - new Date(a.kickoff).getTime(),
    )
    .slice(0, RECENT_RESULTS_LIMIT);

  const upcomingMatches = matches
    .filter((match) => match.status === "scheduled")
    .sort(
      (a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime(),
    )
    .slice(0, UPCOMING_MATCHES_LIMIT);

  return { liveMatches, recentResults, upcomingMatches };
}
