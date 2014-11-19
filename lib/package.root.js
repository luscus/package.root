/*jslint node: true */
"use strict";

// load modules
var Path = require('path'),
    Fs   = require('fs');


// variables
var parent = {};




var pathArray = __dirname.split(Path.sep),
    found = false,
    depth = 0,
    rootPackage,
    bower,
    path;


while (depth++ < pathArray.length) {
  path = pathArray.slice(0, depth).join(Path.sep);


  try {
    // try to load package.json
    rootPackage = require(path + '/package.json');
    found = true;
  }
  catch (ex) {
    // no package.json found
    //console.log('  --> no package.json found in', path);
  }

  if (found) {

    try {
      // try to load package.json
      bower = require(path + '/bower.json');
    }
    catch (ex) {
      // no package.json found
      bower = false;
      //console.log('    > no bower.json found in', path);
    }

    // root found: stopping the loop
    break;
  }
}


if (bower) {

  try {
    // load the custom location of the bower modules
    var file = Fs.readFileSync(path + Path.sep + '.bowerrc'),
        content = JSON.parse(file);

    bower.directory = content.directory;
  }
  catch (ex) {
    // no custom location, add default folder
    bower.directory = 'bower_modules';
  }
}


module.exports = {
  name: rootPackage.name,
  directory: Path.basename(path),
  package: rootPackage,
  bower: bower,
  path: path
};
