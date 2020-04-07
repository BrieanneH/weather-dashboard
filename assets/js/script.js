$(document).ready(function(){


    setInterval(function(){
        //display date
        $("#dateDisplayed").text(moment().format("MMMM DD,  YYYY"))
    }, 1000);


    //city info
    cityList = JSON.parse(localStorage.getItem("city"));
        if(cityList === null){
            cityList =[];
    }

    for (var i = cityList.length; i >0; i--){
        if (cityList[i] != undefined){

            var cityRow = $("<tr>");
            var cityCol = $("<td>");
            var cityLink = $("<button>");

            cityLink.attr("class", "btn btn-light");
            cityLink.attr("city-name", cityList[i]);
            cityLink.text(cityList[i]);

            $(cityCol).append(cityLink);
            $(cityRow).append(cityLink);
            $("tbody").append(citytRow);


    }
    };


    //onclick function for getting city

    $("#submit").on("click", function() {
     var city = $("#city").val().trim();


    
    var queryURL="https://api.openweathermap.org/data/2.5/weather?q=" + city +
     "&appid=ccf5e1e50778ef765a4f1275e12f7aaa";

    $.ajax({
        url: queryURL,
        method: "GET"
    

    })

    //gather temp info (convert) -city
    .then (function (res){
        //console.log(res);
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
    
        $("#cityHeader").text(response.name);

    
    
    
    // ids and add values -city
    var cityRow =$("<tr>");
    var cityCol =$("<td>");
    var cityLink =$("<button>");
    
    //setting new attribute btn
    cityLink.text(response.name);
    cityLink.attr("class", "btn btn-light");
    cityLink.attr("id", "newBtn");
    cityLink.attr("city-name", response.name);

    $("#cityCol").append(cityLink);
    $("#inputRow").append(cityCol);
    $("#tableBody").prepend(cityRow);

    //cityInfo.attr({"class"},)


    //save to local storage
    cityList = JSON.parse(localStorage.getItem("city"));
    if (cityList === null){
        citiyList =[];
    }
    cityList.push(repsonse.name);
    localStorage.setItem("city", JSON.stringify(cityList));

    });
    //get method - forecast edition 

    var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q="
     + city + "&appid=ccf5e1e50778ef765a4f1275e12f7aaa";


    $.ajax({
        url: queryURLForecast,
        method: "GET"
    })
    .then(function (res){
       // console.log(res);
        localStorage.setItem("forecast", JSON.stringify(res));
        result = JSON.parse(localStorage.getItem("forecast"));
        newDays =[4, 12, 20, 28, 36]
    

    for(var i=0; i< daysList.length;i++){
        var dayTemp= results.list[i].main.temp;
                var dayFar = Math.floor(((tempDay - 273.15) * 1.8) + 32);
                var dayDate = results.list[i].dt; 
                var dayHumid = result.list[i].main.humidity
                var dayWS = results.list[i].wind.speed;
                var dayWeather= results.list[i].weather[0].description;
                var dayID= results.list[i].weather[0].main;
                var dayIcon =resuts.list[i].weather[0].icon
       
        
   

      //call ids and values -forecast
        $("#day" + newDays[i] + "_date").text(moment.unix(dayDate).format("MMMM Do"));
        $("#day" + newDays[i] + "_date").attr("class", "date");
        $("#day" + newDays[i] + "_temp").text(dayFar + "F");
        $("#icon" + newDays[i]).attr("src", "http://openweathermap.org/img/wn/" + dayIcon +".png");
        $("#day" + newDays[i] + "_wind").text("Wind:" + dayWS + "MPH");
        $("#day" + newDays[i] + "_wind").attr("class", "windText");
        $("#day" + newDays[i] + "_humidity").text(dayHumid+ "% Humidity");
        
    };

        $("#weatherInfo").attr("style", "display: block");
     }); 
});

    


   
    function displayBtn () {
       // console.log =($(this).attr("city-name"));
        var cityTwo =$(this).attr("city-name");
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?id=" +
        cityTwo+ "&appid=ccf5e1e50778ef765a4f1275e12f7aaa";

         $.ajax({
            url:queryURL,
            method: "GET"   
         })

    .then(function (res) {
            console.log(res);

            tempMin = Math.floor(((response.main.temp_min - 273.15) * 1.8) + 32);
            tempMax = Math.floor(((response.main.temp_min - 273.15) * 1.8) + 32);

            $("#highTemp").text("high of:" + tempMax + "F");
            $("#lowTemp").text("low of:" + tempMin + "F");
            $("#humidity").text("humidity" + response.main.humidity);
            $("#windSpeed").text( "wind speed:" + response.wind.speed);
            $("#info").text("Today:" + response.weather[0].description)
            weather_icon =response.weather[0].con + ".png"
            $("#cityHeader").text(response.name);


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
                days =[4, 12, 20, 28, 36]
        
        
            for(var i=0; i< newDays.length;i++){
                
                var dayTemp= results.list[i].main.temp;
                var dayFar = Math.floor(((tempDay - 273.15) * 1.8) + 32);
                var dayDate = results.list[i].dt; 
                var dayHumid = result.list[i].main.humidity
                var dayWS = results.list[i].wind.speed;
                var dayWeather= results.list[i].weather[0].description;
                var dayID= results.list[i].weather[0].main;
                var dayIcon =resuts.list[i].weather[0].icon 
               
            
        
              //call ids and values -forecast
              $("#day" + newDays[i] + "_date").text(moment.unix(dayDate).format("MMMM Do"));
              $("#day" + newDays[i] + "_date").attr("class", "date");
              $("#day" + newDays[i] + "_temp").text(dayFar + "F");
              $("#icon" + newDays[i]).attr("src", "http://openweathermap.org/img/wn/" + dayIcon +".png");
              $("#day" + newDays[i] + "_wind").text("Wind:" + dayWS + "MPH");
              $("#day" + newDays[i] + "_wind").attr("class", "windText");
              $("#day" + newDays[i] + "_humidity").text(dayHumid+ "% Humidity");;
            };
        
            $("#weatherInfo").attr("style", "display: block")

            });
            
        };

        $(".btn").on("click", displayBtn);
    
});      

    
    