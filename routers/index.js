var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	//console.log('Time: ', Date.now());
	next();
});

router.get('/', function(req, res) {
	var indexInfo = {
		author: 'Dong Zhou',
		title: "Home",
		description: "",
		keywords: ""
	};
	res.render('pages/index', indexInfo);
});

module.exports = router