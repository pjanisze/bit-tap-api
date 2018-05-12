var express = require('express');
var request = require("request");
var router = express.Router();
var userService = require('../scripts/users');
var ObjectId = require('mongodb').ObjectID;
var bitcore = require('bitcore-lib');
router.use(express.json());

module.exports = function(app, db){
	//new transaction
	app.post("/transact", function(req, res){


	});

	//new user
	app.post("/users/", function(req, res){
		var data = req.body;

		var value = new Buffer(data.seed);
		var hash = bitcore.crypto.Hash.sha256(value);
		var bn = bitcore.crypto.BN.fromBuffer(hash);


		var privateKey = new bitcore.PrivateKey(bn, 'testnet');
		var privateKeyWif = privateKey.toWIF();

		var publicKey = new bitcore.PublicKey(privateKey).toString();
		var address = privateKey.toAddress().toString();
		console.log("New Address for: " + data.name + ", " + address);


		var doc = {
			name: data.name,
			public_key: publicKey,
			address:address,
			balance: 0
		}
		db.collection('users').insertOne(doc, function(err, dbres) {
		    if (err) throw err;
		    console.log("1 document inserted");
		    res.json(dbres);
		});
	});
	//update
	app.post("/users/:userId", function(req, res){
		var id = {_id: ObjectId(req.params.userId)};
		console.log(req.body.name);
		var values = {$set: req.body};
		var query = db.collection('users').updateOne(id, values, function(err, dbres){
			if(err) throw err;
			console.log("Users collection updated for " + req.params.userId);
			res.json(dbres);
		});
	});
	//get user
	app.get("/users/:userId", function(req, res){
		var id = {_id: ObjectId(req.params.userId)};
		var query = db.collection('users').findOne(id, function(err, dbres){
			if(err) throw err;
			res.json(dbres);
		});
	});



	app.get("/", function(req, res){
		res.json({"message" : "Hello World"});
	});

};
