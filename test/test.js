var assert=require('assert'), teselecta=require('../');

require('colors');

describe('terminal mode', function() {

  it('should make numbers magenta', function() {
    assert.equal(teselecta(42), '42'.magenta);
  });
  it('should make strings cyan', function() {
    assert.equal(teselecta('foo'), '"'.grey+'foo'.cyan+'"'.grey);
  });
  it('should handle "special" strings', function() {
    assert.equal(teselecta('"\\"\n\"'), '"'.grey+'\\"\\\\\\"\\n\\\"'.cyan+'"'.grey);
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
    res+='    '+'"'.grey+'foo'.blue.bold+'"'.grey+': '+'7'.magenta+',\n';
    res+='    '+'"'.grey+'bar'.blue.bold+'"'.grey+': '+'"'.grey+'baz'.cyan+'"'.grey+'\n';
    res+='  }';
    assert.equal(teselecta({foo:7, bar:'baz'}, {spacing:2, prepend:'XXX'}), res);
  });
  it('should use custom colors', function() {
    teselecta.FALSE='yellow';
    assert.equal(teselecta(false), 'false'.yellow);
    teselecta.FALSE='red';
  });

});

describe('html mode with classes', function() {

  before(function() {
    teselecta.html=true;
  });

  it('should use json-number for numbers', function() {
    assert.equal(teselecta(42), span('class', 'number', 42));
  });
  it('should use json-string for strings ', function() {
    assert.equal(teselecta('foo'), quot(span('class', 'string', 'foo')));
  });
  it('should use json-true for true', function() {
    assert.equal(teselecta(true), span('class', 'true', 'true'));
  });
  it('should use json-false for false', function() {
    assert.equal(teselecta(false), span('class', 'false', 'false'));
  });
  it('should colorize basic object', function() {
    var br='<br />', res='{'+br;
    res+='&nbsp;&nbsp;'+quot(span('class', 'key', 'foo'))+': '+span('class', 'number', 7)+','+br;
    res+='&nbsp;&nbsp;'+quot(span('class', 'key', 'bar'))+': '+quot(span('class', 'string', 'baz'))+br;
    res+='}';
    assert.equal(teselecta({foo:7, bar:'baz'}), res);
  });
  it('should use spacing', function() {
    assert.equal(teselecta(23, {spacing:2}), '&nbsp;&nbsp;'+span('class', 'number', 23));
  });
  it('should use custom prefix', function() {
    teselecta.cssPrefix='teselecta';
    assert.equal(teselecta(23), span('class', 'number', 23, 'teselecta'));
  });

});

describe('html mode with inline css', function() {

  before(function() {
    teselecta.css='inline';
  });

  it('should make numbers purple', function() {
    assert.equal(teselecta(42), span('style', 'purple', 42));
  });
  it('should make strings darkblue ', function() {
    assert.equal(teselecta('foo'), quot(span('style', 'darkblue', 'foo'), true));
  });
  it('should make true green', function() {
    assert.equal(teselecta(true), span('style', 'green', 'true'));
  });
  it('should make false red', function() {
    assert.equal(teselecta(false), span('style', 'red', 'false'));
  });
  it('should colorize basic object', function() {
    var br='<br />', res='{'+br;
    res+='&nbsp;&nbsp;'+quot(span('style', 'blue', 'foo'), true)+': '+span('style', 'purple', 7)+','+br;
    res+='&nbsp;&nbsp;'+quot(span('style', 'blue', 'bar'), true)+': '+quot(span('style', 'darkblue', 'baz'), true)+br;
    res+='}';
    assert.equal(teselecta({foo:7, bar:'baz'}), res);
  });
  it('should use custom colors', function() {
    teselecta.FALSE='yellow';
    assert.equal(teselecta(false), span('style', 'yellow', 'false'));
  });
  it('should allow to use terminal default color', function() {
    teselecta.STRING='cyan';
    assert.equal(teselecta('foo'), quot(span('style', 'cyan', 'foo'), true));
  });

});

describe('exports', function() {

  it('should call amd define if available', function(done) {
    global.define=function(name, func) {
      delete global.define;
      assert.equal(name, 'teselecta');
      assert.equal(func(), teselecta);
      done();
    };
    global.define.amd=true;
    teselecta.init();
  });

  it('should export to window otherwise', function() {
    global.window={};
    global.window.window=global.window;
    teselecta.init();
    assert.equal(global.window.teselecta, teselecta);
    delete global.window;
  });

});

function quot(val, inl) {
  var quotation=span((inl ? 'style' : 'class'), (inl ? 'grey' : 'quotation'), '"');
  return quotation+val+quotation;
}

function span(prop, val, content, prefix) {
  if (prop==='class') {
    val=(prefix || 'json')+'-'+val;
  } else {
    val='color:'+val+';';
  }
  return '<span '+prop+'="'+val+'">'+content+'</span>';
}
