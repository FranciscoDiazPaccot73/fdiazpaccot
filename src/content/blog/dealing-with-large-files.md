---
title: "Manejar grandes archivos, evitando timeouts"
description: "Optimizando la Subida de Grandes Archivos a tu Servidor Web: Evitando los Problemas de timeouts."
pubDate: "09/02/2023"
image: "/blog/timeout.webp"
tags: "JAVASCRIPT,NODEJS,FILES"
mediumBlog: "https://medium.com/@fran.diazpaccot/manejar-grandes-archivos-evitando-timeouts-4e248b27e3e4"
readingTime: "6"
---

<br/>

> _`Nota: Para este artículo, vamos a usar como ejemplo una aplicación hecha en React y un servidor creado en NodeJs, los cuales usaremos para procesar y guardar los archivos en el sistema.`_

<br/>

En este blog, lo que haremos será dividir un archivo cargado del lado del
cliente en chunks con un tamaño máximo fijo. Luego, vamos a subir cada uno de
esos chunks a nuestro servidor -lugar donde finalmente volveremos a juntar cada
uno de los chunks- para obtener nuevamente el archivo original que cargamos en
el cliente.

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
1- El cliente
</p>

<br/>

> _`Nota: Para el lado del cliente, vamos a concentrarnos en la función que va a procesar el archivo una vez cargado en nuestro input.`_

<br/>

Lo primero que deberíamos hacer es procesar el archivo que cargamos en nuestra
aplicación cliente, para poder separarlo en porciones mas pequeñas -denominadas
chunks- y así subirlo a nuestro servidor. Dado que el navegador procesa los
archivos como tipo Blob, podemos usar la función
<a style="text-decoration:underline" href=" https://developer.mozilla.org/en-US/docs/Web/API/Blob/slice" target="_blank">
**slice()**</a> para realizar la división.

<br/>

<img src="/blog/dealing-with-large-files/slice-file.webp" alt="Code: slice file" />

<br/>

La función que vemos arriba, opera de la siguiente manera: recibiendo como
parámetro el archivo y el tamaño máximo que queremos que tenga cada chunk (en
este caso, vemos que SIZE = 5Mb), iterar el archivo para ir dividiéndolo usando
la función slice. Cada uno de estos chunks que generamos, lo vamos sumando a un
array. Por esto, al terminar de iterar el archivo, vamos a obtener un array de n
elementos, donde n-1 elementos van a tener el tamaño que le indicamos a la
función (en este caso, 5Mb), y solo 1 va a tener como tamaño máximo 5Mb.

<br/>

Una vez que ya tenemos esta lista de chunks, podemos armar cada uno de los body
que necesitamos para realizar las request.

<br/>

<img src="/blog/dealing-with-large-files/body-request.webp" alt="Code: Construct body request." />

<br/>

Los datos que vamos a necesitar para todo el proceso son, como mínimo:

<br/>

**fileHash:** Indica el nombre que tiene el archivo original, lo cual vamos a
usar para crear la carpeta que contenga todos los chunks. Este hash lo podemos
generar de la manera que nos parezca más conveniente.<br/> **index:** Es
simplemente la posición del chunk dentro de nuestro array.<br/> **hash:** Este
dato nos va a servir para diferenciar a cada chunk que vamos a subir. Es muy
importante poder darle alguna forma de orden. En este caso, usamos el index para
poder darle el orden mencionado.<br/> **size:** El tamaño total del archivo que
queremos subir a nuestro servidor.<br/> **chunk:** Es el chunk en sí mismo. Una
porción del archivo original.

<br/>

En este punto ya simplemente deberiamos armar un FormData para cada elemento del
array de chunks. Luego usando algún método para paralelizar request (como usar
Promise.all() o Promise.allSettled()) enviamos cada uno de nuestro chunk al
servidor. Para este ejemplo, llamaremos al endpoint como **/upload**

<br />

Por último, una vez que recibimos el status 200 de cada una de la request, y
sabemos que todos los chunks se subieron correctamente, queda "avisarle" a
nuestro servidor que debe juntar nuevamente todos los chunks, y así poder volver
a tener el archivo en su formato original. En este endpoint (al cual llamaremos
**/merge**) lo que deberemos enviar en su body, son los atributos: fileHash y
size. Pero, adicionalmente, deberíamos enviar también el nombre original de
nuestro archivo.

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
2- El Servidor
</p>

