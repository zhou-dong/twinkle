var fs = require('fs');
var readline = require('readline');

// Use Trie structure to instore words to save memory space
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
	this.contains = function(word, self) {
		if (!word || word === self) {
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
var Concatenated = function(dictionary) {
	var checker = function(word) {
		if (!word)
			return false;
		var dp = createDpTable(word.length);
		for (var k = 0; k <= word.length; k++) {
			for (var i = 0; i + k <= word.length; i++) {
				if (dictionary.contains(word.substring(i, i + k), word)) {
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
	return checker;
}

var WordsContainer = function() {
	this.words = [];
	this.concatenatedWords = [];
	this.addWord = function(word) {
		this.words.push(word);
	};
	this.addConcatenatedWord = function(word) {
		this.concatenatedWords.push({
			'word': word,
			'length': word.length
		});
	};
	this.sortConcatenatedWords = function() {
		this.concatenatedWords.sort(function(a, b) {
			return b.length - a.length;
		});
	}
}

var path = "wordsforproblem.txt";

var trie = new Trie();
var isConcatenated = Concatenated(trie);
var container = new WordsContainer();

// read file line by line, after read finish, begin to execute
var lineReader = readline.createInterface({
	input: fs.createReadStream(path)
});
lineReader.on('line', function(line) {
	container.addWord(line);
	trie.insert(line);
}).on('close', function() {
	findConcatenatedWords();
	printResult();
});

var findConcatenatedWords = function() {
	container.words.forEach(function(word) {
		if (isConcatenated(word)) {
			container.addConcatenatedWord(word);
		}
	});
	container.sortConcatenatedWords();
};

var printResult = function() {
	console.log("The longest concatenated word is:", container.concatenatedWords[0].word);
	console.log("The second concatenated word is:", container.concatenatedWords[1].word);
	console.log("The total number of concatenated words is:", container.concatenatedWords.length)
};