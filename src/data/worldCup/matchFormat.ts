import type { WorldCupMatch } from "../../types/worldCup";
import {
  ARGENTINA_TIME_ZONE_LABEL,
  formatArgentinaDate,
  formatArgentinaTime,
} from "./timeZone";

function formatScheduledTime(match: WorldCupMatch): string {
  return formatArgentinaTime(new Date(match.kickoff));
}

export function getCenterLabel(match: WorldCupMatch): string {
  if (match.status === "finished" || match.status === "live") {
    if (match.homeScore != null && match.awayScore != null) {
      return `${match.homeScore} – ${match.awayScore}`;
    }

    return "–";
  }

  return formatScheduledTime(match);
}

export function getCenterAriaLabel(match: WorldCupMatch): string {
  const centerLabel = getCenterLabel(match);

  if (match.status === "finished") {
    return `Score: ${centerLabel}`;
  }

  if (match.status === "live") {
    return centerLabel === "–" ? "Live" : `Live score: ${centerLabel}`;
  }

  return `Kickoff: ${centerLabel} (${ARGENTINA_TIME_ZONE_LABEL})`;
}

export function formatKickoffDate(kickoff: string): string {
  return formatArgentinaDate(new Date(kickoff));
}
