var fs = require('fs');
var readline = require('readline');

var path = "/Users/zhoudong/Downloads/wordsforproblem.txt";

var lineReader = readline.createInterface({
	input: fs.createReadStream(path)
});

lineReader.on('line', function(line) {
	console.log('line: ', line);
})