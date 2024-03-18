---
title: "Webpack stats file"
description: "Analizar la cantidad de JavaScript que estamos añadiendo en un pull request (PR) en una aplicación Next.js utilizando el archivo de estadísticas de Webpack."
pubDate: "03/18/2024"
image: "/blog/webpack-stats-file/webpack-react.webp"
tags: "WEBPACK,NEXTJS,CLI,PERFORMANCE"
readingTime: "5"
languages: ['es']
blogLanguage: 'es'
---

<br/>

Cuando nos referimos a la performance, es crucial comprender que a medida que incorporamos más JavaScript en nuestras aplicaciones frontend, especialmente si utilizamos React como base, es más probable que experimentemos problemas de rendimiento. Por esta razón, considero fundamental poder ejercer cierto control sobre la cantidad de JavaScript que agregamos a medida que avanzamos con los pull requests en nuestra aplicación.

<br/>

Para abordar este desafío, dado que la mayoría de las aplicaciones que emplean React como librería también utilizan Webpack como empaquetador, podemos aprovechar una herramienta muy poderosa que nos proporciona este bundle. Esta herramienta consiste en generar el archivo de estadísticas (stats file) de nuestra aplicación al crear el build. Puedes encontrar más información sobre esto en la documentación oficial de <a style="text-decoration:underline" href="https://webpack.js.org/api/stats/" target="_blank">**Webpack**</a>

<br/>

Teniendo estas herramientas en mente, una práctica altamente recomendable antes de agregar código a nuestra rama principal es detectar qué estamos incorporando a la aplicación. Esto implica tener claridad sobre la cantidad de JavaScript, CSS, imágenes y otros recursos que estamos añadiendo.

<br />

Este archivo no se genera de manera automática al realizar el build de nuestra aplicación. En este blog, exploraremos cómo podemos generar este archivo y, además, cómo evaluarlo para comprender mejor qué estamos agregando cada vez que hacemos un push de nuestro código.

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
1- Pre-requisitos
</p>

-- Asegúrate de tener una aplicación que utilice Webpack. Para este ejemplo, crearemos una aplicación utilizando Next.js, que por defecto utiliza Webpack.

-- Instalaremos el plugin webpack-stats-plugin, que nos permitirá generar los archivos de estadísticas de Webpack. En este caso, voy a usar <a style="text-decoration:underline" href="https://www.npmjs.com/package/webpack-stats-plugin" target="_blank">**webpack-stats-plugin**</a>

-- Escribiremos un script (para este caso, en Node.js) que evalúe el archivo de estadísticas generado y nos proporcione conclusiones útiles sobre los recursos agregados a nuestra aplicación.

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
2- Aplicación que queremos medir
</p>

Para este paso, lo primero que debemos hacer es instalar el plugin webpack-stats-plugin o cualquier otro plugin que nos permita generar los archivos de estadísticas de Webpack. Vamos a utilizar el siguiente comando para instalarlo:

<br />

<pre style="background: #2a2a2a; border-left: 1px solid #e9552f; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
npm install -–save webpack-stats-file
</pre>

<br />

Después, necesitamos ajustar la configuración de Webpack para integrar el plugin. Dado que estamos trabajando con una aplicación Next.js, esto implica realizar modificaciones en el archivo <i>next.config.js</i> específicamente.

<br />

<pre style="background: #2a2a2a; border-left: 1px solid #e9552f; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
<span style="color:#62a333">//next.config.js</span>
const { StatsWriterPlugin } = require('webpack-stats-plugin')


const nextConfig = {
 …
 webpack: (config, _options) => {
   config.plugins.push(
     new StatsWriterPlugin({
       filename: '../webpack-stats-base.json',
       stats: {
         assets: true,
       }
     })
   );


   return config;
 }
};


module.exports = nextConfig;
</pre>

<br />

Con la configuración establecida, al ejecutar el comando <i>npm run build</i>, deberíamos observar un nuevo archivo JSON en la raíz de nuestra aplicación. Este archivo llevará el nombre que especificamos en la configuración, en este caso, <i>webpack-stats-base.json</i>.

<br />

> _`Nota: En el ejemplo proporcionado, dentro de las configuraciones estamos incluyendo assets: true. Sin embargo, para ampliar aún más el contenido del archivo de estadísticas, podemos incluir otros atributos como entrypoints, chunks, entre otros. Para comprender el propósito de cada atributo y su funcionamiento, te recomendamos consultar la documentación oficial de Webpack en el siguiente enlace: `<a style="text-decoration:underline" href="https://webpack.js.org/api/stats/" target="_blank">https://webpack.js.org/api/stats/</a>_

