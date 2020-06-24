const htmlMaker = require('./generateHTML')
const copyFile = require('./copyFileRecursive')

module.exports = {
  copyStatics: copyFile,
  renderHTMLs: htmlMaker
}