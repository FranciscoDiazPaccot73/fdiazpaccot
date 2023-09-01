---
title: "Lidiar con grandes archivos y timeouts"
description: "Optimizando la Subida de Grandes Archivos a tu Servidor Web: Evitando los Problemas de timeouts."
pubDate: "08/31/2023"
image: "/INP.png"
tags: "JAVASCRIPT,NODEJS,FILES"
readingTime: "8"
---

Optimizando la Subida de Grandes Archivos a tu Servidor Web: Evitando los Problemas de timeouts.

<br/>

Para este ejemplo, vamos a usar una app hecha en React y un servidor en NodeJs, el cual usaremos para procesar y guardar los archivos en el sistema.

<br/>

En este blog, lo que haremos será dividir un archivo cargado del lado del cliente en chunks con un tamaño máximo fijo. Luego vamos a subir cada uno de esos chunks a nuestro servidor, lugar donde finalmente volveremos a juntar cada uno de los chunks, para obtener nuevamente el archivo original que cargamos en el cliente.

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
1- El cliente
</p>

<br/>

> _`Nota: Para el lado del cliente, vamos a concentrarnos en la función que va a procesar el archivo una vez cargado en nuestro input.`_

<br/>

Lo primero que deberíamos hacer es procesar el archivo que cargamos en nuestra aplicación cliente, para poder separarlo en chunks. Esto es lo que nos va a permitir subirlo en porciones más pequeñas. Para esto, vamos a dividir el archivo original. Dado que el navegador lo procesa como tipo Blob, podemos usar la función <a style="text-decoration:underline" href=" https://developer.mozilla.org/en-US/docs/Web/API/Blob/slice" target="_blank">
**slice()**</a> para esta división.

<br/>

<img src="/blog/dealing-with-large-files/slice-file.webp" alt="Code: slice file" />

<br/>

La idea de esta función es, recibiendo como parámetro el archivo y el tamaño máximo que queremos que tenga cada chunk (en este caso SIZE = 5Mb), iterar el archivo para ir dividiéndolo usando la función slice. Cada uno de estos chunks que generamos, lo vamos sumando a un array. Por esto, al finalizar de iterar el archivo, vamos a obtener un array de n elementos, donde n-1 van a tener el tamaño que le indicamos a la función (en este caso, 5Mb), y solo 1 va a tener como tamaño máximo 5Mb.

<br/>

Una vez que ya tenemos esta lista de chunks, podemos armar cada uno de los body que necesitamos para realizar las request.

<br/>

<img src="/blog/dealing-with-large-files/body-request.webp" alt="Code: Construct body request" />

<br/>

Los datos que vamos a necesitar para todo el proceso son, como mínimo:

<br/>

**fileHash:** Nos indica el nombre que tiene el archivo original, lo que vamos a usar para crear la carpeta que contenga todos los chunks. Este hash puede ser cualquier cosa, y lo podemos generar de la manera que nos parezca conveniente.<br/>
**index:** Es simplemente la posicion del chunk dentro de nuestro array.<br/>
**hash:** Este dato es muy importante, porque es el que nos va a servir para diferenciar a cada chunk que vamos a subir. Es muy importante poder darle alguna forma de orden. En este caso, usamos el index para poder hacer esto.<br/>
**size:** El tamaño total del archivo que queremos subir a nuestro servidor.<br/>
**chunk:** Es el chunk en si. Una porcion del archivo original.

<br/>

En este punto ya simplemente deberiamos armar un FormData para cada elemento del array de chunks. Luego usando algun metodo para palalelizar request (como usar Promise.all() o Promise.allSettled()) enviamos cada uno de nuestro chunk al servidor. En este ejemplo, este endpoint sera el **/upload**

<br />

Por ultimo, una vez que ya recibimos el 200 de cada una de la request, y sabemos que todos los chunks se subieron correctamente, queda emitir la request para avisarle a nuestro server que debe juntar todos los chunks, para poder guardar el archivo en su formato original. A este endpoint lo llamaremos **/merge**. En este endpoint lo que deberemos mandar en nuestro body son dos valores que enviamos en la request de **/upload**, que son: fileHash y size. Pero, adicionalmente, deberiamos enviar el nombre original de nuestro archivo.

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
2- El Servidor
</p>

> _`Nota: Suponiendo que ya tenemos un servidor node configurado y funcionando, vamos a pasar directamente a los endpoints que consumimos desde nuestro cliente.`_

<br/>

En nuestro servidor, por el momento tenemos que agregar 2 endpoints. Uno para recibir cada uno de los chunks y un segundo enpoint para volver a convertir ese conjunto de chunks en el archivo original.

<br/>

> _`Nota: Vamos a usar la librería fs-extra para el manejo de nuestros archivos y multiparty para procesar el body de la request.`_

<br />

Para el primer endpoint, al cual llamamos **/upload**, lo que necesitamos realizar es bastante simple. Solamente usaremos la libreria **multiparty** para extraer cada una de los atributos de nuestro chunk que enviams en el body.

<br />

Luego vamos a definir tanto la carpeta donde guardaremos todos los chunks (esto deberia ser siempre el mismo path para todos los chunks que recibamos) y tambien la ubicacion donde guardaremos el chunk en especifico que estamos procesando. Una vez que tenemos toda esta informacion, simplemente nos queda el hacer algunas validaciones usando algun metodo de manejo de archivos, como es fs-extra.

<br />

Una vez que verificamos que no exista el archivo final (para evitar cargarlo más de una vez), que el chunk no exista y que la carpeta que va a contener todos los chunks ya esté creada, usamos la función **move** de fs-extra para guardar el chunk en nuestra carpeta contenedora.

<a href="/blog/dealing-with-large-files/handle-form.webp" alt="The life of an interaction." target="_blank">
<img src="/blog/dealing-with-large-files/handle-form.webp" alt="The life of an interaction." />
</a>

<br/>

Con esto obtendremos algo como lo siguiente:

<a href="/blog/dealing-with-large-files/loaded-chunks.webp" alt="The life of an interaction." target="_blank">
<img src="/blog/dealing-with-large-files/loaded-chunks.webp" alt="The life of an interaction." />
</a>

<br />

En este punto ya deberíamos tener todos los chunks guardados en una carpeta, de manera ordenada. Por lo que es momento de realizar la función de juntar todos los chunks en el archivo original nuevamente, es decir el endpoint al cual llamamos **/merge**

<br />

Lo primero que deberíamos hacer es calcular el path donde están nuestros chunks. Con esa información, el hash de nuestro file y el tamaño de cada chunk (que nos llega por el body de la request) podemos realizar la funcionalidad en sí, es decir, el merge de nuestros chunks para obtener el archivo original.

<br />

Deberíamos leer la carpeta que contiene todos los chunks usando la función **readdir** de fs-extra. Luego de esto, el paso muy importante es ordenar esta lista de chunks, para asegurarnos de volver a armar el archivo de la forma correcta.

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
<img src="/blog/multiple-interactions.png" alt="A depiction of an interaction with multiple event handlers." />
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
