const path = require('path')
const fs = require('fs')
const errorHandler = require('../common/errorHandle')
const isFileExists = require('../common/checkFileExsist')
const handlePugFile = require('./pugFile')
const handleTemplateFolders = require('./templateFolder')
const config = {} // TODO: read from user file

/**
 * 1.Reads HAML 2.Render template using 'pug' 3.Save HTML files  
 * @param {string} SourcePagesPath The path to the template pages.
 * @param {string} destination The path to the new HTML pages.
 */
async function generateHTML(SourcePagesPath, destination) {
  const sourceExists = await isFileExists(SourcePagesPath)
  if (!sourceExists) return `ERROR: The source directory (${SourcePagesPath}) doesn't exist`;
  const sourceFiles = await fs.promises.readdir(SourcePagesPath).catch(errorHandler)
  const destinationExists = await isFileExists(destination)
  const destinationStat = destinationExists && await fs.promises.stat(destination)
  if (destinationExists && !destinationStat.isDirectory())
    await fs.promises.mkdir(destination, { recursive: true }).catch(errorHandler)
  const { subFolders, templateFolders, pugNormalFiles } = await sourceFiles.reduce(async function (result, current) {
    const currentFilePath = path.join(SourcePagesPath, current)
    const currentExists = await isFileExists(currentFilePath)
    const currentStat = currentExists && await fs.promises.stat(currentFilePath)
    if (currentExists && currentStat.isDirectory()) {
      const awaitedResult = await result
      if (await isFileExists(path.join(SourcePagesPath, `${current}.pug`)))
        awaitedResult.templateFolders.push(current)
      else awaitedResult.subFolders.push(current)
      return awaitedResult
    }
    const { name, ext } = path.parse(current)
    if (ext.toLocaleLowerCase() !== '.pug') return await result
    const regex = new RegExp(`^([\\w\\W]+${config.templateIndexFileExtension || '[^s(sh)(ch)xz])s|(es)'}$`)
    const regexexecresult = regex.exec(name)
    const temp = regexexecresult ? regexexecresult[1] : undefined
    const isIndex = temp ? sourceFiles.includes(temp) : false
    const namePath = path.join(SourcePagesPath, name)
    const nameExists = await isFileExists(namePath)
    const nameStat = nameExists && await fs.promises.stat(namePath)
    const hasFolder = nameExists && nameStat.isDirectory()
    if (!hasFolder && isIndex) return await result
    if (hasFolder) return await result
    result.then(i => i.pugNormalFiles.push(current))
    return await result
  }, Promise.resolve({ subFolders: [], templateFolders: [], pugNormalFiles: [] }))

  subFolders.forEach(async function (folderName) {
    generateHTML(path.join(SourcePagesPath, folderName), path.join(destination, folderName))
  })
  templateFolders.forEach(async function (folderName) {
    handleTemplateFolders(SourcePagesPath, path.join(destination, folderName), folderName)
  })
  pugNormalFiles.forEach(async function (fileName) {
    handlePugFile(path.join(SourcePagesPath, fileName), destination, { pugNormalFiles, templateFolders }, fileName)
  })
  return [`on directory ${SourcePagesPath} sub folders : `, subFolders,
    'template folders : ', templateFolders,
    'pug files : ', pugNormalFiles]
}

module.exports = generateHTML
