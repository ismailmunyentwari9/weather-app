const apiKey = "d977d3f5d4d4032a55e40ba33a9b03aa";
const cities = ["New York", "London", "Tokyo", "Dubai", "Sydney", "Cape Town"];

document.addEventListener("DOMContentLoaded", function () {
    const cityList = document.getElementById("city-list");
    if (cityList) {
        cities.forEach(city => getWeatherForCity(city, cityList));
    }
});

async function getWeatherForCity(city, container) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            // Determine the weather condition and provide advice
            const weatherCondition = data.weather[0].main;
            let advice = getAdviceForWeather(weatherCondition);

            // Create the weather card
            const weatherCard = document.createElement("div");
            weatherCard.className = "card";
            weatherCard.innerHTML = `
                <h3>${city}</h3>
                <p>🌡️ ${data.main.temp}°C | ${data.weather[0].description}</p>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                <p><strong>Travel Tip:</strong> ${advice}</p>
            `;
            container.appendChild(weatherCard);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to provide advice based on the weather condition
function getAdviceForWeather(weatherCondition) {
    switch (weatherCondition) {
        case "Clear":
            return "Perfect weather for sightseeing and outdoor activities!";
        case "Clouds":
            return "Great weather for a cozy day indoors or exploring the city!";
        case "Rain":
            return "Don't forget your umbrella! It's a great time to explore indoor attractions.";
        case "Snow":
            return "Bundle up and enjoy the winter wonderland! Perfect for snow sports.";
        case "Thunderstorm":
            return "Stay safe indoors and enjoy the view from a cozy spot!";
        case "Drizzle":
            return "Light rain – perfect for a stroll with a light jacket.";
        default:
            return "Check the weather and plan your activities accordingly!";
    }
}
