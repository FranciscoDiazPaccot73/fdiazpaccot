import type { OpenFootballWorldCup } from "../../types/openfootball";
import type { WorldCupData } from "../../types/worldCup";
import { mapOpenFootballWorldCup } from "./openfootballMapper";

const WORLDCUP_JSON_URL =
  "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json";

/**
 * World Cup data provider.
 * Fetches from openfootball/worldcup.json and maps into the site model.
 */
export async function getWorldCupData(): Promise<WorldCupData> {
  const response = await fetch(WORLDCUP_JSON_URL);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch World Cup data (${response.status} ${response.statusText})`,
    );
  }

  const data = (await response.json()) as OpenFootballWorldCup;
  return mapOpenFootballWorldCup(data);
}
