---
id: 5
title: "Web performance - Introduction and fundamentals."
description: "Optimize your website’s performance with quick, actionable guides on Web Vitals."
pubDate: "03/04/2025"
image: "https://i.ibb.co/XxsJzvQB/core-web-vitals.webp"
tags: "WEB PERFORMANCE,FUNDAMENTALS"
mediumBlog: "https://medium.com/@fran.diazpaccot/web-performance-introduction-and-fundamentals-8eab134df1da"
readingTime: "3"
languages: ["es", "en"]
blogLanguage: "en"
published: true
---

<br/>

<h1 style="color:white;font-size:32px;margin-top:20px;font-weight:600;width:100%;display:flex;justify-content:center">
What is LCP and why is it important?
</h1>

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
What is LCP?
</p>

<br/>

Largest Contentful Paint (LCP) measures how long it takes for the largest visible element on a webpage (usually an image or text block) to fully load. It’s a **Core Web Vital** that affects **user experience** and **SEO rankings**.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Why does LCP matter?
</p>

<br/>

Having slow LCP makes a website feel slow. Additionally, fast-loading pages improve conversions and engagement.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
How to measure LCP
</p>

<br/>

You caan use tools like:

- ✅ Chrome DevTools (Performance tab)
- ✅ <a style="text-decoration:underline" href="https://pagespeed.web.dev/" target="_blank">
  PageSpeed Insights</a>
- ✅ <a style="text-decoration:underline" href="https://chromewebstore.google.com/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=es" target="_blank">
  Lighthouse</a>
- ✅ <a style="text-decoration:underline" href="https://www.webpagetest.org/" target="_blank">
  WebPageTest</a>

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
What’s a good LCP score? (based in Google recommendations)
</p>

<br/>

<img src="https://i.ibb.co/JwpXwtsT/lcp-score.webp" alt="LCP scores" />

<br/>

<h1 style="color:white;font-size:32px;margin-top:80px;font-weight:600;width:100%;display:flex;justify-content:center">
How CLS affects User Experience and SEO
</h1>

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
What is CLS?
</p>

<br/>

Cumulative Layout Shift (CLS) measures how much a webpage’s elements **move unexpectedly** while loading. It affects user experience and **SEO rankings.**

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Why is CLS important?
</p>

<br/>

- A high CLS makes pages feel unstable.
- Unexpected shifts frustrate users and cause misclicks.
- Google recommends a CLS score below 0.1.
- Bad CLS could affect SEO rankings.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
How to measure CLS
</p>

<br/>

Use:

- ✅ PageSpeed Insights (Under "Diagnostics")
- ✅ Chrome DevTools (Performance tab → Experience section)

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Common causes of high CLS
</p>

<br/>

1. Images without dimensions
2. Ads loading dynamically
3. Slow font loading
4. Lazy-loaded elements shifting the layout

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
How to Fix CLS
</p>

<br/>

- ✅ Set image & video dimensions (`width` & `height`)
- ✅ Reserve space for ads & embeds
- ✅ Use `font-display: swap;` for faster font rendering

<br/>

<h1 style="color:white;font-size:32px;margin-top:80px;font-weight:600;width:100%;display:flex;justify-content:center">
A quick guide to measuring Web Vitals in Chrome DevTools
</h1>

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Why use Chrome DevTools?
</p>

<br/>

Chrome DevTools is a built-in tool that lets you measure and debug Web Vitals in real time (no need for extra software).

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
How to check Web Vitals in Chrome DevTools
</p>

<br/>

- 1️⃣ Open DevTools → Right-click on a page → Click "Inspect".
- 2️⃣ Go to the Performance Tab.
- 3️⃣ Click "Start Profiling and Reload Page".
- 4️⃣ Look for Web Vitals Metrics (LCP, CLS, INP, FID).

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Interpreting results
</p>

<br/>

- ✅ LCP: Large elements should load in under 2.5s.
- ✅ CLS: Layout shifts should be minimal (< 0.1).
- ✅ FID/INP: Interactions should be responsive.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Other useful DevTools tabs
</p>

<br/>

- Lighthouse → Runs an automated Web Vitals report.
- Elements → Helps find layout shift issues.
- Network → Shows slow-loading resources.

<br/>

<h1 style="color:white;font-size:32px;margin-top:80px;font-weight:600;width:100%;display:flex;justify-content:center">
How to check Web Vitals in Google Search Console
</h1>

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Why use Google Search Console (GSC)?
</p>

<br/>

Google Search Console (GSC) tracks real user Web Vitals data from Chrome users, helping you diagnose site-wide performance issues.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
How to find Web Vitals in GSC
</p>

<br/>

- 1️⃣ Go to Google Search Console.
- 2️⃣ Navigate to "Core Web Vitals" under "Experience".
- 3️⃣ Check Your Mobile & Desktop Performance.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Understanding the data
</p>

<br/>

- 🟢 Green: Web Vitals are good. ✅
- 🟡 Yellow: Needs improvement. ⚠️
- 🔴 Red: Poor performance, fix required. ❌

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Common issues in GSC
</p>

<br/>

- "LCP issue: longer than 2.5s" → Optimize images, fonts, and server response time.
- "CLS issue: more than 0.1" → Fix layout shifts (set dimensions for images, reserve space for ads).
- "Poor INP/FID" → Reduce JavaScript blocking time.

<br />

> _`Note: If you have any knowledge of web performance, at this point you may be thinking “he's talking about web vitals, but what about INP?”. Well, for that I have a complete dedicated blog that you can check here :)`_ <a style="text-decoration:underline" href="https://www.franciscodiazpaccot.dev/blog/en/interaction-to-next-paint/" target="_blank"> **What is INP?**</a>

<br />

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Final thoughts
</p>

<br />

#### If your LCP is slow, **optimize images, use caching, and reduce render-blocking resources.**

#### A **low CLS score** makes your site feel more professional and **SEO-friendly.** Check your CLS score and start optimizing today!

#### Chrome DevTools is an **essential** tool for debugging performance. Try running a test and see how your site scores!

#### GSC is great for monitoring real user performance over time. Check your report and start improving your scores!

<br />

### Stay tuned for more!

<br />

## **Thanks for reading :)**
