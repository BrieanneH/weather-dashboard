$(document).ready(function(){


    setInterval(function(){
        //display date
        $("#dashboardDate").text(moment().format("MMMM DD,  YYYY"))
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

    $("#submit").on("click", (() => {
     var city = $("#city").val().trim();


    
    var queryURL="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ccf5e1e50778ef765a4f1275e12f7aaa";

    $.ajax({
        url: queryURL,
        method: "GET"
    

    })

    //gather temp info (convert) -city
    .then (function (res){
        console.log(res);
        //kelvin to celsius to fahrenheit
        //..math is hard sometimes https://reference.yourdictionary.com/resources/what-s-the-easiest-way-to-convert-fahrenheit-to-celsius.html
        tempMax = Math.floor(((res.main.temp_min - 273.15) * 1.8) + 32);
        tempMin = Math.floor(((res.main.temp_min - 273.15)* 1.8 ) + 32);

        
    //call ids and add values -city
        $("#highTemp").text("high of:" + tempMax + "F");
        $("#lowTemp").text("low of:" + tempMin + "F");
        $("#humidity").text("humidity" + response.main.humidity);
        $("#windSpeed").text( "wind speed:" + response.wind.speed);
        $("#info").text("Today:" + response.weather[0].description);

        weather_icon =response.data.weather[0].icon + ".png"
    
    
    
    
    // ids and add values -city
    var inputRow =$("#tableTop");
    var inputCol =$("#history");
    var cityInfo =$("#tableBody");
    
    //setting new attribute btn
    cityInfo.text(response.name);
    cityInfo.attr("class", "button")
    cityInfo.attr("id", "newBtn")
    cityInfo.attr("city", response.name);

    $("#inputCol").append(cityInfo);
    $("#inputRow").append(inputCol);
    $("#tableBody").prepend(inputRow);

    //cityInfo.attr({"class"},)


    //save to local storage
    cities = JSON.parse(localStorage.getItem("city"));
    if (cities === null){
        cities =[];
    }
    cities.push(repsonse.name);
    localStorage.setItem("city", JSON.stringify(cities));

    });
    //get method - forecast edition 

    var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=ccf5e1e50778ef765a4f1275e12f7aaa";


    $.ajax({
        url: queryURLForecast,
        method: "GET"
    })
    .then(function (res){
        console.log(res);
        localStorage.setItem("forecast", JSON.stringify(res));
        result = JSON.parse(localStorage.getItem("forecast"));
        daysList =[1, 2, 3, 4, 5]
    

    for(var i=0; i< daysList.length;i++){
       
        
        var tempDay= results.list[i].main.temp;
        var date = results.list[i].dt;
        var dayFar = Math.floor(((tempDay - 273.15) * 1.8) + 32);
        var humidDay = result.list[i].main.humidity
        var wsDay = results.list[i].wind.speed;
        var infoDay= results.list[i].weather[0].description;
        
        var idDay = results.list[i].weather[0].main;
        var iconDay =resuts.list[i].weather[0].icon 
    

      //call ids and values -forecast
         $("#day" + days[i] + "_date").text(moment.unix(dateList).format("MMMM Do"));
        $("#day" + days[i] + "_date").text("class", "date");
        $("#day" + days[i] + "_temp").text(dayFar + "F");
         $("#icon" + days[i]).attr("src", "http://openweathermap.org/img/wn/" + iconDay +".png");
        $("#day" + days[i] + "_wind").text("Wind:" + wsDay + "MPH");
        $("#day" + days[i] + "_humidity").text(humidDay + "% Humidity");
    };

        $("#weatherStats").attr("style", "display: block");
         });

    


   
    function displayBtn () {
        console.log =($(this).attr("city"));
        var cityTwo =$(this).attr("city");
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityTwo + "&appid=ccf5e1e50778ef765a4f1275e12f7aaa";

         $.ajax({
            url:queryURL,
            method: "GET"   
            })

    .then(function (res) {
            console.log(res);
            tempMax = Math.floor(((response.main.temp_min - 273.15) * 1.8) + 32);
            tempMin = Math.floor(((response.main.temp_min - 273.15)* 1.8 ) + 32);

            $("#highTemp").text("high of:" + tempMax + "F");
            $("#lowTemp").text("low of:" + tempMin + "F");
            $("#humidity").text("humidity" + response.main.humidity);
            $("#windSpeed").text( "wind speed:" + response.wind.speed);
            $("#info").text("Today:" + response.weather[0].description);
    
            $("#icon").text(response.weather[0].icon + ".png")
        });

        var queryURLForecastTwo = "https://api.openweathermap.org/data/2.5/forecast?q=" +
            cityTwo + "&appid=ccf5e1e50778ef765a4f1275e12f7aaa";

            $.ajax({
                url: queryURLForecastTwo,
                method: "GET"
            })

            .then( function (res){
                console.log(res);
                localStorage.setItem("forecast", JSON.stringify(res));
                result = JSON.parse(localStorage.getItem("forecast"));
                days =[1, 2, 3, 4, 5]
        
        
            for(var i=0; i< days.length;i++){
                var date = results.list[i].dt;
                var idDay = results.list[i].weather[0].main;
                var tempDay= results.list[i].main.temp;
                var dayFar = Math.floor(((tempDay - 273.15) * 1.8) + 32);
                var humidDay = result.list[i].main.humidity
                var wsDay = results.list[i].wind.speed;
                var infoDay= results.list[i].weather[0].description;
                var iconDay =resuts.list[i].weather[0].icon 
            
        
              //call ids and values -forecast
             $("#day" + days[i] + "_date").text(moment.unix(dayDate).format("MMMM Do"));
             $("#day" + days[i] + "_date").text("class", "date");
             $("#day" + days[i] + "_temp").text(dayFar + "F");
             $("#icon" + days[i]).attr("src", "http://openweathermap.org/img/wn/" + iconDay +".png");
             $("#day" + days[i] + "_wind").text("Wind:" + wsDay + "MPH");
             $("#day" + days[i] + "_humidity").text(humidDay + "% Humidity");
            };
        
            $("#weatherStats").attr("style", "display: block")

            });
            
        };

        $(".btn").on("click", displayBtn);
    }));
});      

    
    