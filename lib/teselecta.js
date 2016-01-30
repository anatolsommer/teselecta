/*!
 * teselecta
 * Copyright(c) 2016 Anatol Sommer <anatol@anatol.at>
 * MIT Licensed
 */
/* globals require,module */
/* jshint strict:global */

'use strict';

var JSONregex=/( +)((")((?:[^"\\]|\\.)*)")?(:?) ?("?)([^",{[\n]*)("?)([,{[\]}]*)\n/g,
  colors=require('colors/safe');

function detectType(val) {
  return val===Number(val).toString() ? Number(val) : val;
}

function highlightJSON(str, space, x, quot0, key, prop, quot1, val, quot2, end) {
  if (!key && (val===']' || val==='}')) {
    return str;
  }
  quot0=(quot0 ? colors[teselecta.QUOTATION](quot0) : '');
  quot1=(quot1 ? colors[teselecta.QUOTATION](quot1) : '');
  if (key && !val && !quot2 && (!end || end===',')) {
    key=colors[teselecta.STRING](key);
  } else {
    key=(key ? colors.bold(colors[teselecta.KEY](key)) : '');
  }
  prop=(prop ? prop+' ' : '');
  val=val || '';
  if (end==='{' || end==='[') {
    val='';
  } else {
    val=(quot1 ? colors[teselecta.STRING](val) : teselecta(detectType(val)));
  }
  return space+quot0+key+quot0+prop+quot1+val+quot1+end+'\n';
}

function teselecta(val, opts) {
  var color, space;
  opts=opts || {};
  opts.indent=opts.indent || 2;
  if (typeof val==='number' || val===true || val===false) {
    color={true:teselecta.TRUE, false:teselecta.FALSE}[val] || teselecta.NUMBER;
    val=colors[color](val.toString());
  } else if (typeof val==='object') {
    val=JSON.stringify(val, null, opts.indent);
    val=val.replace(JSONregex, highlightJSON);
  } else {
    val=colors[teselecta.STRING](val);
  }
  val=(opts.prepend || '')+val;
  if (opts.spacing) {
    space=Array(opts.spacing+1).join(' ');
    val=space+val.replace(/\n/g, '\n'+space);
  }
  return val;
}

teselecta.QUOTATION='grey';
teselecta.KEY='blue';
teselecta.STRING='cyan';
teselecta.NUMBER='magenta';
teselecta.TRUE='green';
teselecta.FALSE='red';

module.exports=teselecta;

