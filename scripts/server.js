var express = require('express');
var app = express();

app.get('/', function(req, res) {

	res.send('HELLO CRYPTO WORLD!');
});

app.listen(3000, function(){

	console.log('API NOW LISTENING ON PORT 3000');
});