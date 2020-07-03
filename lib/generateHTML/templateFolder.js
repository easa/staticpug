const path = require('path')
const fs = require('fs')
const marked = require('marked')
const fileExists = require('../common/checkFileExsist')
const errorHandler = require('../common/errorHandle')
const handlePugFile = require('./pugFile')
const config = {} // TODO: read from user file
const getOptions = require('../common/getJsonContent')
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
  const listOfArticles = markdowns.map(async (md) => {
    const markdown = await fs.promises.readFile(path.join(source, folderName, md), 'utf-8').catch(errorHandler)
    const content = marked.parse(markdown)
    const { name } = path.parse(md)
    const optionspath = path.join(source, folderName, `${name}${config.optionFilesSudoName || ''}.json`)
    const options = await getOptions(optionspath).catch(errorHandler)
    handlePugFile(
      path.join(source, `${folderName}.pug`),
      destination,
      { article: { ...options, content } },
      path.parse(md).name
    ).catch(errorHandler)
    return {
      ...options,
      'articleName': name.replace(/[-_]/g, ' '),
      'articleLink': name
    }
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