const fs = require('fs')
const errorHandler = require('./errorHandle')
const fileExists = require('./checkFileExsist')
/**
 * return the content of the json file and empty object on error
 * @param {string} optionFilePath the absolute path to the json file
 */
module.exports = async (optionFilePath = '') => {
  if (!(await fileExists(optionFilePath)))
    return {}
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