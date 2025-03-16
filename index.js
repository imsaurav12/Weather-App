const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

let oldTab = userTab;
const API_KEY = "229297cca3046d5419602ff3756e27e7";
oldTab.classList.add("current-tab");

function switchTab(newTab){
    if(newTab != oldTab){
        oldTab.classList.remove("current-tab"); //current-tab se background color lagega
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            //kya search form wala container is invisible, if yes then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else{
            //main pahle search wale tab pr tha, ab weather tab visible karna h:---->
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //ab main 'Your Weather tab' me aa gya hu, to weather v display karna parega, let's check local storage first--->
            getfromSessionStorage(); 
        }

    }
};

userTab.addEventListener('click',()=>{
    //pass clicked tab as input parameter
    switchTab(userTab);
});

searchTab.addEventListener('click',()=>{
    switchTab(searchTab);
});

//Check if coordinates are already present in session or not->
function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinate");
    if(!localCoordinates ){
        //agar local coodinate nahi mile
        grantAccessContainer.classList.add("active")
    }
    else{
        const coodinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}
async function fetchUserWeatherInfo(coordinates){
    const {lat,lon} = coordinates;
    //make grant access container invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //API CALL
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}
      `); 
      const data = await response.json();
      loadingScreen.classList.remove("active");
      userInfoContainer.classList.add("active");
      renderWeatherInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove("active");
    }

}
function renderWeatherInfo(weatherInfo){
    //firstly we have to fetch the elements to change dynamically

    const cityName = document.querySelector("[data-cityName]");
    const cityIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windSpeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");


    //fetch values from weatherInfo object and put it UI elements:-

    // optional chaining - Isko use krke JSON object ke ander jakar particular value to access kr skte h-->  ex - user?.address?.zip 
    //weatherInfo JSON file hain jo API se fetch hoga
    cityName.innerText = weatherInfo?.name;
    cityIcon.src = `https://flagcdn.com/144*108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = weatherInfo?.main?.temp;
    windSpeed.innerText = weatherInfo?.wind?.speed;
    humidity.innerText = weatherInfo?.main?.humidity;
    cloudiness.innerText = weatherInfo?.clouds?.all;

}
function GetLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        //show an alert for no geolocation support available
    }

}

function showPosition(position){
    const userCoordinates  = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click",GetLocation);

  