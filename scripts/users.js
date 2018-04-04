module.exports = {
	newUser : function(data){
		var mongoUtil = require( 'mongoUtil' );
		var db = mongoUtil.getDb();
		var bitcore = require('bitcore-lib');

		var value = new Buffer(data.seed);
		var hash = bitcore.crypto.Hash.sha256(value);
		var bn = bitcore.crypto.BN.fromBuffer(hash);


		var privateKey = new bitcore.PrivateKey(bn, 'testnet');
		var privateKeyWif = privateKey.toWif();

		var publicKey = new bitcore.PublicKey(privateKey);
		var address = privateKey.toAddress();
		console.log("New Address for: " + data.name + ", " + address);

		db.collection( 'users' ).insertOne({
			"name": data.name,
			"public_key": publicKey,
			"address":address,
			"balance": 0
		});

		return privateKeyWif;

	},

	update : function(data, userId){

	},

	getUser : function(userId){


	}
}