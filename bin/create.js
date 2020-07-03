#!/usr/bin/env node
const path = require('path')
const process = require('process')
const {
  staticFilesDirectory,
  sourceDirectory,
  throwOnError
} = require('./getConfig')(process.argv)
const { copyStatics } = require('../index')
const pagePath = path.join(__dirname, 'template/pages')
const componentPath = path.join(__dirname, 'template/other')
const staticPath = path.join(__dirname, 'template/publicfiles')

const whatDate = (date = new Date()) =>
  `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} - ` +
  `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`

async function main() {

  console.log(`It Started On ${whatDate()}`)

  const templateTransferPromisses = sourceDirectory.reduce((result, srcDir) =>
    result.concat([copyStatics(pagePath, srcDir), copyStatics(componentPath, path.dirname(srcDir))])
    , [])

  const staticTransferPromisses = staticFilesDirectory.reduce((result, stcDir) =>
    result.concat([copyStatics(staticPath, stcDir)])
    , [])

  await Promise.all([...templateTransferPromisses, ...staticTransferPromisses]).then(result => {
    result.forEach(r => console.log('RESULT: ', r))
    console.log(`Done On ${whatDate()}`)
  }).catch(error => {
    console.log(`Got Error On ${whatDate()}`, error)
    if (throwOnError)
      process.exit(1)
  })
}
main()