import React from 'react'
import ForecastedWeather from './forecastedWeather.js'

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//Loop to find the lows and highs for future dates
function forecastGenerator(futureWeather){
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
  let dailyAverages = [];
  for (let i = 0; i < 5; i++){
    let low = futureWeather[i*8].main.temp_max;
    let high = futureWeather[i*8].main.temp_min;
    for (let j = 1; j < 8; j++){
      let time = (i*8+j)
      if(futureWeather[time].main.temp_max > high){
        high = futureWeather[time].main.temp_max;
      }
      if(futureWeather[time].main.temp_min < low){
        low = futureWeather[time].main.temp_min;
      }
    }
    dailyAverages.push({icon: futureWeather[i*8+4].weather[0].icon, day: forecastDays[i] ,lowsAndHighs:[Math.round(low),Math.round(high)]})
    
  }
  return dailyAverages.map((day) => {return <ForecastedWeather data={day}/>})
}

const CurrentWeather = ({data, cityForecast}) => {

  return (
    <div className="flex justify-center">
      <div className="mt-3 p-3 w-96 h-72 bg-gray-700 rounded-md border border-gray-600 shadow-xl shadow-gray-800">

        <div className=" h-1/4 w-full mb-4 flex items-center justify-between">
          <div className="w-1/2 flex flex-col">
            <p className="textalign-middle-xl font-bold tracking-tight text-white text-left" alt="city">{data.city}</p>
            <p className="text-l text-gray-200 text-left" alt="weather-description">{data.weather[0].description}</p>
          </div>
          <div className="w-1/6">
            <img className="object-fill" src={require(`./icons/${data.weather[0].icon}.png`)} alt="weatherIcon"/>
          </div>
        </div>

        <div className="h-1/4 flex" alt="details">
          <div className="w-2/3 flex">
            <p className="text-7xl font-bold tracking-tighter text-white text-lefts">{Math.round(data.main.temp)}°F</p>
          </div>
          <div className="w-1/2 justify-end -space-y-1">
            <p className="text-sm text-white text-left flex justify-between" alt="FeelsLike">
              <span>Feels like:</span>
              <span>{data.main.feels_like}<span className="text-xs">°F</span></span>
            </p>
            <p className="text-sm text-white text-left flex justify-between" alt="Humidity">
              <span>Humidity:</span>
              <span>{data.main.humidity}<span className="text-xs">%</span></span>
            </p>
            <p className="text-sm text-white text-left flex justify-between" alt="Wind">
              <span>Wind:</span>
              <span>{data.wind.speed}<span className="text-xs">m/s</span></span>
            </p>
          </div>
        </div>

        <div className="h-2/6 w-full mt-6 bg-gray-600 rounded-xl flex p-3 justify-evenly">
          {cityForecast && forecastGenerator(cityForecast.futureWeather)}
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather;