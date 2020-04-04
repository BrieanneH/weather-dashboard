$(document).ready(function(){


    setInterval(function(){
        //display date
        $("#dateDisplay").text(moment().format("MMMM DD,  YYYY"))
    }, 1000);


    //city info
    cities = JSON.parse(localStorage.getItem("city"));
        if(cities === null){
            cities =[];
    }

    for (var i = cities.length; i >0; i--){
        if (cities[i] != undefined){

            var inputRow = $("<tr>");
            var inputCol = $("<td>");
            var cityInfo = $("<button>");

            cityInfo.attr("class", "btn btn-light");
            cityInfo.attr("city-name", cities[i]);
            cityInfo.text(cities[i]);

            $(inputCol).append(cityInfo);
            $(inputRow).append(inputCol);
            $("tableBody").append(inputRow);


        }
    };


    //onclick function for getting city

    $("#submit").on("click", function () {


    


    var city = $("#city").val().trim();

    
    var queryURL="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ccf5e1e50778ef765a4f1275e12f7aaa";




    $.ajax({
        url: queryURL,
        method: "GET"
    

    })

    //gather temp info (convert) -city
    .then(function (response){
        console.log(response);
        //kelvin to celsius to fahrenheit
        //..math is hard sometimes https://reference.yourdictionary.com/resources/what-s-the-easiest-way-to-convert-fahrenheit-to-celsius.html
        tempMax = Math.floor(((response.main.temp_min - 273.15) * 1.8) + 32);
        tempMin = Math.floor(((response.main.temp_min - 273.15)* 1.8 ) + 32);

        
    //call ids and add values -city
        $("#highTemp").text("high of:" + tempMax + "F");
        $("#lowTemp").text("low of:" + tempMin + "F");
        $("#humidity").text("humidity" + response.main.humidity);
        $("#windSpeed").text( "wind speed:" + response.wind.speed);
        $("#info").text("Today:" + response.weather[0].description);

        $("#icon").text(response.weather[0].icon + ".png")
    })
    
    
    
    // ids and add values -city




    //save to local storage



    //get method - forecast


    //call ids and values -forecast

})