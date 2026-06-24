import type { WorldCup26Response } from "../../types/worldcup26";
import type { WorldCupData } from "../../types/worldCup";
import { mapWorldCup26Response } from "./worldcup26Mapper";

const WORLDCUP_GAMES_URL = "https://worldcup26.ir/get/games";

/**
 * World Cup data provider.
 * Called client-side on each About page visit via worldCupClient.ts.
 */
export async function getWorldCupData(): Promise<WorldCupData> {
  const response = await fetch(WORLDCUP_GAMES_URL);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch World Cup data (${response.status} ${response.statusText})`,
    );
  }

  const data = (await response.json()) as WorldCup26Response;
  return mapWorldCup26Response(data);
}
