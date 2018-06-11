

var express = require('express');
var MongoClient = require( 'mongodb' ).MongoClient;
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
require('dotenv').load();


const DB_URL = process.env.DB_URI|| '';
const DB_PORT = process.env.DB_PORT|| '';
const DB_URI = 'mongodb://' + DB_URL + ":" + DB_PORT + "/"

MongoClient.connect(DB_URI, ( err, db ) => {
const database = db.db('bittapdb');
require("./routes/routes") (app, database);

app.listen(3000, function(){
	console.log('API NOW LISTENING ON PORT 3000');
});

});
