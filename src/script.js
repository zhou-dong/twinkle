/*jshint esnext: true */

class Twinkle extends EventEmitter {

	constructor(element) {
		this.element = element;
	}

	twinkle() {
		console.log(this.element);
	}

}

let t = new Twinkle(new Date().toString());

t.twinkle();

var canvas = d3.select("body").append("svg")
	.attr("width", 800)
	.attr("height", 600);

var circle = canvas.append("circle")
	.attr("cx", 50)
	.attr("cy", 50)
	.attr("r", 40);

circle.style("fill", "red")
	.style("stroke", "pink")
	.style("stroke-width", "10px")
	.style("stroke-opacity", 0.5);


var arc = d3.arc()
	.innerRadius(0)
	.outerRadius(80)
	.startAngle(0)
	.endAngle(Math.PI / 2);


canvas.append("path").attr("fill", "yellow")
	.attr("transform", "translate(120,99)")
	.attr("stroke", "gray")
	.style("stroke-width", "3px")
	.style("stroke-opacity", 0.3)
	.attr("d", arc);

var line = d3.line()
	.x(10)
	.y(20);


var treeData = {
	"name": "Top Level",
	"value": 10,
	"type": "black",
	"level": "red",
	"children": [{
		"name": "Level 2: A",
		"value": 15,
		"type": "grey",
		"level": "red",
		"children": [{
			"name": "Son of A",
			"value": 5,
			"type": "steelblue",
			"level": "orange"
		}, {
			"name": "Daughter of A",
			"value": 8,
			"type": "steelblue",
			"level": "red"
		}]
	}, {
		"name": "Level 2: B",
		"value": 10,
		"type": "grey",
		"level": "green"
	}]
};

var root = treeData;

var width = 200, height = 300;

var tree = d3.tree().size([width, height]);

var nodes = d3.hierarchy(root, function(d) {
	return d.children;
});

nodes = tree(nodes);

var g = canvas.append("g")
	.attr("transform", "translate(200,200)");

// adds each node as a group
var node = g.selectAll(".node")
	.data(nodes.descendants())
	.enter().append("g")
	.attr("class", function(d) {
		return "node" +
			(d.children ? " node--internal" : " node--leaf");
	})
	.attr("transform", function(d) {
		return "translate(" + d.y + "," + d.x + ")";
	});

// adds symbols as nodes
node.append("path")
	.style("stroke", function(d) {
		return d.data.type;
	})
	.style("fill", function(d) {
		return d.data.level;
	})
	.attr("d", d3.symbol()
		.size(function(d) {
			return d.data.value * 30;
		})
		.type(function(d) {
			if (d.data.value >= 9) {
				return d3.symbolCircle;
			} else if (d.data.value <= 9) {
				return d3.symbolStar;
			}
		}));

// adds the text to the node
node.append("text")
	.attr("dy", ".35em")
	.attr("x", function(d) {
		return d.children ?
			(d.data.value + 4) * -1 : d.data.value + 4;
	})
	.style("text-anchor", function(d) {
		return d.children ? "end" : "start";
	})
	.text(function(d) {
		return d.data.name;
	});

// adds the links between the nodes
var link = g.selectAll(".link")
	.data(nodes.descendants().slice(1))
	.enter().append("path")
	.attr("class", "link")
	.style("stroke", function(d) {
		return d.data.level;
	})
	.attr("d", function(d) {
		return "M" + d.y + "," + d.x + "C" + (d.y + d.parent.y) / 2 + "," + d.x +
			" " + (d.y + d.parent.y) / 2 + "," + d.parent.x + " " + d.parent.y + "," + d.parent.x;
	});
