import type { WorldCupMatch } from "../../types/worldCup";
import {
  formatKickoffDate,
  getCenterAriaLabel,
  getCenterLabel,
} from "./matchFormat";
import { getWorldCupData } from "./worldCupProvider";

function renderMatchRow(match: WorldCupMatch): string {
  const centerLabel = getCenterLabel(match);
  const centerAria = getCenterAriaLabel(match);

  return `<article class="border-b border-zinc-800/60 py-4 sm:py-5 last:border-b-0" aria-label="${match.homeTeam} vs ${match.awayTeam}">
  <div class="flex items-baseline justify-between gap-3 min-w-0 max-w-2xl mx-auto w-full">
    <span class="text-sm text-zinc-300 min-w-0 flex-1">${match.homeTeam}</span>
    <span class="text-sm text-zinc-400 tabular-nums font-light shrink-0 px-2 sm:px-4" aria-label="${centerAria}">${centerLabel}</span>
    <span class="text-sm text-zinc-300 min-w-0 flex-1 text-right">${match.awayTeam}</span>
  </div>
  <time class="text-xs text-zinc-600 mt-2 block max-w-2xl mx-auto w-full" datetime="${match.kickoff}">${formatKickoffDate(match.kickoff)}</time>
</article>`;
}

function renderMatchList(
  matches: WorldCupMatch[],
  emptyMessage: string,
): string {
  if (matches.length === 0) {
    return `<p class="text-sm text-zinc-600 font-light">${emptyMessage}</p>`;
  }

  return matches.map(renderMatchRow).join("");
}

let loadGeneration = 0;
let listenerAttached = false;

async function loadWorldCupSection(section: HTMLElement): Promise<void> {
  const liveBlock = section.querySelector<HTMLElement>(
    "[data-world-cup-live-block]",
  );
  const liveEl = section.querySelector<HTMLElement>("[data-world-cup-live]");
  const recentEl = section.querySelector<HTMLElement>("[data-world-cup-recent]");
  const upcomingEl = section.querySelector<HTMLElement>(
    "[data-world-cup-upcoming]",
  );

  if (!liveBlock || !liveEl || !recentEl || !upcomingEl) return;

  const generation = ++loadGeneration;

  liveEl.setAttribute("aria-busy", "true");
  recentEl.setAttribute("aria-busy", "true");
  upcomingEl.setAttribute("aria-busy", "true");

  try {
    const { liveMatches, recentResults, upcomingMatches } =
      await getWorldCupData();

    if (generation !== loadGeneration) return;

    if (liveMatches.length > 0) {
      liveBlock.classList.remove("hidden");
      liveEl.innerHTML = renderMatchList(liveMatches, "No live matches.");
    } else {
      liveBlock.classList.add("hidden");
      liveEl.innerHTML = "";
    }

    recentEl.innerHTML = renderMatchList(
      recentResults,
      "No recent results to show.",
    );
    upcomingEl.innerHTML = renderMatchList(
      upcomingMatches,
      "No upcoming matches to show.",
    );
  } catch {
    if (generation !== loadGeneration) return;

    liveBlock.classList.add("hidden");
    liveEl.innerHTML = "";
    recentEl.innerHTML =
      '<p class="text-sm text-zinc-600 font-light">Could not load matches.</p>';
    upcomingEl.innerHTML = "";
  } finally {
    if (generation !== loadGeneration) return;

    liveEl.removeAttribute("aria-busy");
    recentEl.removeAttribute("aria-busy");
    upcomingEl.removeAttribute("aria-busy");
  }
}

function tryLoadWorldCupSection(): void {
  const section = document.getElementById("world-cup-section");
  if (section) {
    void loadWorldCupSection(section);
  }
}

/** Fetches fresh data on each About page visit (including view transitions). */
export function subscribeWorldCupSection(): void {
  if (!listenerAttached) {
    listenerAttached = true;
    document.addEventListener("astro:page-load", tryLoadWorldCupSection);
  }

  tryLoadWorldCupSection();
}
