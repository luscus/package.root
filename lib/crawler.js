/*jslint node: true */
'use strict';

var Path   = require('path');

function crawler (path) {
    path = path || __dirname;

    // convert path into an array
    var pathArray = path.split(/\/|\\/);
    var maxDepth  = pathArray.length - 1;
    var depth = 0;
    var packageInfo;

    // Iterate through the path increasing the depth on each iteration
    // the first package.json will be the root package
    while (depth++ <= maxDepth) {

        if (pathArray[depth] === '.nvm') {
            continue;
        }

        path = pathArray.slice(0, depth).join(Path.sep);

        try {

            // try to load package.json
            packageInfo = require(path + '/package.json');


            // create root package info Object
            var rootPackageInfo = {
                name: packageInfo.name,
                directory: Path.basename(path),
                deployPath: Path.dirname(path),
                path: path,
                package: packageInfo
            };


            // root found: stopping the loop
            return rootPackageInfo;
        }
        catch (ex) {
            if (ex.code !== 'MODULE_NOT_FOUND') {
                // package.json was found but reading it raised an error
                // pass on the errornpm list graceful-fs
                throw ex;
            }

            if (depth === maxDepth) {
                throw new Error('no root package found');
            }

            // no package.json found at this depth
            // do nothing and load next path depth
        }
    }

    return null;
}

module.exports = crawler;
