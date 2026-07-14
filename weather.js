document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const weatherInfo = document.getElementById('weather-info');

    weatherForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const cityName = cityInput.value.trim();
        if (!cityName) return;

        // Clear previous results and show loading state
        weatherInfo.innerHTML = '<p class="loading">Fetching current conditions...</p>';

        try {
            // Step 1: Fetch Latitude & Longitude for the city name using a free Geocoding API
            const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`);
            
            if (!geoResponse.ok) throw new Error('Network connection failed while searching for location.');
            
            const geoData = await geoResponse.json();
            
            // Comprehensive error handling for city names not found
            if (!geoData.results || geoData.results.length === 0) {
                throw new Error(`Could not find a city matching "${cityName}". Please check the spelling.`);
            }

            const { latitude, longitude, name, country } = geoData.results[0];

            // Step 2: Fetch the actual weather data using async/await with the retrieved coordinates
            const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&wind_speed_unit=ms`);
            
            if (!weatherResponse.ok) throw new Error('Failed to retrieve weather data from the service.');
            
            const weatherData = await weatherResponse.json();

            // Step 3: Parse and dynamically render complex nested JSON objects securely
            const current = weatherData.current;
            const temp = current.temperature_2m;
            const humidity = current.relative_humidity_2m;
            const wind = current.wind_speed_10m;

            weatherInfo.innerHTML = `
                <div class="weather-card animate-fade">
                    <h3>${name}, ${country}</h3>
                    <div class="weather-stat">
                        <span class="stat-label">Temperature:</span>
                        <span class="stat-value">${temp}°C</span>
                    </div>
                    <div class="weather-stat">
                        <span class="stat-label">Humidity:</span>
                        <span class="stat-value">${humidity}%</span>
                    </div>
                    <div class="weather-stat">
                        <span class="stat-label">Wind Speed:</span>
                        <span class="stat-value">${wind} m/s</span>
                    </div>
                </div>
            `;

        } catch (error) {
            // Elegant client-side error handling block
            weatherInfo.innerHTML = `
                <div class="weather-error" role="alert">
                    <p>⚠️ Error: ${error.message}</p>
                </div>
            `;
        }
    });
});
