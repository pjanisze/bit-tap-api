var MongoClient = require( 'mongodb' ).MongoClient;
var ObjectId = require('mongodb').ObjectID;
module.exports = {
	

	newUser : function(data){

		var bitcore = require('bitcore-lib');

		var value = new Buffer(data.seed);
		var hash = bitcore.crypto.Hash.sha256(value);
		var bn = bitcore.crypto.BN.fromBuffer(hash);


		var privateKey = new bitcore.PrivateKey(bn, 'testnet');
		var privateKeyWif = privateKey.toWIF();

		var publicKey = new bitcore.PublicKey(privateKey).toString();
		var address = privateKey.toAddress().toString();
		console.log("New Address for: " + data.name + ", " + address);
    	
    	MongoClient.connect( "mongodb://localhost:27017/", function( err, db ) {
			const database= db.db('bittapdb')


			var doc = {
				name: data.name,
				public_key: publicKey,
				address:address,
				balance: 0
			}
			database.collection('users').insertOne(doc, function(err, res) {
			    if (err) throw err;
			    console.log("1 document inserted");
			    db.close();
			});
		});

    	console.log("Returning: " + privateKeyWif);
		return privateKeyWif;

	},

	update : function(data, userId){ 
		MongoClient.connect( "mongodb://localhost:27017/", function( err, db ) {
			const database= db.db('bittapdb')
			var id = {_id: ObjectId(userId)};
			var values = {$set: data};
			var query = database.collection('users').updateOne(id, values, function(err, res){
				if(err) throw err;

				console.log("Users collection updated for " + userId);
				db.close();
			});
		});

		return true;

	},

	getUser : function(userId){
		var user;
		MongoClient.connect( "mongodb://localhost:27017/", function( err, db ) {

		});
		console.log(user.name);
		return user;
	}
}
