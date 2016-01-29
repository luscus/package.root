/*jslint node: true */
"use strict";

// load modules
var loader = require('package.loader');
var Path   = require('path');

// convert path into an array
var pathArray = __dirname.split(/\/|\\/);
var depth = 0;
var packageInfo;
var path;

// Iterate through the path increasing the depth on each iteration
// the first package.json will be the root package
while (depth++ < pathArray.length) {
  path = pathArray.slice(0, depth).join(Path.sep);

  try {

    // try to load package.json
    packageInfo = require(path + '/package.json');

    // root found: stopping the loop
    break;
  }
  catch (ex) {
    if (ex.code !== 'MODULE_NOT_FOUND')  {
      // package.json was found but reading it raised an error
      // pass on the error
      throw ex;
    }

    // no package.json found at this depth
    // do nothing and load next path depth
  }
}

// create root package info Object
var rootPackageInfo = {
  name: packageInfo.name,
  directory: Path.basename(path),
  deployPath: Path.dirname(path),
  path: path,
  package: packageInfo
};

// Retrieve information from the plugins
var plugins     = loader.load(/^root\.info\.[a-z0-9_-]+$/);
var pluginNames = Object.getOwnPropertyNames(plugins);


pluginNames.forEach(function pluginIterator (pluginFullName) {

  // execute plugin code
  var plugin = plugins[pluginFullName];
  var result = plugin(rootPackageInfo);

  // clear plugin name from prefix
  var pluginName = pluginFullName.replace(/^root\.info\./, '');

  if (result !== null && result !== undefined) {

    // if plugin generated output,
    // append the result to the root package info Object
    // under the plugin name
    rootPackageInfo[pluginName] = result;
  }
});

module.exports = rootPackageInfo;
