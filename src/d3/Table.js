/*jshint esnext: true */

function coordinates(rowLen, colLen) {
  var rows = [];
  for (var row = 0; row < rowLen; row++) {
    for (var col = 0; col < colLen; col++) {
      var coordinate = {
        row: row,
        col: col
      };
      rows.push(coordinate);
    }
  }
  return rows;
}

function translate(x, y) {
  return 'translate(' + x + ',' + y + ')';
}

var cell = {
  width: 50,
  height: 50,
  x: 51,
  y: 51,
  rx: 4,
  ry: 4,
  color: 'lightgreen'
};

var w1 = "hello";
var w2 = "world";

var table = {
  rowSize: w1.length + 2,
  colSize: w2.length + 2,
  translate: translate(18, 30)
};

var svg = {
  width: 1200,
  height: 1200
};

var svg = d3.select('body').append('svg')
  .attr('width', svg.width)
  .attr('height', svg.height);

svg.append('g')
  .attr('transform', table.translate)
  .selectAll("rect")
  .data(coordinates(table.rowSize, table.colSize))
  .enter()
  .append("rect")
  .attr("x", function(coordinate) {
    return coordinate.row * cell.x;
  })
  .attr('y', function(coordinate) {
    return coordinate.col * cell.y;
  })
  .attr('width', cell.width)
  .attr('height', cell.height)
  .attr('fill', cell.color)
  .attr('rx', cell.rx)
  .attr('ry', cell.ry);

var textHelper = {
  rowOffset: 8,
  colOffset: -5,
  color: 'black',
  fontSize: 20,
  fontFamily: "sans - serif"
}

function createData(text, row, col) {
  return {
    text: text,
    row: row,
    col: col
  };
}

var data = [];
w1.split('').forEach(function(entry, i) {
  data.push(createData(entry, 0, i + 2));
});
w2.split('').forEach(function(entry, i) {
  data.push(createData(entry, i + 2, 0));
});
d3.range(w1.length + 1).forEach(function(entry, i) {
  data.push(createData(entry, 1, i + 1));
});
d3.range(1, w2.length + 1).forEach(function(entry, i) {
  data.push(createData(entry, 2 + i, 1));
});

svg.select('g')
  .selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .attr('x', function(d) {
    return d.col * cell.x + 0.5 * cell.width + textHelper.colOffset;
  })
  .attr('y', function(d) {
    return d.row * cell.y + 0.5 * cell.height + textHelper.rowOffset;
  })
  .text(function(d) {
    return d.text;
  })
  .attr("font-size", textHelper.fontSize)
  .attr("font-family", textHelper.fontFamily)
  .attr('fill', textHelper.color);

function add(row, col, text) {
  svg.select('g')
    .append('text')
    .attr('x', function() {
      return col * cell.x + 0.5 * cell.width + textHelper.colOffset;
    })
    .attr('y', function() {
      return row * cell.y + 0.5 * cell.height + textHelper.rowOffset;
    })
    .text(text)
    .attr("font-size", textHelper.fontSize)
    .attr("font-family", textHelper.fontFamily)
    .attr('fill', textHelper.color);
}

function drawLine(row1, col1, row2, col2) {
  svg.select('g').append("line")
    .attr("x1", col1 * cell.x + 0.5 * cell.width)
    .attr("y1", row1 * cell.y + 0.5 * cell.height)
    .attr("x2", col2 * cell.x + 0.5 * cell.width)
    .attr("y2", row2 * cell.y + 0.5 * cell.height)
    .attr("stroke-width", 2)
    .attr("stroke", "black")
    .attr("marker-end", "url(#triangle)");

  svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle")
    .attr("refX", 16)
    .attr("refY", 5)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 10 5 0 10 2 5")
    .style("fill", "blue");
}


add(2, 2, 0);
add(2, 3, 0);

drawLine(1, 1, 2, 2);
drawLine(2, 2, 2, 3);
drawLine(2, 3, 3, 4);
drawLine(3, 4, 4, 4);
drawLine(4, 4, 5, 4);
drawLine(5, 4, 6, 5);
drawLine(6, 5, 6, 6);