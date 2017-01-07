var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');

var about = require('./routers/about');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser())
app.use(express.static('public'));

app.use('/about', about);

app.get('/', function(req, res) {
	console.log("Cookies: ", req.cookies);
	res.send("Hello World...");
	res.render('pages/index') ;
});

var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port)
});