// get val of search input attach to search button  
// forward that val to api calls
function inputval() {
    var searchcity = document.querySelector("#searchinput").value;
    searchweather(searchcity);
    searchforecast(searchcity);
    console.log(searchcity);
    document.querySelector("#searchinput").value = "";
    var history = $('<button>').addClass('historybtn').attr('id',searchcity).text(searchcity).on('click',historyval)
    $('#history').append(history)
    console.log($('.historybtn').attr('id'))
    }

document.querySelector("#searchbtn").addEventListener("click",inputval)


function historyval(){
    var searchcity = $('.historybtn').attr('id',)
    console.log(searchcity)
    searchweather(searchcity);
    searchforecast(searchcity);
}


function searchweather(searchcity) {
    document.querySelector('.todays-weather').innerHTML = ""
    var endpointURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchcity}&units=imperial&appid=61dd55562dc2661090fa522a55dcd404`
    $.ajax({
        url: endpointURL,
        method:"GET"
    }).then(function(apiResponce){
        console.log(apiResponce)
        var city = $('<h1>').text(apiResponce.name)
        var temp = $('<h3>').addClass("cityspecs").text("temp: " + apiResponce.main.temp)
        var humidity = $('<h3>').addClass("cityspecs").text("humidity: " + apiResponce.main.humidity)
        var wind = $('<h3>').addClass("cityspecs").text("wind: " + apiResponce.wind.speed + "MPH")
        $('.todays-weather').append(city,temp,humidity,wind)

        searchUV(apiResponce.coord.lat,apiResponce.coord.lon)
    })
}

function searchforecast(searchcity) {
    document.querySelector('.fiveday').innerHTML = ""
    var endpointURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchcity}&units=imperial&appid=61dd55562dc2661090fa522a55dcd404`
    $.ajax({
        url: endpointURL,
        method:"GET"
    }).then(function(response){
        console.log(response)
        for (var i = 0; i < response.list.length; i++) {
            // only look at forecasts around 3:00pm
            if (response.list[i].dt_txt.indexOf("09:00:00") !== -1) {
            var forcastTemp = $('<p>').text('Temp: ' + response.list[i].main.temp_max + "F")
            var forcastWind = $('<p>').text("Wind: " + response.list[i].wind.speed + "MPH")
            var forcastHumidity = $('<p>').text("Humidity: " + response.list[i].main.humidity + "%")
            var forcastDate = $('<p>').text(response.list[i].dt_txt)
            var forcastBox = $('<div>').addClass('days').attr('id','box'+[i]).append(forcastDate,forcastTemp,forcastWind,forcastHumidity)
            $('.fiveday').append(forcastBox)
            


            }
          }

    })
}
function searchUV(lat,lon) {
    
}
