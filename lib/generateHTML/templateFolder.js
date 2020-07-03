const path = require('path')
const fs = require('fs')
const marked = require('marked')
const fileExists = require('../common/checkFileExsist')
const errorHandler = require('../common/errorHandle')
const handlePugFile = require('./pugFile')
const isFileExists = require('../common/checkFileExsist')
const config = {} // TODO: read from user file
const getOptions = async (optionFilePath) => {
  if (await fileExists(optionFilePath)) {
    const optionContent = await fs.promises.readFile(optionFilePath, 'utf-8').catch(errorHandler)
    try {
      return JSON.parse(optionContent)
    }
    catch (error) {
      const { name, message } = error
      errorHandler(`ERROR: ${name}: ${message} at ${optionFilePath}`)
      return {}
    }
  }
}
/**
 * Translates markdowns into HTMLs  
 * @param {string} source the source path of files to read files from it
 * @param {string} destination the destination that file should make in it
 * @param {string} folderName the name of folder of markdown files
 */
async function handleMarkdownFiles(source, destination, folderName) {
  if (! await fileExists(destination))
    await fs.promises.mkdir(destination, { recursive: true }).catch(errorHandler)
  const markdownSource = path.join(source, folderName)
  const files = await fs.promises.readdir(markdownSource).catch(errorHandler)
  const markdowns = files.filter(filename => path.parse(filename).ext.toLocaleLowerCase() === '.md')
  listOfArticles = []
  markdowns.forEach(async (md) => {
    const { name } = path.parse(md)
    const contentInMarkdown = await fs.promises.readFile(path.join(source, folderName, md), 'utf-8').catch(errorHandler)
    const optionspath = path.join(source, folderName, `${name}${config.optionFilesSudoName || ''}.json`)
    const options = await getOptions(optionspath)
    const contentInHTML = marked.parse(contentInMarkdown)

    listOfArticles.push(Object.assign({
      'articleName': name.replace(/[-_]/g, ' '),
      'articleLink': name
    },
      options
    ))
    const articleObject = Object.assign(Object.assign({
      content: contentInHTML
    }, options))
    await handlePugFile(
      path.join(source, `${folderName}.pug`),
      destination,
      { article: articleObject },
      path.parse(md).name
    ).catch(errorHandler)
  })

  const sourceIndexFile = Array(config.indexTemplatePostfix, 'es', 's').reduce((result, postfix) => {
    const tempPath = path.join(source, `${folderName}${postfix}.pug`);
    if (result) return result;
    if (!fs.existsSync(tempPath)) return result;
    return result = tempPath;
  }, undefined)

  if (!sourceIndexFile) return;

  await handlePugFile(
    sourceIndexFile,
    destination,
    { listOfArticles },
    'index'
  ).catch(errorHandler)
}

module.exports = handleMarkdownFiles