import React, { useState } from 'react';

const ForecastPlayback = ({ forecast }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePlay = () => {
        let index = currentIndex;
        const interval = setInterval(() => {
        if (index < forecast.list.length - 1) {
            index++;
            setCurrentIndex(index);
        } else {
            clearInterval(interval);
        }
        }, 3000);
    };

    const handlePause = () => {
        setCurrentIndex(0);
    };

    return (
        <div className="mb-4">
        <button onClick={handlePlay} className="bg-green-500 text-white p-2 mr-2">Play</button>
        <button onClick={handlePause} className="bg-red-500 text-white p-2">Pause</button>
        <div>
            <p>{forecast.list[currentIndex].dt_txt}</p>
            <p>Temperature: {forecast.list[currentIndex].main.temp} °C</p>
            <p>Weather: {forecast.list[currentIndex].weather[0].description}</p>
        </div>
        </div>
    );
};

export default ForecastPlayback;
