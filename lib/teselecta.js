/*!
 * TODO
 * Copyright(c) 2016 Anatol Sommer <anatol@anatol.at>
 * MIT Licensed
 */

'use strict';

var JSONregex=/( +)((")((?:[^"\\]|\\.)*)")?(:?) ?("?)([^",{[\n]*)("?)([,{[\]]*)\n/g,
  cl=require('colors/safe');

function detectType(val) {
  if (val===Number(val).toString()) {
    val=Number(val);
  } else if (val==='true') {
    val=true;
  } else if (val==='false') {
    val=false;
  }
  return val;
}

function highlightJSON(str, space, x, quot0, key, prop, quot1, val, quot2, end) {
  if (!key && (val===']' || val==='}')) {
    return str;
  }
  quot0=quot0 ? cl[teselecta.QUOTATION](quot0) : '';
  quot1=quot1 ? cl[teselecta.QUOTATION](quot1) : '';
  if (key && !val && (!end || end===',')) {
    key=key ? cl[teselecta.STRING](key) : '';
  } else {
    key=key ? cl.bold(cl[teselecta.KEY](key)) : '';
  }
  prop=prop ? prop+' ' : '';
  val=val || '';
  if (end==='{' || end==='[') {
    val='';
  } else {
    val=(quot1 ? cl[teselecta.STRING](val) : teselecta(detectType(val)));
  }
  return space+quot0+key+quot0+prop+quot1+val+quot1+end+'\n';
}

function teselecta(val) {
  var color;
  if (typeof val==='number' || val===true || val===false) {
    color={true:teselecta.TRUE, false:teselecta.FALSE}[val] || teselecta.NUMBER;
    val=cl[color](val.toString());
  } else if (typeof val==='object') {
    val=JSON.stringify(val, null, 2);
    val=val.replace(JSONregex, highlightJSON);
  } else if (typeof val==='string') {
    return cl[teselecta.STRING](val);
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