<br />

Lo ideal en este punto sería generar este archivo de control desde nuestra rama principal (main). Una vez que hayamos creado el CLI y esté listo para su uso, deberíamos guardar el archivo de estadísticas generado en el repositorio. Esto garantizará que siempre tengamos acceso a la información sobre los recursos agregados a nuestra aplicación en la rama principal del proyecto.

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
3- CLI
</p>

Para instalar <i>commander</i> y <i>shelljs</i>, puedes ejecutar el siguiente comando:

<br />

<pre style="background: #2a2a2a; border-left: 1px solid #e9552f; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
npm install --save commander shelljs
</pre>

Una vez instaladas estas dependencias, puedes utilizar commander para instanciar el CLI.

Y añadimos el manejo de esta opción.

<br />

<pre style="background: #2a2a2a; border-left: 1px solid #e9552f; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
<span style="color:#62a333">#! /usr/bin/env node</span>
const { Command } = require("commander");

const program = new Command();
program
 .version("1.0.0")
 .description("An example CLI Analyze webpack bundle")
 .option("-c, --compare  [value]", "Compare both stats")
 .parse(process.argv);

const options = program.opts();

...

if (options.compare) {
 const baseStats = typeof options.compare === "string" ? options.compare : "webpack-stats-base.json";
 const baseStatsFilePath = path.join(process.cwd(), baseStats)
 compare(baseStatsFilePath, 'webpack-stats.json');
}

</pre>

Como observamos en esta sección, esperamos recibir un atributo que indique la ubicación del archivo que vamos a utilizar como base. Adicionalmente, falta la implementacion de la función <i>compare()</i> que es la que se encargara de hacer toda la comparación.

<br />

Lo siguiente que debemos hacer es, una vez que ejecutemos el CLI dentro de una aplicación, instalar las dependencias y realizar la compilación (build) de la misma. Con estos dos pasos completados, deberíamos haber generado el nuevo archivo de estadísticas (dado que agregamos el plugin en las configuraciones de Webpack en el paso anterior). Por último, podremos comparar ambos archivos para identificar las diferencias.

<br />

A continuación, vamos a ver cómo implementar esto en código:
Primero, utilizaremos ShellJS para ejecutar los comandos <i>npm install</i> y luego <i>npm run build</i>. Y el siguiente paso consiste en buscar ambos archivos que hemos generado y compararlos entre sí.

<br />

<pre style="background: #2a2a2a; border-left: 1px solid #e9552f; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
<span style="color:#62a333">#! /usr/bin/env node</span>
const { Command } = require("commander");

async function compare() {
  console.log("Installing dependencies...")
  const installWorks = shell.exec("npm install").code

  console.log("Building...")
  shell.exec("npm run build")

  if (installWorks !== 0) shell.exit(1)

  // Comparation
  const filePath = path.join(folderPath, filename);


 try {
   const newData = fs.readFileSync(filePath, "utf8");
   const { assets } = JSON.parse(newData);


   let jsSize: number = 0;


   assets.forEach(({ name, size }: { name: string; size: number }) => {
     if (name.includes(".js") && !name.includes(".json"))
       return (jsSize += size);
   });


   const prevStats = fs.readFileSync(baseStatsLocation, "utf8");
   const { assets: prevStatsAssets } = JSON.parse(prevStats);


   let prevjsSize: number = 0;


   prevStatsAssets.forEach(
     ({ name, size }: { name: string; size: number }) => {
       if (name.includes(".js") && !name.includes(".json"))
         return (prevjsSize += size);
     }
   );


   const difference = [
     {
       type: "JAVASCRIPT",
       "base size (Kb)": prevjsSize / 1000,
       "PR size (Kb)": jsSize / 1000,
       "Difference (Kb)": jsSize - prevjsSize,
     },
   ];


   console.table(difference);
  } catch (err) {
    console.error(err)
  }
}
</pre>

Con esto, deberíamos obtener como resultado una tabla que compare la cantidad de JavaScript que había antes con lo que estamos sumando o restando con este Pull Request (PR).

<br />

<img src="/blog/webpack-stats-file/console-exit.webp" alt="Script console exit" />

<br />

Hasta este punto, hemos desarrollado el CLI para ejecutarlo en cualquiera de nuestras aplicaciones, pero esto se limita únicamente a un entorno local. Podemos llevarlo un paso más allá e integrarlo directamente en nuestros PRs, lo que nos permitirá controlar cada Pull Request que se envíe a nuestra rama principal.

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
4- CLI desde una Github Action
</p>

