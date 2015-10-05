# package.root

[![NPM version](https://img.shields.io/npm/v/package.root.svg?style=flat)](https://www.npmjs.com/package/package.root "View this project on NPM")
[![NPM downloads](https://img.shields.io/npm/dm/package.root.svg?style=flat)](https://www.npmjs.com/package/package.root "View this project on NPM")
[![NPM license](https://img.shields.io/npm/l/package.root.svg?style=flat)](https://www.npmjs.com/package/package.root "View this project on NPM")
[![flattr](https://img.shields.io/badge/flattr-donate-yellow.svg?style=flat)](http://flattr.com/thing/3817419/luscus-on-GitHub)

![coverage](https://cdn.rawgit.com/luscus/package.root/master/reports/coverage.svg)
[![David](https://img.shields.io/david/luscus/package.root.svg?style=flat)](https://david-dm.org/luscus/package.root)
[![David](https://img.shields.io/david/dev/luscus/package.root.svg?style=flat)](https://david-dm.org/luscus/package.root#info=devDependencies)

Enables to find the root package in the package hierarchy.
It checks recursively for a `package.json` beginning in the first directory of its path.

Automatically loads and executes plugins using the prefix `root.info.<scope>` as package names and located in the same `node_modules` folder.
Those plugins enhance the returned Root Package Information object with more information.

About Bower for example: [root.info.bower](https://github.com/luscus/root.info.bower)
(package provided to ensure backwards functionality with `package.root` 0.x.x)

Added information are stored in a property based on the plugin name without the prefix: for `root.info.bower` in `bower`


## Installation

### Node Dependency

Execute following line

    npm install package.root --save

Add Bower information plugin

    npm install root.info.bower --save


### Require module

    var root = require('package.root');


## Usage

Returns an Object with following properties:

* `name`: name of the root module
* `directory`: directory name of the root module (may be different from package name)
* `deployPath`: absolute path to the root package deploy directory
* `path`: absolut path to the root module directory
* `package`: root module's *package.json* content

Example:

    var root = require('package.root');

    // get parent module's name
    var name = root.name
    // or with the package object
    name = root.package.name

    // get root path
    var path = root.path
    
    // if Bower plugin present and bower file was found
    var bowerDir = root.bower.directory

## Write Plugins

Plugin packages have to return a function taking the Root Package Information object as argument.

Plugins returning `null` or `undefined` will be ignored.

    module.exports = function pluginX (root) {
      var info = {};
      
      /* do something in root to fill info*/
      
      return info;
    };

-------------------
Copyright (c) 2015 Luscus (luscus.redbeard@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
