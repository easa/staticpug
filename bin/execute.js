#!/usr/bin/env node
const path = require('path')
const { copyStatics, renderHTMLs } = require('../index')
const process = require('process')
console.log(__dirname, process)
const pubdir = path.join(__dirname, 'public')
const srcdir = path.join(__dirname, 'src/page')
const dstdir = path.join(__dirname, 'dist')
const whatDate = (date = new Date()) =>
  `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`

async function main() {
  console.log(`It Started On ${whatDate()}`)
  await Promise.all([
    copyStatics(pubdir, dstdir),
    renderHTMLs(srcdir, dstdir),
    // lib.renderJavascrtips(srcdir, dstdir),
    // lib.renderSasses(srcdir, dstdir)
  ]).catch(error => {
    console.log(`Got Error On ${whatDate()}`, error)
    process.exit(1)
  })
  console.log(`And Successfully Done On ${whatDate()}`)
}
main()