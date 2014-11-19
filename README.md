# package.root.finder

[![NPM version](https://badge.fury.io/js/package.root.finder.svg)](http://badge.fury.io/js/package.root.finder)
[![dependencies](https://david-dm.org/luscus/package.root.finder.svg)](https://david-dm.org/luscus/package.root.finder)
[![devDependency Status](https://david-dm.org/luscus/package.root.finder/dev-status.svg?theme=shields.io)](https://david-dm.org/luscus/package.root.finder#info=devDependencies)

Enables to find the first package in the path hierarchy.
It checks recursively for a `package.json` beginning in the first directory of its path.

Bower information are completed with the `directory` property normaly stored in the `.bowerrc` file.


Take a look to the [TODO](https://github.com/luscus/package.root.finder/blob/master/TODO.md) if you want to help towards the next steps.



## Installation

### Node Dependency

Execute following line

    npm install package.root.finder@0.1.x --save


### Require module

    var root = require('package.root.finder');


## Usage

Returns an Object with following properties:

* `name`: the name of the parent module
* `directory`: the directory of the parent module
* `package`: the parent module's *package.json* content
* `bower`: the parent module's *bower.json* content or *false* if no bower is used. Also holds the `directory` property.
* `path`: absolut path to the parent module directory

Access the values with the point notation:

    var root = require('package.root.finder');

    // get parent module's name
    root.name
    // or
    root.package.name

    // get root path
    root.path

    // get bower directory
    root.bower.directory



-------------------
Copyright (c) 2014 Luscus (luscus.redbeard@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
