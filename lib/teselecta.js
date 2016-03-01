/*!
 * teselecta
 * Copyright(c) 2016 Anatol Sommer <anatol@anatol.at>
 * MIT Licensed
 */
/* global define */
/* jshint node:true, strict:true */

(function() {

  'use strict';

  var JSONEXP=/( +)(?:(")((?:[^"\\]|\\.)*)")?(:?) ?(?:(")((?:[^"\\]|\\.)*)")?([^,{[\n]*)([,{[\]}]*)\n/g,
    colors;

  if (typeof global==='object' && global && global.global===global) {
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
    if (key && typeof key.bold==='string') {
      key=key.bold;
    }
    prop=(prop ? prop+' ' : '');
    if (end[0]==='{' || end[0]==='[') {
      val='';
    } else if (val==='true' || val==='false') {
      val=teselecta(val==='true');
    } else if (val) {
      val=teselecta(Number(val));
    } else {
      val=teselecta(strval);
    }
    if (!colors || teselecta.html) {
      space=space.replace(/ /g, '&nbsp;');
    }
    return space+quot0+key+quot0+prop+val+end+'\n';
  }

  function teselecta(val, opts) {
    var type, space, quot;
    opts=opts || {};
    opts.indent=opts.indent || 2;
    if (typeof val==='number' || val===true || val===false) {
      type={true:'TRUE', false:'FALSE'}[val] || 'NUMBER';
      val=colorize(type, val.toString());
    } else if (typeof val==='object') {
      val=JSON.stringify(val, null, opts.indent);
      val=val.replace(JSONEXP, highlightJSON);
    } else {
      quot=colorize('QUOTATION', '"');
      val=quot+colorize('STRING', val)+quot;
    }
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

  teselecta.cssPrefix='json';

  function DefaultColor(color) {
    this.color=color;
  }

  DefaultColor.prototype.toString=function() {
    return this.color;
  };

  if (typeof define==='function' && define.amd) {
    define('teselecta', function() {
      return teselecta;
    });
  } else if (typeof module==='object' && module && module.exports) {
    module.exports=teselecta;
  } else if (typeof window==='object' && window && window===window.window) {
    window.teselecta=teselecta;
  }

})();
