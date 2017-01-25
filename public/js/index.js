function Element(title, weight) {
	this.title = title;
	this.weight = initWeight(weight);

	function initWeight(weight) {
		return !weight ? getRandom(4, 10) : weight;
	}
}

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
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

var language = ['R Language', 'Python', 'Java', 'JavaScript'];
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

// ---------------------------- d3 -----------------------------------


var svgHeight = 600;
var svgWidth = 1200;
var margin = 200;
var color = d3.scaleOrdinal(d3.schemeCategory20);

var dataSet = data.elements;
dataSet.forEach(function(data) {
	data.color = color(data.weight);
	data.cx = getRandom(50, svgWidth - 100);
	data.cy = getRandom(100, svgHeight - margin);
	data.r = data.title.length * 6;
});



var svg = d3.select('body').append('svg').attr('width', svgWidth).attr('height', svgHeight);

var circles = svg.selectAll('circle').data(dataSet).enter().append('circle');
circles.attr('cx', function(d) {
	return d.cx;
}).attr('cy', function(d) {
	return d.cy;
}).attr('r', function(d) {
	return d.r;
}).style('fill', function(d) {
	return d.color;
});


var texts = svg.selectAll('text').data(dataSet).enter().append('text');
texts.attr('x', function(d) {
		return d.cx - d.r + 3;
	}).attr('y', function(d) {
		return d.cy + 3;
	}).text(function(d) {
		return d.title.toUpperCase();
	})
	.attr('font-size', '15px')
	.attr('fill', 'black')
	.attr('font-family', 'Raleway');

//



//



//