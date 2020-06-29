#!/usr/bin/env node
const process = require('process')
const {
  staticFilesDirectory,
  destinationDirectory,
  sourceDirectory,
  throwOnError
} = require('./getConfig')(process.argv)
const { copyStatics, renderHTMLs } = require('../index')

const whatDate = (date = new Date()) =>
  `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} - ` +
  `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`

async function main() {

  console.log(`It Started On ${whatDate()}`)

  const staticTransferPromisses =
    staticFilesDirectory.reduce((result, pubdir) =>
      result.concat(destinationDirectory.map(distdir => copyStatics(pubdir, distdir)))
      , [])
  const htmlGeneratePromisses =
    sourceDirectory.reduce((result, srcdir) =>
      result.concat(destinationDirectory.map(distdir => renderHTMLs(srcdir, distdir)))
      , [])


  await Promise.all([
    ...staticTransferPromisses,
    ...htmlGeneratePromisses
  ]).then(result => {
    result.forEach(r => console.log('RESULT: ', r))
    console.log(`Done On ${whatDate()}`)
  }).catch(error => {
    console.log(`Got Error On ${whatDate()}`, error)
    if (throwOnError)
      process.exit(1)
  })
}
main()