var express = require('express');
var router = express.Router();
var path = require('path');

var appDir = path.dirname(require.main.filename);
var configDir = path.join(appDir, "config");
var projectConfig = require(configDir + "/project.config");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});


var author = {
	name: 'Dong Zhou'
}

author.contactInfo = {
	email: 'rick0913@gmail.com',
	github: 'https://github.com/zhou-dong'
}

author.languages = ['Java', 'JavaScript', 'Python', 'R'];

author.crushOn = ['Coursera', 'GitHub', 'YouTube'];

author.sports = ['basketball', 'swimming', 'jogging'];


author.interested = ['Machine Learning', 'Search Engine', 'NodeJS & ReactJS'] ;

console.log(author);

var messageQueue = ['ZeroMQ', ''];



router.get('/', function(req, res) {
	res.send('about home page');
});



router.get('/about', function(req, res) {
	res.render('pages/about', projectConfig);
});

module.exports = router