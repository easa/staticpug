/**
 * Copy every file and nested directories (cp -R)
 * @param {string} source The path to the thing to copy.
 * @param {string} destination The path to the new copy.
*/
exports.copyStatics = require('./lib/copyFileRecursive')

/**
 * 1.Reads HAML 2.Render template using 'pug' 3.Save HTML files  
 * @param {string} SourcePagesPath The path to the template pages.
 * @param {string} destination The path to the new HTML pages.
 */
exports.renderHTMLs = require('./lib/generateHTML')