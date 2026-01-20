
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
    console.log("Searching for city:", cityName);
});