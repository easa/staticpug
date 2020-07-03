# Intro to the staticpug
> Welcome to this beautiful *static* website of yours

If you see this page it means you have executed the `npx sp-init` command and the files are generated, 
then you executed the `npx sp-build` command and the html files generated from templates 
and you opened the website using any static website viewer.

In case you need to use inner functions in your code: 

```js
// It's possible to use individual functions of this package :)
const { renderHTMLs, copyStatics } = require('staticpug')

renderHTMLs(sourceDirectory, destinationDirectory).then(result=>{
  console.log(result)
})

```

| functionality | explanation |
| --- | --- |
| copy files recursively | gets two directory as parameters, copy everything in first directory to second directory |
| generate htmls | read pug files, related markdown-folder, related json file and polar file that is the index of markdown-folder and generate html |

Tank you for using this package, don't hesitate to contribute

Powered by [pugjs](https://pugjs.org/), [markedjs](https://marked.js.org/) (to work), 
also used the beautiful [bootstrap](https://getbootstrap.com/) 
[jQuery](http://jquery.com/) that cames beside the bootstrap!

Developed by [easa](https://github.com/easa)