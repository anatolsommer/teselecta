# teselecta
JSON.stringify with colors


![Screenshot](https://raw.githubusercontent.com/anatolsommer/teselecta/screenshot.png)

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

console.log(json);
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


## License

#### MIT

