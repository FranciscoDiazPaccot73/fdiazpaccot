---
title: "INP ¡¿Qué es eso?!"
description: "A menos de 1 año de la fecha de lanzamiento (Marzo de 2024) del Interaction to Next Paint (INP), la nueva métrica de las Core Web Vitals de Google, es importante que podamos entender cómo funcionara, cómo medir nuestros sitios web y cómo poder obtener buenos resultados en esta métrica."
pubDate: "05/30/2023"
image: "/INP.png"
tags: "PERFORMANCE,WEB VITALS"
readingTime: "8"
---

A menos de 1 año de la fecha de lanzamiento (Marzo de 2024) del Interaction to Next Paint (INP), la nueva métrica de las Core Web Vitals de Google, es importante que podamos entender cómo funcionara, cómo medir nuestros sitios web y cómo poder obtener buenos resultados en esta métrica.

Mediante las Core Web Vitals, como ya sabemos, lo que se mide actualmente son las tres métricas principales en un sitio web: la carga, con el **Largest Contentful Paint (LCP)**; la interactividad, con el **First Input Delay (FID)**, y la estabilidad visual, con el **Cumulative Layout Shift (CLS)**. Dado esto, ahora sabemos que el INP llega para reemplazar al FID, ya que también es una métrica de interactividad.

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
1- Si ya existe una métrica de interactividad, ¿por qué cambiarla?
</p>

Esto tiene una respuesta más simple de lo que podríamos imaginar. Google reporta que, según su información de uso de Chrome, el 90% del tiempo que un usuario gasta en un sitio web, es luego de su carga inicial.
Esto nos destaca lo importante que es medir la interactividad de un sitio web, a través de todo su ciclo de vida.
Siendo que el INP considera todas las interacciones en un sitio web, el FID solo tiene en cuenta la primera interacción, no el tiempo que se demora en correr los controladores de eventos o el tiempo de demora en mostrar el siguiente frame.

<br/>

Si bien hay interacciones que demoran más que otras, es muy importante que para las más complejas demos información rápida de que algo está sucediendo.
En resumen, una buena interactividad significa que nuestro sitio web responde de manera rápida a una interacción del usuario. Por lo que, el objetivo del INP es asegurar que el tiempo sea el menor posible entre que un usuario interactúa con un elemento de nuestro sitio web hasta que el próximo frame (o cuadro) sea pintado en pantalla.

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
2- ¿Qué es el INP?
</p>

Por definición, es la métrica que mide la interactividad general de las interacciones de usuario, observando la latencia de todos los clicks, taps e interacciones del teclado que ocurren durante todo el ciclo de vida de la visita de los usuarios a una página web. Por lo que el valor final del INP es el mayor observado, ignorando los valores atípicos.
Para su cálculo, en páginas web que tienen pocas interacciones se toma el peor tiempo observado, es decir, el percentil 100. En cambio, para las páginas web que tienen gran cantidad de interacciones, se toma el percentil 99 o 98.

<br/>

`Nota: Se toma como interacción, al grupo de controladores de eventos que se ejecutan durante el mismo gesto lógico de un usuario.
La latencia de una interacción, es la duración más larga de un grupo de controladores de evento que acciona la interacción, desde el momento que el usuario comienza la misma hasta el momento en que el próximo frame es presentado con alguna información visual.`

<br/>

![The life of an interaction.](/blog/inp.png)

<br/>

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
3- ¿Cómo sé si el INP de mi página web es bueno?
</p>

Para saber si el INP es bueno, se recomienda mirar el percentil 75 de los datos de usuarios obtenidos en el campo (no es recomendable usar datos de laboratorio). En base a estos datos podríamos decir que el INP es bueno, si está por debajo de los 200ms. Si está por encima de los 200ms pero por debajo de los 500ms, nuestro INP necesita mejoras. Y por último, si está por encima de los 500ms, nuestro INP es malo.

<br/>

Ahora que sabemos cuales son buenas y malas métricas, seguramente nos viene otra pregunta: ¿Cómo se calculan estos valores?. Para llegar a esta respuesta, es necesario entender que es lo que se mide y que no. Como mencionamos anteriormente, las interacciones que se observan para medir son: click con el mouse, hacer “tap” en un dispositivo con pantalla táctil y presionar alguna tecla, ya sea física o teclado de la pantalla. Cualquier tipo de hover o scroll, no afecta al cálculo del INP.

<br/>

Cada interacción, contiene múltiples eventos, por ejemplo, al presionar una tecla tenemos los eventos keydown, keypress y keyup. El evento con mayor duración durante la interacción, es el que se toma como la latencia de la interacción.
Dado que el INP se calcula cuando el usuario abandona el sitio web, podemos decir que da como resultado un valor único que representa la capacidad general de respuesta del sitio web a través de todo su ciclo de vida.

<br/>

<a href="/blog/multiple-interactions.png" alt="A depiction of an interaction with multiple event handlers." target="_blank">
<img src="/blog/multiple-interactions.png" alt="A depiction of an interaction with multiple event handlers." />
</a>

<br/>

