import type { OpenFootballMatch, OpenFootballWorldCup } from "../../types/openfootball";
import type { WorldCupData, WorldCupMatch } from "../../types/worldCup";

const RECENT_RESULTS_LIMIT = 3;
const UPCOMING_MATCHES_LIMIT = 3;

/** Parses openfootball times such as "13:00 UTC-6" into an ISO 8601 string. */
export function parseKickoff(date: string, time?: string): string {
  const [year, month, day] = date.split("-").map(Number);

  if (!time) {
    return new Date(Date.UTC(year, month - 1, day, 12, 0, 0)).toISOString();
  }

  const match = time.match(/^(\d{2}):(\d{2})\s+UTC([+-]?\d+)$/);
  if (!match) {
    return new Date(Date.UTC(year, month - 1, day, 12, 0, 0)).toISOString();
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  const offsetHours = Number(match[3]);

  return new Date(
    Date.UTC(year, month - 1, day, hours - offsetHours, minutes, 0),
  ).toISOString();
}

function toMatchId(match: OpenFootballMatch): string {
  if (match.num != null) {
    return `wc-2026-${String(match.num).padStart(3, "0")}`;
  }

  const slug = `${match.date}-${match.team1}-${match.team2}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `wc-2026-${slug}`;
}

export function mapOpenFootballMatch(match: OpenFootballMatch): WorldCupMatch {
  const isFinished = Boolean(match.score?.ft);

  return {
    id: toMatchId(match),
    homeTeam: match.team1,
    awayTeam: match.team2,
    status: isFinished ? "finished" : "scheduled",
    homeScore: match.score?.ft?.[0],
    awayScore: match.score?.ft?.[1],
    kickoff: parseKickoff(match.date, match.time),
  };
}

export function mapOpenFootballWorldCup(
  data: OpenFootballWorldCup,
  now = new Date(),
): WorldCupData {
  const matches = data.matches.map(mapOpenFootballMatch);
  const nowMs = now.getTime();

  const recentResults = matches
    .filter((match) => match.status === "finished")
    .sort(
      (a, b) => new Date(b.kickoff).getTime() - new Date(a.kickoff).getTime(),
    )
    .slice(0, RECENT_RESULTS_LIMIT);

  const upcomingMatches = matches
    .filter(
      (match) =>
        match.status === "scheduled" && new Date(match.kickoff).getTime() >= nowMs,
    )
    .sort(
      (a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime(),
    )
    .slice(0, UPCOMING_MATCHES_LIMIT);

  return { recentResults, upcomingMatches };
}
