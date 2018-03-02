var x = document.getElementById("location");
var lat = 0;
var long = 0;
var weatherData = document.getElementById("current-weather");
var temperatureData = document.getElementById("current-temperature");
var celsiusButton = document.getElementById("change-tempC");
var fahrenButton = document.getElementById("change-tempF");
var currentTemp = 0;    
var weatherLink = "";

console.log(x.innerHTML);
function getLocation() {
    console.log("Executing getLocation()...");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation);
    }
    else {
        x.innerHTML = "Location unavailable";
    }
}

function showLocation(position) {
    console.log("Executing showLocation()...");
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(lat);
    console.log(long);
    x.innerHTML += "<br>Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    getWeather();
    $("#change-tempF").attr("disabled", false);
}

function getWeather() {
    console.log("Executing getWeather()...");
    weatherLink = "https://fcc-weather-api.glitch.me/api/current?lat="
        + lat + "&lon=" + long;
    console.log(weatherLink);
    $.getJSON(weatherLink, function (json) {
        currentWeather = json.weather[0].main;
        currentTemp = Math.round(json.main.temp);
        weatherData.innerHTML += currentWeather + "<br>";
        temperatureData.innerHTML += currentTemp + "&degC";
        console.log(JSON.stringify(json));
        console.log(currentTemp);
    });
}

function changeToF() {
    document.getElementById("change-tempC").removeAttribute("disabled");
    document.getElementById("change-tempF").setAttribute("disabled", true);
    currentTemp = Math.round((currentTemp * 9/5) + 32);
    temperatureData.innerHTML = "Current temperature: " + 
    currentTemp + "&degF";
    disabledC = "false";
    disabledF = "true";
}

function changeToC() {
    document.getElementById("change-tempC").setAttribute("disabled", true);
    document.getElementById("change-tempF").removeAttribute("disabled");
    celsiusButton.getAttribute("disabled");
    fahrenButton.getAttribute("diabled");
    currentTemp = Math.round((currentTemp -32) * 5/9);
    temperatureData.innerHTML = "Current temperature: " +
    currentTemp + "&degC";
}

getLocation();
$(document).ready(function() {
    $("#change-tempF").attr("disabled", true);
    $("#change-tempC").attr("disabled", true);
});
console.log(weatherLink);
