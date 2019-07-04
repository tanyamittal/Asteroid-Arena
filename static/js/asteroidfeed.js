function formProcess() {
    var START_DATE = document.getElementById('start_date').value;
    var END_DATE = document.getElementById('end_date').value;

    console.log(START_DATE + " " + END_DATE);
    d3.json("https://api.nasa.gov/neo/rest/v1/feed?start_date=" + START_DATE + "&end_date=" + END_DATE + "&api_key=f8A0DcwpsrjJFcRpqdnM7R6cwetQRrEI3lwyRdvq", function(data) {
        console.log(data);
        console.log(data.near_earth_objects);

        var hazardous_asteroids = 0;
        var non_hazardous_asteroids = 0;

        document.getElementById("heading").innerHTML = "NUMBER OF HAZARDOUS ASTEROIDS PER DAY";
        var astdata = [{
                name: "Non-hazardous",
                values: [{
                    date: "",
                    number_of_ast: "0"
                }, {
                    date: "",
                    number_of_ast: "0"
                }, {
                    date: "",
                    number_of_ast: "0"
                }, {
                    date: "",
                    number_of_ast: "0"
                }, {
                    date: "",
                    number_of_ast: "0"
                }, {
                    date: "",
                    number_of_ast: "0"
                }, {
                    date: "",
                    number_of_ast: "0"
                }]
            }, {
                name: "Hazardous",
                values: [{
                    date: "",
                    number_of_ast: "0"
                }, {
                    date: "",
                    number_of_ast: "0"
                }, {
                    date: "",
                    number_of_ast: "0"
                }, {
                    date: "",
                    number_of_ast: "0"
                }, {
                    date: "",
                    number_of_ast: "0"
                }, {
                    date: "",
                    number_of_ast: "0"
                }, {
                    date: "",
                    number_of_ast: "0"
                }]
            },

        ];

        var startDate = new Date(START_DATE);
        var endDate = new Date(END_DATE);

        var getDateArray = function(start, end) {
            var arr = new Array();
            var dt = new Date(start);
            while (dt <= end) {
                arr.push(convert(new Date(dt)));
                dt.setDate(dt.getDate() + 1);
            }
            return arr;
        }

        var dateArr = getDateArray(startDate, endDate);


        function convert(str) {
            var date = new Date(str),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);
            return [date.getFullYear(), mnth, day].join("-");
        }

        var j = 0;
        var date = dateArr[j];
        var hazardous = [];
        var non_hazardous = [];
        console.log(date);
        console.log(dateArr);
        for (var i = 0; i < data.element_count;) {

            console.log(astdata[1].values[j].date);
            astdata[1].values[j].date = date;
            astdata[0].values[j].date = date;
            for (var k = 0; k < data.near_earth_objects[date].length; k++) {
                i++;
                if (data.near_earth_objects[date][k].is_potentially_hazardous_asteroid) {
                    var num = parseInt(astdata[1].values[j].number_of_ast) + 1;
                    astdata[1].values[j].number_of_ast = num.toString();
                } else {
                    var num = parseInt(astdata[0].values[j].number_of_ast) + 1;
                    astdata[0].values[j].number_of_ast = num.toString();
                }
            }
            hazardous[j] = astdata[1].values[j].number_of_ast;
            non_hazardous[j] = astdata[0].values[j].number_of_ast
            j++;
            date = dateArr[j];

        }
        console.log(astdata);
        var adata = [6, 1, 10, 3, 8];
        var w = 1200;
        var h = 300;

        var line = d3.svg.line()
            .x(function(d, i) {
                return i * 100 + 340
            })
            .y(function(d) {
                return h - 40 * d
            })
            .interpolate("linear");

        var svg = d3.select("#chart")
            .append("svg")
            .attr({
                "width": w,
                "height": h
            })

        var path = svg.append("path")
            .attr({
                d: line(hazardous),
                "fill": "none",
                "stroke": "red",
                "stroke-width": 3
            })

        var label = svg.selectAll("text")
            .data(hazardous)
            .enter()
            .append("text")
            .text(function(d) {
                return d
            })
            .attr({
                x: (function(d, i) {
                    return i * 100 + 340
                }),
                y: (function(d) {
                    return h - 40 * d
                }),
            })
            .attr("fill", "white")
        for (var j = 0; j < dateArr.length; j++) {
            document.getElementById("astdata").innerHTML += dateArr[j] + "&emsp;";
        }

    });


}