Para ejecutar nuestro CLI desde un GitHub Action, primero debemos publicarlo. Una forma eficiente de hacer esto automáticamente cada vez que actualicemos nuestro CLI es creando un GitHub Action específicamente para esta tarea.

<br />

Para lograr esto, necesitaríamos generar un token desde nuestro perfil de npm y luego agregar ese token como una variable secreta dentro de GitHub. En este ejemplo, llamémoslo <i>NPM_AUTH_TOKEN</i>. Luego, podemos tener un archivo llamado publish.yml dentro de la carpeta <i>.github/workflows</i> en nuestro repositorio, donde configuraremos el flujo de trabajo para publicar nuestro paquete en npm.

<br />

<pre style="background: #2a2a2a; border-left: 1px solid #e9552f; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
<span style="color:#62a333">// .github/workflows/publish.yml de nuestro CLI</span>
name: "Publish package to npm"


on:
 push:
   branches: [ main ]


jobs:
 publish:
   runs-on: ubuntu-latest
   steps:
     - name: checkout
       uses: actions/checkout@v2
     - name: node
       uses: actions/setup-node@v2
       with:
         node-version: 16
         registry-url: https://registry.npmjs.org
     - name: publish
       run: npm publish --access public
       env:
         NODE_AUTH_TOKEN: ${{secrets.NPM_AUTH_TOKEN}}
</pre>

Ahora, simplemente debemos crear la acción en nuestra aplicación Next.js para que ejecute nuestro CLI cada vez que generemos un Pull Request contra nuestra rama principal (main).

<br />

<pre style="background: #2a2a2a; border-left: 1px solid #e9552f; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
<span style="color:#62a333">// .github/workflows/analize.yml de nuestra app</span>
name: "Analyze webpack stats"


on:
 pull_request:
   branches: [ main ]


jobs:
 build:
   runs-on: ubuntu-latest
   strategy:
     matrix:
       node: [ 20 ]


   name: Node ${{ matrix.node }} sample
   steps:
     - uses: actions/checkout@v3
     - name: Run linting rules and tests
       uses: actions/setup-node@v3
       with:
         node-version: ${{ matrix.node }}
     - run: npx @fdiazpaccot/webpack-js-difference -c
       env:
         GH_TOKEN: ${{secrets.GH_TOKEN}}
         GH_USER: ${{secrets.GH_USER}}
         GH_REPO: ${{secrets.GH_REPO}}
</pre>

Al ejecutarlo en un entorno de Integración Continua (CI), ya no podríamos ver las salidas de las console.table que realizamos directamente en la consola, sin entrar a ver la acción en sí. Por lo tanto, sería necesario, para simplificar y comprender rápidamente los resultados, agregar un comentario en el Pull Request con el resultado de la acción. Para lograr esto, podemos utilizar <i>@octokit/rest</i> para agregar comentarios a nuestro PR.

<br />

<pre style="background: #2a2a2a; border-left: 1px solid #e9552f; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
<span style="color:#62a333">// .github/workflows/analize.yml de nuestra app</span>
async function addComment(values: any[]) {
  const token = process.env.GH_TOKEN;
  const user = process.env.GH_USER
  const repository = process.env.GH_REPO

  let comments = ''

  values.forEach((value: any) => {
    comments += `| **${value.type}** | ${value['base size (Kb)']} | ${value['PR size (Kb)']} | ${value['Difference (Kb)']} | \n`
  })

  if (!token) return

  const octokit = new Octokit({ auth: token });

  const eventData = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));

  const pullRequestId = eventData.pull_request.number;

  let comment = `**These are the bundle size changes in this PR.**

| Type | Base size (Kb) | PR size (Kb) | Difference (Kb) | 
| :--- | :----- | :------ | :------- |
${comments}`

  octokit.issues.createComment({
    owner: user,
    repo: repository,
    issue_number: pullRequestId,
    body: comment
  })
}
</pre>

Después de que la ejecución de nuestra acción termine, obtendríamos algo similar a lo siguiente:

<br/>

<img src="/blog/webpack-stats-file/comment.webp" alt="Pull request comment example" />

<br />

Lo que ocurra a continuación está sujeto a cuánto deseemos profundizar en este tema. Podemos analizar los chunks que cada asset consume al agregar más cantidad de JavaScript, e incluso identificar el punto de entrada exacto donde esto ocurre.

<br />

¡Espero que esta información les sea útil para evitar la inyección descontrolada de cantidades excesivas de JavaScript en sus aplicaciones!

<br/>

## **Muchas gracias por leer :)**
