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
    if (config && !fs.existsSync(tempConfigPath)) return;
    config = JSON.parse(fs.readFileSync(tempConfigPath, 'utf-8'))
  })
  const packagejsonPath = path.join(basePath, 'package.json')
  if (!config && fs.existsSync(packagejsonPath)) {
    const packagejson = JSON.parse(fs.readFileSync(packagejsonPath), 'utf-8')
    config = packagejson['staticpug']
  }
  if (!config)
    config = {}
  Object.keys(defaults).forEach(i => {
    if (!config[i])
      config[i] = defaults[i]
  })

  Object.keys(config).forEach(i => {
    let value = config[i]
    if (typeof value === 'string') {
      config[i] = path.isAbsolute(value) ? [value] : [path.join(basePath, value)]
    }
    else if (typeof value.map === 'function') {
      config[i] = value.map(j => path.isAbsolute(j) ? j : path.join(basePath, j))
    }
  })
  return config
}