---
id: 2
title: "INP ¡¿Qué es eso?!"
description: "Interaction to Next Paint (INP), el reemplazo del First Input Delay (FID)."
pubDate: "06/02/2023"
image: "https://i.ibb.co/f4bK07g/INP.png"
tags: "PERFORMANCE,WEB VITALS"
readingTime: "6"
languages: ["es"]
blogLanguage: "es"
published: true
---

Siendo que falta menos de 1 año para su lanzamiento (Marzo de 2024) el INP es la
nueva métrica de las Core Web Vitals que incorpora Google. Es importante que
podamos entender cómo funcionara, cómo medir nuestros sitios web en base al INP
y cómo mejorar esos resultados.

<br/>

Las Core Web Vitals miden actualmente tres métricas principales en un sitio web:
la carga, con el **Largest Contentful Paint (LCP)**; la interactividad, con el
**First Input Delay (FID)**, y la estabilidad visual, con el **Cumulative Layout
Shift (CLS)**. Ahora sabemos que el INP llegará para reemplazar al FID, ya que
también es una métrica de interactividad.

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
1- Si ya existe una métrica de interactividad, ¿por qué cambiarla?
</p>

La respuesta a esta pregunta es más sencilla de lo que podríamos pensar. Según
datos de Google, el 90% del tiempo que un usuario pasa en un sitio web es
después de su carga inicial. Mientras que el INP tiene en cuenta todas las
interacciones en un sitio web (durante todo su ciclo de vida), el FID sólo
considera la primera interacción, sin tener en cuenta el tiempo que se tarda en
ejecutar los _event handlers_ o el tiempo de demora en mostrar el siguiente
_frame_.

<br/>

Aunque algunas interacciones pueden tomar más tiempo que otras, es crucial
proporcionar información rápida de que algo está sucediendo, especialmente para
las interacciones más complejas. En resumen, una buena interactividad implica
que nuestro sitio web responda rápidamente a las interacciones del usuario. Por
lo tanto, el objetivo del INP es **minimizar el tiempo entre el momento en que
un usuario interactúa con un elemento de nuestro sitio web y el momento en que
el próximo _frame_ es pintado en la pantalla.**

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
2- ¿Qué es el INP?
</p>

El INP es la métrica que mide la interactividad general de las interacciones del
usuario, registrando la latencia de todos los clicks, toques e interacciones del
teclado que ocurren durante toda la visita del usuario a una página web. Por
tanto, el valor final del INP es el mayor observado, ignorando los valores
atípicos. Para calcularlo, en páginas web con pocas interacciones, se toma el
peor tiempo observado, es decir, el percentil 100. Sin embargo, en las páginas
web con gran cantidad de interacciones, se toma el percentil 99 o 98.

<br/>

> _`Nota: Se considera como interacción al conjunto de event handlers que se ejecutan durante el mismo gesto lógico del usuario. La latencia de una interacción es la duración más larga de un grupo de event handlers que desencadenan la interacción, desde el momento en que el usuario comienza hasta el momento en que se presenta el próximo fotograma con alguna información visual.`_

<br/>

<a href="/blog/inp.png" alt="The life of an interaction." target="_blank">
<img src="https://i.ibb.co/nqy7Fcc/inp.png" alt="The life of an interaction." />
</a>

<br/>

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
3- ¿Cómo sé si el INP de mi página web es bueno?
</p>

Para determinar si el INP es bueno, se recomienda observar el percentil 75 de
los datos de los usuarios obtenidos en el campo (no se aconseja utilizar datos
de laboratorio). Basándonos en estos datos, podemos determinar si el INP es
bueno si está por debajo de los 200 ms. Si está por encima de los 200 ms pero
por debajo de los 500 ms, nuestro INP necesita mejoras. Por último, si está por
encima de los 500 ms, nuestro INP es malo.

<br/>

Ahora que sabemos cuáles son las métricas buenas y malas, seguramente surge la
siguiente pregunta: ¿Cómo se calculan estos valores? Para responder a esto, es
necesario entender qué mide el INP y qué no. Como mencionamos anteriormente, las
interacciones que se tienen en cuenta para medirlo son: hacer clic con el ratón,
hacer _"tap"_ en un dispositivo con pantalla táctil y presionar una tecla, ya
sea física o en el teclado de la pantalla. Cualquier tipo de _hover_ o _scroll_
no afecta al cálculo del INP.

<br/>

