---
title: "Python and Selenium, Unleashed without Docker"
description: "Deploying Python + Selenium applications without the need for dockerize it."
pubDate: "01/30/2024"
image: "/blog/python-selenium-example/python-selenium-example.webp"
tags: "PYTHON,SELENIUM,API"
mediumBlog: "https://medium.com/@fran.diazpaccot/python-and-selenium-unleashed-without-docker-c526b3a6c2aa"
readingTime: "2"
languages: ['es', 'en']
blogLanguage: 'en'
---

<br/>

In recent days, I have been dedicated to the development of a Python-based Application Programming Interface (API), requiring the integration of Selenium. When it came time to implement the solution on a server, I faced various limitations in efficiently running Selenium in that environment. I found that many of the proposed solutions to overcome this challenge involved dockerizing the application; however, given the peculiarities of my use case, I chose to forgo this option and instead sought a solution that would allow deployment in a native Python environment.

<br/>

In this way, I discovered that by using <a style="text-decoration:underline" href="https://render.com/" target="_blank">
**render.com**</a> as a hosting platform, it is feasible to execute bash scripts on the server intended for the implementation of our application. This capability provides us with the opportunity to install Chrome directly on the mentioned server.
For this purpose, through this simple bash script, we can install Chrome on our server if it is not already present.

<br/>

For this purpose, through this simple bash script, we can install Chrome on our server if it is not already present.

<br/>

<pre style="background: #2a2a2a; border-left: 1px solid #f36d33; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
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

Upon concluding the script, we include the installation of the necessary dependencies

<br/>

In the final stage, it is crucial to navigate to the settings in the **"Build & Deploy"**section of render.com. Specifically, look for the option labeled **"Build Command"**, where the execution of our bash script is specified using the command:
<pre style="background: #2a2a2a; border-left: 1px solid #f36d33; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
./render-build.sh
</pre>
An additional relevant aspect involves adding the following command in the **"Start Command"** section:
<pre style="background: #2a2a2a; border-left: 1px solid #f36d33; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
export PATH="${PATH}:/opt/render/project/.render/chrome/opt/google/chrome" && gunicorn app:app
</pre>
In this instruction, the first part establishes the path where the Chrome executable is located, and we use gunicorn to run the application.

<br/>

<br/>

By implementing these steps, it is expected that our Python application can run Selenium seamlessly, having properly configured the render.com environment, installed Chrome, and defined the necessary dependencies in the build script and start command. This set of measures provides a solid framework for the smooth operation of the application in the desired environment.

<br/>

<br/>

**Github:** <a style="text-decoration:underline" href="https://github.com/FranciscoDiazPaccot73/selenium-python-example" target="_blank">
https://github.com/FranciscoDiazPaccot73/selenium-python-example</a>

<br/>

**Deploy:** <a style="text-decoration:underline" href="https://python-selenium-example.onrender.com/test" target="_blank">
https://python-selenium-example.onrender.com/test</a>

<br/>

## **Thanks for reading :)**
