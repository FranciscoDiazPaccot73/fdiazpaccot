---
id: 5
title: "Web performance - Introducción e información básica"
description: "Optimice el rendimiento de su sitio web con guías rápidas y prácticas sobre Web Vitals."
pubDate: "03/04/2025"
image: "https://i.ibb.co/XxsJzvQB/core-web-vitals.webp"
tags: "WEB PERFORMANCE,FUNDAMENTALS"
readingTime: "3"
languages: ["es", "en"]
blogLanguage: "es"
published: true
---

<br/>

<h1 style="color:white;font-size:32px;margin-top:20px;font-weight:600;width:100%;display:flex;justify-content:center">
¿Qué es LCP y por qué es tan importante?
</h1>

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
¿Qué es LCP?
</p>

<br/>

Largest Contentful Paint (LCP) mide cuanto tiempo le toma cargar completamente al mayor elemento visible en pantalla (usualmente una imagen o un bloque de texto). Es parte de las **Core Web Vital**, y afecta la **experiencia del usuario** y el **SEO ranking**.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
¿Por qué el LCP importa?
</p>

<br/>

Tener un mal LCP hace que el sitio web se sienta lento. Adicionalmente, los sitios webs que cargan rapido suelen mejorar sus conversiones y engagement.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
¿Cómo medir el LCP?
</p>

<br/>

Puedes usar herramientas como:

- ✅ Chrome DevTools (la tab de Performance)
- ✅ <a style="text-decoration:underline" href="https://pagespeed.web.dev/" target="_blank">
  PageSpeed Insights</a>
- ✅ <a style="text-decoration:underline" href="https://chromewebstore.google.com/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=es" target="_blank">
  Lighthouse</a>
- ✅ <a style="text-decoration:underline" href="https://www.webpagetest.org/" target="_blank">
  WebPageTest</a>

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
¿Qué es un buen puntaje de LCP? (basado en las recomendaciones de Google)
</p>

<br/>

<img src="https://i.ibb.co/JwpXwtsT/lcp-score.webp" alt="LCP scores" />

<br/>

<h1 style="color:white;font-size:32px;margin-top:80px;font-weight:600;width:100%;display:flex;justify-content:center">
¿Cómo el (Cumulative Layout Shifts) CLS afecta la experiencia del usuario y SEO?
</h1>

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
¿Qué es el CLS?
</p>

<br/>

El Cumulative Layout Shift (CLS) mide como los elementos de una pagina web se **mueven de manera inesperada** mientras el sitio carga. Esto afecta tanto la **experiencia del usuario** como el **SEO ranking**.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
¿Por qué el CLS es importante?
</p>

<br/>

- Un alto CLS hacen que la pagina web se sienta inestable.
- Cambios inesperados suelen frustrar a los usuarios y causan missclicks.
- Google recomienda tener puntajes de CLS menores a 0.1.
- Un mal puntaje de CLS podria afectar el SEO ranking del sitio web.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
¿Cómo medir el CLS?
</p>

<br/>

Pudes usar:

- ✅ PageSpeed Insights (Dentro de "Diagnosticos")
- ✅ Chrome DevTools (Tab de rendimiento → sección de experiencia)

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Causas comunes de un alto CLS
</p>

<br/>

1. Imagenes sin dimensionar.
2. Anuncios cargando dinamicamente.
3. Carga de fonts lenta.
4. Hacer lazy-load de elementos moviento el layout.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
¿Cómo arreglar el CLS?
</p>

<br/>

- ✅ Fijar la dimension de imagenes y videos (`width` & `height`)
- ✅ Reservar espacio para anuncios
- ✅ Usar `font-display: swap;` para un render de fonts mas rápido

<br/>

<h1 style="color:white;font-size:32px;margin-top:80px;font-weight:600;width:100%;display:flex;justify-content:center">
Guia rápida para medir las Web Vitals usando Chrome DevTools
</h1>

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
¿Por qué usar Chrome DevTools?
</p>

