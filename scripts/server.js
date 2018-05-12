
	
var express = require('express');
var MongoClient = require( 'mongodb' ).MongoClient;
var app = express();

MongoClient.connect( "mongodb://localhost:27017/", ( err, db ) => {
const database = db.db('bittapdb')
require("../routes/routes") (app, db);

app.listen(3000, function(){
	console.log('API NOW LISTENING ON PORT 3000');
});

});