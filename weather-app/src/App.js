import './App.css';
import { useState } from 'react';
import Search from './Components/search/Search.js';
import CurrentWeather from './Components/current-weather/current-weather.js';

import { WEATHER_API_KEY, WEATHER_API_URL } from './api.js';
function App() {
  const [currentWeather,setCurrentWeather] = useState(null);
  const [forecast,setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat,lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?limit=1000000&lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_API_KEY}`);
    const forecastWeatherFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_API_KEY}`);

    Promise.all([currentWeatherFetch,forecastWeatherFetch])
    .then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();
      console.log(forecastResponse.list);
      setCurrentWeather({city: searchData.label, ...weatherResponse});
      setForecast(() => {return {city: searchData.label, futureWeather: forecastResponse.list}});
    }).catch((err) => console.log(err));
    
    console.log(currentWeather);
    console.log(forecast);

  }

  return (
    <div className="App">
      <div className="flex justify-center">
        <div className="w-3/4">
          <Search onSearchChange={handleOnSearchChange} />
          {currentWeather && <CurrentWeather data={currentWeather} cityForecast={forecast}/>}
        </div>
      </div>
    </div>
  );

}

export default App;
