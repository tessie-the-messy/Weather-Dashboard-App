// Global variables
var userInput = document.getElementById("user-input")
var searchForm = document.getElementById("form-sbt")
var key = "57c4d69bd30ba8bbeba39b96c507ddd4"

//api call by target user search term
function fetchWeather (city) {
    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key+"&units=imperial"
    fetch(weatherApi)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        document.querySelector(".today-temp").textContent = data.main.temp
        document.querySelector(".today-wind").textContent = data.wind.speed



        fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid="+key+"&units=imperial")

    })
}

//search bar input function
    //capture input value
function handleFormSubmit (e) {
    e.preventDefault();

    var input = userInput.value;

    //make call api function
    fetchWeather(input)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
    })
}



//store results in local storage function



//click event 
    // current forecast and 5 day forecast are displayed
    // create a button with city name below search bar

searchForm.addEventListener("submit", handleFormSubmit);