Cada interacción contiene múltiples eventos. Por ejemplo, al presionar una tecla
tenemos los eventos _keydown_, _keypress_ y _keyup_. El evento con la duración
más larga durante la interacción es el que se toma como la latencia de la
interacción. Dado que el INP se calcula cuando el usuario abandona el sitio web,
podemos decir que da como resultado un valor único que representa la capacidad
general de respuesta del sitio web a lo largo de todo su ciclo de vida

<br/>

<a href="/blog/multiple-interactions.png" alt="A depiction of an interaction with multiple event handlers." target="_blank">
<img src="https://i.ibb.co/7WQXK13/multiple-interactions.png" alt="A depiction of an interaction with multiple event handlers." />
</a>

<br/>

Es posible que el informe no devuelva un valor para el INP. Aunque esto puede
ocurrir por muchas razones, las principales pueden ser que la página web haya
cargado pero el usuario haya realizado alguna acción que no se incluye en las
interacciones medidas por el INP, que el usuario nunca haya interactuado en
absoluto o que se acceda al sitio web mediante algún bot.

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
4- ¿Cómo puedo optimizar mis interacciones?
</p>

Una vez que obtengamos datos de campo, es fundamental complementarlos con
información de laboratorio para poder analizar en mayor detalle y optimizar
aquellas interacciones que se encuentran siendo lentas. Para identificar
interacciones lentas en el laboratorio, te recomiendo revisar el siguiente
<a style="text-decoration:underline" href="https://web.dev/diagnose-slow-interactions-in-the-lab/" target="_blank">
**articulo.**</a>

<br/>

Al identificar y reproducir las interacciones en el laboratorio, podemos empezar
a analizar cómo optimizarlas. Debes tener en cuenta que las interacciones se
pueden dividir en tres fases:

<br/>

&nbsp; &nbsp; **1. Input Delay:** comienza cuando el usuario inicia una
interacción y termina cuando el evento callback de la interacción empieza a
ejecutarse.

&nbsp; &nbsp; **2. Processing time:** es el tiempo que se tarda en completar la
ejecución del evento callback.

&nbsp; &nbsp; **3. Presentation delay:** es el tiempo que demora el navegador en
mostrar el siguiente frame que contiene el resultado visual de la interacción.

<br/>

La suma de estas tres fases es el total de la latencia en una interacción.

<br/>

Para optimizar la interacción, debemos ser capaces de identificar y optimizar
cada una de estas fases.

<br/>

**Input delay:** Esta fase puede ser larga si existe mucha actividad en el hilo
principal, funciones de temporizador, o interacciones sucesivas que se solapan.
Un aspecto crucial de la interactividad ocurre durante la carga del sitio web.
Aunque la página web esté renderizada, puede no estar completamente cargada. Si
los usuarios intentan interactuar con la página mientras aún está cargando, el
input delay puede aumentar. Evaluar los scripts durante la carga de nuestro
sitio web también puede prolongar el input delay.

<br/>

**Processing time:** Para optimizar esta fase, debes intentar minimizar el
trabajo que realiza cada evento callback. Si la tarea es demasiado compleja, es
posible dividirla en tareas más pequeñas. Evitar el layout trashing también
puede ayudar a optimizar esta fase. El layout trashing es un problema de
rendimiento que ocurre cuando se actualizan los estilos en un javascript y luego
se leen en la misma tarea. Algunas de las propiedades mas comunes que generan
este problema son:
<code>elem.clientWidth, elem.scrollTo(), elem.focus()</code>. Para más
información sobre este problema, puedes leer el
<a style="text-decoration:underline" href="https://gist.github.com/paulirish/5d52fb081b3570c81e3a" target="_blank">
**siguiente texto.**</a>

<br/>

**Presentation delay:** Mantener el tamaño del DOM pequeño es importante, ya que
un DOM grande puede aumentar el tiempo de renderizado y hacer más lenta la
interacción. Una buena forma de reducir el trabajo de renderizado es utilizando
la propiedad CSS content-visibility. Esta propiedad nos permite renderizar
elementos de manera lazy a medida que se van aproximando al viewport.

<br/>

Es importante tener en cuenta el costo de rendimiento que conlleva renderizar
HTML usando JavaScript. Este proceso pasa por el
<a style="text-decoration:underline" href="https://dev.to/coderedjack/critical-rendering-path-web-performance-23ij" target="_blank">
**Critical Rendering Path**</a>, incluyendo el análisis del HTML, la aplicación
de estilos, los cálculos del layout y el renderizado del layout. Estos pasos son
inevitables y afectan directamente a la interactividad de nuestro sitio web.

<br/>

## **Muchas gracias por leer :)**
