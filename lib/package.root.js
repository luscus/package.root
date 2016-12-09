/*jslint node: true */
'use strict';

// load modules
var loader = require('package.loader');
var crawler = require('./crawler');

var rootPackageInfo = crawler();



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
