/*!
 * teselecta
 * Copyright(c) 2016 Anatol Sommer <anatol@anatol.at>
 * MIT Licensed
 */
/* globals require,module */
/* jshint strict:global */

'use strict';

var colors=require('colors/safe'),
  JSONEXP=/( +)(?:(")((?:[^"\\]|\\.)*)")?(:?) ?(?:(")((?:[^"\\]|\\.)*)")?([^,{[\n]*)([,{[\]}]*)\n/g;

function highlightJSON(str, space, quot0, key, prop, quot1, strval, val, end) {
  if (!key && (val===']' || val==='}')) {
    return str;
  }
  quot0=(quot0 ? colors[teselecta.QUOTATION](quot0) : '');
  if (!val && !quot1 && (!end || end===',')) {
    key=colors[teselecta.STRING](key);
    return space+quot0+key+quot0+end+'\n';
  }
  key=(key ? colors.bold(colors[teselecta.KEY](key)) : '');
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
  return space+quot0+key+quot0+prop+val+end+'\n';
}

function teselecta(val, opts) {
  var color, space, quot;
  opts=opts || {};
  opts.indent=opts.indent || 2;
  if (typeof val==='number' || val===true || val===false) {
    color={true:teselecta.TRUE, false:teselecta.FALSE}[val] || teselecta.NUMBER;
    val=colors[color](val.toString());
  } else if (typeof val==='object') {
    val=JSON.stringify(val, null, opts.indent);
    val=val.replace(JSONEXP, highlightJSON);
  } else {
    quot=colors[teselecta.QUOTATION]('"');
    val=quot+colors[teselecta.STRING](val)+quot;
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

