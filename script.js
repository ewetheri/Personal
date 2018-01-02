var i;

//ACCESSING AIP
    var weatherbit = new XMLHttpRequest();
    weatherbit.open("GET", "http://api.weatherbit.io/v1.0/current/ip?ip=auto&key=180b8e0f59d64b5a9a825bbdb32b8e08", false)
    weatherbit.send();
    console.log(weatherbit.status);

var response = JSON.parse(weatherbit.response);

//STORING RESPONSE IN response
    response = response.data[0];

console.log(response);

//SET WEATHER DESCRIPTION
var desc = response.weather.description;
document.getElementById("desc").innerHTML = desc;
console.log("Description: "+ desc)

//SET TEMP.
var temp = Math.round(response.temp*9/5+32) + "° F // " + Math.round(response.temp)+"° C";
document.getElementById("temp").innerHTML = temp;
console.log("Temperature: "+temp);

//SET CITY
var city = response.city_name;
document.getElementById("city").innerHTML = city;
console.log("City: "+city);

//SET STATE
var state = response.state_code;
document.getElementById("state").innerHTML = state;
console.log("State: "+state);

//SET RELATIVE HUMIDITY
var rh = response.rh;
document.getElementById("rh").innerHTML = rh;
console.log("Relative Humidity: "+rh);

//SET WEATHER IMAGE, CLOUD IMAGE, AND SUN IMAGE
var weather = response.weather.code;

                //TESTING PURPOSES--weather pattern
                //weather = 804;

var wImage = "url('resources/sunny.gif')";
var cImage = "url('resources/light.png')";
var sImage = "url('resources/sunny.gif')";

//If code in 300s (drizzle) or a particular 500 (rain)
if (weather.toString()[0] == 3 || weather == 500 || weather == 511 || weather == 520 || weather == 521) {
    wImage = cImage = "url('resources/sprinkle.gif')";
}

//If code in 200s (thunderstorm)
else if (weather.toString()[0] == 2) {
    wImage = cImage = "url('resources/thunder.gif')";
}

//If code in another 500 (heavier rain, but less than a thunderstorm)
else if (weather.toString()[0] == 5) {
     wImage = cImage = "url('resources/rain.gif')";
}

//If code in 600s (snow, sleet, flurries)
else if (weather.toString()[0] == 6) {
     wImage = cImage = "url('resources/snow.gif')";
}

//If code in 700s (fog, haze, mist)
else if (weather.toString()[0] == 7) {
     wImage = cImage = "url('resources/light.png')";
}

//If code 802 (scattered clouds)
else if (weather == 802) {
     wImage = sImage = "url('resources/partlycloudy.gif')";
}

//If code 803 (broken clouds)
else if (weather == 803) {
     wImage = sImage = "url('resources/mostlycloudy.gif')";
}

//If code 804 (overcast)
else if (weather == 804) {
     wImage = sImage = "url('resources/verycloudy.gif')";
     cImage = "url('resources/heavy.png')";
}
console.log("Weather Code: "+weather);

//SET NUMBER OF CLOUDS
var cloudNum = Math.round(response.clouds/5)+1;

                    //TESTING PURPOSES--number of clouds
                    //cloudNum = 100;

var insert;
var att;
var handle = document.getElementById("sun");
for (i= 0; i< cloudNum; i++) {
    insert = document.createElement("DIV");
    att = document.createAttribute("class")
    att.value = "cloud";
    insert.setAttributeNode(att);
    document.body.insertBefore(insert, handle);
}
console.log("Number of clouds to generate: "+ cloudNum);

//SET CLOUDS TO APPROPRIATE IMAGE AND HEIGHT AND SPEED
var speed = response.wind_spd;

                    //TESTING PURPOSES--wind (cloud) speed
                    //speed = 100;

var clouds = document.getElementsByClassName("cloud");
for (i =0; i< clouds.length; i++) {
    clouds[i].style.backgroundImage=cImage;
    clouds[i].style.top = Math.floor((Math.random()*50))+"%";
    clouds[i].style.animation = "cloudshift "
    + Math.floor(((Math.random()*1000)+900)/(speed*10)) + "s linear "+Math.floor((Math.random()*20))+"s infinite";
}
console.log("Wind speed: "+ speed);

//SETTING SUN AND SKY TO APPROPRIATE IMAGE/COLOR
//GETTING TIMES
var sunrise = response.sunrise;
var sunset = response.sunset;
var time = new Date();

//CONFIGURE CURRENT TIME TO UTC
time = (time.getUTCHours()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    +":"
    +(time.getUTCMinutes()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    +":"
    +(time.getUTCSeconds()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    //The above three lines were largely borrowed from stackoverflow.com, could not figure out how to change to UTC time on my own.
console.log("UTC Time: "+time);


//IF NIGHT, GET RID OF SUN!
var day = true;
if (time < sunrise || time > sunset) {
    day = false;
    document.body.style.backgroundColor= "#224466";
    //COMMENT FOLLOWING LINE OUT TO ENABLE SUN AT NIGHT
    document.getElementById("sun").style.display = "none";
    wImage = cImage;
}
console.log("Is the sun up: "+day);

//SETTING WEATHER AND SUN IMAGES TO APPROPRIATE VALUES
document.getElementById("weather").style.backgroundImage=wImage;
document.getElementById("sun").style.backgroundImage=sImage
