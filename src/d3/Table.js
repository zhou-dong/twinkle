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

function createData(text, row, col) {
  return {
    text: text,
    row: row,
    col: col,
    rowOffset: 8,
    colOffset: -5,
    color: 'black',
    size: 10
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
d3.range(w2.length + 1).forEach(function(entry, i) {
  data.push(createData(entry, 1 + i, 1));
});

svg.select('g')
  .selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .attr('x', function(d) {
    return d.col * cell.x + 0.5 * cell.width + d.colOffset;
  })
  .attr('y', function(d) {
    return d.row * cell.y + 0.5 * cell.height + d.rowOffset;
  })
  .text(function(d) {
    return d.text;
  })
  .attr("font-size", "20px")
  .attr("font-family", "sans-serif")
  .attr('fill', function(d) {
    return d.color;
  });