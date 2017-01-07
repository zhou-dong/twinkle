var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');

var about = require('./routers/about');
var index = require('./routers/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/about', about);
app.use('/', index);

var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port
	console.log("Server is listening at http://%s:%s", host, port)
});