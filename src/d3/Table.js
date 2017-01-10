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
  length: 50,
  start: 51,
  radius: 4,
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
    return coordinate.row * cell.start;
  })
  .attr('y', function(coordinate) {
    return coordinate.col * cell.start;
  })
  .on('mouseover', function(d) {
    d3.select(this).style('stroke', 'brown');
  })
  .on('mouseout', function(d) {
    d3.select(this).style('stroke', 'white');
  })
  .attr('width', cell.length)
  .attr('height', cell.length)
  .attr('fill', cell.color)
  .attr('rx', cell.radius)
  .attr('ry', cell.radius)
  .attr('stroke', 'white')
  .attr('stroke-width', 1);

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
    return d.col * cell.start + 0.5 * cell.length + textHelper.colOffset;
  })
  .attr('y', function(d) {
    return d.row * cell.start + 0.5 * cell.length + textHelper.rowOffset;
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
      return col * cell.start + 0.5 * cell.length + textHelper.colOffset;
    })
    .attr('y', function() {
      return row * cell.start + 0.5 * cell.length + textHelper.rowOffset;
    })
    .text(text)
    .attr("font-size", textHelper.fontSize)
    .attr("font-family", textHelper.fontFamily)
    .attr('fill', textHelper.color);
}

function drawLine(row1, col1, row2, col2) {
  svg.select('g').append("line")
    .attr("x1", function() {
      var center = col1 * cell.start + 0.5 * cell.length;
      return (col1 !== col2) ? center + 0.2 * cell.length : center;
    })
    .attr("y1", function() {
      var center = row1 * cell.start + 0.5 * cell.length;
      return (row1 === row2) ? center : center + 0.2 * cell.length;
    })
    .attr("x2", function() {
      var center = col2 * cell.start + 0.5 * cell.length;
      return (col1 === col2) ? center : center - 0.2 * cell.length;
    })
    .attr("y2", function() {
      var center = row2 * cell.start + 0.5 * cell.length;
      return (row1 === row2) ? center : center - 0.2 * cell.length;
    })
    .attr("stroke-width", 2)
    .attr("stroke", "black");
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