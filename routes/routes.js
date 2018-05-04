var express = require('express');
var request = require("request");
var router = express.Router();
var userService = require('../scripts/users');

router.use(express.json());


//new transaction
router.post("/transact", function(req, res){
	


});

//new user
router.post("/users/", function(req, res){
	response = {"pkWIF" : ""};
	response.pkWIF = userService.newUser(req.body);
	res.json(response);
});
//update
router.post("/users/:userId", function(req, res){
	response = {"status": false}
	response.status = userService.update(req.body, req.param("userId"));
	res.json(response);
});
//get user
router.get("/users/:userid", function(req, res){
	
	
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


router.get("/", function(req, res){
	res.json({"message" : "Hello World"});
});



module.exports = router;