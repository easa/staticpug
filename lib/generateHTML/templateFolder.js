const path = require('path')
const fs = require('fs')
const marked = require('marked')
const fileExists = require('../common/checkFileExsist')
const errorHandler = require('../common/errorHandle')
const handlePugFile = require('./pugFile')
const config = require('../config.json') || {}

/**
 * Translates markdowns into HTMLs  
 * @param {string} source the source path of files to read files from it
 * @param {string} destination the destination that file should make in it
 * @param {string} follderName the name of folder of markdown files
 */
async function handleMarkdownFiles(source, destination, folderName) {
  if (! await fileExists(destination))
    await fs.promises.mkdir(destination, { recursive: true }).catch(errorHandler)
  const markdownSource = path.join(source, folderName)
  const files = await fs.promises.readdir(markdownSource).catch(errorHandler)
  const markdowns = files.filter(filename => path.parse(filename).ext.toLocaleLowerCase() === '.md')
  markdowns.forEach(async (md) => {
    const { name } = path.parse(md)
    const contentInMarkdown = await fs.promises.readFile(path.join(source, folderName, md), 'utf-8').catch(errorHandler)
    const options = JSON.parse(await fs.promises.readFile(path.join(source, folderName, `${name}${config.optionFilesSudoName || ''}.json`), 'utf-8').catch(errorHandler) || '{}')
    const contentInHTML = marked.parse(contentInMarkdown)
    handlePugFile(path.join(source, `${folderName}.pug`), destination, { article: { content: contentInHTML, ...options } }, path.parse(md).name)
  })
  const listOfArticles = markdowns.map(md => {
    const { name } = path.parse(md)
    return {
      'title': name.replace(/[-_]/, ' '),
      'link': name
    }
  })
  handlePugFile(path.join(source, `${folderName}${config.indexFilesSudoName || 's'}.pug`), destination, { listOfArticles }, 'index')
}

module.exports = handleMarkdownFiles