var fs = require('fs');
var readline = require('readline');

var Trie = function() {
	var TrieNode = function() {
		this.isWord = false;
		this.children = {};
	}

	this.root = new TrieNode();

	this.insert = function(word) {
		if (!word) {
			return;
		}
		var current = this.root;
		for (var i = 0; i < word.length; i++) {
			var ch = word.charAt(i);
			if (!current.children[ch]) {
				current.children[ch] = new TrieNode();
			}
			current = current.children[ch];
		}
		current.isWord = true;
	}

	this.contains = function(word) {
		if (!word) {
			return false;
		}
		var current = this.root;
		for (var i = 0; i < word.length; i++) {
			var ch = word.charAt(i);
			if (!current.children[ch]) {
				return false;
			} else {
				current = current.children[ch];
			}
		}
		return current.isWord;
	}
}

// Use dynamic programming to determine if the word can be segmented into one or more words. 
var WordBreaker = function(dictionary) {

	var breaker = function(word) {
		var dp = createDpTable(word.length);
		for (var k = 0; k <= word.length; k++) {
			for (var i = 0; i + k <= word.length; i++) {
				if (dictionary.contains(word.substring(i, i + k))) {
					dp[i][i + k - 1] = true;
				} else {
					for (var j = 0; j < k; j++) {
						if (dp[i][j] && dp[j + 1][i + k - 1]) {
							dp[i][i + k - 1] = true;
							break;
						}
					}
				}
			}
		}
		return !dp[0][dp.length - 1] ? false : true;
	}

	var createDpTable = function(length) {
		var table = new Array(length);
		for (var i = 0; i < length; i++) {
			table[i] = new Array(length);
		}
		return table;
	}

	return breaker;
}

// var path = "/Users/zhoudong/Downloads/wordsforproblem.txt";
var path = "wordsforproblem.txt";
var trie = new Trie();

var lineReader = readline.createInterface({
	input: fs.createReadStream(path)
});

lineReader.on('line', function(line) {
	trie.insert(line);
});
lineReader.on('close', function() {

	var wordBreak = WordBreaker(trie);

	console.log(wordBreak('ratcatdogcat'))
});