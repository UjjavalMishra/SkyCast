// Assumining the initial values
import { forward_me } from "./script.js";
console.log(forward_me);
 
//api key
let API_key = "6cf748d4cc95a4743b7234bcc14a3ff6";

// html elements for page opened through more_info click 
let Cards = document.getElementById("cardGroup");
let First_Card = document.getElementById("first_card");
let First_src = document.getElementById("first_src");
let second_Card = document.getElementById("second_card");
let second_src = document.getElementById("second_src");
let third_Card = document.getElementById("third_card");
let third_src = document.getElementById("third_src");
let GoBack1 = document.getElementById("GoBackFromTodayWeather");


// collecting icons according to weather for cards src
// icons for clouds 
let sky_with_clouds = "https://www.reshot.com/preview-assets/icons/2CEUJGNYSH/weather-2CEUJGNYSH.svg";
let rainy = "https://www.reshot.com/preview-assets/icons/BF97DVZPJH/rain-BF97DVZPJH.svg";
let thunder_storm = "https://www.reshot.com/preview-assets/icons/54ZWSQXDFV/thunderbolt-54ZWSQXDFV.svg";
let clear_sky = "https://www.reshot.com/preview-assets/icons/WL9MVB4TYD/sun-energy-WL9MVB4TYD.svg";
// icon for tempreture
let tempareture = "https://www.reshot.com/preview-assets/icons/ZM7UGH3VSD/temperature-ZM7UGH3VSD.svg";
// icons for wind
let wind = "https://www.reshot.com/preview-assets/icons/29FSW3APRK/wind-29FSW3APRK.svg";


// getting searched location weather in short
function Get_Weather_Report(name, lon, lat, state) {
    let Weather_API = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`;
    fetch(Weather_API).then(res => res.json()).then(data => {
        let Today = data.list[0];
        console.log(Today);
        let Temp = Today.main.temp;
        SearchBar.value = "";

        // preparing aditional info 
        let Actual_Temp = Math.floor((Temp - 273));
        let Feels = Today.main.feels_like;
        Feels = Math.floor((Feels - 273));
        let temp_max = Today.main.temp_max;
        temp_max = Math.floor((temp_max - 273));
        let temp_min = Today.main.temp_min;
        temp_min = Math.floor((temp_min - 273));
        let Humidity = Today.main.humidity;
        let Pressure = Today.main.pressure;
        let Wind_Speed = Today.wind.speed;
        let Clouds = Today.clouds.all;

        // defining array - 
        let ArrWeather = [
            Actual_Temp,
            Feels,
            temp_max,
            temp_min,
            Humidity.
            Pressure,
            Wind_Speed,
            Clouds
        ];

        return ArrWeather;
    }).catch(() => {
        alert("An error occured while fetching weather");
    })
}


// main function for handling click event on the search button 
function Get_Weather() {
    let forward_me = SearchBar.value.trim();
    if (!forward_me)
        return;
    let GeoConding_API = `http://api.openweathermap.org/geo/1.0/direct?q=${forward_me}&limit=5&appid=${API_key}`;
    fetch(GeoConding_API).then(res => res.json()).then(data => {
        if (!data.length) return alert(`Data not found for the city name ${forward_me}`);
        let { name, lat, lon, state } = data[0];
        Get_Weather_Report(name, lon, lat, state);
        return Get_Weather_Report(name, lon, lat, state);
    }).catch(() => {
        alert("An error occured while fetching city coordinates");
    })
}

function MoreInfoHandler(){

    // handling cards info

    // handling first
    let weatherArray = Get_Weather_Report();
    second_src.src = tempareture;
    document.getElementById("clouds").innerHTML = "Rain Chances : " + weatherArray[6] + "%";
    document.getElementById("hum").innerHTML = "Humadity : " + weatherArray[4];
    // handling second card
    if (Clouds < 20) {
        First_src.src = clear_sky;
    }
    else if (Clouds < 60) {
        First_src.src = sky_with_clouds;
    }
    else if (Clouds > 60) {
        First_src.src = rainy;
    }
    document.getElementById("avg").innerHTML = "Actual Tempareture : " + weatherArray[0];
    document.getElementById("feels").innerHTML = "Feels like : " + weatherArray[1];
    document.getElementById("max").innerHTML = "Maximum Tempareture : " + weatherArray[2];
    document.getElementById("min").innerHTML = "Minimum Tempareture : " + weatherArray[3];
    // handling third card
    third_src.src = wind;
    document.getElementById("press").innerHTML = "Pressure : " + weatherArray[4] + " mm";
    document.getElementById("wind").innerHTML = "Wind Speed : " + weatherArray[5] + " mile/sec";
}

MoreInfoHandler();
// handling the click event for more info button
// button.html.addEventListener("onload", MoreInfoHandler);

