let button=document.getElementById("click");
let city=document.getElementById("city");
let apiKey="622007c222ccd98778aec320701a68db";

function start(){
let cityVal=city.value;
city.textContent="";
console.log(cityVal)
todayWeather(cityVal)
}

function todayWeather(cityVal){
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${apiKey}`)
.then(response =>{
    return response.json()
}).then(data =>{
    console.log(data)
} )
}

button.onclick=start
