---
id: 6
title: "Web performance - Investigando los problemas de Web Vitals"
description: "Optimice el rendimiento de su sitio web con guías rápidas y prácticas sobre Web Vitals."
pubDate: "03/12/2025"
image: "https://i.ibb.co/KcPkffsJ/investigating-issues.webp"
tags: "WEB PERFORMANCE,INVESTIGATING"
readingTime: "2"
languages: ["es", "en"]
blogLanguage: "es"
published: true
---

<br/>

<h1 style="color:white;font-size:32px;margin-top:20px;font-weight:600;width:100%;display:flex;justify-content:center">
Causas comunes de malos puntajes de wev vitals
</h1>

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Causas comunes de malo puntaje de LCP
</p>

<br/>

- Imagenes grandes y no optimizadas.
- Tiempos de respuesta del servidor lentos.
- Recursos que son render-blocking (CSS & JavaScript).
- Falta de almacenamiento en caché y uso de CDN

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Causas comunes de alto CLS
</p>

<br/>

- Imagenes sin atributos width/height
- Inyectar publicidad o banners de manera dinamica
- Carga lenta de fuentes causando FOIT (Flash of Invisible Text)

<br/>

<h1 style="color:white;font-size:32px;margin-top:80px;font-weight:600;width:100%;display:flex;justify-content:center">
What causes a poor INP Score and how to diagnose it
¿Qué causa un mal puntaje de INP y cómo diagnosticarlo?
</h1>

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
¿Qué es INP?
</p>

<br/>

El Interaction to Next Paint (INP) mide **cuanto tiempo le toma a una pagina responder ante la interacciones de los usuarios** (como clicks and taps).

Un INP lento hace que se sienta que el sitio no responde y afecta la experiencia del usuario.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
How to check Your INP score
¿Cómo medir el puntaje de INP?
</p>

<br/>

- 1️⃣ **Usar PageSpeed Insights** → Revisar en la sección de "INP".
- 2️⃣ **Chrome DevTools** → Abrir DevTools → Performance Tab → Revisar las tareas largas (>50ms)
- 3️⃣ **Usar la extensión de Web Vitals**.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Causas comunes de un alto INP
</p>

<br/>

- Pesadas ejecuciones de JavaScript que bloquean las interacciones
- Long-running event listeners
- Animaciones ineficientes y cambios en el DOM

<br/>

> _`Nota: Para mejorar el INP, se puede reducir el tiempo de ejecución de JavaScript, usar web workers y optimizar los event listeners.`_

<br/>

<h1 style="color:white;font-size:32px;margin-top:80px;font-weight:600;width:100%;display:flex;justify-content:center">
¿Cómo usar WebPageTest para encontrar cuellos de botella de rendimiento?
</h1>

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
¿Qué es WebPageTest?
</p>

<br/>

<a style="text-decoration:underline" href="https://www.webpagetest.org/" target="_blank"> **WebPageTest**</a> es una herramienta gratuita que provee información detallada del rendimiento de un sitio web, más alla de lo que Lighthouse ofrece.

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
¿Cómo correr un test en WebPageTest?
</p>

<br/>

- 1️⃣ Ir a la página de WebPageTest
- 2️⃣ Ingresar la URL de tu sitio web
- 3️⃣ Elegir la ubicación del test y el dispositivo a usar
- 4️⃣ Hacer click en **Start Test**

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
¿Qué debería ver?
</p>

<br/>

- ✅ **LCP (Largest Contentful Paint)** → Cual elemento es el que mas demora en cargar
- ✅ **CLS (Cumulative Layout Shift)** → Encontrar elementos que generan cambios
- ✅ **Long main thread tasks (more than 50ms)** → Identificar las ejecuciones de JavaScript lentas

<br/>

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Herramientas avanzadas
</p>

<br/>

- **Filmstrip View** → Puedes ver exactamente cuando y como carga el contenido
- **Waterfall Chart** → Para encontrar requests que son muy lentas

<br />

<p style="color:#e9552f;margin-top:24px;margin-bottom:10px;font-size:20px;font-weight:600">
Pensamientos finales
</p>

<br />

#### Sabiendo exactamente como revisar el codigo y que herramientas usar, son los primeros pasos para poder mejorar las metricas de rendimiento.

#### WebPageTest ayuda a diganosticar **problemas de rendimiento reales que les suceden a nuestros usuarios**. Solo tienes que correr un test y encontrar las maneras de optimizar tu sitio web!

<br />

## **Gracias por leer :)**
