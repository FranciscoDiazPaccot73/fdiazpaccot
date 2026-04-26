import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_D5xx169t.mjs';
import { manifest } from './manifest_CGgMVuXD.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about/gallery.astro.mjs');
const _page3 = () => import('./pages/about/pictures.astro.mjs');
const _page4 = () => import('./pages/about.astro.mjs');
const _page5 = () => import('./pages/api/contact.astro.mjs');
const _page6 = () => import('./pages/api/submit.astro.mjs');
const _page7 = () => import('./pages/blog.astro.mjs');
const _page8 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page9 = () => import('./pages/contact.astro.mjs');
const _page10 = () => import('./pages/cv.astro.mjs');
const _page11 = () => import('./pages/portfolio.astro.mjs');
const _page12 = () => import('./pages/resume.astro.mjs');
const _page13 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about/gallery.astro", _page2],
    ["src/pages/about/pictures.js", _page3],
    ["src/pages/about/index.astro", _page4],
    ["src/pages/api/contact.ts", _page5],
    ["src/pages/api/submit.ts", _page6],
    ["src/pages/blog/index.astro", _page7],
    ["src/pages/blog/[...slug].astro", _page8],
    ["src/pages/contact.astro", _page9],
    ["src/pages/cv.astro", _page10],
    ["src/pages/portfolio.astro", _page11],
    ["src/pages/resume.astro", _page12],
    ["src/pages/index.astro", _page13]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "f701dedd-c50e-4c79-91c3-97e08be6790d",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
