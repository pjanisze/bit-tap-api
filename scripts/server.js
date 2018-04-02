var express = require('express');
var app = express();
var http = require('http');
var router = express.Router();

app.use("/api",router);
router.use(express.json());

router.get("/", function(req, res){
	res.json({"message" : "Hello World"});
});


router.post("/test-body", function(req, res){
	var response = {"name" : req.body.name, "status": ""};

	if(req.body.name == "Paul"){
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

