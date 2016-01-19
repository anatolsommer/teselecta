var assert=require('assert'), teselecta=require('../');

require('colors');

describe('teselecta', function() {

  it('should make numbers magenta', function() {
    assert.equal(teselecta(42), '42'.magenta);
  });
  it('should make strings cyan', function() {
    assert.equal(teselecta('foo'), 'foo'.cyan);
  });
  it('should make true green', function() {
    assert.equal(teselecta(true), 'true'.green);
  });
  it('should make false red', function() {
    assert.equal(teselecta(false), 'false'.red);
  });
  it('should colorize basic object', function() {
    var res='{\n';
    res+='  '+'"'.grey+'foo'.blue.bold+'"'.grey+': '+'1'.magenta+',\n';
    res+='  '+'"'.grey+'bar'.blue.bold+'"'.grey+': '+'"'.grey+'baz'.cyan+'"'.grey+'\n';
    res+='}';
    assert.equal(teselecta({foo:1, bar:'baz'}), res);
  });
  it('should make strings green if STRING=green', function() {
    teselecta.STRING='green';
    assert.equal(teselecta('foo'), 'foo'.green);
  });

});
