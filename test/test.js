var assert=require('assert'), teselecta=require('../');

require('colors');

describe('teselecta', function() {

  it('should make numbers magenta', function() {
    assert.equal(teselecta(42), '42'.magenta);
  });
  it('should make strings cyan', function() {
    assert.equal(teselecta('foo'), '"'.grey+'foo'.cyan+'"'.grey);
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
  it('should render an array', function() {
    var res='{\n';
    res+='  '+'"'.grey+'arr'.blue.bold+'"'.grey+': [\n';
    res+='    '+'1'.magenta+',\n';
    res+='    '+'"'.grey+'2,3'.cyan+'"'.grey+',\n';
    res+='    '+'true'.green+',\n';
    res+='    '+'false'.red+',\n';
    res+='    '+'"'.grey+'"'.grey+'\n';
    res+='  ]\n';
    res+='}';
    assert.equal(teselecta({arr:[1,"2,3",true,false,""]}), res);
  });
  it('should work with empty arrays and objects', function() {
    var res='{\n';
    res+='  '+'"'.grey+'foo'.blue.bold+'"'.grey+': [],\n';
    res+='  '+'"'.grey+'bar'.blue.bold+'"'.grey+': {}\n';
    res+='}';
    assert.equal(teselecta({foo:[], bar:{}}), res);
    res='{\n';
    res+='  '+'"'.grey+'foo'.blue.bold+'"'.grey+': {},\n';
    res+='  '+'"'.grey+'bar'.blue.bold+'"'.grey+': []\n';
    res+='}';
    assert.equal(teselecta({foo:{}, bar:[]}), res);
  });
  it('should use "spacing" option', function() {
    var res='  {\n';
    res+='    '+'"'.grey+'foo'.blue.bold+'"'.grey+': '+'1'.magenta+',\n';
    res+='    '+'"'.grey+'bar'.blue.bold+'"'.grey+': '+'"'.grey+'baz'.cyan+'"'.grey+'\n';
    res+='  }';
    assert.equal(teselecta({foo:1, bar:'baz'}, {spacing:2}), res);
  });
  it('should use "prepend" option', function() {
    var res='  XXX{\n';
    res+='    '+'"'.grey+'foo'.blue.bold+'"'.grey+': '+'1'.magenta+',\n';
    res+='    '+'"'.grey+'bar'.blue.bold+'"'.grey+': '+'"'.grey+'baz'.cyan+'"'.grey+'\n';
    res+='  }';
    assert.equal(teselecta({foo:1, bar:'baz'}, {spacing:2, prepend:'XXX'}), res);
  });
  it('should use custom colors', function() {
    teselecta.STRING='green';
    assert.equal(teselecta('foo'), '"'.grey+'foo'.green+'"'.grey);
  });

});
