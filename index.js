let button=document.getElementById("click");
let city=document.getElementById("city");
let apiKey="622007c222ccd98778aec320701a68db";
let weatherData=document.getElementById("todayWeather");
let fiveDayEl=document.getElementById("fiveDay");
let storage=JSON.parse(localStorage.getItem("city"))||[];
function start(){
let cityVal=city.value;
storage.push(cityVal)
localStorage.setItem("city",JSON.stringify(storage))
city.textContent="";
console.log(cityVal)
todayWeather(cityVal)
}

function todayWeather(cityVal){
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${apiKey}&units=imperial`)
.then(response =>{
    return response.json()
}).then(data =>{
    console.log(data)
let cityName = document.createElement("h1");
cityName.textContent=data.name;
weatherData.append(cityName);
let cityTemp = document.createElement("p");
cityTemp.textContent=data.main.temp;
weatherData.append(cityTemp);
let cityHumidity = document.createElement("p");
cityHumidity.textContent=data.main.humidity;
weatherData.append(cityHumidity);
let cityWind = document.createElement("p");
cityWind.textContent=data.wind.speed;
weatherData.append(cityWind);
let cityIcon = document.createElement("img");
cityIcon.setAttribute("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png")
cityName.append(cityIcon);
let lat = data.coord.lat;
let lon = data.coord.lon;
uvIndex(lat,lon);
fiveDay(cityVal);
} )
}
function uvIndex(lat,lon) {
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
.then(response =>{
    return response.json()
}).then(data =>{
    console.log(data);
let Index = document.createElement("p");
Index.textContent=data.current.uvi;
weatherData.append(Index);
})
}
function fiveDay(cityName){
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`)
.then(response =>{
    return response.json()
}).then(data =>{
    console.log(data);
for (let i = 0; i < data.list.length; i++) {
    const weather = data.list[i];
if(weather.dt_txt.indexOf("09:00:00")!== -1){
    console.log(weather);
let card = document.createElement("div");
card.setAttribute("class","card bg-primary text-white")
let cardBody = document.createElement("div");
cardBody.setAttribute("class","card-body");
let date = document.createElement("h3");
date.textContent=new Date(weather.dt_txt).toLocaleDateString()
let image =document.createElement("img");
image.setAttribute("src","http://openweathermap.org/img/w/"+weather.weather[0].icon+".png");
let temp=document.createElement("p")
temp.textContent="TEMP "+ weather.main.temp
let humidity=document.createElement("p");
humidity.textContent=weather.main.humidity
cardBody.append(date,image,temp,humidity)
card.append(cardBody)
console.log(cardBody);
fiveDayEl.append(card);
}
}
})
}


button.onclick=start