> _`Nota: Suponiendo que ya tenemos un servidor NodeJs configurado y funcionando, vamos a pasar directamente a los endpoints que consumimos desde nuestro cliente.`_

<br/>

En nuestro servidor, por el momento, tenemos que agregar 2 endpoints. El
primero, para recibir cada uno de los chunks y un segundo endpoint, para volver
a convertir ese conjunto de chunks en el archivo original.

<br/>

> _`Nota: Vamos a usar la librería fs-extra para el manejo de nuestros archivos y multiparty para procesar el body de la request.`_

<br />

Para el primer endpoint, al cual llamamos **/upload**, lo que necesitamos
realizar es bastante simple. Solamente usaremos la librería **multiparty** para
extraer cada una de los atributos de nuestro chunk que enviamos en el body.

<br />

Luego vamos a definir tanto, la carpeta donde guardaremos todos los chunks (esto
deberia ser siempre el mismo path para todos los chunks que recibamos), así como
también la ubicacion donde guardaremos el chunk en especifico que estamos
procesando. Una vez que tenemos toda esta información, simplemente nos queda
hacer algunas validaciones usando algún método de manejo de archivos, como por
ejemplo, con la librería fs-extra.

<br />

Una vez que verificamos que no exista en nuestro servidor el archivo en su
formato final final (para evitar cargarlo más de una vez), que no exista el
chunk que queremos procesar y que la carpeta que va a contener todos los chunks
ya esté creada, usamos la función **move** de fs-extra para guardar el chunk en
nuestra carpeta contenedora.

<img src="/blog/dealing-with-large-files/handle-form.webp" alt="Code: Handling form data." />

<br/>

Con esto obtendremos algo como lo siguiente:

<img src="/blog/dealing-with-large-files/loaded-chunks.webp" alt="Loaded chunks." />

<br />

En este punto ya deberíamos tener todos los chunks guardados en una carpeta, de
manera ordenada. Por lo que es momento de realizar la función de juntar todos
los chunks en el archivo original nuevamente, es decir el endpoint al cual
llamamos **/merge**.

<br />

Lo primero que deberíamos hacer, es calcular el path donde están nuestros
chunks. Con el path que calculamos, el hash de nuestro file y el tamaño de cada
chunk (que nos llega por el body de la request), podemos realizar la
funcionalidad en sí, es decir, el volver a juntar los chunks para obtener el
archivo original.

<br />

Luego, deberíamos leer la carpeta que contiene todos los chunks usando la
función **readdir** de fs-extra. Posteriormente, un paso muy importante es
ordenar esta lista de chunks, para asegurarnos de volver a armar el archivo de
la forma correcta.

<br />

Una vez que tengamos la lista de chunks ordenada, vamos a iterarla para
generarle a cada uno de sus elementos una promesa que se encargue de leer cada
uno de estos archivos, y luego haga un pipe del mismo al lugar donde vamos a
guardar el archivo final. Para esta parte de escritura en el archivo final, es
importante tener en cuenta a qué porción de nuestro archivo pertenece cada
chunk. Para ello, si usamos la función **createWriteStream** de fs-extra podemos
pasarle como option un valor **start**, que va a indicar en qué lugar del
archivo vamos a escribir la porción que se esta está iterando. Y por último, se
elimina el chunk del directorio donde lo tenemos guardado. Para finalizar usamos
**Promise.all()** para ejecutar todas estas promesas. Una vez terminado esto, ya
podemos eliminar el directorio donde estaban todos los chunks.

<img src="/blog/dealing-with-large-files/pipe-stream.webp" alt="Code: Pipe stream" />

<br />

De esta forma, vamos a obtener nuevamente el archivo original, quedándonos de
esta manera:

<img src="/blog/dealing-with-large-files/final-result.webp" alt="Final result" />

<br />
<br />

Con este método, podríamos disminuir la cantidad de timeouts y errores al
momento de subir archivos de gran tamaño, sobre todo para conexiones inestables
o que no sean optimas.

<br/>

## **Muchas gracias por leer :)**
