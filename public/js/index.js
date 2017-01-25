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

var svgHeight = window.innerHeight;
var svgWidth = window.innerWidth;
var color = d3.scaleOrdinal(d3.schemeCategory20);

var dataSet = data.elements;
dataSet.forEach(function(data) {
	var cx = getRandom(50, svgWidth - 50);
	var cy = getRandom(50, svgHeight - 50);
	data.r = data.title.length * 6;
	data.color = color(data.weight);
	data.cx = cx;
	data.cy = cy;
});

var svg = d3.select('body').append('svg').attr('width', svgWidth).attr('height', svgHeight);

var drag = d3.drag().on('start', function(d) {
	d3.select(this).raise().classed("active", true);
}).on('drag', function(d) {
	d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}).on('end', function(d) {
	d3.select(this).classed("active", false);
});

var circles = svg.selectAll('circle').data(dataSet).enter().append('circle');
circles.attr('cx', function(d) {
	return d.cx;
}).attr('cy', function(d) {
	return d.cy;
}).attr('r', function(d) {
	return d.r;
}).style('fill', function(d) {
	return d.color;
}).on('mouseover', function(d) {
	//console.log(d.title);
}).call(drag);

circles.each(collide(.5));

var texts = svg.selectAll('text').data(dataSet).enter().append('text');
texts.attr('x', function(d) {
	return d.cx - d.r + 3;
}).attr('y', function(d) {
	return d.cy + 3;
}).text(function(d) {
	//return d.title.toUpperCase();
	return "";
}).attr('font-size', '15px').attr('fill', 'black').attr('font-family', 'Raleway');


// Resolves collisions between d and all other circles.
function collide(alpha) {
	console.log(d3.geom);
	var quadtree = d3.quadtree().addAll(circles);
	return function(d) {
		var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
			nx1 = d.x - r,
			nx2 = d.x + r,
			ny1 = d.y - r,
			ny2 = d.y + r;
		quadtree.visit(function(quad, x1, y1, x2, y2) {
			if (quad.point && (quad.point !== d)) {
				var x = d.x - quad.point.x,
					y = d.y - quad.point.y,
					l = Math.sqrt(x * x + y * y),
					r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
				if (l < r) {
					l = (l - r) / l * alpha;
					d.x -= x *= l;
					d.y -= y *= l;
					quad.point.x += x;
					quad.point.y += y;
				}
			}
			return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
		});
	};
}
//



//



//