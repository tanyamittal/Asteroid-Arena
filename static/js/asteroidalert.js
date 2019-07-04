d3.json('https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=f8A0DcwpsrjJFcRpqdnM7R6cwetQRrEI3lwyRdvq', function(data) {

    console.log(data);
    var date = new Date().toISOString().slice(0, 10);
    console.log(date);
    var dataSet = [];
    var min = 0;
    var minID = 0;


    for (i = 0; i < data.element_count; i++) {
        dataSet.push({
            id: data.near_earth_objects[date][i].id,
            miss_distance: parseInt(data.near_earth_objects[date][i].close_approach_data['0'].miss_distance.kilometers)
        });
        console.log(dataSet[i]);
        if (i == 0)
            min = dataSet[i].miss_distance;
        if (min >= dataSet[i].miss_distance) {
            min = dataSet[i].miss_distance;
            minID = dataSet[i].id;
        }
    }


    console.log(minID);
    console.log(dataSet)
    var svg = d3.select("#chart").append("svg")
        .attr("height", 400)
        .attr("width", 1200);

    svg.selectAll("rect")
        .data(dataSet)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("height", function(d, i) {
            return (2 * d.miss_distance / 1000000)
        })
        .attr("width", "70")
        .attr("x", function(d, i) {
            return (i * 80) + 250
        })
        .attr("y", function(d, i) {
            return 300 - (2 * d.miss_distance / 1000000)
        });


    svg.selectAll("text")
        .data(dataSet)
        .enter().append("text")
        .text(function(d) {
            return d.id
        })
        .attr("class", "text")
        .attr("x", function(d, i) {
            return (i * 80) + 250
        })
        .attr("y", 360);

    document.getElementById("label").innerHTML = "<b>  Asteroid ID    </b>";
    document.getElementById("conclusion").innerHTML = "The asteroid with ID " + minID + " has the minimum miss distance of " + min + " Km.";
});