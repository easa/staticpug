const path = require('path')
const fs = require('fs')
const defaults = require('./defaultConfig.json')

module.exports = function (argv) {
  const thisPath = argv[1];
  const node_modulesPath = /^(.*)node_modules/.exec(thisPath)[1]
  const basePath = !node_modulesPath ? __dirname : node_modulesPath
  let config = undefined;

  Array('staticpug.config.json', 'staticpug.json', 'staticpug.config').forEach(i => {
    const tempConfigPath = path.join(basePath, i)
    if (!config && fs.existsSync(tempConfigPath))
      config = require(tempConfigPath)
  })
  if (!config && fs.existsSync(path.join(basePath, 'package.json'))) {
    const packagejson = require(path.join(basePath, 'package.json'))
    config = packagejson['staticpug']
  }
  if (!config)
    config = {}
  Object.keys(defaults).forEach(i => {
    if (!config[i])
      config[i] = defaults[i]
  })
  return config
}