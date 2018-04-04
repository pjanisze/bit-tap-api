var mongoUtil = require( './mongoUtil' );
mongoUtil.connectToServer( function( err ) {




var express = require('express');
var app = express();



app.use("/api", require("../routes/routes"));

app.listen(3000, function(){
	console.log('API NOW LISTENING ON PORT 3000');
});

});