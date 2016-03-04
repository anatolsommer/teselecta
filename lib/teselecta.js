/*!
 * teselecta
 * Copyright(c) 2016 Anatol Sommer <anatol@anatol.at>
 * MIT Licensed
 */
/* global define, window */
/* jshint node:true, strict:true */

(function() {
  'use strict';

  var JSONEXP=/( *)(?:(")((?:[^"\\]|\\.)*)")?(:?) ?(?:(")((?:[^"\\]|\\.)*)")?([^,{[\n]*)([,{[\]}]*)\n/g,
    colors;

  if (typeof process==='object' && typeof require==='function') {
    colors=require('colors/safe');
  }

  function colorize(type, val) {
    var color=teselecta[type];
    if (colors && !teselecta.html) {
      return colors[color](val);
    } else if (teselecta.css==='inline') {
      if (type==='STRING' && color instanceof DefaultColor) {
        color='darkblue';
      } else if (type==='NUMBER' && color instanceof DefaultColor) {
        color='purple';
      }
      return '<span style="color:'+color+';">'+val+'</span>';
    } else {
      type=type.toLowerCase();
      return '<span class="'+teselecta.cssPrefix+'-'+type+'">'+val+'</span>';
    }
  }

  function highlightJSON(str, space, quot0, key, prop, quot1, strval, val, end) {
    var quot;
    if (!colors || teselecta.html) {
      space=space.replace(/ /g, '&nbsp;');
    }
    if (!key && (val===']' || val==='}')) {
      return space+val+end+'\n';
    }
    quot0=(quot0 ? colorize('QUOTATION', quot0) : '');
    if (!val && !quot1 && (!end || end===',')) {
      key=colorize('STRING', key);
      return space+quot0+key+quot0+end+'\n';
    }
    key=(key ? colorize('KEY', key) : '');
    if (key && colors && !teselecta.html) {
      key=key.bold;
    }
    prop=(prop ? prop+' ' : '');
    if (end[0]==='{' || end[0]==='[') {
      val='';
    } else if (val==='true' || val==='false') {
      val=colorize(val.toUpperCase(), val);
    } else if (val) {
      val=colorize('NUMBER', val.toString());
    } else {
      quot=colorize('QUOTATION', '"');
      val=quot+colorize('STRING', strval)+quot;
    }
    if (!colors || teselecta.html) {
      space=space.replace(/ /g, '&nbsp;');
    }
    return space+quot0+key+quot0+prop+val+end+'\n';
  }

  function teselecta(val, opts) {
    var space;
    opts=opts || {};
    opts.indent=opts.indent || teselecta.indent;
    opts.spacing=opts.spacing || teselecta.spacing;
    opts.prepend=opts.prepend || teselecta.prepend;

    val=JSON.stringify(val, null, opts.indent)+'\n';
    val=val.replace(JSONEXP, highlightJSON).trim();
    val=(opts.prepend || '')+val;

    if (opts.spacing) {
      space=Array(opts.spacing+1).join(colors && !teselecta.html ? ' ' : '&nbsp;');
      val=space+val.replace(/\n/g, '\n'+space);
    }
    if (!colors || teselecta.html) {
      val=val.replace(/\n/g, '<br />');
    }
    return val;
  }

  teselecta.QUOTATION='grey';
  teselecta.KEY='blue';
  teselecta.STRING=new DefaultColor('cyan');
  teselecta.NUMBER=new DefaultColor('magenta');
  teselecta.TRUE='green';
  teselecta.FALSE='red';

  teselecta.indent=2;
  teselecta.cssPrefix='json';

  teselecta.init=function() {
    if (typeof define==='function' && define.amd) {
      define('teselecta', function() {
        return teselecta;
      });
    } else if (typeof window==='object' && window && window===window.window) {
      window.teselecta=teselecta;
    } else if (typeof module==='object' && module && module.exports) {
      module.exports=teselecta;
    }
  };

  teselecta.init();

  function DefaultColor(color) {
    this.color=color;
  }

  DefaultColor.prototype.toString=function() {
    return this.color;
  };

})();
