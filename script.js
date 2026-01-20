
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

// confirm 
console.log("JS loaded");


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
            console.log("Weather data:", data);
        })
        .catch(error => {
            showError(error.message);
        });
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
    const apiKey = "myWeatherApiKey";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Unable to fetch location weather");
            }
            return response.json();
        })
        .then(data => {
            console.log("Location weather data:", data);
        })
        .catch(error => {
            showError(error.message);
        });
}