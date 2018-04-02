var mysql = require('mysql');

<<<<<<< HEAD
Mongo
Client.connect(url, function(err, db) {
=======
var con = mysql.createConnection({
  host: "localhost",
  user: "bit-tap",
  password: "bit-tap"
});

con.connect(function(err) {
>>>>>>> 946880feee7b90654b5aec8e5aea109039abb450
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
