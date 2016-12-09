
require('chai').should();
var expect     = require('chai').expect;
var loader     = require('package.loader');
var Path       = require('path');
var rootPath   = Path.normalize(__dirname + Path.sep + '..');
var rootDir    = Path.basename(rootPath);

// mock bower plugin
var pluginOutput = 'bower loaded';
loader.mock('root.info.bower', function () {
    return pluginOutput;
});

// mock plugin without output
loader.mock('root.info.invalid', function () {
    return null;
});

var root     = require('../lib/package.root');
var crawler  = require('../lib/crawler');
var self     = require(root.path + '/package.json');

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - package.root ', function() {

    describe('crawler', function() {
        it('should ignore ".nvm" directories', function () {
            // should not throw any error because .nvm directories are ignored
            expect(crawler('/test/path/.nvm')).to.equal(null);
        });

        it('should throw an error if no package.json file was found', function () {
            expect(crawler.bind(null, '/test/path/to/some/package')).to.Throw('no root package found');
        });
    });

    describe('Object', function() {
        it('should be an Object', function () {
            root.should.be.a('object');
        });

        it('should have a property "name"', function () {
            root.should.have.property('name');
            root.name.should.be.a('string');
            root.name.should.equal(self.name);
        });

        it('should have a property "directory"', function () {
            root.should.have.property('directory');
            root.directory.should.be.a('string');
            root.directory.should.equal(rootDir);
        });

        it('should have a property "path"', function () {
            root.should.have.property('path');
            root.path.should.be.a('string');
            root.path.should.equal(rootPath);
        });

        it('should have a property "deployPath"', function () {
            root.should.have.property('deployPath');
            root.deployPath.should.be.a('string');
            root.deployPath.should.equal(Path.dirname(root.path));
        });

        it('should have a property "package"', function () {
            root.should.have.property('package');
            root.package.should.be.a('object');
            root.package.should.deep.equal(self);
        });
    });


    describe('plugin loader', function() {

        it('should have loaded mocked bower', function () {
            root.should.have.property('bower');
        });

        it('should have stored plugin output', function () {
            root.bower.should.be.a('string');
            root.bower.should.equal(pluginOutput);
        });

        it('should have ignored plugin without output', function () {
            root.should.not.have.property('invalid');
        });
    });
});
