
function makeRow(text){
    var li =$("<li>").addClass("list-group-item list-group-item-action").text(text);
    $(".history").append(li);
}

    $("button").on("click", function(){
    let inputText = $("input").val()

     var APIKEY = "ccf5e1e50778ef765a4f1275e12f7aaa";
     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+inputText + "&units=imperial&appid=" + "&apikey=" + APIKey;

     localStorage.setItem("history", JSON.stringify(inputText));
     $("#buttons-view").val(localStorage.getItem(inputText));
     $.ajax({
        url: queryURL,
        method: "GET"
    })

      .then(function(response){

        $(".city").html("<h1" + response.name + "Weather Info</h1>");
        $(".temp").text("temperature (F) " + response.main.temp);
        $(".humidity").text("humidity: " + response.main.humidity);
        $(".wind").text("wind Speed: " + response.wind.speed);
        $(".uvIndex").text("uvIndex:" + response.coord.value);
    

         uvIndex(response.coord.lat,response.coord.lon);
         forecast(inputText);
      })

   
})

function uvIndex(lat,lon){
    var APPKEY ="ccf5e1e50778ef765a4f1275e12f7aaa";
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid="+ APPKEY +appid+"&lat="+lat+"&lon="+lon;
   
    $.ajax({//get
        url: queryURL,
        method: "GET"
      })

      .then(function(response){

        $(".uvIndex").text("uvIndex:" + response.value);

      })
    }

    var cities=[],

    if (localStorage.getItem("cities")) {
        cities = JSON.parse(localStorage.getItem("cities"));//get
      }




      function renderButtons(){

          $('#button-view').empty();//delete prior and epmty

          for (var i = 0; i < cities.length; i++) {
              var app =$("<button>");
              app.addClass("city");
              app.attr("data-name", cities[i]);
               app.text(cities[i]);


              $("#buttons-view").append(app);
            }

      }
        //handles events when the buttons clicked
      $("#search-form-input").on("click", function(event) {
          event.preventDefault();
          
          var cities = $("#search-form-input").val().trim();
        
         cities.push(cities);

            renderButtons();
         });

      // render to display the initial list 
      renderButtons();

      function forecast(cityName){
          var APPKEY= "ccf5e1e50778ef765a4f1275e12f7aaa";
          var queryURL='http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APPKEY}'


          $.ajax({
          url: queryURL,
          method: "GET"
        })
        then(function(response) {
             
            for (var i = 0; i < 5; i++){
              var col = $("<div>").addClass("col-md-2")
              var card = $("<div>").addClass('card bg-primary text-white');
              var body = $("<div>").addClass("card-body p-2");

              var title = $("<h2>").addClass("card-title").text(response.list[i].dt_txt);

              var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
              var p1 = $("<p>").addClass("card-text").text("Temp: " + response.list[i].main.temp_max + " °F");
              var p2 = $("<p>").addClass("card-text").text("Humidity: " + response.list[i].main.humidity + "%");
              col.append(card.append(body.append(title, img, p1, p2)));
              $(".well").append(col);
      
            }
            

        })

  }    


    var history = JSON.parse(window.localStorage.getItem("history")) || [];
         for (var i = 0; i < history.length; i++){
        makeRow(localStorage.getItem("history"));
     }



