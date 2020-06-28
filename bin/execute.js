#!/usr/bin/env node
const process = require('process')
const { staticFilesDirectory, destinationDirectory, sourceDirectory } = require('./getConfig')(process.argv)
const { copyStatics, renderHTMLs } = require('../index')

const whatDate = (date = new Date()) =>
  `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`

async function main() {
  console.log(`It Started On ${whatDate()}`)
  await Promise.all([
    copyStatics(staticFilesDirectory, destinationDirectory),
    renderHTMLs(sourceDirectory, destinationDirectory)
  ]).then(result => {
    result.forEach(r => console.log(r))
  }).catch(error => {
    console.log(`Got Error On ${whatDate()}`, error)
    process.exit(1)
  })
  console.log(`Done On ${whatDate()}`)
}
main()