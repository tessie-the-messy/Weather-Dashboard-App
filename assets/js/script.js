// Global variables
var userInput = document.getElementById("user-input")
var searchForm = document.getElementById("form-sbt")
var key = "57c4d69bd30ba8bbeba39b96c507ddd4"
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
console.log(searchHistory)
for (let i = 0; i < searchHistory.length; i++) {
    var li = document.createElement("li")
    var btn = document.createElement("button")
    btn.classList.add("history")
    btn.innerHTML = searchHistory[i]
    li.appendChild(btn)
    document.querySelector(".search-history").appendChild(li)
    btn.addEventListener("click", ()=>{
        userInput.value = btn.textContent
        console.log()
    })
}
var searchList = document.querySelectorAll(".history")
for (let i = 0; i < searchList.length; i++) {
    console.log(searchList[i].textContent)
    searchList[i].addEventListener("click", ()=>{
        userInput.value = searchList[i].textContent

    })
}
//api call by target user search term
function fetchWeather (city) {
    // var history = JSON.parse(localStorage.getItem("history")) || []
    searchHistory.push(city)
    document.querySelector(".search-history").innerHTML = ""

    for (let i = 0; i < searchHistory.length; i++) {
        var li = document.createElement("li")
        var btn = document.createElement("button")
        btn.classList.add("history")
        btn.innerHTML = searchHistory[i]
        li.appendChild(btn)
        document.querySelector(".search-history").appendChild(li)
    }
    var searchList = document.querySelectorAll(".history")
for (let i = 0; i < searchList.length; i++) {
    console.log(searchList[i].textContent)
    searchList[i].addEventListener("click", ()=>{
        userInput.value = searchList[i].textContent

    })
}
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key+"&units=imperial"
    fetch(weatherApi)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        document.querySelector(".today-temp").textContent = "Temp: " + data.main.temp + "°"
        document.querySelector(".today-wind").textContent = "Wind: " + data.wind.speed + " "
        document.querySelector(".today-humid").textContent = "Humidity: " + data.main.humidity
        document.querySelector(".today-date").textContent = moment().format("L")

        var coordApi= "https://api.openweathermap.org/data/2.5/forecast?lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid="+key+"&units=imperial"
        fetch(coordApi)
        .then(resp=>resp.json())
        .then(data2=>{
            console.log(data2)
            let day = 4
            for (i=1; i < 6; i++){
            document.querySelector(".temp" + i).textContent = "Temp: " + data2.list[day].main.temp
            document.querySelector(".wind" + i).textContent = "Wind: " + data2.list[day].wind.speed
            document.querySelector(".humid" + i).textContent = "Humidity: " + data2.list[day].main.humidity
            document.querySelector(".date" + i).textContent = moment().add(i, "days").format("L")
            day+= 8
            console.log(day)
            }
        })
    })
}

//search bar input function
    //capture input value
function handleFormSubmit (e) {
    e.preventDefault();

    var input = userInput.value;

    //make call api function
    fetchWeather(input)
    // .then(res=>res.json())
    // .then(data=>{
    //     console.log(data)
    // })
}



//store results in local storage function


//click event 
    // current forecast and 5 day forecast are displayed
    // create a button with city name below search bar

searchForm.addEventListener("submit", handleFormSubmit);
