var express = require('express');
var app = express();
var http = require('http');
var router = express.Router();




router.get("/", function(req, res){
	res.json({"message" : "Hello World"});
});


router.post("/test-params", function(req, res){
	var response = {"name" : req.params.name, "status": ""};

	if(req.params.name == "Paul"){
		response.status = "WORKS!"
	}else{
		response.status = "BAD NAME!"

	}
	res.json(response);
});



app.use("/api",router);

app.listen(3000, function(){
	console.log('API NOW LISTENING ON PORT 3000');
});

