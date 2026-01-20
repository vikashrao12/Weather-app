
// Input field
const cityInput = document.querySelector("input");

// Buttons
const buttons = document.querySelectorAll("button");
const searchBtn = buttons[0];
const locationBtn = buttons[1];

// Error message 
const errorMessage = document.querySelector("section p");

// Recent search 
const recentDropdown = document.querySelector("select");

// Weather display elements
const cityText = document.getElementById("city-name");
const tempText = document.getElementById("temperature");
const humidityText = document.getElementById("humidity");
const windText = document.getElementById("wind");
const conditionText = document.getElementById("condition");


//****************************  City Search Validation  *********************************


// Handle search button click
searchBtn.addEventListener("click", () => {
    const cityName = cityInput.value.trim();

    // Check if input is empty
    if (cityName === "") {
        showError("Please enter a city name");
        return;
    }

    // If input is valid
    clearError();
    fetchWeatherByCity(cityName);
});


// ****************************** Fetch Weather Data by City  *******************************

const apiKey = "be62fc07656cd48c1dada19f48026742 ";

function fetchWeatherByCity(city) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            updateWeatherUI(data);
        })
        .catch(error => {
            showError(error.message);
        });
}




// ********************************** Current Location weather ******************************
// Handle location button click
locationBtn.addEventListener("click", () => {

    
    if (!navigator.geolocation) {
        showError("Location is not supported by this browser");
        return;
    }

    clearError();

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            fetchWeatherByLocation(latitude, longitude);
        },
        () => {
            showError("Unable to get your location");
        }
    );
});


//*************************** */ Fetch weather data using latitude and longitude**************************
function fetchWeatherByLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Unable to fetch location weather");
            }
            return response.json();
        })
        .then(data => {
            updateWeatherUI(data);
        })
        .catch(error => {
            showError(error.message);
        });
}


//**************************** Update weather data on UI ******************************
function updateWeatherUI(data) {
    cityText.textContent = data.name;
    tempText.textContent = Math.round(data.main.temp);
    humidityText.textContent = data.main.humidity + "%";
    windText.textContent = data.wind.speed + " m/s";
    conditionText.textContent = data.weather[0].main;
}


// ******************************** Error Handling Functions ******************************


function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}

function clearError() {
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
}

// ************************** Save city in local storage **************************
function saveCity(city) {
    let cities = JSON.parse(localStorage.getItem("recentCities")) || [];

    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem("recentCities", JSON.stringify(cities));
    }

    updateDropdown();
}

// ************************** Update recent cities dropdown **************************


function updateDropdown() {
    const cities = JSON.parse(localStorage.getItem("recentCities")) || [];
    recentDropdown.innerHTML = "";

    if (cities.length === 0) {
        recentDropdown.classList.add("hidden");
        return;
    }

    recentDropdown.classList.remove("hidden");

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a city";
    recentDropdown.appendChild(defaultOption);

    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        recentDropdown.appendChild(option);
    });
}