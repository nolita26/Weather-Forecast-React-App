import React, { useState } from 'react';
import CitySelection from './components/CitySelection';
import WeatherPreview from './components/WeatherPreview';
import ForecastPlayback from './components/ForecastPlayback';
import './index.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleSearch = (data) => {
    setCity(data.city);
    setWeather(data.weather);
    setForecast(data.forecast);
  };

  return (
      <div className="container mx-auto p-4">
        <CitySelection onSearch={handleSearch} />
        {weather && (
          <>
            <WeatherPreview city={city} weather={weather} />
            <ForecastPlayback forecast={forecast} />
          </>
        )}
      </div>
    );
};

export default App;
