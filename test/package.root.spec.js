var should = require('chai').should(),
    root   = require('../lib/package.root'),
    self   = require(root.path + '/package.json');



describe('ROOT:', function(){

  it('should be an Object', function(){
    root.should.be.a('object');
  });

  it('should have a property "name"', function(){
    root.should.have.property('name');
    root.name.should.be.a('string');
    root.name.should.equal(self.name);
  });

  it('should have a property "directory"', function(){
    root.should.have.property('directory');
    root.name.should.be.a('string');
  });

  it('should have a property "path"', function(){
    root.should.have.property('path');
    root.path.should.be.a('string');
  });

  it('should have a property "package"', function(){
    root.should.have.property('package');
    root.package.should.deep.equal(self);
  });
});
