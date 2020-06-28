const path = require('path')
const fs = require('fs')
const pug = require('pug')
const fileExists = require('../common/checkFileExsist')
const errorHandler = require('../common/errorHandle')
const config = {} // TODO: read from user file

/**
 * Translates PUGs into HTMLs  
 * @param {string} templateFile the source path of files to read  
 * @param {string} destination the destination that file should make in it
 * @param {string} options an object of all values for the pug template
 */
async function handlePugFiles(templateFile, destination, options, filename) {
  const pugStringTemp = await fs.promises.readFile(templateFile, 'utf-8').catch(errorHandler)
  const { dir, name } = path.parse(templateFile)
  const optionFilePath = `${name}${config.optionFilesSudoName || ''}.json`
  const fileOptions = await fileExists(path.join(dir, optionFilePath))
    ? JSON.parse((await fs.promises.readFile(path.join(dir, optionFilePath), 'utf-8').catch(errorHandler)) || '{}')
    : {}
  const constOptions = {
    filename: 'Pug',
    basedir: dir,
    ...fileOptions,
    ...options
  }
  try {
    const HTMLTextFinal = pug.render(pugStringTemp, constOptions)
    await fs.promises.writeFile(path.join(destination, `${filename || name}.html`), HTMLTextFinal).catch(errorHandler)
  } catch (error) {
    errorHandler('pug file error ---- ', filename, { fileOptions, options }, error)
  }
}

module.exports = handlePugFiles