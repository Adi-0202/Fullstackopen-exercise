import axios from "axios"
import { useEffect, useState } from "react"

const api_key=import.meta.env.VITE_WEATHER_API_KEY

const url="http://api.openweathermap.org/data/2.5/weather?q="

const Weather = ({capital}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        axios
            .get(`${url}${capital}&appid=${api_key}&units=metric`)
            .then(response => (
                setWeather(response.data),
                console.log(response.data)
            ))
            .catch(error => console.log(error))
    },[capital])
    if (weather === null) {
        return <div>Loading weather...</div>
    }

    return(
        <>
            <h1>Weather in {capital}</h1>
            <div>
                Temperature {weather.main.temp} Celsius
            </div>
            <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
            />

            <div>
                Wind {weather.wind.speed} m/s
            </div>
        </>
    )
}

export default Weather