---
title: "Webpack stats file"
description: "Analyze the amount of JavaScript we are adding in a pull request (PR) in a Next.js application using the Webpack stats file."
pubDate: "03/18/2024"
image: "/blog/webpack-stats-file/webpack-react.webp"
tags: "WEBPACK,NEXTJS,CLI,PERFORMANCE"
mediumBlog: "https://medium.com/@fran.diazpaccot/webpack-stats-file-84179474101a"
devBlog: "https://dev.to/frandiazpaccot/webpack-stats-file-3hi2"
readingTime: "5"
languages: ["es", 'en']
blogLanguage: "en"
---

<br/>

To begin with, it is important to say that when we refer to performance it is crucial to understand that as we incorporate more JavaScript in our frontend applications -especially if we use React as a base- we are more likely to experience performance issues. For this reason, I consider it critical to be able to exercise some control over the amount of JavaScript we add as we move forward with pull requests in our application.

<br/>

To address this challenge (since most applications that use React as a library also use Webpack as a packager) we can take advantage of a very powerful tool provided by this bundle. This tool consists in generating the stats file of our application when creating the build. You can find more information about this in the official <a style="text-decoration:underline" href="https://webpack.js.org/api/stats/" target="_blank">**Webpack**</a> documentation.

<br/>

With these tools in mind, a highly recommended practice before adding code to our main branch is to detect what we are adding to the application. This involves being clear about the amount of JavaScript, CSS, images and other resources we are adding.

<br />

This file is not generated automatically when building our application. In this blog we will explore how we can generate this file and also how to evaluate it to better understand what we are adding each time we push our code.

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
1- Prerequisites
</p>

-- Have an application that uses Webpack. For this example, we will create an application using Next.js which, by default, uses Webpack.

-- Install the <a style="text-decoration:underline" href="https://www.npmjs.com/package/webpack-stats-plugin" target="_blank">**webpack-stats-plugin**</a> plugin, which will allow us to generate Webpack statistics files.

-- Create a script (in this case, using Node.js) that evaluates the generated statistics file and provides us with useful conclusions about the resources added to our application.

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
2- Application to be measured
</p>

The first thing to do is to install the <i>webpack-stats-plugin</i> plugin or any other plugin that allows us to generate Webpack statistics files.

<br />

<pre style="background: #2a2a2a; border-left: 1px solid #e9552f; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
npm install -–save webpack-stats-file
</pre>

<br />

Once the library is installed, it is necessary to adjust the Webpack configuration to integrate the plugin. Since, we are working with a Next.js application, this involves making modifications to the <i>next.config.js</i> file specifically.

<br />

<span style="color:#ffffff">**next.config.js**</span>
<pre style="background: #2a2a2a; border-left: 1px solid #e9552f; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
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

With the configuration set up, when running the <i>npm run build</i> command, we should notice a new JSON file in the root of our application. This file will have the name we specified in the configuration, in this case, <i>webpack-stats-base.json</i>.

<br />

> _`Note: In the example provided, within the configurations we are including assets: true. However, to further expand the content of the statistics file, we can include other attributes such as entrypoints, chunks, among others. To understand the purpose of each attribute and how it works, we recommend that you consult the official Webpack documentation at the following link: `<a style="text-decoration:underline" href="https://webpack.js.org/api/stats/" target="_blank">https://webpack.js.org/api/stats/</a>_

<br />

Ideally at this point we should generate this control file from our main branch. Once we have created the CLI and it is ready for use, we should save the generated statistics file in the repository. This will ensure that we always have access to information about the resources added to our application in the main branch of the project.

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
3- The CLI
</p>

To install <i>commander</i> and <i>shelljs</i>, you can run the following command:

<br />

<pre style="background: #2a2a2a; border-left: 1px solid #e9552f; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
npm install --save commander shelljs
</pre>

Once these dependencies are installed, the CLI is instantiated using commander.

And then, add the handling of this option.

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

The implementation of the <i>compare()</i> function is missing, which is the one that will be in charge of doing all the comparison.

<br />

The next thing to do -once we run the CLI inside an application- is to install the dependencies and perform the build of the application. With these two steps completed, the new statistics file should have been generated (since we added the plugin in the Webpack settings in the previous step). Finally, we can compare both files to identify the differences.

<br />

Next, let's see how to implement this in code. First, use ShellJS to execute the <i>npm install</i> and then <i>npm run build</i> commands. And the last step is to find both files that have been generated and compare them with each other.

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

With this we should obtain as a result, a table that compares the amount of JavaScript that was there before with what we are adding or subtracting with this Pull Request (PR).

<br />

<img src="/blog/webpack-stats-file/console-exit.webp" alt="Script console exit" />

<br />

Up to this point we have developed the CLI to run in any of our applications, but this is limited to a local environment only. We can take it a step further and integrate it directly into our PRs, which will allow us to control every Pull Request that is sent to our main branch.

<p style="color:#e9552f;margin-top:32px;margin-bottom:16px;font-size:20px;font-weight:600">
4- CLI from a Github Action
</p>

To run our CLI from a GitHub Action, we must first publish it. An efficient way to do this automatically (every time we update our CLI) is to create a GitHub Action specifically for this task.

<br />

To accomplish this, we would need to generate a token from our npm profile and then add that token as a secret variable within GitHub. In this example, let's call it <i>NPM_AUTH_TOKEN</i>. Then, we can have a file called publish.yml inside the <i>.github/workflows</i> folder in our repository, where we will configure the workflow to publish our package in npm.

<br />

<span style="color:#ffffff">**.github/workflows/publish.yml within the CLI**</span>
<pre style="background: #2a2a2a; border-left: 1px solid #e9552f; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
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

Now, we simply create the action in our Next.js application to execute our CLI every time we generate a Pull Request against our main branch.

<br />

<span style="color:#ffffff">**.github/workflows/analize.yml within the application to measure**</span>
<pre style="background: #2a2a2a; border-left: 1px solid #e9552f; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
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

When running it in a Continuous Integration (CI) environment we would no longer be able to see the outputs of the <i>console.table</i> command that we perform directly in the console, without going to see the action itself. Therefore, in order to simplify and quickly understand the results, it would be necessary to add a comment in the Pull Request with the result of the action. To accomplish this, we can use <i>@octokit/rest</i> to add the comment.

<br />

<span style="color:#ffffff">**.github/workflows/analize.yml within the application to measure**</span>
<pre style="background: #2a2a2a; border-left: 1px solid #e9552f; color: #89cff0; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; overflow: auto; padding: 10px; display: block; word-wrap: break-word;overflow-x: auto;max-width:calc(100vw - 20px)">
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

When the github action finishes, we will see a result similar to the following:

<br/>

<img src="/blog/webpack-stats-file/comment.webp" alt="Pull request comment example" />

<br />

What has been developed up to this point is only the basis. As much as we want to extend this solution, it is subject to how much we want to go deeper into this solution.
We could analyze the chunks that each asset consumes when adding more JavaScript, and even identify the exact entry point where this occurs.

<br />

I hope you find this information useful to avoid uncontrolled injection of excessive amounts of JavaScript into your applications!

<br/>

## **Thanks for reading :)**
