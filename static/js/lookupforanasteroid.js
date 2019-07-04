function formProcess() {
    var asteroidID = document.getElementById('asteroidID').value;

    console.log(asteroidID);
    d3.json("https://api.nasa.gov/neo/rest/v1/neo/" + asteroidID + "?api_key=f8A0DcwpsrjJFcRpqdnM7R6cwetQRrEI3lwyRdvq", function(data) {
        console.log(data);
        var ishazardous = "Not hazardous";
        if (data.is_potentially_hazardous_asteroid)
            ishazardous = "Hazardous";
        document.getElementById("asteroid_info").innerHTML = "Name: " + data.designation + "</br> Estimated diameter: " + data.estimated_diameter.feet.estimated_diameter_min + " Km" + "</br> First observed date: " + data.orbital_data.first_observation_date + "<br>" + ishazardous;

    });

}