Es posible que el reporte no devuelva valor para el INP, si bien esto puede pasar por muchas razones, las principales pueden ser que la página web haya cargado pero el usuario haya interactuado con algún gesto que no forma parte de los que miden el INP, que nunca haya efectuado interacción alguna o si se accede a la web mediante algún bot.

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
4- ¿Cómo puedo optimizar mis interacciones?
</p>

Una vez que tengamos información de campo, vamos a querer obtener información de laboratorio para poder empezar a analizar más en detalle y poder optimizar las interacciones que están siendo lentas. Para poder detectar interacciones lentas en el laboratorio, podemos leer el siguiente articulo: **[https://web.dev/diagnose-slow-interactions-in-the-lab/](https://web.dev/diagnose-slow-interactions-in-the-lab/)**

<br/>

Una vez que ya identificamos las interacciones y las reproducimos en el laboratorio, ahora podemos analizar cómo optimizarlas. Para esto, es importante tener en cuenta que se pueden dividir en 3 fases: **input delay**, que inicia cuando el usuario inicia una interacción y termina cuando el evento callback de la interacción empieza a correr; **processing time**, que es el tiempo que demora el evento callback en terminar de ejecutarse, y por último **presentation delay**, que es el tiempo que demora el navegador en mostrar el próximo frame que contiene el resultado visual de la interacción. La suma de estas tres fases es el total de la latencia en una interacción.

<br/>

Para poder optimizar el INP, deberíamos poder identificar y optimizar cada una de sus fases.

<br/>

**Input delay**
Esta fase puede ser considerablemente larga, y esto podría darse por tener mucha actividad dentro del hilo principal, funciones de timer, otras interacciones que ocurren sucesivamente y se van solapando.
Otro aspecto muy importante de interactividad es durante la carga del sitio web. Por lo que, es importante recordar que aunque nuestra página web esté renderizada, no significa que esté completamente cargada. Dependiendo de cuántos recursos se necesiten para que esté completamente funcional, es posible que los usuarios intenten interactuar con la página web, mientras esta está aún cargando.
La evaluación de scripts durante la carga de nuestro sitio web, también puede aumentar el input delay. Recordemos que una vez que nuestro sitio descarga un archivo js, hay cosas que debe resolver antes de poder ejecutarlo (análisis de la sintaxis para asegurarse que es correcta, compilarlo en bytecode y finalmente ejecutarlo). Dependiendo del tamaño de estos scripts, puede introducir tareas largas dentro de nuestro hilo principal.

<br/>

**Processing time**
Lo mejor que se puede hacer para esta fase, es reducir lo más posible el trabajo que hace cada evento callback. Si la tarea es demasiado compleja y no se puede reducir lo que se realiza en ella, la mejor alternativa es intentar dividirla en distintas tareas.
Otra acción que se puede aplicar, es solo mantener en la tarea que se está ejecutando, la lógica necesaria para poder aplicar el cambio visual del siguiente frame. El resto, se debe mover a la siguiente tarea.

Otra forma de evitar optimizar esta fase, es evitando el layout trashing. Eso es un problema de performance de renderizado que ocurre cuando se actualizan estilos dentro de un javascript y luego se leen dentro de la misma tarea. Algunas de las propiedades mas comunes que generan este problema son: <code>elem.clientWidth, elem.scrollTo(), elem.focus()</code> (para mas informacion sobre estas propiedades, se puede leer el siguiente texto: **[https://gist.github.com/paulirish/5d52fb081b3570c81e3a](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)**)

<br/>

**Presentation delay**
El conservar el tamaño del DOM lo más pequeño posible es muy importante, dado que si bien la relación entre el tiempo de renderizado y el tamaño del DOM no es lineal, si está claro que mientras más grande sea su tamaño, mas tiempo va a demorar en renderizar ya que requieren más trabajo. También es sabido que un DOM grande suele tener problemas en dos casos: durante el renderizado inicial de la página, ya que requiere mucho más trabajo para renderizar el estado inicial de la página. Por otro lado la respuesta a interacciones de usuarios ya las actualizaciones del renderizado se vuelve muy costosa, lo que hace que al navegador le lleve más tiempo poder mostrar el próximo frame.

<br/>

Una buena forma de reducir el trabajo de renderizado durante la carga de la página web y en respuesta a las interacciones de los usuarios, es usando la propiedad CSS content-visibility. La cual nos permite renderizar elementos de manera lazy a medida que se van aproximando al viewport.

<br/>

Algo muy importante a tener en cuenta sobre este punto, dado los frameworks que usamos actualmente, es el costo que tenemos de performance por renderizar HTML usando JavaScript.
Como ya sabemos al momento de renderizar HTML tenemos que pasar por el **[Critical Rendering Path](https://dev.to/coderedjack/critical-rendering-path-web-performance-23ij)**, es decir parsing del HTML, cuando se termina de hacer el parsing del HTML dentro del DOM, se le tienen que aplicar los estilos, realizar los cálculos del layout y luego renderizar ese layout. Todo esto, es un costo del cual no podemos escapar y que impacta directamente en la interactividad de nuestro sitio web.
