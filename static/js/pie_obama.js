// set the dimensions and margins of the graph
var width = 1000
    height = 800
    margin = 60

// The radius of the pieplot
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'mapper'
var svg = d3.select("#obama")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Add First Term Presidential data: I turned the csv created from sql qury into a dictionary. Then copied and pasted into "data" (hard-coded)
var data =  {
    "Anti-White": 2325
  ,
    "Anti-Black or African American": 8657
  ,
    "Anti-Gay(Male)": 2913
  , 
    "Anti-Jewish": 3457 
  , 
    "Anti-Hispanic or Latino": 1853
  }

// set the color scale
var color = d3.scaleOrdinal()
  .domain(data)
  .range(d3.schemeSet2);

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))

// Build arcs:
var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

/// Build the pie chart
svg
  .selectAll('obamaSlices')
  .data(data_ready)
  .enter()
  .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.9)

// Add the annotation
svg
  .selectAll('obamaSlices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return "crime " + d.data.key})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 10)
