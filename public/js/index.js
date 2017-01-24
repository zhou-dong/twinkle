function Element(title, weight) {
	this.title = title;
	this.weight = initWeight(weight);

	function initWeight(weight) {
		return !weight ? getRandom(1, 10) : weight;
	}

	function getRandom(min, max) {
		return Math.random() * (max - min) + min;
	}
}

function Data() {
	var self = this;
	this.elements = [];
	this.add = function(title, weight) {
		this.elements.push(new Element(title, weight));
	}
	this.addList = function(list) {
		list.forEach(function(element) {
			self.add(element);
		});
	}
}

var data = new Data();

var language = ['R', 'Python', 'Java', 'JavaScript'];
var os = ['Linux', 'RedHat', 'Ubuntu', 'CentOS', 'Fedora'];
var search = ['Elasticsearch', 'Solr', 'Lucene'];
var js = ['NodeJS', 'ReactJS', 'Redux', 'AngularJS', 'EJS', 'JQuary', 'Gulp'];
var mq = ['ZeroMQ', 'Netty', 'ActiveMQ'];
var db = ['MySql', 'LevelDB', 'MongoDB', 'Redis', 'Zookeeper'];
var container = ['Docker'];
var server = ['Tomcat & APR', 'Nginx', 'Nginx', 'Squid', 'Varnish'];
var bigData = ['Hadoop', 'Mahout', 'Mapreduce'];
var classic = ['JDBC', 'Servlet', 'Spring', 'Struts', 'Hibernate', 'JSP', 'JSTL'];
classic.push('Freemarker');
classic.push('Velocity');
var frontEnd = ['HTML', 'CSS3', 'Bootstrap', 'ES6'];

data.addList(language);
data.addList(os);
data.addList(search);
data.addList(js);
data.addList(mq);
data.addList(db);
data.addList(container);
data.addList(server);
data.addList(bigData);
data.addList(classic);
data.addList(frontEnd);

console.log(data.elements.length);
console.log(data.elements);

// ---------------------------- d3 -----------------------------------

console.log(d3);