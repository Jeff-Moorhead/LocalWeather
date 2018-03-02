var x = document.getElementById("location");
var lat = 0;
var long = 0;
var area = "";
var weatherData = document.getElementById("current-weather");
var temperatureData = document.getElementById("current-temperature");
var celsiusButton = document.getElementById("change-tempC");
var fahrenButton = document.getElementById("change-tempF");
var currentWeather = "";
var currentTemp = 0;    
var dataLink = "";

console.log(x.innerHTML);
function getLocation() {
    console.log("Executing getLocation()...");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation);
    }
    else {
        $("#current-weather").text("Location unavailable.");
    }
}

function showLocation(position) {
    console.log("Executing showLocation()...");
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(lat);
    console.log(long);
    getData();
    $("#change-tempF").attr("disabled", false);
}

function getData() {
    console.log("Executing getWeather()...");
    dataLink = "https://fcc-weather-api.glitch.me/api/current?lat="
        + lat + "&lon=" + long;
    console.log(dataLink);
    $.getJSON(dataLink, function (json) {
        currentWeather = json.weather[0].main;
        currentTemp = Math.round(json.main.temp);
        area = json.name + ", " + json.sys.country;
        x.innerHTML = area;
        weatherData.innerHTML = "Current weather: " + currentWeather + "<br>";
        temperatureData.innerHTML = "Current temperature: " +  currentTemp + "&degC";
        console.log(JSON.stringify(json));
        console.log(currentWeather);
        console.log(currentTemp);
        console.log(area);
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
    temperatureData.innerHTML = "Current temperature: " + currentTemp + "&degC";
}

$(document).ready(function() {
    $("#change-tempF").attr("disabled", true);
    $("#change-tempC").attr("disabled", true);
    $("#current-weather").text("Fetching your weather data...");
    getLocation();
});
console.log(dataLink);
