// set the dimensions and margins of the graph
var width = 600
    height = 600
    margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#pie-chart")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// create 2 data_set
var Clinton = {a: 7608, b: 5954}
var Bush = {a: 9730, b: 7485}
var Obama = {a: 6613, b: 6630}
var Trump = {a: 6421, b: 6489}

// var Clinton = {a: 7608, b: 5954, c: 7950, d: 8790, e:8107, f:7902, g:7943, h:8219}
// var Bush = {a: 9730, b: 7485, c: 7545, d:7685, e:7411, f:7716, g:7625, h:8039}
// var Obama = {a: 6613, b: 6630, c: 6299, d:6594, e:6044, f:5599, g:5879, h:6264}
// var Trump = {a: 6421, b: 6489}


// set the color scale
var color = d3.scaleOrdinal()
  .domain(["a", "b", "c", "d", "e", "f", "g", "h"])
  .range(d3.schemeDark2);

// A function that create / update the plot for a given variable:
function update(data) {

  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .value(function(d) {return d.value; })
    .sort(function(a, b) { console.log(a) ; return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
  var data_ready = pie(d3.entries(data))

  // map to data
  var u = svg.selectAll("path")
    .data(data_ready)

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  u
    .enter()
    .append('path')
    .merge(u)
    .transition()
    .duration(1000)
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1)

  // remove the group that is not present anymore
  u
    .exit()
    .remove()

}

// Initialize the plot with the first dataset
update(Clinton)
