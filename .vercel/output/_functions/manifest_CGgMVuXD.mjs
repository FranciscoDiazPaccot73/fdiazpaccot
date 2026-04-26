import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_m0A5Zg95.mjs';
import 'es-module-lexer';
import { g as decodeKey } from './chunks/astro/server_B5Xhe1Ss.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || undefined,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : undefined,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/fran/Projects/fdiazpaccot/","cacheDir":"file:///Users/fran/Projects/fdiazpaccot/node_modules/.astro/","outDir":"file:///Users/fran/Projects/fdiazpaccot/dist/","srcDir":"file:///Users/fran/Projects/fdiazpaccot/src/","publicDir":"file:///Users/fran/Projects/fdiazpaccot/public/","buildClientDir":"file:///Users/fran/Projects/fdiazpaccot/dist/client/","buildServerDir":"file:///Users/fran/Projects/fdiazpaccot/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"about/gallery/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about/gallery","isIndex":false,"type":"page","pattern":"^\\/about\\/gallery\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"gallery","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/gallery.astro","pathname":"/about/gallery","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"about/pictures","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about/pictures","isIndex":false,"type":"endpoint","pattern":"^\\/about\\/pictures\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"pictures","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/pictures.js","pathname":"/about/pictures","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":true,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/index.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"cv/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cv","isIndex":false,"type":"page","pattern":"^\\/cv\\/?$","segments":[[{"content":"cv","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cv.astro","pathname":"/cv","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"portfolio/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/portfolio","isIndex":false,"type":"page","pattern":"^\\/portfolio\\/?$","segments":[[{"content":"portfolio","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/portfolio.astro","pathname":"/portfolio","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"resume/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/resume","isIndex":false,"type":"page","pattern":"^\\/resume\\/?$","segments":[[{"content":"resume","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/resume.astro","pathname":"/resume","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.ts","pathname":"/api/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/submit","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/submit\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"submit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/submit.ts","pathname":"/api/submit","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/fran/Projects/fdiazpaccot/src/components/sections/BlogHome2.astro",{"propagation":"in-tree","containsHead":false}],["/Users/fran/Projects/fdiazpaccot/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/fran/Projects/fdiazpaccot/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/fran/Projects/fdiazpaccot/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/fran/Projects/fdiazpaccot/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/fran/Projects/fdiazpaccot/src/pages/about/gallery.astro",{"propagation":"none","containsHead":true}],["/Users/fran/Projects/fdiazpaccot/src/pages/about/index.astro",{"propagation":"none","containsHead":true}],["/Users/fran/Projects/fdiazpaccot/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/fran/Projects/fdiazpaccot/src/pages/cv.astro",{"propagation":"none","containsHead":true}],["/Users/fran/Projects/fdiazpaccot/src/pages/portfolio.astro",{"propagation":"none","containsHead":true}],["/Users/fran/Projects/fdiazpaccot/src/pages/resume.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/about/pictures@_@js":"pages/about/pictures.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/api/contact@_@ts":"pages/api/contact.astro.mjs","\u0000@astro-page:src/pages/api/submit@_@ts":"pages/api/submit.astro.mjs","\u0000@astro-page:src/pages/cv@_@astro":"pages/cv.astro.mjs","\u0000@astro-page:src/pages/resume@_@astro":"pages/resume.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/about/gallery@_@astro":"pages/about/gallery.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"pages/blog/_---slug_.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/portfolio@_@astro":"pages/portfolio.astro.mjs","\u0000@astro-page:src/pages/about/index@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","/Users/fran/Projects/fdiazpaccot/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Bn51Hi0R.mjs","/Users/fran/Projects/fdiazpaccot/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/fran/Projects/fdiazpaccot/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_C4FsPUxx.mjs","\u0000@astrojs-manifest":"manifest_CGgMVuXD.mjs","/Users/fran/Projects/fdiazpaccot/src/components/blog/Content":"_astro/Content.Dnklu8Ie.js","/Users/fran/Projects/fdiazpaccot/src/components/PerformanceMetrics":"_astro/PerformanceMetrics.B-sPuwI7.js","@astrojs/react/client.js":"_astro/client.CNvG0CfG.js","/Users/fran/Projects/fdiazpaccot/src/pages/404.astro?astro&type=script&index=0&lang.ts":"_astro/404.astro_astro_type_script_index_0_lang.DeUGP_mn.js","/Users/fran/Projects/fdiazpaccot/src/pages/about/gallery.astro?astro&type=script&index=0&lang.ts":"_astro/gallery.astro_astro_type_script_index_0_lang.ah7WMyI6.js","/Users/fran/Projects/fdiazpaccot/src/pages/contact.astro?astro&type=script&index=0&lang.ts":"_astro/contact.astro_astro_type_script_index_0_lang.CyrWsdvT.js","/Users/fran/Projects/fdiazpaccot/src/components/ImagePreview.astro?astro&type=script&index=0&lang.ts":"_astro/ImagePreview.astro_astro_type_script_index_0_lang.Bl0b8f1n.js","/Users/fran/Projects/fdiazpaccot/src/components/LanguageSelect.astro?astro&type=script&index=0&lang.ts":"_astro/LanguageSelect.astro_astro_type_script_index_0_lang.0gOJUMkN.js","/Users/fran/Projects/fdiazpaccot/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.rasoniT7.js","/Users/fran/Projects/fdiazpaccot/node_modules/not-found-pages/dist/index.js":"_astro/index.D8bVoXkL.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/fran/Projects/fdiazpaccot/src/pages/about/gallery.astro?astro&type=script&index=0&lang.ts","window.addEventListener(\"scroll\",()=>{const o=window.scrollY/(document.body.offsetHeight-window.innerHeight);document.body.style.setProperty(\"--scroll\",o.toString())});"],["/Users/fran/Projects/fdiazpaccot/src/pages/contact.astro?astro&type=script&index=0&lang.ts","window.addEventListener(\"scroll\",()=>{const n=document.body.offsetHeight-window.innerHeight;n>0&&document.body.style.setProperty(\"--scroll\",(window.scrollY/n).toString())});const t=document.getElementById(\"contact-form\"),e=document.getElementById(\"submit-button\"),s=document.getElementById(\"toast-default\"),r=document.getElementById(\"close-toast\");r?.addEventListener(\"click\",()=>{s?.classList.remove(\"fixed\"),s?.classList.add(\"hidden\")});const m=\"/api/contact\";async function u(n){if(n.preventDefault(),!t.checkValidity()){t.reportValidity();return}const i=t.firstName.value.trim(),a=t.lastName.value.trim(),d=[i,a].filter(Boolean).join(\" \")||\"—\",c=t.email.value.trim(),l=t.message.value;e.disabled=!0,e.textContent=\"Sending…\";try{const o=await fetch(m,{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({email:c,name:d,message:l})});if(!o.ok)throw new Error(String(o.status));t.reset(),s?.classList.remove(\"hidden\"),s?.classList.add(\"fixed\"),setTimeout(()=>{s?.classList.remove(\"fixed\"),s?.classList.add(\"hidden\")},5e3),e.textContent=\"Send message\"}catch{e.textContent=\"Try again\",setTimeout(()=>{e.textContent=\"Send message\"},4e3)}finally{e.disabled=!1}}t.addEventListener(\"submit\",u);"],["/Users/fran/Projects/fdiazpaccot/src/components/ImagePreview.astro?astro&type=script&index=0&lang.ts","const s=()=>{document.querySelectorAll(\".preview-image\").forEach(e=>{e.addEventListener(\"click\",()=>d(e))})},d=a=>{const e=document.createElement(\"div\");e.className=\"fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[1001] animate-fade-in\";const t=document.createElement(\"img\");t.src=a.src,t.alt=a.alt||\"Image preview\",t.className=\"max-w-[90%] max-h-[90%] shadow-lg cursor-zoom-out scale-90 animate-scale-in\",e.appendChild(t);const n=()=>{e.classList.add(\"animate-fade-out\"),setTimeout(()=>document.body.removeChild(e),300),document.removeEventListener(\"keydown\",c)},c=o=>{o.key===\"Escape\"&&n()};e.onclick=n,document.addEventListener(\"keydown\",c),document.body.appendChild(e)};s();"],["/Users/fran/Projects/fdiazpaccot/src/components/LanguageSelect.astro?astro&type=script&index=0&lang.ts","const t=document.getElementById(\"languages\");t&&t.addEventListener(\"change\",a=>{const{value:o}=a.target,{location:n}=t.dataset;if(o===\"es\"){const e=n?.replaceAll(\"/en\",\"\")||n;window.location.assign(e)}if(o===\"en\"){const e=n?.replaceAll(\"/blog\",\"/blog/en\")||n;window.location.assign(e)}});"]],"assets":["/_astro/gallery.CrT3mg9R.css","/_astro/portfolio.D8HdHeV4.css","/android-chrome-192x192.png","/android-chrome-512x512.png","/apple-touch-icon.png","/astro.png","/banner-linkedin.png","/blog-portrait.webp","/deel-logo.webp","/dev-to.png","/favicon-16x16.png","/favicon-32x32.png","/lighthouse.webp","/logo-small.webp","/logo-vercel.svg","/me-hq.jpg","/me.jpg","/me.webp","/medium.png","/meli-logo.png","/robots.txt","/serfe-logo2.png","/site.webmanifest","/spain.svg","/strike-logo.ico","/svelte.png","/turnero.png","/usa.png","/vercel.png","/_astro/404.astro_astro_type_script_index_0_lang.DeUGP_mn.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.rasoniT7.js","/_astro/Content.Dnklu8Ie.js","/_astro/PerformanceMetrics.B-sPuwI7.js","/_astro/client.CNvG0CfG.js","/_astro/index.D8bVoXkL.js","/_astro/index.P85FK12k.js","/docs/FranciscoDiazPaccot-cv.pdf","/docs/FranciscoDiazPaccot-resume.pdf","/docs/blabi-desktop.html","/docs/blabi-mobile.html","/docs/dossiers-desktop.html","/docs/dossiers-mobile.html","/docs/markdown-desktop.html","/docs/markdown-mobile.html","/docs/qpv-desktop.html","/docs/qpv-mobile.html","/fonts/eurostile.woff2","/404.html","/about/gallery/index.html","/about/pictures","/about/index.html","/blog/index.html","/contact/index.html","/cv/index.html","/portfolio/index.html","/resume/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"a9m7KtdQnilQCPXpH3wDkm6SktKaoNyAD9z0ZgM3lCU="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