<br/>

Chrome DevTools es una herramienta integrada que permite medir y depurar Web Vitals en tiempo real (no se necesita un software extra para hacerlo).

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
¿Como revisar las Web Vitals en Chrome DevTools?
</p>

<br/>

- 1️⃣ Abrir DevTools → Click secundario en la página → Click en "inspeccionar".
- 2️⃣ Ir a la tab de rendimiento (performance).
- 3️⃣ Click en "Iniciar perfilado y recargar la página".
- 4️⃣ Ver las métricas de las Web Vitals(LCP, CLS, INP, FID).

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Interpretar los resultados
</p>

<br/>

- ✅ LCP: Elementos grandes deberian cargar en menos de 2.5s.
- ✅ CLS: Los desplazamientos del layout deberian ser minimos (< 0.1).
- ✅ FID/INP: Las interacciones deben ser reactivas.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Otras herramientas utiles dentro de las DevTools
</p>

<br/>

- Lighthouse → Corre un reporte automatico de las Web Vitals.
- Elements → Ayuda a encontrar errores en el desplazamiento del layout.
- Network → Muestra recursos que cargan de manera lenta.

<br/>

<h1 style="color:white;font-size:32px;margin-top:80px;font-weight:600;width:100%;display:flex;justify-content:center">
¿Cómo revisar las Web Vitals usando Google Search Console?
</h1>

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
¿Por qué usar Google Search Console (GSC)?
</p>

<br/>

Google Search Console (GSC) rastrea las Wev Vitals de usuarios reales basado en información obtenida de usuarios que usan Chrome, ayudando al diagnostico de problemas de rendimiento en todo el sitio web.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
¿Cómo encontrar Web Vitals en GSC?
</p>

<br/>

- 1️⃣ Ir a Google Search Console.
- 2️⃣ Navegar a "Core Web Vitals" dentro de "Experiencia".
- 3️⃣ Revisar el rendimiento de dispositivos de escritorio y dispositivos móviles.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Entendiendo la información.
</p>

<br/>

- 🟢 Verde: Las Web Vitals son correctas. ✅
- 🟡 Yellow: Necesitan mejoras. ⚠️
- 🔴 Red: El rendimiento es malo, se necesitan hacer arreglos. ❌

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Problemas comunes en GSC
</p>

<br/>

- "Problemas de LCP: mayores a 2.5s" → Optimizar imagenes, fonts y tiempoes de respuesta del servidor.
- "Problemas de CLS: mas de 0.1" → Arreglar movimientos del layout (ajustar dimensiones para imagenes, reservar espacio para anuncios).
- "INP/FID malo" → Recudir el tiempo de blockeo de JavaScript.

<br />

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Pensamientos finales.
</p>

<br />

#### Si tu LCP es lento, **optimizar imagenes, usar estrategias de cache y reducir recursos que bloqueen el renderizado**

#### Un **bajo puntaje de CLS** hace que tu sitio se sienta mas profesional y lo hace mas **SEO-friendly.** Revisa tus puntajes de CLS y empezá a optimizarlo hoy!

#### Chrome DevTools es una herramienta **esencial** para la depuración de errores de rendimiento. Prueba corriendo un test y revisando el puntaje que obtiene tu sitio web!

#### GSC es una gran herramienta para monitorear el rendimiento de usuarios reales a lo largo del tiempo. Revisa tus reportes y empieza a optimizar los puntajes!

<br />

> _`Nota: Si tienes algo de conocimiento de web performance, en este punto tal vez estes pensando: "Esta hablando de web vitals, pero por que no ha dicho nada de INP?". Bueno, para ese caso tengo un blog entero dedicado a ese tema. Te invito a revisarlo aqui: :)`_ <a style="text-decoration:underline" href="https://www.franciscodiazpaccot.dev/blog/interaction-to-next-paint/" target="_blank"> **¿Qué es INP?**</a>

<br />

### Permanezca atento para saber más.

<br />

## **Gracias por leer :)**
