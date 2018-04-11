var MongoClient = require( 'mongodb' ).MongoClient;
module.exports = {
	

	newUser : function(data){

		var bitcore = require('bitcore-lib');

		var value = new Buffer(data.seed);
		var hash = bitcore.crypto.Hash.sha256(value);
		var bn = bitcore.crypto.BN.fromBuffer(hash);


		var privateKey = new bitcore.PrivateKey(bn, 'testnet');
		var privateKeyWif = privateKey.toWIF();

		var publicKey = new bitcore.PublicKey(privateKey);
		var address = privateKey.toAddress();
		console.log("New Address for: " + data.name + ", " + address);
    	
    	MongoClient.connect( "mongodb://localhost:27017/", function( err, db ) {
			const database= db.db('bittapdb')


			var doc = {
				name: data.name,
				public_key: publicKey,
				address:address,
				balance: 0
			}
			database.collection( 'users' ).insertOne(doc, function(err, res) {
			    if (err) throw err;
			    console.log("1 document inserted");
			    db.close();
			});
		});

    	console.log("Returning: " + privateKeyWif);
		return privateKeyWif;

	},

	update : function(data, userId){

	},

	getUser : function(userId){


	}
}
