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

router.get('/', function(req, res) {
	res.send('about home page');
});

console.log(projectConfig);

router.get('/about', function(req, res) {
	res.render('pages/about', projectConfig);
});

module.exports = router