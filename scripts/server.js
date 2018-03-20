var express = require('express');
var app = express();
var http = require('http');
var router = express.Router();




router.get("/", function(req, res){
	res.json
});



app.use("/api",router);

app.listen(3000, function(){
	console.log('API NOW LISTENING ON PORT 3000');
});

