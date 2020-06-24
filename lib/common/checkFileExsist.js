const fs = require('fs')

/** check if file exists
 * @param {string} path The path to the file/directory to check.
 */
async function isFileExists(path) {
  return new Promise(function (resolve, reject) {
    fs.exists(path, result => resolve(result))
  })
}

module.exports = isFileExists