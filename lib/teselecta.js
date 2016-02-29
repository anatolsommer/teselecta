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

  function colorize(color, val) {
    if (colors && !teselecta.html) {
      return colors[color](val);
    } else {
      return '<span style="color:'+color+';">'+val+'</span>';
    }
  }

  function highlightJSON(str, space, quot0, key, prop, quot1, strval, val, end) {
    if (!colors || teselecta.html) {
      space=space.replace(/ /g, '&nbsp;');
    }
    if (!key && (val===']' || val==='}')) {
      return space+val+end+'\n';
    }
    quot0=(quot0 ? colorize(teselecta.QUOTATION, quot0) : '');
    if (!val && !quot1 && (!end || end===',')) {
      key=colorize(teselecta.STRING, key);
      return space+quot0+key+quot0+end+'\n';
    }
    key=(key ? colorize(teselecta.KEY, key) : '');
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
    var color, space, quot;
    opts=opts || {};
    opts.indent=opts.indent || 2;
    if (typeof val==='number' || val===true || val===false) {
      color={true:teselecta.TRUE, false:teselecta.FALSE}[val] || teselecta.NUMBER;
      val=colorize(color, val.toString());
    } else if (typeof val==='object') {
      val=JSON.stringify(val, null, opts.indent);
      val=val.replace(JSONEXP, highlightJSON);
    } else {
      quot=colorize(teselecta.QUOTATION, '"');
      val=quot+colorize(teselecta.STRING, val)+quot;
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
  teselecta.STRING='cyan';
  teselecta.NUMBER='magenta';
  teselecta.TRUE='green';
  teselecta.FALSE='red';

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
