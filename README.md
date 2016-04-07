# teselecta
JSON.stringify with colors

![Screenshot](https://raw.githubusercontent.com/anatolsommer/teselecta/master/screenshot.png)

## Usage:
```js
var teselecta=require('teselecta'), text;

text=teselecta({
  wibbly:'wobbly',
  stuff:['timey', 'wimey'],
  releaseYear:1963,
  tardis:{
    type:'Space-time vessel',
    chameleonCircuit:{broken:true, works:false},
  }
});

console.log(text);
```


### Produce html code:
```js
teselecta.html=true;
```

Example css:
```css
.json { font-family: monospace; }
.json>.teselecta-quotation { color: #444; }
.json>.teselecta-key { color: #00008b; }
.json>.teselecta-string { color: #00f; }
.json>.teselecta-number { color: #800080; }
.json>.teselecta-true { color: #008000; }
.json>.teselecta-false { color: #f00; }
```

To change the class names from `teselecta-*` to `something-*`:
```js
teselecta.cssPrefix='something';
```

To use inline styles instead of classes:
```js
teselecta.css='inline';
```


### Change the default colors:
```js
teselecta.QUOTATION='grey';
teselecta.KEY='blue';
teselecta.STRING='cyan';
teselecta.NUMBER='magenta';
teselecta.TRUE='green';
teselecta.FALSE='red';
```


## Tests
Run tests with `npm test` or generate coverage reports with `npm run test-cov`.


## License
#### MIT

