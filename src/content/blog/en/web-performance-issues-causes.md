---
id: 6
title: "Web performance - Investigating Web Vitals issues"
description: "Optimize your website’s performance with quick, actionable guides on Web Vitals."
pubDate: "03/12/2025"
image: "https://i.ibb.co/KcPkffsJ/investigating-issues.webp"
tags: "WEB PERFORMANCE,INVESTIGATING"
mediumBlog: "https://medium.com/@fran.diazpaccot/web-performance-investigating-web-vitals-issues-28cc78d18694"
readingTime: "2"
languages: ["es", "en"]
blogLanguage: "en"
published: true
---

<br/>

<h1 style="color:white;font-size:32px;margin-top:20px;font-weight:600;width:100%;display:flex;justify-content:center">
Common causes of web vitals bad scores
</h1>

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Common causes of low LCP
</p>

<br/>

- Large, unoptimized images
- Slow server response times
- Render-blocking resources (CSS & JavaScript)
- Lack of caching and CDN usage

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Common causes of high CLS
</p>

<br/>

- Images without width/height attributes
- Dynamically injected ads, banners, or embeds
- Slow-loading fonts causing "FOIT" (Flash of Invisible Text)

<br/>

<h1 style="color:white;font-size:32px;margin-top:80px;font-weight:600;width:100%;display:flex;justify-content:center">
What causes a poor INP Score and how to diagnose it
</h1>

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
What is INP?
</p>

<br/>

Interaction to Next Paint (INP) measures **how long it takes for the page to respond to user interactions** (like clicks and taps).

A slow INP makes a site feel unresponsive and affects user experience.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
How to check Your INP score
</p>

<br/>

- 1️⃣ **Use PageSpeed Insights** → Check the "INP" section.
- 2️⃣ **Chrome DevTools** → Open DevTools → Performance Tab → Look for long tasks (>50ms)
- 3️⃣ **Use the Web Vitals extension**.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Common causes of high INP
</p>

<br/>

- Heavy JavaScript execution blocking interactions
- Long-running event listeners
- Inefficient animations and DOM updates

<br/>

> _`Note: To improve INP, reduce JavaScript execution time, use web workers, and optimize event listeners.`_

<br/>

<h1 style="color:white;font-size:32px;margin-top:80px;font-weight:600;width:100%;display:flex;justify-content:center">
How to use WebPageTest to find performance bottlenecks
</h1>

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
What is WebPageTest?
</p>

<br/>

<a style="text-decoration:underline" href="https://www.webpagetest.org/" target="_blank"> **WebPageTest**</a> is a free tool that provides detailed performance insights beyond what Lighthouse offers.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
How to run a test in WebPageTest
</p>

<br/>

- 1️⃣ Go to WebPageTest
- 2️⃣ Enter your website URL
- 3️⃣ Choose a test location & device
- 4️⃣ Click **Start Test**

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
What to look for
</p>

<br/>

- ✅ **LCP (Largest Contentful Paint)** → See which element is delaying load
- ✅ **CLS (Cumulative Layout Shift)** → Find elements causing shifts
- ✅ **Long main thread tasks (more than 50ms)** → Identify slow JavaScript execution

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Advanced Features
</p>

<br/>

- **Filmstrip View** → See exactly when content loads
- **Waterfall Chart** → Find slow network requests

<br />

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Final thoughts
</p>

<br />

#### Knowing exactly how to debug code and which tools to use is the first step to improving our performance metrics.

#### WebPageTest helps diagnose **real-world performance issues.** Run a test and find ways to optimize your site!

<br />

### Stay tuned for more!

<br />

## **Thanks for reading :)**
