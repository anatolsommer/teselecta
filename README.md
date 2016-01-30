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

