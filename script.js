// This files handles first page 

// Assumining the initial values

//api key
let API_key = "6cf748d4cc95a4743b7234bcc14a3ff6";

// initializing weather report used variable 

// html elements for first page 
let SearchBar = document.getElementById("SearchBar");
let SearchBtn = document.getElementById("SearchBtn");
let First_Cont = document.getElementById("First_Cont");
let Info_Btn = document.getElementById("InfoBtn");
let Header = document.getElementById("head");
let main = document.getElementById("Main");
let T = document.getElementById("T");
let C = document.getElementById("C");
let S = document.getElementById("S");

// html elements for page opened through more info click 
// let Cards = document.getElementById("cardGroup");
// let First_Card = document.getElementById("first_card");
// let First_src = document.getElementById("first_src");
// let second_Card = document.getElementById("second_card");
// let second_src = document.getElementById("second_src");
// let third_Card = document.getElementById("third_card");
// let third_src = document.getElementById("third_src");
// let GoBack1 = document.getElementById("GoBackFromTodayWeather");


// setting initial values
Info_Btn.style.display = "none";  

// let Actual_Temp;
// let Feels;
// let temp_max;
// let temp_min;
// let Humidity;
// let Pressure;
// let Wind_Speed;
// let Clouds;

// collecting icons according to weather for cards src
// icons for clouds 
// let sky_with_clouds = "https://www.reshot.com/preview-assets/icons/2CEUJGNYSH/weather-2CEUJGNYSH.svg";
// let rainy = "https://www.reshot.com/preview-assets/icons/BF97DVZPJH/rain-BF97DVZPJH.svg";
// let thunder_storm = "https://www.reshot.com/preview-assets/icons/54ZWSQXDFV/thunderbolt-54ZWSQXDFV.svg";
// let clear_sky = "https://www.reshot.com/preview-assets/icons/WL9MVB4TYD/sun-energy-WL9MVB4TYD.svg";
// // icon for tempreture
// let tempareture = "https://www.reshot.com/preview-assets/icons/ZM7UGH3VSD/temperature-ZM7UGH3VSD.svg";
// // icons for wind
// let wind = "https://www.reshot.com/preview-assets/icons/29FSW3APRK/wind-29FSW3APRK.svg";

// displaying searched location weather in short
function Show_Weather(Temp, name, state) {
    Temp = Math.floor((Temp - 273));
    T.innerHTML = (Temp + " °C");
    C.innerHTML = (name + ", " + state);
}

// getting searched location weather in short
function Get_Weather_Report(name, lon, lat, state) {
    let Weather_API = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`;
    fetch(Weather_API).then(res => res.json()).then(data => {
        let Today = data.list[0];
        console.log(Today);
        let Temp = Today.main.temp;
        SearchBar.value = "";
        Info_Btn.style.display = "initial";

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
        
        // initializing weather array - 
        // let WeatherArray = [Actual_Temp,Feels,temp_max,temp_min,Humidity,Pressure,Wind_Speed,Clouds]
        Show_Weather(Temp, name, state);
    })
}


// main function for handling click event on the search button 
const forward_me = SearchBar.value.trim();
function Get_Weather() {
    const city_name = SearchBar.value.trim();
    if (!city_name)
        return;
    let GeoConding_API = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=5&appid=${API_key}`;
    fetch(GeoConding_API).then(res => res.json()).then(data => {
        if (!data.length) return alert(`Data not found for the city name ${city_name}`);
        let { name, lat, lon, state } = data[0];
        Get_Weather_Report(name, lon, lat, state);
    }).catch(() => {
        alert("An error occured while fetching city coordinates");
    })
}

SearchBtn.addEventListener("click", Get_Weather);
export {forward_me};
// function MoreInfoHandler() {

//     // hiding previous page info
//     // SearchBar.style.display = "none";
//     // SearchBtn.style.display = "none";
//     // Info_Btn.style.display = "none";
//     // main.style.display = "none";
//     // First_Cont.remove();
//     // C.style.display = "none";
//     // T.style.display = "none";
//     // Header.style.backgroundImage = 'none';
//     document.body.style.backgroundColor = "initial";
//     // Cards.style.display = "initial";
//     // GoBack1.style.display = "initial";

//     // handling cards info
//     // handling first

//     second_src.src = tempareture;
//     document.getElementById("clouds").innerHTML = "Rain Chances : " + weatherArray[6] + "%";
//     document.getElementById("hum").innerHTML = "Humadity : " + weatherArray[4];
//     // handling second card
//     if (Clouds < 20) {
//         First_src.src = clear_sky;
//     }
//     else if (Clouds < 60) {
//         First_src.src = sky_with_clouds;
//     }
//     else if (Clouds > 60) {
//         First_src.src = rainy;
//     }
//     document.getElementById("avg").innerHTML = "Actual Tempareture : " + weatherArray[0];
//     document.getElementById("feels").innerHTML = "Feels like : " + weatherArray[1];
//     document.getElementById("max").innerHTML = "Maximum Tempareture : " + weatherArray[2];
//     document.getElementById("min").innerHTML = "Minimum Tempareture : " + weatherArray[3];
//     // handling third card
//     third_src.src = wind;
//     document.getElementById("press").innerHTML = "Pressure : " + weatherArray[4] + " mm";
//     document.getElementById("wind").innerHTML = "Wind Speed : " + weatherArray[5] + " mile/sec";

//     // handling click event on go back button
//     // GoBack1.addEventListener("click", function () {
//     //     // setting previous page info
//     // })
// }

// // handling the click event for more info button
// Info_Btn.addEventListener("click", MoreInfoHandler);

