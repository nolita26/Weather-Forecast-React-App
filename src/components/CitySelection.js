import React, { useState } from 'react';
import axios from 'axios';

const CitySelection = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const fetchWeatherData = async (city) => {
      const API_KEY = process.env.OPENWEATHER_API_KEY;
      try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`);
        onSearch({
          city: weatherResponse.data.name,
          weather: weatherResponse.data,
          forecast: forecastResponse.data,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      fetchWeatherData(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 mr-2"
        placeholder="Enter city"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">Search</button>
    </form>
  );
};

export default CitySelection;
