import React, { useState, useMemo } from "react";

const getDateLabels = (date) => {
  const d = new Date(date);
  return {
    month: d.toLocaleString("en-US", { month: "short" }),
    day: d.getDate(),
    year: d.getFullYear(),
  };
};

const getTopics = (post) => {
  const t = post?.data?.tags;
  if (!t || typeof t !== "string") return [];
  return t
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};

const isPerfTopic = (topics) =>
  topics.some((s) => /web perf|performance|vitals|webpack|inp|lcp|cls|bundle|metric/i.test(s));

const isSystemsTopic = (topics) =>
  topics.some((s) => /engineer|architect|selenium|python|dealing|large|file|markdown/i.test(s));

const featureScore = (post) => {
  const topics = getTopics(post);
  if (isPerfTopic(topics) || post.data?.title?.toLowerCase().includes("web performance")) return 3;
  if (isSystemsTopic(topics)) return 2;
  if (String(post.data?.title || "").toLowerCase().includes("webpack")) return 2;
  return 1;
};

const TOPIC_FILTER = "all";
const topicLabels = { all: "All", webPerf: "Performance & quality", systems: "Systems & tooling" };

const Content = ({ posts, years }) => {
  const [activeTopic, setActiveTopic] = useState(TOPIC_FILTER);

  const flat = useMemo(() => {
    const all = [];
    for (const y of years) {
      for (const p of posts[y] || []) {
        all.push(p);
      }
    }
    return all.sort((a, b) => b.timestamp - a.timestamp);
  }, [posts, years]);

  const featured = useMemo(() => {
    if (!flat.length) return null;
    const w = flat.find(
      (p) => p.data?.title && String(p.data.title).toLowerCase().includes("webpack stats")
    );
    if (w) return w;
    return [...flat].sort((a, b) => featureScore(b) - featureScore(a))[0];
  }, [flat]);

  const featuredSlug = featured?.slug;

  const yearPostsFiltered = useMemo(() => {
    return years.map((year) => {
      const list = (posts[year] || []).filter((p) => {
        if (p.slug === featuredSlug) return false;
        if (activeTopic === "all") return true;
        const topics = getTopics(p);
        if (activeTopic === "webPerf") return isPerfTopic(topics);
        if (activeTopic === "systems") return isSystemsTopic(topics);
        return true;
      });
      return { year, list };
    });
  }, [posts, years, activeTopic, featuredSlug]);

  if (!flat.length) return null;

  return (
    <div className="mt-8 sm:mt-12 w-full min-w-0 max-w-4xl mx-auto">
      {featured && (
        <a
          href={`/blog/${featured.slug}/`}
          className="group block w-full min-w-0 text-left border border-[#e9552f]/[0.2] rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-900/20 hover:border-[#e9552f]/[0.35] transition duration-500 focus:outline-none focus:ring-2 focus:ring-[#e9552f]/[0.35]"
        >
          <p className="px-4 sm:px-6 pt-4 sm:pt-5 text-[0.65rem] uppercase tracking-[0.2em] text-[#e9552f]/[0.8]">
            Featured
          </p>
          <div className="px-4 sm:px-6 pb-6 sm:pb-7 pt-1">
            <h3 className="eurostile text-xl sm:text-2xl md:text-3xl text-zinc-100 font-semibold group-hover:text-white transition">
              {featured.data.title}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-zinc-500 font-light leading-relaxed line-clamp-2">
              {featured.data.description}
            </p>
            <p className="mt-4 text-sm text-zinc-500 group-hover:text-[#e9552f]/[0.9]">
              Read →
            </p>
          </div>
        </a>
      )}

      <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
        <p className="text-sm text-zinc-500 font-light"><span className="text-[#e9552f]/[0.75]">·</span> Read by focus</p>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by topic">
          {["all", "webPerf", "systems"].map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={activeTopic === k}
              onClick={() => setActiveTopic(k)}
              className={`px-3 py-1.5 text-xs sm:text-sm rounded-full border transition ${
                activeTopic === k
                  ? "border-zinc-500 text-zinc-200 bg-zinc-800/40"
                  : "border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
              }`}
            >
              {topicLabels[k] || k}
            </button>
          ))}
        </div>
      </div>

      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#e9552f]/[0.7] mt-10 mb-2">
        By year
      </p>
      {yearPostsFiltered.map(({ year, list }) => {
        if (!list.length) return null;
        return (
          <div key={year} className="pt-2 pb-2 border-b border-zinc-800/40 first:border-t-0">
            <h2 className="eurostile text-lg sm:text-xl text-zinc-100 font-medium mt-8 mb-4 first:mt-0 border-b border-b-[#e9552f]/[0.22] pb-2 w-fit">
              {year}
            </h2>
            <ul className="space-y-0" role="list">
              {list.map((post) => {
                const { month, day } = getDateLabels(post.data.pubDate);
                return (
                  <li
                    key={`${post.slug}-${post.timestamp}`}
                    className="list-none -mx-1 rounded-lg"
                  >
                    <a
                      href={`/blog/${post.slug}/`}
                      className="group block py-4 sm:py-5 px-2 -mx-2 sm:px-3 rounded-lg hover:bg-zinc-900/30 transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 gap-1.5 min-w-0">
                        <time
                          className="text-xs sm:text-sm text-zinc-600 sm:w-28 sm:shrink-0 tabular-nums"
                          dateTime={String(post.data.pubDate)}
                        >
                          {month} {day}
                        </time>
                        <div className="min-w-0 flex-1">
                          <h3 className="eurostile text-base sm:text-lg text-zinc-200 group-hover:text-zinc-100 font-medium leading-snug">
                            {post.data.title}
                          </h3>
                          {post.data.description ? (
                            <p className="text-sm text-zinc-500 font-light line-clamp-2 mt-1.5 sm:line-clamp-1">
                              {post.data.description}
                            </p>
                          ) : null}
                          <div className="flex items-center flex-wrap gap-x-3 gap-y-0.5 mt-2 text-xs text-zinc-600">
                            {getTopics(post).slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="text-zinc-500"
                              >
                                {tag}
                              </span>
                            ))}
                            {post.data.readingTime ? (
                              <span>~{post.data.readingTime} min</span>
                            ) : null}
                            {post.data.languages?.includes("en") ? (
                              <span className="text-zinc-500">EN</span>
                            ) : null}
                            {post.data.languages?.includes("es") ? (
                              <span className="text-zinc-500">ES</span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Content;
