var express = require('express');
var request = require("request");
var router = express.Router();

router.use(express.json());



router.post("/transact", function(req, res){
	


}

router.post("/users/:userid", function(req, res){
	
	

}
router.get("/users/:userid", function(req, res){
	
	
}

router.post("/test-body", function(req, res){
	var response = {"name" : req.body.name, "status": ""};

	if(req.body.name == "Paul"){
		response.status = "WORKS!"
	}else{
		response.status = "BAD NAME!"
	}
	res.json(response);
});


router.get("/", function(req, res){
	res.json({"message" : "Hello World"});
});



module.exports.router = router;