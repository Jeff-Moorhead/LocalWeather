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
        currentWeather = toTitleCase(json.weather[0].description);
        currentTemp = Math.round(json.main.temp);
        area = json.name + ", " + json.sys.country;
        x.innerHTML = area;
        weatherData.innerHTML = "Current weather:&nbsp;&nbsp;" + currentWeather + 
        " " + icons[json.weather[0].main] + "<br>";
        temperatureData.innerHTML = "Current temperature:&nbsp;&nbsp;" +  currentTemp + "&degC";
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
}

function changeToC() {
    document.getElementById("change-tempC").setAttribute("disabled", true);
    document.getElementById("change-tempF").removeAttribute("disabled");
    currentTemp = Math.round((currentTemp -32) * 5/9);
    temperatureData.innerHTML = "Current temperature: " + currentTemp + "&degC";
}

function toTitleCase(phrase) {
    return phrase.split(' ').map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
};

$(document).ready(function() {
    $("#change-tempF").attr("disabled", true);
    $("#change-tempC").attr("disabled", true);
    $("#current-weather").text("Fetching your weather data...");
    $("body").attr("hidden", false);
    getLocation();
});
console.log(dataLink);

var icons = {
    "Clear": "<i class=\"wi wi-day-sunny\"></i>",
    "Clouds": "<i class=\"wi wi-cloudy\"></i>",
    "Rain": "<i class=\"wi wi-rain\"></i>",
    "Drizzle": "<i class=\"wi wi-showers\"></i>",
    "Thunderstorm": "<i class=\"wi wi-storm-showers\"></i>",
    "Snow": "<i class=\"wi wi-snow\"></i>",
    "Extreme": "<i class=\"wi wi-tornado\"></i>",
    "Additional": "<i class=\"wi wi-strong-wind\"></i>",
    "Atmosphere": "<i class=\"wi wi-fog\"></i>"
}
