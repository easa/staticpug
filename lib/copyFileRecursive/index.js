const path = require('path')
const fs = require('fs')
const isFileExists = require('../common/checkFileExsist')
const errorHandler = require('../common/errorHandle')

/**
 * Copy every file and nested directories (cp -R)
 * @param {string} source The path to the thing to copy.
 * @param {string} destination The path to the new copy.
 */
async function copyRecursive(source, destination) {
  const sourceExists = await isFileExists(source)
  if (!sourceExists) return `ERROR: The static directory (${source}) doesn't exist`;
  const stats = await fs.promises.stat(source)
  const isDirectory = stats.isDirectory()
  if (!isDirectory)
    return await fs.createReadStream(source).pipe(fs.createWriteStream(destination))
  const destinationExists = await isFileExists(destination)
  if (!destinationExists)
    await fs.promises.mkdir(destination).catch(errorHandler)
  const children = await fs.promises.readdir(source).catch(errorHandler)
  children.forEach(filename => {
    copyRecursive(path.join(source, filename), path.join(destination, filename)).catch(errorHandler)
  })
  return `${source} => ${destination} copied successfully!`;
}

module.exports = copyRecursive