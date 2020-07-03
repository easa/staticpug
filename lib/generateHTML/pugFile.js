const path = require('path')
const fs = require('fs')
const pug = require('pug')
const getOptions = require('../common/getJsonContent')
const errorHandler = require('../common/errorHandle')
const config = {} // TODO: read from user file

/**
 * Translates PUGs into HTMLs  
 * @param {string} templateFile the source path of files to read  
 * @param {string} destination the destination that file should make in it
 * @param {string} options an object of all values for the pug template
 */
async function handlePugFiles(templateFile, destination, options = {}, filename) {
  const pugStringTemp = await fs.promises.readFile(templateFile, 'utf-8').catch(errorHandler)
  const { dir, name } = path.parse(templateFile)
  const optionFilePath = path.join(dir, `${name}${config.optionFilesSudoName || ''}.json`)
  let fileOptions = await getOptions(optionFilePath)

  const constOptions = {
    filename: 'Pug',
    basedir: dir,
    ...fileOptions,
    ...options
  }
  try {
    // TODO: pass the template file path here instead of pug 
    const HTMLTextFinal = pug.render(pugStringTemp, constOptions)
    await fs.promises.writeFile(path.join(destination, `${filename || name}.html`), HTMLTextFinal).catch(errorHandler)
  } catch (error) {
    const { code, msg } = error
    console.log(error, '-- options:', constOptions)
    errorHandler(`ERROR: ${code}: ${msg} at ${templateFile}${filename ? `=>${filename}` : ""} `, { ...fileOptions, ...options })
  }
}

module.exports = handlePugFiles