---
title: "Python y Selenium, sin Docker"
description: "Desplegar aplicaciones Python + Selenium sin la necesidad de dockerizar."
pubDate: "01/30/2024"
image: "https://i.ibb.co/bgJxcg8/python-selenium-example.webp"
tags: "PYTHON,SELENIUM,API"
readingTime: "2"
languages: ["es", "en"]
blogLanguage: "es"
---

<br/>

En los recientes días, me he dedicado al desarrollo de una interfaz de programación de aplicaciones (API) en Python, requiriendo la integración de Selenium. Al llegar el momento de implementar la solución en un servidor, me enfrenté a diversas limitaciones para ejecutar Selenium de manera eficiente en dicho entorno. Encontré que gran parte de las propuestas para superar este desafío involucraban la dockerización de la aplicación; sin embargo, dadas las particularidades de mi caso de uso, opté por prescindir de esta opción y, en su lugar, buscar una solución que permitiera el despliegue en un entorno nativo de Python.

<br/>

De esta manera, descubrí que al emplear <a style="text-decoration:underline" href="https://render.com/" target="_blank">
**render.com**</a> como plataforma de alojamiento, es factible ejecutar scripts de bash en el servidor destinado para la implementación de nuestra aplicación. Esta facultad nos brinda la oportunidad de instalar Chrome directamente en el servidor mencionado.

<br/>

Con ese propósito, mediante este sencillo script de bash, podemos instalar Chrome en nuestro servidor, en caso de que aún no esté presente.

<br/>

<pre style="background: #2a2a2a; border-left: 1px solid #e9552f; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
<span style="color:#62a333">#!/usr/bin/env bash</span>
<span style="color:#62a333"># exit on error</span>
set -o errexit

STORAGE_DIR=/opt/render/project/.render

if [[ ! -d $STORAGE_DIR/chrome ]]; then
  echo "...Downloading Chrome"
  mkdir -p $STORAGE_DIR/chrome
  cd $STORAGE_DIR/chrome
  wget -P ./ https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
  dpkg -x ./google-chrome-stable_current_amd64.deb $STORAGE_DIR/chrome
  rm ./google-chrome-stable_current_amd64.deb
  cd $HOME/project/src # Make sure we return to where we were
else
  echo "...Using Chrome from cache"
fi

pip install -r requirements.txt

<span style="color:#62a333"># be sure to add Chromes location to the PATH as part of your Start Command</span>
<span style="color:#62a333"># export PATH="${PATH}:/opt/render/project/.render/chrome/opt/google/chrome"</span>
</pre>

<br/>

<br/>

Al concluir el script, incorporamos la instalación de las dependencias necesarias.

<br/>

En la etapa final, resulta crucial dirigirse a las configuraciones en la sección **"Build & Deploy"** de render.com. En particular, se busca la opción denominada **"Build Command"**, donde se especifica la ejecución de nuestro script de bash mediante el comando:

<pre style="background: #2a2a2a; border-left: 1px solid #e9552f; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
./render-build.sh
</pre>

Un aspecto adicional de relevancia consiste en añadir el siguiente comando en la sección **"Start Command"**:

<pre style="background: #2a2a2a; border-left: 1px solid #e9552f; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
export PATH="${PATH}:/opt/render/project/.render/chrome/opt/google/chrome" && gunicorn app:app
</pre>

En esta instrucción, la primera parte establece la ruta donde se encuentra el ejecutable de Chrome, y además, empleamos gunicorn para ejecutar la aplicación.

<br/>

<br/>

Con la implementación de estos pasos, se espera que nuestra aplicación Python pueda ejecutar Selenium sin inconvenientes, al haber configurado adecuadamente el entorno de render.com, instalado Chrome y definido las dependencias necesarias en el script de construcción y en el comando de inicio.

<br/>

<br/>

**Github:** <a style="text-decoration:underline" href="https://github.com/FranciscoDiazPaccot73/selenium-python-example" target="_blank">
https://github.com/FranciscoDiazPaccot73/selenium-python-example</a>

<br/>

**Deploy:** <a style="text-decoration:underline" href="https://python-selenium-example.onrender.com/test" target="_blank">
https://python-selenium-example.onrender.com/test</a>

<br/>

## **Muchas gracias por leer :)**
