(function() {
  var chart = d3.select("body").append("div").attr("class", "chart"),
      dataEl = document.getElementById("data-set"),
      data = JSON.parse(dataEl.value);

  console.log(data);

  chart.selectAll("div").data(data)
    .enter().append("div")
      .style("width", function(d) { 
        console.log(d);
        return d.weight + "px";
      })
      .text(String);
}());
