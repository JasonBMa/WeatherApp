import React from 'react'

const ForecastedWeather = ({data}) => {
  return (
    <div className="h-full w-1/5 flex flex-col -mt-2">
        <img className="h-4/5 object-contain" src={require(`./icons/${data.icon}.png`)} alt="weatherIcon"/>
        <div className="flex-col -mt-1 h-1/5 w-full justify-center">
            <p className="text-white font-bold -mt-2 flex justify-around">
                <span className="text-blue-300">{data.lowsAndHighs[0]}°</span> 
                <span className="text-red-400">{data.lowsAndHighs[1]}°</span>
            </p>
            <p className="text-white text-sm -mt-2">{data.day}</p>
        </div>
    </div>
  )
}

export default ForecastedWeather