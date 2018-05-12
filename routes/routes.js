var express = require('express');
var request = require("request");
var router = express.Router();
var userService = require('../scripts/users');
var ObjectId = require('mongodb').ObjectID;
router.use(express.json());

module.exports = function(app, db){
	//new transaction
	app.post("/transact", function(req, res){
		


	});

	//new user
	app.post("/users/", function(req, res){
		var response = {"pkWIF" : ""};
		response.pkWIF = userService.newUser(req.body);
		res.json(response);
	});
	//update
	app.post("/users/:userId", function(req, res){
		var id = {_id: ObjectId(req.params.userId)};
		var values = {$set: req.body};
		var query = database.collection('users').updateOne(id, values, function(err, dbres){
			if(err) throw err;
			console.log("Users collection updated for " + userId);
			res.json(dbres);
		});
		// var response = {"status": false}
		// response.status = userService.update(req.body, req.params.userId);
		// res.json(response);
	});
	//get user
	app.get("/users/:userId", function(req, res){
		var response = userService.getUser(req.params.userId);
		console.log(response.name+"!!!!");
		res.json(response);
	});

	app.post("/test-body", function(req, res){
		var response = {"name" : req.body.name, "status": ""};

		if(req.body.name == "Paul"){
			response.status = "WORKS!"
		}else{
			response.status = "BAD NAME!"
		}
		res.json(response);
	});


	app.get("/", function(req, res){
		res.json({"message" : "Hello World"});
	});

};
