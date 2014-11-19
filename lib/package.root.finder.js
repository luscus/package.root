// load modules
var Path = require('path');


// variables
var parent = {};



var RootFinder = RootFinder || (function() {
  'use strict';

  var dir_array = __dirname.split(Path.sep),
      found = false,
      depth = 0,
      npm_package,
      bower,
      path;


  while (depth++ < dir_array.length) {
    path = dir_array.slice(0, depth).join(Path.sep);


    try {
      // try to load package.json
      npm_package = require(path + '/package.json');
      found = true;
    }
    catch (ex) {
      // no package.json found
      //console.log('  --> no package.json found in', path);
    }

    try {
      // try to load package.json
      bower = require(path + '/bower.json');
    }
    catch (ex) {
      // no package.json found
      bower = false;
      //console.log('    > no bower.json found in', path);
    }

    if (found)
      break;
  }


  if (bower) {

      try {
        // load the custom location of the bower modules
        var file = fs.readFileSync(path + Path.sep + '.bowerrc'),
            content = JSON.parse(file);

        bower.directory = content.directory;
      }
      catch (ex) {
        // no custom location, add default folder
        bower.directory = 'bower_modules';
      }
  }

  function rootRequire (packageName) {
    return require(path + Path.sep + 'node_modules' + Path.sep + packageName);
  }


  return {
    name: npm_package.name,
    directory: Path.basename(path),
    package: npm_package,
    bower: bower,
    path: path,
    require: function (packageName) {
      return rootRequire(packageName);
    }
  };
}).call(this);


module.exports = RootFinder;
