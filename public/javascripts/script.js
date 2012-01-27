(function() {
  var chart = d3.select("body").append("div").attr("class", "chart")
      , dataEl = document.getElementById("data-set")
      , data = JSON.parse(dataEl.value)
      , scale, diff_scale
      , DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
      , legend
      , max_weight = 182
      , target_weight = 170
      ;

  function transform_data(data) {
    var transformed = [], i;
    for(i in data) {
      transformed.push(data[i]);
    }
    return transformed;
  }

  data = transform_data(data);
  scale = d3.scale.linear()
    .domain([target_weight, max_weight])
    .range(["0px","250px"]);
  diff_scale = d3.scale.linear()
    .domain([0, max_weight-target_weight])
    .range(["0px","250px"]);

  /*legend = chart.append("div")
    .style("background-color", "#fff")
    .style("color", "black")
    .style("height", "250px")
  legend.append("div").attr("class", "max").text(max_weight)
    .style("height", 250-10+"px");
  legend.append("div").attr("class", "min").text(target_weight)
  */

  chart.selectAll("div").data(data)
    .enter().append("div")
    .style("height", function(d) {
      var x = scale(d.target);
      return x;
    })
    .append("div")
    .style("background-color", function(d) {
      var diff = d.target - d.weight;
      return diff >= 0 ? "green" : "red";
    })
    .style("top", function(d) {
      var diff = d.target - d.weight;
      return diff >= 0 ? "0px" : diff_scale(diff);
    })
    .style("height", function(d) {
      var diff = d.target - d.weight;
      return diff_scale(Math.abs(diff));
    })
    .text(function(d) {
      var date = new Date(d.date);
      return DAYS[date.getDay()]// + "\n" + d.weight;
    })
}());
