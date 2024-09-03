import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CurrentLocationWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await axios.get('http://localhost:5001/api/weather/current', {
            params: { lat, lon }
          });
          setWeatherData(response.data);
        } catch (error) {
          setError('Error fetching weather data');
          console.error(error);
        }
      }, (err) => {
        setError('Failed to retrieve your location');
        console.error(err);
      });
    } else {
      setError('Geolocation is not supported by this browser');
    }
  }, []);

  return (
    <div>
      <h1>Current Location Weather</h1>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <p>City: {weatherData.city}</p>
          <p>Date: {weatherData.date}</p>
          <p>Temperature: {weatherData.temperature.min}°C - {weatherData.temperature.max}°C</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Description: {weatherData.description}</p>
          <p>Wind Speed: {weatherData.windSpeed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default CurrentLocationWeather;