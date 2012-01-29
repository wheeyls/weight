(function() {
  var chart 
      , dataEl = document.getElementById("data-set")
      , data = JSON.parse(dataEl.value)
      , scale, diff_scale
      , DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
      , legend
      , max_weight = 182
      , target_weight = 170
      , chart_width = 400
      , bar = 25
      ;

  function transform_data(data) {
    var transformed = [], i;
    for(i in data) {
      transformed.push(data[i]);
    }
    return transformed;
  }

  data = transform_data(data);

  chart = d3.select("body").append("svg")
      .attr("width", chart_width + 30)
      .attr("height", (1+data.length) * bar)
      .attr("class", "chart")
      .append("g")
      .attr("transform", "translate(15, "+bar+")")

  scale = d3.scale.linear()
    .domain([target_weight, max_weight])
    .range(["0",chart_width]);
  diff_scale = d3.scale.linear()
    .domain([0, max_weight-target_weight])
    .range(["0",chart_width]);


  chart.selectAll(".actual")
    .data(data, function(d) {return d.weight;})
    .enter().append("rect")
      .attr("y", function(d, i) { return i*bar; })
      .attr("height", function(d, i) { return bar; })
      .attr("width", function(d, i) { return scale(d.weight); })
      .attr("class", "actual")
      .attr("class", function(d) {
        return d.weight <= d.target ? "on-target" : "off-target";
      })
      
  chart.selectAll(".target")
    .data(data, function(d) {return d.target;})
    .enter().append("rect")
      .attr("y", function(d, i) { return i*bar; })
      .attr("height", function(d, i) { return bar; })
      .attr("width", function(d, i) { return scale(d.target); })
      .attr("class", "target")

  chart.selectAll("line")
    .data(scale.ticks(15))
    .enter().append("line")
      .attr("x1", scale)
      .attr("x2", scale)
      .attr("y1", 0)
      .attr("y2", function(d,i) {return (1+data.length)*bar;})
      .style("stroke", "#ccc")

  chart.selectAll(".rule")
    .data(scale.ticks(15))
    .enter().append("text")
      .attr("class", "rule")
      .attr("x", scale)
      .attr("y", 0)
      .attr("dy", -3)
      .attr("text-anchor", "middle")
      .text(String)

  $("table").hover(function() {
    $(this).addClass("expand");
  }, function() {
    $(this).removeClass("expand");
  });
}());
