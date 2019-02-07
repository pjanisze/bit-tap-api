var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.json());
var paymentRouter = require("./routes/payment");
var usersRouter = require("./routes/users");
app.use('/users', usersRouter);
app.use('/transact', paymentRouter);

app.listen(3000, function(){
	console.log('API NOW LISTENING ON PORT 3000');
});
