var svgContainer = d3.select("body").append("svg")
.attr("width", 1200)
.attr("height", 1200)
.attr("fill", "green");

function Cell(x,y){
  this.x = x;
  this.y = y;
}
var cells = function(){
  var result = [];
 
  for(var row = 0 ; row< 10; row++){
    for(var col = 0 ; col< 10 ;col++){
      result.push(new Cell(row, col));
    }
  }
  
  return result;
}

var color = d3.scaleLinear()
.domain([0,100])
.range(['yellow', 'red']);

svgContainer.selectAll("rect")
  .data(cells())
  .enter()
  .append("rect")
  .attr("x", function(d,i){return d.x * 21;})
  .attr('y', function(d,i){return d.y * 21;})
  .attr('width', 20)
  .attr('height', 20)
  .attr('fill', function(d,i){return color(i);})
  .attr('rx', 2)
  .attr('ry',2)
;