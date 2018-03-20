var express = require('express');
var app = express();
var http = require('http');
var router = express.Router();




router.get("/", function(req, res){
	res.json({"message" : "Hello World"});
});


router.post("/test-params", function(req, res){
	if(req.params.name == "Paul"){
		res.json({"status" : "WORKS!"});

	}else{
		res.json({"status" : "BAD NAME!"});

	}
});



app.use("/api",router);

app.listen(3000, function(){
	console.log('API NOW LISTENING ON PORT 3000');
});

