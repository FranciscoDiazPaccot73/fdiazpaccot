---
title: "Lidiar con grandes archivos y timeouts"
description: "Optimizando la Subida de Grandes Archivos a tu Servidor Web: Evitando los Problemas de timeouts."
pubDate: "09/02/2023"
image: "/blog/timeout.webp"
tags: "JAVASCRIPT,NODEJS,FILES"
readingTime: "8"
---

<br/>

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

<br />

Con el listado de chunks ordenado, vamos a iterar para a cada elemento generar una promise que lea cada uno de estos archivos, y luego haga un pipe del mismo a donde va a ser el archivo final. Para esta parte de escritura en el archivo final, es importante tener en cuenta a qué porción de nuestro archivo pertenece cada chunk, para eso si usamos la función **createWriteStream** de fs-extra podemos pasarle como option un valor **start**, que va a indicar en qué lugar del archivo vamos a escribir la porción que se esta está iterando, y por último, se elimina el chunk del directorio donde lo tenemos guardado. Para finalizar usamos **Promise.all()** para ejecutar todas estas promesas. Una vez terminado esto, ya podemos eliminar el directorio donde estaban todos los chunks.

<a href="/blog/dealing-with-large-files/pipe-stream.webp" alt="The life of an interaction." target="_blank">
<img src="/blog/dealing-with-large-files/pipe-stream.webp" alt="The life of an interaction." />
</a>

<br />

De esta forma, vamos a obtener nuevamente el archivo original, quedandonos de esta manera:

<a href="/blog/dealing-with-large-files/final-result.webp" alt="The life of an interaction." target="_blank">
<img src="/blog/dealing-with-large-files/final-result.webp" alt="The life of an interaction." />
</a>

<br />
<br />

Con este metodo, podriamos disminuir la cantidad de timeouts y errores al momento de subir archivos de gran tamaño, sobre todo para conexiones inestables o que no sean muy buenas.

<br/>

## **Muchas gracias por leer :)**
