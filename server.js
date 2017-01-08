var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');

var projectConfig = require('./config/project.config');
var about = require('./routers/about');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/about', about);
app.get('/', function(req, res) {
	res.render('pages/index', projectConfig);
});

var server = app.listen(projectConfig.server_port, function() {
	//var host = server.address().address
	var host = projectConfig.server_host;
	var port = server.address().port;
	console.log("Node running at http://%s:%s", host, port)
});