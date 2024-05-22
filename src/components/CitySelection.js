import React, { useState } from 'react';
import axios from 'axios';

const CitySelection = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const fetchWeatherData = async (city) => {
      const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
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
    <form onSubmit={handleSubmit} className="flex items-center mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border border-gray-300 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
        placeholder="Enter city"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300">Search</button>
    </form>
  );
};

export default CitySelection;
