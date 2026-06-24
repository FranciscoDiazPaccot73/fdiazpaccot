export const ARGENTINA_TIME_ZONE = "America/Argentina/Buenos_Aires";
export const ARGENTINA_TIME_ZONE_LABEL = "UTC-3";

interface ZonedParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

function getZonedParts(date: Date, timeZone: string): ZonedParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);

  return {
    year: read("year"),
    month: read("month"),
    day: read("day"),
    hour: read("hour"),
    minute: read("minute"),
  };
}

/** Converts an API wall-clock string in a given IANA timezone to UTC. */
export function parseWallClockInTimeZone(
  localDate: string,
  timeZone: string,
): Date {
  const match = localDate.match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})$/);
  if (!match) return new Date();

  const target = {
    month: Number(match[1]),
    day: Number(match[2]),
    year: Number(match[3]),
    hour: Number(match[4]),
    minute: Number(match[5]),
  };

  let utcMs = Date.UTC(
    target.year,
    target.month - 1,
    target.day,
    target.hour,
    target.minute,
  );

  for (let i = 0; i < 8; i++) {
    const actual = getZonedParts(new Date(utcMs), timeZone);

    if (
      actual.year === target.year &&
      actual.month === target.month &&
      actual.day === target.day &&
      actual.hour === target.hour &&
      actual.minute === target.minute
    ) {
      return new Date(utcMs);
    }

    utcMs -= (actual.hour - target.hour) * 3_600_000;
    utcMs -= (actual.minute - target.minute) * 60_000;
    utcMs -= (actual.day - target.day) * 86_400_000;
  }

  return new Date(utcMs);
}

export function formatArgentinaTime(date: Date): string {
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: ARGENTINA_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return `${time} ${ARGENTINA_TIME_ZONE_LABEL}`;
}

export function formatArgentinaDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: ARGENTINA_TIME_ZONE,
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
